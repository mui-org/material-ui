import * as React from 'react';
import { expect } from 'chai';
import { useFakeTimers } from 'sinon';
import PropTypes from 'prop-types';
import { describeConformance, act, createClientRender, fireEvent, screen } from 'test/utils';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';

describe('<Popper />', () => {
  let rtlTheme;
  const render = createClientRender();
  const defaultProps = {
    anchorEl: () => document.createElement('svg'),
    children: <span>Hello World</span>,
    open: true,
  };

  before(() => {
    rtlTheme = createTheme({
      direction: 'rtl',
    });
  });

  describeConformance(<Popper {...defaultProps} />, () => ({
    classes: {},
    inheritComponent: 'div',
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // https://github.com/facebook/react/issues/11565
      'reactTestRenderer',
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
      it(`should ${test.in === test.out ? 'not' : ''}flip ${
        test.in
      } when direction=rtl is used`, () => {
        render(
          <ThemeProvider theme={rtlTheme}>
            <Popper {...defaultProps} placement={test.in}>
              {({ placement }) => {
                return <div data-testid="placement">{placement}</div>;
              }}
            </Popper>
            ,
          </ThemeProvider>,
        );
        expect(screen.getByTestId('placement')).to.have.text(test.out);
      });
    });

    it('should flip placement when edge is reached', async function test() {
      // JSDOM has no layout engine so PopperJS doesn't know that it should flip the placement.
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const popperRef = React.createRef();
      render(
        <Popper popperRef={popperRef} {...defaultProps} placement="bottom">
          {({ placement }) => {
            return <div data-testid="placement">{placement}</div>;
          }}
        </Popper>,
      );
      expect(screen.getByTestId('placement')).to.have.text('bottom');

      await act(async () => {
        await popperRef.current.setOptions({ placement: 'top' });
      });

      expect(screen.getByTestId('placement')).to.have.text('bottom');
    });
  });

  describe('prop: open', () => {
    it('should open without any issue', () => {
      const { queryByRole, getByRole, setProps } = render(
        <Popper {...defaultProps} open={false} />,
      );
      expect(queryByRole('tooltip')).to.equal(null);
      setProps({ open: true });
      expect(getByRole('tooltip')).to.have.text('Hello World');
    });

    it('should close without any issue', () => {
      const { queryByRole, getByRole, setProps } = render(<Popper {...defaultProps} />);
      expect(getByRole('tooltip')).to.have.text('Hello World');
      setProps({ open: false });
      expect(queryByRole('tooltip')).to.equal(null);
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
  });

  describe('prop: keepMounted', () => {
    it('should keep the children mounted in the DOM', () => {
      render(<Popper {...defaultProps} keepMounted open={false} />);
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).to.have.text('Hello World');
      expect(tooltip.style.display).to.equal('none');
    });

    describe('by default', () => {
      // Test case for https://github.com/mui-org/material-ui/issues/15180
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

        const { getByRole } = render(<OpenClose />);
        expect(document.querySelector('p')).to.equal(null);
        fireEvent.click(getByRole('button'));
        expect(document.querySelector('p')).to.equal(null);
      });
    });
  });

  describe('prop: transition', () => {
    let clock;
    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should work', () => {
      const { queryByRole, getByRole, setProps } = render(
        <Popper {...defaultProps} transition>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <span>Hello World</span>
            </Grow>
          )}
        </Popper>,
      );

      expect(getByRole('tooltip')).to.have.text('Hello World');

      setProps({ anchorEl: null, open: false });
      act(() => {
        clock.tick(0);
      });

      expect(queryByRole('tooltip')).to.equal(null);
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
      const { getByRole } = render(
        <Popper {...defaultProps} disablePortal popperRef={popperRef} />,
      );
      // renders
      expect(getByRole('tooltip')).not.to.equal(null);
      // correctly sets modifiers
      expect(popperRef.current.state.options.modifiers[0].options.altBoundary).to.equal(true);
    });

    it('sets preventOverflow altBoundary to false when disablePortal is false', () => {
      const popperRef = React.createRef();
      const { getByRole } = render(<Popper {...defaultProps} popperRef={popperRef} />);
      // renders
      expect(getByRole('tooltip')).not.to.equal(null);
      // correctly sets modifiers
      expect(popperRef.current.state.options.modifiers[0].options.altBoundary).to.equal(false);
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('should warn if anchorEl is not valid', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Popper.propTypes,
          {
            ...defaultProps,
            open: true,
            anchorEl: null,
          },
          'prop',
          'MockedPopper',
        );
      }).toErrorDev('It should be an HTML element instance');
    });
  });
});
