import {
  createBaseConfig,
  createTestConfig,
  baseSpecRules,
  createDocsConfig,
  EXTENSION_TS,
  EXTENSION_TEST_FILE,
  EXTENSION_DTS,
} from '@mui/internal-code-infra/eslint';
import { fixupPluginRules } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import eslintPluginConsistentName from 'eslint-plugin-consistent-default-export-name';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { lintJavascriptDemoFocus } from '@mui/internal-docs-infra/pipeline/lintJavascriptDemoFocus';
import remarkConfig from './.remarkrc.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const OneLevelImportMessage = [
  'Prefer one level nested imports to avoid bundling everything in dev mode or breaking CJS/ESM split.',
  'See https://github.com/mui/material-ui/pull/24147 for the kind of win it can unlock.',
].join('\n');
// This only applies to packages published from this monorepo.
// If you build a library around `@mui/material` you can safely use `createStyles` without running into the same issue as we are.
const forbidCreateStylesMessage =
  'Use `MuiStyles<ClassKey, Props>` instead if the styles are exported. Otherwise use `as const` assertions. ' +
  '`createStyles` will lead to inlined, at-compile-time-resolved type-imports. ' +
  'See https://github.com/microsoft/TypeScript/issues/36097#issuecomment-578324386 for more information';

const ENABLE_REACT_COMPILER_PLUGIN = false;

const NO_RESTRICTED_IMPORTS_PATHS_TOP_LEVEL_PACKAGES = [
  {
    name: '@mui/material',
    message: OneLevelImportMessage,
  },
  {
    name: '@mui/lab',
    message: OneLevelImportMessage,
  },
];

const NO_RESTRICTED_IMPORTS_PATHS_CHAI = [
  {
    name: 'chai',
    message:
      "Use the global `expect` from Vitest instead. It's the same chai instance, extended with our custom matchers.",
  },
];

const NO_RESTRICTED_IMPORTS_PATTERNS_DEEPLY_NESTED = [
  {
    group: [
      '@mui/*/*/*',
      '@pigment-css/*/*/*',
      // Allow any import depth with any internal packages
      '!@mui/internal-*/**',
      '!@mui/internal-core-docs/**',
    ],
    message: OneLevelImportMessage,
  },
];

