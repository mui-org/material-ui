import { describe } from 'vitest';
import { describeJscodeshiftTransform } from '../../../testUtils';
import transform from './lab-removed-components';

describe('@mui/codemod', () => {
  describe('v7.0.0', () => {
    describeJscodeshiftTransform({
      transform,
      transformName: 'lab-removed-components',
      dirname: __dirname,
      testCases: [
        {
          actual: '/test-cases/component-file-actual.js',
          expected: '/test-cases/component-file-expected.js',
        },
        {
          actual: '/test-cases/barrel-file-actual.js',
          expected: '/test-cases/barrel-file-expected.js',
        },
        {
          actual: '/test-cases/existing-material-barrel-actual.js',
          expected: '/test-cases/existing-material-barrel-expected.js',
        },
        {
          actual: '/test-cases/specifiers-remaining-on-barrel-actual.js',
          expected: '/test-cases/specifiers-remaining-on-barrel-expected.js',
        },
        {
          actual: '/test-cases/untouched-lab-components-actual.js',
          expected: '/test-cases/untouched-lab-components-expected.js',
        },
      ],
    });
  });
});
