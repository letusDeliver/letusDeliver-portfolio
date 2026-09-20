# Founder Profile Update — Kunal & Mrityunjay

Content and presentation update to both founder pages, per the content brief: rephrase and differentiate the two co-founders' profiles while preserving the existing shared, data-driven architecture (no redesign, no duplicate components).

## Architecture (unchanged, confirmed reusable)

The app already had exactly the structure the brief asked for — nothing was duplicated:

```
FounderProfileComponent (features/about/founder/founder.ts + .html)
              ↓
     FOUNDERS: Founder[] (core/data/founders.data.ts)
              ├── slug: 'kunal'
              └── slug: 'mrityunjay'
```

One route (`/about/:slug`), one component, one template — it renders whichever founder object `getFounder(slug)` returns. Both founder cards on `/about` and the homepage `founders-preview` section also read from the same `FOUNDERS` array. This work only touched the data and the shared template; no new routes or components were created.

## Files Modified

| File | Change |
|---|---|
| `src/app/core/models/founder.model.ts` | Added `FounderExpertiseArea` (`{title, description}`) and `FounderFocus` (`{stages, description}`) interfaces. Changed `Founder.expertise` from `string[]` to `FounderExpertiseArea[]`. Added `Founder.roleAtLetusdeliver: string` and `Founder.buildingLetusdeliver: FounderFocus`. |
| `src/app/core/data/founders.data.ts` | Full content rewrite for both founders — see below. |
| `src/app/features/about/founder/founder.html` | "Core expertise" changed from a tag-pill cloud to a two-column grid of title+description areas. Added two new sections: "Role at letusdeliver" (after Engineering philosophy) and "Building letusdeliver" (after Technical stack — a stage breadcrumb + one paragraph). Changed the closing CTA from founder-named ("Want to work with {{ founder.name }}?") to company-oriented ("Have a product idea?"). |
| `src/app/features/home/sections/founders-preview/founders-preview.html` | The homepage teaser card used `founder.expertise.slice(0,3).join(' · ')`, which no longer type-checks now that `expertise` holds objects. Switched to `founder.summary` instead — that field is now itself a tightened 1–2 sentence intro (see below), a better fit for a teaser than a joined tag fragment, and it's the same field `about.html`'s founder card already uses, so both teaser surfaces are now consistent. |

