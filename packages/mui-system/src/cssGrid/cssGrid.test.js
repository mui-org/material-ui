import { describe, it, expect } from 'vitest';
import grid from './cssGrid';

describe('grid', () => {
  describe('named scale values', () => {
    // Same contract as the padding/margin props: a spacing function may advertise
    // named values through `keys`; every other string stays raw CSS.
    const scaled = { small: '12px', xLarge: '32px' };
    const keyedSpacing = (...args) => args.map((arg) => scaled[arg] ?? `${arg * 8}px`).join(' ');
    keyedSpacing.keys = new Set(Object.keys(scaled));

    it('resolves names on gap, rowGap and columnGap', () => {
      const theme = { spacing: keyedSpacing };

      expect(grid({ theme, gap: 'small' })).to.deep.equal({ gap: '12px' });
      expect(grid({ theme, rowGap: 'xLarge' })).to.deep.equal({ rowGap: '32px' });
      expect(grid({ theme, columnGap: 'small' })).to.deep.equal({ columnGap: '12px' });
    });
  });

  it('should use the spacing unit', () => {
    const output = grid({
      gap: 1,
    });
    expect(output).to.deep.equal({
      gap: 8,
    });
  });

  it('should accept 0', () => {
    const output = grid({
      gap: 0,
      columnGap: 0,
      rowGap: 0,
    });
    expect(output).to.deep.equal({
      gap: 0,
      columnGap: 0,
      rowGap: 0,
    });
  });

  it('should support breakpoints', () => {
    const output = grid({
      gap: [1, 2],
    });
    expect(output).to.deep.equal({
      '@media (min-width:0px)': {
        gap: 8,
      },
      '@media (min-width:600px)': {
        gap: 16,
      },
    });
  });

  it('should support container queries', () => {
    const output1 = grid({
      gap: {
        '@sm': 1,
        '@900/sidebar': 2,
        '@80rem/sidebar': 3,
      },
    });
    expect(output1).to.deep.equal({
      '@container (min-width:600px)': {
        gap: 8,
      },
      '@container sidebar (min-width:900px)': {
        gap: 16,
      },
      '@container sidebar (min-width:80rem)': {
        gap: 24,
      },
    });
  });
});
