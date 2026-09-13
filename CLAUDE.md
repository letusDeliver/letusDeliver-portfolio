# CLAUDE.md — Operating Guide

Read this first if you're a Claude Code session working in this repository. Then read **`MEMORY.md`** for where the project currently stands, and **`PROGRESS.md`** for the full history and rationale behind every non-obvious decision. `README.md` is the public-facing "how to run this" doc — read it too, but it won't tell you *why* things are the way they are.

## What this is

A production Angular company website for **letusdeliver**, a founder-led software engineering studio (Kunal + Mrityunjay). Angular 22, standalone + zoneless, SSR + full prerendering, Tailwind v4. See `README.md` for the stack rundown.

## Hard rules — content integrity

This project has a strict no-fabrication policy, baked into the data model, not just a guideline:

- Every `Project` has an `ownershipType`: `'letusdeliver'` (real company client work — **there is currently none**, the company is new), `'personal'`, or `'professional-experience'` (prior employer work, shown as capability evidence and explicitly labeled **not** a letusdeliver engagement in the UI). Never blur this line.
- Founder facts (skills, employers, dates, certifications) must trace back to the source resumes referenced in `PROGRESS.md` §2 — re-read them if anything needs updating, don't paraphrase from memory or invent plausible-sounding details.
- Never invent client names, testimonials, metrics, or case studies. If asked to add "client work," ask where the real details are coming from first.
- New personal projects sourced from a GitHub repo: verify by actually cloning/building/testing, not by trusting the README. Use the honest `statusLabel` pattern (`PROGRESS.md` §4) for anything not a finished, shipped thing — and never upgrade language to "AI-powered" etc. unless the code genuinely does that.

## Git workflow

- **Never commit unless explicitly asked** — this is a general rule but worth restating here because this repo has a real `origin` (`https://github.com/letusDeliver/letusDeliver-portfolio.git`, branch `main`) that gets pushed to.
- Stage explicit file paths, not `git add -A` — the established pattern in this repo's history.
- `origin` is already configured; a plain `git push` (no `-u`, no remote setup) works once a commit exists.

## Before calling anything "done"

```bash
npm run lint && npm test -- --watch=false && npm run build && npm run e2e -- --project=chromium
```

All four are expected to be clean at all times. If one fails after your change, that's a regression to fix, not a pre-existing condition to ignore.

## The VS Code Problems panel is not the source of truth

`ng lint` (ESLint + `angular-eslint`, which understands Angular's template syntax) is the authoritative linter for this project. A separate extension (Microsoft Edge Tools / webhint) also surfaces in the editor's Problems panel and reliably produces **false positives** on Angular-specific patterns it doesn't parse:

- `[alt]="expr"` property bindings flagged as "no alt text" (it only recognizes literal `alt="..."`).
- `@for`/`@if` control-flow blocks inside `<ul>`/`<ol>` flagged as "invalid children" (the control-flow syntax compiles to comment/text nodes).
- `<ng-content>`-projected button text flagged as "no discernible text" (static analysis can't see the runtime-projected content).

Before "fixing" something the Problems panel flags, run `ng lint` first — if that's clean, check whether it's one of the above before touching working code. Real, fixable webhint findings (e.g. inline `style="..."` attributes where a Tailwind utility or CSS class could be used instead) are worth fixing; the three patterns above are not.

## Design tokens & WCAG contrast

Every text/background color pairing in `src/styles/tokens.css` was independently verified for WCAG AA contrast (relative luminance formula: `L = 0.2126R + 0.7152G + 0.0722B` per-channel-linearized, ratio `= (L1+0.05)/(L2+0.05)`, need ≥4.5:1 for normal text). This includes **two separate palettes** — dark (default, in the `@theme` block) and light (the `[data-theme='light']` override block) — and they are **not** simple inversions of each other; some tokens (notably the accent purple) needed genuinely different hex values per theme to pass contrast as text. If you change or add a color, recompute the ratio for both themes before committing to it — don't eyeball it. See `PROGRESS.md` §7.6 and §15 for the worked examples and the exact numbers already verified.

## Known recurring gotcha

A `fullPage` Playwright screenshot taken without scrolling through the page first will show most below-the-fold content as blank — this is the `appReveal` scroll-triggered reveal directive never getting an `IntersectionObserver` hit, not a bug. Always scroll (or auto-scroll) through the page before screenshotting for QA, or you'll misdiagnose a phantom bug. (This has happened twice already in this project's history — see `PROGRESS.md` §7 and §15.)

## Image processing

There are no image-processing npm packages in this project. When the user drops raw image assets (logos, headshots, etc.) into `public/images/`, process them with the system Python install (`C:\Users\singh\AppData\Local\Programs\Python\Python312\python`; `pip install pillow` the first time) — resize/re-encode for web delivery, chroma-key a flat background to transparency when needed, and delete oversized raw originals after extracting the web-ready version. See `PROGRESS.md` §13/§14 for the exact commands used so far.

## Where things live

- **Content** (projects, founders, services, articles): `src/app/core/data/*.ts` — typed data only, never hardcode content into templates.
- **Design tokens**: `src/styles/tokens.css`.
- **Theme system**: `src/app/core/services/theme.service.ts` + the `[data-theme]` blocks in `tokens.css`/`typography.css`.
- **Full history & rationale for every decision**: `PROGRESS.md`.
- **Current state at a glance**: `MEMORY.md`.
