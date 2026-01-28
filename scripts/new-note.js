import { createInterface } from 'readline';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NOTES_DIR = join(__dirname, '..', 'src', 'content', 'notes');

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

function formatDateTime(date) {
  // Format: YYYY-MM-DDTHH:mm:ss
  const pad = (n) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function generateFilename(date) {
  // Format: YYYY-MM-DD-HHmm.md
  const pad = (n) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}.md`;
}

function parseTags(input) {
  if (!input.trim()) return [];
  return input
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

function formatTagsArray(tags) {
  if (tags.length === 0) return '[]';
  return `[${tags.join(', ')}]`;
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
  const now = new Date();

  console.log();
  console.log(color('  Create a New Note', colors.bright + colors.cyan));
  console.log(color('  ─────────────────', colors.cyan));
  console.log();

  // Get tags (optional)
  const tagsInput = await question(
    rl,
    color('  Tags (comma-separated, optional): ', colors.yellow)
  );
  const tags = parseTags(tagsInput);

  // Generate datetime and filename
  const pubDate = formatDateTime(now);
  const filename = generateFilename(now);

  // Create file content
  const content = `---
pubDate: ${pubDate}
tags: ${formatTagsArray(tags)}
---

Write your note here...
`;

  // Ensure directory exists
  if (!existsSync(NOTES_DIR)) {
    mkdirSync(NOTES_DIR, { recursive: true });
  }

  // Write file
  const filePath = join(NOTES_DIR, filename);

  if (existsSync(filePath)) {
    console.log();
    console.log(color(`  File already exists: ${filePath}`, colors.red));
    rl.close();
    process.exit(1);
  }

  writeFileSync(filePath, content, 'utf-8');

  console.log();
  console.log(color('  Note created successfully!', colors.green));
  console.log();
  console.log(color('  File: ', colors.cyan) + filePath);
  if (tags.length > 0) {
    console.log(color('  Tags: ', colors.cyan) + tags.join(', '));
  }
  console.log();

  rl.close();

  // Open the file in micro editor
  spawn('micro', [filePath], { stdio: 'inherit' });
}

main().catch((err) => {
  console.error(color(`  Error: ${err.message}`, colors.red));
  process.exit(1);
});
