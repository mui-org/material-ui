import { describe, it, expect } from 'vitest';
import omitEventHandlers from '@mui/utils/omitEventHandlers';

describe('omitEventHandlers', () => {
  it('should remove functions with names beginning with `on` followed by uppercase letter', () => {
    const obj = {
      onClick: () => {},
      onKeyDown: () => {},
      foo: 12,
      bar: 'baz',
      onion: {},
      once: () => {},
      on2: () => {},
      on: () => {},
    };

    const result = omitEventHandlers(obj);

    expect(result).to.haveOwnProperty('foo');
    expect(result).to.haveOwnProperty('bar');
    expect(result).to.haveOwnProperty('onion');
    expect(result).to.haveOwnProperty('once');
    expect(result).to.haveOwnProperty('on2');
    expect(result).to.haveOwnProperty('on');

    expect(result).to.not.haveOwnProperty('onClick');
    expect(result).to.not.haveOwnProperty('onKeyDown');
  });

  it('returns an empty object if an empty object is provided', () => {
    const result = omitEventHandlers({});
    expect(result).to.deep.equal({});
  });

  it('returns an empty object if undefined is passed in', () => {
    const result = omitEventHandlers(undefined);
    expect(result).to.deep.equal({});
  });
});
