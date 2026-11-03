import { describe, it, expect } from 'vitest';
import path from 'path';
import postcss from 'postcss';
import { jscodeshift } from '../../../testUtils';
import jsTransform from './step-connector-classes';
import { plugin as postcssPlugin } from './postcss-plugin';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

const postcssProcessor = postcss([postcssPlugin]);

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('step-connector-classes', () => {
      describe('js-transform', () => {
        it('transforms props as needed', () => {
          const actual = jsTransform(
            { source: read('./test-cases/actual.js') },
            { jscodeshift },
            { printOptions: { quote: 'double', trailingComma: true } },
          );

          const expected = read('./test-cases/expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = jsTransform(
            { source: read('./test-cases/expected.js') },
            { jscodeshift },
            {},
          );

          const expected = read('./test-cases/expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('[package] js-transform', () => {
        it('transforms props as needed', () => {
          const actual = jsTransform(
            { source: read('./test-cases/package.actual.js') },
            { jscodeshift },
            {
              printOptions: { quote: 'double', trailingComma: true },
              packageName: '@org/ui/material',
            },
          );

          const expected = read('./test-cases/package.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = jsTransform(
            { source: read('./test-cases/package.expected.js') },
            { jscodeshift },
            { packageName: '@org/ui/material' },
          );

          const expected = read('./test-cases/package.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('css-transform', () => {
        it('transforms classes as needed', async () => {
          const actual = await postcssProcessor.process(read('./test-cases/actual.css'), {
            from: undefined,
          });

          const expected = read('./test-cases/expected.css');
          expect(actual.css).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', async () => {
          const actual = await postcssProcessor.process(read('./test-cases/expected.css'), {
            from: undefined,
          });

          const expected = read('./test-cases/expected.css');
          expect(actual.css).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('test-cases', () => {
        it('should not be the same', () => {
          const actualJS = read('./test-cases/actual.js');
          const expectedJS = read('./test-cases/expected.js');
          expect(actualJS).not.to.equal(expectedJS, 'The actual and expected should be different');

          const actualCSS = read('./test-cases/actual.css');
          const expectedCSS = read('./test-cases/expected.css');
          expect(actualCSS).not.to.equal(
            expectedCSS,
            'The actual and expected should be different',
          );
        });
      });
    });
  });
});
