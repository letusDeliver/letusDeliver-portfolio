# letusdeliver — Project Memory / Progress Log

**Read this file first if you're picking this project back up in a new session.** It exists so a fresh session (with no prior context) can understand what exists, why decisions were made, what's still missing, and where to pick up — without re-deriving anything from scratch.

Last updated: 2026-09-13

---

## 1. What this is

A production-quality Angular company website for **letusdeliver**, a founder-led software engineering studio founded by two engineers, **Kunal** and **Mrityunjay**. Domain: `letusdeliver.com`. Tagline: "Think. Build. Deliver."

The full original build brief (~40 sections covering positioning, design system, architecture, every page's content, accessibility, SEO, testing, CI, and a strict content-integrity policy) was given as one long spec at the start of this project. That spec is not stored anywhere else — this file is the durable record of what was actually built from it and how it maps to the code.

**Project root:** `D:\Start-up\letusdeliver` (the repo). The parent `D:\Start-up` is just a container directory.

## 2. Source-of-truth resumes (content integrity)

All founder facts, skills, employers, dates, projects, and certifications came from two resumes read in full before writing any content:

- `C:\Users\singh\Downloads\Resume.pdf` — Kunal's resume (Senior Software Engineer, Angular/TypeScript, 4.5+ years — note the PDF header says "5 years" but the body text says "4.5+ years"; **4.5+ years is what was used**, matching the docx version and the company's own stated combined-experience figure).
- `C:\Users\singh\Downloads\Mrityunjay_Kumar_Resume_1.pdf` — Mrityunjay's resume (Senior Python Backend Engineer, 4+ years).
- `C:\Users\singh\Downloads\Kunal_updated_Resume.docx` — an earlier/duplicate version of Kunal's resume, cross-checked, consistent.

**If resume content ever needs re-verification or founder data needs updating, re-read those files — don't trust paraphrases from memory.**

Content-integrity rule baked into the data model (`src/app/core/models/project.model.ts`): every `Project` has an `ownershipType` of `'letusdeliver' | 'personal' | 'professional-experience'`. Prior employer/client work (Nightwatch Platform at The Home Depot via Insight Global, the Toxsl/AdGlobal360 projects) is labeled `professional-experience` and the UI explicitly states it is *not* a letusdeliver client engagement — never blur this line if adding more content.

There is currently **zero real `letusdeliver`-owned client work** — the company is new. Do not invent any until the user supplies real project details.

## 3. Tech stack & key architectural decisions

- **Angular 22**, standalone components, **zoneless** change detection (`provideZonelessChangeDetection()` in `app.config.ts` — there is no zone.js dependency in `package.json`, this is intentional, not an oversight).
- **SSR + full prerendering** via `@angular/ssr`. `src/app/app.routes.server.ts` prerenders every route, including parameterized ones (`work/:slug`, `about/:slug`, `insights/:slug`) via `getPrerenderParams` reading the local data files.
- **Tailwind CSS v4** (CSS-first `@theme` config, no `tailwind.config.js`). Design tokens: `src/styles/tokens.css`. Typography: `src/styles/typography.css`. Motion: `src/styles/animations.css` (respects `prefers-reduced-motion`).
- **Signals** for component state; **typed Reactive Forms** for the Start a Project form.
- **No NgRx, no CMS, no micro-frontends, no database.** Content is typed local data under `src/app/core/data/*.ts`. This was a deliberate constraint from the brief — don't add these without being asked.
- **Vitest** for unit tests (`npm test`), **Playwright** for e2e (`npm run e2e`) — Playwright was added during this build; it wasn't in the original scaffold.
- Package manager: npm. Node 22+ assumed (CI uses Node 22).

## 4. What's built — pages & routes

All routes are lazy-loaded (`*.routes.ts` per feature) and prerendered.

| Route | Component | Notes |
|---|---|---|
| `/` | `features/home/home.ts` | Composes 11 section components under `features/home/sections/*` (hero, credibility, services-overview, featured-work, philosophy, why-us, process, founders-preview, technology, insights-preview, final-cta) |
| `/work` | `features/work/work-list` | Category filter (All/Product/Full Stack/Architecture/Cloud/AI), ownership badges |
| `/work/:slug` | `features/work/work-detail` | Full case-study layout; sections render conditionally based on what data exists |
| `/services` | `features/services/services.ts` | 6 service sections with anchor IDs (`#product-engineering` etc.) for deep-linking from the homepage |
| `/about` | `features/about/about.ts` | Story, philosophy, founder cards, combined capabilities, CTA |
| `/about/kunal`, `/about/mrityunjay` | `features/about/founder/founder.ts` | Full founder profile (experience, projects, certifications, tech stack) |
| `/insights` | `features/insights/insights-list` | 3 "Coming soon" placeholder articles |
| `/insights/:slug` | `features/insights/insight-detail` | |
| `/start-a-project` | `features/start-project/start-project.ts` | Typed reactive form, mock submission (see §6) |
| `/privacy`, `/terms` | `features/legal/*` | Concise placeholder legal copy, explicitly marked as pending real legal review |
| `**` (404) | `features/not-found/not-found.ts` | |

