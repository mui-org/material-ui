import { describe, it, expect } from 'vitest';
import isValueSelected from './isValueSelected';

describe('<ToggleButton /> isValueSelected', () => {
  it('is false when value is undefined', () => {
    expect(isValueSelected(undefined, [undefined])).to.equal(false);
  });

  it('is false when candidate is undefined', () => {
    expect(isValueSelected('example', undefined)).to.equal(false);
  });

  describe('non exclusive', () => {
    it('is true if candidate is contained in value', () => {
      expect(isValueSelected('one', ['one'])).to.equal(true);
    });

    it('is false if value is not contained in candidate', () => {
      expect(isValueSelected('one', ['two'])).to.equal(false);
    });

    it('is false if value is loosely contained in candidate', () => {
      expect(isValueSelected('3', [3])).to.equal(false);
    });
  });

  describe('exclusive', () => {
    it('is true if candidate strictly equals value', () => {
      expect(isValueSelected('one', 'one')).to.equal(true);
    });

    it('is false if candidate does not equal value', () => {
      expect(isValueSelected('two', 'one')).to.equal(false);
    });

    it('is false if candidate loosely equals value', () => {
      expect(isValueSelected('3', 3)).to.equal(false);
    });
  });
});
