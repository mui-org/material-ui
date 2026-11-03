import { describe, it, expect } from 'vitest';
import grid from './cssGrid';

describe('grid', () => {
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
