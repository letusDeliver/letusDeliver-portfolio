# letusdeliver

**Think. Build. Deliver.**

Company website for letusdeliver — a founder-led software engineering studio. Built with Angular 22 (standalone, zoneless, SSR + prerendering) and Tailwind CSS v4.

## Stack

- **Angular 22** — standalone components, zoneless change detection, Signals for reactive state, typed Reactive Forms, `@if`/`@for` control flow.
- **Angular SSR + prerendering** — every route is prerendered to static HTML at build time (see `src/app/app.routes.server.ts`) for fast first paint and crawlable content; the Express server in `src/server.ts` serves it.
- **Tailwind CSS v4** — CSS-first config; design tokens live in `src/styles/tokens.css` (`@theme`), typography in `src/styles/typography.css`, motion primitives in `src/styles/animations.css`.
- **Vitest** — unit/component tests (`ng test`).
- **Playwright** — e2e tests (`npm run e2e`).
- **ESLint** (`angular-eslint`) — `npm run lint`.

No NgRx, no CMS, no micro-frontends — the site doesn't need them. Content is typed local data (`src/app/core/data/*.ts`), not a database.

## Getting started

```bash
npm install
npm start          # dev server at http://localhost:4200
```

```bash
# Docker
docker build -t letusdeliver .
docker run --rm -p 4000:4000 letusdeliver
# or with Docker Compose
docker compose up --build
```

```bash
npm run build      # production build + SSR + prerendering -> dist/letusdeliver
npm test           # unit tests (Vitest)
npm run lint        # ESLint
npm run e2e         # Playwright e2e (auto-starts a dev server)
```

## Project structure

```
src/app/
  core/           # config, typed content models, local data, SEO service + structured-data builders, services (contact, analytics)
  layout/         # header, footer
  shared/ui/      # Button, Tag, SectionHeading — the only presentational primitives the site needed
  shared/directives/  # scroll-reveal directive (prefers-reduced-motion aware)
  features/       # one folder per route: home, work, services, about, insights, start-project, legal, not-found
```

Routes are lazy-loaded per feature (`*.routes.ts`). Dynamic routes (`/work/:slug`, `/about/:slug`, `/insights/:slug`) are prerendered for every known slug via `getPrerenderParams` in `app.routes.server.ts`.

## Content & data integrity

All founder, project and technology facts in `src/app/core/data/` are sourced directly from the founders' resumes (Kunal, Mrityunjay) and the approved company positioning copy. Every project carries an explicit `ownershipType`:

- `letusdeliver` — actual company client work (none yet — the company is new)
- `personal` — self-directed engineering projects
- `professional-experience` — prior employer/client work, shown as evidence of capability and **never** presented as a letusdeliver engagement

Insights articles are placeholders (`placeholder: true`) until real content is written — the UI labels them "Coming soon" rather than presenting them as published posts.

## Environment configuration

Public, non-secret configuration lives in `src/environments/environment.ts` (dev) and `environment.production.ts` (prod, wired via `angular.json` → `fileReplacements`):

| Key | Purpose |
| --- | --- |
| `publicSiteUrl` | Canonical URL / OG URL base |
| `apiBaseUrl` | Base URL for a future backend API |
| `contactEndpoint` | Start a Project form submission endpoint |
| `analyticsId` | Optional analytics vendor ID (unset by default — no vendor is wired up) |
| `useMockContactApi` | While `true`, the contact form resolves via an in-memory mock (see below) instead of calling `contactEndpoint` |

No secrets are ever committed here — this file ships to the browser.

Social links (`src/app/core/config/site.config.ts`) are all `null` placeholders until real profile URLs exist; the footer only renders a link for platforms that are configured.

## Contact form / backend

There is no contact backend in this repository yet. `src/app/core/services/contact.service.ts` documents the intended API contract (request shape, expected pipeline: validation → sanitization → rate limiting → spam protection → notification → optional persistence) for whoever builds it. Until then, `useMockContactApi: true` makes the Start a Project form usable end-to-end locally via a clearly-labeled, delayed mock response — it is never presented as a real production submission.

## CI

`.github/workflows/ci.yml` runs on every push/PR: install → lint → unit tests → build → Playwright e2e. Add a deploy job once a hosting target (Vercel/Netlify/your own infra) is chosen — the SSR build in `dist/letusdeliver/server` runs anywhere Node.js does, and the prerendered routes in `dist/letusdeliver/browser` can also be served as static files.

## Known placeholders

- Social media URLs (footer) — set real URLs in `site.config.ts` once profiles exist.
- Insights articles — currently 3 "coming soon" placeholders.
- Privacy/Terms copy — concise placeholder text pending formal legal review.
- Contact backend — see above.
