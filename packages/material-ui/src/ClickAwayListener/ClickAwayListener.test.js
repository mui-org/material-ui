import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createClientRender, fireEvent, fireDiscreteEvent, screen, userEvent } from 'test/utils';
import Portal from '../Portal';
import ClickAwayListener from './ClickAwayListener';

describe('<ClickAwayListener />', () => {
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

  const render = createClientRender();

  it('should render the children', () => {
    const children = <span />;
    const { container } = render(
      <ClickAwayListener onClickAway={() => {}}>{children}</ClickAwayListener>,
    );
    expect(container.querySelectorAll('span').length).to.equal(1);
  });

  describe('prop: onClickAway', () => {
    it('should be called when clicking away', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span />
        </ClickAwayListener>,
      );

      userEvent.mousePress(document.body);
      expect(handleClickAway.callCount).to.equal(1);
      expect(handleClickAway.args[0].length).to.equal(1);
    });

    it('should not be called when clicking inside', () => {
      const handleClickAway = spy();
      const { container } = render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span />
        </ClickAwayListener>,
      );

      userEvent.mousePress(container.querySelector('span'));
      expect(handleClickAway.callCount).to.equal(0);
    });

    it('should be called when preventDefault is `true`', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span />
        </ClickAwayListener>,
      );
      const preventDefault = (event) => event.preventDefault();
      document.body.addEventListener('click', preventDefault);

      userEvent.mousePress(document.body);
      expect(handleClickAway.callCount).to.equal(1);

      document.body.removeEventListener('click', preventDefault);
    });

    it('should not be called when clicking inside a portaled element', () => {
      const handleClickAway = spy();
      const { getByText } = render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <Portal>
              <span>Inside a portal</span>
            </Portal>
          </div>
        </ClickAwayListener>,
      );

      userEvent.mousePress(getByText('Inside a portal'));
      expect(handleClickAway.callCount).to.equal(0);
    });

    it('should be called when clicking inside a portaled element and `disableReactTree` is `true`', () => {
      const handleClickAway = spy();
      const { getByText } = render(
        <ClickAwayListener onClickAway={handleClickAway} disableReactTree>
          <div>
            <Portal>
              <span>Inside a portal</span>
            </Portal>
          </div>
        </ClickAwayListener>,
      );

      userEvent.mousePress(getByText('Inside a portal'));
      expect(handleClickAway.callCount).to.equal(1);
    });

    it('should not be called even if the event propagation is stopped', () => {
      const handleClickAway = spy();
      const { getByText } = render(
        <ClickAwayListener onClickAway={handleClickAway} disableReactTree>
          <div>
            <div
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              Outside a portal
            </div>
            <Portal>
              <span
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                Stop inside a portal
              </span>
            </Portal>
            <Portal>
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  event.nativeEvent.stopImmediatePropagation();
                }}
              >
                Stop all inside a portal
              </span>
            </Portal>
          </div>
        </ClickAwayListener>,
      );

      userEvent.mousePress(getByText('Outside a portal'));
      expect(handleClickAway.callCount).to.equal(0);

      userEvent.mousePress(getByText('Stop all inside a portal'));
      expect(handleClickAway.callCount).to.equal(0);

      userEvent.mousePress(getByText('Stop inside a portal'));
      // undesired behavior in React 16
      expect(handleClickAway.callCount).to.equal(React.version.startsWith('16') ? 1 : 0);
    });

    [
      ['onClick', 'onClick'],
      ['onClick', 'onClickCapture'],
      // earliest possible event we call `onClickAway` + earliest possible event that can mount the CAL
      ['onMouseDown', 'onMouseDownCapture'],
    ].forEach(([mouseEvent, eventListenerName]) => {
      it(`should not be called when ${eventListenerName} mounted the listener when mouseEvent={${mouseEvent}}`, () => {
        function Test() {
          const [open, setOpen] = React.useState(false);

          return (
            <React.Fragment>
              <button data-testid="trigger" {...{ [eventListenerName]: () => setOpen(true) }} />
              {open &&
                ReactDOM.createPortal(
                  <ClickAwayListener mouseEvent={mouseEvent} onClickAway={() => setOpen(false)}>
                    <div data-testid="child" />
                  </ClickAwayListener>,
                  // Needs to be an element between the react root we render into and the element where CAL attaches its native listener (now: `document`).
                  document.body,
                )}
            </React.Fragment>
          );
        }
        render(<Test />);

        const fireEventName = `${mouseEvent[2].toLowerCase()}${mouseEvent.slice(3)}`;
        fireDiscreteEvent[fireEventName](screen.getByTestId('trigger'));

        expect(screen.getByTestId('child')).not.to.equal(null);
      });
    });

    it('should be called if an element is interleaved between mousedown and mouseup', () => {
      /**
       * @param {Element} element
       * @returns {Element[]}
       */
      function ancestorElements(element) {
        const ancestors = [];
        let ancestor = element;
        while (ancestor !== null) {
          ancestors.unshift(ancestor);
          ancestor = ancestor.parentElement;
        }
        return ancestors;
      }

      /**
       * @param {Element} elementA
       * @param {Element} elementB
       * @returns {Element}
       */
      function findNearestCommonAncestor(elementA, elementB) {
        const ancestorsA = ancestorElements(elementA);
        const ancestorsB = ancestorElements(elementB);

        if (ancestorsA[0] !== ancestorsB[0]) {
          throw new Error('A and B share no common ancestor');
        }

        for (let index = 1; index < ancestorsA.length; index += 1) {
          if (ancestorsA[index] !== ancestorsB[index]) {
            return ancestorsA[index - 1];
          }
        }

        throw new Error('Unreachable reached. This is a bug in findNearestCommonAncestor');
      }

      const onClickAway = spy();
      function ClickAwayListenerMouseDownPortal() {
        const [open, toggleOpen] = React.useReducer((flag) => !flag, false);

        return (
          <ClickAwayListener onClickAway={onClickAway}>
            <div data-testid="trigger" onMouseDown={toggleOpen}>
              {open &&
                // interleave an element during mousedown so that the following mouseup would not be targetted at the mousedown target.
                // This results in the click event being targetted at the nearest common ancestor.
                ReactDOM.createPortal(
                  <div data-testid="interleaved-element">Portaled Div</div>,
                  document.body,
                )}
            </div>
          </ClickAwayListener>
        );
      }
      render(<ClickAwayListenerMouseDownPortal />);
      const mouseDownTarget = screen.getByTestId('trigger');

      fireDiscreteEvent.mouseDown(mouseDownTarget);
      const mouseUpTarget = screen.getByTestId('interleaved-element');
      // https://w3c.github.io/uievents/#events-mouseevent-event-order
      const clickTarget = findNearestCommonAncestor(mouseDownTarget, mouseUpTarget);
      fireDiscreteEvent.mouseUp(mouseUpTarget);
      fireDiscreteEvent.click(clickTarget);

      expect(onClickAway.callCount).to.equal(1);
    });
  });

  describe('prop: mouseEvent', () => {
    it('should not call `props.onClickAway` when `props.mouseEvent` is `false`', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway} mouseEvent={false}>
          <span />
        </ClickAwayListener>,
      );
      userEvent.mousePress(document.body);
      expect(handleClickAway.callCount).to.equal(0);
    });

    it('should call `props.onClickAway` when the appropriate mouse event is triggered', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
          <span />
        </ClickAwayListener>,
      );
      fireEvent.mouseUp(document.body);
      expect(handleClickAway.callCount).to.equal(0);
      fireEvent.mouseDown(document.body);
      expect(handleClickAway.callCount).to.equal(1);
      expect(handleClickAway.args[0].length).to.equal(1);
    });
  });

  describe('prop: touchEvent', () => {
    it('should not call `props.onClickAway` when `props.touchEvent` is `false`', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent={false}>
          <span />
        </ClickAwayListener>,
      );
      userEvent.touch(document.body);
      expect(handleClickAway.callCount).to.equal(0);
    });

    it('should call `props.onClickAway` when the appropriate touch event is triggered', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent="onTouchStart">
          <span />
        </ClickAwayListener>,
      );

      userEvent.touch(document.body);
      expect(handleClickAway.callCount).to.equal(1);
      expect(handleClickAway.firstCall.args[0]).to.have.property('type', 'touchstart');
    });

    it('should ignore `touchend` when preceded by `touchmove` event', () => {
      const handleClickAway = spy();
      render(
        <ClickAwayListener onClickAway={handleClickAway} touchEvent="onTouchEnd">
          <span />
        </ClickAwayListener>,
      );

      fireEvent.touchStart(document.body);
      fireEvent.touchMove(document.body);
      fireEvent.touchEnd(document.body);
      expect(handleClickAway.callCount).to.equal(0);

      userEvent.touch(document.body);
      expect(handleClickAway.callCount).to.equal(1);
      expect(handleClickAway.args[0].length).to.equal(1);
    });
  });

  it('should handle null child', () => {
    const Child = React.forwardRef(() => null);
    const handleClickAway = spy();
    render(
      <ClickAwayListener onClickAway={handleClickAway}>
        <Child />
      </ClickAwayListener>,
    );
    userEvent.mousePress(document.body);
    expect(handleClickAway.callCount).to.equal(0);
  });

  [
    ['onClick', false],
    ['onClick', true],
    ['onClickCapture', false],
    ['onClickCapture', true],
  ].forEach(([eventName, disableReactTree]) => {
    it(`when 'disableRectTree=${disableReactTree}' ${eventName} triggers onClickAway if an outside target is removed`, function test() {
      if (!new Event('click').composedPath) {
        this.skip();
      }

      const handleClickAway = spy();
      function Test() {
        const [buttonShown, hideButton] = React.useReducer(() => false, true);

        return (
          <React.Fragment>
            {buttonShown && <button {...{ [eventName]: hideButton }} type="button" />}
            <ClickAwayListener onClickAway={handleClickAway} disableReactTree={disableReactTree}>
              <div />
            </ClickAwayListener>
          </React.Fragment>
        );
      }
      render(<Test />);

      userEvent.mousePress(screen.getByRole('button'));

      expect(handleClickAway.callCount).to.equal(1);
    });

    it(`when 'disableRectTree=${disableReactTree}' ${eventName} does not trigger onClickAway if an inside target is removed`, function test() {
      if (!new Event('click').composedPath) {
        this.skip();
      }

      const handleClickAway = spy();

      function Test() {
        const [buttonShown, hideButton] = React.useReducer(() => false, true);

        return (
          <ClickAwayListener onClickAway={handleClickAway} disableReactTree={disableReactTree}>
            <div>{buttonShown && <button {...{ [eventName]: hideButton }} type="button" />}</div>
          </ClickAwayListener>
        );
      }
      render(<Test />);

      userEvent.mousePress(screen.getByRole('button'));

      expect(handleClickAway.callCount).to.equal(0);
    });
  });
});
