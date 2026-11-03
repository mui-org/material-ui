import { describe, it, expect } from 'vitest';
import buildFormatNumber from './buildFormatNumber';

describe('buildFormatNumber', () => {
  it('formats numbers using the given locale', () => {
    const format = buildFormatNumber('en-US');
    expect(format(1000)).to.equal('1,000');
    expect(format(1234567)).to.equal('1,234,567');
  });

  it('formats numbers with locale-specific separators', () => {
    const format = buildFormatNumber('de-DE');
    expect(format(1000)).to.equal('1.000');
  });

  it('returns string for non-finite values', () => {
    const format = buildFormatNumber('en-US');
    expect(format(Infinity)).to.equal('Infinity');
    expect(format(-Infinity)).to.equal('-Infinity');
    expect(format(NaN)).to.equal('NaN');
  });

  it('handles zero and negative numbers', () => {
    const format = buildFormatNumber('en-US');
    expect(format(0)).to.equal('0');
    expect(format(-1000)).to.equal('-1,000');
  });
});
