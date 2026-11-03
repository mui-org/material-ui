/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { describe, it, expect } from 'vitest';
import * as MaterialUI from './index';

// To skip them in the undefined exports test
// These are checked in the build process (scripts/build.mjs)
const versionExports = ['version', 'major', 'minor', 'patch', 'prerelease'];

describe('material-ui', () => {
  it('should have exports', () => {
    expect(typeof MaterialUI).to.equal('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(MaterialUI)
      .filter((exportKey) => !versionExports.includes(exportKey))
      .forEach((exportKey) => expect(Boolean(MaterialUI[exportKey])).to.equal(true));
  });

  it('should reexport certain members from @mui/base', () => {
    const expectedReexports = [
      'ClickAwayListener',
      'generateUtilityClass',
      'generateUtilityClasses',
      'NoSsr',
      'Portal',
      'TextareaAutosize',
      'unstable_composeClasses',
    ];

    const exportedNames = Object.keys(MaterialUI);

    expectedReexports.forEach((reexport) => expect(exportedNames).to.contain(reexport));
  });
});
