import { describe, it, expect } from 'vitest';
import path from 'path';
import { jscodeshift } from '../../../testUtils';
import transform from './removeSystemProps';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v9.0.0 - removeSystemProps', () => {
    it('transforms props as needed', () => {
      const actual = transform(
        { source: read('./test-cases/system-props.actual.js') },
        { jscodeshift },
        {},
      );

      const expected = read('./test-cases/system-props.expected.js');
      expect(actual).to.equal(expected, 'The transformed version should be correct');
    });

    it('should be idempotent', () => {
      const actual = transform(
        { source: read('./test-cases/system-props.expected.js') },
        { jscodeshift },
        {},
      );

      const expected = read('./test-cases/system-props.expected.js');
      expect(actual).to.equal(expected, 'The transformed version should be correct');
    });

    it('transforms props for custom packageName', () => {
      const actual = transform(
        { source: read('./test-cases/system-props-package-name.actual.js') },
        { jscodeshift },
        { packageName: '@acme/ui' },
      );

      const expected = read('./test-cases/system-props-package-name.expected.js');
      expect(actual).to.equal(expected, 'The transformed version should be correct');
    });

    it('transforms props for jsx option (auto-imported components)', () => {
      const actual = transform(
        { source: read('./test-cases/system-props-jsx.actual.js') },
        { jscodeshift },
        { jsx: 'Box,Typography,Stack,Link' },
      );

      const expected = read('./test-cases/system-props-jsx.expected.js');
      expect(actual).to.equal(expected, 'The transformed version should be correct');
    });

    it('accepts arbitrary component names in jsx option', () => {
      const actual = transform(
        { source: read('./test-cases/system-props-jsx-custom.actual.js') },
        { jscodeshift },
        { jsx: 'DialogTitle,Skeleton,SvgIcon' },
      );

      const expected = read('./test-cases/system-props-jsx-custom.expected.js');
      expect(actual).to.equal(expected, 'The transformed version should be correct');
    });

    it('does not transform similarly named packages', () => {
      const actual = transform(
        { source: read('./test-cases/system-props-package-name-similar.actual.js') },
        { jscodeshift },
        { packageName: '@acme/ui' },
      );

      const expected = read('./test-cases/system-props-package-name-similar.expected.js');
      expect(actual).to.equal(expected, 'The transformed version should be correct');
    });
  });
});
