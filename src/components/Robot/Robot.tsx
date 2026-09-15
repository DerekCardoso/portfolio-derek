import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/appStore';
import {
  FACING_OFFSET_DEG,
  FADE_DURATION,
  FLOOR_GAP,
  HEAD_HEIGHT_RATIO,
  HEAD_LERP,
  HEAD_PITCH_MAX,
  HEAD_YAW_BIAS,
  HEAD_YAW_MAX,
  HOME_FACING_YAW,
  VIEW_FACING_YAW,
  IDLE_FLOAT,
  IDLE_POSE_TIME,
  NECK_FOLLOW,
  RUN_SPEED,
  SIDE_MARGIN,
  TARGET_HEIGHT,
} from './robotConfig';

const CHARACTER_URL = '/models/character.glb';
const ARISE_URL = '/models/anim-hi.glb';
const WALK_URL = '/models/anim-walk.glb';
const RUN_URL = '/models/anim-run.glb';
const DRACO_PATH = '/draco/';

const FACING_OFFSET = (FACING_OFFSET_DEG * Math.PI) / 180;

type Phase = 'arise' | 'idle' | 'running';

export function Robot() {
  // Personagem e animações vêm de arquivos separados: os clipes se aplicam ao
  // esqueleto dele porque os 24 ossos têm exatamente os mesmos nomes.
  const { scene } = useGLTF(CHARACTER_URL, DRACO_PATH);
  const arise = useGLTF(ARISE_URL);
  const walk = useGLTF(WALK_URL);
  const run = useGLTF(RUN_URL);

  const { viewport, size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const phaseRef = useRef<Phase>('arise');

  const clips = useMemo(() => {
    const list: THREE.AnimationClip[] = [];
    const add = (clip: THREE.AnimationClip | undefined, name: string) => {
      if (!clip) return;
      const copy = clip.clone();
      copy.name = name;
      list.push(copy);
    };
    add(arise.animations[0], 'arise');
    add(walk.animations[0], 'walk');
    add(run.animations[0], 'run');
    return list;
  }, [arise.animations, walk.animations, run.animations]);

  const { actions } = useAnimations(clips, innerRef);

  // Ossos da cabeça, para o olhar seguir o cursor sem girar o corpo.
  const bones = useMemo(
    () => ({
      head: scene.getObjectByName('Head') ?? null,
      neck: scene.getObjectByName('neck') ?? null,
    }),
    [scene],
  );

  // Objetos reaproveitados no loop, para não alocar a cada quadro.
  const tmp = useMemo(
    () => ({
      euler: new THREE.Euler(),
      offset: new THREE.Quaternion(),
      parent: new THREE.Quaternion(),
      local: new THREE.Quaternion(),
      head: { yaw: 0, pitch: 0 },
    }),
    [],
  );

  /**
   * Guarda, por osso, a rotação vinda da animação e a última que escrevemos.
   *
   * Necessário porque o `PropertyMixer` do three só chama `setValue` quando o
   * valor calculado muda: com a pose parada (`action.paused`) ele para de
   * escrever no osso, e aplicar o offset em cima do resultado anterior faria a
   * cabeça girar sem parar. Comparando com o que escrevemos, sabemos se o valor
   * atual veio do mixer (aí atualizamos o cache) ou é o nosso do quadro passado.
   */
  const boneState = useMemo(
    () =>
      new WeakMap<
        THREE.Object3D,
        { animated: THREE.Quaternion; written: THREE.Quaternion; init: boolean }
      >(),
    [],
  );

  // Normaliza escala/posição num wrapper, sem mutar o asset em cache.
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const scale = TARGET_HEIGHT / (size.y || 1);
    return {
      scale,
      position: [-center.x * scale, -box.min.y * scale, -center.z * scale] as const,
    };
  }, [scene]);

  /**
   * Pose de descanso: um quadro do ciclo de caminhada congelado.
   * O `arise` termina agachado e de braços abertos, então não serve.
   */
  const holdStanding = (fade: number) => {
    const action = actions.walk;
    if (!action) return;
    action.paused = false;
    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.time = IDLE_POSE_TIME;
    action.fadeIn(fade).play();
    action.paused = true;
  };

  // Entrada no site: ele levanta do chão uma vez e assume a pose em pé.
  useEffect(() => {
    const action = actions.arise;
    if (!action) return;
    action.reset();
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();

    const duration = action.getClip().duration;
    const id = window.setTimeout(() => {
      if (phaseRef.current !== 'arise') return;
      phaseRef.current = 'idle';
      action.fadeOut(FADE_DURATION);
      holdStanding(FADE_DURATION);
    }, duration * 1000);

    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions]);

  const restX = viewport.width / 2 - SIDE_MARGIN;
  const activeX = -viewport.width / 2 + SIDE_MARGIN;

  // Começa já do lado direito, sem atravessar a tela na primeira renderização.
  useEffect(() => {
    if (groupRef.current && groupRef.current.position.x === 0) {
      groupRef.current.position.x = restX;
    }
  }, [restX]);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const { view, pointer, lookTarget, reducedMotion, selectedProject } = useAppStore.getState();
    const t = clock.elapsedTime;
    const lerp = 1 - Math.pow(0.0015, delta);

    // ---------- deslocamento horizontal ----------
    // home: direita. Projetos na lista: para no meio da tela. Projeto aberto
    // (ou demais views): corre até o limite esquerdo.
    const atMiddle = view === 'projetos' && !selectedProject;
    const targetX = view === 'home' ? restX : atMiddle ? 0 : activeX;
    const dx = targetX - group.position.x;
    const step = RUN_SPEED * delta;
    const isMoving = Math.abs(dx) > step;

    if (isMoving) {
      group.position.x += Math.sign(dx) * step;
    } else {
      group.position.x = targetX;
    }

    // ---------- troca de animação ----------
    const phase = phaseRef.current;
    if (isMoving && phase !== 'running') {
      phaseRef.current = 'running';
      actions.arise?.fadeOut(FADE_DURATION);
      actions.walk?.fadeOut(FADE_DURATION);
      const runAction = actions.run;
      if (runAction) {
        runAction.reset();
        runAction.setLoop(THREE.LoopRepeat, Infinity);
        runAction.fadeIn(FADE_DURATION).play();
      }
    } else if (!isMoving && phase === 'running') {
      phaseRef.current = 'idle';
      actions.run?.fadeOut(FADE_DURATION);
      holdStanding(FADE_DURATION);
    }

    const running = phaseRef.current === 'running';
    const inView = view !== 'home';

    // ---------- corpo ----------
    // Correndo: de perfil na direção da corrida. Numa view: virado para a
    // direita, observando o conteúdo. Na home: levemente virado para a
    // esquerda, olhando os itens do menu.
    const bodyYaw = running
      ? Math.sign(dx || 1) * (Math.PI / 2) + FACING_OFFSET
      : (atMiddle ? 0 : inView ? VIEW_FACING_YAW : HOME_FACING_YAW) + FACING_OFFSET;
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, bodyYaw, lerp * (running ? 0.8 : 1));
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0, lerp);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, 0, lerp);

    // A corrida já tem movimento vertical próprio; parado, só a respiração.
    const y = running || reducedMotion ? 0 : Math.sin(t * 1.3) * IDLE_FLOAT;
    group.position.y = THREE.MathUtils.lerp(group.position.y, y, lerp * 1.6);

    // ---------- cabeça segue o cursor ----------
    // Roda DEPOIS do mixer (o useAnimations registra o useFrame dele antes
    // deste), então aplicamos por cima da pose animada.
    //
    // O ângulo vem da diferença entre o alvo e a CABEÇA DELE, não da posição
    // absoluta do cursor: como ele fica encostado na borda, ângulo zero
    // significaria olhar reto para a câmera — e não para o menu, que está no
    // centro. Tudo em coordenadas de janela normalizadas (-1 a 1).
    const target = lookTarget ?? pointer;

    // onde a cabeça está na tela, na horizontal: a faixa do canvas ocupa toda
    // a largura da janela, então as coordenadas coincidem
    const headScreenX = group.position.x / (viewport.width / 2);

    // na vertical: a faixa cobre só o rodapé, então convertemos passando por
    // pixels — o topo do canvas fica em `size.height` px do fundo da janela
    const headWorldY = TARGET_HEIGHT * HEAD_HEIGHT_RATIO + group.position.y;
    const fracUpStrip = (headWorldY + FLOOR_GAP) / (viewport.height || 1);
    const windowH = typeof window === 'undefined' ? size.height : window.innerHeight;
    const headScreenY = ((fracUpStrip * size.height) / windowH) * 2 - 1;

    const clamp1 = (v: number) => Math.max(-1, Math.min(1, v));
    const lookX = clamp1((target.x - headScreenX) / 2);
    const lookY = clamp1((target.y - headScreenY) / 2);

    // Parado, a cabeça segue o cursor (na home e dentro das views). Na home o
    // viés recentra o neutro no menu (à esquerda); na view o corpo já está
    // virado para o conteúdo, então a cabeça só segue o cursor, sem viés.
    // Correndo ela fica neutra: o clipe de corrida vira o corpo de perfil e o
    // giro do olhar não teria referência boa.
    const yawBias = inView ? 0 : HEAD_YAW_BIAS;
    const wantYaw = running || reducedMotion ? 0 : lookX * HEAD_YAW_MAX + yawBias;
    const wantPitch = running || reducedMotion ? 0 : -lookY * HEAD_PITCH_MAX;
    const k = Math.min(1, delta * HEAD_LERP);
    tmp.head.yaw += (wantYaw - tmp.head.yaw) * k;
    tmp.head.pitch += (wantPitch - tmp.head.pitch) * k;

    const applyLook = (bone: THREE.Object3D | null, amount: number) => {
      if (!bone || !bone.parent) return;

      let st = boneState.get(bone);
      if (!st) {
        st = { animated: new THREE.Quaternion(), written: new THREE.Quaternion(), init: false };
        boneState.set(bone, st);
      }
      // Se o valor atual não é o que escrevemos, veio do mixer: atualiza o cache.
      if (!st.init || !bone.quaternion.equals(st.written)) {
        st.animated.copy(bone.quaternion);
        st.init = true;
      }

      // Queremos girar no espaço do mundo, mas o osso guarda rotação local e
      // seus eixos não são alinhados ao mundo. Convertemos:
      // local' = [inv(paiMundo) · offsetMundo · paiMundo] · local
      tmp.euler.set(tmp.head.pitch * amount, tmp.head.yaw * amount, 0, 'YXZ');
      tmp.offset.setFromEuler(tmp.euler);
      bone.parent.getWorldQuaternion(tmp.parent);
      tmp.local.copy(tmp.parent).invert().multiply(tmp.offset).multiply(tmp.parent);

      // premultiply: a conversão age por fora da pose animada (não por dentro)
      bone.quaternion.copy(st.animated).premultiply(tmp.local);
      st.written.copy(bone.quaternion);
    };

    // A cabeça herda a rotação do pescoço, então as parcelas somam 1 —
    // senão ela giraria mais que o alvo.
    applyLook(bones.neck, NECK_FOLLOW);
    applyLook(bones.head, 1 - NECK_FOLLOW);
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef} scale={fit.scale} position={[...fit.position]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(CHARACTER_URL, DRACO_PATH);
useGLTF.preload(ARISE_URL);
useGLTF.preload(WALK_URL);
useGLTF.preload(RUN_URL);
