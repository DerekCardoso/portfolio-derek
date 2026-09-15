# IA no Frontend — Cursos e Todas as Possibilidades de Uso

*Pesquisado em julho de 2026. Links no fim do arquivo.*

---

## A distinção que decide tudo

Sua pergunta juntou duas frentes que o mercado remunera de forma completamente diferente:

| | **Frente A — IA como ferramenta** | **Frente B — IA como produto** |
|---|---|---|
| O que é | Você usa IA para escrever código mais rápido | Você constrói features que usam LLM |
| Ferramentas | Cursor, Claude Code, Copilot | APIs de LLM, embeddings, vector DB |
| Efeito no CV | **Zero.** É expectativa mínima em 2026 | **Muda a faixa salarial** |
| Quem tem | Todo mundo | Poucos — e é exatamente por isso que paga |

A Frente A te torna 30–50% mais produtivo e **você já faz isso**. Mas ninguém contrata alguém
por saber usar Cursor, do mesmo jeito que ninguém contratava por saber usar o VS Code.

A Frente B é o que faz a vaga de "AI Engineer" pagar em dólar. E a boa notícia: sendo frontend,
você tem uma vantagem real — a maioria dos produtos de IA hoje é **interface sobre um LLM**, e
quem sabe construir a interface *e* a camada de IA é raro.

**Recomendação:** invista 20% do tempo na Frente A e 80% na Frente B.

---

# PARTE 1 — OS CURSOS

## Trilha recomendada para o seu perfil (React/Next/RN)

### Etapa 0 — Grátis, comece por aqui (1–2 semanas)

**Vercel Academy — "Builders Guide to the AI SDK"** · Grátis · Oficial
O melhor ponto de partida para o *seu* stack, sem discussão. Usa AI SDK v7 (`Output.object()`,
`instructions`), e o formato é incremental: você começa com código quebrado e evolui para
padrões de produção, incluindo debug de problemas reais. Cobre streaming, structured outputs
e tool calling — que é exatamente o vocabulário que aparece nas vagas.

**Anthropic Academy** · Grátis · Com certificado
Lançada em março de 2026, tem 16 cursos self-paced. Só pede e-mail — sem cartão, sem upsell.
Para você, na ordem: **Claude Platform 101** → **Building with the Claude API** (system prompts,
tool use, context windows, padrões de arquitetura). Tem também trilha de MCP e Claude Code.
O certificado é secundário; o valor está em aprender os padrões direto de quem faz o modelo.

### Etapa 1 — A trilha principal (paga, 4–8 semanas)

**Frontend Masters — trilha de IA.** É a plataforma com melhor encaixe para dev frontend,
porque os cursos assumem que você já sabe JS/React e vão direto ao ponto. Ordem sugerida:

1. **Practical Prompt Engineering** — base, se você nunca formalizou isso.
2. **AI Engineering Fundamentals** (Scott Moss, eng. sênior na Netflix) — o mais importante
   da lista. Constrói um app estilo Excalidraw com agente que gera diagramas, e cobre
   **eval harness, context engineering e RAG**. O curso é explícito em dizer que RAG é
   "mal compreendido, super-vendido e mais difícil de acertar do que parece" — esse tipo de
   honestidade é o que você quer num curso.
3. **AI Agents** — tool calling, LLMs e human-in-the-loop.
4. **AI Agent: From Prototype to Production** — evals, RAG, feedback loop, telemetria.
   É a diferença entre demo e produto.
5. **Cursor & Claude Code** — a Frente A. Deixe por último, é o mais fácil.
6. **MCP** — opcional, mas MCP virou padrão de integração e ainda tem pouca gente que domina.

**Scrimba — AI Engineer Path** · US$ 20/mês ou US$ 150/ano
Alternativa mais barata e 100% JavaScript (não exige Python). Cobre agents, RAG, MCP, Vercel
AI SDK e deploy na Cloudflare, no formato interativo em que você edita código dentro da aula.
Parcerias com Mistral, LangChain e Hugging Face.

> **Ressalva honesta:** a trilha tem ~11 horas. É uma especialização, não um bootcamp — bem
> mais curta que a trilha de Frontend deles. Ótima para destravar rápido, insuficiente sozinha.

### O que eu NÃO recomendaria para você

- **DataCamp Associate AI Engineer** (~80h) — bom curso, mas gasta tempo relevante com
  fine-tuning, PyTorch e Hugging Face. Você não precisa treinar modelo; precisa aplicar.
  Custo de oportunidade alto.
- **Qualquer curso "certificação em IA"** genérico. Certificado não impressiona ninguém que
  contrata dev. Projeto rodando, sim.

---

# PARTE 2 — TODAS AS POSSIBILIDADES DE USO

## Frente A — IA no fluxo de desenvolvimento

O padrão que se consolidou em 2026 é usar duas ferramentas com papéis distintos:

- **Claude Code** — geração autônoma de componentes e refactor atravessando vários arquivos.
  Bom para andaimar uma feature em 6–12 arquivos, criar rotas, ligar state management.
- **Cursor** — edição interativa, tab completion e feedback visual. Bom para ajuste fino de
  UI, edge cases e copy.

Fluxo típico de quem usa bem: Claude Code para estruturar a feature, depois Cursor para lapidar.

**Onde aplicar no dia a dia:**

| Uso | Impacto |
|---|---|
| Scaffolding de componentes e rotas | Alto |
| Refactor atravessando a árvore de componentes | Alto |
| Geração de testes (Jest, RTL, Cypress) | Alto — é onde mais gente economiza tempo |
| Migração de versão (React 18→19, Next 14→15) | Alto |
| Design-to-code via Figma MCP | Médio-alto |
| Auditoria de acessibilidade (labels, estrutura, estados) | Médio |
| Geração de Storybook e documentação | Médio |
| Code review automatizado em PR | Médio |
| Commit messages e descrição de PR | Baixo |

