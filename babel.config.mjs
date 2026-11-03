// @ts-check
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import getBaseConfig from '@mui/internal-code-infra/babel-config';

/**
 * @typedef {import('@babel/core')} babel
 */

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const errorCodesPath = path.resolve(dirname, './docs/public/static/error-codes.json');

/**
 * @param {string} relativeToBabelConf
 * @returns {string}
 */
function resolveAliasPath(relativeToBabelConf) {
  const resolvedPath = path.relative(process.cwd(), path.resolve(dirname, relativeToBabelConf));
  return `./${resolvedPath.replace('\\', '/')}`;
}

/** @type {babel.ConfigFunction} */
export default function getBabelConfig(api) {
  const baseConfig = getBaseConfig(api);

  // Covers: docs prod build (NODE_ENV=production), package esm build (BABEL_ENV=stable),
  // package cjs build (BABEL_ENV=node). Excludes docs dev, tests, coverage.
  const isProductionBuild = api.env(['production', 'stable', 'node']);

  const defaultAlias = {
    '@mui/material': resolveAliasPath('./packages/mui-material/src'),
    '@mui/internal-core-docs': resolveAliasPath('./packages-internal/core-docs/src'),
    '@mui/icons-material': resolveAliasPath(`./packages/mui-icons-material/lib`),
    '@mui/lab': resolveAliasPath('./packages/mui-lab/src'),
    '@mui/internal-markdown/prism': resolveAliasPath('./packages-internal/markdown/prism.mjs'),
    '@mui/internal-markdown': resolveAliasPath('./packages-internal/markdown'),
    '@mui/styled-engine': resolveAliasPath('./packages/mui-styled-engine/src'),
    '@mui/styled-engine-sc': resolveAliasPath('./packages/mui-styled-engine-sc/src'),
    '@mui/system': resolveAliasPath('./packages/mui-system/src'),
    '@mui/private-theming': resolveAliasPath('./packages/mui-private-theming/src'),
    '@mui/utils': resolveAliasPath('./packages/mui-utils/src'),
    '@mui/internal-docs-utils': resolveAliasPath('./packages-internal/docs-utils/src'),
    docs: resolveAliasPath('./docs'),
    test: resolveAliasPath('./test'),
  };

  /** @type {babel.PluginItem[]} */
  const prodOnlyPlugins = [
    [
      '@mui/internal-babel-plugin-minify-errors',
      {
        missingError: 'annotate',
        errorCodesPath,
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
        outExtension: process.env.MUI_OUT_FILE_EXTENSION ?? undefined,
      },
    ],
  ];

  const excludedBasePlugins = new Set([
    '@mui/internal-babel-plugin-display-name',
    // Inlining MUI_VERSION, etc only matters for shipped bundles.
    // Dev reads process.env at runtime without needing substitution.
    ...(isProductionBuild ? [] : ['babel-plugin-transform-inline-environment-variables']),
  ]);

  const basePlugins = (baseConfig.plugins || []).filter(
    (/** @type {[unknown, unknown, string]} */ [, , pluginName]) =>
      !excludedBasePlugins.has(pluginName),
  );

  if (isProductionBuild) {
    basePlugins.push(...prodOnlyPlugins);
  }

  return {
    ...baseConfig,
    plugins: basePlugins,
    // `@babel/plugin-transform-react-constant-elements` hoists static JSX — prod-only optimization.
    overrides: [
      ...(baseConfig.overrides ?? []),
      ...(isProductionBuild
        ? [
            {
              exclude: /\.test\.(m?js|ts|tsx)$/,
              plugins: ['@babel/plugin-transform-react-constant-elements'],
            },
          ]
        : []),
    ],
    env: {
      development: {
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              alias: {
                ...defaultAlias,
                modules: './modules',
              },
              root: ['./'],
            },
          ],
        ],
      },
    },
  };
}