Shared UI (`src/app/shared/ui/`): `Button`, `Tag`, `SectionHeading` — these are the *only* presentational primitives that earned their own component; everything else is Tailwind utility classes directly in templates (deliberate — avoid over-abstracting).

Layout: `src/app/layout/header` (scroll-aware, accessible mobile menu with Escape-to-close), `src/app/layout/footer` (social links render as inactive text until configured, per content-integrity rules).

Core services (`src/app/core/`):
- `seo/seo.service.ts` + `seo/structured-data.ts` — per-route `<title>`/meta/canonical/OG tags + JSON-LD (Organization, WebSite, Person, Service, Article).
- `services/contact.service.ts` — documents the intended backend API contract in comments; currently mock-only (see §6).
- `services/analytics.service.ts` — vendor-agnostic `window.dataLayer` push, no-ops until `environment.analyticsId` is set.
- `config/site.config.ts` — social links (all `null` placeholders), founder slugs.
- `data/*.ts` — `PROJECTS`, `FOUNDERS`, `SERVICES`, `ARTICLES` typed content arrays. **This is where you edit content**, not in templates.

## 5. Bugs found and fixed during this build (read before assuming something is broken again)

These were real, reproduced-and-verified bugs, not stylistic choices — if something looks similar in future work, this is why:

1. **Zoneless setup**: original scaffold had no CD provider configured correctly; `provideZoneChangeDetection` (zone-based) was tried first and broke prerendering with `NG0908: Angular requires Zone.js`. Fixed by using `provideZonelessChangeDetection()`. There is no zone.js in `package.json` — that's correct, not missing.
2. **`routerLink` name collision**: `Button`'s custom `@Input` was originally named `routerLink`. Since parent templates also import Angular's `RouterLink` directive, Angular matched *both* onto the same host element, breaking rendering. Renamed the input to `link` (see `shared/ui/button/button.ts`). **Never name a custom component input the same as a built-in directive selector.**
3. **`<ng-content>` inside `@if`/`@else` branches**: Angular only projects default content into the *last* `<ng-content>` in the compiled template, not whichever conditional branch is actually active. This made every button's text disappear. Fixed with a single `<ng-template #content>` wrapping the one real `<ng-content>`, referenced via `*ngTemplateOutlet` in each branch (see `button.html`). **If you ever add a new polymorphic-host component with multiple possible tags, use this pattern, not repeated `<ng-content>`.**
4. **SEO metadata not updating on dynamic routes**: `input()`-bound route params (via `withComponentInputBinding()`) aren't populated yet when a component's constructor runs. Reading them in the constructor silently used stale/empty values, so `/work/:slug`, `/about/:slug`, `/insights/:slug` never got their real `<title>`/meta tags. Fixed by moving that logic into `effect()` in `work-detail.ts`, `founder.ts`, `insight-detail.ts`. Verified by grepping prerendered HTML output for correct `<title>` per route.
5. **Pre-hydration native form submit**: clicking the Start a Project submit button before Angular hydrates triggered a native GET request (full page reload, empty query string) instead of the Angular-handled submit. Hardened with a static `onsubmit="return false"` attribute alongside `(ngSubmit)`.
6. **Contrast failures**, measured (not guessed) via manual luminance/contrast-ratio calculation:
   - White text on the brand accent (`#8B5CF6`) button background: 4.23:1 resting, 2.72:1 on hover — both under WCAG AA's 4.5:1. Fixed by switching primary-button text to a dark token (`text-background`) instead of white — now ~4.7:1 / ~7.3:1.
   - `--color-muted-text` (`#71717A` from the original brand spec) measured 4.09:1 on background / 3.90:1 on surface — under AA. Lightened to `#8C8C94` (~5.9:1 / ~5.7:1). This is a deliberate, documented deviation from the literal spec hex value, justified by the spec's own mandatory WCAG AA requirement.