## Frente B — IA dentro do produto

Aqui está o que vira bullet de currículo. Organizei do mais simples ao mais valorizado.

### Nível 1 — "Invisible AI" (features onde o usuário nem vê o LLM)
Subestimado e é onde a maioria dos produtos reais ganha dinheiro.

- **Classificação** — categorizar automaticamente input do usuário, tickets, conteúdo
- **Extração estruturada** — texto livre → JSON validado (`generateObject` / structured outputs)
- **Sumarização** — resumo de threads, atividades, histórico
- **Moderação** — filtrar conteúdo impróprio antes de publicar
- **Roteamento** — decidir para onde mandar uma requisição do usuário

### Nível 2 — Busca e recomendação (embeddings)
**Esta é a sua veia direta com o GymBro.**

- **Busca semântica** — encontrar por significado, não por palavra-chave
- **Matching / recomendação** — similaridade de cosseno entre perfis vetorizados
- **Deduplicação** — detectar itens parecidos
- **Clustering** — agrupar usuários ou conteúdo por afinidade

### Nível 3 — Interfaces conversacionais
- **Chat com streaming** — o básico, mas UX de streaming bem feita é difícil
- **Busca em linguagem natural** — "quero treinar perna de manhã perto da praia"
- **Formulários conversacionais** — substituir 12 campos por uma frase
- **Voz** — speech-to-text + resposta falada

### Nível 4 — Tool calling e agentes
- **Agente que age na UI** — o LLM chama funções que alteram o estado do app
- **Human-in-the-loop** — o agente propõe, o usuário aprova antes de executar
- **Fluxos multi-step** — o modelo encadeia várias ferramentas para completar uma tarefa
- **MCP** — expor as capacidades do seu produto para agentes externos

### Nível 5 — Generative UI ⭐
**A interseção mais pura de frontend + IA, e o maior diferencial de todos.**

Em vez do LLM devolver texto, ele decide **qual componente React renderizar** e com quais
props. Você define um catálogo de componentes, o modelo escolhe e preenche. A resposta deixa
de ser um blob de markdown e vira interface de verdade.

Isso praticamente só um frontend consegue fazer bem — e quase ninguém está fazendo. Se você
quer um único assunto para dominar e virar referência, é este.

### Nível 6 — Multimodal
- **Imagem → dados estruturados** (foto do equipamento da academia → ficha de exercício)
- **Alt text automático** — acessibilidade gerada por visão computacional
- **Documento → formulário preenchido** (OCR + extração)

---

## A camada que quase ninguém tem (e é o que separa júnior de sênior em IA)

Saber chamar a API é commodity. O que faz alguém ser contratado como AI Engineer:

1. **Evals** — como você *sabe* que a feature funciona? Suite de casos de teste, medição de
   qualidade de output, prompts versionados. É o tema mais recorrente nos cursos sérios e o
   mais ignorado por quem só assiste tutorial.
2. **Context engineering** — o que entra no contexto, em que ordem, dentro de qual budget.
   Substituiu "prompt engineering" como habilidade central.
3. **Custo e latência** — tokens por request, cache de embeddings, escolher modelo barato onde
   dá e caro só onde precisa. Todo gestor se importa com isso e quase nenhum dev mede.
4. **Falha graciosa** — o que a UI faz quando a API cai, estoura rate limit ou devolve lixo.
   Puro frontend, e é onde a maioria dos protótipos morre.
5. **Observabilidade** — telemetria, feedback real de usuário, o "data flywheel".
6. **UX de streaming** — o que mostrar enquanto gera, como lidar com interrupção, skeleton vs.
   token-by-token. De novo: território seu.

Os itens 4, 5 e 6 são vantagem competitiva sua como frontend. Explore isso.

---

# ROTEIRO SUGERIDO (8 semanas, encaixado no plano do GymBro)

| Semana | Estudo | Aplicação no GymBro |
|---|---|---|
| 1 | Vercel Academy AI SDK (grátis) | Setup do projeto, primeira chamada com streaming |
| 2 | Anthropic Academy: Claude API | Structured outputs para gerar plano de treino |
| 3–4 | FM: AI Engineering Fundamentals | Migrar matching para embeddings + pgvector |
| 5–6 | FM: AI Agents | Busca em linguagem natural + tool calling |
| 7 | FM: Prototype to Production | Eval harness e medição de custo |
| 8 | FM: Cursor & Claude Code | Publicar no TestFlight, escrever post técnico |

Estude **enquanto** constrói, nunca antes. Curso assistido sem aplicar evapora em duas semanas
e não vira bullet de CV.

---

## Links

**Grátis**
- Vercel Academy — Builders Guide to the AI SDK: https://vercel.com/academy/ai-sdk
- Anthropic Academy: https://www.anthropic.com/learn · https://anthropic.skilljar.com/
- Repo oficial do curso AI SDK: https://github.com/vercel/ai-sdk-fundamentals-starter
- AIHero.dev — tutorial AI SDK em TypeScript: https://www.aihero.dev/vercel-ai-sdk-tutorial

**Pagos**
- Frontend Masters — AI Engineering Fundamentals: https://frontendmasters.com/courses/ai-engineering/
- Frontend Masters — AI Agent: Prototype to Production: https://frontendmasters.com/courses/production-ai/
- Frontend Masters — AI Agents: https://frontendmasters.com/courses/ai-agents-v2/
- Frontend Masters — todos os cursos de IA: https://frontendmasters.com/topics/artificial-intelligence/
- Scrimba — AI Engineer Path: https://scrimba.com/learn/aiengineer
