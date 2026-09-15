// Fonte única de conteúdo do portfólio — versão enxuta (estilo Loop).
// Multi-idioma: campos de texto voltados ao visitante viram { pt, en }.

export type Locale = 'pt' | 'en';
export type Localized = { pt: string; en: string };
export type LocalizedList = { pt: string[]; en: string[] };

export const personal = {
  name: 'Derek Cardoso',
  fullName: 'Derek Cardoso dos Santos',
  role: 'Frontend & Mobile Developer',
  location: 'Praia Grande – SP',
  email: 'derek.cardoso@gmail.com',
  whatsapp: 'https://wa.me/5513991539067',
  linkedin: 'https://linkedin.com/in/derek-cardoso',
  github: 'https://github.com/DerekCardoso',
  cvUrl: '/cv/Resume-Derek-Cardoso.pdf',
};

export type Project = {
  id: string;
  title: string;
  year: string;
  category: Localized;
  stack: string[];
  intro: Localized;
  description: Localized;
  /** Exibe um grid (em vez de coluna única) na galeria — pensado para prints de celular. */
  mobileGallery?: boolean;
  /** Link de código (GitHub, repositório). */
  link?: { href: string };
  /** Link do projeto em produção — botão "Ver ao vivo" / "View live". */
  live?: { href: string };
  /**
   * Capa da lista (retrato ~2:3). Coloque em `public/projects/` e aponte aqui
   * (ex.: '/projects/gymbro-cover.jpg'). Sem ela, mostra um placeholder com o
   * nome do projeto — nada quebra.
   */
  cover?: string;
  /** Fotos extras exibidas na página de detalhe do projeto. */
  gallery?: string[];
};

