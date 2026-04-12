import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://joaorpereira.dev',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  redirects: {
    '/experience': '/resume',
    '/skills': '/resume',
    '/education': '/resume',
    '/about': '/resume',
  },
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
