# MEMORY.md — Current State at a Glance

Last updated: 2026-09-13, at commit `d8dde8a`.

This is the 30-second version of "where are we." For full history and the reasoning behind every decision, see **`PROGRESS.md`**. For how to work in this repo (conventions, hard rules, known gotchas), see **`CLAUDE.md`**.

## Where we are

- The site is built and functionally complete against the original ~40-section brief: every page/route, SSR + full prerendering (23 static routes), dark theme, accessibility-audited (WCAG AA contrast verified), unit-tested (Vitest) and e2e-tested (Playwright), CI configured (lint → test → build → e2e on push/PR).
- A full **light theme + header toggle** was added on top of the original dark-only design — independently WCAG-verified, not an inverted palette. (`PROGRESS.md` §15)
- The `/work` portfolio was enriched using independently-verified GitHub repository analyses (real clone/build/test, not README-trust) — added 3 new real personal projects, upgraded 2 existing ones with real GitHub links and verified technical detail, and deliberately excluded one project the analysis found genuinely broken. (`PROGRESS.md` §3/§4)
- Real branding (logo mark, full favicon set) and real founder headshots have replaced all placeholder/initials assets. (`PROGRESS.md` §13/§14)
- Repo: `https://github.com/letusDeliver/letusDeliver-portfolio`, branch `main`. Working tree is clean as of the commit above.

## What's genuinely still open (not just "could be nice")

1. **`ibkr-signal-scanner`'s GitHub link is deliberately withheld.** The source repo (`Mrityunjay1997/ibkr-webapp-main`) has a hardcoded secret committed in `config.ini`. Do not add the link to `projects.data.ts` until the user explicitly confirms the secret has been rotated. Full detail: `PROGRESS.md` §4a.
2. **No real letusdeliver-owned client work exists yet** — the company is new. `/work` only shows personal projects and clearly-labeled prior-employment work. Do not invent client work, testimonials, or metrics under any circumstance.
3. **Placeholders waiting on real input from the user, not code work**: social media URLs (`site.config.ts`), insights articles (currently 3 "coming soon"), privacy/terms legal copy (placeholder, pending real legal review), a real contact-form backend (currently a labeled mock), and a chosen deployment/hosting target (no deploy step in CI yet). Full list: `PROGRESS.md` §11.

## Last few things done (most recent first)

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

Read `CLAUDE.md` for the rules of the road, then jump into the relevant `PROGRESS.md` section for whatever you're about to touch. Don't assume — re-read the section, the reasoning there is often load-bearing.
