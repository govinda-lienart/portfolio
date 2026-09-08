# portfolio

Portfolio of Govinda Lienart — machine-learning engineering projects.

- **Landing** (`/`) — dark, terracotta-accented hero. One project card for now (AquaMind); built to hold more.
- **Article section** (`/aquamind/…`) — a PLOS-style reading room built with [Starlight](https://starlight.astro.build): numbered sections, figures, code highlighting, left nav across all pipeline stages.

## Stack

[Astro](https://astro.build) + Starlight. Hero is a hand-built `src/pages/index.astro`; Starlight powers the docs. Deploys to GitHub Pages via `.github/workflows/deploy.yml` (Pages source must be set to "GitHub Actions").

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # -> dist/
npm run preview
```

## Layout

```
src/
  pages/index.astro          landing hero
  pages/about.astro
  pages/contact.astro
  layouts/DarkPage.astro     shared dark layout for about/contact
  components/
    Figure.astro             numbered "Fig N." + optimized image
    FigureRow.astro          multi-panel figure, one caption
    Abstract.astro           journal-style abstract box
  styles/plos.css            Starlight -> PLOS/MkDocs reading room
  content/docs/aquamind/     the article, one file per stage
  assets/                    hero + article images (optimized at build)
```

Content is authored in Markdown / MDX under `src/content/docs/aquamind/`. Most
stage pages are drafts pending migration from the AquaMind repo's `docs/`.
