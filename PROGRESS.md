# letusdeliver — Project Memory / Progress Log

**This is the detailed history/rationale file.** For a 30-second "where are we right now" summary, read `MEMORY.md` first — it points back into the relevant section here for anything that needs more depth. For repo conventions and hard rules (content integrity, git workflow, known linter false-positives, the WCAG contrast method), read `CLAUDE.md`. This file exists so a fresh session (with no prior context) can understand what exists, why decisions were made, what's still missing, and where to pick up — without re-deriving anything from scratch.

Last updated: 2026-09-13 (branding assets — see §13; founder profile photos — see §14; dark/light theme switcher — see §15; CLAUDE.md/MEMORY.md — see §16)

---

## 1. What this is

A production-quality Angular company website for **letusdeliver**, a founder-led software engineering studio founded by two engineers, **Kunal** and **Mrityunjay**. Domain: `letusdeliver.com`. Tagline: "Think. Build. Deliver."

The full original build brief (~40 sections covering positioning, design system, architecture, every page's content, accessibility, SEO, testing, CI, and a strict content-integrity policy) was given as one long spec at the start of this project. That spec is not stored anywhere else — this file is the durable record of what was actually built from it and how it maps to the code.

**Project root:** `D:\Start-up\letusdeliver` (the repo, pushed to `https://github.com/letusDeliver/letusDeliver-portfolio.git` on `main`). The parent `D:\Start-up` is just a container directory that also holds `Github-Analysis/` (see §3).

## 2. Source-of-truth resumes (content integrity)

All founder facts, skills, employers, dates, projects, and certifications originally came from two resumes read in full before writing any content:

- `C:\Users\singh\Downloads\Resume.pdf` — Kunal's resume (Senior Software Engineer, Angular/TypeScript, 4.5+ years — note the PDF header says "5 years" but the body text says "4.5+ years"; **4.5+ years is what was used**, matching the docx version and the company's own stated combined-experience figure).
- `C:\Users\singh\Downloads\Mrityunjay_Kumar_Resume_1.pdf` — Mrityunjay's resume (Senior Python Backend Engineer, 4+ years).
- `C:\Users\singh\Downloads\Kunal_updated_Resume.docx` — an earlier/duplicate version of Kunal's resume, cross-checked, consistent.

**If resume content ever needs re-verification or founder data needs updating, re-read those files — don't trust paraphrases from memory.**

Content-integrity rule baked into the data model (`src/app/core/models/project.model.ts`): every `Project` has an `ownershipType` of `'letusdeliver' | 'personal' | 'professional-experience'`. Prior employer/client work (Nightwatch Platform at The Home Depot via Insight Global, the Toxsl/AdGlobal360 projects) is labeled `professional-experience` and the UI explicitly states it is *not* a letusdeliver client engagement — never blur this line if adding more content.

There is currently **zero real `letusdeliver`-owned client work** — the company is new. Do not invent any until the user supplies real project details.

## 3. Second content source: independent GitHub repository analysis

