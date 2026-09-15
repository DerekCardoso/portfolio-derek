import { useState } from 'react';
import { menu, personal } from '../../data/content';
import { useAppStore, type ViewId } from '../../store/appStore';
import { TextRoll } from '../ui/TextRoll';

/** Logo no canto superior esquerdo + botão MENU no superior direito. */
export function TopBar() {
  const [open, setOpen] = useState(false);
  const setView = useAppStore((s) => s.setView);
  const triggerReaction = useAppStore((s) => s.triggerReaction);

  const go = (id: ViewId) => {
    setView(id);
    setOpen(false);
  };

  return (
    <>
      <header className="topbar">
        <button type="button" className="logo" onClick={() => go('home')}>
          {personal.logo}
        </button>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          onClick={() => {
            setOpen((v) => !v);
            triggerReaction('nod');
          }}
        >
          {open ? 'FECHAR' : 'MENU'}
        </button>
      </header>

      {open && (
        <div className="menu-overlay">
          <nav>
            {menu.map((item) => (
              <button key={item.id} type="button" onClick={() => go(item.id as ViewId)}>
                <TextRoll>{item.label}</TextRoll>
              </button>
            ))}
          </nav>
          <div className="menu-overlay-footer">
            <a href={personal.github} target="_blank" rel="noreferrer">
              GITHUB
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer">
              LINKEDIN
            </a>
            <a href={`mailto:${personal.email}`}>E-MAIL</a>
            <a href={personal.cvUrl} download>
              CV
            </a>
          </div>
        </div>
      )}
    </>
  );
}
