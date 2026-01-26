# The Rustling of the Leaves

A personal blog built with Astro and MDX.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) 4.16
- **Content**: MDX and Markdown
- **Language**: TypeScript
- **Styling**: Scoped CSS with CSS variables

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd rustling

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:4321`.

### Production Build

```bash
npm run build    # Generate static files to dist/
npm run preview  # Preview the production build
```

## Project Structure

```
src/
├── content/
│   ├── config.ts       # Content collection schemas
│   ├── posts/          # Blog posts (MDX)
│   └── notes/          # Microblog notes (Markdown)
├── layouts/
│   ├── BaseLayout.astro
│   ├── PostLayout.astro
│   └── NoteLayout.astro
└── pages/
    ├── index.astro     # Homepage
    ├── posts/          # Post listing and detail pages
    └── notes/          # Note listing and detail pages
```

## Content

### Posts

Long-form articles written in MDX. Create new posts in `src/content/posts/`.

Frontmatter schema:

```yaml
---
title: "Post Title"
description: "A brief description"
pubDate: 2024-01-15
updatedDate: 2024-01-16  # optional
draft: false              # optional, defaults to false
---
```

### Notes

Short microblog-style entries written in Markdown. Create new notes in `src/content/notes/`.

Frontmatter schema:

```yaml
---
pubDate: 2024-01-15
tags: ["thought", "web"]  # optional
---
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SITE_URL` | Production site URL | `http://localhost:4321` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run astro` | Run Astro CLI commands |