export const projects: Project[] = [
  {
    id: 'gymbro',
    title: 'GymBro',
    year: '2025',
    category: { pt: 'App Mobile', en: 'Mobile App' },
    stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Zustand', 'Zod'],
    intro: {
      pt: 'App para encontrar parceiros de treino. Matching por horário, intensidade, grupo muscular e academia próxima. Projeto solo, do conceito ao produto.',
      en: 'App to find workout partners. Matching by schedule, intensity, muscle group and nearby gym. Solo project, from concept to product.',
    },
    description: {
      pt: 'App para encontrar parceiros de treino. Matching por horário, intensidade, grupo muscular e academia próxima. Projeto solo, do conceito ao produto.',
      en: 'App to find workout partners. Matching by schedule, intensity, muscle group and nearby gym. Solo project, from concept to product.',
    },
    mobileGallery: true,
    // link: { href: 'https://github.com/DerekCardoso' },
    cover: '/projects/gymbro/logo.png',
    gallery: ['/projects/gymbro/home.jpeg', '/projects/gymbro/convites.jpeg', '/projects/gymbro/perfil.jpeg'],
  },
  {
    id: 'nexa',
    title: 'Nexa Workflow',
    year: '2026',
    category: { pt: 'SaaS', en: 'SaaS' },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Zod'],
    intro: {
      pt: 'MVP de gestão operacional de Business Plans: distribui trabalho por carga da equipe, avisa conflitos de prazo e acompanha o pipeline de produção em um Kanban.',
      en: 'MVP for operational management of Business Plans: distributes work by team load, flags deadline conflicts, and tracks the production pipeline in a Kanban.',
    },
    description: {
      pt: 'O sistema ajuda admins a criar e atribuir Business Plans e writers a atualizar o status do próprio trabalho. Ele recomenda quem tem menor carga (não bloqueia a atribuição), destaca atrasos e conflitos de entrega na mesma data, e registra histórico via trigger no banco. Papéis: Admin (cria/arquiva/reatribui, gerencia usuários e escritórios) e Writer (lê todos os BPs, muda só o próprio status).',
      en: "The system helps admins create and assign Business Plans, while writers update the status of their own work. It recommends who has the lowest workload (without blocking the assignment), highlights delays and same-date delivery conflicts, and logs history via a database trigger. Roles: Admin (creates/archives/reassigns, manages users and offices) and Writer (reads all BPs, only changes their own status).",
    },
    // link: { href: 'https://github.com/DerekCardoso' },
    cover: '/projects/nexa/login.png',
    gallery: ['/projects/nexa/dashboard.png', '/projects/nexa/usuarios.png', '/projects/nexa/novo-bp.png'],
  },
  {
    id: 'iri-brasil',
    title: 'IRI Brasil',
    year: '2026',
    category: { pt: 'Site Institucional', en: 'Institutional Website' },
    stack: ['Next.js', 'React', 'Google Drive API', 'Google Analytics 4', 'Vercel', 'Figma'],
    intro: {
      pt: 'Redesign completo do site institucional do IRI Brasil, com campanhas ambientais, calculadora de CO2 e biblioteca de materiais focadas na Amazônia Legal.',
      en: "Complete redesign of IRI Brasil's institutional website, with environmental campaigns, a CO2 calculator, and a materials library focused on the Legal Amazon.",
    },
    description: {
      pt: 'Projeto de redesign completo do site institucional do IRI Brasil, com linha visual inspirada em sites modernos. Apresenta as campanhas e a atuação da organização, foco na Amazônia Legal (causa ambiental/climática, com braço de mobilização religiosa), através de páginas como a campanha "Ar Puro", calculadora de CO2, biblioteca de materiais e mapa de ações territoriais. O Next.js simula um backend no front, puxando conteúdo do Google Drive (API v3, conta de serviço) como camada de dados/CMS, sem precisar de banco de dados. Deploy na Vercel, e repositório no GitHub.',
      en: 'Complete redesign project for IRI Brasil\'s institutional website, with a visual style inspired by modern sites. It presents the organization\'s campaigns and work, focused on the Legal Amazon (an environmental/climate cause with a faith-based mobilization arm), through pages like the "Ar Puro" campaign, a CO2 calculator, a materials library, and a map of territorial actions. Next.js simulates a backend on the frontend, pulling content from Google Drive (API v3, service account) as a data/CMS layer, without needing a database. Deployed on Vercel, with a repository on GitHub.',
    },
    // live: { href: 'https://iribrasil.org' },
    cover: '/projects/iri/ar-puro.png',
    gallery: ['/projects/iri/ar-puro2.png', '/projects/iri/calc.png', '/projects/iri/calc2.png'],
  },
  {
    id: 'lp-barbosa',
    title: 'LP Barbosa',
    year: '2026',
    category: { pt: 'Landing Page', en: 'Landing Page' },
    stack: ['HTML', 'CSS', 'JavaScript'],
    intro: {
      pt: 'Landing page profissional em produção (jbarbosa.com.br). Site estático rápido e responsivo, feito com HTML, CSS e JavaScript puro sem frameworks.',
      en: 'Professional landing page in production (jbarbosa.com.br). Fast, responsive static site built with plain HTML, CSS and JavaScript, no frameworks.',
    },
    description: {
      pt: 'Landing page profissional em produção (jbarbosa.com.br). Site estático rápido e responsivo, feito com HTML, CSS e JavaScript puro sem frameworks.',
      en: 'Professional landing page in production (jbarbosa.com.br). Fast, responsive static site built with plain HTML, CSS and JavaScript, no frameworks.',
    },
    live: { href: 'https://jbarbosa.com.br/' },
    // cover: '/projects/lp-barbosa/jbarbosa.png',
    gallery: ['/projects/lp-barbosa/jbarbosa.png', '/projects/lp-barbosa/lp-barbosa-1.jpg', '/projects/lp-barbosa/lp-barbosa-2.png'],
  },
  {
    id: 'souza-treinamentos',
    title: 'Souza Treinamentos',
    year: '2026',
    category: { pt: 'EAD / WordPress', en: 'E-learning / WordPress' },
    stack: ['WordPress', 'PHP', 'WooCommerce'],
    intro: {
      pt: 'Plataforma EAD para cursos de segurança do trabalho (NRs). Catálogo de cursos, venda online, área do aluno e emissão de certificados.',
      en: 'E-learning platform for workplace safety courses (Brazilian NR regulations). Course catalog, online sales, student area and certificate issuance.',
    },
    description: {
      pt: 'Plataforma EAD para cursos de segurança do trabalho (NRs). Catálogo de cursos, venda online, área do aluno e emissão de certificados.',
      en: 'E-learning platform for workplace safety courses (Brazilian NR regulations). Course catalog, online sales, student area and certificate issuance.',
    },
    live: { href: 'https://souzatreinamentos.com.br/' },
    cover: '/projects/souza-treinamentos/souza-cover.jpg',
    gallery: [
      '/projects/souza-treinamentos/souza-1.jpg',
      '/projects/souza-treinamentos/souza-2.jpg',
    ],
  },
  {
    id: 'lessaclub',
    title: 'Lessa Club',
    year: '2026',
    category: { pt: 'Portfólio', en: 'Portfolio' },
    stack: ['HTML', 'CSS', 'Javascript'],
    intro: {
      pt: 'Site institucional one-page da Lessa Club, marca de roupas everyday, com abertura animada (intro) embutida na própria página.',
      en: "One-page institutional site for Lessa Club, an everyday clothing brand, with an animated intro built into the page itself.",
    },
    description: {
      pt: 'Site institucional one-page da Lessa Club, marca de roupas everyday (peças básicas em poliamida dupla premium). A página apresenta a coleção de três modelos (Shoulder, Essence, Babytee), conta a história da fundadora (Camille), explica o processo de compra e direciona toda a venda para o WhatsApp, sem carrinho, checkout ou backend próprio. O projeto inclui uma abertura animada (intro) embutida na própria página: a palavra "lessa" é revelada com um ponto de luz dourada acompanhando a escrita, seguida de um efeito de "ignição" na cor da marca e um zoom que dissolve para revelar o site. Aparece uma vez por sessão e respeita a preferência de "reduzir animações" do usuário.',
      en: 'One-page institutional site for Lessa Club, an everyday clothing brand (basic pieces in premium double polyamide). The page presents the collection of three models (Shoulder, Essence, Babytee), tells the founder\'s story (Camille), explains the purchase process, and routes all sales to WhatsApp, with no cart, checkout, or backend of its own. The project includes an animated intro built into the page itself: the word "lessa" is revealed with a golden point of light following the writing, followed by an "ignition" effect in the brand color and a zoom that dissolves to reveal the site. It appears once per session and respects the user\'s "reduce motion" preference.',
    },
    // link: { href: 'https://github.com/DerekCardoso' },
    // cover: '/projects/lessa/hero.png',
    gallery: [
      '/projects/lessa/hero.png',
      '/projects/lessa/como.png',
      '/projects/lessa/sobre.png',
      '/projects/lessa/footer.png',
    ],
  },
];

