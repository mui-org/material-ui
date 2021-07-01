import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createClientRender, describeConformanceV5, act } from 'test/utils';
import Backdrop, { backdropClasses as classes } from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

describe('<Backdrop />', () => {
  const render = createClientRender();

  describeConformanceV5(<Backdrop open />, () => ({
    classes,
    inheritComponent: Fade,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiBackdrop',
    testVariantProps: { invisible: true },
    skip: [
      'componentProp',
      'componentsProp',
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  it('should render a backdrop div with content of nested children', () => {
    const { container } = render(
      <Backdrop open>
        <h1>Hello World</h1>
      </Backdrop>,
    );
    expect(container.querySelector('h1')).to.have.text('Hello World');
  });

  describe('prop: transitionDuration', () => {
    /**
     * @type {ReturnType<typeof useFakeTimers>}
     */
    let clock;
    beforeEach(() => {
      clock = useFakeTimers();
    });
    afterEach(() => {
      clock.restore();
    });

    it('delays appearance of its children', () => {
      const handleEntered = spy();
      render(
        <Backdrop open transitionDuration={1954} onEntered={handleEntered}>
          <div />
        </Backdrop>,
      );

      expect(handleEntered.callCount).to.equal(0);

      act(() => {
        clock.tick(1954);
      });

      expect(handleEntered.callCount).to.equal(1);
    });
  });
});
