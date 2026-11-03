import 'dotenv/config';
import { configDefaults, defineProject } from 'vitest/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { transformWithOxc } from 'vite';
import { playwright } from '@vitest/browser-playwright';
import type { BrowserInstanceOption } from 'vitest/node';

function forceJsxForJsFiles(): Plugin {
  return {
    name: 'force-jsx-loader-for-js',
    enforce: 'pre',
    async transform(code, id) {
      if (id.includes('/node_modules/')) {
        return null;
      }

      if (!id.endsWith('.js')) {
        return null;
      }

      const result = await transformWithOxc(code, id, {
        lang: 'jsx',
        jsx: {
          runtime: 'automatic',
        },
      });

      // @vitejs/plugin-react only adds the React import for .jsx files.
      if (!result.code.includes("from 'react'") && !result.code.includes('from "react"')) {
        result.code = `import * as React from 'react';\n${result.code}`;
      }

      return result;
    },
  };
}

function getVitestEnvironment(fileName: string): 'browser' | 'node' {
  const basename = path.basename(fileName);
  if (basename.includes('.browser.')) {
    return 'browser';
  }
  return 'node';
}

const MONOREPO_ROOT = path.resolve(import.meta.dirname, '.');

export const alias = {
  '@mui/internal-api-docs-builder': path.resolve(
    MONOREPO_ROOT,
    './packages-internal/api-docs-builder/src',
  ),
  '@mui/internal-core-docs': path.resolve(MONOREPO_ROOT, './packages-internal/core-docs/src'),
  '@mui/internal-scripts/typescript-to-proptypes': path.resolve(
    MONOREPO_ROOT,
    './packages-internal/scripts/typescript-to-proptypes/src',
  ),
  '@mui/internal-docs-utils': path.resolve(MONOREPO_ROOT, './packages-internal/docs-utils/src'),
  '@mui/icons-material': path.resolve(MONOREPO_ROOT, './packages/mui-icons-material/lib'),
  '@mui/lab': path.resolve(MONOREPO_ROOT, './packages/mui-lab/src'),
  '@mui/material-nextjs': path.resolve(MONOREPO_ROOT, './packages/mui-material-nextjs/src'),
  '@mui/material': path.resolve(MONOREPO_ROOT, './packages/mui-material/src'),
  '@mui/private-theming': path.resolve(MONOREPO_ROOT, './packages/mui-private-theming/src'),
  '@mui/styled-engine-sc': path.resolve(MONOREPO_ROOT, './packages/mui-styled-engine-sc/src'),
  '@mui/styled-engine': path.resolve(MONOREPO_ROOT, './packages/mui-styled-engine/src'),
  '@mui/styles': path.resolve(MONOREPO_ROOT, './packages/mui-styles/src'),
  '@mui/stylis-plugin-rtl': path.resolve(MONOREPO_ROOT, './packages/mui-stylis-plugin-rtl/src'),
  '@mui/system': path.resolve(MONOREPO_ROOT, './packages/mui-system/src'),
  '@mui/types': path.resolve(MONOREPO_ROOT, './packages/mui-types/src'),
  '@mui/utils': path.resolve(MONOREPO_ROOT, './packages/mui-utils/src'),
  docs: path.resolve(MONOREPO_ROOT, './docs'),
};

export interface CreateOptions {
  jsdom?: boolean;
  enableScrollbars?: boolean;
}

export default async function create(
  fileUrl: string,
  { jsdom = false, enableScrollbars = false }: CreateOptions = {},
) {
  const file = fileURLToPath(fileUrl);
  const testEnv = getVitestEnvironment(file);
  const pkgJson = path.resolve(file, '../package.json');
  const pkg = await fs.readFile(pkgJson, 'utf8').then((content) => JSON.parse(content));

  const packageName =
    pkg.name ?? path.relative(MONOREPO_ROOT, path.dirname(pkgJson)).split(path.sep).join('/');
  const name = `${testEnv}:${packageName}`;

  const ignore = await fs.readFile(path.resolve(MONOREPO_ROOT, './.gitignore'), 'utf8');
  const excludes = ignore
    .trim()
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((line) => (line.startsWith('/') ? line.slice(1) : line));

  return defineProject({
    plugins: [react(), forceJsxForJsFiles()],
    define: {
      'process.env.NODE_ENV': JSON.stringify('development'),
    },
    test: {
      name,
      exclude: ['**/node_modules/**', '**/build/**', '**/*.spec.*', '**/.next/**', ...excludes],
      disableConsoleIntercept: true,
      setupFiles: [
        // Must load before `react-dom`, which `setupVitest.ts` pulls in.
        path.resolve(MONOREPO_ROOT, './test/setupAnimationEvent.ts'),
        path.resolve(MONOREPO_ROOT, './test/setupVitest.ts'),
      ],
      server: {
        deps: {
          inline: ['@mui/internal-test-utils'],
        },
      },
      environment: jsdom ? 'jsdom' : 'node',

      fakeTimers: {
        // We use performance.now in the codebase
        toFake: [...(configDefaults.fakeTimers.toFake ?? []), 'performance'],
      },
      browser: {
        enabled: testEnv === 'browser',
        provider: playwright({
          launchOptions: {
            ignoreDefaultArgs: [...(enableScrollbars ? ['--hide-scrollbars'] : [])],
          },
        }),
        headless: true,
        viewport: {
          width: 1024,
          height: 896,
        },
        instances: (process.env.VITEST_BROWSERS || 'chromium')
          .split(',')
          .map((browser) => ({ browser }) as BrowserInstanceOption),
        screenshotFailures: false,
      },
      env: {
        VITEST: 'true',
        NODE_ENV: 'development',
      },
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
      alias,
    },
    optimizeDeps: {
      include: ['@mui/internal-test-utils/setupVitest'],
      rolldownOptions: {
        plugins: [
          {
            name: 'js-as-jsx',
            load: {
              filter: { id: /\.js$/ },
              async handler(id) {
                if (id.includes('/node_modules/')) {
                  return null;
                }

                return {
                  code: await fs.readFile(id, 'utf8'),
                  moduleType: 'jsx',
                };
              },
            },
          },
        ],
      },
    },
  });
}
