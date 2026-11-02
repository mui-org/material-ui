// @ts-check
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import * as semver from 'semver';
import { createRequire } from 'module';
import type { NextConfig } from 'next';
import { withDeploymentConfig } from '@mui/internal-docs-infra/withDocsInfra';
import { findPages } from './src/modules/utils/find';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);

// Longest focus region rendered as a collapsed snippet. Matches the 16-line
// `maxLines` of the legacy `babel-plugin-jsx-preview`; a longer region is hidden
// (`oversizedFocus: 'hide'`) rather than truncated.
const DEMO_FOCUS_MAX_LINES = 16;

const workspaceRoot = path.join(currentDirectory, '../');

const pkgContent = fs.readFileSync(path.resolve(workspaceRoot, 'package.json'), 'utf8');
const pkg = JSON.parse(pkgContent);

// Shared alias list, paths relative to the workspace root. For turbopack, prefixed
// with `../` (relative to `docs/`), and for webpack, resolved absolute.
const aliasEntries: ReadonlyArray<readonly [string, string]> = [
  ['@mui/material', 'packages/mui-material/src'],
  ['@mui/material/package.json', 'packages/mui-material/package.json'],
  ['@mui/internal-core-docs', 'packages-internal/core-docs/src'],
  ['@mui/styled-engine', 'packages/mui-styled-engine/src'],
  ['@mui/system', 'packages/mui-system/src'],
  ['@mui/system/package.json', 'packages/mui-system/package.json'],
  ['@mui/private-theming', 'packages/mui-private-theming/src'],
  ['@mui/utils', 'packages/mui-utils/src'],
  ['@mui/material-nextjs', 'packages/mui-material-nextjs/src'],
];

const turbopackResolveAlias: Record<string, string> = {
  ...Object.fromEntries(aliasEntries.map(([name, rel]) => [name, `../${rel}`])),
  // Bare `@mui/icons-material` → ESM index for namespace interop; deep imports
  // (`@mui/icons-material/Add`) fall through to the installed package.
  '@mui/icons-material': '../packages/mui-icons-material/lib/index.mjs',
  // Mirrors the `docs` alias from babel.config.mjs / babel-plugin-module-resolver.
  docs: '.',
};

const markdownLoaderBase = {
  workspaceRoot,
  languagesInProgress: [],
  packages: [
    {
      productId: 'material-ui',
      paths: [
        path.join(workspaceRoot, 'packages/mui-lab/src'),
        path.join(workspaceRoot, 'packages/mui-material/src'),
      ],
    },
  ],
  env: {
    SOURCE_CODE_REPO: 'https://github.com/mui/material-ui',
    LIB_VERSION: pkg.version,
  },
};

