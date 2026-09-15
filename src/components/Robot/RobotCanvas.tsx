import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Robot } from './Robot';
import {
  CAMERA_ELEVATION,
  CAMERA_FOV,
  FLOOR_GAP,
  FRAME_PADDING,
  TARGET_HEIGHT,
} from './robotConfig';

/**
 * Enquadramento automático: calcula a distância da câmera para que a altura
 * total do robô (mais a folga de FRAME_PADDING) caiba na abertura vertical,
 * e centra o quadro de forma que os pés fiquem a FLOOR_GAP da base.
 * Assim o corpo inteiro aparece independente da altura da faixa do rodapé.
 */
function CameraRig() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useEffect(() => {
    const frameHeight = TARGET_HEIGHT * (1 + FRAME_PADDING);
    // distância necessária para enquadrar frameHeight com o fov vertical
    const distance = frameHeight / 2 / Math.tan((CAMERA_FOV / 2) * (Math.PI / 180));
    // centro vertical do quadro: base do quadro em -FLOOR_GAP
    const frameCenterY = frameHeight / 2 - FLOOR_GAP;

    camera.position.set(0, frameCenterY + CAMERA_ELEVATION, distance);
    camera.lookAt(0, frameCenterY, 0);
    camera.updateProjectionMatrix();
    // `size` na dependência: reenquadra quando a janela muda de tamanho
  }, [camera, size.width, size.height]);

  return null;
}

/**
 * Canvas fixo ocupando toda a largura do rodapé — o robô precisa de espaço
 * para atravessar de um lado ao outro da tela.
 * `pointer-events: none` no CSS: ele nunca bloqueia cliques nem seleção de texto.
 */
export function RobotCanvas() {
  return (
    <div className="robot-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: CAMERA_FOV, position: [0, 1.6, 5] }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.setClearAlpha(0)}
        style={{ pointerEvents: 'none' }}
      >
        <CameraRig />
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 5, 4]} intensity={2.2} />
        <directionalLight position={[-4, 2, -3]} intensity={0.8} />
        <Suspense fallback={null}>
          <Robot />
        </Suspense>
      </Canvas>
    </div>
  );
}
