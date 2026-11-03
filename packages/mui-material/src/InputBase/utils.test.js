import { describe, it, expect } from 'vitest';
import { hasValue, isFilled } from './utils';

describe('Input/utils.js', () => {
  describe('hasValue', () => {
    ['', 0].forEach((value) => {
      it(`is true for ${value}`, () => {
        expect(hasValue(value)).to.equal(true);
      });
    });

    [null, undefined].forEach((value) => {
      it(`is false for ${value}`, () => {
        expect(hasValue(value)).to.equal(false);
      });
    });
  });

  describe('isFilled', () => {
    [' ', 0].forEach((value) => {
      it(`is true for value ${value}`, () => {
        expect(isFilled({ value })).to.equal(true);
      });

      it(`is true for SSR defaultValue ${value}`, () => {
        expect(isFilled({ defaultValue: value }, true)).to.equal(true);
      });
    });
    [null, undefined, ''].forEach((value) => {
      it(`is false for value ${value}`, () => {
        expect(isFilled({ value })).to.equal(false);
      });

      it(`is false for SSR defaultValue ${value}`, () => {
        expect(isFilled({ defaultValue: value }, true)).to.equal(false);
      });
    });
  });
});
