import { createContext, useContext, useEffect, useState } from 'react';
import { about, personal, projects, stackGroups, timeline, ui, type Locale, type Project } from './data/content';

/**
 * Portfólio no estilo v4.brittanychiang.com — tema navy, acento verde.
 * Sem loader de logo e sem animações de entrada: conteúdo estático,
 * apenas transições de hover. O "B" da referência vira o nome do Derek.
 *
 * Multi-idioma (pt/en): o idioma ativo mora em `App` e é distribuído via
 * `LangContext` para não precisar passar `lang` prop a cada componente.
 */

const LangContext = createContext<Locale>('pt');
const useLang = () => useContext(LangContext);

const skills = stackGroups.flatMap((g) => g.items);
const featured = projects.filter((p) => p.cover);
const others = projects.filter((p) => !p.cover);

/* -------------------------------- ícones -------------------------------- */
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.8 1.08.8 2.18v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
  </svg>
);
const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.24-.69.24-1.28.17-1.41-.07-.12-.27-.2-.57-.34ZM12.05 21.5a9.5 9.5 0 0 1-4.84-1.32l-.35-.2-3.6.94.96-3.5-.23-.36a9.42 9.42 0 0 1-1.45-5.04c0-5.23 4.27-9.49 9.51-9.49 2.54 0 4.92.99 6.72 2.78a9.42 9.42 0 0 1 2.78 6.72c0 5.23-4.27 9.49-9.5 9.49Z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);
const IconExternal = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
  </svg>
);

/* -------------------------------- header -------------------------------- */
function Header({ lang, onToggleLang }: { lang: Locale; onToggleLang: (l: Locale) => void }) {
  const t = ui[lang];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NAV = [
    { id: 'sobre', label: t.navAbout },
    { id: 'trajetoria', label: t.navExperience },
    { id: 'projetos', label: t.navProjects },
    { id: 'contato', label: t.navContact },
  ];

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <a href="#top" className="logo" aria-label={t.ariaHome}>
        {personal.name}
      </a>
      <nav className="topnav" aria-label="Principal">
        <ol>
          {NAV.map((n, i) => (
            <li key={n.id}>
              <a href={`#${n.id}`}>
                <span className="num">0{i + 1}.</span> {n.label}
              </a>
            </li>
          ))}
        </ol>
        <div className="lang-toggle" role="group" aria-label="Idioma / Language">
          <button type="button" className={lang === 'pt' ? 'is-active' : ''} onClick={() => onToggleLang('pt')}>
            PT
          </button>
          <button type="button" className={lang === 'en' ? 'is-active' : ''} onClick={() => onToggleLang('en')}>
            EN
          </button>
        </div>
        <a className="btn-outline resume" href={personal.cvUrl} download>
          {t.resume}
        </a>
      </nav>
    </header>
  );
}

function SocialRail() {
  const t = ui[useLang()];
  return (
    <div className="rail rail-left" aria-hidden={false}>
      <ul>
        <li>
          <a href={personal.github} target="_blank" rel="noreferrer" aria-label={t.ariaGithub}>
            <IconGitHub />
          </a>
        </li>
        <li>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label={t.ariaLinkedin}>
            <IconLinkedIn />
          </a>
        </li>
        <li>
          <a href={personal.whatsapp} target="_blank" rel="noreferrer" aria-label={t.ariaWhatsapp}>
            <IconWhatsApp />
          </a>
        </li>
        <li>
          <a href={`mailto:${personal.email}`} aria-label={t.ariaEmail}>
            <IconMail />
          </a>
        </li>
      </ul>
    </div>
  );
}

function EmailRail() {
  return (
    <div className="rail rail-right">
      <a href={`mailto:${personal.email}`} className="email-vertical">
        {personal.email}
      </a>
    </div>
  );
}

/* --------------------------------- hero --------------------------------- */
function Hero() {
  const lang = useLang();
  const t = ui[lang];
  return (
    <section className="hero" aria-label="Introdução">
      <p className="hero-hi">{t.heroHi}</p>
      <h1 className="hero-name">{personal.name}.</h1>
      <h2 className="hero-sub">{t.heroSub}</h2>
      <p className="hero-desc">{about.intro[lang]}</p>
      <a className="btn-outline hero-cta" href="#projetos">
        {t.heroCta}
      </a>
    </section>
  );
}

function Heading({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <h2 className="numbered-heading">
      <span className="num">{num}.</span> {children}
    </h2>
  );
}

