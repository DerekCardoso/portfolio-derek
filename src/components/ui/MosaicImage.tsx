import { useMemo } from 'react';

/**
 * Revela uma imagem em mosaico: a grade de ladrilhos aparece em ordem
 * aleatória, montando a foto aos poucos.
 *
 * Reproduz o efeito de hover do loop-agency.framer.website, que lá é
 * desenhado num `<canvas>` 486×729. Aqui é só uma grade de divs com
 * `background-position` — mesmo resultado visual, sem canvas.
 */

const COLS = 8;
const ROWS = 12; // 8×12 em 2:3 dá ladrilhos quadrados
const STEP = 0.006; // atraso entre ladrilhos, em segundos

/** Embaralhamento determinístico, para a ordem não mudar a cada render. */
function seededOrder(count: number, seed: string): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const rand = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

type Props = {
  src: string;
  alt?: string;
  /** true = imagem montada; false = desmontada */
  active: boolean;
};

export function MosaicImage({ src, alt = '', active }: Props) {
  const total = COLS * ROWS;
  const order = useMemo(() => seededOrder(total, src), [total, src]);

  return (
    <div className={`mosaic ${active ? 'is-active' : ''}`} aria-hidden={!active}>
      {/* carrega a imagem cedo, para os ladrilhos não aparecerem vazios */}
      <img className="mosaic-preload" src={src} alt={alt} />

      {Array.from({ length: total }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        return (
          <span
            key={i}
            className="mosaic-tile"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
              // na entrada os ladrilhos vêm escalonados; na saída, todos juntos
              transitionDelay: active ? `${order[i] * STEP}s` : '0s',
            }}
          />
        );
      })}
    </div>
  );
}
