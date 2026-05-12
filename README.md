# DevDex

Professional **catalog / “dex”** demo: search, category filter, and detail pages over **static JSON fixtures** — **no external data APIs**. Intended for **Vercel** deploys with **per-environment branding** via `NEXT_PUBLIC_*` variables.

## Quick start

```bash
cd devdex
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verticals (build-time)

Set `NEXT_PUBLIC_VERTICAL` to one of:

| Value        | Content                          |
| ------------ | -------------------------------- |
| `devtools`   | Libraries & tooling (default)    |
| `retail`     | Sample retail SKUs               |
| `healthcare` | Fictional healthcare **training** stubs — not medical advice |

Data lives under `src/data/verticals/<vertical>/`.

## Branding env vars

See [.env.example](./.env.example). Colors map to CSS variables on `<html>` (`--color-bg`, `--color-accent`, etc.). Optional `NEXT_PUBLIC_LOGO_URL` renders in the header.

## Scripts

| Command       | Action        |
| ------------- | ------------- |
| `npm run dev` | Dev server    |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint`  | ESLint        |

## Deploy on Vercel

1. Push this repo to GitHub (or GitLab / Bitbucket).
2. **New Project** in Vercel → import the repo; framework **Next.js** is auto-detected.
3. Set **Environment Variables** from `.env.example` (at least `NEXT_PUBLIC_VERTICAL` if not using the default).
4. Deploy. Use **Preview** builds to validate alternate env sets.

## License

[MIT](./LICENSE)
