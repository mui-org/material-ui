import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import {
  describeConformanceV5,
  act,
  createClientRender,
  fireEvent,
  screen,
  simulatePointerDevice,
  focusVisible,
  programmaticFocusTriggersFocusVisible,
} from 'test/utils';
import { camelCase } from 'lodash/string';
import Tooltip, { tooltipClasses as classes } from '@material-ui/core/Tooltip';
import { testReset } from './Tooltip';

async function raf() {
  return new Promise((resolve) => {
    // Chrome and Safari have a bug where calling rAF once returns the current
    // frame instead of the next frame, so we need to call a double rAF here.
    // See crbug.com/675795 for more.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}

describe('<Tooltip />', () => {
  /**
   * @type {ReturnType<typeof useFakeTimers>}
   */
  let clock;
  beforeEach(() => {
    testReset();
    clock = useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      clock.restore();
    });
  });

  const render = createClientRender();

  describeConformanceV5(
    <Tooltip title="Hello World" open>
      <button type="submit">Hello World</button>
    </Tooltip>,
    () => ({
      classes,
      inheritComponent: 'button',
      render,
      muiName: 'MuiTooltip',
      refInstanceof: window.HTMLButtonElement,
      testRootOverrides: { slotName: 'popper', slotClassName: classes.popper },
      testDeepOverrides: { slotName: 'tooltip', slotClassName: classes.tooltip },
      skip: [
        'componentProp',
        'componentsProp',
        'themeVariants',
        // react-transition-group issue
        'reactTestRenderer',
      ],
    }),
  );

  it('should render a popper', () => {
    const { getByRole } = render(
      <Tooltip title="Hello World" open>
        <button type="submit">Hello World</button>
      </Tooltip>,
    );

    expect(getByRole('tooltip')).to.have.class(classes.popper);
  });

  describe('prop: disableHoverListener', () => {
    it('should hide the native title', () => {
      const { getByRole } = render(
        <Tooltip title="Hello World" disableHoverListener>
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      expect(getByRole('button')).not.to.have.attribute('title', 'Hello World');
    });
  });

  describe('prop: title', () => {
    it('should display if the title is present', () => {
      const { getByRole } = render(
        <Tooltip title="Hello World" open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      expect(getByRole('tooltip')).toBeVisible();
    });

    it('should not display if the title is an empty string', () => {
      const { queryByRole } = render(
        <Tooltip title="" open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('should label the child when closed', () => {
      render(
        <Tooltip title="the title">
          <button data-testid="target">The content</button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the title');
      expect(target).not.to.have.attribute('title');
    });

    it('cannot label the child when closed with an exotic title', () => {
      render(
        <Tooltip title={<div>the title</div>}>
          <button data-testid="target">the content</button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the content');
      expect(target).not.to.have.attribute('title');
    });

    it('should label the child when open', () => {
      render(
        <Tooltip open title="the title">
          <button data-testid="target">The content</button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the title');
      expect(target).not.to.have.attribute('title');
    });

    it('should label the child when open with an exotic title', () => {
      render(
        <Tooltip open title={<div>the title</div>}>
          <button data-testid="target">The content</button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the title');
      expect(target).not.to.have.attribute('title');
    });

    it('can describe the child when closed', () => {
      render(
        <Tooltip describeChild title="the title">
          <button aria-label="the label" data-testid="target">
            The content
          </button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the label');
      expect(target).toHaveAccessibleDescription('the title');
      expect(target).to.have.attribute('title', 'the title');
    });

    it('cannot describe the child when closed with an exotic title', () => {
      render(
        <Tooltip describeChild title={<div>the title</div>}>
          <button aria-label="the label" data-testid="target">
            The content
          </button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the label');
      expect(target).toHaveAccessibleDescription('');
      expect(target).not.to.have.attribute('title');
    });

    it('can describe the child when open', () => {
      render(
        <Tooltip describeChild open title="the title">
          <button aria-label="the label" data-testid="target">
            The content
          </button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the label');
      expect(target).toHaveAccessibleDescription('the title');
      expect(target).not.to.have.attribute('title');
    });

    it('can describe the child when open with an exotic title', () => {
      render(
        <Tooltip describeChild open title={<div>the title</div>}>
          <button aria-label="the label" data-testid="target">
            The content
          </button>
        </Tooltip>,
      );

      const target = screen.getByTestId('target');
      expect(target).toHaveAccessibleName('the label');
      expect(target).toHaveAccessibleDescription('the title');
      expect(target).not.to.have.attribute('title');
    });
  });

  describe('prop: placement', () => {
    it('should have top placement', () => {
      const renderSpy = spy();
      function PopperSpy({ placement }) {
        renderSpy(placement);
        return null;
      }

      render(
        <Tooltip title="Hello World" PopperComponent={PopperSpy} placement="top">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(renderSpy.args[0][0]).to.equal('top');
    });
  });

  it('should respond to external events', () => {
    const transitionTimeout = 10;
    const enterDelay = 100;
    const { queryByRole, getByRole } = render(
      <Tooltip
        enterDelay={enterDelay}
        title="Hello World"
        TransitionProps={{ timeout: transitionTimeout }}
      >
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>,
    );
    expect(queryByRole('tooltip')).to.equal(null);

    fireEvent.mouseOver(getByRole('button'));
    act(() => {
      clock.tick(enterDelay);
    });

    expect(getByRole('tooltip')).toBeVisible();

    act(() => {
      fireEvent.mouseLeave(getByRole('button'));
      // Tooltip schedules timeout even with no delay
      clock.tick(0);
    });
    act(() => {
      clock.tick(transitionTimeout);
    });

    expect(queryByRole('tooltip')).to.equal(null);
  });

  it('should be controllable', () => {
    const eventLog = [];

    const { getByRole, setProps } = render(
      <Tooltip
        enterDelay={100}
        title="Hello World"
        onOpen={() => eventLog.push('open')}
        onClose={() => eventLog.push('close')}
        open={false}
      >
        <button
          id="testChild"
          onMouseLeave={() => eventLog.push('mouseleave')}
          onMouseOver={() => eventLog.push('mouseover')}
          type="submit"
        >
          Hello World
        </button>
      </Tooltip>,
    );

    expect(eventLog).to.deep.equal([]);

    fireEvent.mouseOver(getByRole('button'));
    act(() => {
      clock.tick(100);
    });

    expect(eventLog).to.deep.equal(['mouseover', 'open']);
    setProps({ open: true });

    fireEvent.mouseLeave(getByRole('button'));
    act(() => {
      clock.tick(0);
    });

    expect(eventLog).to.deep.equal(['mouseover', 'open', 'mouseleave', 'close']);
  });

  it('should not call onOpen again if already open', () => {
    const eventLog = [];
    const { getByTestId } = render(
      <Tooltip enterDelay={100} title="Hello World" onOpen={() => eventLog.push('open')} open>
        <button data-testid="trigger" onMouseOver={() => eventLog.push('mouseover')} />
      </Tooltip>,
    );

    expect(eventLog).to.deep.equal([]);

    fireEvent.mouseOver(getByTestId('trigger'));
    act(() => {
      clock.tick(100);
    });

    expect(eventLog).to.deep.equal(['mouseover']);
  });

  it('should not call onClose if already closed', () => {
    const eventLog = [];
    const { getByTestId } = render(
      <Tooltip title="Hello World" onClose={() => eventLog.push('close')} open={false}>
        <button data-testid="trigger" onMouseLeave={() => eventLog.push('mouseleave')} />
      </Tooltip>,
    );

    fireEvent.mouseLeave(getByTestId('trigger'));
    act(() => {
      clock.tick(0);
    });

    expect(eventLog).to.deep.equal(['mouseleave']);
  });

  it('is dismissable by pressing Escape', () => {
    const handleClose = spy();
    const transitionTimeout = 0;
    render(
      <Tooltip
        enterDelay={0}
        onClose={handleClose}
        open
        TransitionProps={{ timeout: transitionTimeout }}
        title="Movie quote"
      >
        <button />
      </Tooltip>,
    );

    act(() => {
      fireEvent.keyDown(
        // We don't care about the target. Any Escape should dismiss the tooltip
        // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target
        document.activeElement,
        { key: 'Escape' },
      );
    });
    act(() => {
      clock.tick(transitionTimeout);
    });

    expect(handleClose.callCount).to.equal(1);
  });

  describe('touch screen', () => {
    it('should not respond to quick events', () => {
      const { getByRole, queryByRole } = render(
        <Tooltip title="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      fireEvent.touchStart(getByRole('button'));
      fireEvent.touchEnd(getByRole('button'));
      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('should open on long press', () => {
      const enterTouchDelay = 700;
      const enterDelay = 100;
      const leaveTouchDelay = 1500;
      const transitionTimeout = 10;
      const { getByRole, queryByRole } = render(
        <Tooltip
          enterTouchDelay={enterTouchDelay}
          enterDelay={enterDelay}
          leaveTouchDelay={leaveTouchDelay}
          title="Hello World"
          TransitionProps={{ timeout: transitionTimeout }}
        >
          <button type="submit">Hello World</button>
        </Tooltip>,
      );
      act(() => {
        fireEvent.touchStart(getByRole('button'));
        clock.tick(enterTouchDelay + enterDelay);
      });

      expect(getByRole('tooltip')).toBeVisible();

      fireEvent.touchEnd(getByRole('button'));
      act(() => {
        getByRole('button').blur();
        clock.tick(leaveTouchDelay);
      });
      act(() => {
        clock.tick(transitionTimeout);
      });

      expect(queryByRole('tooltip')).to.equal(null);
    });

    it('should not open if disableTouchListener', () => {
      const { getByRole, queryByRole } = render(
        <Tooltip title="Hello World" disableTouchListener>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.touchStart(getByRole('button'));
      fireEvent.mouseOver(getByRole('button'));
      expect(queryByRole('tooltip')).to.equal(null);
    });
  });

  describe('mount', () => {
    it('should mount without any issue', () => {
      render(
        <Tooltip title="Hello World" open>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
    });

    it('should handle autoFocus + onFocus forwarding', () => {
      const handleFocus = spy();
      const AutoFocus = (props) => (
        <div>
          {props.open ? (
            <Tooltip enterDelay={100} title="Title">
              <input autoFocus onFocus={handleFocus} />
            </Tooltip>
          ) : null}
        </div>
      );

      const { setProps, getByRole } = render(<AutoFocus />);

      setProps({ open: true });
      act(() => {
        clock.tick(100);
      });

      expect(getByRole('tooltip')).toBeVisible();
      expect(handleFocus.callCount).to.equal(1);
    });
  });

  describe('prop: delay', () => {
    it('should take the enterDelay into account', async () => {
      const { queryByRole, getByRole } = render(
        <Tooltip title="Hello World" enterDelay={111}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      simulatePointerDevice();

      focusVisible(getByRole('button'));
      expect(queryByRole('tooltip')).to.equal(null);

      act(() => {
        clock.tick(111);
      });

      expect(getByRole('tooltip')).toBeVisible();
    });

    it('should use hysteresis with the enterDelay', () => {
      const { queryByRole, getByRole } = render(
        <Tooltip
          title="Hello World"
          enterDelay={111}
          enterNextDelay={30}
          leaveDelay={5}
          TransitionProps={{ timeout: 6 }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      const children = getByRole('button');
      focusVisible(children);

      expect(queryByRole('tooltip')).to.equal(null);

      act(() => {
        clock.tick(111);
      });

      expect(getByRole('tooltip')).toBeVisible();

      act(() => {
        document.activeElement.blur();
      });
      act(() => {
        clock.tick(5);
      });
      act(() => {
        clock.tick(6);
      });

      expect(queryByRole('tooltip')).to.equal(null);

      focusVisible(children);
      // Bypass `enterDelay` wait, use `enterNextDelay`.
      expect(queryByRole('tooltip')).to.equal(null);

      act(() => {
        clock.tick(30);
      });

      expect(getByRole('tooltip')).toBeVisible();
    });

    it('should take the leaveDelay into account', () => {
      const leaveDelay = 111;
      const enterDelay = 0;
      const transitionTimeout = 10;
      const { getByRole, queryByRole } = render(
        <Tooltip
          leaveDelay={leaveDelay}
          enterDelay={enterDelay}
          title="tooltip"
          TransitionProps={{ timeout: transitionTimeout }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      simulatePointerDevice();

      focusVisible(getByRole('button'));
      act(() => {
        clock.tick(enterDelay);
      });

      expect(getByRole('tooltip')).toBeVisible();

      act(() => {
        getByRole('button').blur();
      });

      expect(getByRole('tooltip')).toBeVisible();

      act(() => {
        clock.tick(leaveDelay);
      });
      act(() => {
        clock.tick(transitionTimeout);
      });

      expect(queryByRole('tooltip')).to.equal(null);
    });
  });

  describe('prop: overrides', () => {
    [
      'onTouchStart',
      'onTouchEnd',
      'onMouseEnter',
      'onMouseMove',
      'onMouseOver',
      'onMouseLeave',
    ].forEach((name) => {
      it(`should be transparent for the ${name} event`, () => {
        const handler = spy();
        const { getByRole } = render(
          <Tooltip followCursor title="Hello World">
            <button id="testChild" type="submit" {...{ [name]: handler }}>
              Hello World
            </button>
          </Tooltip>,
        );
        const type = camelCase(name.slice(2));
        fireEvent[type](getByRole('button'));
        expect(handler.callCount).to.equal(1, `${name} should've been called`);
      });
    });

    it(`should be transparent for the focus and blur event`, () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const { getByRole } = render(
        <Tooltip title="Hello World">
          <button id="testChild" type="submit" onFocus={handleFocus} onBlur={handleBlur}>
            Hello World
          </button>
        </Tooltip>,
      );
      const button = getByRole('button');

      act(() => {
        button.focus();
      });

      expect(handleBlur.callCount).to.equal(0);
      expect(handleFocus.callCount).to.equal(1);

      act(() => {
        button.blur();
      });

      expect(handleBlur.callCount).to.equal(1);
      expect(handleFocus.callCount).to.equal(1);
    });

    it('should ignore event from the tooltip', () => {
      const handleMouseOver = spy();
      const { getByRole } = render(
        <Tooltip title="Hello World" open>
          <button type="submit" onMouseOver={handleMouseOver}>
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.mouseOver(getByRole('tooltip'));

      expect(handleMouseOver.callCount).to.equal(0);
    });
  });

  describe('disabled button warning', () => {
    it('should not raise a warning if title is empty', () => {
      expect(() => {
        render(
          <Tooltip title="">
            <button type="submit" disabled>
              Hello World
            </button>
          </Tooltip>,
        );
      }).not.toErrorDev();
    });

    it('should raise a warning when we are uncontrolled and can not listen to events', () => {
      expect(() => {
        render(
          <Tooltip title="Hello World">
            <button type="submit" disabled>
              Hello World
            </button>
          </Tooltip>,
        );
      }).toErrorDev(
        'Material-UI: You are providing a disabled `button` child to the Tooltip component',
      );
    });

    it('should not raise a warning when we are controlled', () => {
      expect(() => {
        render(
          <Tooltip title="Hello World" open>
            <button type="submit" disabled>
              Hello World
            </button>
          </Tooltip>,
        );
      }).not.toErrorDev();
    });
  });

  describe('prop: disableInteractive', () => {
    it('when false should keep the overlay open if the popper element is hovered', () => {
      const { getByRole } = render(
        <Tooltip
          title="Hello World"
          enterDelay={100}
          leaveDelay={111}
          TransitionProps={{ timeout: 10 }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.mouseOver(getByRole('button'));
      act(() => {
        clock.tick(100);
      });

      expect(getByRole('tooltip')).toBeVisible();

      fireEvent.mouseLeave(getByRole('button'));

      expect(getByRole('tooltip')).toBeVisible();

      fireEvent.mouseOver(getByRole('tooltip'));
      clock.tick(111 + 10);

      expect(getByRole('tooltip')).toBeVisible();
    });

    it('when `true` should not keep the overlay open if the popper element is hovered', () => {
      const { getByRole } = render(
        <Tooltip
          title="Hello World"
          enterDelay={100}
          leaveDelay={111}
          TransitionProps={{ timeout: 10 }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      fireEvent.mouseOver(getByRole('button'));
      act(() => {
        clock.tick(100);
      });

      expect(getByRole('tooltip')).toBeVisible();

      fireEvent.mouseLeave(getByRole('button'));

      expect(getByRole('tooltip')).toBeVisible();

      fireEvent.mouseOver(getByRole('tooltip'));
      clock.tick(111 + 10);

      expect(getByRole('tooltip')).not.toBeVisible();
    });
  });

  describe('prop: PopperProps', () => {
    it('should pass PopperProps to Popper Component', () => {
      const { getByTestId } = render(
        <Tooltip title="Hello World" open PopperProps={{ 'data-testid': 'popper' }}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      expect(getByTestId('popper')).not.to.equal(null);
    });

    it('should merge popperOptions with arrow modifier', () => {
      const popperRef = React.createRef();
      render(
        <Tooltip
          title="Hello World"
          open
          arrow
          PopperProps={{
            popperRef,
            popperOptions: {
              modifiers: [
                {
                  name: 'arrow',
                  options: {
                    padding: 8,
                  },
                },
              ],
            },
          }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      const appliedArrowModifier = popperRef.current.state.orderedModifiers.find(
        (modifier) => modifier.name === 'arrow',
      );

      expect(appliedArrowModifier).not.to.equal(undefined);
      expect(appliedArrowModifier.enabled).to.equal(true);
      expect(appliedArrowModifier.options.padding).to.equal(8);
    });

    it('should merge popperOptions with custom modifier', () => {
      const popperRef = React.createRef();
      render(
        <Tooltip
          title="Hello World"
          open
          arrow
          PopperProps={{
            popperRef,
            popperOptions: {
              modifiers: [
                {
                  name: 'foo',
                  enabled: true,
                  phase: 'main',
                },
              ],
            },
          }}
        >
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      const appliedComputeStylesModifier = popperRef.current.state.orderedModifiers.find(
        (modifier) => modifier.name === 'foo',
      );

      expect(appliedComputeStylesModifier).not.to.equal(undefined);
    });
  });

  describe('prop forwarding', () => {
    it('should forward props to the child element', () => {
      const { getByText } = render(
        <Tooltip title="Hello World" className="foo">
          <h1 className="bar">H1</h1>
        </Tooltip>,
      );
      expect(getByText('H1')).to.have.class('foo');
      expect(getByText('H1')).to.have.class('bar');
    });

    it('should respect the props priority', () => {
      const { getByText } = render(
        <Tooltip title="Hello World" name="tooltip">
          <h1 name="heading">H1</h1>
        </Tooltip>,
      );
      expect(getByText('H1')).to.have.attribute('name', 'heading');
    });
  });

  describe('focus', () => {
    it('ignores base focus', () => {
      const { getByRole, queryByRole } = render(
        <Tooltip enterDelay={0} title="Some information">
          <button />
        </Tooltip>,
      );
      simulatePointerDevice();

      expect(queryByRole('tooltip')).to.equal(null);

      getByRole('button').focus();

      if (programmaticFocusTriggersFocusVisible()) {
        expect(queryByRole('tooltip')).not.to.equal(null);
      } else {
        expect(queryByRole('tooltip')).to.equal(null);
      }
    });

    it('opens on focus-visible', () => {
      const eventLog = [];
      const { queryByRole, getByRole } = render(
        <Tooltip enterDelay={0} onOpen={() => eventLog.push('open')} title="Some information">
          <button onFocus={() => eventLog.push('focus')} />
        </Tooltip>,
      );
      simulatePointerDevice();

      expect(queryByRole('tooltip')).to.equal(null);

      focusVisible(getByRole('button'));

      expect(getByRole('tooltip')).toBeVisible();
      expect(eventLog).to.deep.equal(['focus', 'open']);
    });

    it('closes on blur', () => {
      const eventLog = [];
      const transitionTimeout = 0;
      const { getByRole } = render(
        <Tooltip
          enterDelay={0}
          leaveDelay={0}
          onClose={() => eventLog.push('close')}
          open
          title="Some information"
          TransitionProps={{ timeout: transitionTimeout }}
        >
          <button onBlur={() => eventLog.push('blur')} />
        </Tooltip>,
      );
      const button = getByRole('button');

      act(() => {
        button.focus();
        button.blur();
        clock.tick(transitionTimeout);
      });

      expect(getByRole('tooltip')).toBeVisible();
      expect(eventLog).to.deep.equal(['blur', 'close']);
    });

    // https://github.com/mui-org/material-ui/issues/19883
    it('should not prevent event handlers of children', () => {
      const handleFocus = spy((event) => event.currentTarget);
      // Tooltip should not assume that event handlers of children are attached to the
      // outermost host
      const TextField = React.forwardRef(function TextField(props, ref) {
        const { onFocus, ...other } = props;
        return (
          <div ref={ref} {...other}>
            <input type="text" onFocus={onFocus} />
          </div>
        );
      });
      const { getByRole } = render(
        <Tooltip open title="test">
          <TextField onFocus={handleFocus} variant="standard" />
        </Tooltip>,
      );
      const input = getByRole('textbox');

      act(() => {
        input.focus();
      });

      // return value is event.currentTarget
      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocus.returned(input)).to.equal(true);
    });
  });

  describe('warnings', () => {
    it('should warn when switching between uncontrolled to controlled', () => {
      const { setProps } = render(
        <Tooltip title="Hello World">
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );

      expect(() => {
        setProps({ open: true });
      }).toErrorDev(
        'Material-UI: A component is changing the uncontrolled open state of Tooltip to be controlled.',
      );
    });

    it('should warn when not forwarding props', () => {
      const BrokenButton = React.forwardRef((props, ref) => <button ref={ref}>Hello World</button>);

      expect(() => {
        render(
          <Tooltip title="Hello World">
            <BrokenButton />
          </Tooltip>,
        );
      }).toErrorDev(
        'The `children` component of the Tooltip is not forwarding its props correctly.',
      );
    });
  });

  it('should use the same Popper.js instance between two renders', () => {
    const popperRef = React.createRef();
    const { forceUpdate } = render(
      <Tooltip
        title="Hello World"
        open
        PopperProps={{
          popperRef,
        }}
      >
        <button id="testChild" type="submit">
          Hello World
        </button>
      </Tooltip>,
    );
    const firstPopperInstance = popperRef.current;
    forceUpdate();
    expect(firstPopperInstance).to.equal(popperRef.current);
  });

  describe('prop: PopperComponent', () => {
    it('can render a different component', () => {
      const CustomPopper = () => <div data-testid="CustomPopper" />;
      const { getByTestId } = render(
        <Tooltip title="Hello World" open PopperComponent={CustomPopper}>
          <button id="testChild" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      expect(getByTestId('CustomPopper')).toBeVisible();
    });
  });

  describe('prop: followCursor', () => {
    it('should use the position of the mouse', async function test() {
      // Only callig render() outputs:
      // An update to ForwardRef(Popper) inside a test was not wrapped in act(...).
      // Somethings is wrong in JSDOM and strict mode.
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      // Avoid mock of raf
      clock.restore();

      const x = 50;
      const y = 10;

      render(
        <Tooltip
          title="Hello World"
          placement="bottom-end"
          open
          followCursor
          PopperProps={{ 'data-testid': 'popper' }}
        >
          <button data-testid="target" type="submit">
            Hello World
          </button>
        </Tooltip>,
      );
      const tooltipElement = screen.getByTestId('popper');
      const targetElement = screen.getByTestId('target');

      fireEvent.mouseMove(targetElement, {
        clientX: x,
        clientY: y,
      });

      // Wait for the popperRef.current.update() call to resolve.
      await raf();

      expect(tooltipElement).toBeVisible();

      // Layer acceleration can disable subpixel rendering which causes slightly
      // blurry text on low PPI displays, so we want to use 2D transforms
      // instead
      if ((window.devicePixelRatio || 1) < 2) {
        expect(tooltipElement).to.have.toHaveInlineStyle({
          transform: `translate(${x}px, ${y}px)`,
        });
      } else {
        expect(tooltipElement).to.have.toHaveInlineStyle({
          transform: `translate3d(${x}px, ${y}px, 0px)`,
        });
      }
    });
  });

  describe('user-select state', () => {
    let prevWebkitUserSelect;
    beforeEach(() => {
      prevWebkitUserSelect = document.body.style.WebkitUserSelect;
    });

    afterEach(() => {
      document.body.style.WebkitUserSelect = prevWebkitUserSelect;
    });

    it('prevents text-selection during touch-longpress', () => {
      const enterTouchDelay = 700;
      const enterDelay = 100;
      const leaveTouchDelay = 1500;
      const transitionTimeout = 10;
      const { getByRole } = render(
        <Tooltip
          enterTouchDelay={enterTouchDelay}
          enterDelay={enterDelay}
          leaveTouchDelay={leaveTouchDelay}
          title="Hello World"
          TransitionProps={{ timeout: transitionTimeout }}
        >
          <button type="submit">Hello World</button>
        </Tooltip>,
      );
      document.body.style.WebkitUserSelect = 'revert';

      fireEvent.touchStart(getByRole('button'));

      expect(document.body.style.WebkitUserSelect).to.equal('none');

      act(() => {
        clock.tick(enterTouchDelay + enterDelay);
      });
      expect(document.body.style.WebkitUserSelect.toLowerCase()).to.equal('revert');
    });

    it('restores user-select when unmounted during longpress', () => {
      const enterTouchDelay = 700;
      const enterDelay = 100;
      const leaveTouchDelay = 1500;
      const transitionTimeout = 10;
      const { unmount, getByRole } = render(
        <Tooltip
          enterTouchDelay={enterTouchDelay}
          enterDelay={enterDelay}
          leaveTouchDelay={leaveTouchDelay}
          title="Hello World"
          TransitionProps={{ timeout: transitionTimeout }}
        >
          <button type="submit">Hello World</button>
        </Tooltip>,
      );

      document.body.style.WebkitUserSelect = 'revert';
      // Let updates flush before unmounting
      act(() => {
        fireEvent.touchStart(getByRole('button'));
      });
      unmount();

      expect(document.body.style.WebkitUserSelect.toLowerCase()).to.equal('revert');
    });
  });
});
