import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { menu, personal } from '../../data/content';
import { useAppStore, type ViewId } from '../../store/appStore';
import { TextRoll } from '../ui/TextRoll';

/**
 * Tela inicial: só o menu vertical gigante. Clicar num item abre a view
 * correspondente (sem scroll) e manda o robô correr para o lado oposto.
 */
export function Hero() {
  const setView = useAppStore((s) => s.setView);
  const setLookTarget = useAppStore((s) => s.setLookTarget);

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setLookTarget({
        x: (cx / window.innerWidth) * 2 - 1,
        y: -((cy / window.innerHeight) * 2 - 1),
      });
    },
    [setLookTarget],
  );

  const handleLeave = useCallback(() => setLookTarget(null), [setLookTarget]);

  const open = useCallback((id: ViewId) => setView(id), [setView]);

  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <nav className="hero-menu" aria-label="Navegação principal">
        {menu.map((item) => (
          <button
            key={item.id}
            type="button"
            className="hero-menu-item"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={() => open(item.id as ViewId)}
          >
            <TextRoll center>{item.label}</TextRoll>
          </button>
        ))}
      </nav>

      <p className="hero-tagline">
        <strong>{personal.tagline[0]}</strong>
        <br />
        {personal.tagline[1]}
        <br />
        <strong>{personal.tagline[2]}</strong>
      </p>
    </motion.section>
  );
}