export default defineConfig(
  createBaseConfig({
    enableReactCompiler: ENABLE_REACT_COMPILER_PLUGIN,
    baseDirectory: dirname,
    materialUi: true,
    consistentTypeImports: true,
  }),
  // eslint-plugin-mdx loads `.remarkrc.mjs` itself, but ESLint doesn't know
  // that file is a config dependency, so `--cache` doesn't invalidate when
  // it changes. Embedding the imported value in a setting puts its content
  // into the resolved-config hash, forcing cache invalidation on edits.
  { settings: { remarkConfig } },
  {
    name: 'Material UI overrides',
    files: [`**/*${EXTENSION_TS}`],
    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json'],
        },
      },
      next: {
        rootDir: 'docs',
      },
    },
    rules: {
      'import/prefer-default-export': 'error',
      'mui/straight-quotes': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: NO_RESTRICTED_IMPORTS_PATHS_CHAI,
          patterns: NO_RESTRICTED_IMPORTS_PATTERNS_DEEPLY_NESTED,
        },
      ],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'react/sort-prop-types': 'off', // 228
      '@typescript-eslint/no-require-imports': 'off', // 133
      'react/jsx-filename-extension': 'off',
      // Modern browsers imply rel="noopener" for target="_blank", so no rel is required.
      // See https://github.com/mui/material-ui/pull/40447
      // TODO move to mui/mui-public.
      'react/jsx-no-target-blank': 'off',

      // TODO enable:
      'react-hooks/refs': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/purity': 'off',
    },
  },
  ...['mui-material', 'mui-system', 'mui-utils', 'mui-lab', 'mui-utils', 'mui-styled-engine'].map(
    (packageName) => ({
      files: [`packages/${packageName}/src/**/*${EXTENSION_TEST_FILE}`],
      ignores: ['**/*.test.*', '**/*.spec.*'],
      rules: {
        'mui/no-restricted-resolved-imports': [
          'error',
          [
            {
              pattern: `**/packages/${packageName}/src/index.*`,
              message:
                "Don't import from the package index. Import the specific module directly instead.",
            },
          ],
        ],
      },
    }),
  ),
  {
    files: [
      `packages-internal/**/*${EXTENSION_TS}`,
      `packages-internal/api-docs-builder/**/*${EXTENSION_TS}`,
      `packages-internal/api-docs-builder-core/**/*${EXTENSION_TS}`,
    ],
    rules: {
      // Only applies to our public packages
      'compat/compat': 'off',
    },
  },
  {
    files: [`packages/**/*${EXTENSION_TS}`],
    rules: {
      // Our packages write .js + .d.ts files manually.
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
    },
  },
  // Test start
  {
    files: [`**/*${EXTENSION_TEST_FILE}`],
    extends: createTestConfig(),
    rules: {
      'mui/material-ui-no-empty-box': 'off',
      // Disabled temporarily. Enable one by one.
      'testing-library/no-container': 'off',
      // TODO: investigate and fix
      'vitest/expect-expect': 'off',
      // Surfaced by dropping the `chai` import in favor of the Vitest global `expect`.
      // The remaining reports are deliberate environment branches (`isJsdom()`, feature
      // flags, optional fixtures) rather than assertions hidden in a `catch`.
      // TODO: investigate and fix
      'vitest/no-conditional-expect': 'off',
    },
  },
  // Test end
  // Docs start
  {
    files: [`docs/**/*${EXTENSION_TS}`],
    extends: createDocsConfig(),
    rules: {
      '@next/next/no-img-element': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            ...NO_RESTRICTED_IMPORTS_PATHS_TOP_LEVEL_PACKAGES,
            ...NO_RESTRICTED_IMPORTS_PATHS_CHAI,
          ],
          patterns: NO_RESTRICTED_IMPORTS_PATTERNS_DEEPLY_NESTED,
        },
      ],
    },
  },
  {
    files: ['docs/data/**/demos/**/*.tsx', 'docs/data/**/demos/**/*.jsx'],
    plugins: {
      'docs-infra': { rules: { 'require-demo-focus': lintJavascriptDemoFocus } },
    },
    rules: {
      'docs-infra/require-demo-focus': ['error', { wrapReturn: true }],
    },
  },
  // Moved from docs/data/material/components/.eslintrc.js
  {
    files: [`docs/data/material/components/**/*${EXTENSION_TS}`],
    rules: {
      // useful for interactions feedback
      'no-console': ['off', { allow: ['info'] }],
      // not very friendly to prop forwarding
      'react/jsx-handler-names': 'off',
    },
  },
  // demos
  {
    files: [`docs/src/pages/**/*${EXTENSION_TS}`, `docs/data/**/*${EXTENSION_TS}`],
    rules: {
      // This most often reports data that is defined after the component definition.
      // This is safe to do and helps readability of the demo code since the data is mostly irrelevant.
      '@typescript-eslint/no-use-before-define': 'off',
      'react/prop-types': 'off',
      'no-alert': 'off',
      'no-console': 'off',
    },
  },
  // Next.js entry points pages
  {
    files: [`docs/pages/**/*${EXTENSION_TS}`, `packages/*/src/**/*.tsx`],
    ignores: ['**/*.spec.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    files: [`docs/data/**/*${EXTENSION_TS}`],
    ignores: [
      // filenames/match-exported sees filename as 'file-name.d'
      // Plugin looks unmaintain, find alternative? (e.g. eslint-plugin-project-structure)
      '**/*.d.ts',
      'docs/data/**/{css,system,tailwind}/*',
    ],
    plugins: {
      'consistent-default-export-name': fixupPluginRules(eslintPluginConsistentName),
    },
    rules: {
      'consistent-default-export-name/default-export-match-filename': ['error'],
    },
  },
  {
    // Auto-generated by `pnpm docs:validate`; the file is always named
    // `client.ts` but exports `ClientProvider`.
    files: ['docs/data/**/demos/*/client.ts'],
    rules: {
      'consistent-default-export-name/default-export-match-filename': 'off',
    },
  },
  // Docs end
  {
    files: [`test/**/*${EXTENSION_TS}`, `docs/**/*${EXTENSION_TS}`],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: [`**/*${EXTENSION_DTS}`],
    rules: {
      'import/export': 'off', // Not sure why it doesn't work
    },
  },
  {
    files: [`packages/*/src/**/*${EXTENSION_TS}`, `packages/*/src/**/*${EXTENSION_DTS}`],
    ignores: [
      '**/*.spec.*',
      '**/*.test.*',
      // used internally, not used on app router yet
      '**/mui-internal-core-docs/**/*',
    ],
    rules: {
      'mui/add-undef-to-optional': 'error',
    },
  },
  {
    files: [`packages/*/src/**/*${EXTENSION_TS}`],
    ignores: [
      '**/*.spec.*',
      '**/*.test.*',
      // used internally, not used on app router yet
      '**/mui-internal-core-docs/**/*',
    ],
    rules: {
      'mui/disallow-react-api-in-server-components': 'error',
    },
  },
  {
    files: [`packages/*/src/**/*${EXTENSION_TS}`],
    ignores: ['**/*.spec.*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            ...NO_RESTRICTED_IMPORTS_PATHS_TOP_LEVEL_PACKAGES,
            ...NO_RESTRICTED_IMPORTS_PATHS_CHAI,
            {
              name: '@mui/utils',
              message: OneLevelImportMessage,
            },
            {
              name: '@mui/material/styles',
              importNames: ['createStyles'],
              message: forbidCreateStylesMessage,
            },
          ],
        },
      ],
    },
  },
  baseSpecRules,
  {
    files: ['packages-internal/scripts/typescript-to-proptypes/src/**/*.ts'],
    rules: {
      // Working with flags is common in TypeScript compiler
      'no-bitwise': 'off',
    },
  },
  {
    files: [`packages/*/src/**/*${EXTENSION_TS}`],
    ignores: ['**/*.spec.*', '**/*.test.*', '**/mui-lab/**'],
    rules: {
      'mui/require-dev-wrapper': [
        'error',
        {
          functionNames: ['warnOnce', 'warn', 'checkSlot', 'isLayoutSupported'],
        },
      ],
    },
  },
  {
    files: [`packages/*/src/**/*${EXTENSION_TS}`],
    ignores: ['**/*.d.ts', '**/*.spec.*'],
    rules: {
      'mui/material-ui-name-matches-component-name': 'error',
    },
  },
  {
    files: ['test/bundling/scripts/**/*.js'],
    rules: {
      // ES modules need extensions
      'import/extensions': ['error', 'ignorePackages'],
    },
  },
  // Migrated config from packages/mui-icons-material/.eslintrc.js
  {
    files: [`packages/mui-icons-material/custom/**/*${EXTENSION_TS}`],
    rules: {
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
    },
  },
  // Migrated config from packages-internal/api-docs-builder/.eslintrc.js
  {
    files: [
      `packages-internal/api-docs-builder/**/*${EXTENSION_TS}`,
      // Allow named exports for locales and mui-internal-core-docs: https://github.com/mui/material-ui/pull/46933
      `packages/mui-material/src/locale/*${EXTENSION_TS}`,
      `packages-internal/core-docs/src/**/*${EXTENSION_TS}`,
    ],
    rules: {
      'import/prefer-default-export': 'off',
    },
  },
  // Migrated config from packages-internal/api-docs-builder-core/.eslintrc.js
  {
    files: [`packages-internal/api-docs-builder-core/**/*${EXTENSION_TS}`],
    rules: {
      'import/no-default-export': 'error',
      'import/prefer-default-export': 'off',
    },
  },
  {
    files: [`examples/**/*${EXTENSION_TS}`],
    rules: {
      'import/no-relative-packages': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'import/prefer-default-export': 'off',
    },
  },
  {
    files: [`examples/**/*${EXTENSION_TS}`],
    rules: {
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['docs/src/pages/premium-themes/onepirate/modules/form/RFTextField.js'],
    rules: {
      // Preserve the file's import ordering and any inline eslint-disable comments
      // that older tooling used to reshape.
      'import/order': 'off',
    },
  },
  {
    files: [`test/**/*${EXTENSION_TS}`],
    rules: {
      'guard-for-in': 'off',
      'testing-library/prefer-screen-queries': 'off', // Enable usage of playwright queries
      'testing-library/no-await-sync-queries': 'off',
      'testing-library/render-result-naming-convention': 'off', // inconsequential in regression tests
    },
  },
  {
    // `test/e2e` uses Playwright's `expect` (for matchers like `toBeFocused()`),
    // not Vitest's, so this rule reports false positives here.
    files: [`test/e2e/**/*${EXTENSION_TS}`],
    rules: {
      'vitest/prefer-importing-vitest-globals': 'off',
    },
  },
  {
    // Typed deprecation linting exhausts the CI heap on the docs project.
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
    rules: {
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
);
