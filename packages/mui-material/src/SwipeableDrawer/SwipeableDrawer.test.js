import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import {
  fireEvent,
  createRenderer,
  screen,
  supportsTouch,
  isJsdom,
} from '@mui/internal-test-utils';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { backdropClasses } from '@mui/material/Backdrop';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useForkRef from '../utils/useForkRef';
import describeConformance from '../../test/describeConformance';

const FakePaper = React.forwardRef(function FakeWidthPaper(props, ref) {
  const { style, ...other } = props;
  const paperRef = React.useRef(null);
  const handleRef = useForkRef(ref, paperRef);

  React.useEffect(() => {
    // JSDOM has no layout
    if (isJsdom()) {
      Object.defineProperty(paperRef.current, 'clientWidth', { value: 250 });
      Object.defineProperty(paperRef.current, 'clientHeight', { value: 250 });
    }
  });

  return (
    <div
      tabIndex={-1}
      ref={handleRef}
      style={{
        ...style,
        width: '250px',
        height: '250px',
      }}
      {...other}
    />
  );
});

const NullPaper = React.forwardRef(function NullPaper(props, ref) {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const handleTouchStart = () => {
      setHidden(true);
    };

    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  if (hidden) {
    return null;
  }

  return <div tabIndex={-1} ref={ref} />;
});

