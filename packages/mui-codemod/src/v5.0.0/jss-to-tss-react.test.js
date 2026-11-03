import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshiftWithDefaultParser from 'jscodeshift';
import transform from './jss-to-tss-react';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}
const jscodeshift = jscodeshiftWithDefaultParser.withParser('tsx');

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('jss-to-tss-react', () => {
      it('transforms @material-ui/core/styles makeStyles to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-from-material-ui-core-styles.js'),
            path: require.resolve('./jss-to-tss-react.test/actual-from-material-ui-core-styles.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-from-material-ui-core-styles.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/expected-from-material-ui-core-styles.js'),
            path: require.resolve('./jss-to-tss-react.test/expected-from-material-ui-core-styles.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-from-material-ui-core-styles.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms @material-ui/core makeStyles to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-from-material-ui-core.js'),
            path: require.resolve('./jss-to-tss-react.test/actual-from-material-ui-core.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-from-material-ui-core.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('adds todo comments for scenarios that are not supported', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-todo-comments.js'),
            path: require.resolve('./jss-to-tss-react.test/actual-todo-comments.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-todo-comments.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms makeStyles with style rules returned by function to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-mixins-pattern.js'),
            path: require.resolve('./jss-to-tss-react.test/actual-mixins-pattern.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-mixins-pattern.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms @mui/styles makeStyles to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-from-mui-styles.js'),
            path: require.resolve('./jss-to-tss-react.test/actual-from-mui-styles.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-from-mui-styles.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms @mui/styles/makeStyles to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-from-mui-styles-makeStyles.js'),
            path: require.resolve('./jss-to-tss-react.test/actual-from-mui-styles-makeStyles.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-from-mui-styles-makeStyles.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms typescript makeStyles with nested selectors to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-typescript.tsx'),
            path: require.resolve('./jss-to-tss-react.test/actual-typescript.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-typescript.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms typescript makeStyles example in docs to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-typescript-docs-example.tsx'),
            path: require.resolve('./jss-to-tss-react.test/actual-typescript-docs-example.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-typescript-docs-example.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms typescript makeStyles advanced example in docs with params to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-typescript-docs-example-params.tsx'),
            path: require.resolve('./jss-to-tss-react.test/actual-typescript-docs-example-params.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read(
          './jss-to-tss-react.test/expected-typescript-docs-example-params.tsx',
        );
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms withStyles to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-withStyles.js'),
            path: require.resolve('./jss-to-tss-react.test/actual-withStyles.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-withStyles.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
