import { describe, it, expect } from 'vitest';
import capitalize from '@mui/utils/capitalize';

describe('capitalize', () => {
  it('should work', () => {
    expect(capitalize('foo')).to.equal('Foo');
  });

  it('should throw when not used correctly', () => {
    expect(() => {
      // @ts-expect-error Testing improper usage
      capitalize();
    }).toThrowMinified(/expects a string argument/);
  });
});
