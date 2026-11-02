import { readFileSync } from 'fs';
import { parseSync } from '@babel/core';
import traverse from '@babel/traverse';
import memoize from './memoize';

const getJSExports = memoize((file) => {
  const result = new Set();

  const ast = parseSync(readFileSync(file, 'utf8'), {
    filename: file,
    // The app's Babel config can target another Babel major, and these files do not need it.
    configFile: false,
    babelrc: false,
  });

  traverse(ast, {
    ExportSpecifier: ({ node: { exported } }) => {
      result.add(exported.name);
    },
  });

  return result;
});

export default getJSExports;
