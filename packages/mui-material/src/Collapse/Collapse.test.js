import { describe, expect, it, beforeEach } from 'vitest';
import * as React from 'react';
import { spy, stub } from 'sinon';
import { act, createRenderer, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Collapse, { collapseClasses as classes } from '@mui/material/Collapse';
import Transition from '../internal/Transition';
import describeConformance from '../../test/describeConformance';
import describeTransitionConformance from '../../test/describeTransitionConformance';

const CustomCollapse = React.forwardRef(({ ownerState, ...props }, ref) => (
  <div ref={ref} {...props} />
));
const CustomWrapper = React.forwardRef(({ ownerState, ...props }, ref) => (
  <div ref={ref} {...props} />
));
const CustomWrapperInner = React.forwardRef(({ ownerState, ...props }, ref) => (
  <div ref={ref} {...props} />
));

describe('<Collapse />', () => {
  const { clock, render } = createRenderer();

  const defaultProps = {
    in: true,
    children: <div />,
  };

  describeConformance(<Collapse {...defaultProps} />, () => ({
    classes,
    inheritComponent: Transition,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiCollapse',
    testVariantProps: { orientation: 'horizontal' },
    testDeepOverrides: { slotName: 'wrapper', slotClassName: classes.wrapper },
    slots: {
      root: { expectedClassName: classes.root, testWithElement: CustomCollapse },
      wrapper: { expectedClassName: classes.wrapper, testWithElement: CustomWrapper },
      wrapperInner: {
        expectedClassName: classes.wrapperInner,
        testWithElement: CustomWrapperInner,
      },
    },
  }));

  describeTransitionConformance('Collapse', () => ({
    Component: Collapse,
    render,
    clock,
    children: <div />,
    getNode: (container) => container.firstChild,
    propTimeout: {
      enter: {
        timeout: 556,
        callback: 'onEntering',
        assertStyle: (node) => {
          expect(node.style.transitionDuration).to.equal('556ms');
        },
      },
      exit: {
        timeout: 446,
        callback: 'onExiting',
        assertStyle: (node) => {
          expect(node.style.transitionDuration).to.equal('446ms');
        },
      },
    },
    reducedMotion: {
      testOptOut: true,
      testNoDomPropLeak: true,
    },
  }));

  it('should render a container around the wrapper', () => {
    const { container } = render(
      <Collapse {...defaultProps} classes={{ root: 'woofCollapse1' }} />,
    );
    const collapse = container.firstChild;
    expect(collapse).to.have.tagName('div');
    expect(collapse).to.have.class(classes.root);
    expect(collapse).to.have.class('woofCollapse1');
  });

  it('should render a wrapper around the children', () => {
    const children = <h1>Hello</h1>;
    const { container } = render(<Collapse {...defaultProps}>{children}</Collapse>);
    const collapse = container.firstChild;
    const wrapper = collapse.firstChild;
    const innerWrapper = wrapper.firstChild;
    expect(wrapper).to.have.tagName('div');
    expect(innerWrapper.firstChild).to.have.tagName('h1');
  });

  describe('transition lifecycle', () => {
    clock.withFakeTimers();
    let setProps;
    let collapse;
    let container;
    let nodeEnterHeightStyle;
    let nodeEnteringHeightStyle;
    let nodeExitHeightStyle;

    /* Capture each height value immediately because the same DOM node is reused
       and later lifecycle steps overwrite its inline style. */
    const handleEnter = spy();
    const handleEnterWrapper = (...args) => {
      handleEnter(...args);
      nodeEnterHeightStyle = args[0].style.height;
    };
    const handleEntering = spy();
    const handleEnteringWrapper = (...args) => {
      handleEntering(...args);
      nodeEnteringHeightStyle = args[0].style.height;
    };
    const handleEntered = spy();
    const handleExit = spy();
    const handleExitWrapper = (...args) => {
      handleExit(...args);
      nodeExitHeightStyle = args[0].style.height;
    };
    const handleExiting = spy();
    const handleExited = spy();
    const handleAddEndListener = spy();

    beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-lifecycle
      ({ container, setProps } = render(
        <Collapse
          addEndListener={handleAddEndListener}
          onEnter={handleEnterWrapper}
          onEntering={handleEnteringWrapper}
          onEntered={handleEntered}
          onExit={handleExitWrapper}
          onExiting={handleExiting}
          onExited={handleExited}
          timeout={300}
        >
          <div />
        </Collapse>,
      ));
      collapse = container.firstChild;
      stub(collapse.firstChild, 'clientHeight').get(() => 666);
    });

    it('should run in', () => {
      setProps({ in: true });
      expect(nodeEnterHeightStyle).to.equal('0px');
      expect(handleEnter.args[0][0]).to.equal(collapse);
      expect(handleEnter.args[0][1]).to.equal(false);
      expect(nodeEnteringHeightStyle).to.equal('666px');
      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(collapse);
      expect(handleEntering.args[0][1]).to.equal(false);
      expect(handleAddEndListener.callCount).to.equal(1);
      expect(handleAddEndListener.args[0][0]).to.equal(collapse);
      expect(typeof handleAddEndListener.args[0][1]).to.equal('function');
      clock.tick(300);

      expect(handleEntered.args[0][0].style.height).to.equal('auto');
      expect(handleEntered.args[0][1]).to.equal(false);
      expect(handleEntered.callCount).to.equal(1);
    });

    it('should run out', () => {
      setProps({ in: true });
      setProps({ in: false });

      expect(nodeExitHeightStyle).to.equal('666px');
      expect(handleExiting.args[0][0].style.height).to.equal('0px');
      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(collapse);
      clock.tick(300);

      expect(handleExited.args[0][0].style.height).to.equal('0px');
      clock.tick(300);

      expect(handleExited.callCount).to.equal(1);
      expect(handleExited.args[0][0]).to.equal(collapse);
    });
  });

  describe('prop: timeout', () => {
    clock.withFakeTimers();

    it('should delay based on height when timeout is auto', () => {
      const theme = createTheme({
        transitions: {
          getAutoHeightDuration: (n) => n,
        },
      });

      const next1 = spy();
      function Test(props) {
        return (
          <ThemeProvider theme={theme}>
            <Collapse timeout="auto" onEntered={next1} {...props}>
              <div />
            </Collapse>
          </ThemeProvider>
        );
      }
      const { setProps: setProps1, container: container1 } = render(<Test />);
      const collapse = container1.firstChild;
      // Stub the wrapper height used for auto duration.
      stub(collapse.firstChild, 'clientHeight').get(() => 10);

      setProps1({
        in: true,
      });

      const autoTransitionDuration = 10;
      expect(next1.callCount).to.equal(0);
      clock.tick(0);

      expect(next1.callCount).to.equal(0);
      clock.tick(autoTransitionDuration);

      expect(next1.callCount).to.equal(1);

      const next2 = spy();
      const { setProps: setProps2 } = render(
        <Collapse timeout="auto" onEntered={next2}>
          <div />
        </Collapse>,
      );
      setProps2({ in: true });

      expect(next2.callCount).to.equal(0);
      clock.tick(0);

      expect(next2.callCount).to.equal(1);
    });

    it('should use timeout as delay when timeout is number', () => {
      const timeout = 10;
      const next = spy();
      const { setProps } = render(
        <Collapse timeout={timeout} onEntered={next}>
          <div />
        </Collapse>,
      );

      setProps({ in: true });

      expect(next.callCount).to.equal(0);
      act(() => {
        clock.tick(0);
      });

      expect(next.callCount).to.equal(0);
      act(() => {
        clock.tick(timeout);
      });

      expect(next.callCount).to.equal(1);
    });

    it('completes auto duration on the next task when reduced motion is always', () => {
      const getAutoHeightDuration = spy(() => 25);
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
        transitions: {
          getAutoHeightDuration,
        },
      });
      const next = spy();

      function Test(props) {
        return (
          <ThemeProvider theme={theme}>
            <Collapse timeout="auto" onEntered={next} {...props}>
              <div />
            </Collapse>
          </ThemeProvider>
        );
      }

      const { setProps, container } = render(<Test />);
      const collapse = container.firstChild;
      stub(collapse.firstChild, 'clientHeight').get(() => 10);

      setProps({ in: true });

      expect(next.callCount).to.equal(0);
      expect(collapse.style.height).to.equal('10px');
      expect(getAutoHeightDuration.callCount).to.equal(0);
      clock.tick(0);
      expect(next.callCount).to.equal(1);
      expect(collapse.style.height).to.equal('auto');
    });

    it('completes exit auto duration on the next task without calculating duration when reduced motion is always', () => {
      const getAutoHeightDuration = spy(() => 25);
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
        transitions: {
          getAutoHeightDuration,
        },
      });
      const next = spy();

      function Test(props) {
        return (
          <ThemeProvider theme={theme}>
            <Collapse timeout="auto" onExited={next} {...props}>
              <div />
            </Collapse>
          </ThemeProvider>
        );
      }

      const { setProps, container } = render(<Test in />);
      const collapse = container.firstChild;
      stub(collapse.firstChild, 'clientHeight').get(() => 10);

      setProps({ in: false });

      expect(next.callCount).to.equal(0);
      expect(collapse.style.height).to.equal('0px');
      expect(getAutoHeightDuration.callCount).to.equal(0);
      clock.tick(0);
      expect(next.callCount).to.equal(1);
    });
  });

  describe('prop: collapsedSize', () => {
    const collapsedSize = '10px';

    it('should work when closed', () => {
      const { container } = render(<Collapse {...defaultProps} collapsedSize={collapsedSize} />);
      const collapse = container.firstChild;
      expect(collapse.style.minHeight).to.equal(collapsedSize);
    });

    it('should be taken into account in handleExiting', () => {
      const handleExiting = spy();
      const { setProps } = render(
        <Collapse {...defaultProps} collapsedSize={collapsedSize} onExiting={handleExiting} />,
      );
      setProps({ in: false });

      expect(handleExiting.args[0][0].style.height).to.equal(collapsedSize);
    });
  });

  // Regression test for https://github.com/mui/material-ui/issues/40653.
  it.skipIf(isJsdom())(
    'should render correctly when external ownerState prop is passed',
    function test() {
      const { container } = render(
        <Collapse in ownerState={{}}>
          <div style={{ height: '100px' }} />
        </Collapse>,
      );
      const collapse = container.firstChild;

      expect(collapse).toHaveComputedStyle({
        height: '100px',
      });
    },
  );
});
