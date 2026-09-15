import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { about, menu, personal, projects, stackGroups, timeline } from '../../data/content';
import { useAppStore, type ViewId } from '../../store/appStore';
import { CircularSplitRoll } from './CircularSplitRoll';
import { ProjectDetail } from './ProjectDetail';

/** Conteúdo de cada view. Sem scroll de página — cada uma cabe na tela. */

function Trajetoria() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = timeline[activeIndex];

  return (
    <div className="exp">
      <div className="exp-tabs" role="tablist" aria-orientation="vertical">
        {timeline.map((entry, index) => (
          <button
            key={entry.company}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`exp-tab${index === activeIndex ? ' is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {entry.company}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className="exp-panel"
          key={active.company}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h3>
            {active.role.pt} <span className="green">@ {active.company}</span>
          </h3>
          <p className="exp-date">{active.year.pt}</p>
          <ul className="bullets">
            {active.items.pt.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Sobre() {
  return (
    <>
      <p className="about-intro">{about.intro.pt}</p>
      <div className="about-body">
        {about.paragraphs.pt.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="stack-wrap">
        {stackGroups.map((group) => (
          <div className="stack-group" key={group.label}>
            <h4>{group.label}</h4>
            <div className="tag-row">
              {group.items.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Contato() {
  return (
    <>
      <p className="contact-lead">Aberto a novas oportunidades. Chame no que for mais fácil.</p>
      <ul className="contact-list">
        <li>
          <a href={personal.whatsapp} target="_blank" rel="noreferrer">
            WHATSAPP <span>↗</span>
          </a>
        </li>
        <li>
          <a href={`mailto:${personal.email}`}>
            E-MAIL <span>{personal.email}</span>
          </a>
        </li>
        <li>
          <a href={personal.linkedin} target="_blank" rel="noreferrer">
            LINKEDIN <span>↗</span>
          </a>
        </li>
        <li>
          <a href={personal.github} target="_blank" rel="noreferrer">
            GITHUB <span>↗</span>
          </a>
        </li>
        <li>
          <a href={personal.cvUrl} download>
            CURRÍCULO <span>PDF</span>
          </a>
        </li>
      </ul>
      <p className="contact-footnote">{personal.location}</p>
    </>
  );
}

const VIEWS: Record<Exclude<ViewId, 'home'>, () => JSX.Element> = {
  projetos: CircularSplitRoll,
  trajetoria: Trajetoria,
  sobre: Sobre,
  contato: Contato,
};

export function ViewPanel({ view }: { view: Exclude<ViewId, 'home'> }) {
  const setView = useAppStore((s) => s.setView);
  const selectedProject = useAppStore((s) => s.selectedProject);
  const setSelectedProject = useAppStore((s) => s.setSelectedProject);
  const Content = VIEWS[view];

  // Detalhe de projeto: o cabeçalho vira o nome do projeto e o "voltar" retorna
  // à lista (não à home). Fora disso, é a view normal.
  const detailProject =
    view === 'projetos' && selectedProject
      ? projects.find((p) => p.id === selectedProject) ?? null
      : null;

  const label = detailProject?.title ?? menu.find((m) => m.id === view)?.label ?? '';
  const backLabel = detailProject ? '← PROJETOS' : '← VOLTAR';
  const onBack = detailProject ? () => setSelectedProject(null) : () => setView('home');

  // O carrossel de projetos rompe a moldura de 880px e ocupa a tela toda.
  const isCarousel = view === 'projetos' && !detailProject;

  return (
    <motion.section
      className="view-panel"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <header className="view-head">
        <button type="button" className="back-button" onClick={onBack}>
          {backLabel}
        </button>
        <h2 className="view-title">{label}</h2>
      </header>

      <div className={`view-inner${isCarousel ? ' view-inner-wide' : ''}`}>
        <div className={`view-body${isCarousel ? ' view-body-stage' : ''}`}>
          {view === 'projetos' ? (
            <AnimatePresence mode="wait">
              {detailProject ? (
                <ProjectDetail key={detailProject.id} project={detailProject} />
              ) : (
                <motion.div
                  key="carousel"
                  className="csr-fill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <CircularSplitRoll />
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <Content />
          )}
        </div>
      </div>
    </motion.section>
  );
}
