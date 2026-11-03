import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { act, createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TouchRipple, { DELAY_RIPPLE } from './TouchRipple';
import touchRippleClasses from './touchRippleClasses';
import describeConformance from '../../test/describeConformance';

const cb = () => {};

describe('<TouchRipple />', () => {
  const { clock, render } = createRenderer();

  /**
   * @param {object} other Props to pass to TouchRipple.
   */
  function renderTouchRipple(other, theme) {
    const touchRippleRef = React.createRef();
    const touchRipple = (
      <TouchRipple
        ref={touchRippleRef}
        classes={{
          ripple: 'ripple',
          rippleVisible: 'ripple-visible',
          child: 'child',
          childLeaving: 'child-leaving',
        }}
        {...other}
      />
    );
    const { container, unmount } = render(
      theme ? <ThemeProvider theme={theme}>{touchRipple}</ThemeProvider> : touchRipple,
    );

    return {
      instance: touchRippleRef.current,
      queryAllRipples() {
        return container.querySelectorAll('.ripple');
      },
      queryAllActiveRipples() {
        return container.querySelectorAll('.ripple-visible .child:not(.child-leaving)');
      },
      queryAllStoppingRipples() {
        return container.querySelectorAll('.ripple-visible .child-leaving');
      },
      queryRipple() {
        return container.querySelector('.ripple');
      },
      unmount,
    };
  }

  function collectCssRules(element) {
    const classNames = Array.from(element.classList);
    const cssRules = [];

    function collectFromRules(rules) {
      Array.from(rules).forEach((rule) => {
        if ('cssRules' in rule) {
          collectFromRules(rule.cssRules);
        }

        if (
          'selectorText' in rule &&
          classNames.some((className) => rule.selectorText.includes(`.${className}`))
        ) {
          cssRules.push(rule.cssText);
        }
      });
    }

    Array.from(document.styleSheets).forEach((styleSheet) => {
      try {
        collectFromRules(styleSheet.cssRules);
      } catch {
        // Ignore style sheets that the browser does not expose to tests.
      }
    });

    return cssRules.join('\n');
  }

  describeConformance(<TouchRipple />, () => ({
    classes: {},
    inheritComponent: 'span',
    render,
    refInstanceof: Object,
    muiName: 'MuiTouchRipple',
    skip: ['componentProp', 'refForwarding', 'themeStyleOverrides', 'themeVariants'],
  }));

  describe('prop: center', () => {
    it('should compute the right ripple dimensions', () => {
      const { instance, queryRipple } = renderTouchRipple({ center: true });

      act(() => {
        instance.start(
          {},
          {
            fakeElement: true,
          },
          cb,
        );
      });

      expect(queryRipple()).toHaveInlineStyle({ height: '1px' });
      expect(queryRipple()).toHaveInlineStyle({ width: '1px' });
    });
  });

  it('should create individual ripples', () => {
    const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

    expect(queryAllActiveRipples()).to.have.lengthOf(0);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    act(() => {
      instance.start({ clientX: 0, clientY: 0 }, cb);
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(1);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    act(() => {
      instance.start({ clientX: 0, clientY: 0 }, cb);
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(2);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    act(() => {
      instance.start({ clientX: 0, clientY: 0 }, cb);
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(3);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    act(() => {
      instance.stop({ type: 'mouseup' });
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(2);
    expect(queryAllStoppingRipples()).to.have.lengthOf(1);

    act(() => {
      instance.stop({ type: 'mouseup' });
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(1);
    expect(queryAllStoppingRipples()).to.have.lengthOf(2);

    act(() => {
      instance.stop({ type: 'mouseup' });
    });

    expect(queryAllActiveRipples()).to.have.lengthOf(0);
    expect(queryAllStoppingRipples()).to.have.lengthOf(3);
  });

  describe('reduced motion', () => {
    clock.withFakeTimers();

    it('omits animation declarations but keeps visible feedback when reduced motion is always', () => {
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });
      const { instance, queryRipple } = renderTouchRipple({}, theme);

      act(() => {
        instance.start({ clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      });

      const cssRules = collectCssRules(queryRipple());

      expect(cssRules).not.to.include('animation-');
      expect(cssRules).to.match(/opacity:\s*0\.3/);
      expect(cssRules).to.match(/transform:\s*scale\(1\)/);
    });

    it('removes stopped ripples after 0ms when reduced motion is always', () => {
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });
      const { instance, queryAllRipples, queryAllActiveRipples, queryAllStoppingRipples } =
        renderTouchRipple({}, theme);

      act(() => {
        instance.start({ clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(1);

      act(() => {
        instance.stop({ type: 'mouseup' });
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(1);

      act(() => {
        clock.tick(0);
      });

      expect(queryAllRipples()).to.have.lengthOf(0);
    });
  });

  describe('focus ripple exit', () => {
    clock.withFakeTimers();

    it('hides the leaving focus ripple immediately, then removes it', () => {
      const ref = React.createRef();
      const { container } = render(<TouchRipple ref={ref} />);

      act(() => {
        ref.current.start({}, { pulsate: true, fakeElement: true }, cb);
      });

      const child = container.querySelector(`.${touchRippleClasses.child}`);
      expect(window.getComputedStyle(child).opacity).to.equal('1');

      act(() => {
        ref.current.stop({ type: 'blur' });
      });

      // `.childLeaving { opacity: 0 }` must win over `.child { opacity: 1 }`, else
      // a focus (pulsate) ripple lingers until removal instead of hiding on blur.
      expect(child).to.have.class(touchRippleClasses.childLeaving);
      expect(window.getComputedStyle(child).opacity).to.equal('0');

      act(() => {
        clock.runAll();
      });

      expect(container.querySelector(`.${touchRippleClasses.child}`)).to.equal(null);
    });
  });

  it('keeps exiting ripples in place when a new ripple starts', () => {
    const { instance, queryAllRipples, queryAllActiveRipples, queryAllStoppingRipples } =
      renderTouchRipple();

    act(() => {
      instance.start({ clientX: 1, clientY: 1 }, { fakeElement: true }, cb);
      instance.start({ clientX: 2, clientY: 2 }, { fakeElement: true }, cb);
    });

    act(() => {
      instance.stop({ type: 'mouseup' });
    });

    act(() => {
      instance.start({ clientX: 3, clientY: 3 }, { fakeElement: true }, cb);
    });

    const ripples = queryAllRipples();

    expect(ripples).to.have.lengthOf(3);
    expect(queryAllActiveRipples()).to.have.lengthOf(2);
    expect(queryAllStoppingRipples()).to.have.lengthOf(1);
    expect(ripples[0].querySelector('.child')).to.have.class('child-leaving');
    expect(ripples[2].querySelector('.child')).not.to.have.class('child-leaving');
  });

  it('renders a new ripple before the final group of exiting ripples', () => {
    const { instance, queryAllRipples, queryAllActiveRipples, queryAllStoppingRipples } =
      renderTouchRipple();

    act(() => {
      instance.start({ clientX: 1, clientY: 1 }, { fakeElement: true }, cb);
    });

    act(() => {
      instance.stop({ type: 'mouseup' });
    });

    act(() => {
      instance.start({ clientX: 2, clientY: 2 }, { fakeElement: true }, cb);
    });

    const ripples = queryAllRipples();

    expect(ripples).to.have.lengthOf(2);
    expect(queryAllActiveRipples()).to.have.lengthOf(1);
    expect(queryAllStoppingRipples()).to.have.lengthOf(1);
    expect(ripples[0].querySelector('.child')).not.to.have.class('child-leaving');
    expect(ripples[1].querySelector('.child')).to.have.class('child-leaving');
  });

  describe('creating unique ripples', () => {
    it('should create a ripple', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      act(() => {
        instance.start(
          {},
          {
            pulsate: true,
            fakeElement: true,
          },
          cb,
        );
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
    });

    it('should ignore a mousedown event after a touchstart event', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      act(() => {
        instance.start({ type: 'touchstart' }, cb);
        instance.start({ type: 'mousedown' }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
    });

    it('should create a specific ripple', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples, queryRipple } =
        renderTouchRipple({
          center: true,
        });
      const clientX = 1;
      const clientY = 1;

      act(() => {
        instance.start({ clientX, clientY }, { fakeElement: true }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
      expect(queryRipple()).toHaveInlineStyle({ top: '-0.5px' });
      expect(queryRipple()).toHaveInlineStyle({ left: '-0.5px' });
    });
  });

  describe('mobile', () => {
    clock.withFakeTimers();

    it('should delay the display of the ripples', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      act(() => {
        instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE);

      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE);
      act(() => {
        instance.stop({ type: 'touchend' }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(1);
    });

    it('should trigger the ripple for short touch interactions', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      act(() => {
        instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE / 2);

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      act(() => {
        instance.stop({ type: 'touchend' }, cb);
      });

      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(1);

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(1);
    });

    it('should interrupt the ripple schedule', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE / 2);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      instance.stop({ type: 'touchmove' });
      clock.tick(DELAY_RIPPLE);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
    });

    it('should not leak on multi-touch', function multiTouchTest() {
      const { instance, unmount } = renderTouchRipple();

      instance.start({ type: 'touchstart', touches: [{}] }, () => {});
      instance.start({ type: 'touchstart', touches: [{}] }, () => {});
      unmount();

      // Running delayed ripple work after unmount should not warn about setting state.
      clock.runAll();
    });

    it('should handle empty event.touches', () => {
      const { instance } = renderTouchRipple();

      expect(() =>
        instance.start({ type: 'touchstart', touches: [], clientX: 0, clientY: 0 }),
      ).not.toErrorDev();
    });
  });
});
