import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './jss-to-styled';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('jss-to-styled', () => {
      describe('first', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/first.actual.js'),
              path: require.resolve('./jss-to-styled.test/first.actual.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/first.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/first.expected.js'),
              path: require.resolve('./jss-to-styled.test/first.expected.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/first.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('second', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/second.actual.js'),
              path: require.resolve('./jss-to-styled.test/second.actual.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/second.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/second.expected.js'),
              path: require.resolve('./jss-to-styled.test/second.expected.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/second.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('third', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/third.actual.js'),
              path: require.resolve('./jss-to-styled.test/third.actual.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/third.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/third.expected.js'),
              path: require.resolve('./jss-to-styled.test/third.expected.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/third.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('fourth', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/fourth.actual.js'),
              path: require.resolve('./jss-to-styled.test/fourth.actual.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/fourth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/fourth.expected.js'),
              path: require.resolve('./jss-to-styled.test/fourth.expected.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/fourth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('fifth', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/fifth.actual.js'),
              path: require.resolve('./jss-to-styled.test/fifth.actual.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/fifth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/fifth.expected.js'),
              path: require.resolve('./jss-to-styled.test/fifth.expected.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/fifth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('sixth', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/sixth.actual.js'),
              path: require.resolve('./jss-to-styled.test/sixth.actual.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/sixth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/sixth.expected.js'),
              path: require.resolve('./jss-to-styled.test/sixth.expected.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/sixth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('seventh', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/seventh.actual.js'),
              path: require.resolve('./jss-to-styled.test/seventh.actual.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/seventh.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/seventh.expected.js'),
              path: require.resolve('./jss-to-styled.test/seventh.expected.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/seventh.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });
    });
  });
});
