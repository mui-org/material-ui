import { expect } from 'chai';
import isFieldFilled from './isFieldFilled';

describe('isFilled', () => {
  [' ', 'a', 0].forEach((value) => {
    it(`is true for value ${value}`, () => {
      expect(isFieldFilled({ value })).to.equal(true);
    });

    it(`is true for SSR defaultValue ${value}`, () => {
      expect(isFieldFilled({ defaultValue: value }, true)).to.equal(true);
    });
  });
  [null, undefined, ''].forEach((value) => {
    it(`is false for value ${value}`, () => {
      expect(isFieldFilled({ value })).to.equal(false);
    });

    it(`is false for SSR defaultValue ${value}`, () => {
      expect(isFieldFilled({ defaultValue: value }, true)).to.equal(false);
    });
  });
});
