import { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['pages/_app.tsx', 'contentlayer.config.ts', 'next-sitemap.config.js'],
  ignoreDependencies: ['eslint', 'rehype', 'eslint-config-next', 'prettier'],
  project: ['**/*.{js,ts,tsx}'],
};

export default config;
