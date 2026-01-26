# Content Creation Scripts

Helper scripts to quickly create new blog posts and notes with proper frontmatter.

## Available Scripts

### `npm run new:post`

Creates a new blog post with interactive prompts.

**Usage:**
```bash
npm run new:post
```

**Prompts:**
- **Title** (required): The title of your post
- **Description** (required): A short description for SEO and previews
- **Publication date** (optional): Defaults to today's date (YYYY-MM-DD format)

**Output:**
Creates a file at `src/content/posts/{slug}.mdx` where `{slug}` is generated from the title in kebab-case.

**Example:**
```
Title: My First Post
Description: A brief introduction to the blog
Publication date [2024-01-25]:

→ Creates: src/content/posts/my-first-post.mdx
```

### `npm run new:note`

Creates a new note with the current timestamp.

**Usage:**
```bash
npm run new:note
```

**Prompts:**
- **Tags** (optional): Comma-separated list of tags

**Output:**
Creates a file at `src/content/notes/{timestamp}.md` where `{timestamp}` is in `YYYY-MM-DD-HHmm` format.

**Example:**
```
Tags (comma-separated, optional): thoughts, meta

→ Creates: src/content/notes/2024-01-25-1030.md
```

## File Locations

| Content Type | Directory | Extension |
|--------------|-----------|-----------|
| Posts | `src/content/posts/` | `.mdx` |
| Notes | `src/content/notes/` | `.md` |

## Frontmatter Fields

### Posts

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The post title |
| `description` | Yes | Short description for SEO |
| `pubDate` | Yes | Publication date (YYYY-MM-DD) |
| `updatedDate` | No | Last updated date |
| `draft` | No | Set to `true` to hide from listings |

### Notes

| Field | Required | Description |
|-------|----------|-------------|
| `pubDate` | Yes | Publication datetime (ISO 8601) |
| `tags` | No | Array of tag strings |

## Tips

### Draft Mode for Posts

To create a draft post that won't appear in listings, add `draft: true` to the frontmatter:

```yaml
---
title: "Work in Progress"
description: "Not ready yet"
pubDate: 2024-01-25
draft: true
---
```

### Quick Notes Workflow

Notes are designed for quick capture. Just run `npm run new:note`, optionally add tags, and start writing. The timestamp-based filename ensures uniqueness and chronological ordering.
