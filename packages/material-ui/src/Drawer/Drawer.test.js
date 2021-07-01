import * as React from 'react';
import { expect } from 'chai';
import { useFakeTimers, spy } from 'sinon';
import { act, createClientRender, describeConformanceV5, screen } from 'test/utils';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Drawer, { drawerClasses as classes } from '@material-ui/core/Drawer';
import { getAnchor, isHorizontal } from './Drawer';

describe('<Drawer />', () => {
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

  describeConformanceV5(
    <Drawer open disablePortal>
      <div />
    </Drawer>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiDrawer',
      testVariantProps: { variant: 'persistent' },
      testDeepOverrides: { slotName: 'paper', slotClassName: classes.paper },
      refInstanceof: window.HTMLDivElement,
      skip: [
        'componentProp',
        'componentsProp',
        'themeVariants',
        // react-transition-group issue
        'reactTestRenderer',
      ],
    }),
  );

  describe('prop: variant=temporary', () => {
    describe('transitionDuration property', () => {
      const transitionDuration = {
        enter: 854,
        exit: 2967,
      };

      it('delay the slide transition to complete', () => {
        const handleEntered = spy();
        const { setProps } = render(
          <Drawer
            open={false}
            transitionDuration={transitionDuration}
            SlideProps={{ onEntered: handleEntered }}
          >
            <div />
          </Drawer>,
        );

        setProps({ open: true });

        expect(handleEntered.callCount).to.equal(0);

        act(() => {
          clock.tick(transitionDuration.enter);
        });

        expect(handleEntered.callCount).to.equal(1);
      });
    });

    it('should set the custom className for Modal when variant is temporary', () => {
      render(
        <Drawer className="woofDrawer" open variant="temporary">
          <div />
        </Drawer>,
      );

      expect(document.querySelector(`.${classes.modal}`)).to.have.class('woofDrawer');
    });

    it('should set the Paper className', () => {
      render(
        <Drawer classes={{ paper: 'woofDrawer' }} open>
          <div />
        </Drawer>,
      );

      expect(document.querySelector(`.${classes.paper}`)).to.have.class('woofDrawer');
    });

    it('should be closed by default', () => {
      render(
        <Drawer>
          <div data-testid="child" />
        </Drawer>,
      );

      expect(screen.queryByTestId('child')).to.equal(null);
    });

    describe('opening and closing', () => {
      const transitionDuration = 123;
      const drawerElement = (
        <Drawer transitionDuration={transitionDuration}>
          <div data-testid="child" />
        </Drawer>
      );

      it('should open and close', () => {
        const { setProps } = render(drawerElement);

        setProps({ open: true });

        expect(screen.getByTestId('child')).not.to.equal(null);

        setProps({ open: false });
        act(() => {
          clock.tick(transitionDuration);
        });

        expect(screen.queryByTestId('child')).to.equal(null);
      });
    });
  });

  describe('prop: variant=persistent', () => {
    it('should render a div instead of a Modal when persistent', () => {
      const { container } = render(
        <Drawer variant="persistent">
          <div />
        </Drawer>,
      );

      expect(container.firstChild).to.have.tagName('div');
      expect(container.firstChild).to.have.class(classes.docked);
    });

    it('should render Slide > Paper inside the div', () => {
      const transitionDuration = 123;
      const handleEntered = spy();
      const { container, setProps } = render(
        <Drawer
          open={false}
          transitionDuration={transitionDuration}
          SlideProps={{ onEntered: handleEntered }}
          variant="persistent"
        >
          <div />
        </Drawer>,
      );

      setProps({ open: true });

      expect(handleEntered.callCount).to.equal(0);

      act(() => {
        clock.tick(transitionDuration);
      });

      expect(handleEntered.callCount).to.equal(1);
      expect(container.firstChild.firstChild).to.have.class(classes.paper);
    });
  });

  describe('prop: variant=permanent', () => {
    const drawerElement = (
      <Drawer variant="permanent">
        <div />
      </Drawer>
    );

    it('should render a div instead of a Modal when permanent', () => {
      const { container } = render(drawerElement);
      const root = container.querySelector(`.${classes.root}`);

      expect(root).not.to.equal(null);
      expect(root).to.have.tagName('div');
      expect(root).to.have.class(classes.docked);
    });
  });

  describe('prop: PaperProps', () => {
    it('should merge class names', () => {
      const { container } = render(
        <Drawer PaperProps={{ className: 'my-class' }} variant="permanent">
          <div />
        </Drawer>,
      );
      expect(container.querySelector(`.${classes.paper}`)).to.have.class('my-class');
    });
  });

  describe('slide direction', () => {
    it('should return the opposing slide direction', () => {
      const MockedSlide = React.forwardRef(function MockedSlide(props, ref) {
        const { children, in: inProp, direction } = props;

        if (!inProp) {
          return null;
        }

        return (
          <div data-direction={direction} data-testid="slide" ref={ref} tabIndex={-1}>
            {children}
          </div>
        );
      });

      const { setProps } = render(
        <Drawer open TransitionComponent={MockedSlide}>
          <div />
        </Drawer>,
      );

      setProps({ anchor: 'left' });
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'right');

      setProps({ anchor: 'right' });
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'left');

      setProps({ anchor: 'top' });
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'down');

      setProps({ anchor: 'bottom' });
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'up');
    });
  });

  describe('Right To Left', () => {
    it('should switch left and right anchor when theme is right-to-left', () => {
      const MockedSlide = React.forwardRef(function MockedSlide(props, ref) {
        const { children, in: inProp, direction } = props;

        if (!inProp) {
          return null;
        }

        return (
          <div data-direction={direction} data-testid="slide" ref={ref} tabIndex={-1}>
            {children}
          </div>
        );
      });
      const theme = createTheme({
        direction: 'rtl',
      });
      const { rerender } = render(
        <ThemeProvider theme={theme}>
          <Drawer open anchor="left" TransitionComponent={MockedSlide}>
            <div />
          </Drawer>
        </ThemeProvider>,
      );
      // slide direction for left is right, if left is switched to right, we should get left
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'left');

      rerender(
        <ThemeProvider theme={theme}>
          <Drawer open anchor="right" TransitionComponent={MockedSlide}>
            <div />
          </Drawer>
        </ThemeProvider>,
      );
      // slide direction for right is left, if right is switched to left, we should get right
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'right');
    });
  });

  describe('isHorizontal', () => {
    it('should recognize left and right as horizontal swiping directions', () => {
      expect(isHorizontal('left')).to.equal(true);
      expect(isHorizontal('right')).to.equal(true);
      expect(isHorizontal('top')).to.equal(false);
      expect(isHorizontal('bottom')).to.equal(false);
    });
  });

  describe('getAnchor', () => {
    it('should return the anchor', () => {
      const theme = { direction: 'ltr' };

      expect(getAnchor(theme, 'left')).to.equal('left');
      expect(getAnchor(theme, 'right')).to.equal('right');
      expect(getAnchor(theme, 'top')).to.equal('top');
      expect(getAnchor(theme, 'bottom')).to.equal('bottom');
    });

    it('should switch left/right if RTL is enabled', () => {
      const theme = { direction: 'rtl' };

      expect(getAnchor(theme, 'left')).to.equal('right');
      expect(getAnchor(theme, 'right')).to.equal('left');
    });
  });

  describe('zIndex', () => {
    it('should set correct zIndex on the root element', () => {
      const theme = createTheme();
      render(
        <ThemeProvider theme={theme}>
          <Drawer open>
            <div />
          </Drawer>
        </ThemeProvider>,
      );
      expect(document.querySelector(`.${classes.root}`)).toHaveComputedStyle({
        zIndex: String(theme.zIndex.drawer),
      });
    });
  });
});