At `D:\Start-up\Github-Analysis\` there are deep, independently-verified analyses of six of the founders' real GitHub repositories — each repo was cloned into `Github-Analysis\_clones\`, then actually installed, built, linted and tested (not assessed from README claims alone):

- `portfolio-overall-analysis.md` — recommended portfolio order/strategy across all six repos
- `portfolio-project-comparison.md` — cross-project comparison table
- `employee-management-backend-portfolio-analysis.md` → repo `letusDeliver/employee-management-backend` (Kunal's "Employee Management System")
- `multi-app-architecture-system-portfolio-analysis.md` → repo `letusDeliver/multi-app-architecture-system` (Kunal's "Enterprise Micro-Frontend Shell")
- `ibkr-webapp-portfolio-analysis.md` → repo `Mrityunjay1997/ibkr-webapp-main` (new — see §4)
- `flowmedic-portfolio-analysis.md` → repo `Mrityunjay1997/flowmedic` (new — see §4)
- `donezo-portfolio-analysis.md` → repo `letusDeliver/Donezo` (new — see §4)
- `angular-crashcourse-tracker-app-portfolio-analysis.md` → repo `letusDeliver/angular-crashCourse-tracker-app` — **deliberately excluded from the site** (see §4)

This directory is **not part of the Angular repo** — it lives alongside it at `D:\Start-up\Github-Analysis\`, outside `letusdeliver/`. If asked to update project content again, re-read the relevant `*-portfolio-analysis.md` file rather than relying on this summary.

## 4. What changed in the portfolio-analysis update (2026-09-13)

Using the analysis in §3, `src/app/core/data/projects.data.ts` and `founders.data.ts` were updated:

- **`employee-management-system`** (Kunal) — enriched with verified detail (permission-scoped `resource:action:scope` RBAC, timing-safe login, `tokensValidAfter` retroactive logout invalidation, Zod-schema-generated OpenAPI docs, a hand-written partial unique index working around a Prisma DSL limit) and given its real `githubUrl`: `https://github.com/letusDeliver/employee-management-backend`.
- **`enterprise-micro-frontend-shell`** (Kunal) — enriched with verified detail (58/58 passing tests, GitHub Actions CI with a permanent "empty-shell" gate, the four named Shell Public API communication patterns, shell-attributed/unforgeable ownership scoping) and given its real `githubUrl`: `https://github.com/letusDeliver/multi-app-architecture-system`.
- **`donezo`** (new, Kunal, `ownershipType: 'personal'`) — an in-progress Angular 20 Kanban tracker. Explicitly labeled `statusLabel: 'Work in progress'` — the analysis found most screens are empty stubs and the production build fails out of the box; only the Kanban board (RxJS debounce/pagination) is genuinely built. `githubUrl`: `https://github.com/letusDeliver/Donezo`.
- **`ibkr-signal-scanner`** (new, Mrityunjay, `ownershipType: 'personal'`) — a real, actively-used Flask trading tool integrating directly with Interactive Brokers' native socket API, verified by a passing 66-test suite. Labeled `statusLabel: 'Actively used'`. **`githubUrl` deliberately omitted — see §4a, this needs your decision, not a default.**
- **`flowmedic`** (new, Mrityunjay, `ownershipType: 'personal'`) — an Apache Airflow 3.x hackathon incident-response DAG with real HITL (`ApprovalOperator`) usage. Labeled `statusLabel: 'Hackathon MVP'`. `githubUrl`: `https://github.com/Mrityunjay1997/flowmedic`. **Framing note:** the analysis found the "AI diagnosis" step is a hardcoded deterministic function, not a real LLM call, despite the repo's own README implying otherwise — the site copy was written to describe this honestly (a "deterministic placeholder ahead of a planned LLM integration"), not as an "AI-powered" feature. Keep it that way if this project is ever touched again; do not upgrade the language to "AI-powered" unless the repo actually adds a real model call.
- **`angular-crashCourse-tracker-app`** — **excluded from the site entirely**, per the explicit recommendation in `portfolio-overall-analysis.md`: it doesn't build, has no tests, and its advertised features (add/delete/reminder-toggle) are `console.log` stubs. Not referenced anywhere in `projects.data.ts`.
- **Founders' `projectSlugs`** updated: Kunal now includes `donezo`; Mrityunjay now includes `ibkr-signal-scanner` and `flowmedic` (his resume had no personal-projects section, but these are real, verified personal repos — legitimate to add).
- **Homepage featured work** (`featured: true`, max 3, shown on `/`) reordered/reassigned to match the analysis's own recommended strongest-projects order: `enterprise-micro-frontend-shell`, `employee-management-system`, `ibkr-signal-scanner`. `multi-tenant-hospital-management-system` was un-featured (still listed on `/work`, just not homepage-highlighted).
- **`Project` model gained a new optional field**: `statusLabel?: string` (`src/app/core/models/project.model.ts`) — a short, honest badge like "Work in progress" / "Hackathon MVP" / "Actively used", rendered next to the ownership badge in `work-list.html`, `work-detail.html`, `founder.html`, and `featured-work.html`. Use this pattern for any future project that isn't a plain finished/shipped thing.
- **`Button` component gained a new `external` input** (`shared/ui/button/button.ts`/`.html`) — when true on an `href`-based button, sets `target="_blank" rel="noopener noreferrer"`. Wired up on the Demo/GitHub buttons in `work-detail.html` so external links open in a new tab instead of navigating away from the site.
- `public/sitemap.xml` updated with the three new project routes.

### 4a. ⚠️ Needs your decision: `ibkr-webapp-main` has a committed secret

The GitHub analysis (`ibkr-webapp-portfolio-analysis.md`) found a hardcoded `flask_secret_key` value committed in `config.ini` in `https://github.com/Mrityunjay1997/ibkr-webapp-main`, and explicitly recommends: *"Rotate the secret committed in `ibkr-webapp-main/config.ini` and move it to an environment variable before sharing that repository's link publicly."*

Because of this, **the `ibkr-signal-scanner` project on the site intentionally has no `githubUrl` set** — the project's technical content is on the site, but it doesn't link out to the repo yet. Once the secret has been rotated (and ideally purged from git history, not just the latest commit), add `githubUrl: 'https://github.com/Mrityunjay1997/ibkr-webapp-main'` to that project in `projects.data.ts`. Don't add the link before that's done — don't assume it's been handled unless told so explicitly.

## 5. Tech stack & key architectural decisions

- **Angular 22**, standalone components, **zoneless** change detection (`provideZonelessChangeDetection()` in `app.config.ts` — there is no zone.js dependency in `package.json`, this is intentional, not an oversight).
- **SSR + full prerendering** via `@angular/ssr`. `src/app/app.routes.server.ts` prerenders every route, including parameterized ones (`work/:slug`, `about/:slug`, `insights/:slug`) via `getPrerenderParams` reading the local data files. Currently prerenders 23 static routes.
- **Tailwind CSS v4** (CSS-first `@theme` config, no `tailwind.config.js`). Design tokens: `src/styles/tokens.css`. Typography: `src/styles/typography.css`. Motion: `src/styles/animations.css` (respects `prefers-reduced-motion`).
- **Signals** for component state; **typed Reactive Forms** for the Start a Project form.
- **No NgRx, no CMS, no micro-frontends, no database.** Content is typed local data under `src/app/core/data/*.ts`. This was a deliberate constraint from the brief — don't add these without being asked.
- **Vitest** for unit tests (`npm test`), **Playwright** for e2e (`npm run e2e`) — Playwright was added during this build; it wasn't in the original scaffold.
- Package manager: npm. Node 22+ assumed (CI uses Node 22).

