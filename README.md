# Kokoro — Site Institucional

Site institucional da Kokoro, construído com **Vite + React + TypeScript**.

## Requisitos

- Node.js 18+
- npm ou yarn

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:5173

## Build para produção

```bash
npm run build
```

Os arquivos de saída ficam em `/dist`.

## Deploy rápido (Vercel)

```bash
npm install -g vercel
vercel deploy
```

Ou arraste a pasta `/dist` direto em https://vercel.com/new.

## Páginas internas (sem link no menu)

Rotas React com o mesmo layout da landing (nav coral, footer, tipografia e cores):

| URL | Componente |
|-----|------------|
| `/biblioteca-mensagens` | `src/pages/BibliotecaMensagensPage.tsx` (+ mock WhatsApp fixo à direita) |
| `/nudge` | `src/pages/NudgePage.tsx` |

## Estrutura

```
institucional/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx        ← componentes da landing page
│   ├── main.tsx       ← entry point React
│   └── index.css      ← reset + estilos globais
├── src/pages/          ← Home, Biblioteca, Nudge
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

## Seções da página

- **Nav** — fixa, com blur ao rolar
- **Hero** — headline, bubble de chat, CTAs
- **Problema** — estatísticas de impacto (IBGE, OMS, UFF)
- **Solução** — jornada + mock de conversa WhatsApp
- **Diferenciais** — 6 cards de features
- **Planos** — BASE / SMART / INSIGHT
- **Parceiros** — dashboard simulado + benefícios
- **Contato** — formulário de captação de leads
- **Footer**
