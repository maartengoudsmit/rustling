import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  integrations: [
    mdx({
      remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: 'matter' }]],
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
