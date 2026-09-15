import { create } from 'zustand';

/**
 * Estado global do site. Faz a ponte entre o DOM (menu, botões) e o canvas 3D:
 * o robô lê esse estado dentro do useFrame, sem causar re-render do React.
 */

export type ViewId = 'home' | 'projetos' | 'trajetoria' | 'sobre' | 'contato';
export type RobotReaction = 'none' | 'jump' | 'nod';

type AppState = {
  /** view atual — 'home' mostra o menu gigante; as demais mostram o painel de conteúdo */
  view: ViewId;
  /** posição normalizada do cursor: -1..1 */
  pointer: { x: number; y: number };
  /** alvo para onde o robô olha (item do menu em hover); null = segue o cursor */
  lookTarget: { x: number; y: number } | null;
  /** id do projeto aberto em detalhe na view Projetos; null = mostrando a lista */
  selectedProject: string | null;
  reaction: RobotReaction;
  reactionAt: number;
  reducedMotion: boolean;

  setView: (view: ViewId) => void;
  setPointer: (x: number, y: number) => void;
  setLookTarget: (target: { x: number; y: number } | null) => void;
  setSelectedProject: (id: string | null) => void;
  triggerReaction: (reaction: RobotReaction) => void;
  setReducedMotion: (value: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  view: 'home',
  pointer: { x: 0, y: 0 },
  lookTarget: null,
  selectedProject: null,
  reaction: 'none',
  reactionAt: 0,
  reducedMotion: false,

  // ao trocar de view o robô larga o alvo de hover e volta a seguir o cursor;
  // também fecha qualquer detalhe de projeto aberto
  setView: (view) => set({ view, lookTarget: null, selectedProject: null }),
  setPointer: (x, y) => set({ pointer: { x, y } }),
  setLookTarget: (lookTarget) => set({ lookTarget }),
  setSelectedProject: (selectedProject) => set({ selectedProject }),
  triggerReaction: (reaction) => set({ reaction, reactionAt: performance.now() / 1000 }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}));
