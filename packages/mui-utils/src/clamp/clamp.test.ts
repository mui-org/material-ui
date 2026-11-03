import { describe, it, expect } from 'vitest';
import clamp from './clamp';

describe('clamp', () => {
  it('clamps a value based on min and max', () => {
    expect(clamp(1, 2, 4)).to.equal(2);
    expect(clamp(5, 2, 4)).to.equal(4);
    expect(clamp(-5, -1, 5)).to.equal(-1);
  });
});
