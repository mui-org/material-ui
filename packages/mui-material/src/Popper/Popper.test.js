import { describe, beforeAll, afterAll, it, expect, vi } from 'vitest';
import * as React from 'react';
import { createRenderer, fireEvent, screen, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import describeConformance from '../../test/describeConformance';

describe('<Popper />', () => {
  let rtlTheme;
  const { clock, render } = createRenderer({ clock: 'fake' });

  let defaultAnchorElm = null;

  const defaultProps = {
    anchorEl: () => defaultAnchorElm,
    children: <span>Hello World</span>,
    open: true,
  };

  beforeAll(() => {
    rtlTheme = createTheme({
      direction: 'rtl',
    });
    defaultAnchorElm = document.createElement('div');
    document.body.appendChild(defaultAnchorElm);
  });

  afterAll(() => {
    document.body.removeChild(defaultAnchorElm);
  });

  describeConformance(<Popper {...defaultProps} />, () => ({
    classes: {},
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    slots: {
      root: {},
    },
    skip: [
      'componentProp',
      'themeDefaultProps',
      'themeStyleOverrides',
      'themeVariants',
      'slotPropsCallback', // not supported yet
      'slotPropsCallbackWithPropsAsOwnerState', // not supported yet
    ],
  }));

  describe('prop: placement', () => {
    it('should have top placement', () => {
      render(
        <Popper {...defaultProps} placement="top">
          {({ placement }) => {
            return <span data-testid="renderSpy" data-placement={placement} />;
          }}
        </Popper>,
      );

      expect(screen.getByTestId('renderSpy')).to.have.attribute('data-placement', 'top');
    });

    [
      {
        in: 'bottom-end',
        out: 'bottom-start',
      },
      {
        in: 'bottom-start',
        out: 'bottom-end',
      },
      {
        in: 'top-end',
        out: 'top-start',
      },
      {
        in: 'top-start',
        out: 'top-end',
      },
      {
        in: 'top',
        out: 'top',
      },
    ].forEach((test) => {
      it(`should ${test.in === test.out ? 'not ' : ''}flip ${
        test.in
      } when direction=rtl is used`, () => {
        function Test() {
          const [anchorEl, setAnchorEl] = React.useState(null);

          return (
            <ThemeProvider theme={rtlTheme}>
              <div style={{ margin: '5em' }} ref={setAnchorEl} />
              <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} placement={test.in}>
                {({ placement }) => {
                  return <div data-testid="placement">{placement}</div>;
                }}
              </Popper>
            </ThemeProvider>
          );
        }
        render(<Test />);

        expect(screen.getByTestId('placement')).to.have.text(test.out);
      });
    });

    // JSDOM has no layout engine so PopperJS doesn't know that it should flip the placement.
    it.skipIf(isJsdom())('should flip placement when edge is reached', async function test() {
      const popperRef = React.createRef();
      render(
        <Popper popperRef={popperRef} {...defaultProps} placement="bottom">
          {({ placement }) => {
            return <div data-testid="placement">{placement}</div>;
          }}
        </Popper>,
      );
      expect(screen.getByTestId('placement')).to.have.text('bottom');

      await popperRef.current.setOptions({ placement: 'top' });

      expect(screen.getByTestId('placement')).to.have.text('bottom');
    });
  });

  describe('prop: open', () => {
    it('should open without any issue', () => {
      const { setProps } = render(<Popper {...defaultProps} open={false} />);
      expect(screen.queryByRole('tooltip')).to.equal(null);
      setProps({ open: true });
      expect(screen.getByRole('tooltip')).to.have.text('Hello World');
    });

    it('should close without any issue', () => {
      const { setProps } = render(<Popper {...defaultProps} />);
      expect(screen.getByRole('tooltip')).to.have.text('Hello World');
      setProps({ open: false });
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });
  });

  describe('prop: popperOptions', () => {
    it('should pass all popperOptions to popperjs', () => {
      const popperRef = React.createRef();
      const { setProps } = render(
        <Popper {...defaultProps} popperRef={popperRef} placement="top" open />,
      );

      setProps({
        popperOptions: {
          placement: 'bottom',
        },
      });

      expect(popperRef.current.state.placement).to.equal('bottom');
    });

    // Regression test for https://github.com/mui/mui-x/issues/21839
    it.skipIf(isJsdom())(
      'should keep the Popper positioned when popperOptions reference changes',
      () => {
        // Models a child (e.g. MUI X YearCalendar button) that auto-focuses on
        // mount. Its layout effect runs after the Popper's cleanup (popper.destroy())
        // but before the Popper's new effect (createPopper()), so it observes the
        // intermediate DOM state between the two.
        function AutoFocusButton() {
          const buttonRef = React.useRef(null);
          React.useLayoutEffect(() => {
            const popper = document.querySelector('[role="tooltip"]');
            expect(getComputedStyle(popper).position).to.not.equal('static');
            buttonRef.current?.focus();
          });
          return <button ref={buttonRef}>Calendar button</button>;
        }

        // Simulates a date picker where switching views (day → year) both mounts
        // a new auto-focusing child and changes the popperOptions reference.
        function DatePickerLike() {
          const [view, setView] = React.useState('day');
          return (
            <React.Fragment>
              <button type="button" onClick={() => setView('year')}>
                Switch to year view
              </button>
              <Popper
                anchorEl={() => defaultAnchorElm}
                open
                popperOptions={view === 'year' ? { placement: 'top' } : { placement: 'bottom' }}
              >
                {view === 'year' ? <AutoFocusButton /> : <span>Day view</span>}
              </Popper>
            </React.Fragment>
          );
        }

        render(<DatePickerLike />);

        // Note: using fireEvent instead of user.click() because this test file
        // uses fake timers (clock: 'fake'), which causes user.click() to hang.
        fireEvent.click(screen.getByRole('button', { name: 'Switch to year view' }));

        // Guard: verify AutoFocusButton actually mounted and its effect ran,
        // otherwise the expect inside the layout effect was silently skipped.
        expect(document.activeElement).to.equal(
          screen.getByRole('button', { name: 'Calendar button' }),
        );
      },
    );
  });

  describe('prop: keepMounted', () => {
    it('should keep the children mounted in the DOM', () => {
      render(<Popper {...defaultProps} keepMounted open={false} />);
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).to.have.text('Hello World');
      expect(tooltip.style.display).to.equal('none');
    });

    describe('by default', () => {
      // Test case for https://github.com/mui/material-ui/issues/15180
      it('should remove the transition children in the DOM when closed whilst transition status is entering', () => {
        const children = <p>Hello World</p>;

        class OpenClose extends React.Component {
          state = {
            open: false,
          };

          handleClick = () => {
            this.setState({ open: true }, () => {
              this.setState({ open: false });
            });
          };

          render() {
            return (
              <div>
                <button type="button" onClick={this.handleClick}>
                  Toggle Tooltip
                </button>
                <Popper {...defaultProps} open={this.state.open} transition>
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                      <span>{children}</span>
                    </Grow>
                  )}
                </Popper>
              </div>
            );
          }
        }

        render(<OpenClose />);
        expect(document.querySelector('p')).to.equal(null);
        fireEvent.click(screen.getByRole('button'));
        expect(document.querySelector('p')).to.equal(null);
      });
    });
  });

  describe('prop: transition', () => {
    clock.withFakeTimers();

    it('should work', () => {
      const { setProps } = render(
        <Popper {...defaultProps} transition>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <span>Hello World</span>
            </Grow>
          )}
        </Popper>,
      );

      expect(screen.getByRole('tooltip')).to.have.text('Hello World');

      setProps({ anchorEl: null, open: false });
      clock.tick(0);

      expect(screen.queryByRole('tooltip')).to.equal(null);
    });

    it('opens on the next task when reduced motion is always', () => {
      const handleEntered = vi.fn();
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      function Test(props) {
        return (
          <ThemeProvider theme={theme}>
            <Popper {...defaultProps} open={props.open} transition>
              {({ TransitionProps }) => (
                <Grow {...TransitionProps} timeout={250} onEntered={handleEntered}>
                  <span>Hello World</span>
                </Grow>
              )}
            </Popper>
          </ThemeProvider>
        );
      }

      const { setProps } = render(<Test open={false} />);

      setProps({ open: true });

      expect(handleEntered).toHaveBeenCalledTimes(0);
      clock.tick(0);
      expect(handleEntered).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('tooltip')).to.have.text('Hello World');
    });

    it('allows transition slot props to opt out of reduced motion', () => {
      const handleEntered = vi.fn();
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      function Test(props) {
        return (
          <ThemeProvider theme={theme}>
            <Popper {...defaultProps} open={props.open} transition>
              {({ TransitionProps }) => (
                <Grow
                  {...TransitionProps}
                  timeout={250}
                  onEntered={handleEntered}
                  disablePrefersReducedMotion
                >
                  <span>Hello World</span>
                </Grow>
              )}
            </Popper>
          </ThemeProvider>
        );
      }

      const { setProps } = render(<Test open={false} />);

      setProps({ open: true });

      expect(handleEntered).toHaveBeenCalledTimes(0);
      clock.tick(0);
      expect(handleEntered).toHaveBeenCalledTimes(0);
      clock.tick(250);
      expect(handleEntered).toHaveBeenCalledTimes(1);
    });
  });

  describe('prop: popperRef', () => {
    it('should return a ref', () => {
      const ref1 = React.createRef();
      const ref2 = React.createRef();
      const { setProps } = render(<Popper {...defaultProps} popperRef={ref1} />);
      expect(ref1.current).not.to.equal(null);
      setProps({
        popperRef: ref2,
      });
      expect(ref1.current).to.equal(null);
      expect(ref2.current).not.to.equal(null);
    });
  });

  describe('prop: disablePortal', () => {
    it('should work', () => {
      const popperRef = React.createRef();

      render(<Popper {...defaultProps} disablePortal popperRef={popperRef} />);

      // renders
      expect(screen.getByRole('tooltip')).not.to.equal(null);
      // correctly sets modifiers
      expect(popperRef.current.state.options.modifiers[0].options.altBoundary).to.equal(true);
    });

    it('sets preventOverflow altBoundary to false when disablePortal is false', () => {
      const popperRef = React.createRef();
      render(<Popper {...defaultProps} popperRef={popperRef} />);
      // renders
      expect(screen.getByRole('tooltip')).not.to.equal(null);
      // correctly sets modifiers
      expect(popperRef.current.state.options.modifiers[0].options.altBoundary).to.equal(false);
    });
  });

  describe('display', () => {
    clock.withFakeTimers();

    it('should keep display:none when not toggled and transition/keepMounted/disablePortal props are set', () => {
      const { setProps } = render(
        <Popper {...defaultProps} open={false} keepMounted transition disablePortal>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <span>Hello World</span>
            </Grow>
          )}
        </Popper>,
      );

      expect(screen.getByRole('tooltip', { hidden: true }).style.display).to.equal('none');

      setProps({ open: true });
      clock.tick(0);

      setProps({ open: false });
      clock.tick(0);
      expect(screen.getByRole('tooltip', { hidden: true }).style.display).to.equal('none');
    });
  });

  describe('default props', () => {
    it('should consume theme default props', () => {
      const container = document.createElement('div');
      const theme = createTheme({ components: { MuiPopper: { defaultProps: { container } } } });
      render(
        <ThemeProvider theme={theme}>
          <Popper {...defaultProps} open>
            <p id="content">Hello World</p>
          </Popper>
        </ThemeProvider>,
      );

      expect(container).to.have.text('Hello World');
    });
  });
});