export type TimelineEntry = {
  /** Rótulo curto exibido na aba (nome da empresa/projeto) — mesmo nos dois idiomas. */
  company: string;
  /** Cargo/função, exibido como "Cargo @ Empresa". */
  role: Localized;
  /** Período (ex.: "Jan 2022 - Presente"). */
  year: Localized;
  /** Bullets de atividades/conquistas, como no "Where I've Worked" de referência. */
  items: LocalizedList;
};

export const timeline: TimelineEntry[] = [
  {
    company: 'GymBro',
    role: { pt: 'Desenvolvedor Frontend/Fullstack Mobile', en: 'Frontend/Fullstack Mobile Developer' },
    year: { pt: '2025–hoje', en: '2025–present' },
    items: {
      pt: [
        'Desenho e implemento de ponta a ponta o fluxo de matchmaking do cadastro ao match compatível por academia, horário, grupo muscular e intensidade sustentado por convites, chat e gestão de parceiros',
        'Construo o app em React Native com Expo e TypeScript estrito, organizando a arquitetura em camadas de serviços, estado persistido, telas por feature e um design system próprio',
        'Desenvolvo o módulo completo de treinos (rotinas semanais, treino ativo com timer e descanso, registro de cargas, recordes pessoais e sugestão de progressão) com experiência nativa cuidada (navegação, sheets, haptics)',
        'Gerencio estado e persistência local, validação de dados e integração com backend serverless para autenticação e banco de dados em tempo real',
        'Endureço privacidade e segurança (LGPD, aceite/reaceite de termos, exclusão de conta em duas fases e regras de acesso a dados) e mantenho testes automatizados e CI para qualidade de tipo',
      ],
      en: [
        'I design and implement the matchmaking flow end-to-end: from sign-up to a compatible match by gym, schedule, muscle group and intensity, sustained by invites, chat and partner management',
        'I build the app in React Native with Expo and strict TypeScript, organizing the architecture in service layers, persisted state, feature-based screens and a custom design system',
        'I develop the full workout module (weekly routines, active workout with timer and rest, load logging, personal records and progression suggestions) with careful native UX (navigation, sheets, haptics)',
        'I manage local state and persistence, data validation, and integration with a serverless backend for authentication and a real-time database',
        'I harden privacy and security (LGPD, terms acceptance/re-acceptance, two-phase account deletion and data access rules) and maintain automated tests and CI for type safety',
      ],
    },
  },
  {
    company: 'Cotraservi (Coob+)',
    role: { pt: 'Frontend Developer', en: 'Frontend Developer' },
    year: { pt: '2022–hoje', en: '2022–present' },
    items: {
      pt: [
        'Desenvolvo e evoluo aplicação React para uso operação comercial, traduzindo regras de negócio em fluxos de tela usáveis',
        'Integro o frontend a web services SOAP/ASMX legados, tratando sessões e permissões entre Redux e localStorage',
        'Construo componentes reutilizáveis e design systems, com foco em performance, acessibilidade e qualidade de código',
        'Colaboro em sprints ágeis com o time, priorizando código limpo e boas práticas em um sistema legado crítico para a receita',
      ],
      en: [
        'I develop and evolve a React application for the sales operation, translating business rules into usable screen flows',
        'I integrate the frontend with legacy SOAP/ASMX web services, handling sessions and permissions between Redux and localStorage',
        'I build reusable components and design systems, focused on performance, accessibility and code quality',
        'I collaborate in agile sprints with the team, prioritizing clean code and best practices in a legacy system critical to revenue',
      ],
    },
  },
  {
    company: 'BBChain (Bolsa OTC)',
    role: { pt: 'Frontend Developer', en: 'Frontend Developer' },
    year: { pt: '2022', en: '2022' },
    items: {
      pt: [
        'Implementei sistemas de autenticação robustos a nível de investidor, garantindo segurança e conformidade com padrões financeiros rigorosos',
        'Desenvolvi componentes reutilizáveis alinhados com a arquitetura da plataforma, promovendo consistência e reduzindo débito técnico',
        'Otimizei código e padrões estabelecidos, melhorando manutenibilidade e produtividade do time',
        'Adquiri experiência prática com ambiente permissionado e criptografado em instituições financeiras',
      ],
      en: [
        'I implemented robust investor-level authentication systems, ensuring security and compliance with strict financial standards',
        "I developed reusable components aligned with the platform's architecture, promoting consistency and reducing technical debt",
        'I optimized code and established patterns, improving maintainability and team productivity',
        'I gained hands-on experience with a permissioned, encrypted environment in financial institutions',
      ],
    },
  },
];

