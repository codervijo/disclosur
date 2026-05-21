// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://disclosur.dev',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  output: 'static',
});
