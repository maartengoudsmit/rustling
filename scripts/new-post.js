import { createInterface } from 'readline';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '..', 'src', 'content', 'posts');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function color(text, colorCode) {
  return `${colorCode}${text}${colors.reset}`;
}

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function createReadlineInterface() {
  return createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function question(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  const rl = createReadlineInterface();

  console.log();
  console.log(color('  Create a New Blog Post', colors.bright + colors.cyan));
  console.log(color('  ─────────────────────', colors.cyan));
  console.log();

  // Get title (required)
  let title = '';
  while (!title.trim()) {
    title = await question(rl, color('  Title: ', colors.yellow));
    if (!title.trim()) {
      console.log(color('  Title is required.', colors.red));
    }
  }

  // Get description (required)
  let description = '';
  while (!description.trim()) {
    description = await question(rl, color('  Description: ', colors.yellow));
    if (!description.trim()) {
      console.log(color('  Description is required.', colors.red));
    }
  }

  // Get date (default to today)
  const today = formatDate(new Date());
  const dateInput = await question(
    rl,
    color(`  Publication date [${today}]: `, colors.yellow)
  );
  const pubDate = dateInput.trim() || today;

  // Generate slug
  const slug = toKebabCase(title);

  // Create file content
  const content = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
pubDate: ${pubDate}
---

Start writing your post here...
`;

  // Ensure directory exists
  if (!existsSync(POSTS_DIR)) {
    mkdirSync(POSTS_DIR, { recursive: true });
  }

  // Write file
  const filePath = join(POSTS_DIR, `${slug}.mdx`);

  if (existsSync(filePath)) {
    console.log();
    console.log(color(`  File already exists: ${filePath}`, colors.red));
    rl.close();
    process.exit(1);
  }

  writeFileSync(filePath, content, 'utf-8');

  console.log();
  console.log(color('  Post created successfully!', colors.green));
  console.log();
  console.log(color('  File: ', colors.cyan) + filePath);
  console.log(color('  Slug: ', colors.cyan) + slug);
  console.log();

  rl.close();
}

main().catch((err) => {
  console.error(color(`  Error: ${err.message}`, colors.red));
  process.exit(1);
});
