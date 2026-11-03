// @ts-check
import { describe, beforeAll, it, expect, beforeEach, vi } from 'vitest';
import * as React from 'react';
import { spy, stub } from 'sinon';
import {
  act,
  createRenderer,
  fireEvent,
  screen,
  focusVisible,
  simulatePointerDevice,
  programmaticFocusTriggersFocusVisible,
  supportsTouch,
  isJsdom,
  reactMajor,
} from '@mui/internal-test-utils';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ButtonBase, { buttonBaseClasses as classes } from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

/** @typedef {import('./ButtonBase').ButtonBaseActions} ButtonBaseActions */

describe('<ButtonBase />', () => {
  const { render } = createRenderer();

  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14156632/
  let canFireDragEvents = true;

  beforeAll(() => {
    // browser testing config
    try {
      const EventConstructor = window.DragEvent || window.Event;
      // eslint-disable-next-line no-new
      new EventConstructor('');
    } catch (err) {
      canFireDragEvents = false;
    }
  });

  describeConformance(<ButtonBase />, () => ({
    classes,
    inheritComponent: 'button',
    render,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'a',
    muiName: 'MuiButtonBase',
    testVariantProps: { disabled: true },
  }));

  describe('root node', () => {
    it('should have default button type "button"', () => {
      const { setProps } = render(<ButtonBase>Hello</ButtonBase>);
      expect(screen.getByText('Hello')).to.have.attribute('type', 'button');

      setProps({ type: undefined });
      expect(screen.getByText('Hello')).to.have.attribute('type', 'button');
    });

    it('should change the button type', () => {
      render(<ButtonBase type="submit">Hello</ButtonBase>);
      expect(screen.getByText('Hello')).to.have.attribute('type', 'submit');
    });

    it('should change the button component and add accessibility requirements', () => {
      render(<ButtonBase component="span" role="checkbox" aria-checked={false} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).to.have.property('nodeName', 'SPAN');
      expect(checkbox).attribute('tabIndex').to.equal('0');
    });

    it('should not apply role="button" if type="button"', () => {
      render(<ButtonBase type="button">Hello</ButtonBase>);
      expect(screen.getByText('Hello')).not.to.have.attribute('role');
    });

    it('should change the button type to span and set role="button"', () => {
      render(<ButtonBase component="span">Hello</ButtonBase>);
      const button = screen.getByRole('button');

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
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a data-testid="customLink" ref={ref} {...props} />;
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

      const { container } = render(
        <ThemeProvider theme={theme}>
          <ButtonBase href="https://google.com">Hello</ButtonBase>
        </ThemeProvider>,
      );
      const button = container.firstChild;
      expect(screen.getByTestId('customLink')).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', 'https://google.com');
    });

    it('applies role="button" when an anchor is used without href', () => {
      render(<ButtonBase component="a">Hello</ButtonBase>);
      const button = screen.getByRole('button');

      expect(button).to.have.property('nodeName', 'A');
      expect(button).not.to.have.attribute('type');
    });

    it('should not add role="button" if custom component and href are used', () => {
      const CustomLink = React.forwardRef((props, ref) => {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a data-testid="customLink" ref={ref} {...props} />;
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
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a data-testid="customLink" ref={ref} {...other} href={to} />;
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
    it('should fire event callbacks', async () => {
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

      const { user } = render(
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
      const button = screen.getByText('Hello');

      // only run in supported browsers
      if (supportsTouch()) {
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

      await user.click(button);
      expect(onClick.callCount).to.equal(1);

      await act(async () => {
        button.focus();
      });
      expect(onFocus.callCount).to.equal(1);

      fireEvent.keyDown(button);
      expect(onKeyDown.callCount).to.equal(1);

      fireEvent.keyUp(button);
      expect(onKeyUp.callCount).to.equal(1);

      await act(async () => {
        button.blur();
      });
      expect(onBlur.callCount).to.equal(1);

      fireEvent.mouseLeave(button);
      expect(onMouseLeave.callCount).to.equal(1);
    });

    it('should propagate click events when Enter is pressed on non-native button', async () => {
      const parentClickSpy = spy();
      const buttonClickSpy = spy();

      const { user } = render(
        <div onClick={parentClickSpy}>
          <ButtonBase onClick={buttonClickSpy} component="div">
            Hello
          </ButtonBase>
        </div>,
      );

      // moves focus to the button
      await user.tab();
      await user.keyboard('{Enter}');

      expect(buttonClickSpy.callCount).to.equal(1);
      expect(parentClickSpy.callCount).to.equal(1);
    });

    it('should propagate click events when Space is released on non-native button', async () => {
      const parentClickSpy = spy();
      const buttonClickSpy = spy();

      const { user } = render(
        <div onClick={parentClickSpy}>
          <ButtonBase onClick={buttonClickSpy} component="div">
            Hello
          </ButtonBase>
        </div>,
      );

      // moves focus to the button
      await user.tab();
      await user.keyboard(' ');

      expect(buttonClickSpy.callCount).to.equal(1);
      expect(parentClickSpy.callCount).to.equal(1);
    });
  });

  describe.skipIf(isJsdom())('ripple', () => {
    describe('interactions', () => {
      it('should not have a focus ripple by default', () => {
        render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                ripplePulsate: 'ripple-pulsate',
              },
            }}
          />,
        );

        const button = screen.getByRole('button');
        simulatePointerDevice();

        focusVisible(button);

        expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(0);
      });

      it('should start the ripple when the mouse is pressed', async () => {
        render(
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

        const button = screen.getByRole('button');

        await ripple.startTouch(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should stop the ripple when the mouse is released', async () => {
        render(
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

        const button = screen.getByRole('button');

        await ripple.startTouch(button);
        await ripple.stopTouch(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });

      it('should start the ripple when the mouse is pressed 2', async () => {
        render(
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

        const button = screen.getByRole('button');

        await ripple.startTouch(button);
        await ripple.stopTouch(button);

        await ripple.startTouch(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should stop the ripple when the button blurs', async () => {
        render(
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

        const button = screen.getByRole('button');
        await ripple.startTouch(button);

        await act(async () => button.blur());

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should restart the ripple when the mouse is pressed again', async () => {
        render(
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

        const button = screen.getByRole('button');

        await ripple.startTouch(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);

        await ripple.stopTouch(button);
        await ripple.startTouch(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should stop the ripple when the mouse leaves', async () => {
        render(
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

        const button = screen.getByRole('button');
        await ripple.asyncFireEvent(button, 'mouseDown');
        await ripple.asyncFireEvent(button, 'mouseLeave');

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });

      it.skipIf(!canFireDragEvents)(
        'should stop the ripple when dragging has finished',
        async function test() {
          render(
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

          const button = screen.getByRole('button');
          await ripple.asyncFireEvent(button, 'mouseDown');

          await ripple.asyncFireEvent(button, 'dragLeave');

          expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
          expect(
            button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
          ).to.have.lengthOf(0);
        },
      );

      it('should stop the ripple when the context menu opens', async () => {
        render(
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

        const button = screen.getByRole('button');
        await ripple.asyncFireEvent(button, 'mouseDown');

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);

        await ripple.asyncFireEvent(button, 'contextMenu');

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });

      it('should not crash when changes enableRipple from false to true', async () => {
        function App() {
          /** @type {React.RefObject<import('./ButtonBase').ButtonBaseActions | null>} */
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

        const { container } = render(<App />);

        await ripple.asyncFireEvent(screen.getByTestId('trigger'), 'click');
        expect(container.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(1);
      });

      it('should stop the ripple on blur if disableTouchRipple is set', async () => {
        const buttonActions = React.createRef();

        render(
          <ButtonBase
            action={buttonActions}
            focusRipple
            disableTouchRipple
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          >
            Test
          </ButtonBase>,
        );

        const button = screen.getByRole('button');

        simulatePointerDevice();
        await ripple.stopFocus(button);
        await ripple.startFocus(button);

        await ripple.stopFocus(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
      });
    });
  });

  describe('prop: centerRipple', () => {
    it('centers the TouchRipple', async () => {
      const { container } = render(
        <ButtonBase
          centerRipple
          TouchRippleProps={{ classes: { root: 'touch-ripple', ripple: 'touch-ripple-ripple' } }}
        >
          Hello
        </ButtonBase>,
      );
      await ripple.startTouch(screen.getByRole('button'));
      await ripple.stopTouch(screen.getByRole('button'));
      // @ts-expect-error: querySelector can return null, which prevents Sinon from inferring the element's methods.
      stub(container.querySelector('.touch-ripple'), 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 100,
        bottom: 10,
        left: 20,
        top: 20,
      }));

      await ripple.startTouch(screen.getByRole('button'), { clientX: 10, clientY: 10 });
      const rippleRipple = /** @type {Element} */ (container.querySelector('.touch-ripple-ripple'));
      expect(rippleRipple).not.to.equal(null);
      const rippleStyle = window.getComputedStyle(rippleRipple);
      expect(rippleStyle).to.have.property('height', '101px');
      expect(rippleStyle).to.have.property('width', '101px');
    });

    it('is disabled by default', async () => {
      const { container } = render(
        <ButtonBase
          TouchRippleProps={{ classes: { root: 'touch-ripple', ripple: 'touch-ripple-ripple' } }}
        >
          Hello
        </ButtonBase>,
      );
      await ripple.startTouch(screen.getByRole('button'));
      await ripple.stopTouch(screen.getByRole('button'));
      // @ts-expect-error: querySelector can return null, which prevents Sinon from inferring the element's methods.
      stub(container.querySelector('.touch-ripple'), 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 100,
        bottom: 10,
        left: 20,
        top: 20,
      }));
      await ripple.startTouch(screen.getByRole('button'), { clientX: 10, clientY: 10 });
      const rippleRipple = container.querySelector('.touch-ripple-ripple');
      expect(rippleRipple).not.to.equal(null);
      const rippleStyle = window.getComputedStyle(/** @type {Element} */ (rippleRipple));
      expect(rippleStyle).not.to.have.property('height', '101px');
      expect(rippleStyle).not.to.have.property('width', '101px');
    });
  });

  describe.skipIf(isJsdom())('focusRipple', () => {
    it('should pulsate the ripple when focusVisible', async () => {
      render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              ripplePulsate: 'ripple-pulsate',
            },
          }}
        />,
      );

      const button = screen.getByRole('button');

      simulatePointerDevice();
      await ripple.startFocus(button);

      expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(1);
    });

    it('should not stop the ripple when the mouse leaves', async () => {
      render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              ripplePulsate: 'ripple-pulsate',
            },
          }}
        />,
      );

      const button = screen.getByRole('button');

      simulatePointerDevice();
      await ripple.startFocus(button);
      await ripple.asyncFireEvent(button, 'mouseLeave');

      expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(1);
    });

    it('should stop pulsate and start a ripple when the space button is pressed', async () => {
      render(
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

      const button = screen.getByRole('button');

      simulatePointerDevice();
      await ripple.startFocus(button);
      await ripple.asyncFireEvent(button, 'keyDown', { key: ' ' });

      expect(button.querySelectorAll('.ripple-pulsate .child-leaving')).to.have.lengthOf(1);
      expect(button.querySelectorAll('.ripple-visible')).to.have.lengthOf(0);
    });

    it('should stop and re-pulsate when space bar is released', async () => {
      render(
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

      const button = screen.getByRole('button');

      simulatePointerDevice();
      await ripple.startFocus(button);
      expect(button.querySelectorAll('.ripple-visible')).to.have.lengthOf(1);

      await ripple.asyncFireEvent(button, 'keyDown', { key: ' ' });
      expect(button.querySelectorAll('.ripple-visible')).to.have.lengthOf(2);

      await ripple.asyncFireEvent(button, 'keyUp', { key: ' ' });
      expect(button.querySelectorAll('.ripple-visible')).to.have.lengthOf(3);
    });

    it('should stop on blur and set focusVisible to false', async () => {
      render(
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

      const button = screen.getByRole('button');
      simulatePointerDevice();
      await ripple.startFocus(button);

      await ripple.stopFocus(button);

      expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
    });
  });

  describe('prop: disabled', () => {
    it('should have a negative tabIndex', () => {
      render(<ButtonBase disabled>Hello</ButtonBase>);
      expect(screen.getByText('Hello')).to.have.property('tabIndex', -1);
    });

    it('should forward it to native buttons', () => {
      render(
        <ButtonBase disabled component="button">
          Hello
        </ButtonBase>,
      );

      expect(screen.getByText('Hello')).to.have.property('disabled', true);
    });

    // JSDOM doesn't support :focus-visible
    it.skipIf(isJsdom())('should reset the focused state', function test() {
      const { setProps } = render(<ButtonBase>Hello</ButtonBase>);
      const button = screen.getByText('Hello');
      simulatePointerDevice();

      focusVisible(button);

      expect(button).to.have.class(classes.focusVisible);

      setProps({ disabled: true });

      expect(button).not.to.have.class(classes.focusVisible);
    });

    it('should not use aria-disabled with button host', () => {
      render(<ButtonBase disabled>Hello</ButtonBase>);
      const button = screen.getByRole('button');

      expect(button).to.have.attribute('disabled');
      expect(button).not.to.have.attribute('aria-disabled');
    });

    it('should use aria-disabled for other components', () => {
      const { setProps } = render(
        <ButtonBase component="span" disabled>
          Hello
        </ButtonBase>,
      );
      const button = screen.getByRole('button');

      expect(button).not.to.have.attribute('disabled');
      expect(button).to.have.attribute('aria-disabled', 'true');

      setProps({ disabled: false });
      expect(button).not.to.have.attribute('aria-disabled');
    });

    it('should not call key handlers on a disabled non-native button', async () => {
      const onKeyDownSpy = spy();
      const onKeyUpSpy = spy();

      const { user } = render(
        <ButtonBase component="span" disabled onKeyDown={onKeyDownSpy} onKeyUp={onKeyUpSpy}>
          Hello
        </ButtonBase>,
      );

      const button = screen.getByRole('button');

      await act(async () => {
        button.focus();
      });

      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      await user.keyboard('{Space}');

      expect(onKeyDownSpy.callCount).to.equal(0);
      expect(onKeyUpSpy.callCount).to.equal(0);
    });

    it('should not propagate click events when Space is released on a disabled non-native button', async () => {
      const parentClickSpy = spy();
      const buttonClickSpy = spy();

      const { user } = render(
        <div onClick={parentClickSpy}>
          <ButtonBase component="span" disabled onClick={buttonClickSpy}>
            Hello
          </ButtonBase>
        </div>,
      );

      const button = screen.getByRole('button');

      // We don't use `user.tab()` because normal tab focus won't land on a disabled
      // ButtonBase, only programmatic focus can happen
      await act(async () => {
        button.focus();
      });

      await user.keyboard(' ');

      expect(buttonClickSpy.callCount).to.equal(0);
      expect(parentClickSpy.callCount).to.equal(0);
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
      render(
        <ButtonBase component={Link} nativeButton={false}>
          Hello
        </ButtonBase>,
      );

      expect(screen.getByTestId('link')).to.have.attribute('role', 'button');
    });
  });

  describe('prop: nativeButton', () => {
    it('treats custom components as native buttons for render-time props', () => {
      const CustomButton = React.forwardRef((props, ref) => <button ref={ref} {...props} />);

      render(
        <ButtonBase component={CustomButton} nativeButton disabled>
          Hello
        </ButtonBase>,
      );

      const button = screen.getByRole('button');

      expect(button).to.have.property('nodeName', 'BUTTON');
      expect(button).to.have.attribute('type', 'button');
      expect(button).to.have.attribute('disabled');
      expect(button).not.to.have.attribute('role');
      expect(button).not.to.have.attribute('aria-disabled');
    });
  });

  describe('event: focus', () => {
    it('when disabled should be called onFocus', async () => {
      const onFocusSpy = spy();

      render(
        <ButtonBase component="div" disabled onFocus={onFocusSpy}>
          Hello
        </ButtonBase>,
      );

      await act(async () => {
        screen.getByRole('button').focus();
      });

      expect(onFocusSpy.callCount).to.equal(1);
    });

    // JSDOM doesn't support :focus-visible
    it.skipIf(isJsdom())('has a focus-visible polyfill', async function test() {
      render(<ButtonBase>Hello</ButtonBase>);
      const button = screen.getByText('Hello');
      simulatePointerDevice();

      expect(button).not.to.have.class(classes.focusVisible);

      await act(async () => {
        button.focus();
      });

      if (programmaticFocusTriggersFocusVisible()) {
        expect(button).to.have.class(classes.focusVisible);
      } else {
        expect(button).not.to.have.class(classes.focusVisible);
      }

      focusVisible(button);

      expect(button).to.have.class(classes.focusVisible);
    });

    // JSDOM doesn't support :focus-visible
    it.skipIf(isJsdom())('can suppress the focus-visible state', async function test() {
      render(
        // @ts-expect-error internal prop used by MenuItem
        <ButtonBase suppressFocusVisible focusVisibleClassName="focusVisible">
          Hello
        </ButtonBase>,
      );

      const button = screen.getByText('Hello');

      focusVisible(button);

      expect(button).toHaveFocus();
      expect(button).not.to.have.class(classes.focusVisible);
      expect(button).not.to.match('.focusVisible');
    });

    // JSDOM doesn't support :focus-visible
    it.skipIf(isJsdom())('removes focus-visible if focus is re-targetted', function test() {
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
                throw new TypeError('Nothing to focus. Test cannot work.');
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
      render(<Test />);
      const buttonBase = screen.getByText('Hello');
      const focusRetarget = screen.getByText('you cannot escape me');
      simulatePointerDevice();

      focusVisible(buttonBase);

      expect(focusRetarget).toHaveFocus();
      expect(eventLog).to.deep.equal(['focus-visible', 'focus', 'blur']);
      expect(buttonBase).not.to.have.class(classes.focusVisible);
    });

    // JSDOM doesn't support :focus-visible
    it.skipIf(isJsdom())(
      'onFocusVisibleHandler() should propagate call to onFocusVisible prop',
      function test() {
        const onFocusVisibleSpy = spy();

        render(
          <ButtonBase component="span" onFocusVisible={onFocusVisibleSpy}>
            Hello
          </ButtonBase>,
        );

        simulatePointerDevice();

        focusVisible(screen.getByRole('button'));

        expect(onFocusVisibleSpy.calledOnce).to.equal(true);
        expect(onFocusVisibleSpy.firstCall.args).to.have.lengthOf(1);
      },
    );

    it('can be autoFocused', () => {
      render(<ButtonBase autoFocus>Hello</ButtonBase>);

      expect(screen.getByText('Hello')).toHaveFocus();
    });
  });

  describe.skipIf(isJsdom())('event: keydown', () => {
    it('ripples on repeated keydowns', async () => {
      const { container } = render(
        <ButtonBase focusRipple TouchRippleProps={{ classes: { rippleVisible: 'ripple-visible' } }}>
          Hello
        </ButtonBase>,
      );

      const button = screen.getByText('Hello');

      await ripple.startFocus(button);

      fireEvent.keyDown(button, { key: 'Enter' });

      expect(container.querySelectorAll('.ripple-visible')).to.have.lengthOf(1);

      fireEvent.keyDown(button, { key: 'Enter', repeat: true });

      expect(container.querySelectorAll('.ripple-visible')).to.have.lengthOf(1);
    });

    describe('prop: onKeyDown', () => {
      it('call it when keydown events are dispatched', () => {
        const onKeyDownSpy = spy();

        render(
          <ButtonBase autoFocus onKeyDown={onKeyDownSpy}>
            Hello
          </ButtonBase>,
        );

        fireEvent.keyDown(screen.getByText('Hello'));

        expect(onKeyDownSpy.callCount).to.equal(1);
      });
    });

    describe('prop: disableTouchRipple', () => {
      it('creates no ripples on click', async () => {
        render(
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

        const button = screen.getByText('Hello');

        await ripple.startTouch(button);

        expect(button).not.to.have.class('ripple-visible');
      });
    });

    describe('prop: disableRipple', () => {
      it('removes the TouchRipple', async () => {
        render(
          <ButtonBase disableRipple focusRipple TouchRippleProps={{ className: 'touch-ripple' }}>
            Hello
          </ButtonBase>,
        );

        const button = screen.getByText('Hello');

        await ripple.startTouch(button);

        expect(button.querySelector('.touch-ripple')).to.equal(null);
      });
    });

    describe('2.1.1 Keyboard: keyboard accessibility for non interactive elements', () => {
      it('does not call onClick when a spacebar is pressed on the element but prevents the default', async () => {
        const onKeyDown = spy();
        const onClickSpy = spy();

        render(
          <ButtonBase onClick={onClickSpy} onKeyDown={onKeyDown} component="div">
            Hello
          </ButtonBase>,
        );

        const button = screen.getByRole('button');

        await act(async () => {
          button.focus();
        });

        fireEvent.keyDown(button, {
          key: ' ',
        });

        expect(onClickSpy.callCount).to.equal(0);
        expect(onKeyDown.callCount).to.equal(1);
        expect(onKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
      });

      it('does call onClick when a spacebar is released on the element', async () => {
        const onClickSpy = spy();

        render(
          <ButtonBase onClick={onClickSpy} component="div">
            Hello
          </ButtonBase>,
        );

        const button = screen.getByRole('button');

        await act(async () => {
          button.focus();
        });

        fireEvent.keyUp(button, {
          key: ' ',
        });

        expect(onClickSpy.callCount).to.equal(1);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });

      it('does not call onClick when a spacebar is released and the default is prevented', async () => {
        const onClickSpy = spy();

        render(
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

        const button = screen.getByRole('button');

        await act(async () => {
          button.focus();
        });

        fireEvent.keyUp(button, {
          key: ' ',
        });

        expect(onClickSpy.callCount).to.equal(0);
      });

      it('calls onKeyDown and onClick when Enter is pressed on the element', async () => {
        const onClickSpy = spy();
        const onKeyDownSpy = spy();

        const { user } = render(
          <ButtonBase onClick={onClickSpy} onKeyDown={onKeyDownSpy} component="div">
            Hello
          </ButtonBase>,
        );

        await user.tab();
        await user.keyboard('{Enter}');

        expect(onKeyDownSpy.calledOnce).to.equal(true);
        expect(onKeyDownSpy.firstCall.args[0]).to.have.property('defaultPrevented', true);
        expect(onClickSpy.calledOnce).to.equal(true);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });

      it('calls onKeyDown and onClick when Spacebar is pressed on the element', async () => {
        const onClickSpy = spy();
        const onKeyDownSpy = spy();

        const { user } = render(
          <ButtonBase onClick={onClickSpy} onKeyDown={onKeyDownSpy} component="div">
            Hello
          </ButtonBase>,
        );

        await user.tab();
        await user.keyboard(' ');

        expect(onKeyDownSpy.calledOnce).to.equal(true);
        expect(onKeyDownSpy.firstCall.args[0]).to.have.property('defaultPrevented', true);
        expect(onClickSpy.calledOnce).to.equal(true);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', false);
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

      it('should preserve native button keyboard behavior when a custom component renders a native button', async () => {
        const onClickSpy = spy();
        const onKeyDownSpy = spy();
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const MyButton = React.forwardRef(function MyButton(props, ref) {
          return <button ref={ref} {...props} />;
        });

        const { user } = render(
          // @ts-expect-error missing types in MyButton
          <ButtonBase component={MyButton} onClick={onClickSpy} onKeyDown={onKeyDownSpy}>
            Hello
          </ButtonBase>,
        );

        await user.tab();

        await user.keyboard('{Enter}');

        expect(onKeyDownSpy.callCount).to.equal(1);
        expect(onClickSpy.callCount).to.equal(1);
        expect(onKeyDownSpy.firstCall.args[0]).to.have.property('defaultPrevented', false);

        onClickSpy.resetHistory();
        onKeyDownSpy.resetHistory();

        await user.keyboard(' ');

        expect(onKeyDownSpy.callCount).to.equal(1);
        expect(onClickSpy.callCount).to.equal(1);
        expect(onKeyDownSpy.firstCall.args[0]).to.have.property('defaultPrevented', false);
        errorSpy.mockRestore();
      });

      it('prevents default on Enter with an anchor and empty href', async () => {
        const onClickSpy = spy();
        const onKeyDownSpy = spy();

        const { user } = render(
          <ButtonBase component="a" onKeyDown={onKeyDownSpy} onClick={onClickSpy}>
            Hello
          </ButtonBase>,
        );

        await user.tab();
        await user.keyboard('{Enter}');

        expect(onKeyDownSpy.calledOnce).to.equal(true);
        expect(onKeyDownSpy.firstCall.args[0]).to.have.property('defaultPrevented', true);
        expect(onClickSpy.calledOnce).to.equal(true);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });

      it('prevents default on Spacebar with an anchor and empty href', async () => {
        const onClickSpy = spy();
        const onKeyDownSpy = spy();

        const { user } = render(
          <ButtonBase component="a" onKeyDown={onKeyDownSpy} onClick={onClickSpy}>
            Hello
          </ButtonBase>,
        );

        await user.tab();
        await user.keyboard(' ');

        expect(onKeyDownSpy.calledOnce).to.equal(true);
        expect(onKeyDownSpy.firstCall.args[0]).to.have.property('defaultPrevented', true);
        expect(onClickSpy.calledOnce).to.equal(true);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });

      it('should ignore anchors with href', async () => {
        const onClick = spy();
        const onKeyDown = spy();

        render(
          <ButtonBase component="a" href="href" onClick={onClick} onKeyDown={onKeyDown}>
            Hello
          </ButtonBase>,
        );

        const button = screen.getByText('Hello');

        await act(async () => {
          button.focus();
        });

        fireEvent.keyDown(button, {
          key: 'Enter',
        });

        expect(onClick.callCount).to.equal(0);
        expect(onKeyDown.callCount).to.equal(1);
        expect(onKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });

      it('should ignore custom link components that render anchors with href', async () => {
        const onClick = spy();
        const onKeyDown = spy();
        const CustomLink = React.forwardRef((props, ref) => (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a ref={ref} {...props} />
        ));

        render(
          // @ts-expect-error missing types in CustomLink
          <ButtonBase component={CustomLink} href="href" onClick={onClick} onKeyDown={onKeyDown}>
            Hello
          </ButtonBase>,
        );

        const button = screen.getByText('Hello');

        await act(async () => {
          button.focus();
        });

        fireEvent.keyDown(button, {
          key: 'Enter',
        });

        expect(onClick.callCount).to.equal(0);
        expect(onKeyDown.callCount).to.equal(1);
        expect(onKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });
    });
  });

  describe.skipIf(isJsdom())('prop: action', () => {
    it('should be able to focus visible the button', async () => {
      /**
       * @type {React.RefObject<import('./ButtonBase').ButtonBaseActions | null>}
       */
      const buttonActionsRef = React.createRef();

      render(
        <ButtonBase action={buttonActionsRef} focusVisibleClassName="focusVisible">
          Hello
        </ButtonBase>,
      );

      expect(
        typeof (/** @type {ButtonBaseActions} */ (buttonActionsRef.current).focusVisible),
      ).to.equal('function');

      await act(async () => {
        /** @type {ButtonBaseActions} */ (buttonActionsRef.current).focusVisible();
      });

      expect(screen.getByText('Hello')).toHaveFocus();
      expect(screen.getByText('Hello')).to.match('.focusVisible');
    });
  });

  describe('warnings', () => {
    /**
     * @param {{ mock: { calls: unknown[][] } }} errorSpy
     * @returns {string[]}
     */
    function getWarningMessages(errorSpy) {
      return errorSpy.mock.calls.map((call) =>
        String(call[0]).replace(/\s+/g, ' ').trim().toLowerCase(),
      );
    }

    /**
     * @param {{ mock: { calls: unknown[][] } }} errorSpy
     * @param {string[]} fragments
     */
    function expectWarningWithFragments(errorSpy, fragments) {
      const messages = getWarningMessages(errorSpy);

      expect(messages.length).to.be.greaterThanOrEqual(1);
      expect(
        messages.some((message) =>
          fragments.every((fragment) => message.includes(fragment.toLowerCase())),
        ),
      ).to.equal(true);
    }

    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warns when nativeButton is omitted and a custom component renders a button', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const CustomButton = React.forwardRef((props, ref) => <button ref={ref} {...props} />);

      render(<ButtonBase component={CustomButton}>Hello</ButtonBase>);

      expectWarningWithFragments(errorSpy, ['nativebutton={true}', 'native <button>']);
      errorSpy.mockRestore();
    });

    it('does not warn in link mode when nativeButton is omitted', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<ButtonBase href="/test">Hello</ButtonBase>);

      const messages = getWarningMessages(errorSpy);
      expect(messages.some((message) => message.includes('nativebutton={false}'))).to.equal(false);
      errorSpy.mockRestore();
    });

    // Only run the test on node. On the browser the thrown error is not caught
    it.skipIf(!isJsdom())('warns on invalid `component` prop: ref forward', function test() {
      /**
       *
       * @param {import('react').HTMLAttributes<HTMLButtonElement>} props
       */
      function Component(props) {
        return <button type="button" {...props} />;
      }

      expect(() => {
        PropTypes.checkPropTypes(
          ButtonBase.propTypes,
          { classes: {}, component: Component },
          'prop',
          'MockedName',
        );
      }).toErrorDev(
        'Invalid prop `component` supplied to `MockedName`. Expected an element type that can hold a ref',
      );
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
      render(
        <ButtonBase component={CustomButton} nativeButton type="reset">
          Hello
        </ButtonBase>,
      );

      expect(screen.getByRole('button')).to.have.property('type', 'reset');
    });
  });

  describe('prop: touchRippleRef', () => {
    it('should return a ref', async () => {
      const ref = React.createRef();
      render(<ButtonBase touchRippleRef={ref} />);
      await ripple.startTouch(screen.getByRole('button'));
      expect(ref.current).not.to.equal(null);
    });
  });

  describe('form attributes', () => {
    it.skipIf(isJsdom() || reactMajor < 19)(
      'should not set default type when formAction is present',
      async function test() {
        const formActionSpy = spy();
        const { user } = render(
          <form>
            <ButtonBase formAction={formActionSpy}>Submit</ButtonBase>
          </form>,
        );
        const button = screen.getByRole('button');

        // Should not have type="button" when formAction is present
        expect(button).not.to.have.attribute('type', 'button');
        expect(button).to.have.attribute('formaction');
        await user.click(button);
        expect(formActionSpy.callCount).to.equal(1);
      },
    );

    it.skipIf(isJsdom() || reactMajor < 19)(
      'should not set default type when formAction is present on a custom native button',
      async function test() {
        const formActionSpy = spy();
        const CustomButton = React.forwardRef((props, ref) => <button ref={ref} {...props} />);
        const buttonBase = (
          // @ts-expect-error missing types in CustomButton
          <ButtonBase component={CustomButton} nativeButton formAction={formActionSpy}>
            Submit
          </ButtonBase>
        );
        const { user } = render(<form>{buttonBase}</form>);
        const button = screen.getByRole('button');

        expect(button).not.to.have.attribute('type', 'button');
        expect(button).to.have.attribute('formaction');
        await user.click(button);
        expect(formActionSpy.callCount).to.equal(1);
      },
    );
  });

  describe('theme.focusVisible', () => {
    /**
     * @param {boolean | import('react').CSSProperties | undefined} value
     */
    function focusVisibleButton(value) {
      render(
        <ThemeProvider theme={createTheme({ focusVisible: value })}>
          <ButtonBase>Hello</ButtonBase>
        </ThemeProvider>,
      );
      const button = screen.getByText('Hello');
      simulatePointerDevice();
      focusVisible(button);
      return button;
    }

    it.skipIf(isJsdom())(
      'renders the curated ring on focus-visible when focusVisible is set',
      () => {
        const button = focusVisibleButton(true);
        expect(button).to.have.class(classes.focusVisible);
        expect(button).toHaveComputedStyle({
          outlineStyle: 'solid',
          outlineWidth: '2px',
          outlineOffset: '2px',
        });
      },
    );

    it.skipIf(isJsdom())('renders no ring when focusVisible is unset (non-breaking)', () => {
      const button = focusVisibleButton(undefined);
      expect(button).toHaveComputedStyle({ outlineStyle: 'none' });
    });

    it.skipIf(isJsdom())('leaves a user box-shadow outset on a non-clip-prone component', () => {
      // createTheme prepends the behavior var; on a bare ButtonBase it is unset, so it stays outset
      const button = focusVisibleButton({ boxShadow: '0 0 0 3px rgb(255, 0, 0)' });
      expect(window.getComputedStyle(button).boxShadow).not.to.match(/inset/);
    });

    it.skipIf(isJsdom())('an object recolors the ring but keeps the curated geometry', () => {
      const button = focusVisibleButton({ outlineColor: 'rgb(255, 0, 0)' });
      expect(button).toHaveComputedStyle({
        outlineStyle: 'solid',
        outlineColor: 'rgb(255, 0, 0)',
        outlineWidth: '2px',
        outlineOffset: '2px',
      });
    });

    it.skipIf(isJsdom())('`outlineColor: transparent` removes the visible outline', () => {
      const button = focusVisibleButton({ outlineColor: 'transparent' });
      expect(button).toHaveComputedStyle({ outlineColor: 'rgba(0, 0, 0, 0)' });
    });
  });
});
