import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './tree-view-moved-to-x';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('tree-view-moved-to-x', () => {
      it('transforms exports as needed (lab sub module)', () => {
        const actual = transform(
          {
            source: read('./tree-view-moved-to-x.test/actual-sub-module.js'),
            path: require.resolve('./tree-view-moved-to-x.test/actual-sub-module.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./tree-view-moved-to-x.test/expected-sub-module.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent (lab sub module)', () => {
        const actual = transform(
          {
            source: read('./tree-view-moved-to-x.test/expected-sub-module.js'),
            path: require.resolve('./tree-view-moved-to-x.test/expected-sub-module.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./tree-view-moved-to-x.test/expected-sub-module.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms exports as needed (lab root)', () => {
        const actual = transform(
          {
            source: read('./tree-view-moved-to-x.test/actual-root.js'),
            path: require.resolve('./tree-view-moved-to-x.test/actual-root.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./tree-view-moved-to-x.test/expected-root.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent (lab root)', () => {
        const actual = transform(
          {
            source: read('./tree-view-moved-to-x.test/expected-root.js'),
            path: require.resolve('./tree-view-moved-to-x.test/expected-root.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./tree-view-moved-to-x.test/expected-root.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