## 6. What's built — pages & routes

All routes are lazy-loaded (`*.routes.ts` per feature) and prerendered.

| Route | Component | Notes |
|---|---|---|
| `/` | `features/home/home.ts` | Composes 11 section components under `features/home/sections/*` (hero, credibility, services-overview, featured-work, philosophy, why-us, process, founders-preview, technology, insights-preview, final-cta) |
| `/work` | `features/work/work-list` | Category filter (All/Product/Full Stack/Architecture/Cloud/AI), ownership badges, status badges |
| `/work/:slug` | `features/work/work-detail` | Full case-study layout; sections render conditionally based on what data exists |
| `/services` | `features/services/services.ts` | 6 service sections with anchor IDs (`#product-engineering` etc.) for deep-linking from the homepage |
| `/about` | `features/about/about.ts` | Story, philosophy, founder cards, combined capabilities, CTA |
| `/about/kunal`, `/about/mrityunjay` | `features/about/founder/founder.ts` | Full founder profile (experience, projects, certifications, tech stack) |
| `/insights` | `features/insights/insights-list` | 3 "Coming soon" placeholder articles |
| `/insights/:slug` | `features/insights/insight-detail` | |
| `/start-a-project` | `features/start-project/start-project.ts` | Typed reactive form, mock submission (see §8) |
| `/privacy`, `/terms` | `features/legal/*` | Concise placeholder legal copy, explicitly marked as pending real legal review |
| `**` (404) | `features/not-found/not-found.ts` | |

Shared UI (`src/app/shared/ui/`): `Button`, `Tag`, `SectionHeading` — these are the *only* presentational primitives that earned their own component; everything else is Tailwind utility classes directly in templates (deliberate — avoid over-abstracting).

Layout: `src/app/layout/header` (scroll-aware, accessible mobile menu with Escape-to-close), `src/app/layout/footer` (social links render as inactive text until configured, per content-integrity rules).

Core services (`src/app/core/`):
- `seo/seo.service.ts` + `seo/structured-data.ts` — per-route `<title>`/meta/canonical/OG tags + JSON-LD (Organization, WebSite, Person, Service, Article).
- `services/contact.service.ts` — documents the intended backend API contract in comments; currently mock-only (see §8).
- `services/analytics.service.ts` — vendor-agnostic `window.dataLayer` push, no-ops until `environment.analyticsId` is set.
- `config/site.config.ts` — social links (all `null` placeholders), founder slugs.
- `data/*.ts` — `PROJECTS`, `FOUNDERS`, `SERVICES`, `ARTICLES` typed content arrays. **This is where you edit content**, not in templates.

## 7. Bugs found and fixed during the initial build (read before assuming something is broken again)

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

**Recurring gotcha across both sessions:** a `fullPage` Playwright screenshot taken without first scrolling through the page will show most below-the-fold content as blank/missing. This is *not* a bug — it's the `appReveal` scroll-triggered animation directive (`shared/directives/reveal.ts`) never getting scrolled into view, so `IntersectionObserver` never fires and content stays at `opacity: 0`. Always scroll (or use `prefers-reduced-motion` emulation) before screenshotting for QA, or you'll chase a phantom bug.

## 8. Contact form / backend status

No backend exists in this repo. `src/app/core/services/contact.service.ts` has the full intended API contract documented in a comment (request shape, expected server pipeline: validation → sanitization → rate limiting → spam protection → notification → optional persistence).

Current behavior: `environment.useMockContactApi` (in `src/environments/environment.ts` and `environment.production.ts`) is `true`, so submissions resolve via an in-memory mock after a simulated delay, clearly logged to console as `[contact] Using mock contact API — no backend is configured yet.` This is intentional so the form is demoable end-to-end, but it is **not a real production submission** — flip `useMockContactApi` to `false` once a real `contactEndpoint` backend exists.

## 9. Testing status (all currently passing)

- **Unit tests** (Vitest, `npm test`): 10 tests across `app.spec.ts`, `header.spec.ts`, `work-list.spec.ts`, `start-project.spec.ts`, `contact.service.spec.ts`.
- **E2E tests** (Playwright, `npm run e2e`): 13 tests in `e2e/` — `homepage.spec.ts`, `work.spec.ts`, `start-project.spec.ts`, `mobile-navigation.spec.ts`. Config: `playwright.config.ts` (auto-starts `ng serve` on port 4200 if not already running).
- **Lint** (`npm run lint`): clean.
- **Production build** (`npm run build`): clean, 23 static routes prerendered, initial transfer well under budget.
- Visual QA was done manually via Playwright screenshots at desktop (1440px) and mobile (390px) widths for every page (see the scroll-before-screenshot gotcha in §7), plus a manual reduced-motion emulation check.

Run all four before considering any future change "done": `npm run lint && npm test -- --watch=false && npm run build && npm run e2e -- --project=chromium`.

