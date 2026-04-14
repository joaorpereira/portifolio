import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const githubRepository = process.env.GITHUB_REPOSITORY;
const [githubOwner, githubRepo] = githubRepository?.split('/') ?? [];
const derivedSite = githubOwner ? `https://${githubOwner}.github.io` : undefined;
const derivedBase =
  githubOwner && githubRepo && githubRepo !== `${githubOwner}.github.io` ? `/${githubRepo}` : '/';

const site = process.env.PUBLIC_SITE_URL ?? derivedSite;
const base = process.env.PUBLIC_BASE_PATH ?? derivedBase;

export default defineConfig({
  ...(site ? { site } : {}),
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
