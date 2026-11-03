import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { alias } from '../../vitest.shared.mts';
import { INDEX_NAME } from './docsearchFixtureData';

const stubsDir = resolve(fileURLToPath(new URL('.', import.meta.url)), 'stubs');

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      // Necessary as we opted to write our jsx in js files
      name: 'treat-js-files-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (/\/node_modules\//.test(id)) {
          return null;
        }
        if (!/.*\.js$/.test(id)) {
          return null;
        }
        if (id.startsWith('\0')) {
          return null;
        }
        // Use the transform exposed by Vite instead of invoking Oxc directly.
        return transformWithOxc(code, id, {
          lang: 'tsx',
          jsx: {
            runtime: 'automatic',
          },
        });
      },
    },
    react(),
    tailwindcss(),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    // `AppSearch` reads it for the Algolia index name, which also keys the
    // stored recent searches `index.test.js` seeds for the `AppSearch` fixtures.
    'process.env.SEARCH_INDEX': JSON.stringify(INDEX_NAME),
    // Seed `@mui/x-data-grid-generator`'s Chance instances deterministically so
    // the Data Grid composites (XHero/XGridFullDemo/XDataGrid/XTheming via
    // `useDemoData`) render identical rows on every load. Without this the
    // generated data is random per page visit and churns the Argos baseline.
    // Mirrors mui-x's regression bundle, which replaces the same token.
    __DISABLE_CHANCE_RANDOM__: 'true',
  },
  resolve: {
    alias: [
      // The existing `alias` from vitest.shared.mts is an object map; spread
      // it as { find, replacement } entries so the next/* regex aliases below
      // coexist with it.
      ...Object.entries(alias).map(([find, replacement]) => ({ find, replacement })),
      // Stub `next/*` modules so docs composites under `docs/src/components/`
      // that transitively import `next/router` (via `@mui/internal-core-docs/Link`)
      // render outside the Next.js docs host. See `stubs/next-router.ts` for
      // the rationale.
      { find: /^next\/router$/, replacement: `${stubsDir}/next-router.ts` },
      { find: /^next\/link$/, replacement: `${stubsDir}/next-link.tsx` },
      { find: /^next\/head$/, replacement: `${stubsDir}/next-head.tsx` },
    ],
  },
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: {
        '.js': 'tsx',
      },
    },
  },
});
