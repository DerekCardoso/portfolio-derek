import { useEffect, useRef, useState } from 'react';
import { projects } from '../../data/content';
import { useAppStore } from '../../store/appStore';
import { PlaceholderImage } from '../ui/PlaceholderImage';

/**
 * "Circular split roll" — reimplementação do efeito do 21st.dev (@hyperiux) no
 * stack do projeto (React + CSS puro, sem GSAP).
 *
 * Dois caminhos circulares ("split"): a IMAGEM orbita um arco à esquerda e o
 * TÍTULO orbita um arco à direita (invertido em relação ao original, a pedido).
 * Rolar a página gira ("roll") os itens: cada um entra em foco ao passar pelo
 * ponto focal central, onde fica maior e nítido; os vizinhos encolhem e se
 * afastam pela curva. O progresso do scroll vira posição em cada arco; um lerp
 * em rAF suaviza a chegada ao foco. Clicar num item abre o detalhe.
 */

// ── ajustes do efeito (calibráveis no olho) ──────────────────────────────────
// Valores alinhados ao original do 21st.dev (@hyperiux): raio grande (arco
// suave), foco forte (vizinhos ~0.68 de escala e bem apagados, ~textSideOpacity).
const DEG_PER_ITEM = 28; // separação angular entre itens vizinhos, em graus
const RADIUS_RATIO = 0.8; // raio do arco, em fração da altura do palco
const IMAGE_X_RATIO = 0.32; // centro da coluna de imagem, em fração da largura
const TEXT_X_RATIO = 0.68; // centro da coluna de texto, em fração da largura
const MIN_SCALE = 0.5; // escala do item mais distante do foco
const SCALE_FALLOFF = 0.32; // quanto encolhe por item de distância (vizinho ~0.68)
const OPACITY_FALLOFF = 0.7; // quanto desbota por item de distância (vizinho ~0.3)
const SMOOTH = 0.12; // suavização do progresso (maior = mais rápido)
const SCREENS_PER_ITEM = 1; // altura de scroll por item, em telas

const DEG = Math.PI / 180;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export function CircularSplitRoll() {
  const setSelectedProject = useAppStore((s) => s.setSelectedProject);
  const reducedMotion = useAppStore((s) => s.reducedMotion);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const target = useRef(0); // posição alvo (contínua, em itens) vinda do scroll
  const current = useRef(0); // posição suavizada
  const [focal, setFocal] = useState(0); // índice em foco (para dica de UI)

  const N = projects.length;
  const last = N - 1;

  useEffect(() => {
    if (reducedMotion) return; // sem animação: layout em lista estática (CSS)
    const scroller = scrollerRef.current;
    const stage = stageRef.current;
    if (!scroller || !stage) return;

    // Um "ciclo" = N itens de scroll. Avançar t em N devolve o mesmo estado
    // visual (o desenho envolve a distância módulo N), então o loop é perfeito.
    const cyclePx = () => scroller.clientHeight * SCREENS_PER_ITEM * N;

    // Começa no ciclo do meio (a pista tem 3), para rolar infinito nos dois lados.
    scroller.scrollTop = cyclePx();
    current.current = target.current = N;

    const onScroll = () => {
      const cy = cyclePx();
      let st = scroller.scrollTop;
      // Perto de uma borda, salta um ciclo inteiro. Deslocamos `current` junto,
      // então o lerp não percebe o salto e não há giro visível.
      if (st < cy * 0.5) {
        scroller.scrollTop = st += cy;
        current.current += N;
      } else if (st > cy * 2.5) {
        scroller.scrollTop = st -= cy;
        current.current -= N;
      }
      target.current = (st / cy) * N;
    };
    onScroll();
    scroller.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    let lastFocal = -1;

    const wrap = (d: number) => {
      d = ((d % N) + N) % N; // 0..N
      return d > N / 2 ? d - N : d; // -N/2..N/2 (caminho mais curto no anel)
    };

    const frame = () => {
      current.current += (target.current - current.current) * SMOOTH;
      const t = current.current; // posição contínua no anel de itens

      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const cy = h / 2;
      const R = h * RADIUS_RATIO;
      const imgCx = w * IMAGE_X_RATIO - R; // centro do círculo da imagem (à esq.)
      const txtCx = w * TEXT_X_RATIO + R; // centro do círculo do texto (à dir.)

      let nearest = 0;
      let nearestD = Infinity;

      for (let i = 0; i <= last; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const d = wrap(i - t); // distância ao foco (envolvida no anel), em itens
        const a = d * DEG_PER_ITEM * DEG; // ângulo no arco
        const y = cy + Math.sin(a) * R;

        const imgX = imgCx + Math.cos(a) * R; // arco da imagem, curva p/ esquerda
        const txtX = txtCx - Math.cos(a) * R; // arco do texto, curva p/ direita

        const ad = Math.abs(d);
        const scale = clamp(1 - ad * SCALE_FALLOFF, MIN_SCALE, 1);
        const opacity = clamp(1 - ad * OPACITY_FALLOFF, 0, 1);

        const img = el.querySelector<HTMLElement>('.csr-image');
        const txt = el.querySelector<HTMLElement>('.csr-text');
        if (img) img.style.transform = `translate(${imgX}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
        if (txt) txt.style.transform = `translate(${txtX}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(1000 - Math.round(ad * 10));
        el.style.pointerEvents = ad < 0.5 ? 'auto' : 'none'; // só o item em foco clica

        if (ad < nearestD) {
          nearestD = ad;
          nearest = i;
        }
      }

      if (nearest !== lastFocal) {
        lastFocal = nearest;
        setFocal(nearest);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      scroller.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [last, reducedMotion]);

  // Fallback sem movimento: lista estática simples (acessibilidade).
  if (reducedMotion) {
    return (
      <ul className="csr-static">
        {projects.map((p) => (
          <li key={p.id}>
            <button type="button" onClick={() => setSelectedProject(p.id)}>
              <PlaceholderImage src={p.cover} alt={p.title} className="csr-static-cover" />
              <div>
                <h3>{p.title}</h3>
                <p>{p.description.pt}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="csr-scroller" ref={scrollerRef}>
      {/* palco fixo (altura = viewport do scroller) */}
      <div className="csr-stage" ref={stageRef}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`csr-item${i === focal ? ' is-focal' : ''}`}
            ref={(el) => (itemRefs.current[i] = el)}
          >
            <button
              type="button"
              className="csr-image"
              onClick={() => setSelectedProject(project.id)}
              aria-label={`Abrir ${project.title}`}
            >
              <span className="csr-image-frame">
                <PlaceholderImage src={project.cover} alt={project.title} />
              </span>
            </button>

            <button type="button" className="csr-text" onClick={() => setSelectedProject(project.id)}>
              <span className="csr-title">{project.title}</span>
            </button>
          </div>
        ))}

        <span className="csr-hint" aria-hidden="true">
          role para navegar ↓
        </span>
      </div>

      {/* espaçador que cria a distância de scroll; 3 ciclos p/ o loop infinito */}
      <div className="csr-track" style={{ height: `${projects.length * SCREENS_PER_ITEM * 3 * 100}vh` }} />
    </div>
  );
}
