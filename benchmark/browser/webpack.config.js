const path = require('path');

const workspaceRoot = path.resolve(__dirname, '../..');

// for babel.config.js
// webpack `mode: 'production'` does not affect NODE_ENV nor BABEL_ENV in babel-loader
process.env.NODE_ENV = 'production';

module.exports = {
  context: workspaceRoot,
  entry: 'benchmark/browser/index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          configFile: path.join(workspaceRoot, 'babel.config.js'),
          envName: 'benchmark',
        },
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