/* --------------------------------- sobre -------------------------------- */
function Sobre() {
  const lang = useLang();
  const t = ui[lang];
  return (
    <section id="sobre" className="section section-narrow" aria-label="Sobre">
      <Heading num="01">{t.headingAbout}</Heading>
      <div className="about-grid">
        <div className="about-text">
          {about.paragraphs[lang].map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>{t.aboutTechIntro}</p>
          <ul className="skills">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="about-photo">
          <div className="about-photo-inner">
            <img src="/foto-derek.jpeg" alt={personal.fullName} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ trajetória ------------------------------ */
function Trajetoria() {
  const lang = useLang();
  const t = ui[lang];
  const [tab, setTab] = useState(0);
  const entry = timeline[tab];

  return (
    <section id="trajetoria" className="section section-narrow" aria-label="Trajetória">
      <Heading num="02">{t.headingExperience}</Heading>
      <div className="exp">
        <div className="exp-tabs" role="tablist" aria-label="Empresas">
          {timeline.map((tl, i) => (
            <button
              key={tl.company}
              role="tab"
              aria-selected={i === tab}
              className={`exp-tab${i === tab ? ' is-active' : ''}`}
              onClick={() => setTab(i)}
            >
              {tl.company}
            </button>
          ))}
        </div>
        <div className="exp-panel" role="tabpanel">
          <h3>
            {entry.role[lang]} <span className="green">@ {entry.company}</span>
          </h3>
          <p className="exp-date">{entry.year[lang]}</p>
          <ul className="bullets">
            {entry.items[lang].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- projetos ------------------------------- */
function FeaturedProject({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const lang = useLang();
  const t = ui[lang];
  return (
    <li className={`feature${index % 2 === 1 ? ' feature-alt' : ''}`}>
      <button type="button" className="feature-media" onClick={() => onSelect(project)}>
        <img src={project.cover} alt={project.title} loading="lazy" />
        <span className="feature-tint" />
      </button>
      <div className="feature-content">
        <p className="feature-label">{t.featuredLabel}</p>
        <button type="button" className="feature-title" onClick={() => onSelect(project)}>
          {project.title}
        </button>
        <div className="feature-desc">
          <p>{project.intro[lang]}</p>
        </div>
        <ul className="feature-tech">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="feature-links">
          {project.link && (
            <a href={project.link.href} target="_blank" rel="noreferrer" aria-label={t.codeLabel}>
              <IconGitHub />
            </a>
          )}
          {project.live && (
            <a href={project.live.href} target="_blank" rel="noreferrer" aria-label={t.viewLive}>
              <IconExternal />
            </a>
          )}
          <button type="button" onClick={() => onSelect(project)} className="feature-more">
            {t.viewDetails}
          </button>
        </div>
      </div>
    </li>
  );
}

function Projetos({ onSelect }: { onSelect: (p: Project) => void }) {
  const lang = useLang();
  const t = ui[lang];
  return (
    <section id="projetos" className="section" aria-label="Projetos">
      <Heading num="03">{t.headingProjects}</Heading>

      <ul className="features">
        {featured.map((p, i) => (
          <FeaturedProject key={p.id} project={p} index={i} onSelect={onSelect} />
        ))}
      </ul>

      {others.length > 0 && (
        <>
          <h3 className="others-title">{t.otherProjects}</h3>
          <ul className="others-grid">
            {others.map((p) => (
              <li key={p.id}>
                <button type="button" className="folder-card" onClick={() => onSelect(p)}>
                  <div className="folder-top">
                    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                      <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" />
                    </svg>
                    <span className="folder-ext" aria-hidden>
                      →
                    </span>
                  </div>
                  <h4>{p.title}</h4>
                  <p>{p.intro[lang]}</p>
                  <ul className="folder-tech">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

/* -------------------------------- contato ------------------------------- */
function Contato() {
  const t = ui[useLang()];
  return (
    <section id="contato" className="section contact" aria-label="Contato">
      <p className="contact-num">{t.contactNum}</p>
      <h2 className="contact-title">{t.contactTitle}</h2>
      <p className="contact-text">{t.contactText}</p>
      <a className="btn-outline contact-btn" href={personal.whatsapp} target="_blank" rel="noreferrer">
        {t.contactBtn}
      </a>
    </section>
  );
}

/* --------------------------- detalhe do projeto ------------------------- */
function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const lang = useLang();
  const t = ui[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack]);

  const images = [project.cover, ...(project.gallery ?? [])].filter(Boolean) as string[];

  return (
    <article className="detail-wrap">
      <button type="button" className="detail-back" onClick={onBack}>
        {t.backToProjects}
      </button>
      <header className="detail-head">
        <p className="detail-meta">
          {project.category[lang]} · {project.year}
        </p>
        <h1 className="detail-title">{project.title}</h1>
        <ul className="feature-tech">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </header>
      <p className="detail-desc">{project.description[lang]}</p>
      {images.length > 0 && (
        <div className={`detail-gallery${project.mobileGallery ? ' detail-gallery-grid' : ''}`}>
          {images.map((src) => (
            <img key={src} src={src} alt={project.title} loading="lazy" />
          ))}
        </div>
      )}
      {(project.live || project.link) && (
        <div className="detail-cta">
          {project.live && (
            <a className="btn-outline btn-live" href={project.live.href} target="_blank" rel="noreferrer">
              {t.viewLive} <span aria-hidden>↗</span>
            </a>
          )}
          {project.link && (
            <a className="btn-outline btn-live" href={project.link.href} target="_blank" rel="noreferrer">
              {t.codeLabel} <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}

/* ---------------------------------- app --------------------------------- */
export default function App() {
  const [lang, setLang] = useState<Locale>('pt');
  const [selected, setSelected] = useState<Project | null>(null);

  const handleBack = () => {
    setSelected(null);
    // a seção "projetos" só existe no DOM depois que a página normal remonta
    setTimeout(() => {
      document.getElementById('projetos')?.scrollIntoView();
    }, 0);
  };

  return (
    <LangContext.Provider value={lang}>
      {selected ? (
        <main className="layout">
          <ProjectDetail project={selected} onBack={handleBack} />
        </main>
      ) : (
        <>
          <span id="top" />
          <Header lang={lang} onToggleLang={setLang} />
          <SocialRail />
          <EmailRail />
          <main className="layout">
            <Hero />
            <Sobre />
            <Trajetoria />
            <Projetos onSelect={setSelected} />
            <Contato />
            <footer className="foot">
              {ui[lang].footerBuiltBy} {personal.fullName} · React + TypeScript + Vite.
            </footer>
          </main>
        </>
      )}
    </LangContext.Provider>
  );
}
