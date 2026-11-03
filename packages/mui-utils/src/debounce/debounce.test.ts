import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { spy, useFakeTimers } from 'sinon';
import debounce from './debounce';

describe('debounce', () => {
  let clock: ReturnType<typeof useFakeTimers>;

  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should debounce', () => {
    const handler = spy();
    const expectedContext = { foo: 'bar' };
    let actualContext: any;
    function collectContext(this: any, ...args: any[]) {
      // eslint-disable-next-line consistent-this
      actualContext = this;
      handler(...args);
    }
    const debounced = debounce(collectContext);
    debounced.apply(expectedContext, ['a', 'b']);
    expect(handler.callCount).to.equal(0);
    clock.tick(166);
    expect(handler.callCount).to.equal(1);
    expect(handler.args).to.deep.equal([['a', 'b']]);
    expect(actualContext).to.equal(expectedContext);
  });

  it('should clear a pending task', () => {
    const handler = spy();
    const debounced = debounce(handler);

    debounced();
    expect(handler.callCount).to.equal(0);
    debounced.clear();
    clock.tick(166);
    expect(handler.callCount).to.equal(0);
  });
});