7. **`security.allowedHosts: []`** in `angular.json` (Angular CLI's default scaffold value) rejects *every* request to the standalone SSR server (`dist/letusdeliver/server/server.mjs`) — this would have silently 400'd the site in production. Fixed: set to `["letusdeliver.com", "www.letusdeliver.com"]` for production, `["localhost"]` for the development build configuration. **If you ever test the built SSR server locally and get a mysterious 400 "Header host ... is not allowed", this is the setting to check.**

## 6. Contact form / backend status

No backend exists in this repo. `src/app/core/services/contact.service.ts` has the full intended API contract documented in a comment (request shape, expected server pipeline: validation → sanitization → rate limiting → spam protection → notification → optional persistence).

Current behavior: `environment.useMockContactApi` (in `src/environments/environment.ts` and `environment.production.ts`) is `true`, so submissions resolve via an in-memory mock after a simulated delay, clearly logged to console as `[contact] Using mock contact API — no backend is configured yet.` This is intentional so the form is demoable end-to-end, but it is **not a real production submission** — flip `useMockContactApi` to `false` once a real `contactEndpoint` backend exists.

## 7. Testing status (all currently passing)

- **Unit tests** (Vitest, `npm test`): 10 tests across `app.spec.ts`, `header.spec.ts`, `work-list.spec.ts`, `start-project.spec.ts`, `contact.service.spec.ts`.
- **E2E tests** (Playwright, `npm run e2e`): 13 tests in `e2e/` — `homepage.spec.ts`, `work.spec.ts`, `start-project.spec.ts`, `mobile-navigation.spec.ts`. Config: `playwright.config.ts` (auto-starts `ng serve` on port 4200 if not already running).
- **Lint** (`npm run lint`): clean.
- **Production build** (`npm run build`): clean, 20 static routes prerendered, ~93 kB initial transfer (well under budget).
- Visual QA was done manually via Playwright screenshots at desktop (1440px) and mobile (390px) widths for every page, plus a manual reduced-motion emulation check.

Run all four before considering any future change "done": `npm run lint && npm test -- --watch=false && npm run build && npm run e2e -- --project=chromium`.

## 8. CI

`.github/workflows/ci.yml` — install → lint → unit tests → build → Playwright e2e, on push/PR to `main`. **No deploy job yet** — no hosting target has been chosen.

## 9. What's missing / explicit placeholders

- **Social media URLs** — all `null` in `src/app/core/config/site.config.ts`. Footer shows platform names as inactive text until real URLs are supplied. Do not invent URLs.
- **Insights articles** — 3 "Coming soon" placeholders in `src/app/core/data/articles.data.ts`, `placeholder: true`. No real articles written yet.
- **Privacy/Terms pages** — concise placeholder legal copy with an explicit on-page disclaimer ("pending formal legal review"). Not real legal text.
- **Contact backend** — see §6.
- **Deployment** — no hosting target chosen, no deploy step in CI, no real production domain live yet (production env config assumes `https://letusdeliver.com` / `https://api.letusdeliver.com`).
- **`public/images/` and `public/icons/`** — empty directories, reserved for future real assets. There are currently **zero raster images anywhere in the site** (no `<img>` tags at all) — all visuals are SVG/CSS by design, since no real screenshots/photos/logos were supplied. Don't add stock photography or fabricated screenshots.
- **LetUsDeliver-branded client work** — none exists yet; `/work` only shows personal projects and labeled prior-employment work.

## 10. How to resume work

```bash
cd D:\Start-up\letusdeliver
npm install                # if node_modules isn't present
npm start                  # dev server → http://localhost:4200
```

Key places to make common changes:
- **Add/edit a project, service, founder, or article**: `src/app/core/data/*.ts` — typed data only, don't hardcode content into templates.
- **Change design tokens (colors/fonts)**: `src/styles/tokens.css` (`@theme` block) — re-check contrast ratios if you change any color (see §5.6 for the method: compute relative luminance per WCAG formula, ratio = (L1+0.05)/(L2+0.05), need ≥4.5 for normal text, ≥3 for large/UI).
- **Add a new route**: create a `features/<name>/` folder with its own `*.routes.ts`, wire it into `src/app/app.routes.ts`, and if it has dynamic params, add prerender param generation in `src/app/app.routes.server.ts`.
- **Real contact backend**: implement per the contract in `contact.service.ts`, then set `useMockContactApi: false` in both environment files and configure `contactEndpoint`.

Before declaring any future session's work "done," re-run the four checks in §7.
