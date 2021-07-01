// @ts-check
import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import {
  describeConformanceV5,
  act,
  createClientRender,
  fireEvent,
  screen,
  focusVisible,
  simulatePointerDevice,
  programmaticFocusTriggersFocusVisible,
} from 'test/utils';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import ButtonBase, { buttonBaseClasses as classes } from '@material-ui/core/ButtonBase';

describe('<ButtonBase />', () => {
  const render = createClientRender();

  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14156632/
  let canFireDragEvents = true;

  before(() => {
    // browser testing config
    try {
      const EventConstructor = window.DragEvent || window.Event;
      // eslint-disable-next-line no-new
      new EventConstructor('');
    } catch (err) {
      canFireDragEvents = false;
    }
  });

  describeConformanceV5(<ButtonBase />, () => ({
    classes,
    inheritComponent: 'button',
    render,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'a',
    muiName: 'MuiButtonBase',
    testVariantProps: { disabled: true },
    skip: ['componentsProp'],
  }));

  describe('root node', () => {
    it('should have default button type "button"', () => {
      const { getByText, setProps } = render(<ButtonBase>Hello</ButtonBase>);
      expect(getByText('Hello')).to.have.attribute('type', 'button');

      setProps({ type: undefined });
      expect(getByText('Hello')).to.have.attribute('type', 'button');
    });

    it('should change the button type', () => {
      const { getByText } = render(<ButtonBase type="submit">Hello</ButtonBase>);
      expect(getByText('Hello')).to.have.attribute('type', 'submit');
    });

    it('should change the button component and add accessibility requirements', () => {
      const { getByRole } = render(
        <ButtonBase component="span" role="checkbox" aria-checked={false} />,
      );
      const checkbox = getByRole('checkbox');
      expect(checkbox).to.have.property('nodeName', 'SPAN');
      expect(checkbox).attribute('tabIndex').to.equal('0');
    });

    it('should not apply role="button" if type="button"', () => {
      const { getByText } = render(<ButtonBase type="button">Hello</ButtonBase>);
      expect(getByText('Hello')).not.to.have.attribute('role');
    });

    it('should change the button type to span and set role="button"', () => {
      const { getByRole } = render(<ButtonBase component="span">Hello</ButtonBase>);
      const button = getByRole('button');

      expect(button).to.have.property('nodeName', 'SPAN');
      expect(button).not.to.have.attribute('type');
    });

    it('should automatically change the button to an anchor element when href is provided', () => {
      const { container } = render(<ButtonBase href="https://google.com">Hello</ButtonBase>);
      const button = container.firstChild;

      expect(button).to.have.property('nodeName', 'A');
      expect(button).not.to.have.attribute('role');
      expect(button).not.to.have.attribute('type');
      expect(button).to.have.attribute('href', 'https://google.com');
    });

    it('should use custom LinkComponent when provided in the theme', () => {
      const CustomLink = React.forwardRef((props, ref) => {
        return (
          <a data-testid="customLink" ref={ref} {...props}>
            {props.children}
          </a>
        );
      });
      const theme = createTheme({
        components: {
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: CustomLink,
            },
          },
        },
      });

      const { container, getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ButtonBase href="https://google.com">Hello</ButtonBase>
        </ThemeProvider>,
      );
      const button = container.firstChild;
      expect(getByTestId('customLink')).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', 'https://google.com');
    });

    it('applies role="button" when an anchor is used without href', () => {
      const { getByRole } = render(<ButtonBase component="a">Hello</ButtonBase>);
      const button = getByRole('button');

      expect(button).to.have.property('nodeName', 'A');
      expect(button).not.to.have.attribute('type');
    });

    it('should not add role="button" if custom component and href are used', () => {
      const CustomLink = React.forwardRef((props, ref) => {
        return (
          <a data-testid="customLink" ref={ref} {...props}>
            {props.children}
          </a>
        );
      });

      const { container } = render(
        // @ts-expect-error missing types in CustomLink
        <ButtonBase component={CustomLink} href="https://google.com">
          Hello
        </ButtonBase>,
      );
      const button = container.firstChild;
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('data-testid', 'customLink');
      expect(button).to.have.attribute('href', 'https://google.com');
      expect(button).not.to.have.attribute('role', 'button');
    });

    it('should not add role="button" if custom component and to are used', () => {
      const CustomLink = React.forwardRef((props, ref) => {
        // @ts-expect-error missing types in CustomLink
        const { to, ...other } = props;
        return (
          <a data-testid="customLink" ref={ref} {...other} href={to}>
            {props.children}
          </a>
        );
      });

      const { container } = render(
        // @ts-expect-error missing types in CustomLink
        <ButtonBase component={CustomLink} to="https://google.com">
          Hello
        </ButtonBase>,
      );
      const button = container.firstChild;
      expect(button).not.to.have.attribute('role', 'button');
    });
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const onClick = spy();
      const onBlur = spy();
      const onFocus = spy();
      const onKeyUp = spy();
      const onKeyDown = spy();
      const onMouseDown = spy();
      const onMouseLeave = spy();
      const onMouseUp = spy();
      const onContextMenu = spy();
      const onDragEnd = spy();
      const onTouchStart = spy();
      const onTouchEnd = spy();

      const { getByText } = render(
        <ButtonBase
          onClick={onClick}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onContextMenu={onContextMenu}
          onDragEnd={onDragEnd}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
        >
          Hello
        </ButtonBase>,
      );
      const button = getByText('Hello');

      // only run in supported browsers
      if (typeof Touch !== 'undefined') {
        const touch = new Touch({ identifier: 0, target: button, clientX: 0, clientY: 0 });

        fireEvent.touchStart(button, { touches: [touch] });
        expect(onTouchStart.callCount).to.equal(1);

        fireEvent.touchEnd(button, { touches: [touch] });
        expect(onTouchEnd.callCount).to.equal(1);
      }

      if (canFireDragEvents) {
        fireEvent.dragEnd(button);
        expect(onDragEnd.callCount).to.equal(1);
      }

      fireEvent.mouseDown(button);
      expect(onMouseDown.callCount).to.equal(1);

      fireEvent.mouseUp(button);
      expect(onMouseUp.callCount).to.equal(1);

      fireEvent.contextMenu(button);
      expect(onContextMenu.callCount).to.equal(1);

      fireEvent.click(button);
      expect(onClick.callCount).to.equal(1);

      button.focus();
      expect(onFocus.callCount).to.equal(1);

      fireEvent.keyDown(button);
      expect(onKeyDown.callCount).to.equal(1);

      fireEvent.keyUp(button);
      expect(onKeyUp.callCount).to.equal(1);

      button.blur();
      expect(onBlur.callCount).to.equal(1);

      fireEvent.mouseLeave(button);
      expect(onMouseLeave.callCount).to.equal(1);
    });
  });

  describe('ripple', () => {
    describe('interactions', () => {
      it('should not have a focus ripple by default', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                ripplePulsate: 'ripple-pulsate',
              },
            }}
          />,
        );
        const button = getByRole('button');
        simulatePointerDevice();

        focusVisible(button);

        expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(0);
      });

      it('should start the ripple when the mouse is pressed', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');

        fireEvent.mouseDown(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should stop the ripple when the mouse is released', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);

        fireEvent.mouseUp(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });

      it('should start the ripple when the mouse is pressed 2', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);
        fireEvent.mouseUp(button);

        fireEvent.mouseDown(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should stop the ripple when the button blurs', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);

        button.blur();

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should restart the ripple when the mouse is pressed again', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');

        fireEvent.mouseDown(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);

        fireEvent.mouseUp(button);
        fireEvent.mouseDown(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should stop the ripple when the mouse leaves', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);

        fireEvent.mouseLeave(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });

      it('should stop the ripple when dragging has finished', function test() {
        if (!canFireDragEvents) {
          this.skip();
        }
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);

        fireEvent.dragLeave(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });

      it('should stop the ripple when the context menu opens', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);

        fireEvent.contextMenu(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });

      it('should not crash when changes enableRipple from false to true', () => {
        function App() {
          /** @type {React.MutableRefObject<import('./ButtonBase').ButtonBaseActions | null>} */
          const buttonRef = React.useRef(null);
          const [enableRipple, setRipple] = React.useState(false);

          React.useEffect(() => {
            if (buttonRef.current) {
              buttonRef.current.focusVisible();
            } else {
              throw new Error('buttonRef.current must be available');
            }
          }, []);

          return (
            <div>
              <button
                type="button"
                data-testid="trigger"
                onClick={() => {
                  setRipple(true);
                }}
              >
                Trigger crash
              </button>
              <ButtonBase
                autoFocus
                action={buttonRef}
                TouchRippleProps={{
                  classes: {
                    ripplePulsate: 'ripple-pulsate',
                  },
                }}
                focusRipple
                disableRipple={!enableRipple}
              >
                the button
              </ButtonBase>
            </div>
          );
        }

        const { container, getByTestId } = render(<App />);

        fireEvent.click(getByTestId('trigger'));
        expect(container.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(1);
      });
    });
  });

  describe('prop: centerRipple', () => {
    it('centers the TouchRipple', () => {
      const { container, getByRole } = render(
        <ButtonBase
          centerRipple
          TouchRippleProps={{ classes: { root: 'touch-ripple', ripple: 'touch-ripple-ripple' } }}
        >
          Hello
        </ButtonBase>,
      );
      // @ts-ignore
      stub(container.querySelector('.touch-ripple'), 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 100,
        bottom: 10,
        left: 20,
        top: 20,
      }));
      fireEvent.mouseDown(getByRole('button'), { clientX: 10, clientY: 10 });
      const rippleRipple = container.querySelector('.touch-ripple-ripple');
      expect(rippleRipple).not.to.equal(null);
      // @ts-ignore
      const rippleSyle = window.getComputedStyle(rippleRipple);
      expect(rippleSyle).to.have.property('height', '101px');
      expect(rippleSyle).to.have.property('width', '101px');
    });

    it('is disabled by default', () => {
      const { container, getByRole } = render(
        <ButtonBase
          TouchRippleProps={{ classes: { root: 'touch-ripple', ripple: 'touch-ripple-ripple' } }}
        >
          Hello
        </ButtonBase>,
      );
      // @ts-ignore
      stub(container.querySelector('.touch-ripple'), 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 100,
        bottom: 10,
        left: 20,
        top: 20,
      }));
      fireEvent.mouseDown(getByRole('button'), { clientX: 10, clientY: 10 });
      const rippleRipple = container.querySelector('.touch-ripple-ripple');
      expect(rippleRipple).not.to.equal(null);
      // @ts-ignore
      const rippleSyle = window.getComputedStyle(rippleRipple);
      expect(rippleSyle).not.to.have.property('height', '101px');
      expect(rippleSyle).not.to.have.property('width', '101px');
    });
  });

  describe('focusRipple', () => {
    it('should pulsate the ripple when focusVisible', () => {
      const { getByRole } = render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              ripplePulsate: 'ripple-pulsate',
            },
          }}
        />,
      );
      const button = getByRole('button');

      simulatePointerDevice();
      focusVisible(button);

      expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(1);
    });

    it('should not stop the ripple when the mouse leaves', () => {
      const { getByRole } = render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              ripplePulsate: 'ripple-pulsate',
            },
          }}
        />,
      );
      const button = getByRole('button');

      simulatePointerDevice();
      focusVisible(button);
      fireEvent.mouseLeave(button);

      expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(1);
    });

    it('should stop pulsate and start a ripple when the space button is pressed', () => {
      const { getByRole } = render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              childLeaving: 'child-leaving',
              ripplePulsate: 'ripple-pulsate',
              rippleVisible: 'rippled-visible',
            },
          }}
        />,
      );
      const button = getByRole('button');

      simulatePointerDevice();
      focusVisible(button);
      fireEvent.keyDown(button, { key: ' ' });

      expect(button.querySelectorAll('.ripple-pulsate .child-leaving')).to.have.lengthOf(1);
      expect(button.querySelectorAll('.ripple-visible')).to.have.lengthOf(0);
    });

    it('should stop and re-pulsate when space bar is released', () => {
      const { getByRole } = render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              childLeaving: 'child-leaving',
              ripplePulsate: 'ripple-pulsate',
              rippleVisible: 'ripple-visible',
            },
          }}
        />,
      );
      const button = getByRole('button');

      simulatePointerDevice();
      focusVisible(button);
      fireEvent.keyDown(button, { key: ' ' });
      fireEvent.keyUp(button, { key: ' ' });

      expect(button.querySelectorAll('.ripple-pulsate .child-leaving')).to.have.lengthOf(1);
      expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(2);
      expect(button.querySelectorAll('.ripple-visible')).to.have.lengthOf(3);
    });

    it('should stop on blur and set focusVisible to false', () => {
      const { getByRole } = render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              childLeaving: 'child-leaving',
              rippleVisible: 'ripple-visible',
            },
          }}
        />,
      );
      const button = getByRole('button');
      simulatePointerDevice();
      focusVisible(button);

      act(() => {
        button.blur();
      });

      expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
    });
  });

  describe('prop: disabled', () => {
    it('should have a negative tabIndex', () => {
      const { getByText } = render(<ButtonBase disabled>Hello</ButtonBase>);
      expect(getByText('Hello')).to.have.property('tabIndex', -1);
    });

    it('should forward it to native buttons', () => {
      const { getByText } = render(
        <ButtonBase disabled component="button">
          Hello
        </ButtonBase>,
      );
      expect(getByText('Hello')).to.have.property('disabled', true);
    });

    it('should reset the focused state', () => {
      const { getByText, setProps } = render(<ButtonBase>Hello</ButtonBase>);
      const button = getByText('Hello');
      simulatePointerDevice();

      focusVisible(button);

      expect(button).to.have.class(classes.focusVisible);

      setProps({ disabled: true });

      expect(button).not.to.have.class(classes.focusVisible);
    });

    it('should not use aria-disabled with button host', () => {
      const { getByRole } = render(<ButtonBase disabled>Hello</ButtonBase>);
      const button = getByRole('button');

      expect(button).to.have.attribute('disabled');
      expect(button).not.to.have.attribute('aria-disabled');
    });

    it('should use aria-disabled for other components', () => {
      const { getByRole, setProps } = render(
        <ButtonBase component="span" disabled>
          Hello
        </ButtonBase>,
      );
      const button = getByRole('button');

      expect(button).not.to.have.attribute('disabled');
      expect(button).to.have.attribute('aria-disabled', 'true');

      setProps({ disabled: false });
      expect(button).not.to.have.attribute('aria-disabled');
    });
  });

  describe('prop: component', () => {
    it('should allow to use a link component', () => {
      /**
       * @type {React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>}
       */
      const Link = React.forwardRef((props, ref) => (
        <div data-testid="link" ref={ref} {...props} />
      ));
      const { getByTestId } = render(<ButtonBase component={Link}>Hello</ButtonBase>);

      expect(getByTestId('link')).to.have.attribute('role', 'button');
    });
  });

  describe('event: focus', () => {
    it('when disabled should be called onFocus', () => {
      const onFocusSpy = spy();
      const { getByRole } = render(
        <ButtonBase component="div" disabled onFocus={onFocusSpy}>
          Hello
        </ButtonBase>,
      );

      act(() => {
        getByRole('button').focus();
      });

      expect(onFocusSpy.callCount).to.equal(1);
    });

    it('has a focus-visible polyfill', () => {
      const { getByText } = render(<ButtonBase>Hello</ButtonBase>);
      const button = getByText('Hello');
      simulatePointerDevice();

      expect(button).not.to.have.class(classes.focusVisible);

      button.focus();

      if (programmaticFocusTriggersFocusVisible()) {
        expect(button).to.have.class(classes.focusVisible);
      } else {
        expect(button).not.to.have.class(classes.focusVisible);
      }

      focusVisible(button);

      expect(button).to.have.class(classes.focusVisible);
    });

    it('removes foucs-visible if focus is re-targetted', () => {
      /**
       * @type {string[]}
       */
      const eventLog = [];
      function Test() {
        /**
         * @type {React.Ref<HTMLButtonElement>}
         */
        const focusRetargetRef = React.useRef(null);
        return (
          <div
            onFocus={() => {
              const { current: focusRetarget } = focusRetargetRef;
              if (focusRetarget === null) {
                throw new TypeError('Nothing to focous. Test cannot work.');
              }
              focusRetarget.focus();
            }}
          >
            <button ref={focusRetargetRef} type="button">
              you cannot escape me
            </button>
            <ButtonBase
              onBlur={() => eventLog.push('blur')}
              onFocus={() => eventLog.push('focus')}
              onFocusVisible={() => eventLog.push('focus-visible')}
            >
              Hello
            </ButtonBase>
          </div>
        );
      }
      const { getByText } = render(<Test />);
      const buttonBase = getByText('Hello');
      const focusRetarget = getByText('you cannot escape me');
      simulatePointerDevice();

      focusVisible(buttonBase);

      expect(focusRetarget).toHaveFocus();
      expect(eventLog).to.deep.equal(['focus-visible', 'focus', 'blur']);
      expect(buttonBase).not.to.have.class(classes.focusVisible);
    });

    it('onFocusVisibleHandler() should propagate call to onFocusVisible prop', () => {
      const onFocusVisibleSpy = spy();
      const { getByRole } = render(
        <ButtonBase component="span" onFocusVisible={onFocusVisibleSpy}>
          Hello
        </ButtonBase>,
      );
      simulatePointerDevice();

      focusVisible(getByRole('button'));

      expect(onFocusVisibleSpy.calledOnce).to.equal(true);
      expect(onFocusVisibleSpy.firstCall.args).to.have.lengthOf(1);
    });

    it('can be autoFocused', () => {
      // as of react@16.8.6 autoFocus causes focus to be emitted before refs
      // so we need to check if we're resilient against it
      const { getByText } = render(<ButtonBase autoFocus>Hello</ButtonBase>);

      expect(getByText('Hello')).toHaveFocus();
    });
  });

  describe('event: keydown', () => {
    it('ripples on repeated keydowns', () => {
      const { container, getByText } = render(
        <ButtonBase focusRipple TouchRippleProps={{ classes: { rippleVisible: 'ripple-visible' } }}>
          Hello
        </ButtonBase>,
      );

      const button = getByText('Hello');

      act(() => {
        button.focus();
        fireEvent.keyDown(button, { key: 'Enter' });
      });

      expect(container.querySelectorAll('.ripple-visible')).to.have.lengthOf(1);

      // technically the second keydown should be fire with repeat: true
      // but that isn't implemented in IE11 so we shouldn't mock it here either
      fireEvent.keyDown(button, { key: 'Enter' });

      expect(container.querySelectorAll('.ripple-visible')).to.have.lengthOf(1);
    });

    describe('prop: onKeyDown', () => {
      it('call it when keydown events are dispatched', () => {
        const onKeyDownSpy = spy();
        const { getByText } = render(
          <ButtonBase autoFocus onKeyDown={onKeyDownSpy}>
            Hello
          </ButtonBase>,
        );

        fireEvent.keyDown(getByText('Hello'));

        expect(onKeyDownSpy.callCount).to.equal(1);
      });
    });

    describe('prop: disableTouchRipple', () => {
      it('creates no ripples on click', () => {
        const { getByText } = render(
          <ButtonBase
            disableTouchRipple
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
              },
            }}
          >
            Hello
          </ButtonBase>,
        );
        const button = getByText('Hello');

        fireEvent.click(button);

        expect(button).not.to.have.class('ripple-visible');
      });
    });

    describe('prop: disableRipple', () => {
      it('removes the TouchRipple', () => {
        const { getByText } = render(
          <ButtonBase disableRipple focusRipple TouchRippleProps={{ className: 'touch-ripple' }}>
            Hello
          </ButtonBase>,
        );

        expect(getByText('Hello').querySelector('.touch-ripple')).to.equal(null);
      });
    });

    describe('keyboard accessibility for non interactive elements', () => {
      it('does not call onClick when a spacebar is pressed on the element but prevents the default', () => {
        const onKeyDown = spy();
        const onClickSpy = spy();
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} onKeyDown={onKeyDown} component="div">
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
          fireEvent.keyDown(button, {
            key: ' ',
          });
        });

        expect(onClickSpy.callCount).to.equal(0);
        expect(onKeyDown.callCount).to.equal(1);
        expect(onKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
      });

      it('does call onClick when a spacebar is released on the element', () => {
        const onClickSpy = spy();
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} component="div">
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
          fireEvent.keyUp(button, {
            key: ' ',
          });
        });

        expect(onClickSpy.callCount).to.equal(1);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });

      it('does not call onClick when a spacebar is released and the default is prevented', () => {
        const onClickSpy = spy();
        const { getByRole } = render(
          <ButtonBase
            onClick={onClickSpy}
            onKeyUp={
              /**
               * @param {React.SyntheticEvent} event
               */
              (event) => event.preventDefault()
            }
            component="div"
          >
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
          fireEvent.keyUp(button, {
            key: ' ',
          });
        });

        expect(onClickSpy.callCount).to.equal(0);
      });

      it('calls onClick when Enter is pressed on the element', () => {
        const onClickSpy = spy();
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} component="div">
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
          fireEvent.keyDown(button, {
            key: 'Enter',
          });
        });

        expect(onClickSpy.calledOnce).to.equal(true);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', true);
      });

      it('does not call onClick if Enter was pressed on a child', () => {
        const onClickSpy = spy();
        const onKeyDownSpy = spy();
        render(
          <ButtonBase onClick={onClickSpy} onKeyDown={onKeyDownSpy} component="div">
            <input autoFocus type="text" />
          </ButtonBase>,
        );

        fireEvent.keyDown(screen.getByRole('textbox'), {
          key: 'Enter',
        });

        expect(onKeyDownSpy.callCount).to.equal(1);
        expect(onClickSpy.callCount).to.equal(0);
      });

      it('does not call onClick if Space was released on a child', () => {
        const onClickSpy = spy();
        const onKeyUpSpy = spy();
        render(
          <ButtonBase onClick={onClickSpy} onKeyUp={onKeyUpSpy} component="div">
            <input autoFocus type="text" />
          </ButtonBase>,
        );

        fireEvent.keyUp(screen.getByRole('textbox'), {
          key: ' ',
        });

        expect(onKeyUpSpy.callCount).to.equal(1);
        expect(onClickSpy.callCount).to.equal(0);
      });

      it('prevents default with an anchor and empty href', () => {
        const onClickSpy = spy();
        const { getByRole } = render(
          <ButtonBase component="a" onClick={onClickSpy}>
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
          fireEvent.keyDown(button, { key: 'Enter' });
        });

        expect(onClickSpy.calledOnce).to.equal(true);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', true);
      });

      it('should ignore anchors with href', () => {
        const onClick = spy();
        const onKeyDown = spy();
        const { getByText } = render(
          <ButtonBase component="a" href="href" onClick={onClick} onKeyDown={onKeyDown}>
            Hello
          </ButtonBase>,
        );
        const button = getByText('Hello');

        act(() => {
          button.focus();
          fireEvent.keyDown(button, {
            key: 'Enter',
          });
        });

        expect(onClick.callCount).to.equal(0);
        expect(onKeyDown.callCount).to.equal(1);
        expect(onKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });
    });
  });

  describe('prop: action', () => {
    it('should be able to focus visible the button', () => {
      /**
       * @type {React.RefObject<import('./ButtonBase').ButtonBaseActions>}
       */
      const buttonActionsRef = React.createRef();
      const { getByText } = render(
        <ButtonBase action={buttonActionsRef} focusVisibleClassName="focusVisible">
          Hello
        </ButtonBase>,
      );

      // @ts-ignore
      expect(typeof buttonActionsRef.current.focusVisible).to.equal('function');

      act(() => {
        // @ts-ignore
        buttonActionsRef.current.focusVisible();
      });

      expect(getByText('Hello')).toHaveFocus();
      expect(getByText('Hello')).to.match('.focusVisible');
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warns on invalid `component` prop: ref forward', function test() {
      // Only run the test on node. On the browser the thrown error is not caught
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      /**
       *
       * @param {import('react').HTMLAttributes<HTMLButtonElement>} props
       */
      function Component(props) {
        return <button type="button" {...props} />;
      }

      expect(() => {
        PropTypes.checkPropTypes(
          // @ts-expect-error ExtendButtonBase<ButtonBaseTypeMap<{}, "button">> does not contain the property 'propTypes'.
          ButtonBase.propTypes,
          { classes: {}, component: Component },
          'prop',
          'MockedName',
        );
      }).toErrorDev(
        'Invalid prop `component` supplied to `MockedName`. Expected an element type that can hold a ref',
      );
    });

    it('warns on invalid `component` prop: prop forward', () => {
      const Component = React.forwardRef((props, ref) => (
        <button type="button" ref={ref} {...props}>
          Hello
        </button>
      ));

      // cant match the error message here because flakiness with mocha watchmode

      expect(() => {
        render(<ButtonBase component={Component} />);
      }).toErrorDev('Please make sure the children prop is rendered in this custom component.');
    });
  });

  describe('prop: type', () => {
    it('is `button` by default', () => {
      render(<ButtonBase />);

      expect(screen.getByRole('button')).to.have.property('type', 'button');
    });

    it('can be changed to other button types', () => {
      render(<ButtonBase type="submit" />);

      expect(screen.getByRole('button')).to.have.property('type', 'submit');
    });

    it('allows non-standard values', () => {
      // @ts-expect-error `@types/react` only lists standard values
      render(<ButtonBase type="fictional-type" />);

      expect(screen.getByRole('button')).to.have.attribute('type', 'fictional-type');
      // By spec non-supported types result in the default type for `<button>` which is `submit`
      expect(screen.getByRole('button')).to.have.property('type', 'submit');
    });

    it('is forwarded to anchor components', () => {
      render(<ButtonBase component="a" href="some-recording.ogg" download type="audio/ogg" />);

      expect(screen.getByRole('link')).to.have.attribute('type', 'audio/ogg');
      expect(screen.getByRole('link')).to.have.property('type', 'audio/ogg');
    });

    it('is forwarded to custom components', () => {
      /**
       * @type {React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement>>}
       */
      const CustomButton = React.forwardRef((props, ref) => <button ref={ref} {...props} />);
      render(<ButtonBase component={CustomButton} type="reset" />);

      expect(screen.getByRole('button')).to.have.property('type', 'reset');
    });
  });
});
