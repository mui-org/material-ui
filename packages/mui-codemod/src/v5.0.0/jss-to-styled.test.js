import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './jss-to-styled';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('jss-to-styled', () => {
      it('falls back to the filename for naming', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/Anonymous.actual.js'),
            path: require.resolve('./jss-to-styled.test/Anonymous.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/Anonymous.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      describe('first', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/first.actual.js'),
              path: require.resolve('./jss-to-styled.test/first.actual.js'),
            },
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
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
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/seventh.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('with createStyles', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/withCreateStyles.actual.tsx'),
              path: require.resolve('./jss-to-styled.test/withCreateStyles.actual.tsx'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/withCreateStyles.expected.tsx');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/withCreateStyles.expected.tsx'),
              path: require.resolve('./jss-to-styled.test/withCreateStyles.expected.tsx'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/withCreateStyles.expected.tsx');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });
    });

    describe('with createStyles on withStyles', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles1.actual.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles1.actual.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles1.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles1.expected.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles1.expected.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles1.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('with createStyles on withStyles directly', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles2.actual.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles2.actual.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles2.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles2.expected.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles2.expected.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles2.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('with createStyles directly', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles3.actual.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles3.actual.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles3.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles3.expected.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles3.expected.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles3.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('transforms React.Fragment', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/eighth.actual.js'),
            path: require.resolve('./jss-to-styled.test/eighth.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/eighth.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/eighth.expected.js'),
            path: require.resolve('./jss-to-styled.test/eighth.expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/eighth.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('transforms Fragment', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/nineth.actual.js'),
            path: require.resolve('./jss-to-styled.test/nineth.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/nineth.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/nineth.expected.js'),
            path: require.resolve('./jss-to-styled.test/nineth.expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/nineth.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('transforms <>', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/tenth.actual.js'),
            path: require.resolve('./jss-to-styled.test/tenth.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/tenth.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/tenth.expected.js'),
            path: require.resolve('./jss-to-styled.test/tenth.expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/tenth.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('transforms SomeNamespace.SomeComponent', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/eleventh.actual.js'),
            path: require.resolve('./jss-to-styled.test/eleventh.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/eleventh.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/eleventh.expected.js'),
            path: require.resolve('./jss-to-styled.test/eleventh.expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/eleventh.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('does not transform React.Suspense', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/twelfth.actual.js'),
            path: require.resolve('./jss-to-styled.test/twelfth.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/twelfth.actual.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/twelfth.actual.js'),
            path: require.resolve('./jss-to-styled.test/twelfth.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/twelfth.actual.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('bugs - #28317 export function declaration', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/exportFunction.actual.js'),
            path: require.resolve('./jss-to-styled.test/exportFunction.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/exportFunction.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/exportFunction.expected.js'),
            path: require.resolve('./jss-to-styled.test/exportFunction.expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/exportFunction.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('bugs - #28317 export class declaration', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/exportClass.actual.js'),
            path: require.resolve('./jss-to-styled.test/exportClass.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/exportClass.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/exportClass.expected.js'),
            path: require.resolve('./jss-to-styled.test/exportClass.expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/exportClass.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('bugs - #29363 multiple makeStyles with the same classKeys', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/multipleWithStyles.actual.js'),
            path: require.resolve('./jss-to-styled.test/multipleWithStyles.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/multipleWithStyles.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/multipleWithStyles.expected.js'),
            path: require.resolve('./jss-to-styled.test/multipleWithStyles.expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/multipleWithStyles.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
