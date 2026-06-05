# Kokoro — Site Institucional

Site institucional da Kokoro (Vite + React + TypeScript).

**Produção:** [https://kokorosaude.com.br](https://kokorosaude.com.br)

## Desenvolvimento

```bash
npm install
cp .env.example .env
npm run dev
```

Acesse: http://localhost:5173

## Deploy (Vercel)

Projeto separado do portal (`portal/` é outro app no Vercel).

| Variável | Valor |
|----------|--------|
| `VITE_LOGIN_URL` | `https://portal.kokorosaude.com.br/login` |

**Domínios sugeridos:**

| App | Domínio |
|-----|---------|
| Institucional | `kokorosaude.com.br` / `www.kokorosaude.com.br` |
| Portal | `portal.kokorosaude.com.br` |

Build: `npm run build` → output `dist` (configurado em `vercel.json` com rewrite SPA).

## Páginas internas

| URL | Descrição |
|-----|-----------|
| `/biblioteca-mensagens` | Biblioteca de mensagens |
| `/nudge` | Nudge |

## Estrutura

```
institucional/
├── src/
│   ├── pages/       Home, Biblioteca, Nudge
│   ├── components/  Nav, Footer, Logo
│   └── theme.ts     LOGIN_URL → portal
├── vercel.json
└── vite.config.ts
```
