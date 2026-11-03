import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './styled-engine-provider';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('new style-engine-provider import', () => {
      it('import StyleEngineProvider after MuiThemeProvider', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/mui-theme-provider.actual.js'),
            path: require.resolve('./styled-engine-provider.test/mui-theme-provider.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/mui-theme-provider.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/mui-theme-provider.expected.js'),
            path: require.resolve('./styled-engine-provider.test/mui-theme-provider.expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/mui-theme-provider.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('import StyleEngineProvider after ThemeProvider', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/theme-provider.actual.js'),
            path: require.resolve('./styled-engine-provider.test/theme-provider.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/theme-provider.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
