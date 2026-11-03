import { describe, it, expect } from 'vitest';
import getReactElementRef from '@mui/utils/getReactElementRef';
import * as React from 'react';

describe('getReactElementRef', () => {
  it('should return undefined when not used correctly', () => {
    // @ts-expect-error: A boolean is not a React element.
    expect(getReactElementRef(false)).to.equal(null);
    // @ts-expect-error: A React element argument is required.
    expect(getReactElementRef()).to.equal(null);
    // @ts-expect-error: A number is not a React element.
    expect(getReactElementRef(1)).to.equal(null);

    const children = [<div key="1" />, <div key="2" />];
    // @ts-expect-error: An array of elements is not a single React element.
    expect(getReactElementRef(children)).to.equal(null);
  });

  it('should return the ref of a React element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const element = <div ref={ref} />;
    expect(getReactElementRef(element)).to.equal(ref);
  });

  it('should return null for a fragment', () => {
    const element = (
      <React.Fragment>
        <p>Hello</p>
        <p>Hello</p>
      </React.Fragment>
    );
    expect(getReactElementRef(element)).to.equal(null);
  });

  it('should return null for element with no ref', () => {
    const element = <div />;
    expect(getReactElementRef(element)).to.equal(null);
  });
});
