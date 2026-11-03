import { describe } from 'vitest';
import { describeJscodeshiftTransform } from '../../../testUtils';
import transform from './card-header-props';

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describeJscodeshiftTransform({
      transform,
      transformName: 'tooltip-props',
      dirname: __dirname,
      testCases: [
        { actual: '/test-cases/actual.js', expected: '/test-cases/expected.js' },
        {
          actual: '/test-cases/package.actual.js',
          expected: '/test-cases/package.expected.js',
          options: { packageName: '@org/ui/material' },
        },
      ],
    });
  });
});
