import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './path-imports';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('path-imports', () => {
      it('convert path as needed', () => {
        const actual = transform(
          {
            source: read('./path-imports.test/actual.js'),
            path: require.resolve('./path-imports.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./path-imports.test/expected.js');
        expect(actual?.trim()).to.equal(
          expected?.trim(),
          'The transformed version should be correct',
        );
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./path-imports.test/expected.js'),
            path: require.resolve('./path-imports.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./path-imports.test/expected.js');
        expect(actual?.trim()).to.equal(
          expected?.trim(),
          'The transformed version should be correct',
        );
      });

      it('should not leak imports between file transformations', () => {
        transform(
          {
            source: read('./path-imports.test/actual.js'),
            path: require.resolve('./path-imports.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const source = "import { createContext } from 'react';\n";
        const actual = transform({ source, path: 'other.js' }, { jscodeshift }, {});

        expect(actual).to.equal(source);
      });
    });
  });
});