`about.html` (the `/about` list page's condensed founder card) needed no changes — it already read `founder.summary`, which just got shorter and sharper.

## Content Changes

### Kunal's positioning: Frontend + Product + Architecture + AI-assisted Engineering

- **Role**: "Co-Founder · Frontend & Product Engineering" (was "Co-Founder · Full-Stack & Frontend Architect").
- **Hero intro** (`summary`, now 1–2 sentences instead of a 3-sentence resume paragraph): leads with frontend + product engineering, Angular, and turning requirements into scalable software.
- **Philosophy**: rewritten around problem-first architecture, maintainability, accessibility/performance as default requirements, and AI-assisted workflows (Claude Code) as a working practice — kept the real, existing Claude Code detail, reframed more crisply.
- **Core expertise** (7 areas, title + one-line description each, replacing the old flat tag list): Frontend Engineering, Product Engineering, Application Architecture, Enterprise Engineering, AI-Assisted Engineering, Full-Stack Development, Accessibility & Performance. Every claim traces to technologies/facts already in the data (Native Federation, RBAC, the verified ~20% perf improvement, WCAG work, Claude Code) — nothing new invented.
- **Role at letusdeliver** (new section): frontend architecture ownership, Angular leadership, engineering standards, AI-assisted development folded into daily workflow.
- **Professional experience**: same 4 employers, same dates, same facts — bullets lightly tightened (e.g. "Implemented accessibility improvements... raising WCAG conformance" → "Raised WCAG conformance... through semantic HTML and ARIA improvements", same meaning, fewer words).
- **Building letusdeliver** (new): `Product → Frontend → Application Architecture → AI-assisted Engineering`.
- **Technologies**: same technologies, `Architecture & Patterns` renamed to `Architecture` and `UI Libraries` renamed/merged into `UI & Styling` (added Bootstrap there) for tighter category naming — no technology added or removed.

### Mrityunjay's positioning: Backend + Cloud + Data + Infrastructure + Reliability

- **Role**: "Co-Founder · Backend, Cloud & Data Engineering" (was already close, from a prior same-session update — tightened wording to match the brief exactly).
- **Hero intro**: tightened to 1–2 sentences — backend/cloud/data leadership, production-grade systems, reliability at scale.
- **Philosophy**: largely preserved from the prior update (already technically mature and on-brief) — reliable foundations, architecture → infrastructure → data → reliability → scale, AI exploration beyond code generation.
- **Core expertise** (6 areas): Backend Engineering, Cloud Engineering, Data Engineering, Database Engineering, DevOps & CI/CD, Production Reliability — matches the brief's suggested categories almost exactly, each grounded in real technologies already in the data.
- **Role at letusdeliver** (new section): backend architecture, cloud infrastructure, data engineering, CI/CD and production-reliability ownership; AI-assisted workflows in backend implementation/testing/debugging.
- **Professional experience**: same 3 employers, same dates. One line changed beyond wording: the Insight Global bullet that named the internal platform ("Nightwatch") was generalized to "an enterprise monitoring and operational platform" — see Confidentiality below.
- **Selected work**: unchanged (IBKR Signal & Scanner Engine, FlowMedic, CareerNaukri) — see "Not changed" below for why the descriptions themselves weren't rewritten.
- **Building letusdeliver** (new): `Backend → Data → Cloud → Infrastructure → Reliability`.
- **Technologies**: unchanged from the prior same-session update (already well-organized, already includes an "AI & Engineering Tools" category).

### Shared / company positioning

- Both pages now end in the same company-oriented CTA instead of a founder-named one: **"Have a product idea? Tell us what you're building and we'll explore how we can help turn it into a production-ready product."** → Start a Project. Neither page says "Contact Kunal"/"Contact Mrityunjay" — the site has no direct-founder-contact flow, only the shared `/start-a-project` form, so per the brief's own instruction ("unless the existing UX specifically supports direct founder contact") a founder-named CTA was never appropriate.
- Read together, the two "Building letusdeliver" strips and "Role at letusdeliver" sections are deliberately complementary rather than overlapping — Kunal's stops at the interface, Mrityunjay's picks up everything underneath it. No shared paragraph was force-fit into both pages; every sentence on each page is specific to that founder.

## Confidentiality / no-fabrication compliance

- **No client names.** "The Home Depot" was already absent from Mrityunjay's data going into this task (dropped in a prior same-session update). Re-verified it doesn't appear anywhere in the new content.
- **Went one step further than "don't name the client"**: the Insight Global experience bullet previously named the internal platform ("Nightwatch") by name. Since that's specific, identifying detail about a client's internal tooling, it was generalized to "an enterprise monitoring and operational platform" — consistent with this same repo's earlier decision to remove the "Nightwatch Platform" project card from `/work` entirely.
- **No invented facts.** Every technology, employer, date, and achievement (the ~40% API improvement, ~200+ hours/month saved, ~20% perf improvement, the Rising Star/Platform Guardian recognitions, the Astronomer/GCP certifications) already existed in the verified data before this task and was carried forward unchanged — none of it originated in this rewrite.
- **One factual disagreement, resolved conservatively**: the brief states Kunal has "5+ years" of experience. The verified, resume-sourced figure already in the site's data is "4.5+ years." Per `CLAUDE.md`'s rule that founder facts must trace to source resumes rather than be paraphrased or approximated, **the verified 4.5+ years figure was kept**, not the brief's rounder number. Flagged here rather than silently going either way — if 5+ years is now accurate (e.g. the figure has simply moved since the resume was last read), say so and it's a one-line change.

## UI Changes

- "Core expertise" is now a 2-column grid of `<h3>` + `<p>` pairs (was a flex-wrap row of `<app-tag>` pills). Reads as short explanations, not a keyword cloud — matches the brief's explicit instruction not to "merely list technologies."
- Two new `<section>` blocks added to the existing page structure, styled identically to the page's other sections (same heading/spacing conventions — no new CSS, no new component).
- "Building letusdeliver" renders its stages as small accent-tinted pill badges connected by `→` glyphs — a plain-text breadcrumb, not a new animated diagram. This was a deliberate choice: the site's hero section already has an animated SVG "pipeline" motif (nodes + flowing gradient line, added in an earlier session's motion-enhancement pass), and that same pass's own audit explicitly decided against duplicating it elsewhere on the site. A static breadcrumb communicates the same "stages" idea without competing with or diluting that existing motif.
- CTA section unchanged visually (same card, same button) — only its heading/body copy changed.

## Data Model Changes

- `Founder.expertise`: `string[]` → `FounderExpertiseArea[]` (`{title, description}`). **Breaking change**, contained to the two call sites that read it (both updated as part of this change — see Files Modified).
- `Founder.roleAtLetusdeliver: string` — new, required field.
- `Founder.buildingLetusdeliver: FounderFocus` (`{stages: string[], description: string}`) — new, required field.

Both new fields are populated for both founders (no optional/partial state to handle in the template).

## Assumptions Made

1. **"Selected work" project descriptions were left unchanged.** The brief asks to "improve descriptions so they highlight backend/cloud/data engineering" for Mrityunjay's projects — but those descriptions (`project.summary` in `projects.data.ts`) are shared, global content also used on the public `/work` list, `/work/:slug` detail pages, and the homepage's featured-work section. Rewriting them for founder-page framing would silently change copy on unrelated, already-reviewed public pages. The existing summaries already emphasize the right technical angle for each project (real-time backend systems, Airflow automation, Django/API/database work), so this was treated as out of scope for a founder-profile task rather than reinterpreted as an invitation to edit shared site content.
2. **Kunal's years-of-experience figure**: kept the verified "4.5+ years" over the brief's "5+ years" — see Confidentiality/no-fabrication section above.
3. **CTA copy is identical on both pages** (not founder-specific) and lives directly in `founder.html`, not duplicated into each founder's data object — it's genuinely the same sentence for both, so keeping it in the template avoids two copies of identical text drifting out of sync later.
4. **Certifications/Education kept in their existing position** (after Selected work, before Technical stack) — the brief's suggested 10-section structure doesn't have an explicit slot for them; moving them wasn't asked for and they read fine where they are.
5. No new images, routes, or npm dependencies were introduced.

## Verification

`ng lint` clean, `npm test -- --watch=false` 16/16 pass, `ng build` clean (20 routes — data-only + template changes, no new routes). No e2e test currently exercises `/about/kunal` or `/about/mrityunjay`, so none needed updating. Playwright-screenshotted both full founder pages, the `/about` list page's condensed cards, and the homepage `founders-preview` section — zero console errors or warnings anywhere, and the two founders' intros read as clearly distinct professional identities side by side on the homepage.
