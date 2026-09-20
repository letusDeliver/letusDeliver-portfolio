# MEMORY.md — Current State at a Glance

Last updated: 2026-09-20. Committed and pushed through `e72ba0c`; working tree has further uncommitted changes on top (see below) — not yet committed, per "never commit unless asked."

This is the 30-second version of "where are we." For full history and the reasoning behind every decision, see **`PROGRESS.md`**. For how to work in this repo (conventions, hard rules, known gotchas), see **`CLAUDE.md`**.

## Where we are

- The site is built and functionally complete against the original ~40-section brief: every page/route, SSR + full prerendering (23 static routes), dark theme, accessibility-audited (WCAG AA contrast verified), unit-tested (Vitest) and e2e-tested (Playwright), CI configured (lint → test → build → e2e on push/PR).
- A full **light theme + header toggle** was added on top of the original dark-only design — independently WCAG-verified, not an inverted palette. (`PROGRESS.md` §15)
- The `/work` portfolio was enriched using independently-verified GitHub repository analyses (real clone/build/test, not README-trust) — added 3 new real personal projects, upgraded 2 existing ones with real GitHub links and verified technical detail, and deliberately excluded one project the analysis found genuinely broken. (`PROGRESS.md` §3/§4)
- Real branding (logo mark, full favicon set) and real founder headshots have replaced all placeholder/initials assets. (`PROGRESS.md` §13/§14)
- 5 of the 10 `/work` projects now show a real screenshot (cloned/run/screenshotted locally, not a stock photo or mockup) instead of the gradient placeholder — the other 5 keep the placeholder because no verifiable public repo/demo exists for them, or (`flowmedic`) because it needs Docker, which this machine doesn't have. (`PROGRESS.md` §18/§19)
- Repo: `https://github.com/letusDeliver/letusDeliver-portfolio`, branch `main`.

## What's genuinely still open (not just "could be nice")

1. **`flowmedic` has no screenshot and no Docker/WSL path to get one on this machine.** The user explicitly chose to skip it (2026-09-20) rather than install Docker Desktop. Revisit if they set up Docker/WSL themselves, or want to supply their own screenshot. Full detail: `PROGRESS.md` §19.
2. **No real letusdeliver-owned client work exists yet** — the company is new. `/work` only shows personal projects and clearly-labeled prior-employment work. Do not invent client work, testimonials, or metrics under any circumstance.
3. **Placeholders waiting on real input from the user, not code work**: social media URLs (`site.config.ts`), insights articles (currently 3 "coming soon"), privacy/terms legal copy (placeholder, pending real legal review), and a chosen deployment/hosting target (no deploy step in CI yet). Full list: `PROGRESS.md` §11.
4. **Contact form backend is real in dev, still mocked in production.** A real Django backend now exists and is wired up for local dev (`environment.ts` → `http://127.0.0.1:8010/api/contact/submissions/`, `useMockContactApi: false`) — verified end-to-end against the running backend. `environment.production.ts` is still `useMockContactApi: true` because `api.letusdeliver.com` isn't a deployed backend yet; flip that once it is. Full detail: `PROGRESS.md` §17.
5. **`ibkr-webapp-main`'s secret was reported rotated by the user (2026-09-20) but the repo's git history is unchanged** — the old `flask_secret_key` value is still literally committed in `config.ini` on `main`. The link is now live on the site per the user's explicit confirmation, but if this ever matters again (e.g. someone asks "is that repo safe to share"), the honest answer is "the live value was rotated, the git history was not purged." Full detail: `PROGRESS.md` §4a's 2026-09-20 update.

## Last few things done (most recent first)

- **Added `CareerNaukri` (new project) + a screenshot for the previously-withheld `ibkr-signal-scanner`** (not yet committed — `PROGRESS.md` §19): researched and verified a brand-new Django project from scratch (no prior GitHub analysis existed for it) before writing any site copy — real model/view inspection, not guesses; explicitly avoided claiming things that turned out false (e.g. no real test suite exists, despite `tests.py` files being present). Confirmed with the user first that `ibkr-webapp-main`'s committed secret had been rotated (see open item 5 below for a caveat on that) before adding its `githubUrl` + a real screenshot. `flowmedic` was asked about and explicitly skipped by the user (no Docker here). Also fixed a real `NG0913` perf warning (lazy-loaded LCP image) found while doing this. `/work` now lists 10 projects, 5 with real images; build prerenders 23 routes.
- **Removed the "Nightwatch Platform" project** (not yet committed) — user-requested removal from `/work`. Deleted the entry from `projects.data.ts`, its slug from Kunal's `projectSlugs` in `founders.data.ts`, its URL from `sitemap.xml`, and repointed the e2e test that used it as its professional-experience example to `enterprise-data-pipelines` instead. Left the founder-bio resume prose that mentions Nightwatch by name untouched — that's a factual employment-history claim (§2 sourcing), not the project listing the user asked to remove.
- **Real project screenshots on `/work`** (not yet committed — `PROGRESS.md` §18): cloned, built and ran 3 of the 4 publicly-linked personal projects locally (skipped `flowmedic`, needs Docker which this machine doesn't have) and screenshotted the actual running apps — no stock photos or mockups. Added `imageUrl`/`imageAlt` to the `Project` model, wired into both `/work` cards and detail-page heroes + `og:image`.
- **Contact form: wired to the real backend + 4 follow-up UX fixes** (both same day — `PROGRESS.md` §17/§17a, commit `e72ba0c`, pushed): swapped the mock for the real Django backend in dev (snake_case field mapping verified against the backend's own DRF `OPTIONS` metadata, not guessed; real success/400/429 handling; per-field backend error display), then fixed double-submission, no way to remove a chosen attachment, no success toast (new `shared/ui/toast` component), and fields accepting leading/trailing whitespace. `ng test` 13 → 16, all passing.
- Fixed a webhint "no-inline-styles" false-flag on the hero SVG gradient (moved `stop-color` out of an inline `style=` attribute into a CSS class) — commit `d8dde8a`.
- Added the dark/light theme switcher (`ThemeService`, header toggle, dedicated `--color-on-accent` token, fixed a latent theme-coupling bug in the primary button) — commit `058d663`.
- Enlarged and restructured the founder cards (home + `/about`) to an image-left/description-right flex layout; enlarged the founder detail hero photo.
- Added real founder profile photos, replacing initials avatars, across 3 templates + wired into `og:image`/Person structured data.
- Added real logo mark + full favicon set to header/footer/`index.html`.
- Portfolio enrichment from GitHub analysis — commit `5160c69`.

## How to pick this back up cold

```bash
cd D:\Start-up\letusdeliver
npm install   # if node_modules isn't present
npm start     # dev server -> http://localhost:4200
```

The contact form's real backend is a separate service, not started by anything above — see `CLAUDE.md`'s "Contact form backend" section before assuming it's reachable.

Read `CLAUDE.md` for the rules of the road, then jump into the relevant `PROGRESS.md` section for whatever you're about to touch. Don't assume — re-read the section, the reasoning there is often load-bearing.