export const about = {
  intro: {
    pt: 'Sou desenvolvedor frontend e mobile com mais de 4 anos de experiência, focado em construir interfaces rápidas, acessíveis e bem cuidadas. Atualmente na Cotraservi (Coob+) e, nas horas livres, construo o GymBro, meu próprio app do zero.',
    en: "I'm a frontend and mobile developer with over 4 years of experience, focused on building fast, accessible, and well-crafted interfaces. Currently at Cotraservi (Coob+) and, in my free time, building GymBro, my own app from scratch.",
  } as Localized,
  paragraphs: {
    pt: [
      'Comecei mexendo em pequenos componentes mas viciei em transformar ideia em interface o tipo de trabalho onde um detalhe de espaçamento ou uma transição bem-feita muda como a pessoa sente o produto.',
      'Hoje atuo como Frontend Developer na Cotraservi (Coob+), sempre equilibrando performance, acessibilidade e uma boa experiência de uso.',
      'Fora do expediente, mergulhei de cabeça em mobile: construo o GymBro, um app em React Native para encontrar parceiro de treino, do conceito ao produto. Geolocalização, matching e tudo mais, sozinho.',
      'No fluxo do dia a dia, uso Claude e ChatGPT como parceiros de trabalho: entrego mais rápido sem abrir mão da qualidade do código.',
    ],
    en: [
      "I started tinkering with small components and got hooked on turning ideas into interfaces: the kind of work where a spacing detail or a well-crafted transition changes how someone feels about a product.",
      'Today I work as a Frontend Developer at Cotraservi (Coob+), always balancing performance, accessibility, and a good user experience.',
      "Outside of work, I dove headfirst into mobile: I'm building GymBro, a React Native app to find workout partners, from concept to product (geolocation, matching, and everything else) on my own.",
      'In my day-to-day workflow, I use Claude and ChatGPT as work partners: I ship faster without giving up code quality.',
    ],
  } as LocalizedList,
};

