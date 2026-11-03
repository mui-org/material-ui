import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './date-pickers-moved-to-x';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('date-pickers-moved-to-x', () => {
      it('transforms exports as needed (lab sub module)', () => {
        const actual = transform(
          {
            source: read('./date-pickers-moved-to-x.test/actual-sub-module.js'),
            path: require.resolve('./date-pickers-moved-to-x.test/actual-sub-module.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./date-pickers-moved-to-x.test/expected-sub-module.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent (lab sub module)', () => {
        const actual = transform(
          {
            source: read('./date-pickers-moved-to-x.test/expected-sub-module.js'),
            path: require.resolve('./date-pickers-moved-to-x.test/expected-sub-module.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./date-pickers-moved-to-x.test/expected-sub-module.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms exports as needed (lab root with only community exports)', () => {
        const actual = transform(
          {
            source: read('./date-pickers-moved-to-x.test/actual-root-community.js'),
            path: require.resolve('./date-pickers-moved-to-x.test/actual-root-community.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./date-pickers-moved-to-x.test/expected-root-community.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent (lab root with only community exports)', () => {
        const actual = transform(
          {
            source: read('./date-pickers-moved-to-x.test/expected-root-community.js'),
            path: require.resolve('./date-pickers-moved-to-x.test/expected-root-community.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./date-pickers-moved-to-x.test/expected-root-community.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms exports as needed (lab root with pro exports)', () => {
        const actual = transform(
          {
            source: read('./date-pickers-moved-to-x.test/actual-root-pro.js'),
            path: require.resolve('./date-pickers-moved-to-x.test/actual-root-pro.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./date-pickers-moved-to-x.test/expected-root-pro.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent (lab root with pro exports)', () => {
        const actual = transform(
          {
            source: read('./date-pickers-moved-to-x.test/expected-root-pro.js'),
            path: require.resolve('./date-pickers-moved-to-x.test/expected-root-pro.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./date-pickers-moved-to-x.test/expected-root-pro.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
