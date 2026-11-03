import { describe } from 'vitest';
import { describeJscodeshiftTransform } from '../../../testUtils';
import transform from './speed-dial-action-props';

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describeJscodeshiftTransform({
      transform,
      transformName: 'speed-dial-action-props',
      dirname: __dirname,
      testCases: [
        { actual: '/test-cases/actual.js', expected: '/test-cases/expected.js' },
        { actual: '/test-cases/theme.actual.js', expected: '/test-cases/theme.expected.js' },
        {
          actual: '/test-cases/package.actual.js',
          expected: '/test-cases/package.expected.js',
          options: { packageName: '@org/ui/material' },
        },
      ],
    });
  });
});