## 10. CI

`.github/workflows/ci.yml` — install → lint → unit tests → build → Playwright e2e, on push/PR to `main`. **No deploy job yet** — no hosting target has been chosen.

## 11. What's missing / explicit placeholders

- **Social media URLs** — all `null` in `src/app/core/config/site.config.ts`. Footer shows platform names as inactive text until real URLs are supplied. Do not invent URLs.
- **Insights articles** — 3 "Coming soon" placeholders in `src/app/core/data/articles.data.ts`, `placeholder: true`. No real articles written yet.
- **Privacy/Terms pages** — concise placeholder legal copy with an explicit on-page disclaimer ("pending formal legal review"). Not real legal text.
- **Contact backend** — see §8.
- **Deployment** — no hosting target chosen, no deploy step in CI, no real production domain live yet (production env config assumes `https://letusdeliver.com` / `https://api.letusdeliver.com`).
- **Raster images** — real logo assets were added 2026-09-13 (see §13); everything else is still SVG/CSS by design, since no project screenshots/photos were supplied. Don't add stock photography or fabricated screenshots.
- **LetUsDeliver-branded client work** — none exists yet; `/work` only shows personal projects and labeled prior-employment work.
- **`ibkr-signal-scanner`'s GitHub link** — deliberately withheld pending secret rotation; see §4a.

## 12. How to resume work

```bash
cd D:\Start-up\letusdeliver
npm install                # if node_modules isn't present
npm start                  # dev server → http://localhost:4200
```

Key places to make common changes:
- **Add/edit a project, service, founder, or article**: `src/app/core/data/*.ts` — typed data only, don't hardcode content into templates. If adding a project sourced from a GitHub analysis, follow the `statusLabel` pattern in §4 and never call something "AI-powered" unless it genuinely calls a model.
- **Change design tokens (colors/fonts)**: `src/styles/tokens.css` (`@theme` block) — re-check contrast ratios if you change any color (see §7.6 for the method: compute relative luminance per WCAG formula, ratio = (L1+0.05)/(L2+0.05), need ≥4.5 for normal text, ≥3 for large/UI).
- **Add a new route**: create a `features/<name>/` folder with its own `*.routes.ts`, wire it into `src/app/app.routes.ts`, and if it has dynamic params, add prerender param generation in `src/app/app.routes.server.ts`.
- **Real contact backend**: implement per the contract in `contact.service.ts`, then set `useMockContactApi: false` in both environment files and configure `contactEndpoint`.
- **`ibkr-signal-scanner` GitHub link**: see §4a before adding it.

Before declaring any future session's work "done," re-run the four checks in §9. If you push again, remember `origin` is already configured — plain `git push` works.

## 13. Branding assets: logos & favicons (added 2026-09-13)

The user dropped real logo/favicon source files into `public/favicon_io/` (a favicon-generator export) plus two raw WhatsApp-shared JPEGs of the actual letusDeliver logo. These were processed and wired up:

- **Source images** (both had a flat white background, no transparency): one was the icon mark alone (the blue "b/D" play-button glyph), the other the full horizontal lockup (mark + "letusDeliver" wordmark + "Think. Build. Deliver." tagline, with dark-navy/gray text).
- **Processed with Pillow** (`pip install pillow` into the system Python at `C:\Users\singh\AppData\Local\Programs\Python\Python312\python`; not otherwise a project dependency) — chroma-keyed near-white pixels to transparent, cropped to content bounding box:
  - `public/images/logo-mark.png` — icon-only, transparent background. **This is the one actually used in the UI** (header + footer), since it reads cleanly on the site's dark background (`--color-background: #0a0a0b`).
  - `public/images/logo-lockup.png` — full wordmark, transparent background. **Not used anywhere yet** — its baked-in text is dark navy/gray, which has poor contrast against this site's dark theme. It's only usable on a light background (e.g. a future light-mode surface, printed collateral, or a social/OG image where a light card is composited). Don't drop it into the current dark header/footer/nav — it'll be close to illegible.
