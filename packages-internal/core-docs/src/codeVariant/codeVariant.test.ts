import { describe, it, expect } from 'vitest';
import { CODE_VARIANTS } from '../constants';
import { resolveInitialCodeVariant } from './codeVariant';

describe('resolveInitialCodeVariant', () => {
  it('prefers source hashes over the cookie', () => {
    expect(resolveInitialCodeVariant('#Demo.jsx', CODE_VARIANTS.TS)).to.equal(CODE_VARIANTS.JS);
    expect(resolveInitialCodeVariant('#Demo.ts', CODE_VARIANTS.JS)).to.equal(CODE_VARIANTS.TS);
  });

  it('uses a valid cookie without a source hash', () => {
    expect(resolveInitialCodeVariant('#demo', CODE_VARIANTS.JS)).to.equal(CODE_VARIANTS.JS);
  });

  it('defaults to TypeScript when neither hash nor cookie selects a language', () => {
    expect(resolveInitialCodeVariant('', undefined)).to.equal(CODE_VARIANTS.TS);
    expect(resolveInitialCodeVariant('', 'invalid')).to.equal(CODE_VARIANTS.TS);
  });
});
