# BBVA España — Catálogo demo

A configurable Next.js **catalog demo** styled as a fictional **BBVA España** product showcase: cuentas, tarjetas, hipotecas, préstamos, inversión y seguros. All data is **static JSON** — no live banking APIs are called and no real customer information is used.

> **Demo educativa.** Datos ficticios. No constituye una oferta comercial ni asesoramiento financiero. BBVA es marca registrada de su titular; este repositorio no incluye assets oficiales de marca y se ha construido únicamente con tipografía y paleta libres como referencia visual.

This branch was created for a **Cursor 101 fundamentals** demo — see [`DEMO.md`](./DEMO.md) for the live user story (Mortgage Affordability Calculator) and the prompt-by-prompt playbook.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app boots straight into the **banking** vertical (full Spanish UI) — no env vars required.

## Scripts

| Command            | Action                            |
| ------------------ | --------------------------------- |
| `npm run dev`      | Dev server (Turbopack)            |
| `npm run build`    | Production build                  |
| `npm run start`    | Run production server locally     |
| `npm run lint`     | ESLint                            |
| `npm test`         | Run Vitest unit tests             |
| `npm run test:watch` | Vitest in watch mode            |

## Verticals (build-time)

This repo keeps the original DevDex multi-vertical mechanism so the demo can be re-themed live by flipping a single env var:

| `NEXT_PUBLIC_VERTICAL` | Content                                                   |
| ---------------------- | --------------------------------------------------------- |
| `banking` (default)    | BBVA España catálogo (Spanish UI, 12 demo products)       |
| `devtools`             | Libraries & tooling (English UI)                          |
| `retail`               | Sample retail SKUs (English UI)                           |
| `healthcare`           | Fictional healthcare **training** stubs — not medical advice |

Data lives under `src/data/verticals/<vertical>/`.

## Branding env vars

All colors and titles can be overridden per-environment via `NEXT_PUBLIC_*` variables — useful for previewing alternate brand themes from a single deploy. Defaults out of the box match the BBVA palette:

| Variable                       | Default       |
| ------------------------------ | ------------- |
| `NEXT_PUBLIC_SITE_TITLE`       | `BBVA España — Catálogo demo` |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Demo educativa de un catálogo de productos bancarios (datos ficticios). |
| `NEXT_PUBLIC_BG_COLOR`         | `#ffffff`     |
| `NEXT_PUBLIC_PRIMARY_COLOR`    | `#004481` (BBVA navy) |
| `NEXT_PUBLIC_ACCENT_COLOR`     | `#1973b8` (BBVA blue) |
| `NEXT_PUBLIC_SURFACE_COLOR`    | `#f3f6fb`     |
| `NEXT_PUBLIC_TEXT_COLOR`       | `#121212`     |
| `NEXT_PUBLIC_MUTED_COLOR`      | `#5b6470`     |
| `NEXT_PUBLIC_LOGO_URL`         | _(unset — initials placeholder is shown)_ |

Colors are exposed as CSS variables on `<html>` (`--color-bg`, `--color-accent`, etc.).

## Deploy on Vercel

1. Push the branch to GitHub.
2. **New Project** in Vercel → import the repo; Next.js is auto-detected.
3. Set **Environment Variables** if you want to override branding or switch the vertical.
4. Deploy. Use **Preview** builds to validate alternate themes/verticals.

## License

[MIT](./LICENSE)
