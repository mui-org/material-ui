/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { describe, it, expect } from 'vitest';
import * as MaterialUI from './index';

describe('@mui/lab', () => {
  it('should have exports', () => {
    expect(typeof MaterialUI).to.equal('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(MaterialUI).forEach((exportKey) =>
      expect(Boolean(MaterialUI[exportKey]), `${exportKey} is not truthy`).to.equal(true),
    );
  });
});