export default withDeploymentConfig({
  experimental: {
    // The TS7 side-by-side alias (@typescript/typescript6) ships no `tsc` bin,
    // which the Next.js >= 16.3 setup check requires even with
    // `typescript.ignoreBuildErrors` set. Use the TS6 JS API instead.
    useTypeScriptCli: false,
  },
  turbopack: {
    resolveAlias: turbopackResolveAlias,
    resolveExtensions: ['.mjs', '.tsx', '.ts', '.jsx', '.js', '.json'],
    rules: {
      // Turbopack requires serializable loader options, so `ignoreLanguagePages`
      // (a function) is omitted. Safe while docs is English-only in SSR.
      '*.md': [
        // `.md?muiMarkdown` → markdown loader (mirrors the webpack `oneOf` first branch).
        {
          condition: { query: /[?&]muiMarkdown(?=&|$)/ },
          loaders: [{ loader: '@mui/internal-markdown/loader', options: markdownLoaderBase }],
          as: '*.js',
        },
        // Non-muiMarkdown `.md` (e.g. `import terms from './terms.md'`) → raw source.
        // `{ not: 'foreign' }` keeps raw-loader away from node_modules / Next.js internals.
        {
          condition: {
            all: [{ not: 'foreign' }, { not: { query: /[?&]muiMarkdown(?=&|$)/ } }],
          },
          loaders: ['raw-loader'],
          as: '*.js',
        },
      ],
      // Demo `index.ts` factories → precomputed highlighter. Mirrors the
      // webpack `demos/*/index.ts` rule below; turbopack requires serializable
      // loader options, which these are (no functions).
      './**/demos/*/index.ts': {
        loaders: [
          {
            loader: '@mui/internal-docs-infra/pipeline/loadPrecomputedCodeHighlighter',
            options: {
              deferPrecompute: true,
              emphasisOptions: {
                emitFrameIndent: true,
                focusFramesMaxSize: DEMO_FOCUS_MAX_LINES,
                oversizedFocus: 'hide',
              },
              requireClient: '@mui/internal-core-docs/utils/createDemoClient',
              transformTypescriptToJavascript: true,
            },
          },
        ],
      },
      // Demo `client.ts` bundles → precomputed client highlighter. Mirrors the
      // webpack `demos/*/client.ts` rule below.
      './**/demos/*/client.ts': {
        loaders: ['@mui/internal-docs-infra/pipeline/loadPrecomputedCodeHighlighterClient'],
      },
      // API page description JSON (imported only by generated API pages) → render
      // the markdown to HTML at build time.
      '**/translations/api-docs/**/*.json': [
        {
          loaders: [{ loader: '@mui/internal-markdown/apiPageTranslationLoader' }],
          as: '*.js',
        },
      ],
    },
  },
  webpack: (
    config: Parameters<NonNullable<NextConfig['webpack']>>[0],
    options: Parameters<NonNullable<NextConfig['webpack']>>[1],
  ) => {
    // If a module is an webpack "external" the webpack aliases configured are not used.
    // Next.js includes node_modules in webpack externals, some of those have dependencies
    // on the aliases we defined above.
    // So we need tell webpack to not consider those packages as externals.
    if (
      options.isServer &&
      // Next.js executes this twice on the server with React 18 (once per runtime).
      // We only care about Node runtime at this point.
      (options.nextRuntime === undefined || options.nextRuntime === 'nodejs')
    ) {
      const externals = config.externals.slice(0, -1);
      const nextExternals = config.externals.at(-1);

      config.externals = [
        // @ts-expect-error: The webpack externals hook does not infer the callback parameter types.
        (ctx, callback) => {
          const { request } = ctx;
          const hasDependencyOnRepoPackages = [
            'material-ui-popup-state',
            // Assume any X dependencies depend on a package defined in this repository.
            '@mui/x-',
            '@toolpad/core',
          ].some((dep) => request.startsWith(dep));

          if (hasDependencyOnRepoPackages) {
            return callback(null);
          }
          return nextExternals(ctx, callback);
        },
        ...externals,
      ];
    }

    // @ts-expect-error: Next webpack configuration leaves module rules untyped.
    config.module.rules.forEach((rule) => {
      rule.resourceQuery = { not: [/raw/] };
    });

    // Webpack alias matching is order-sensitive (first match wins for prefix
    // aliases), so list more specific paths (`@mui/material/package.json`)
    // before broader ones (`@mui/material`). We sort by key length desc to
    // guarantee this regardless of how `aliasEntries` is declared.
    const sharedWebpackAliases = [...aliasEntries]
      .sort(([a], [b]) => b.length - a.length)
      .map(([name, rel]) => [name, path.resolve(workspaceRoot, rel)] as const);

    const webpackAliases: Record<string, string> = {
      ...Object.fromEntries(sharedWebpackAliases),
      '@mui/icons-material$': path.resolve(
        workspaceRoot,
        'packages/mui-icons-material/lib/index.mjs',
      ),
      '@mui/icons-material': path.resolve(workspaceRoot, 'packages/mui-icons-material/lib'),
    };

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...webpackAliases,
        },
        extensions: [
          '.mjs',
          '.tsx',
          ...config.resolve.extensions.filter(
            (extension: string) => extension !== '.tsx' && extension !== '.mjs',
          ),
        ],
      },
      module: {
        ...config.module,
        rules: config.module.rules.concat([
          {
            test: /\.md$/,
            oneOf: [
              {
                resourceQuery: /muiMarkdown/,
                use: [
                  options.defaultLoaders.babel,
                  {
                    loader: require.resolve('@mui/internal-markdown/loader'),
                    options: {
                      ...markdownLoaderBase,
                      // Function form is allowed under webpack; turbopack
                      // requires serialisable options so it's omitted there.
                      ignoreLanguagePages: () => false,
                      env: {
                        SOURCE_CODE_REPO: options.config.env.SOURCE_CODE_REPO,
                        LIB_VERSION: options.config.env.LIB_VERSION,
                      },
                    },
                  },
                ],
              },
              {
                // used in some /getting-started/templates
                type: 'asset/source',
              },
            ],
          },
          {
            test: /[/\\]demos[/\\][^/\\]+[/\\]index\.ts$/,
            use: [
              options.defaultLoaders.babel,
              {
                loader: '@mui/internal-docs-infra/pipeline/loadPrecomputedCodeHighlighter',
                options: {
                  deferPrecompute: true,
                  // The CSS in DemoContent.tsx uses `data-frame-indent` to
                  // shift highlighted/focus frames left when collapsed.
                  emphasisOptions: {
                    emitFrameIndent: true,
                    focusFramesMaxSize: DEMO_FOCUS_MAX_LINES,
                    oversizedFocus: 'hide',
                  },
                  requireClient: '@mui/internal-core-docs/utils/createDemoClient',
                  transformTypescriptToJavascript: true,
                },
              },
            ],
          },
          {
            test: /[/\\]demos[/\\][^/\\]+[/\\]client\.ts$/,
            use: [
              options.defaultLoaders.babel,
              '@mui/internal-docs-infra/pipeline/loadPrecomputedCodeHighlighterClient',
            ],
          },
          {
            // API page description JSON (`translations/api-docs/**`, imported only by
            // generated API pages) → render the markdown to HTML at build time.
            test: /translations[\\/]api-docs[\\/].*\.json$/,
            type: 'javascript/auto',
            use: [{ loader: require.resolve('@mui/internal-markdown/apiPageTranslationLoader') }],
          },
          // required to transpile ../packages/
          {
            test: /\.(js|mjs|tsx|ts)$/,
            resourceQuery: { not: [/raw/] },
            // Narrow the scope to fixed directories
            include: [
              path.join(workspaceRoot, 'docs'),
              path.join(workspaceRoot, 'packages'),
              path.join(workspaceRoot, 'packages-internal'),
            ],
            exclude: /(node_modules|mui-icons-material)/,
            use: options.defaultLoaders.babel,
          },
          {
            resourceQuery: /raw/,
            type: 'asset/source',
          },
        ]),
      },
    };
  },
  env: {
    // docs-infra
    LIB_VERSION: pkg.version,
    SEARCH_INDEX: `material-ui-v${semver.major(pkg.version)}`,
    SOURCE_CODE_REPO: 'https://github.com/mui/material-ui',
    SOURCE_GITHUB_BRANCH: 'master', // #target-branch-reference
    GITHUB_TEMPLATE_DOCS_FEEDBACK: '4.docs-feedback.yml',
    // Selects the analytics target (Google Analytics + Apollo). Provided per
    // deployment via the environment; production analytics requires
    // `ANALYTICS_ENV=production` to be set explicitly.
    ANALYTICS_ENV: process.env.ANALYTICS_ENV,
    // Legacy Netlify-prefixed env vars still read by the fork (e.g. pages/_app.tsx).
    // withDeploymentConfig exposes the same values under the SITE_NAME / SITE_DEPLOY_URL names.
    NETLIFY_SITE_NAME: process.env.SITE_NAME,
    NETLIFY_DEPLOY_URL: process.env.DEPLOY_URL,
    // MUI Core related
    GITHUB_AUTH: process.env.GITHUB_AUTH,
    MUI_CHAT_API_BASE_URL: 'https://chat-backend.mui.com',
    MUI_CHAT_SCOPES: 'material-ui', // Use comma separated list of `productId` (see `_app.js`) to enable MUI Chat on demos
  },
  // Ensure CSS from the Data Grid packages is included in the build:
  // https://github.com/mui/mui-x/issues/17427#issuecomment-2813967605
  // `@mui/x-*` entries: keep their `@mui/material/*` subpath imports
  // inside the bundler so the source aliases above win; otherwise resolution
  // falls back to the pnpm symlink (→ `packages/mui-material/build/`), which
  // is empty unless the package has been built.
  transpilePackages: [
    '@mui/x-charts',
    '@mui/x-data-grid',
    '@mui/x-data-grid-pro',
    '@mui/x-data-grid-premium',
    '@mui/x-tree-view',
    '@mui/x-date-pickers',
    '@mui/x-date-pickers-pro',
    '@mui/x-data-grid-generator',
  ],
  distDir: 'export',
  // Next.js provides a `defaultPathMap` argument, we could simplify the logic.
  // However, we don't in order to prevent any regression in the `findPages()` method.
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    // @ts-expect-error: This recursive page-map helper has no parameter type annotation.
    function traverse(pages2) {
      // @ts-expect-error: The untyped page-map input does not infer the page callback parameter.
      pages2.forEach((page) => {
        // The experiments pages are only meant for experiments, they shouldn't leak to production.
        if (
          (page.pathname.startsWith('/experiments/') || page.pathname === '/experiments') &&
          process.env.DEPLOY_ENV === 'production'
        ) {
          return;
        }
        // getStaticPaths provides the concrete URLs for this dynamic page.
        if (page.pathname === '/careers/roles/[slug]') {
          return;
        }
        if (!page.children) {
          // map api-docs to api
          // i: /api-docs/* > /api/* (old structure)
          // ii: /*/api-docs/* > /*/api/* (for new structure)
          // @ts-expect-error: The inferred empty map has no string index signature.
          map[page.pathname.replace(/^(\/[^/]+)?\/api-docs\/(.*)/, '$1/api/$2')] = {
            page: page.pathname,
          };
          return;
        }

        traverse(page.children);
      });
    }

    traverse(pages);

    return map;
  },
  // Used to signal we run pnpm build
  ...(process.env.NODE_ENV === 'production'
    ? {
        output: 'export',
      }
    : {
        // rewrites has no effect when run `next export` for production
        rewrites: async () => {
          return [
            // Make sure to include the trailing slash if `trailingSlash` option is set
            { source: '/api/:rest*/', destination: '/api-docs/:rest*/' },
            { source: `/static/x/:rest*`, destination: 'http://0.0.0.0:3001/static/x/:rest*' },
          ];
        },
        redirects: async () => {
          return [
            {
              source: '/base-ui/',
              destination: 'https://base-ui.com',
              permanent: true,
            },
          ];
        },
      }),
} satisfies NextConfig);
