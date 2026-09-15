# Derek Cardoso — CV v2 + Plano de Posicionamento

> **Como usar:** tudo marcado com `[[ ]]` é um número ou fato que só você tem. Não publique o CV com placeholders. A seção 3 explica como levantar cada um.

---

# PARTE 1 — CV REESCRITO (inglês, para vagas internacionais)

---

**Derek Cardoso dos Santos**
**Frontend & Mobile Engineer — React · React Native · AI-Powered Products**

Praia Grande – SP, Brazil (UTC−3, available for US/EU overlap) | +55 13 99153-9067 | derek.cardoso@gmail.com
linkedin.com/in/derek-cardoso | github.com/DerekCardoso | [[link do GymBro / portfólio]]

### PROFESSIONAL SUMMARY

Frontend engineer with 4+ years shipping production React interfaces, now building AI-powered
mobile products with React Native. Designed and shipped GymBro, a workout-partner matching app
using semantic search over user embeddings to replace rule-based filtering. Experienced owning
features end-to-end in agile teams — from design system architecture to CI/CD — with a focus on
performance, accessibility, and measurable delivery impact.

*(Nota: essa versão do resumo assume o GymBro revivido com IA. Se ainda não estiver pronto,
use a variante em "CV de transição", no fim do arquivo.)*

### TECH STACK

| | |
|---|---|
| **AI / LLM** | OpenAI & Anthropic APIs, Vercel AI SDK, embeddings & vector search (pgvector), function calling, streaming, RAG, prompt evaluation |
| **Mobile** | React Native, Expo, expo-location, Google Places API |
| **Frontend** | React 19, Next.js 15, TypeScript, Redux, React Hooks, JavaScript ES6+ |
| **UI / Design** | Design Systems, Material UI, Ant Design, TailwindCSS, SASS, Figma, a11y (WCAG) |
| **Backend** | Node.js, Express, PostgreSQL, MongoDB, REST APIs, Firebase / Firestore |
| **Testing** | Jest, Cypress, React Testing Library |
| **DevOps** | Git, Azure DevOps, CI/CD, AWS, Webpack |

> **Regra:** só liste o que você aguenta 20 minutos de entrevista técnica. Corte o resto sem dó.

### PROJECTS

**GymBro — AI-Powered Workout Partner Matching (React Native)**
*Solo developer | 2025 – Present | [[App Store / TestFlight / demo link]]*

- Built a cross-platform mobile app in React Native + Expo that matches users by training
  schedule, intensity, muscle group, and gym proximity.
- Replaced rule-based filtering with **semantic matching using embeddings + vector search
  (pgvector)**, improving match relevance from [[X]] to [[Y]] in blind user testing with [[N]] testers.
- Implemented **[[feature LLM: ex. natural-language partner search / AI-generated workout plans]]**
  with streaming responses and structured outputs via the Vercel AI SDK.
- Cut LLM inference cost by [[X]]% through embedding caching and model tiering
  ([[modelo barato]] for routine calls, [[modelo forte]] for complex generation).
- Owned the full lifecycle: architecture, backend, mobile client, and release. [[N]] active users.

### WORK EXPERIENCE

**Frontend Developer — Cotraservi (Coob+)** | Jan 2022 – Present

- Built and maintained a design system of **[[N]] reusable components** (Material UI, Ant Design)
  adopted by [[N]] applications, cutting new-screen development time by [[X]]%.
- Improved application performance — [[ex: Lighthouse 62 → 91 / LCP 4.1s → 1.8s / bundle −38%]] —
  across products serving [[N]] users.
- Raised accessibility compliance to [[WCAG 2.1 AA / score X]], [[como: auditoria, correção de N issues]].
- Integrated REST APIs and internal systems; managed sprints and CI/CD pipelines in Azure DevOps.
- [[Se aplicável: mentored N junior developers / led frontend architecture decisions for X]]

*(Se você teve promoção, título novo ou mudou de escopo em algum momento, quebre em duas
entradas com datas. Progressão visível é um dos sinais mais fortes de senioridade.)*

**Frontend Developer — BBChain** | Apr – May 2022 · *Short-term contract (parallel project)*

- Delivered [[o que exatamente: N telas / módulo X]] in React.js with reusable components and
  REST API integration, tested with Jest.

> **Decisão:** ou você deixa explícito que foi paralelo (como acima), ou remove. Do jeito que
> está no CV atual — 2 meses sobrepondo o emprego atual, sem explicação — o recrutador trava
> na linha e desconfia. Ambiguidade nunca joga a seu favor.

### EDUCATION

**B.Sc. in Information Systems** — Universidade Paulista (UNIP) | 2018 – 2021

**Continued learning:** [[Curso de IA que você vai fazer — ver Parte 2]] · React 19 & Next.js 15

> Cortei React+Redux (Udemy), React Developer (DIO), TypeScript (DIO) e JavaScript ES6 (DIO).
> Com 4,5 anos de carreira, curso introdutório de ES6 no CV sinaliza júnior. Sua experiência
> já prova que você sabe JavaScript — listar o curso sugere insegurança.

### LANGUAGES

Portuguese (native) · English ([[seu nível real — ver seção 3]])

> **Seção obrigatória para vaga internacional.** Sem isso, muitos recrutadores descartam
> antes de ler o resto.

---

> **Também removi a seção HIGHLIGHTS inteira.** Ela repetia o resumo e a experiência sem
> adicionar nada. CV de 1 página com densidade alta > CV de 2 páginas com repetição.

---

# PARTE 2 — O PLANO DE IA (8 semanas)

O objetivo não é "aprender IA". É **ter uma coisa construída que prove que você constrói com IA.**
Certificado não faz olho brilhar. Produto rodando com usuário real, faz.