describe('<SwipeableDrawer />', () => {
  const { render } = createRenderer({ clock: 'fake' });

  describeConformance(<SwipeableDrawer onOpen={() => {}} onClose={() => {}} open />, () => ({
    render,
    classes: {},
    inheritComponent: Drawer,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'themeDefaultProps', 'themeStyleOverrides', 'themeVariants'],
  }));

  it('should render a Drawer and a SwipeArea', () => {
    render(<SwipeableDrawer open onOpen={() => {}} onClose={() => {}} />);
    expect(document.querySelector('.MuiDrawer-root')).not.to.equal(null);
    expect(document.querySelector('[class*=PrivateSwipeArea-root]')).not.to.equal(null);
  });

  it('should hide the SwipeArea if swipe to open is disabled', () => {
    render(<SwipeableDrawer open onOpen={() => {}} onClose={() => {}} disableSwipeToOpen />);
    expect(document.querySelector('[class*=PrivateSwipeArea-root]')).to.equal(null);
  });

  it('should accept user custom style', () => {
    render(
      <SwipeableDrawer
        onOpen={() => {}}
        onClose={() => {}}
        open
        slotProps={{
          paper: { 'data-test': 'foo' },
        }}
      />,
    );

    expect(document.querySelector('.MuiPaper-root')).to.have.attribute('data-test', 'foo');
  });

  // only run in supported browsers
  if (!supportsTouch()) {
    return;
  }

  describe('swipe to open', () => {
    const bodyWidth = document.body.offsetWidth;
    const windowHeight = window.innerHeight;
    const tests = [
      {
        anchor: 'left',
        openTouches: [
          { pageX: 0, clientY: 0 },
          { pageX: 20, clientY: 0 },
          { pageX: 180, clientY: 0 },
        ],
        closeTouches: [
          { pageX: 200, clientY: 0 },
          { pageX: 180, clientY: 0 },
          { pageX: 10, clientY: 0 },
        ],
        edgeTouch: { pageX: 10, clientY: 50 },
        ignoreTouch: { pageX: 100, clientY: 0 },
      },
      {
        anchor: 'right',
        openTouches: [
          { pageX: bodyWidth, clientY: 0 },
          { pageX: bodyWidth - 20, clientY: 0 },
          { pageX: bodyWidth - 180, clientY: 0 },
        ],
        closeTouches: [
          { pageX: bodyWidth - 200, clientY: 0 },
          { pageX: bodyWidth - 180, clientY: 0 },
          { pageX: bodyWidth - 10, clientY: 0 },
        ],
        edgeTouch: { pageX: bodyWidth - 10, clientY: 50 },
        ignoreTouch: { pageX: bodyWidth - 100, clientY: 0 },
      },
      {
        anchor: 'top',
        openTouches: [
          { pageX: 0, clientY: 0 },
          { pageX: 0, clientY: 20 },
          { pageX: 0, clientY: 180 },
        ],
        closeTouches: [
          { pageX: 0, clientY: 200 },
          { pageX: 0, clientY: 180 },
          { pageX: 0, clientY: 10 },
        ],
        edgeTouch: { pageX: 50, clientY: 10 },
        ignoreTouch: { pageX: 0, clientY: 100 },
      },
      {
        anchor: 'bottom',
        openTouches: [
          { pageX: 0, clientY: windowHeight },
          { pageX: 0, clientY: windowHeight - 20 },
          { pageX: 0, clientY: windowHeight - 180 },
        ],
        closeTouches: [
          { pageX: 0, clientY: windowHeight - 200 },
          { pageX: 0, clientY: windowHeight - 180 },
          { pageX: 0, clientY: windowHeight - 10 },
        ],
        edgeTouch: { pageX: 50, clientY: windowHeight - 10 },
        ignoreTouch: { pageX: 0, clientY: windowHeight - 100 },
      },
    ];

    tests.forEach((params) => {
      describe(`anchor=${params.anchor}`, () => {
        it('should open and close when swiping', () => {
          const handleClose = spy();
          const handleOpen = spy();
          const { setProps } = render(
            <SwipeableDrawer
              anchor={params.anchor}
              onOpen={handleOpen}
              onClose={handleClose}
              open={false}
              slotProps={{
                paper: { component: FakePaper },
              }}
            >
              <div data-testid="drawer">SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[0] })],
          });
          fireEvent.touchMove(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[1] })],
          });
          fireEvent.touchMove(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[2] })],
          });
          fireEvent.touchEnd(swipeArea, {
            changedTouches: [
              new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[2] }),
            ],
          });
          expect(handleOpen.callCount).to.equal(1);
          expect(handleOpen.args[0][0]).to.have.property('type', 'touchend');

          setProps({ open: true });

          const drawer = screen.getByTestId('drawer');

          fireEvent.touchStart(drawer, {
            touches: [new Touch({ identifier: 0, target: drawer, ...params.closeTouches[0] })],
          });
          fireEvent.touchMove(drawer, {
            touches: [new Touch({ identifier: 0, target: drawer, ...params.closeTouches[1] })],
          });
          fireEvent.touchMove(drawer, {
            touches: [new Touch({ identifier: 0, target: drawer, ...params.closeTouches[2] })],
          });
          fireEvent.touchEnd(drawer, {
            changedTouches: [
              new Touch({ identifier: 0, target: drawer, ...params.closeTouches[2] }),
            ],
          });
          expect(handleClose.callCount).to.equal(1);
          expect(handleClose.args[0][0]).to.have.property('type', 'touchend');
        });

        // Need layout
        it.skipIf(isJsdom())('should open at correct position when swiping', function test() {
          const handleClose = spy();
          const handleOpen = spy();
          const { setProps } = render(
            <SwipeableDrawer
              anchor={params.anchor}
              onOpen={handleOpen}
              onClose={handleClose}
              open={false}
              transitionDuration={0}
              slotProps={{
                paper: { component: FakePaper },
              }}
            >
              <div data-testid="drawer">SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const testParam = params.anchor === 'left' || params.anchor === 'right' ? 'x' : 'y';

          const DRAG_STARTED_SIGNAL = 20; // Same as in SwipeableDrawer
          const DRAWER_SIZE = 250;
          const bodyMargin = document.body.getBoundingClientRect().x;
          const absoluteBodyWidth = bodyWidth + bodyMargin * 2;

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[0] })],
          });

          let startPosition = -1 * (DRAWER_SIZE - DRAG_STARTED_SIGNAL); // default value for left & top anchor

          if (params.anchor === 'right') {
            startPosition = absoluteBodyWidth - DRAG_STARTED_SIGNAL;
          }

          if (params.anchor === 'bottom') {
            startPosition = windowHeight - DRAG_STARTED_SIGNAL;
          }
          expect(screen.getByTestId('drawer').getBoundingClientRect()[testParam]).to.equal(
            startPosition,
          );

          fireEvent.touchMove(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[1] })],
          });

          fireEvent.touchMove(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[2] })],
          });

          fireEvent.touchEnd(swipeArea, {
            changedTouches: [
              new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[2] }),
            ],
          });

          expect(handleOpen.callCount).to.equal(1);
          setProps({ open: true });

          let endPosition = 0; // default value for left & top anchor

          if (params.anchor === 'right') {
            endPosition = absoluteBodyWidth - DRAWER_SIZE;
          }

          if (params.anchor === 'bottom') {
            endPosition = windowHeight - DRAWER_SIZE;
          }

          expect(screen.getByTestId('drawer').getBoundingClientRect()[testParam]).to.equal(
            endPosition,
          );
        });

        it('should stay closed when not swiping far enough', () => {
          // simulate open swipe that doesn't swipe far enough
          const handleOpen = spy();
          render(
            <SwipeableDrawer
              anchor={params.anchor}
              onOpen={handleOpen}
              onClose={() => {}}
              open={false}
              slotProps={{
                paper: { component: FakePaper },
              }}
            >
              <div>SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[0] })],
          });
          fireEvent.touchMove(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[1] })],
          });
          fireEvent.touchEnd(swipeArea, {
            changedTouches: [
              new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[1] }),
            ],
          });
          expect(handleOpen.callCount).to.equal(0);
        });

        it('should stay opened when not swiping far enough', () => {
          // simulate close swipe that doesn't swipe far enough
          const handleClose = spy();
          render(
            <SwipeableDrawer
              anchor={params.anchor}
              onOpen={() => {}}
              onClose={handleClose}
              open
              slotProps={{
                paper: { component: FakePaper },
              }}
            >
              <div data-testid="drawer">SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const drawer = screen.getByTestId('drawer');

          fireEvent.touchStart(drawer, {
            touches: [new Touch({ identifier: 0, target: drawer, ...params.closeTouches[0] })],
          });
          fireEvent.touchMove(drawer, {
            touches: [new Touch({ identifier: 0, target: drawer, ...params.closeTouches[1] })],
          });
          fireEvent.touchEnd(drawer, {
            changedTouches: [
              new Touch({ identifier: 0, target: drawer, ...params.closeTouches[1] }),
            ],
          });
          expect(handleClose.callCount).to.equal(0);
        });

        it('should slide in a bit when touching near the edge', () => {
          const handleOpen = spy();
          const handleClose = spy();
          render(
            <SwipeableDrawer
              anchor={params.anchor}
              onOpen={handleOpen}
              onClose={handleClose}
              open={false}
              slotProps={{
                paper: { component: FakePaper },
              }}
            >
              <div data-testid="drawer">SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.edgeTouch })],
          });
          const drawer = screen.getByTestId('drawer');
          expect(drawer).not.to.equal(null);

          fireEvent.touchEnd(swipeArea, {
            changedTouches: [new Touch({ identifier: 0, target: swipeArea, ...params.edgeTouch })],
          });

          expect(handleOpen.callCount).to.equal(0);
          expect(handleClose.callCount).to.equal(0);
        });

        it('should let user scroll the page', () => {
          const handleOpen = spy();
          const handleClose = spy();
          render(
            <SwipeableDrawer
              anchor={params.anchor}
              disableDiscovery
              onOpen={handleOpen}
              onClose={handleClose}
              open={false}
              slotProps={{
                paper: { component: FakePaper },
              }}
            >
              <div>SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.ignoreTouch })],
          });
          fireEvent.touchEnd(swipeArea, {
            changedTouches: [
              new Touch({ identifier: 0, target: swipeArea, ...params.ignoreTouch }),
            ],
          });
          expect(handleOpen.callCount).to.equal(0);
          expect(handleClose.callCount).to.equal(0);
        });
      });
    });

    it('uses reduced motion timing when an opening swipe is aborted', () => {
      const handleOpen = spy();
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      render(
        <ThemeProvider theme={theme}>
          <SwipeableDrawer
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            transitionDuration={123}
            slotProps={{
              paper: { component: FakePaper, 'data-testid': 'paper' },
            }}
          >
            <div>SwipeableDrawer</div>
          </SwipeableDrawer>
        </ThemeProvider>,
      );

      const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');
      const paper = screen.getByTestId('paper');

      fireEvent.touchStart(swipeArea, {
        touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 0, clientY: 0 })],
      });
      fireEvent.touchMove(swipeArea, {
        touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 20, clientY: 0 })],
      });

      expect(paper.style.transition).to.equal('');

      fireEvent.touchEnd(swipeArea, {
        changedTouches: [new Touch({ identifier: 0, target: swipeArea, pageX: 20, clientY: 0 })],
      });

      expect(handleOpen.callCount).to.equal(0);
      if (isJsdom()) {
        expect(paper.style.transition).to.include('0ms');
      } else {
        expect(paper.style.transitionDuration).to.equal('0ms');
      }
    });

    it('should abort when the SwipeableDrawer is closed', () => {
      const handleClose = spy();
      const { setProps } = render(
        <SwipeableDrawer
          onOpen={() => {}}
          onClose={handleClose}
          open
          slotProps={{
            paper: { component: FakePaper },
          }}
        >
          <div data-testid="drawer">SwipeableDrawer</div>
        </SwipeableDrawer>,
      );
      const drawer = screen.getByTestId('drawer');

      fireEvent.touchStart(drawer, {
        touches: [new Touch({ identifier: 0, target: drawer, pageX: 250, clientY: 0 })],
      });
      fireEvent.touchMove(drawer, {
        touches: [new Touch({ identifier: 0, target: drawer, pageX: 180, clientY: 0 })],
      });
      setProps({
        open: false,
      });
      fireEvent.touchEnd(drawer, {
        changedTouches: [new Touch({ identifier: 0, target: drawer, pageX: 10, clientY: 0 })],
      });
      expect(handleClose.callCount).to.equal(0);
    });

    it('removes event listeners on unmount', () => {
      const { unmount } = render(
        <SwipeableDrawer
          onOpen={() => {}}
          onClose={() => {}}
          open={false}
          slotProps={{
            paper: { component: FakePaper },
          }}
        >
          <div>SwipeableDrawer</div>
        </SwipeableDrawer>,
      );

      const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');
      fireEvent.touchStart(swipeArea, {
        touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 250, clientY: 0 })],
      });
      unmount();
      //  trigger setState warning if listeners aren't cleaned.
      fireEvent.touchMove(swipeArea, {
        touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 180, clientY: 0 })],
      });
      //  trigger setState warning if swipe handling is not cleaned, too
      fireEvent.touchStart(swipeArea, {
        touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 250, clientY: 0 })],
      });
    });

    it('toggles swipe handling when the variant is changed', () => {
      const { setProps } = render(
        <SwipeableDrawer
          onOpen={() => {}}
          onClose={() => {}}
          open={false}
          slotProps={{
            paper: { component: FakePaper },
          }}
        >
          <div>SwipeableDrawer</div>
        </SwipeableDrawer>,
      );

      // variant is 'temporary' by default
      expect(document.querySelector('[class*=PrivateSwipeArea-root]')).not.to.equal(null);
      setProps({ variant: 'persistent' });
      expect(document.querySelector('[class*=PrivateSwipeArea-root]')).to.equal(null);
      setProps({ variant: 'temporary' });
      expect(document.querySelector('[class*=PrivateSwipeArea-root]')).not.to.equal(null);
    });

    const openTouchesForSwipingChildren = [
      { pageX: 0, clientY: windowHeight - 20 },
      { pageX: 0, clientY: windowHeight - 60 },
      { pageX: 0, clientY: windowHeight - 180 },
    ];

    const handleHeight = 60;

    describe('prop: allowSwipeInChildren', () => {
      it('should allow swiping on children to open', () => {
        const handleOpen = spy();
        render(
          <SwipeableDrawer
            anchor={'bottom'}
            allowSwipeInChildren
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            swipeAreaWidth={20}
            ModalProps={{
              keepMounted: true,
              sx: {
                transform: `translateY(${handleHeight}px) !important`,
              },
            }}
            slotProps={{
              paper: { component: FakePaper },
              swipeArea: {
                style: {
                  // ensure clicks will not be grabbed by swipe area to ensure testing just this functionality
                  pointerEvents: 'none',
                },
              },
            }}
          >
            <div data-testid="drawer" style={{ position: 'relative', pointerEvents: 'all' }}>
              <div
                data-testid="handle"
                style={{
                  position: 'absolute',
                  height: `${handleHeight}px`,
                  marginTop: `-${handleHeight}px`,
                }}
              >
                SwipeableDrawer
              </div>
            </div>
          </SwipeableDrawer>,
        );

        const handle = screen.getAllByTestId('handle').slice(-1)[0];

        fireEvent.touchStart(handle, {
          touches: [
            new Touch({ identifier: 0, target: handle, ...openTouchesForSwipingChildren[0] }),
          ],
        });
        fireEvent.touchMove(handle, {
          touches: [
            new Touch({ identifier: 0, target: handle, ...openTouchesForSwipingChildren[1] }),
          ],
        });
        fireEvent.touchMove(handle, {
          touches: [
            new Touch({ identifier: 0, target: handle, ...openTouchesForSwipingChildren[2] }),
          ],
        });
        fireEvent.touchEnd(handle, {
          changedTouches: [
            new Touch({ identifier: 0, target: handle, ...openTouchesForSwipingChildren[2] }),
          ],
        });
        expect(handleOpen.callCount).to.equal(1);
      });

      it('should not allow swiping on children to open that are excluded via a function', () => {
        const handleOpen = spy();
        render(
          <SwipeableDrawer
            anchor={'bottom'}
            allowSwipeInChildren={(event) => {
              const elem = event.target;
              // ignore touch events from .ignore &^ from swipe area
              return (
                !elem.classList.contains('ignore') &&
                !elem.classList.contains('PrivateSwipeArea-root')
              );
            }}
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            swipeAreaWidth={20}
            ModalProps={{
              keepMounted: true,
              sx: {
                '& > *': {
                  pointerEvents: 'auto',
                },
              },
            }}
            slotProps={{
              root: {},
              paper: { component: FakePaper },
              swipeArea: {
                style: {
                  // ensure clicks will not be grabbed by swipe area to ensure testing just this functionality
                  pointerEvents: 'none',
                },
              },
            }}
          >
            <div
              className="ignore"
              data-testid="drawer"
              style={{ position: 'relative', height: '40px', pointerEvents: 'all' }}
            >
              <div
                data-testid="handle"
                style={{ position: 'absolute', height: '40px', marginTop: '-40px' }}
              >
                SwipeableDrawer
              </div>
            </div>
          </SwipeableDrawer>,
        );

        // should ignore the drawer touch events
        const drawer = screen.getAllByTestId('drawer').slice(-1)[0];

        fireEvent.touchStart(drawer, {
          touches: [
            new Touch({ identifier: 0, target: drawer, ...openTouchesForSwipingChildren[0] }),
          ],
        });
        fireEvent.touchMove(drawer, {
          touches: [
            new Touch({ identifier: 0, target: drawer, ...openTouchesForSwipingChildren[1] }),
          ],
        });
        fireEvent.touchMove(drawer, {
          touches: [
            new Touch({ identifier: 0, target: drawer, ...openTouchesForSwipingChildren[2] }),
          ],
        });
        fireEvent.touchEnd(drawer, {
          changedTouches: [
            new Touch({ identifier: 0, target: drawer, ...openTouchesForSwipingChildren[2] }),
          ],
        });
        expect(handleOpen.callCount).to.equal(0);

        // should allow opening the drawer via handle
        const handle = screen.getAllByTestId('handle').slice(-1)[0];

        fireEvent.touchStart(handle, {
          touches: [
            new Touch({ identifier: 0, target: handle, ...openTouchesForSwipingChildren[0] }),
          ],
        });
        fireEvent.touchMove(handle, {
          touches: [
            new Touch({ identifier: 0, target: handle, ...openTouchesForSwipingChildren[1] }),
          ],
        });
        fireEvent.touchMove(handle, {
          touches: [
            new Touch({ identifier: 0, target: handle, ...openTouchesForSwipingChildren[2] }),
          ],
        });
        fireEvent.touchEnd(handle, {
          changedTouches: [
            new Touch({ identifier: 0, target: handle, ...openTouchesForSwipingChildren[2] }),
          ],
        });
        expect(handleOpen.callCount).to.equal(1);
      });
    });
  });

  it('should be able to attach paper ref passed through PaperProps', () => {
    const ref = React.createRef();
    render(
      <SwipeableDrawer
        onOpen={() => {}}
        onClose={() => {}}
        open
        slotProps={{
          paper: { ref },
        }}
      >
        <div />
      </SwipeableDrawer>,
    );
    expect(ref.current).not.to.equal(null);
  });

  describe('disableSwipeToOpen', () => {
    it('should not support swipe to open if disableSwipeToOpen is set', () => {
      const handleOpen = spy();
      render(
        <SwipeableDrawer
          disableSwipeToOpen
          onOpen={handleOpen}
          onClose={() => {}}
          open={false}
          slotProps={{
            paper: { component: FakePaper },
          }}
        >
          <div>SwipeableDrawer</div>
        </SwipeableDrawer>,
      );

      fireEvent.touchStart(document.body, {
        touches: [new Touch({ identifier: 0, target: document.body, pageX: 10, clientY: 0 })],
      });
      fireEvent.touchMove(document.body, {
        touches: [new Touch({ identifier: 0, target: document.body, pageX: 150, clientY: 0 })],
      });
      fireEvent.touchEnd(document.body, {
        changedTouches: [
          new Touch({ identifier: 0, target: document.body, pageX: 250, clientY: 0 }),
        ],
      });

      expect(handleOpen.callCount).to.equal(0);
    });

    it('should support swipe to close if disableSwipeToOpen is set', () => {
      const handleClose = spy();
      render(
        <SwipeableDrawer
          disableSwipeToOpen
          onOpen={() => {}}
          onClose={handleClose}
          open
          slotProps={{
            paper: { component: FakePaper, 'data-testid': 'paper' },
          }}
        >
          <div>SwipeableDrawer</div>
        </SwipeableDrawer>,
      );

      const paper = screen.getByTestId('paper');
      fireEvent.touchStart(paper, {
        touches: [new Touch({ identifier: 0, target: paper, pageX: 250, clientY: 0 })],
      });
      fireEvent.touchMove(document.body, {
        touches: [new Touch({ identifier: 0, target: document.body, pageX: 150, clientY: 0 })],
      });
      fireEvent.touchEnd(document.body, {
        changedTouches: [
          new Touch({ identifier: 0, target: document.body, pageX: 10, clientY: 0 }),
        ],
      });

      expect(handleClose.callCount).to.equal(1);
    });
  });

  describe('lock', () => {
    it('should handle a single swipe at the time', () => {
      const handleOpen = spy();
      render(
        <div>
          <SwipeableDrawer
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            slotProps={{
              paper: { component: FakePaper },
              swipeArea: { 'data-testid': 'swipearea' },
            }}
          >
            <div>Drawer1</div>
          </SwipeableDrawer>
          <SwipeableDrawer
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            slotProps={{
              paper: { component: FakePaper },
              swipeArea: { 'data-testid': 'swipearea' },
            }}
          >
            <div>Drawer2</div>
          </SwipeableDrawer>
        </div>,
      );

      // Event order recorded with https://codesandbox.io/p/sandbox/single-swipearea-lock-ksyss
      const topMostSwipeArea = screen.getAllByTestId('swipearea').slice(-1)[0];
      fireEvent.touchStart(topMostSwipeArea, {
        touches: [new Touch({ identifier: 0, target: topMostSwipeArea, pageX: 0, clientY: 0 })],
      });
      fireEvent.touchMove(topMostSwipeArea, {
        touches: [new Touch({ identifier: 0, target: topMostSwipeArea, pageX: 20, clientY: 0 })],
      });
      fireEvent.touchMove(topMostSwipeArea, {
        touches: [new Touch({ identifier: 0, target: topMostSwipeArea, pageX: 180, clientY: 0 })],
      });
      fireEvent.touchEnd(topMostSwipeArea, {
        changedTouches: [
          new Touch({ identifier: 0, target: topMostSwipeArea, pageX: 180, clientY: 0 }),
        ],
      });

      expect(handleOpen.callCount).to.equal(1);
    });
  });

  it('does not crash when updating the parent component while swiping', () => {
    render(
      <SwipeableDrawer
        onOpen={() => {}}
        onClose={() => {}}
        open={false}
        slotProps={{
          paper: { component: NullPaper },
          swipeArea: { 'data-testid': 'swipearea' },
        }}
      >
        <div>SwipeableDrawer</div>
      </SwipeableDrawer>,
    );

    const swipeArea = screen.getByTestId('swipearea');
    fireEvent.touchStart(swipeArea, {
      touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 0, clientY: 0 })],
    });
    // simulate paper ref being null because of the drawer being updated
    fireEvent.touchMove(document.body, {
      touches: [new Touch({ identifier: 0, target: document.body, pageX: 20, clientY: 0 })],
    });
  });

  describe('no backdrop', () => {
    it('should hide backdrop', () => {
      render(<SwipeableDrawer onClose={() => {}} onOpen={() => {}} open hideBackdrop />);
      expect(document.querySelector(`.${backdropClasses.root}`)).to.equal(null);
    });

    it('does not crash when backdrop is hidden while swiping', () => {
      render(<SwipeableDrawer onClose={() => {}} onOpen={() => {}} open hideBackdrop />);
      const drawer = document.querySelector(`.${drawerClasses.root}`);
      fireEvent.touchStart(drawer, {
        touches: [new Touch({ identifier: 0, target: drawer, pageX: 0, clientY: 0 })],
      });
    });
  });

  describe('native scroll', () => {
    // Need layout
    it.skipIf(isJsdom())('should not drag is native scroll is available', function test() {
      const handleClose = spy();
      render(
        <SwipeableDrawer onOpen={() => {}} onClose={handleClose} anchor="bottom" open>
          <div style={{ height: 10000, flexShrink: 0 }}>
            <div data-testid="drawer">SwipeableDrawer</div>
          </div>
        </SwipeableDrawer>,
      );

      const windowHeight = window.innerHeight;
      const drawer = screen.getByTestId('drawer');

      const Paper = document.querySelector('.MuiPaper-root');
      Paper.scrollTop = 10;

      // Perform a full swipe down to close sequence
      fireEvent.touchStart(drawer, {
        touches: [
          new Touch({ identifier: 0, target: drawer, pageX: 0, clientY: windowHeight - 200 }),
        ],
      });
      fireEvent.touchMove(drawer, {
        touches: [
          new Touch({ identifier: 0, target: drawer, pageX: 0, clientY: windowHeight - 180 }),
        ],
      });
      fireEvent.touchMove(drawer, {
        touches: [
          new Touch({ identifier: 0, target: drawer, pageX: 0, clientY: windowHeight - 10 }),
        ],
      });
      fireEvent.touchEnd(drawer, {
        changedTouches: [
          new Touch({ identifier: 0, target: drawer, pageX: 0, clientY: windowHeight - 10 }),
        ],
      });
      expect(handleClose.callCount).to.equal(0);
    });
  });

  // Need layouting
  it.skipIf(isJsdom())('should not prevent scrolling a container', function test() {
    const handleTouchMove = spy();

    function Test() {
      React.useEffect(() => {
        document.addEventListener('touchmove', handleTouchMove);
        return () => {
          document.removeEventListener('touchmove', handleTouchMove);
        };
      }, []);

      return (
        <SwipeableDrawer anchor="top" open onOpen={() => {}} onClose={() => {}}>
          <div style={{ width: 1000, height: 100 }} data-testid="target" />
        </SwipeableDrawer>
      );
    }

    render(<Test />);
    const target = screen.getByTestId('target');
    // Perform a full swipe left to horizontally scroll
    fireEvent.touchStart(target, {
      touches: [new Touch({ identifier: 0, target, pageX: 100, clientY: 0 })],
    });
    fireEvent.touchMove(target, {
      touches: [new Touch({ identifier: 0, target, pageX: 50, clientY: 0 })],
    });
    expect(handleTouchMove.callCount).to.equal(1);
    expect(handleTouchMove.firstCall.args[0]).to.have.property('defaultPrevented', false);
  });

  // Need layouting
  it.skipIf(isJsdom())(
    'should not ignore scroll container if parent is overflow hidden',
    function test() {
      const handleTouchMove = spy();

      function Test() {
        React.useEffect(() => {
          document.addEventListener('touchmove', handleTouchMove);
          return () => {
            document.removeEventListener('touchmove', handleTouchMove);
          };
        }, []);

        return (
          <SwipeableDrawer anchor="left" open onOpen={() => {}} onClose={() => {}}>
            <div style={{ overflow: 'hidden', width: 100 }}>
              <div style={{ overflow: 'auto' }}>
                <div style={{ width: 1000, height: 100 }} data-testid="target" />
              </div>
            </div>
          </SwipeableDrawer>
        );
      }

      render(<Test />);
      const target = screen.getByTestId('target');
      // Perform a full swipe left to horizontally scroll
      fireEvent.touchStart(target, {
        touches: [new Touch({ identifier: 0, target, pageX: 100, clientY: 0 })],
      });
      fireEvent.touchMove(target, {
        touches: [new Touch({ identifier: 0, target, pageX: 50, clientY: 0 })],
      });

      expect(handleTouchMove.callCount).to.equal(1);
      expect(handleTouchMove.firstCall.args[0]).to.have.property('defaultPrevented', false);
    },
  );

  describe('prop: transitionDuration', () => {
    it.skipIf(isJsdom())('should render the default theme values by default', function test() {
      const theme = createTheme();
      const enteringScreenDurationInSeconds = theme.transitions.duration.enteringScreen / 1000;
      render(<SwipeableDrawer onOpen={() => {}} onClose={() => {}} open />);

      const backdropRoot = document.querySelector(`.${backdropClasses.root}`);
      expect(backdropRoot).toHaveComputedStyle({
        transitionDuration: `${enteringScreenDurationInSeconds}s`,
      });
    });

    it.skipIf(isJsdom())('should render the custom theme values', function test() {
      const theme = createTheme({
        transitions: {
          duration: {
            enteringScreen: 1,
          },
        },
      });

      render(
        <ThemeProvider theme={theme}>
          <SwipeableDrawer onOpen={() => {}} onClose={() => {}} open />
        </ThemeProvider>,
      );

      const backdropRoot = document.querySelector(`.${backdropClasses.root}`);
      expect(backdropRoot).toHaveComputedStyle({
        transitionDuration: '0.001s',
      });
    });

    it.skipIf(isJsdom())('should render the values provided via prop', function test() {
      render(<SwipeableDrawer onOpen={() => {}} onClose={() => {}} open transitionDuration={1} />);

      const backdropRoot = document.querySelector(`.${backdropClasses.root}`);
      expect(backdropRoot).toHaveComputedStyle({
        transitionDuration: '0.001s',
      });
    });
  });
});
