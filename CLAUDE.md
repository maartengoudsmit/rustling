# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Local development (starts TinaCMS + Eleventy dev server)
npm run dev

# Production build (runs TinaCMS build then Eleventy)
npm run build
```

The package manager is **pnpm** (v10.30.0), but the CI workflow uses `npm ci`. Use `npm` for consistency with the workflow unless working purely locally.

## Architecture

This is a personal blog called "The Rustling of the Leaves" built with **Eleventy (11ty) v3** and **TinaCMS** for content management.

### How it fits together

1. **TinaCMS** (`tina/config.ts`) defines the content schema and builds the CMS admin UI into the `admin/` folder (gitignored — generated at build time). It connects to Tina Cloud for the hosted CMS backend.
2. **Eleventy** (`eleventy.config.js`) reads content from `content/` and templates from `_includes/`, building the static site into `_site/`.
3. The site is deployed to **Neocities** (main site) and **GitHub Pages** (also hosts the full `_site/` including the admin UI) on every push to `main` via `.github/workflows/deploy.yml`.

### Content model

TinaCMS manages two collections, both stored as Markdown in `content/`:
- **Notes** (`content/notes/`) — short-form posts with `body`, `tags`, `published`, `updated`. Filenames are auto-generated as `n{YYYY-MM-DD}@{HHmm}.md`.
- **Reviews** (`content/reviews/`) — structured reviews with `topic` (title), `body`, `tags`, `url`, `image`, `published`, `updated`. Filenames use prefix `r`.

Both collections auto-set `published` and `updated` timestamps via `beforeSubmit` hooks in `tina/config.ts`.

### Templates

Eleventy uses **Liquid** templates:
- `index.liquid` — homepage, renders all `collections.note` items via the `note` partial
- `_includes/header.liquid` — site header with nav
- `_includes/note.liquid` — single note card partial
- `_includes/base.liquid` — base layout (currently empty)

### Static assets

- `styles/styles.css` — single CSS file with CSS custom properties (Totoro-inspired green palette, Fraunces/Poppins/JetBrains Mono fonts)
- `scripts/wobbly.js` — client-side script that generates an SVG wobbly divider line between the header and main content

### Environment variables

Required for TinaCMS cloud sync (set as GitHub Actions secrets):
- `NEXT_PUBLIC_TINA_CLIENT_ID` — Tina Cloud client ID
- `TINA_TOKEN` — Tina Cloud token

The `tina/__generated__/` directory is gitignored and regenerated during build.
