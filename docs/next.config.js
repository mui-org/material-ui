const webpack = require('webpack');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require('../package.json');
const { findPages } = require('./src/modules/utils/find');
const { LANGUAGES, LANGUAGES_SSR } = require('./src/modules/constants');

const workspaceRoot = path.join(__dirname, '../');

/**
 * https://github.com/zeit/next.js/blob/287961ed9142a53f8e9a23bafb2f31257339ea98/packages/next/next-server/server/config.ts#L10
 * @typedef {'legacy' | 'blocking' | 'concurrent'} ReactRenderMode
 * legacy - ReactDOM.render(<App />)
 * legacy-strict - ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, Element)
 * blocking - ReactDOM.createSyncRoot(Element).render(<App />)
 * concurrent - ReactDOM.createRoot(Element).render(<App />)
 * @type {ReactRenderMode | 'legacy-strict'}
 */
const reactMode = 'legacy';
// eslint-disable-next-line no-console
console.log(`Using React '${reactMode}' mode.`);

module.exports = {
  typescript: {
    // Motivated by https://github.com/zeit/next.js/issues/7687
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    const plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          COMMIT_REF: JSON.stringify(process.env.COMMIT_REF),
          ENABLE_AD: JSON.stringify(process.env.ENABLE_AD),
          GITHUB_AUTH: JSON.stringify(process.env.GITHUB_AUTH),
          LIB_VERSION: JSON.stringify(pkg.version),
          PULL_REQUEST: JSON.stringify(process.env.PULL_REQUEST === 'true'),
          REACT_MODE: JSON.stringify(reactMode),
        },
      }),
    ]);

    if (process.env.DOCS_STATS_ENABLED) {
      plugins.push(
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          generateStatsFile: true,
          // Will be available at `.next/stats.json`
          statsFilename: 'stats.json',
        }),
      );
    }

    config.resolve.alias['react-dom$'] = 'react-dom/profiling';
    config.resolve.alias['scheduler/tracing'] = 'scheduler/tracing-profiling';

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
          const hasDependencyOnRepoPackages = [
            'notistack',
            '@material-ui/pickers',
            '@material-ui/data-grid',
          ].includes(request);

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
            include: /node_modules(\/|\\)(notistack|@material-ui(\/|\\)(pickers|data-grid))/,
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
                        '@material-ui/core': '../packages/material-ui/src',
                        '@material-ui/utils': '../packages/material-ui-utils/src',
                        '@material-ui/styles': '../packages/material-ui-styles/src',
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
            test: /\.(js|mjs|jsx|ts)$/,
            include: [workspaceRoot],
            exclude: /node_modules/,
            use: options.defaultLoaders.babel,
          },
        ]),
      },
    };
  },
  exportTrailingSlash: true,
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
    if (process.env.PULL_REQUEST === 'true') {
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
  experimental: {
    async rewrites() {
      return [
        { source: `/:lang(${LANGUAGES.join('|')})?/:rest`, destination: '/:rest' },
        { source: '/api/:rest*', destination: '/api-docs/:rest*' },
      ];
    },
    reactMode: reactMode.startsWith('legacy') ? 'legacy' : reactMode,
  },
  reactStrictMode: reactMode === 'legacy-strict',
};
