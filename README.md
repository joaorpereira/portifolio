# João Paulo Pereira — Portfolio (Astro)

Static, recruiter-friendly portfolio built with **Astro**, **TypeScript**, and **Tailwind CSS**. All copy and structure for experience, projects, skills, and education flows from a single JSON file.

## Requirements

- **Node.js** 18.17+ (or 22+ if you prefer aligning with the latest Astro CLI)

## Environment

Use a repo-root **`.env`** for `npm run dev` and for variables that **`infra/deploy.sh`** sources (bucket, distribution ID, AWS profile). Add **`.env.production`** for `npm run build` / `astro build`: Vite loads `.env` then `.env.production`, so production `PUBLIC_*` values can match or override local ones. Both files are gitignored; start from [`.env.example`](./.env.example).

- **`PUBLIC_CONTACT_*`** — email, GitHub, and LinkedIn strings merged into `resume` at build time (not stored in `resume.json`).
- **`PUBLIC_SENSITIVE_QUERY_KEY`** / **`PUBLIC_SENSITIVE_QUERY_VALUE`** — URL query used by the client-side reveal gate (also baked into the built HTML/JS).

Anything prefixed with `PUBLIC_` is embedded in the production bundle; env files keep values out of **git**, not out of the deployed static files.

## Commands

| Command        | Action                              |
| -------------- | ----------------------------------- |
| `npm install`  | Install dependencies                |
| `npm run dev`  | Start dev server at `localhost:4321` |
| `npm run build`| Typecheck + production build to `dist/` |
| `npm run preview` | Serve the production build locally |

If `astro` fails writing telemetry config in restricted environments, run with `ASTRO_TELEMETRY_DISABLED=1` (already typical in CI).

## Project structure

- `src/data/resume.json` — **Single source of truth** for basics, experience, projects, skills, education, certifications and languages.
- `src/data/resume.ts` — Typed export (`resume`) imported by pages.
- `src/types/resume.ts` — TypeScript interfaces for the JSON shape.
- `src/layouts/BaseLayout.astro` — Shell: SEO head, theme script, header, footer, main landmark.
- `src/components/` — Reusable UI (navigation, cards, contact block, SEO).
- `src/pages/` — File-based routes (`/`, `/resume`, `/projects`).
- `public/` — Static assets (favicon, `cv_joaopaulo_en.pdf`, `robots.txt`).

## Editing content

1. Update `src/data/resume.json` for experience, projects, skills, etc.
2. Set contact URLs and the reveal gate in `.env` (see **Environment**).
3. Rebuild or refresh dev server; pages are generated from that data.
3. Optional: add `image` to `SEO` on a page later for Open Graph (set `site` in `astro.config.mjs` to your real domain).

## Theming

Dark mode uses Tailwind’s `class` strategy. A small inline script sets the initial theme from `localStorage` or `prefers-color-scheme`; the header button toggles and persists the choice.

## Deployment

Build output is plain static HTML in `dist/`. Deploy to any static host (Cloudflare Pages, Netlify, GitHub Pages, etc.). Set `site` in `astro.config.mjs` to your canonical URL for correct absolute links in metadata.

## Optional next steps

- Add `@astrojs/sitemap` if you want an auto-generated sitemap (not included to keep dependencies minimal).
- Add `@astrojs/mdx` if you want long-form writing alongside JSON-driven pages.
