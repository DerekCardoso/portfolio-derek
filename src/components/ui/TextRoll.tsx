import { motion } from 'framer-motion';

/**
 * Efeito de rolagem de letras no hover: a linha de cima sobe e sai enquanto
 * uma cópia idêntica entra por baixo, letra a letra.
 *
 * Porte fiel do componente `animated-menu.tsx` (21st.dev). A animação é a
 * mesma — mesmo STAGGER, mesmos deslocamentos (-100% / 100%) e mesmo cálculo
 * de atraso a partir do centro. A única mudança é o estilo: o original usava
 * classes do Tailwind e este projeto usa CSS puro (ver `.text-roll` no index.css).
 */

const STAGGER = 0.035;

type TextRollProps = {
  children: string;
  className?: string;
  /** true = atraso calculado a partir do centro da palavra; false = da esquerda */
  center?: boolean;
};

export function TextRoll({ children, className, center = false }: TextRollProps) {
  const letters = Array.from(children);

  const delayFor = (i: number) =>
    center ? STAGGER * Math.abs(i - (letters.length - 1) / 2) : STAGGER * i;

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={['text-roll', className].filter(Boolean).join(' ')}
    >
      {/* linha de cima — sobe e sai */}
      <span className="text-roll-line">
        {letters.map((letter, i) => (
          <motion.span
            key={`top-${i}`}
            variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
            transition={{ ease: 'easeInOut', delay: delayFor(i) }}
          >
            {letter === ' ' ? ' ' : letter}
          </motion.span>
        ))}
      </span>

      {/* linha de baixo — entra por baixo */}
      <span className="text-roll-line text-roll-line-bottom" aria-hidden="true">
        {letters.map((letter, i) => (
          <motion.span
            key={`bottom-${i}`}
            variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
            transition={{ ease: 'easeInOut', delay: delayFor(i) }}
          >
            {letter === ' ' ? ' ' : letter}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
