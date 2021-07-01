const bpmr = require('babel-plugin-module-resolver');
const fse = require('fs-extra');
const path = require('path');

const errorCodesPath = path.resolve(__dirname, './public/static/error-codes.json');

function resolvePath(sourcePath, currentFile, opts) {
  if (sourcePath === 'markdown') {
    const base = currentFile.substring(__dirname.length).slice(0, -3);
    return `${__dirname}/docs/src/${base}/`;
  }

  return bpmr.resolvePath(sourcePath, currentFile, opts);
}

const alias = {
  '@material-ui/core': '../packages/material-ui/src',
  '@material-ui/docs': '../packages/material-ui-docs/src',
  '@material-ui/icons': '../packages/material-ui-icons/lib',
  '@material-ui/lab': '../packages/material-ui-lab/src',
  '@material-ui/styles': '../packages/material-ui-styles/src',
  '@material-ui/styled-engine-sc': '../packages/material-ui-styled-engine-sc/src',
  // Swap the comments on the next two lines for using the styled-components as style engine
  '@material-ui/styled-engine': '../packages/material-ui-styled-engine/src',
  // '@material-ui/styled-engine': '../packages/material-ui-styled-engine-sc/src',
  '@material-ui/system': '../packages/material-ui-system/src',
  '@material-ui/private-theming': '../packages/material-ui-private-theming/src',
  '@material-ui/utils': '../packages/material-ui-utils/src',
  '@material-ui/unstyled': '../packages/material-ui-unstyled/src',
  docs: './',
  modules: '../modules',
  pages: './pages',
};

const { version: transformRuntimeVersion } = fse.readJSONSync(
  require.resolve('@babel/runtime-corejs2/package.json'),
);

module.exports = {
  // TODO: Enable once nextjs uses babel 7.13
  // assumptions: {
  //   noDocumentAll: true,
  // },
  presets: [
    // backport of https://github.com/zeit/next.js/pull/9511
    [
      'next/babel',
      {
        'preset-react': { runtime: 'automatic' },
        'transform-runtime': { corejs: 2, version: transformRuntimeVersion },
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-macros',
      {
        muiError: {
          errorCodesPath,
        },
      },
    ],
    'babel-plugin-optimize-clsx',
    // for IE11 support
    '@babel/plugin-transform-object-assign',
    [
      'babel-plugin-module-resolver',
      {
        alias,
        transformFunctions: ['require', 'require.context'],
        resolvePath,
      },
    ],
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
        ['babel-plugin-transform-react-remove-prop-types', { mode: 'remove' }],
      ],
    },
  },
};