export const stackGroups = [
  { label: 'Mobile', items: ['React Native', 'Expo', 'React Navigation', 'Zustand', 'Zod'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Redux', 'AngularJS'] },
  { label: 'UI', items: ['Material UI', 'Ant Design', 'Tailwind', 'Radix UI', 'Figma'] },
  { label: 'Testes', items: ['Jest', 'Cypress', 'RTL'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'Firebase', 'Supabase', 'Google Drive API'] },
  { label: 'DevOps', items: ['Git', 'Azure DevOps', 'GitHub Actions', 'AWS', 'Vercel'] },
];

/** Strings de interface (navegação, botões, rótulos fixos). */
export const ui: Record<
  Locale,
  {
    navAbout: string;
    navExperience: string;
    navProjects: string;
    navContact: string;
    resume: string;
    ariaHome: string;
    ariaGithub: string;
    ariaLinkedin: string;
    ariaWhatsapp: string;
    ariaEmail: string;
    ariaThemeToggle: string;
    heroHi: string;
    heroSub: string;
    heroCta: string;
    headingAbout: string;
    headingExperience: string;
    headingProjects: string;
    aboutTechIntro: string;
    featuredLabel: string;
    viewDetails: string;
    otherProjects: string;
    contactNum: string;
    contactTitle: string;
    contactText: string;
    contactBtn: string;
    backToProjects: string;
    viewLive: string;
    codeLabel: string;
    footerBuiltBy: string;
  }
> = {
  pt: {
    navAbout: 'Sobre',
    navExperience: 'Trajetória',
    navProjects: 'Projetos',
    navContact: 'Contato',
    resume: 'Currículo',
    ariaHome: 'Início',
    ariaGithub: 'GitHub',
    ariaLinkedin: 'LinkedIn',
    ariaWhatsapp: 'WhatsApp',
    ariaEmail: 'E-mail',
    ariaThemeToggle: 'Alternar tema claro/escuro',
    heroHi: 'Olá, meu nome é',
    heroSub: 'Criando web e mobile.',
    heroCta: 'Ver meus projetos',
    headingAbout: 'Sobre mim',
    headingExperience: 'Trajetória',
    headingProjects: 'Projetos',
    aboutTechIntro: 'Algumas tecnologias com que venho trabalhando:',
    featuredLabel: 'Projeto em destaque',
    viewDetails: 'Ver detalhes →',
    otherProjects: 'Outros projetos',
    contactNum: '04. O que vem agora?',
    contactTitle: 'Fale comigo',
    contactText:
      'Estou aberto a novas oportunidades e minha caixa de entrada está sempre aberta. Se tiver uma pergunta ou só quiser dar um oi, respondo assim que possível.',
    contactBtn: 'Diga olá',
    backToProjects: '← Projetos',
    viewLive: 'Ver ao vivo',
    codeLabel: 'Código',
    footerBuiltBy: 'Feito por',
  },
  en: {
    navAbout: 'About',
    navExperience: 'Experience',
    navProjects: 'Projects',
    navContact: 'Contact',
    resume: 'Resume',
    ariaHome: 'Home',
    ariaGithub: 'GitHub',
    ariaLinkedin: 'LinkedIn',
    ariaWhatsapp: 'WhatsApp',
    ariaEmail: 'Email',
    ariaThemeToggle: 'Toggle light/dark theme',
    heroHi: "Hi, my name is",
    heroSub: 'Building web and mobile.',
    heroCta: 'See my projects',
    headingAbout: 'About me',
    headingExperience: 'Experience',
    headingProjects: 'Projects',
    aboutTechIntro: "Some technologies I've been working with:",
    featuredLabel: 'Featured project',
    viewDetails: 'View details →',
    otherProjects: 'Other projects',
    contactNum: "04. What's next?",
    contactTitle: 'Get in touch',
    contactText:
      "I'm open to new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll get back to you as soon as possible.",
    contactBtn: 'Say hello',
    backToProjects: '← Projects',
    viewLive: 'View live',
    codeLabel: 'Code',
    footerBuiltBy: 'Built by',
  },
};
