import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const site = process.env.PUBLIC_SITE_URL ?? 'https://joaorpereira.dev';
const base = process.env.PUBLIC_BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  compressHTML: true,
});
