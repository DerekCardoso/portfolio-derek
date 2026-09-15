# Portfólio Derek Cardoso

Portfólio de página única (scroll normal), no estilo [v4.brittanychiang.com](https://v4.brittanychiang.com/): tema navy, acento verde, seções numeradas (Sobre, Trajetória, Projetos, Contato). Sem loader nem animações de entrada — conteúdo estático, com transições só no hover.

Multi-idioma (PT/EN): o idioma ativo mora em `App` e é distribuído via `LangContext`, sem precisar passar `lang` como prop em cada componente.

Stack: React + TypeScript + Vite.

## Rodar

```bash
npm install
npm run dev
```

Build de produção: `npm run build`.

## Estrutura

```
src/
  App.tsx                # toda a página: header, rails, seções e detalhe de projeto
  data/content.ts         # todo o texto do site (PT/EN), projetos, trajetória, strings de UI
  index.css
public/
  cv/Resume-Derek-Cardoso.pdf
  foto-derek.jpeg
  projects/                # imagens de capa e galeria de cada projeto
```

`App.tsx` concentra os componentes da página (Header, SocialRail, Hero, Sobre, Trajetória, Projetos, Contato, ProjectDetail) — não há mais divisão em pastas por feature, dado o tamanho atual do site.

## Como funciona

- **Navegação:** âncoras (`#sobre`, `#trajetoria`, `#projetos`, `#contato`) com scroll normal da página.
- **Projetos:** `projects` em `content.ts` — os que têm `cover` aparecem como destaque (`FeaturedProject`), os demais num grid de cards (`folder-card`). Clicar em qualquer um troca para a view de detalhe (`ProjectDetail`), com galeria de imagens e ESC/botão para voltar.
- **Currículo:** o botão CV baixa `public/cv/Resume-Derek-Cardoso.pdf` (`personal.cvUrl`).

## Próximos passos possíveis

1. `public/og-image.png` para a prévia ao compartilhar o link.
