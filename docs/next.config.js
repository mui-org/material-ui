const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require('../package.json');
const { findPages } = require('./src/modules/utils/find');
const { LANGUAGES, LANGUAGES_SSR } = require('./src/modules/constants');

const workspaceRoot = path.join(__dirname, '../');

const reactStrictMode = false;
if (reactStrictMode) {
  // eslint-disable-next-line no-console
  console.log(`Using React.StrictMode.`);
}
const l10nPRInNetlify = /^l10n_/.test(process.env.HEAD) && process.env.NETLIFY === 'true';
const vercelDeploy = Boolean(process.env.VERCEL);

const staging =
  process.env.REPOSITORY_URL === undefined ||
  /mui-org\/material-ui$/.test(process.env.REPOSITORY_URL);
if (staging) {
  // eslint-disable-next-line no-console
  console.log(`Staging deploy of ${process.env.REPOSITORY_URL || 'local repository'}`);
}

module.exports = {
  eslint: {
    // TODO: https://github.com/mui-org/material-ui/issues/25966
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Motivated by https://github.com/zeit/next.js/issues/7687
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  webpack5: false,
  webpack: (config, options) => {
    const plugins = config.plugins.slice();

    if (process.env.DOCS_STATS_ENABLED) {
      plugins.push(
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          generateStatsFile: true,
          analyzerPort: options.isServer ? 8888 : 8889,
          // Will be available at `.next/stats.json`
          statsFilename: 'stats.json',
        }),
      );
    }

    // next includes node_modules in webpack externals. Some of those have dependencies
    // on the aliases defined above. If a module is an external those aliases won't be used.
    // We need tell webpack to not consider those packages as externals.
    if (options.isServer) {
      const [nextExternals, ...externals] = config.externals;

      if (externals.length > 0) {
        // currently not the case but other next plugins might introduce additional
        // rules for externals. We would need to handle those in the callback
        throw new Error('There are other externals in the webpack config.');
      }

      config.externals = [
        (context, request, callback) => {
          const hasDependencyOnRepoPackages = ['notistack', '@material-ui/data-grid'].includes(
            request,
          );

          if (hasDependencyOnRepoPackages) {
            return callback(null);
          }
          return nextExternals(context, request, callback);
        },
      ];
    }

    return {
      ...config,
      plugins,
      resolve: {
        ...config.resolve,
        // resolve .tsx first
        extensions: [
          '.tsx',
          ...config.resolve.extensions.filter((extension) => extension !== '.tsx'),
        ],
      },
      node: {
        fs: 'empty',
      },
      module: {
        ...config.module,
        rules: config.module.rules.concat([
          // used in some /getting-started/templates
          {
            test: /\.md$/,
            loader: 'raw-loader',
          },
          // transpile 3rd party packages with dependencies in this repository
          {
            test: /\.(js|mjs|jsx)$/,
            include: /node_modules(\/|\\)(notistack|@material-ui(\/|\\)data-grid)/,
            use: {
              loader: 'babel-loader',
              options: {
                // on the server we use the transpiled commonJS build, on client ES6 modules
                // babel needs to figure out in what context to parse the file
                sourceType: 'unambiguous',
                plugins: [
                  [
                    'babel-plugin-module-resolver',
                    {
                      alias: {
                        // all packages in this monorepo
                        '@material-ui/core': '../packages/material-ui/src',
                        '@material-ui/docs': '../packages/material-ui-docs/src',
                        '@material-ui/icons': '../packages/material-ui-icons/lib',
                        '@material-ui/lab': '../packages/material-ui-lab/src',
                        '@material-ui/styled-engine': '../packages/material-ui-styled-engine/src',
                        '@material-ui/styled-engine-sc':
                          '../packages/material-ui-styled-engine-sc/src',
                        '@material-ui/styles': '../packages/material-ui-styles/src',
                        '@material-ui/system': '../packages/material-ui-system/src',
                        '@material-ui/private-theming':
                          '../packages/material-ui-private-theming/src',
                        '@material-ui/utils': '../packages/material-ui-utils/src',
                        '@material-ui/unstyled': '../packages/material-ui-unstyled/src',
                      },
                      transformFunctions: ['require'],
                    },
                  ],
                ],
              },
            },
          },
          // required to transpile ../packages/
          {
            test: /\.(js|mjs|tsx|ts)$/,
            include: [workspaceRoot],
            exclude: /(node_modules|material-ui-icons)/,
            use: options.defaultLoaders.babel,
          },
        ]),
      },
    };
  },
  trailingSlash: true,
  env: {
    COMMIT_REF: process.env.COMMIT_REF,
    ENABLE_AD: process.env.ENABLE_AD,
    GITHUB_AUTH: process.env.GITHUB_AUTH,
    GIT_REVIEW_ID: process.env.REVIEW_ID,
    LIB_VERSION: pkg.version,
    NETLIFY_DEPLOY_URL: process.env.DEPLOY_URL || 'http://localhost:3000',
    NETLIFY_SITE_NAME: process.env.SITE_NAME || 'material-ui',
    PULL_REQUEST: process.env.PULL_REQUEST === 'true',
    REACT_STRICT_MODE: reactStrictMode,
    FEEDBACK_URL: process.env.FEEDBACK_URL,
    // #default-branch-switch
    SOURCE_CODE_ROOT_URL: 'https://github.com/mui-org/material-ui/blob/next',
    SOURCE_CODE_REPO: 'https://github.com/mui-org/material-ui',
    STAGING: staging,
  },
  // Next.js provides a `defaultPathMap` argument, we could simplify the logic.
  // However, we don't in order to prevent any regression in the `findPages()` method.
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    function traverse(pages2, userLanguage) {
      const prefix = userLanguage === 'en' ? '' : `/${userLanguage}`;

      pages2.forEach((page) => {
        if (!page.children) {
          map[`${prefix}${page.pathname.replace(/^\/api-docs\/(.*)/, '/api/$1')}`] = {
            page: page.pathname,
            query: {
              userLanguage,
            },
          };
          return;
        }

        traverse(page.children, userLanguage);
      });
    }

    // We want to speed-up the build of pull requests.
    // For crowdin PRs we want to build all locales for testing.
    if (process.env.PULL_REQUEST === 'true' && !l10nPRInNetlify && !vercelDeploy) {
      // eslint-disable-next-line no-console
      console.log('Considering only English for SSR');
      traverse(pages, 'en');
    } else {
      // eslint-disable-next-line no-console
      console.log('Considering various locales for SSR');
      LANGUAGES_SSR.forEach((userLanguage) => {
        traverse(pages, userLanguage);
      });
    }

    return map;
  },
  reactStrictMode,
  async rewrites() {
    return [{ source: `/:lang(${LANGUAGES.join('|')})?/:rest*`, destination: '/:rest*' }];
  },
};
