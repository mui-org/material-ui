import { describe, it, expect } from 'vitest';
import borders from './borders';

describe('borders', () => {
  it('should work', () => {
    const output = borders({
      border: 1,
      borderRadius: 1,
      outline: 1,
    });
    expect(output).to.deep.equal({
      border: '1px solid',
      borderRadius: 4,
      outline: '1px solid',
    });
  });

  it('should work with 0', () => {
    const output = borders({
      borderRadius: 0,
    });
    expect(output).to.deep.equal({
      borderRadius: 0,
    });
  });

  describe('theme shape as string', () => {
    it('should work', () => {
      const output = borders({
        borderRadius: 2,
        theme: {
          shape: {
            borderRadius: '4px',
          },
        },
      });
      expect(output).to.deep.equal({
        borderRadius: 'calc(2 * 4px)',
      });
    });

    it('should work with 0', () => {
      const output = borders({
        borderRadius: 0,
        theme: {
          shape: {
            borderRadius: '4px',
          },
        },
      });
      expect(output).to.deep.equal({
        borderRadius: 'calc(0 * 4px)',
      });
    });
  });
});
