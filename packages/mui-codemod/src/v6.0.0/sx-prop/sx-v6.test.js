import { describe, it, expect } from 'vitest';
import path from 'path';
import { jscodeshift } from '../../../testUtils';
import transform from './sx-v6';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v6.0.0', () => {
    describe('basic sx-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/basic-sx.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/basic-sx.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/basic-sx.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/basic-sx.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('css vars sx-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/sx-css-vars.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-css-vars.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/sx-css-vars.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-css-vars.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('dynamic spread sx-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/sx-dynamic.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-dynamic.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/sx-dynamic.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-dynamic.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('dynamic conditional sx-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/sx-dynamic2.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-dynamic2.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/sx-dynamic2.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-dynamic2.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('should not delete line breaks', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/sx-line-break.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-line-break.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/sx-line-break.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-line-break.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('conditional sx-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/sx-condition.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-condition.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/sx-condition.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-condition.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('applyStyles sx-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/sx-applyStyles.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-applyStyles.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/sx-applyStyles.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-applyStyles.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('inheritance sx-v6', () => {
      it('should do nothing', () => {
        const actual = transform(
          { source: read('./test-cases/sx-inheritance.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-inheritance.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/sx-inheritance.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/sx-inheritance.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
