import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import useValueAsRef from './useValueAsRef';

describe('useValueAsRef', () => {
  const { render } = createRenderer();

  it('updates the current value after commit, not during render', () => {
    let renderValue: number | undefined;
    let effectValue: number | undefined;

    function Test(props: { value: number }) {
      const valueRef = useValueAsRef(props.value);
      renderValue = valueRef.current;

      React.useLayoutEffect(() => {
        effectValue = valueRef.current;
      });

      return null;
    }

    const { setProps } = render(<Test value={1} />);

    expect(renderValue).to.equal(1);
    expect(effectValue).to.equal(1);

    setProps({ value: 2 });

    expect(renderValue).to.equal(1);
    expect(effectValue).to.equal(2);
  });

  it('returns the same ref object across renders', () => {
    let capturedRef: object | undefined;

    function Test(props: { value: number }) {
      capturedRef = useValueAsRef(props.value);
      return null;
    }

    // Collect the committed ref after each render settles. Reading inside the render body
    // instead would capture React 18 StrictMode's discarded initial-mount object (a distinct
    // transient `ValueRef`), which is never the one the component ends up using.
    const refs: Array<object | undefined> = [];
    const { setProps } = render(<Test value={1} />);
    refs.push(capturedRef);
    setProps({ value: 2 });
    refs.push(capturedRef);
    setProps({ value: 3 });
    refs.push(capturedRef);

    expect(refs.length).to.be.at.least(2);
    refs.forEach((ref) => {
      expect(ref).to.equal(refs[0]);
    });
  });
});
