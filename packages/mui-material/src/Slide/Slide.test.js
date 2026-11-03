import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { spy, stub } from 'sinon';
import { act, createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import Transition from '../internal/Transition';
import { setTranslateValue } from './Slide';
import { useForkRef } from '../utils';
import describeConformance from '../../test/describeConformance';
import describeTransitionConformance from '../../test/describeTransitionConformance';

describe('<Slide />', () => {
  const { clock, render } = createRenderer();

  const defaultProps = {
    in: true,
    children: <div id="testChild" />,
    direction: 'down',
  };

  describeConformance(
    <Slide in>
      <div />
    </Slide>,
    () => ({
      render,
      classes: {},
      inheritComponent: Transition,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'themeDefaultProps', 'themeStyleOverrides', 'themeVariants'],
    }),
  );

  describeTransitionConformance('Slide', () => ({
    Component: Slide,
    render,
    clock,
    defaultProps: {
      direction: 'down',
    },
    lifecycle: {
      addEndListener: true,
      assertEntering: (node) => {
        expect(node.style.transform).to.match(/none/);
      },
    },
    themeDuration: {
      renderElement: (props) => (
        <Slide in appear {...props}>
          <div data-testid="child">Foo</div>
        </Slide>
      ),
    },
    propTimeout: {
      enter: {
        timeout: 556,
        callback: 'onEntering',
        assertStyle: (node) => {
          expect(node.style.transition).to.match(
            /transform 556ms cubic-bezier\(0(.0)?, 0, 0.2, 1\)( 0ms)?/,
          );
        },
      },
      exit: {
        timeout: 446,
        callback: 'onExit',
        assertStyle: (node) => {
          expect(node.style.transition).to.match(
            /transform 446ms cubic-bezier\(0.4, 0, 0.6, 1\)( 0ms)?/,
          );
        },
      },
    },
    reducedMotion: {
      assertReducedTiming: (node) => {
        if (isJsdom()) {
          expect(node.style.transition).to.include('0ms');
        } else {
          expect(node.style.transitionDuration).to.equal('0ms');
        }
      },
      testReflow: true,
      testOptOut: true,
      testNoDomPropLeak: true,
    },
  }));

  it('should not override children styles', () => {
    const { container } = render(
      <Slide
        {...defaultProps}
        style={{ color: 'red', backgroundColor: 'yellow' }}
        theme={createTheme()}
      >
        <div id="with-slide" style={{ color: 'blue' }} />
      </Slide>,
    );

    const slide = container.querySelector('#with-slide');

    expect(slide.style).to.have.property('backgroundColor', 'yellow');
    expect(slide.style).to.have.property('color', 'blue');
    expect(slide.style).to.have.property('visibility', '');
  });

  describe('prop: easing', () => {
    it('should create proper enter animation', () => {
      const handleEntering = spy();

      render(
        <Slide
          {...defaultProps}
          easing={{
            enter: 'cubic-bezier(1, 1, 0, 0)',
          }}
          onEntering={handleEntering}
        />,
      );

      expect(handleEntering.args[0][0].style.transition).to.match(
        /transform 225ms cubic-bezier\(1, 1, 0, 0\)( 0ms)?/,
      );
    });

    it('should create proper exit animation', () => {
      const handleExit = spy();
      const { setProps } = render(
        <Slide
          {...defaultProps}
          easing={{
            exit: 'cubic-bezier(0, 0, 1, 1)',
          }}
          onExit={handleExit}
        />,
      );

      setProps({ in: false });

      expect(handleExit.args[0][0].style.transition).to.match(
        /transform 195ms cubic-bezier\(0, 0, 1, 1\)( 0ms)?/,
      );
    });

    it.skipIf(!isJsdom())('should render the default theme values by default', function test() {
      const theme = createTheme();
      const handleEntering = spy();
      render(<Slide {...defaultProps} onEntering={handleEntering} />);

      expect(handleEntering.args[0][0].style.transition).to.equal(
        `transform 225ms ${theme.transitions.easing.easeOut} 0ms`,
      );
    });

    it.skipIf(!isJsdom())('should render the custom theme values', function test() {
      const theme = createTheme({
        transitions: {
          easing: {
            easeOut: 'cubic-bezier(1, 1, 1, 1)',
          },
        },
      });

      const handleEntering = spy();
      render(
        <ThemeProvider theme={theme}>
          <Slide {...defaultProps} onEntering={handleEntering} />
        </ThemeProvider>,
      );

      expect(handleEntering.args[0][0].style.transition).to.equal(
        `transform 225ms ${theme.transitions.easing.easeOut} 0ms`,
      );
    });
  });

  describe('prop: direction', () => {
    it('should update the position', () => {
      const { container, setProps } = render(
        <Slide {...defaultProps} in={false} direction="left" />,
      );
      const child = container.querySelector('#testChild');

      const transition1 = child.style.transform;
      setProps({
        direction: 'right',
      });

      const transition2 = child.style.transform;
      expect(transition1).not.to.equal(transition2);
    });
  });

  describe('transform styling', () => {
    const RealDiv = React.forwardRef(({ rect, ...props }, ref) => {
      return (
        <div {...props} style={{ height: 300, width: 500, background: 'red', ...rect }} ref={ref} />
      );
    });
    const FakeDiv = React.forwardRef(({ rect, ...props }, ref) => {
      const stubBoundingClientRect = (element) => {
        if (element !== null) {
          try {
            stub(element, 'getBoundingClientRect').callsFake(() => {
              const r = {
                width: 500,
                height: 300,
                left: 300,
                right: 800,
                top: 200,
                bottom: 500,
                ...rect,
              };
              return r;
            });
          } catch (error) {
            // The test may render this element more than once.
          }
        }
      };
      const handleRef = useForkRef(ref, stubBoundingClientRect);
      return <RealDiv {...props} ref={handleRef} />;
    });

    describe('handleEnter()', () => {
      it('should set element transform and transition in the `left` direction', () => {
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="left"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(`translateX(${globalThis.innerWidth - 300}px)`);
      });

      it('should set element transform and transition in the `right` direction', () => {
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="right"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(`translateX(-${300 + 500}px)`);
      });

      it('should set element transform and transition in the `up` direction', () => {
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="up"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(`translateY(${globalThis.innerHeight - 200}px)`);
      });

      it('should set element transform and transition in the `down` direction', () => {
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="down"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal('translateY(-500px)');
      });

      it('should reset the previous transition if needed', () => {
        const childRef = React.createRef();
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="right"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv ref={childRef} />
          </Slide>,
        );

        childRef.current.style.transform = 'translateX(-800px)';
        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal('translateX(-800px)');
      });

      it('should set element transform in the `up` direction when element is offscreen', () => {
        const childRef = React.createRef();
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="up"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv rect={{ top: -100 }} ref={childRef} />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(`translateY(${globalThis.innerHeight + 100}px)`);
      });

      it('should set element transform in the `left` direction when element is offscreen', () => {
        const childRef = React.createRef();
        let nodeEnterTransformStyle;
        const { setProps } = render(
          <Slide
            direction="left"
            onEnter={(node) => {
              nodeEnterTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv rect={{ left: -100 }} ref={childRef} />
          </Slide>,
        );

        setProps({ in: true });

        expect(nodeEnterTransformStyle).to.equal(`translateX(${globalThis.innerWidth + 100}px)`);
      });
    });

    describe('handleExiting()', () => {
      const draggedOffset = 170;
      const elementTop = 200;

      const TouchDraggedFakeDiv = React.forwardRef(function TouchDraggedFakeDiv(props, ref) {
        const [translateY, setTranslateY] = React.useState(0);
        const startYRef = React.useRef(null);
        const stubbedElementRef = React.useRef(null);
        const stubBoundingClientRect = React.useCallback((element) => {
          if (element === null || stubbedElementRef.current === element) {
            return;
          }

          stubbedElementRef.current = element;
          stub(element, 'getBoundingClientRect').callsFake(() => ({
            width: 500,
            height: 300,
            left: 300,
            right: 800,
            top: elementTop,
            bottom: 500,
          }));
        }, []);
        const handleRef = useForkRef(ref, stubBoundingClientRect);

        return (
          <div
            data-testid="drag-target"
            {...props}
            ref={handleRef}
            onPointerDown={(event) => {
              startYRef.current = event.clientY;
            }}
            onPointerMove={(event) => {
              if (startYRef.current !== null) {
                setTranslateY(event.clientY - startYRef.current);
              }
            }}
            onPointerUp={() => {
              startYRef.current = null;
            }}
            style={{
              width: 500,
              height: 300,
              background: 'red',
              transform: `translate(0px, ${translateY}px)`,
            }}
          />
        );
      });

      it('should set element transform and transition in the `left` direction', () => {
        let nodeExitingTransformStyle;
        const { setProps } = render(
          <Slide
            direction="left"
            in
            onExit={(node) => {
              nodeExitingTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal(`translateX(${globalThis.innerWidth - 300}px)`);
      });

      it('should set element transform and transition in the `right` direction', () => {
        let nodeExitingTransformStyle;
        const { setProps } = render(
          <Slide
            direction="right"
            in
            onExit={(node) => {
              nodeExitingTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal('translateX(-800px)');
      });

      it('should set element transform and transition in the `up` direction', () => {
        let nodeExitingTransformStyle;
        const { setProps } = render(
          <Slide
            direction="up"
            in
            onExit={(node) => {
              nodeExitingTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal(`translateY(${globalThis.innerHeight - 200}px)`);
      });

      it('should set element transform and transition in the `down` direction', () => {
        let nodeExitingTransformStyle;
        const { setProps } = render(
          <Slide
            direction="down"
            in
            onExit={(node) => {
              nodeExitingTransformStyle = node.style.transform;
            }}
          >
            <FakeDiv />
          </Slide>,
        );

        setProps({ in: false });

        expect(nodeExitingTransformStyle).to.equal('translateY(-500px)');
      });

      it('should account for a touch-dragged position when exiting', async () => {
        function Test() {
          const [open, setOpen] = React.useState(true);

          return (
            <React.Fragment>
              <button type="button" onClick={() => setOpen(false)}>
                Close
              </button>
              <Slide appear={false} direction="up" in={open}>
                <TouchDraggedFakeDiv />
              </Slide>
            </React.Fragment>
          );
        }

        const { user } = render(<Test />);
        const dragTarget = screen.getByTestId('drag-target');

        await user.pointer([
          { keys: '[TouchA>]', target: dragTarget, coords: { clientY: 200 } },
          { pointerName: 'TouchA', target: dragTarget, coords: { clientY: 370 } },
          { keys: '[/TouchA]', target: dragTarget, coords: { clientY: 370 } },
        ]);

        expect(dragTarget.style.transform).to.equal(`translate(0px, ${draggedOffset}px)`);

        await user.click(screen.getByRole('button', { name: 'Close' }));

        expect(dragTarget.style.transform).to.equal(
          `translateY(${globalThis.innerHeight + draggedOffset - elementTop}px)`,
        );
      });
    });

    describe('prop: container', () => {
      // This test needs real layout measurements.
      it.skipIf(isJsdom())(
        'should set element transform and transition in the `up` direction',
        async function test() {
          let nodeExitingTransformStyle;
          const height = 200;
          function Test(props) {
            const [container, setContainer] = React.useState(null);
            return (
              <div
                ref={(node) => {
                  setContainer(node);
                }}
                style={{ height, width: 200 }}
              >
                <Slide
                  direction="up"
                  in
                  {...props}
                  container={container}
                  onExit={(node) => {
                    nodeExitingTransformStyle = node.style.transform;
                  }}
                >
                  <RealDiv rect={{ top: 8 }} />
                </Slide>
              </div>
            );
          }
          const { setProps } = render(<Test />);
          setProps({ in: false });
          expect(nodeExitingTransformStyle).to.equal(`translateY(${height}px)`);
        },
      );
    });

    describe('mount', () => {
      it('should work when initially hidden', () => {
        const childRef = React.createRef();
        render(
          <Slide in={false}>
            <div ref={childRef}>Foo</div>
          </Slide>,
        );
        const transition = childRef.current;

        expect(transition.style.visibility).to.equal('hidden');
        expect(transition.style.transform).not.to.equal(undefined);
      });
    });

    describe('resize', () => {
      clock.withFakeTimers();

      it('should recompute the correct position', () => {
        const { container } = render(
          <Slide direction="up" in={false}>
            <div id="testChild">Foo</div>
          </Slide>,
        );

        act(() => {
          window.dispatchEvent(new window.Event('resize', {}));
        });
        clock.tick(166);

        const child = container.querySelector('#testChild');
        expect(child.style.transform).not.to.equal(undefined);
      });

      // Browsers resolve CSS transforms from stylesheets to matrix() values,
      // which Slide parses to include existing offsets. jsdom does not resolve
      // CSS values. The transform must come from a CSS rule, not inline style,
      // because Slide clears inline transforms before reading computed style.
      it.skipIf(isJsdom())('should take existing transform into account', function test() {
        const styleEl = document.createElement('style');
        styleEl.textContent = '#slide-test-transform { transform: matrix(1, 0, 0, 1, 0, 420); }';
        document.head.appendChild(styleEl);
        const element = document.createElement('div');
        element.id = 'slide-test-transform';
        document.body.appendChild(element);
        stub(element, 'getBoundingClientRect').callsFake(() => ({
          width: 500,
          height: 300,
          left: 300,
          right: 800,
          top: 1200,
          bottom: 1500,
        }));
        setTranslateValue('up', element);
        expect(element.style.transform).to.equal(`translateY(${globalThis.innerHeight - 780}px)`);

        document.body.removeChild(element);
        document.head.removeChild(styleEl);
      });

      it('should do nothing when visible', () => {
        render(<Slide {...defaultProps} />);
        act(() => {
          window.dispatchEvent(new window.Event('resize', {}));
        });
        clock.tick(166);
      });
    });
  });

  describe('server-side', () => {
    it('should be initially hidden', () => {
      const { container } = render(
        <Slide {...defaultProps} in={false}>
          <div id="with-slide" />
        </Slide>,
      );

      const slide = container.querySelector('#with-slide');

      expect(slide.style).to.have.property('visibility', 'hidden');
    });
  });
});
