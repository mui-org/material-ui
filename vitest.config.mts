import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import * as path from 'path';

const MONOREPO_ROOT = path.resolve(import.meta.dirname, '.');

const BROWSER_TESTS = ['{docs,packages{-internal,}/*}/vitest.config.browser.mts'];
const NODE_TESTS = [
  '{docs,packages{-internal,}/*}/vitest.config.mts',
  {
    test: {
      name: 'node:module-augmentation',
      include: ['test/moduleAugmentation/*.test.ts'],
    },
  },
];

function getProjects() {
  if (process.env.TEST_SCOPE === 'browser') {
    return BROWSER_TESTS;
  }
  if (process.env.TEST_SCOPE === 'node') {
    return NODE_TESTS;
  }
  return [...BROWSER_TESTS, ...NODE_TESTS];
}

/**
 * See https://vitest.dev/guide/workspace.html
 * > The root configuration will only influence global options such as reporters and coverage.
 */
export default defineConfig({
  test: {
    projects: getProjects(),
    sequence: {
      hooks: 'list',
    },
    coverage: {
      provider: 'v8',
      reporter: process.env.CI ? ['lcovonly'] : ['text'],
      reportsDirectory: path.resolve(MONOREPO_ROOT, 'coverage'),
      include: ['packages/*/src/**/*.{mts,ts,tsx,mjs,js,jsx}'],
      exclude: [
        '**/*.d.ts',
        '**/__fixtures__/**',
        'packages/mui-icons-material/src/**',
        'packages/mui-codemod/src/**/{test-cases,*.test}/**',
        '**/{postcss,vitest}.config.*',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
