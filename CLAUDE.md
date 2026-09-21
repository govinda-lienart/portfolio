# portfolio — Project Context for Claude Code

## What this is
Govinda Lienart's public portfolio site — `https://govinda-lienart.github.io/portfolio/`.
One landing hero (built to hold more project cards later), and a PLOS-style article section
for AquaMind (an automated zebrafish behaviour-analysis CV/ML pipeline — the actual code lives
in the separate `github.com/govinda-lienart/AquaMind` repo, cloned as a sibling of this one at
`~/Documents/Github_HD/AquaMind`). This site is the ONLY public writeup for AquaMind — its old
in-repo MkDocs `docs/` site was deleted 2026-09-09, no going back.

**Purpose:** portfolio piece for a Junior ML Engineer job search (target: Dataroots, Data
Wizards, VITO — Belgium, ~September 2026). Content should read as rigorous and defensible, not
padded — see Work style below.

## Stack
Astro 7 + Starlight 0.42. Deploys to GitHub Pages via `.github/workflows/deploy.yml` (Pages
source = GitHub Actions). **Base path is `/portfolio`** (`astro.config.mjs`) — any hardcoded
internal path (not going through a component that auto-prefixes it) needs `/portfolio` typed in
by hand, or it 404s in production while working fine in dev.

```bash
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # -> dist/
npm run preview
```

## Two deliberate aesthetics
- **Landing / about / contact** — dark, terracotta-accented, reuses the exact design system
  from the `dao-van-hoang` repo's `build/style.css`: `#0b0d0c` ground, `#e9e4d7` bone, `#c8502f`
  accent, Fraunces + Spectral + IBM Plex Mono. Hand-built `src/pages/index.astro` +
  `src/layouts/DarkPage.astro`.
- **`/aquamind/*` article section** — light, PLOS/MkDocs "reading room" via Starlight +
  `src/styles/plos.css`: numbered sections, journal-blue links, serif body. Content lives in
  `src/content/docs/aquamind/`, one MDX/MD file per pipeline stage (`stages/01-frame-extraction.mdx`
  … `09-deployment.md`), plus `index.mdx`, `architecture/`, `discussion.md`, `tank-setup.mdx`.
  **Stage numbering (2026-09-21):** `05-model-assisted-annotation.mdx` was inserted after the tracker, so
  re-ID, chasing, feeding-strike and deployment moved from 05-08 to 06-09. The old URLs redirect via
  `redirects` in `astro.config.mjs`. Asset filenames were NOT renamed (e.g. `08-feeding-strike-*.svg`
  keeps its old prefix). The site's numbering differs from AquaMind's internal `CLAUDE.md` / `docs/diary.md`
  numbering (that scheme has its own Stage 5 = tracker evaluation, 6 = re-ID, 7 = chasing, 8 = feeding
  strike); "`diary.md`'s Stage N section" references on the pages point at that internal scheme on purpose.

## Components (`src/components/`)
- **`Figure.astro`** — numbered "Fig N." caption (CSS counter), takes an Astro-optimized
  `ImageMetadata` src. Use for photos/screenshots imported from `src/assets/aquamind/stage-NN/`.
- **`FigureSrc.astro`** — same look as `Figure`, but takes a plain string path instead of an
  imported asset (auto-prefixes the `/portfolio` base itself). Use for SVG diagrams, which live
  as raw static files in `public/aquamind/stages/` rather than going through `src/assets/` +
  Astro's image pipeline (SVGs don't need/benefit from that optimization).
- **`FigureRow.astro`** — multi-panel figure sharing one caption.
- **`Abstract.astro`** — journal-style abstract box.
- **`PaperHeader.astro`** — subtitle/authors/venue/date/meta header block at the top of a stage page.
- **`ArchitectureOverview.astro`**, **`PipelineDeepDive.astro`** — larger bespoke diagram
  components (the latter embeds a draw.io/mxgraph XML blob directly — don't hand-edit that XML,
  regenerate from draw.io instead).
- **`VideoSrc.astro`** — inline video figure, same string-path + auto-prefix pattern as `FigureSrc`.
- **`WideContent.astro`** — widens `--sl-content-width` for a page that needs more horizontal room.

## Asset storage convention
- **Photos/screenshots**: `src/assets/aquamind/stage-NN/name.png`, imported in the MDX
  frontmatter and passed to `<Figure src={imported} .../>` — Astro optimizes these at build
  (resized, converted to `.webp`).
- **SVG diagrams**: `public/aquamind/stages/NN-name-purpose.svg` (served as static files
  unmodified), referenced via `<FigureSrc src="/aquamind/stages/NN-name.svg" .../>` or, for a
  link-triggered popup with no embedded thumbnail (see Lightbox below), a raw
  `data-lightbox-src="/portfolio/aquamind/stages/NN-name.svg"` — note this second form needs the
  `/portfolio` prefix typed by hand since it isn't going through `FigureSrc`'s own auto-prefix logic.

## Lightbox (`public/lightbox.js`)
Global click-to-zoom overlay (pan/zoom/close, no dependencies), auto-binds to every `img` inside
`.am-figure`/`.am-figrow__panel` — i.e. anything rendered through `Figure`/`FigureSrc`/`FigureRow`.
Deliberately skips its auto-upscale-to-fit-stage logic for `.svg` sources specifically, since
SVGs report unreliable intrinsic pixel sizes in the browser.

As of 2026-09-18 it also supports a **text-link trigger** — for popping a diagram with *no*
visible thumbnail embedded in the page, used when a full numbered `Figure` would be visual
overkill for something supplementary/optional (e.g. a per-script internals diagram linked from
a sentence, for a reader who wants to dig deeper rather than read the source on GitHub):

```html
<a href="#" data-lightbox-src="/portfolio/aquamind/stages/NN-name.svg" data-lightbox-alt="...">flow diagram</a>
```

Prefer this pattern for depth-on-demand content rather than embedding another full `Figure` for
every script — reserve `Figure`/`FigureSrc` for diagrams the argument actually depends on.

## Content authoring
Prose facts about AquaMind (pipeline behavior, metrics, decisions, dates) must trace back to the
AquaMind repo's own `CLAUDE.md` and `docs/diary.md` (its reasoning-trail log) — don't invent or
extrapolate architecture/results that aren't documented there. When migrating or drafting a
stage's content, check the AquaMind repo directly rather than relying on memory of it, since it
changes as Govinda continues rewriting/consolidating that codebase.

## Work style — IMPORTANT
- **Review plans before files are created** — don't scaffold new pages/sections speculatively;
  confirm scope first.
- **Challenge scope creep against AquaMind's code-mastery consolidation pause**: as of
  2026-08-26, new AquaMind *building* is paused for a code-mastery review month — writing/polishing
  this portfolio is in scope, but don't let it balloon into new AquaMind feature work disguised as
  "content for the portfolio."
- No em-dash interruption clauses in prose (his stated preference, reads as AI-written) — same
  house style rule as the AquaMind repo.
