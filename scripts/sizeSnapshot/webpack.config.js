const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const glob = require('fast-glob');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const workspaceRoot = path.join(__dirname, '..', '..');

async function getWebpackEntries() {
  const corePackagePath = path.join(workspaceRoot, 'packages/material-ui/build');
  const coreComponents = (await glob(path.join(corePackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));
      let entryName = componentName;
      // adjust for legacy names
      if (componentName === 'Paper') {
        entryName = '@material-ui/core/Paper.esm';
      } else if (componentName === 'TextareaAutosize') {
        entryName = '@material-ui/core/Textarea';
      } else if (['Popper'].indexOf(componentName) !== -1) {
        entryName = `@material-ui/core/${componentName}`;
      }

      return {
        name: entryName,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  const unstyledPackagePath = path.join(workspaceRoot, 'packages/material-ui-unstyled/build');
  const unstyledComponents = (await glob(path.join(unstyledPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        name: componentName,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  const labPackagePath = path.join(workspaceRoot, 'packages/material-ui-lab/build');
  const labComponents = (await glob(path.join(labPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        name: componentName,
        path: path.relative(workspaceRoot, path.dirname(componentPath)),
      };
    },
  );

  return [
    {
      name: '@material-ui/core',
      path: path.join(path.relative(workspaceRoot, corePackagePath), 'index.js'),
    },
    ...coreComponents,
    {
      name: '@material-ui/lab',
      path: path.join(path.relative(workspaceRoot, labPackagePath), 'index.js'),
    },
    ...labComponents,
    {
      name: '@material-ui/styles',
      path: 'packages/material-ui-styles/build/index.js',
    },
    {
      name: '@material-ui/private-theming',
      path: 'packages/material-ui-private-theming/build/index.js',
    },
    {
      name: '@material-ui/system',
      path: 'packages/material-ui-system/build/esm/index.js',
    },
    {
      name: 'createBox',
      path: 'packages/material-ui-system/build/esm/createBox.js',
    },
    {
      name: 'createStyled',
      path: 'packages/material-ui-system/build/esm/createStyled.js',
    },
    {
      name: '@material-ui/core/styles/createTheme',
      path: 'packages/material-ui/build/styles/createTheme.js',
    },
    {
      name: 'colorManipulator',
      path: 'packages/material-ui-system/build/colorManipulator.js',
    },
    {
      name: 'useAutocomplete',
      path: 'packages/material-ui-lab/build/useAutocomplete/index.js',
    },
    {
      name: '@material-ui/core/useMediaQuery',
      path: 'packages/material-ui/build/useMediaQuery/index.js',
    },
    {
      name: '@material-ui/core/useScrollTrigger',
      path: 'packages/material-ui/build/useScrollTrigger/index.js',
    },
    {
      name: '@material-ui/unstyled',
      path: path.join(path.relative(workspaceRoot, unstyledPackagePath), 'index.js'),
    },
    ...unstyledComponents,
    {
      name: '@material-ui/utils',
      path: 'packages/material-ui-utils/build/esm/index.js',
    },
    // TODO: Requires webpack v5
    // Resolution of webpack/acorn to 7.x is blocked by nextjs (https://github.com/vercel/next.js/issues/11947)
    // {
    //   name: '@material-ui/core.modern',
    //   webpack: true,
    //   path: path.join(path.relative(workspaceRoot, corePackagePath), 'modern/index.js'),
    // },
    {
      name: '@material-ui/core.legacy',
      path: path.join(path.relative(workspaceRoot, corePackagePath), 'legacy/index.js'),
    },
  ];
}

module.exports = async function webpackConfig(webpack, environment) {
  const analyzerMode = environment.analyze ? 'static' : 'disabled';
  const concatenateModules = !environment.accurateBundles;

  const entries = await getWebpackEntries();
  const configurations = entries.map((entry) => {
    return {
      // ideally this would be computed from the bundles peer dependencies
      externals: /^(react|react-dom|react\/jsx-runtime)$/,
      mode: 'production',
      optimization: {
        concatenateModules,
        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
          }),
        ],
      },
      output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
      },
      plugins: [
        new CompressionPlugin(),
        new BundleAnalyzerPlugin({
          analyzerMode,
          // We create a report for each bundle so around 120 reports.
          // Opening them all is spam.
          // If opened with `webpack --config . --analyze` it'll still open one new tab though.
          openAnalyzer: false,
          // '[name].html' not supported: https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/12
          reportFilename: `${entry.name}.html`,
        }),
      ],
      resolve: {
        alias: {
          '@material-ui/core': path.join(workspaceRoot, 'packages/material-ui/build'),
          '@material-ui/lab': path.join(workspaceRoot, 'packages/material-ui-lab/build'),
          '@material-ui/styled-engine': path.join(
            workspaceRoot,
            'packages/material-ui-styled-engine/build',
          ),
          '@material-ui/styled-engine-sc': path.join(
            workspaceRoot,
            'packages/material-ui-styles-sc/build',
          ),
          '@material-ui/styles': path.join(workspaceRoot, 'packages/material-ui-styles/build'),
          '@material-ui/system': path.join(workspaceRoot, 'packages/material-ui-system/build'),
          '@material-ui/private-theming': path.join(
            workspaceRoot,
            'packages/material-ui-private-theming/build',
          ),
          '@material-ui/utils': path.join(workspaceRoot, 'packages/material-ui-utils/build'),
          '@material-ui/unstyled': path.join(workspaceRoot, 'packages/material-ui-unstyled/build'),
        },
      },
      entry: { [entry.name]: path.join(workspaceRoot, entry.path) },
    };
  });

  return configurations;
};