O GymBro é o veículo perfeito porque matching *é* o problema canônico de embeddings. Você não
precisa de projeto novo — precisa transformar o que já existe.

### Semanas 1–2 — Fundamentos aplicados
- Vercel AI SDK: streaming, `generateObject` (structured outputs), tool calling.
  Encaixa direto no seu stack React/Next, curva de aprendizado curta.
- Entender embeddings de verdade: o que é um vetor, similaridade de cosseno, por que
  isso resolve matching melhor que `WHERE`.
- **Entrega:** um endpoint que gera embedding de um perfil de usuário e o persiste.

### Semanas 3–4 — O coração do projeto
- Migrar o matching do GymBro para busca vetorial (pgvector no Supabase é o caminho mais
  rápido e tem tier grátis).
- Modelar o perfil como texto ("treina de manhã, foco em superiores, intensidade alta,
  Zona Norte") e buscar por similaridade + filtro geográfico.
- **Entrega:** matching semântico funcionando. *Meça antes e depois* — esse número vai pro CV.

### Semanas 5–6 — Uma feature de LLM com cara de produto
Escolha **uma**, não três:
- Busca em linguagem natural: "quero alguém pra treinar perna de manhã perto da Praia Grande"
- Geração de plano de treino conjunto a partir dos dois perfis do match
- Ice-breaker automático baseado nos objetivos em comum

**Entrega:** feature com streaming, tratamento de erro e fallback quando a API falha.
Saber lidar com falha de LLM é exatamente o que separa protótipo de produção.

### Semanas 7–8 — O que quase ninguém faz (e por isso te destaca)
- **Evals:** monte 20–30 casos de teste e meça a qualidade do output. Versione os prompts.
- **Custo e latência:** meça tokens por request, cacheie embeddings, use modelo barato onde dá.
- **Publique:** TestFlight ou Play Store beta. *Publicado* muda tudo — vira produto, não exercício.
- Escreva um post técnico curto sobre a migração de rule-based para semântico. É prova
  pública de raciocínio e alimenta seu LinkedIn.

### Sobre o curso de React 19 / Next 15
Continue, mas em segundo plano. É manutenção de stack, não diferencial competitivo — todo
candidato sênior tem. Se precisar escolher onde colocar as horas da semana, coloque no GymBro.

---

# PARTE 3 — COMO LEVANTAR OS NÚMEROS

Você provavelmente acha que não tem métricas. Tem — só nunca mediu. Onde procurar:

**Design system (Cotraservi)**
- Conte os componentes no repo: `ls src/components | wc -l`
- Quantas aplicações/times importam a lib?
- Pergunte a um colega: "quanto tempo levava para montar uma tela antes vs. depois?"
  Estimativa honesta com fonte é infinitamente melhor que nenhum número.

**Performance**
- Rode Lighthouse hoje. Se você melhorou algo no passado, ache o commit e rode na versão antiga
  (`git stash` + checkout). O delta é real e você pode defendê-lo.
- `webpack-bundle-analyzer` para antes/depois de bundle.

**Acessibilidade**
- axe DevTools ou Lighthouse a11y score. Quantos issues você corrigiu?

**Escala do produto**
- Pergunte ao PM/gestor quantos usuários o produto tem. Ninguém esconde isso.

**Regra de ouro:** número honesto e defensável > número redondo e inflado. Você vai ter que
explicar cada um numa entrevista. Se não conseguir explicar como chegou nele, não use.

**Inglês:** seja preciso e honesto. "Advanced — daily written communication, comfortable in
meetings" é ótimo. "Fluent" quando você trava numa call queima a vaga e a reputação com o
recrutador. Se estiver inseguro, faça um teste rápido (EF SET, gratuito, 50 min) e use o resultado.

---

# PARTE 4 — CV DE TRANSIÇÃO (usar AGORA, antes do GymBro pronto)

Você vai querer aplicar antes das 8 semanas acabarem. Nesse caso, **não** afirme o que ainda
não construiu. Use esta versão do bloco GymBro e do resumo:

**Resumo:**
> Frontend engineer with 4+ years shipping production React interfaces, focused on performance,
> accessibility, and design systems at scale. Currently building GymBro, a React Native app for
> workout-partner matching, and expanding into AI-powered product development — embeddings,
> semantic search, and LLM integration.

**GymBro:**
> - Cross-platform mobile app in React Native + Expo with geolocation-based partner matching
>   (expo-location, Google Places API).
> - Solo developer: architecture, backend, and mobile client.
> - Currently migrating the matching engine from rule-based filtering to semantic search
>   with embeddings.

"Currently migrating" é verdadeiro, mostra direção e dá um gancho ótimo de conversa na entrevista.
E, diferente do CV atual, é um cheque que você consegue descontar.

---

# CHECKLIST DE PRIORIDADE

1. **Reviver o GymBro** — é a peça que sustenta dois dos seus três alvos. Sem isso, o resto é cosmético.
2. **Levantar 3–4 números da Cotraservi** — maior ganho por hora investida no CV. Faça esta semana.
3. **Resolver o BBChain** — explicar ou remover. 5 minutos.
4. **Adicionar seção de idiomas** — obrigatório para internacional. 2 minutos.
5. **Cortar cursos básicos e a seção Highlights** — 5 minutos.
6. **Executar o plano de IA** — 8 semanas, é o que muda de faixa salarial.

Itens 2–5 levam menos de uma hora somados e já melhoram o CV hoje. Itens 1 e 6 são o que
te tiram de "mais um dev React" e te colocam em "mobile engineer que constrói com IA".
