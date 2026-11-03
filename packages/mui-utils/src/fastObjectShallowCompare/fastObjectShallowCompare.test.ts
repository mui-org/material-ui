import { describe, it, expect } from 'vitest';
import fastObjectShallowCompare from './fastObjectShallowCompare';

describe('fastObjectShallowCompare', () => {
  it('returns true for the same reference', () => {
    const object = { foo: 'bar' };

    expect(fastObjectShallowCompare(object, object)).to.equal(true);
  });

  it('returns true for shallow-equal objects', () => {
    expect(fastObjectShallowCompare({ foo: 'bar', count: 1 }, { foo: 'bar', count: 1 })).to.equal(
      true,
    );
  });

  it('returns false when a value differs', () => {
    expect(fastObjectShallowCompare({ foo: 'bar' }, { foo: 'baz' })).to.equal(false);
  });

  it('returns false when the keys differ', () => {
    expect(fastObjectShallowCompare({ foo: 'bar' }, { foo: 'bar', count: 1 })).to.equal(false);
  });

  it('returns false when one side is null', () => {
    expect(fastObjectShallowCompare(null, { foo: 'bar' })).to.equal(false);
  });
});
