# Portfólio Derek Cardoso

Portfólio de tela única com robô 3D interativo. Layout inspirado no [Loop](https://loop-agency.framer.website/): fundo branco, tipografia condensada, menu vertical gigante no centro.

**Não há scroll de página.** O site é uma tela só: o menu (PROJETOS / TRAJETÓRIA / SOBRE / CONTATO). Ao clicar num item, o robô corre para o lado oposto da tela e o conteúdo daquela seção aparece. O botão VOLTAR (ou a tecla ESC) traz o robô de volta e devolve o menu.

Stack: React + TypeScript + Vite + Three.js (React Three Fiber) + Framer Motion + Zustand.

## Rodar

```bash
npm install
npm run dev
```

Build de produção: `npm run build`.

## Como funciona

**Navegação (sem scroll)**

- `src/store/appStore.ts` guarda a view atual (`home` | `projetos` | `trajetoria` | `sobre` | `contato`)
- `home` mostra o menu gigante; qualquer outra mostra o `ViewPanel` com o conteúdo e o botão VOLTAR
- `body { overflow: hidden }` — a página nunca rola. Se um conteúdo for maior que a tela, ele rola dentro do próprio painel (`.view-body`), com a barra escondida
- ESC volta para a home

**Menu animado**

`src/components/ui/TextRoll.tsx` é o porte do componente `animated-menu.tsx` (21st.dev): no hover as letras sobem e uma cópia entra por baixo, com atraso escalonado a partir do centro. A animação é idêntica ao original (mesmo `STAGGER = 0.035`, mesmos deslocamentos). A diferença é que o original usava Tailwind e aqui o estilo está em CSS puro (`.text-roll` no `index.css`), para não introduzir um segundo sistema de estilos no projeto.

**Imagem em mosaico (hover nos projetos)**

`src/components/ui/MosaicImage.tsx` reproduz o efeito de hover do site de referência: a imagem se monta ladrilho por ladrilho, em ordem aleatória.

No original isso é desenhado num `<canvas>` de 486×729 (não há nenhum `<img>` na página). Aqui é uma grade CSS de 8×12 divs com `background-position`, cada uma com `transition-delay` escalonado — mesmo resultado visual, sem canvas e sem JS por quadro. A ordem usa um embaralhamento com semente derivada do `src`, então não muda entre renders.

Para usar: coloque a imagem em `public/projects/` e aponte no campo `image` do projeto em `src/data/content.ts` (proporção 2:3, ~600×900). Projeto sem `image` não mostra nada no hover.

**Personagem 3D** (`src/components/Robot/`)

Personagem rigado (24 ossos) com animações reais, vindas do Meshy:

- **Ao abrir o site:** toca `arise` uma vez — ele levanta do chão
- **Parado:** fica de frente, com respiração sutil, e **só a cabeça** acompanha o cursor / o item do menu em hover
- **Ao abrir uma view:** vira para o lado, entra em `run` em loop e atravessa a tela; ao chegar, faz crossfade de volta para a pose em pé
- O canvas é uma faixa de largura total no rodapé com `pointer-events: none`

**Pose de descanso**

O clipe `arise` **não termina em pé**: no último quadro o quadril está em 0,49 (contra 0,58 do bind), os pés virados 82° e os braços abertos. Congelar esse quadro deixava o personagem agachado numa pose estranha. A pose parada usa, então, um quadro do ciclo de caminhada — `IDLE_POSE_TIME = 0.067s`, escolhido por varredura do clipe como o de pés mais juntos e quadril mais alto (cabeça reta e centrada, braços caídos).

**Cabeça seguindo o cursor**

Aplicada por cima da animação, depois do `AnimationMixer` rodar (o `useAnimations` registra o `useFrame` dele antes do nosso, então a ordem já sai certa). Como o osso guarda rotação **local** e seus eixos não são alinhados ao mundo, a rotação desejada é convertida com `local' = [inv(paiMundo) · offsetMundo · paiMundo] · local` — assim funciona independente de como o rig foi exportado.

Duas armadilhas resolvidas aqui, que valem o comentário no código:

1. **O offset precisa ser aplicado por fora** (`premultiply`), não por dentro (`multiply`) — senão ele gira nos eixos locais do osso, que num rig exportado quase nunca coincidem com os do mundo.
2. **Não dá para confiar que o mixer reescreve o osso todo quadro.** O `PropertyMixer` do three só chama `setValue` quando o valor calculado muda; com a pose parada (`action.paused`) ele para de escrever, e aplicar o offset em cima do resultado anterior faz a cabeça girar sem parar (num teste, −97° depois de 2 s). Por isso cada osso guarda a rotação vinda da animação e a última que escrevemos: comparando as duas, dá para saber se o valor atual veio do mixer ou é o nosso do quadro anterior.

O pescoço acompanha parcialmente (`NECK_FOLLOW`) e a cabeça pega o restante — as parcelas somam 1 porque a cabeça herda a rotação do pescoço.

Os arquivos são separados de propósito: `character.glb` traz malha, esqueleto e texturas; `anim-*.glb` trazem **só as animações** (malha e texturas removidas). Os clipes se aplicam ao personagem porque os nomes dos 24 ossos são idênticos — isso evita baixar a malha três vezes (71 MB por arquivo no original).

**Enquadramento automático**

`RobotCanvas` calcula a distância da câmera a partir da altura do personagem, então o corpo inteiro sempre cabe, em qualquer tamanho de janela. Ajustes em `src/components/Robot/robotConfig.ts`:

| Constante | O que faz |
|---|---|
| `TARGET_HEIGHT` | altura do personagem em unidades de cena |
| `FRAME_PADDING` | folga em volta — **menor = personagem maior na tela** |
| `FLOOR_GAP` | espaço entre os pés e a base da tela |
| `CAMERA_ELEVATION` | ângulo de cima da câmera |
| `SIDE_MARGIN` | distância da borda onde ele para |
| `RUN_SPEED` | velocidade da corrida |
| `FACING_OFFSET_DEG` | corrige a orientação, **em graus** (0 = de frente; 180 = de costas) |
| `IDLE_POSE_TIME` | quadro do walk usado como pose parada |
| `IDLE_FLOAT` | respiração parado (0 desliga) |
| `FADE_DURATION` | transição entre animações |
| `HEAD_YAW_MAX` / `HEAD_PITCH_MAX` | limite do giro da cabeça |
| `NECK_FOLLOW` | o quanto o pescoço acompanha |

O tamanho na tela também depende de `--robot-h` no `index.css` (altura da faixa do rodapé).

**Performance**

| Arquivo | Original | Otimizado |
|---|---|---|
| `character.glb` | 71 MB | **2,0 MB** (Draco + WebP 1K, 599k → 344k triângulos) |
| `anim-arise.glb` | 50 MB | **42 KB** |
| `anim-walk.glb` | 71 MB | **32 KB** |
| `anim-run.glb` | 71 MB | **27 KB** |

- O bundle do three.js (~1 MB) entra por lazy import 400 ms após o primeiro paint
- Sem WebGL o site funciona igual, só sem o personagem
- `prefers-reduced-motion` desliga flutuação, corrida e transições

## Estrutura

```
src/
  data/content.ts               # todo o texto do site
  store/appStore.ts             # view atual + ponte DOM ↔ canvas
  hooks/usePointerTracking.ts   # cursor e reduced-motion
  components/
    ui/TextRoll.tsx             # animação de letras no hover
    Chrome/TopBar.tsx           # logo + MENU + overlay
    Hero/Hero.tsx               # menu vertical gigante
    Views/ViewPanel.tsx         # conteúdo de cada seção + VOLTAR
    Robot/RobotCanvas.tsx       # canvas + enquadramento automático
    Robot/Robot.tsx             # GLB, mixer de animações, idle e corrida
    Robot/robotConfig.ts        # constantes de ajuste
public/
  models/character.glb          # malha + esqueleto + texturas (Draco)
  models/anim-*.glb             # animações: arise, walk, run (só keyframes)
  draco/                        # decoder Draco
  cv/Resume-Derek-Cardoso.pdf
  foto-derek.jpeg
```

## Currículo

`CV-Derek-v2-e-plano.md`, na raiz do repo, é a versão atual do currículo: reescrita completa em inglês (foco em vagas internacionais) mais um plano de 8 semanas para o projeto GymBro com IA, que sustenta os pontos novos do currículo.

O botão CV do site baixa `public/cv/Resume-Derek-Cardoso.pdf`, que ainda será atualizado a partir dessa versão.

## Próximos passos possíveis

1. Usar o clipe `walk` (já carregado, hoje sem uso) — por exemplo, andar na volta para a home e correr só na ida.
2. Sombra no chão, para reforçar que ele está apoiado.
3. Reduzir os 344k triângulos: a malha do Meshy vem como "sopa de triângulos" (vértices duplicados por normal/UV), o que trava a simplificação. Um weld por posição resolveria, ao custo de possíveis artefatos nas costuras de textura.
4. `public/og-image.png` para a prévia ao compartilhar o link.
