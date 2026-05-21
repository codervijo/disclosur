// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://disclosur.dev',
  integrations: [sitemap()],
  output: 'static',
});