- **Favicons**: moved the generated set from `public/favicon_io/` up to `public/` root (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`, `site.webmanifest`), then deleted `public/favicon_io/` (source JPEGs + duplicate files) and the unused empty `public/icons/`. Fixed `site.webmanifest`'s `name`/`short_name` (were empty strings) to `"letusDeliver"` and its `theme_color`/`background_color` (were `#ffffff`) to match the real site background `#0a0a0b`. Wired the full favicon set into `src/index.html`'s `<head>` (previously only had the old plain `favicon.ico`).
- **Header** (`src/app/layout/header/header.html`) and **footer** (`src/app/layout/footer/footer.html`): both now render `<img src="/images/logo-mark.png">` (28×28) next to the existing "letusdeliver" text, instead of text-only.
- Note: `android-chrome-*.png` and `apple-touch-icon.png` in the generator's export are actually the *full lockup* squeezed into a square canvas (not a clean icon crop) — that's what the user's favicon generator produced from the source art. Left as-is since favicons don't need to be legible at 16–32px; revisit only if the user supplies a proper square icon-only export.
- Verified after: `ng lint` clean, `ng build` clean (23 prerendered routes, confirmed `logo-mark.png` and the new favicon links appear in the prerendered HTML `<head>` and header/footer markup), and a Playwright screenshot of the running dev server confirming the mark renders with real transparency (no white box) in both header and footer.

## 14. Founder profile photos (added 2026-09-13)

The user dropped real headshots into `public/images/`: `Kunal_profile_image.png` (1.7MB, 1086×1448) and `Mrityunjay_profile_image.jpeg` (125KB, 1145×1374).

- **Optimized for web** with Pillow (same Python install as §13): resized to 800px wide, re-encoded as JPEG quality 82 → `public/images/kunal-profile.jpg` (~86KB) and `public/images/mrityunjay-profile.jpg` (~78KB). The large raw originals were then deleted from `public/images/` — only the optimized versions are kept/served. If a higher-resolution source is ever needed again, it'll have to be re-supplied by the user (not recoverable from the repo).
- **Model**: added `photoUrl?: string` to `Founder` (`src/app/core/models/founder.model.ts`) — optional, falls back to the existing initials-circle avatar if unset.
- **Data**: `src/app/core/data/founders.data.ts` — `photoUrl: '/images/kunal-profile.jpg'` on Kunal, `/images/mrityunjay-profile.jpg` on Mrityunjay.
- **Wired into 3 templates**, each with an `@if (founder.photoUrl) { <img> } @else { <initials-div> }` fallback pattern: `src/app/features/about/founder/founder.html` (profile hero, 64×64), `src/app/features/home/sections/founders-preview/founders-preview.html` (56×56), `src/app/features/about/about.html` (56×56 — this list previously had no avatar at all, just name/role/summary; added one for consistency with the other two founder listings).
- **SEO**: `src/app/features/about/founder/founder.ts` now passes `image: siteConfig.siteUrl + founder.photoUrl` to `SeoService.update()`, so founder profile pages get a real `og:image`/`twitter:image` instead of none (previously omitted everywhere on principle — see the comment in `seo.service.ts` — because no real image asset existed; now one does, for these two routes only). `personSchema()` in `src/app/core/seo/structured-data.ts` also includes `image` when `photoUrl` is set.
- Verified: `ng lint` clean, `ng test` 10/10 pass, `ng build` clean (23 routes), confirmed via `grep` on prerendered HTML that all 3 templates render the correct `<img>` for each founder and that `og:image` appears on `/about/kunal` and `/about/mrityunjay`. Playwright screenshots of the running dev server confirm the photos render correctly as circular avatars in all 4 places (both detail pages, the `/about` grid, and the homepage founders-preview section).

Note: the photo/avatar sizes above were later enlarged and the founders-preview/about cards restructured to an image-left/description-right flex layout in a follow-up session (same day) — see git history/commit messages for the exact current sizes; this section is left as the original rationale, not a live spec of current pixel sizes.

## 15. Dark/light theme switcher (added 2026-09-13)

The site was built dark-only (see §7.6's WCAG contrast work, all measured against the dark palette). Added a genuine light theme plus a header toggle — not just an inverted palette, a separately-verified one.

- **Token architecture** (`src/styles/tokens.css`): the `@theme` block's values are the *default (dark)* theme, unchanged from before. A new `[data-theme='light']` block outside `@theme` overrides the same custom properties — Tailwind v4's generated utilities (`bg-background`, `text-primary-text`, etc.) read `var(--color-*)`, so they follow the cascade automatically; no template classes needed to change for this to work.
- **Light palette values were independently measured**, not inverted from dark — the same relative-luminance/contrast-ratio method as §7.6:
  - `background #ffffff`, `surface #f7f7f8`, `elevated #eeeef0`, `border #d4d4d8` (border/surface/elevated aren't text, chosen for a visible-but-soft card edge rather than a specific ratio).
  - `primary-text #0a0a0b` on background → 19.79:1. `secondary-text #52525b` → 7.73:1 (7.22:1 on surface). `muted-text #6b6b74` → 5.28:1 (4.93:1 on surface).
  - **Accent required genuinely different hex values per theme**, not just reuse: dark theme's `accent-bright` (`#a78bfa`) only measures 2.72:1 as text on white — a purple picked to read well on near-black does not automatically read well on white. Light theme uses `accent: #7c3aed` (5.70:1 as text) and `accent-bright: #6d28d9` (7.10:1 as text, used for hover states too).
  - `shadow-card`'s dark-theme value has a `rgba(255,255,255,0.03)` inset highlight (simulates light catching the top edge of a dark card) and a strong `rgba(0,0,0,0.6)` outer shadow (needs high alpha to show up against near-black) — both wrong for light backgrounds. Light theme uses a soft `rgba(10,10,11,0.04)`/`rgba(10,10,11,0.16)` pair instead.
- **New `--color-on-accent` token** — the text color used *on top of* accent-colored surfaces (buttons). This used to piggyback on `--color-background` (`Button`'s primary variant was literally `text-background`, see the §7.6 comment it replaced) purely because the dark theme's background happened to also be a good text color on the accent purple — a coincidence, not a real coupling. Once `--color-background` became theme-dependent, that coupling would have silently broken the button (white text on a purple button falls back to the *original* pre-§7.6 contrast bug). Fixed by giving it its own token, verified independently per theme: `#0a0a0b` (dark) / `#ffffff` (light) — light mode needed the *opposite* text color because the light-mode accent hex is deliberately darker (see above), and dark text no longer passes against it (only 3.47:1). `shared/ui/button/button.ts`'s primary variant now uses `text-on-accent`.
- **Hardcoded SVG colors fixed**: `src/app/features/home/sections/hero/hero.html`'s pipeline diagram was the *only* place in the app with literal hex colors instead of tokens (verified by grepping the whole `src/app` tree) — `stroke="#27272a"`, `fill="#111113"`, `fill="#a78bfa"`, `fill="#f5f5f5"`, and two `<stop stop-color="...">` gradient stops. Converted to `class="stroke-border"` / `class="fill-surface"` / `class="fill-accent-bright"` / `class="fill-primary-text"` (Tailwind v4 auto-generates `fill-*`/`stroke-*` utilities for every `--color-*` token), and the two gradient `<stop>` elements to `style="stop-color: var(--color-accent-bright)"` / `var(--color-accent)` since Tailwind has no `stop-color` utility. If a future decorative SVG needs a fixed color, follow this pattern — never a literal hex.
- **`ThemeService`** (`src/app/core/services/theme.service.ts`, `providedIn: 'root'`): a `signal<'dark' | 'light'>`, an `effect()` that sets `data-theme` on `<html>`, updates the `<meta name="theme-color">` tag to match (`#0a0a0b` / `#ffffff`) via Angular's `Meta` service, and persists the choice to `localStorage` (guarded with `isPlatformBrowser` + try/catch, so it no-ops harmlessly during SSR/prerendering and in private-browsing/storage-disabled contexts). `toggle()` flips the signal.
  - **Deliberately does NOT read `prefers-color-scheme`** on first visit. The brand is dark by default; a visitor's OS light-mode setting silently flipping the site's identity the first time they land was judged worse than asking them to opt in once via the header toggle. Default is always `'dark'` unless `localStorage` has an explicit `'light'` from a previous visit. If this behavior ever needs to change (e.g. genuinely wanting to respect system preference), it's a one-line change in `readInitialTheme()` — but do it deliberately, it was a conscious call, not an oversight.
- **FOUC prevention**: SSR always renders `data-theme="dark"` (there's no per-request theme signal on the server) — a returning light-theme visitor would otherwise see a flash of dark before Angular hydrates and `ThemeService`'s effect corrects it. Fixed with a small blocking inline `<script>` at the top of `src/index.html`'s `<head>`, before the stylesheets, that synchronously reads `localStorage` and sets `data-theme="light"` on `<html>` if needed — runs before first paint. **This script's logic must be kept in sync with `ThemeService.readInitialTheme()`** if that ever changes (same localStorage key `'theme'`, same fallback).
- **Toggle UI**: added to `src/app/layout/header/header.html` — a sun/moon icon button (inline SVG, no icon library), present in both the desktop nav bar (next to "Start a Project") and the mobile header bar (next to the hamburger button), each with an `aria-label` describing the action ("Switch to light theme" / "Switch to dark theme"). Not added to the footer or mobile nav panel — one control, reachable from every page via the sticky header, was judged sufficient; don't duplicate it elsewhere without a reason.
- **Not done / explicitly out of scope**: no "system" third option (dark/light only, per what was actually asked for); `public/site.webmanifest`'s `theme_color`/`background_color` stay fixed at the dark values (PWA manifest colors aren't easily made dynamic per-session and weren't part of this ask); footer/mobile-nav-panel don't get their own toggle (see above).
- Verified: `ng lint` clean, `ng test` 10/10 pass, `ng build` clean (23 routes; confirmed the prerendered HTML's `<html>` tag defaults to `data-theme="dark"`, i.e. SSR doesn't guess/leak a client's stored preference), `npm run e2e -- --project=chromium` 13/13 pass (header restructuring didn't break mobile nav). Playwright screenshots of the running dev server, toggled to light and **scrolled through fully before capture** (see the §7 scroll-before-screenshot gotcha — skipping this once during this session's own QA produced a misleading blank-gray-box screenshot that looked like a bug and wasn't one), confirm every page — home, work list, a work detail page, about, services, and the mobile header/menu — reads correctly in light mode. Also confirmed the choice survives a reload (`localStorage` persistence) and that SSR-rendered markup is theme-neutral-default (dark) as intended.

### 15a. Follow-up fix: hero gradient inline styles (same day)

The VS Code Problems panel (Microsoft Edge Tools / webhint extension, separate from `ng lint`) flagged the two `style="stop-color: var(...)"` attributes added to `hero.html`'s SVG gradient in §15 as `no-inline-styles`. Fixed by adding `.stop-color-accent` / `.stop-color-accent-bright` classes to `src/styles.css` and using `class="..."` on the `<stop>` elements instead — same rendered result (verified via screenshot), just not an inline `style=` attribute. Commit `d8dde8a`.

The same Problems-panel pass also surfaced several **false positives**, left unfixed — see `CLAUDE.md`'s "VS Code Problems panel is not the source of truth" section for the full list and why each one is not a real bug (bound `[alt]` bindings, `@for`/`@if` inside `<ul>`, `<ng-content>`-projected button text, and a stale cached diagnostic pointing at the already-deleted `public/favicon_io/site.webmanifest` from §13).

## 16. CLAUDE.md and MEMORY.md (added 2026-09-13)

Added two new root files, specifically so a brand-new session (no prior conversation context at all) can orient itself fast, in this order:

1. **`MEMORY.md`** — a short "current state at a glance": what's done, what's genuinely still open (vs. just "could be nice"), and the last few things changed. Meant to be read in 30 seconds.
2. **`CLAUDE.md`** — the operating guide: hard rules (content integrity, git workflow), the verification checklist, the note that `ng lint` (not the VS Code Problems panel) is this project's source of truth for lint correctness, the WCAG contrast method, the recurring scroll-before-screenshot gotcha, and the image-processing workflow (system Python + Pillow, no npm image deps).

Neither duplicates this file (`PROGRESS.md`) — they're both meant to be short and to point here for the "why," not restate it. **When you finish any future unit of work, update `MEMORY.md`'s "what's still open" / "last few things done" sections** (it's meant to stay current, unlike `PROGRESS.md` which is an append-only log) — and add a new numbered section here if the work has real rationale worth preserving.

## 17. Real contact-form backend integration (added 2026-09-14)

The user stood up a real Django REST Framework backend for the "Start a Project" form (locally at `http://127.0.0.1:8010`, per a Postman collection they provided: `POST /api/contact/submissions/`, admin at `/admin/`) and asked for the frontend to be wired to it. Previously `ContactService` only ever called `submitMock()` — `useMockContactApi` was `true` in both `environment.ts` and `environment.production.ts`, per §11.

- **Verified the real contract instead of trusting the Postman collection's example bodies** — its example payloads use `field: "value"` guesses (`project_type: "web_application"`) that happened to be right, but rather than hand-copy them, queried the running backend directly: `curl -X OPTIONS http://127.0.0.1:8010/api/contact/submissions/` returns DRF's metadata action, which lists the *authoritative* `choices` for `project_type` (`new_product`, `web_application`, `saas`, `backend_api`, `cloud`, `ai`, `modernization`, `other`) and `timeline` (`asap`, `1_3_months`, `3_6_months`, `flexible`), plus `max_length` per field. Also did a real POST to inspect the actual success-response shape (the created submission object — `id`, `name`, `email`, ..., `created_at` — **not** the `{success, message}` shape the old mock/doc-comment assumed) and real 400 bodies (DRF's standard `{field: [messages]}]`), and a CORS preflight (`OPTIONS` with `Origin: http://localhost:4200`) confirming the backend already allows the Angular dev server's origin. This is the same "verify by actually running it, don't trust the docs" standard this repo already applies to GitHub repos (§3/§4) — applied here to an API contract instead of a README.
- **`src/app/core/models/contact.model.ts`**: added `PROJECT_TYPE_API_VALUES` / `PROJECT_TIMELINE_API_VALUES` — maps from the UI's human-readable labels (unchanged, still what users see in the `<select>`s) to the backend's snake_case slugs above. Kept the UI-facing `ProjectType`/`ProjectTimeline` types exactly as they were rather than switching the `<select>` values to slugs, so the dropdown still displays "Web application" instead of "web_application". `ContactSubmissionResult` gained an optional `fieldErrors?: Record<string, string[]>` for passing DRF's validation-error shape up to the component.
- **`src/app/core/services/contact.service.ts`**: real path now posts `name`/`email`/`company`/`project_type`/`project_description`/`timeline`/`budget`/`attachment` (snake_case, mapped through the tables above) as `multipart/form-data` to `environment.contactEndpoint`. Success is now determined by HTTP status (any 2xx from `http.post`), not by parsing a `{success,message}` body the real backend doesn't send — fixed a latent bug in the pre-existing code that assumed it did. Error handling now branches on `HttpErrorResponse.status`: `400` → `fieldErrors` set from the response body plus a generic "fix the highlighted fields" message; `429` → a distinct throttling message (backend throttles to 5 requests/hour/IP per the Postman collection); anything else (network failure, 5xx) → the original generic "couldn't reach the server" message.
- **`src/app/features/start-project/start-project.ts`** / **`.html`**: added `fieldError(name)` (returns a backend-supplied message for a control if the last submission attempt set one, else the existing hardcoded client-side message — so the same error paragraph now shows either "Please enter a valid email address." from Angular's own `Validators.email`, or a server-side "Enter a valid email address." if the backend rejects something the client-side validators let through) and `applyFieldErrors()` (walks the DRF error body, maps each snake_case key back to a form control via `BACKEND_FIELD_MAP`, and calls `setErrors({server: message})` + `markAsTouched()` so it renders through the existing `isInvalid()`/error-paragraph pattern). `company` and `budget` — previously validator-free, no error UI — got aria-wired error paragraphs too, since the backend can reject them (e.g. `max_length`) even though the client never validates them. `attachment` isn't a `FormControl` (it's a plain signal, set from a native file input), so its backend errors go to a separate `attachmentError` signal instead, cleared whenever a new file is picked.
- **`src/environments/environment.ts`** (dev): `contactEndpoint` now points at the real local backend (`http://127.0.0.1:8010/api/contact/submissions/`, absolute — not relative, since the backend runs on a different port than the Angular dev server on 4200 and there's no dev proxy configured) and `useMockContactApi` flipped to `false`.
- **`src/environments/environment.production.ts`**: left `useMockContactApi: true` — **`api.letusdeliver.com` is not a real deployed backend yet** (still an open item, §11/MEMORY.md), so flipping this would break production. Only updated `contactEndpoint`'s path to the real route shape (`/api/contact/submissions/`, was the placeholder `/api/contact`) so it's correct whenever a real prod backend does go live at that domain.
- **Tests**: both `contact.service.spec.ts` and `start-project.spec.ts` previously only exercised the mock path (`useMockContactApi: true`, waiting out its artificial `delay(700)`). Since `environment.ts` now has it `false`, rewrote both specs around `HttpTestingController` (`expectOne`/`flush`) instead — covers the snake_case field mapping, a 201 success, a 400 with field errors, and (service spec only) a 429. No `angular.json` `test` target file-replacement exists, so unit tests already ran against `environment.ts` (confirmed via `angular.json`), not `environment.production.ts` — this is why disabling the dev mock required updating the specs, but leaving prod's mock on didn't need any.
- Verified: `ng lint` clean, `ng test` 13/13 pass (was 10 — added 3 covering the new success/400/429 branches), `ng build` clean (still mock-mode in the prod bundle, as intended — 23 routes prerendered). Then ran the actual dev server against the actual running backend (not just tests) with a throwaway Playwright script (`chromium` from the existing `@playwright/test` devDependency, not the project's own e2e suite): a full happy-path submission through the real UI showed "Message delivered." and a real row landed in the backend; a bad-email submission showed the field error correctly (in this case caught client-side by `Validators.email` before the request ever left the browser, so it never reached the server — confirms the fallback-to-client-message path in `fieldError()` works too, not just the server-message path). Zero browser console errors either run.
- **Not done / still open**: no honeypot/CAPTCHA on the frontend (the service's doc-comment already flagged spam protection as a backend-side concern; nothing changed there). No e2e (Playwright suite) coverage added for the real-backend path — the existing `npm run e2e` suite wasn't touched or re-run as part of this change (only the throwaway manual verification above). Production still mocked, pending a real deployment target for the backend (§11).

### 17a. Follow-up UX fixes (same day)

The user pointed out four real gaps after trying the now-live form: it could be submitted multiple times, the attachment couldn't be removed once chosen, there was no toast on success, and a name starting with a space was accepted. All fixed in `start-project.ts`/`.html`:

- **Double submission**: `submit()` now guards `if (this.submitting()) return;` as its very first line, in addition to the pre-existing `[disabled]="submitting()"` on the button — defense in depth against two clicks landing in the same tick before the disabled attribute re-renders. Verified live against the real backend: two near-simultaneous clicks (`Promise.all` of two Playwright `.click()`s) produced exactly one `/api/contact/submissions/` request.
- **Attachment removal**: added a "Remove" button (visible only once a file is selected) that clears the `attachment` signal and resets the native `<input type="file">`'s value via a template-ref `viewChild<ElementRef<HTMLInputElement>>('attachmentInput')` — you can't clear a file input's value any other way (assigning `.value = ''` is the one browser-sanctioned reset). Also added a "Selected: {filename}" line so there's now visible confirmation of what's attached, which didn't exist before either.
- **Success toast**: new `src/app/shared/ui/toast/toast.ts` — a small presentational component (`message`/`durationMs` inputs, `dismissed` output, self-timing via an `effect()` + `setTimeout`/`onCleanup`), following the same inline-template pattern as the existing `Tag` component. `StartProject` sets `toastMessage` alongside the existing inline "Message delivered" success panel — both now show on success (the toast is transient/corner-positioned, the panel is the persistent in-page confirmation); not a replacement for the panel, additive.
- **Leading/trailing whitespace**: a `noSurroundingWhitespace` validator (rejects `value !== value.trim()`) applied to `name`, `company`, `projectDescription`, and `budget` — every free-text field where the backend doesn't already reject it via its own type (i.e., not `email`, since Angular's built-in `Validators.email` pattern is anchored and already rejects a leading/trailing space). `fieldError()` shows a dedicated message for the `whitespace` error key, same pattern as the existing `server` error key.
- Verified: `ng lint` clean, `ng test` 16/16 pass (was 13 — added whitespace-validation, double-submit-guard, and attachment-removal specs; the file-input specs use `Object.defineProperty(input, 'files', ...)` since jsdom has no real `DataTransfer`/`FileList` constructors), `ng build` clean. Live-verified against the real backend with a throwaway Playwright script: leading-space name correctly blocked with the new message, attachment select→remove correctly clears both the UI and the native input's value, and the double-submit guard fired exactly one request. The live success-toast/happy-path re-check hit the real backend's 5-requests/hour throttle (accumulated from this and the earlier §17 verification runs) before it could be re-confirmed live — covered instead by a new unit test asserting the toast text renders in the DOM after a mocked successful submission.
