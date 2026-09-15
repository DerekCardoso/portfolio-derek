/**
 * Constantes de enquadramento e movimento do personagem.
 * É aqui que se ajusta o "zoom", a posição e o comportamento dele.
 */

/** Altura do personagem em unidades de cena (a base fica em y = 0). */
export const TARGET_HEIGHT = 2.6;

/**
 * Folga vertical total ao redor do personagem, em fração da altura dele.
 * Menor = personagem maior na tela. Maior = mais respiro, menor.
 */
export const FRAME_PADDING = 0.8;

/**
 * Espaço entre os pés e a base do canvas, em unidades de cena.
 * Pequeno de propósito: ele parece apoiado no rodapé da página.
 */
export const FLOOR_GAP = 0.46;

/** Abertura vertical da câmera. */
export const CAMERA_FOV = 40;

/** O quanto a câmera fica acima do alvo (dá um leve ângulo de cima). */
export const CAMERA_ELEVATION = 0.2;

/** Distância da borda da tela onde ele fica parado. */
export const SIDE_MARGIN = 1.2;

/** Velocidade da corrida, em unidades por segundo. */
export const RUN_SPEED = 7.5;

/**
 * Correção de orientação **em graus**. O modelo já olha para a câmera com 0.
 * Use 180 se algum dia ele aparecer de costas, 90 / -90 para os lados.
 */
export const FACING_OFFSET_DEG = 0;

/**
 * Instante do ciclo de caminhada usado como pose "parado", em segundos.
 * Escolhido por ser o quadro com os pés mais juntos e o quadril mais alto —
 * o clipe `arise` termina agachado, então não serve como pose de descanso.
 */
export const IDLE_POSE_TIME = 0.067;

/** Respiração sutil parado (em unidades de cena). 0 desliga. */
export const IDLE_FLOAT = 0.02;

/** Tempo de transição entre animações, em segundos. */
export const FADE_DURATION = 0.25;

/** Limites do giro da cabeça seguindo o cursor, em radianos. */
export const HEAD_YAW_MAX = 0.6;
export const HEAD_PITCH_MAX = 0.32;

/**
 * Viés fixo do yaw da cabeça na HOME, em radianos. Negativo = vira à esquerda
 * (para o menu, que fica no centro enquanto ele está encostado na borda direita).
 * Corrige a pose animada de descanso, que nasce com a cabeça torta à direita.
 * ponytail: número calibrado no olho contra o rig — ajuste se trocar o modelo.
 */
export const HEAD_YAW_BIAS = -0.5;

/**
 * Giro do corpo dentro de uma view, em radianos. Positivo = vira para a direita
 * (para o conteúdo, que abre à direita enquanto ele fica na borda esquerda).
 * +π/2 seria perfil completo; menos que isso deixa o rosto ainda visível,
 * "de lado observando o que você faz".
 */
export const VIEW_FACING_YAW = 1.0;

/**
 * Giro do corpo na HOME, em radianos. Negativo = vira para a esquerda (para os
 * itens do menu, no centro, enquanto ele fica na borda direita). Sutil: só o
 * suficiente para parecer que está olhando o menu, sem virar de costas.
 */
export const HOME_FACING_YAW = -0.5;

/**
 * Altura da cabeça em fração da altura total — usada para descobrir em que
 * ponto da tela ela está e, daí, para onde ela precisa girar para olhar o alvo.
 */
export const HEAD_HEIGHT_RATIO = 0.9;

/** O quanto o pescoço acompanha a cabeça (0 = nada, 1 = igual). */
export const NECK_FOLLOW = 0.45;

/** Suavização do giro da cabeça (maior = mais rápido). */
export const HEAD_LERP = 6;
