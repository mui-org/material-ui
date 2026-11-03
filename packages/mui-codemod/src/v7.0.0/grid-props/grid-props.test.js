import { describe } from 'vitest';
import { describeJscodeshiftTransform } from '../../../testUtils';
import transform from './grid-props';

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describeJscodeshiftTransform({
      transform,
      transformName: 'grid-props',
      dirname: __dirname,
      testCases: [
        {
          actual: '/test-cases/actual.js',
          expected: '/test-cases/expected.js',
        },
        {
          actual: '/test-cases/custom-breakpoints.actual.js',
          expected: '/test-cases/custom-breakpoints.expected.js',
          options: { muiBreakpoints: 'customXs,customSm,customMd' },
        },
        {
          actual: '/test-cases/package.actual.js',
          expected: '/test-cases/package.expected.js',
          options: { packageName: '@org/ui/material' },
        },
      ],
    });
  });
});
