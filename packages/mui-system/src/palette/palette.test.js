import { describe, it, expect } from 'vitest';
import palette from './palette';

const theme = {
  palette: {
    grey: { 100: '#f5f5f5' },
  },
};

describe('palette', () => {
  it('should treat grey as CSS color', () => {
    const output = palette({
      theme,
      backgroundColor: 'grey',
    });

    expect(output).to.deep.equal({
      backgroundColor: 'grey',
    });
  });

  it('should treat grey.100 as theme color', () => {
    const output = palette({
      theme,
      backgroundColor: 'grey.100',
    });
    expect(output).to.deep.equal({
      backgroundColor: '#f5f5f5',
    });
  });
});
