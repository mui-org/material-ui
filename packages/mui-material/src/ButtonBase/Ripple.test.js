import { describe, it, expect } from 'vitest';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import Ripple from './Ripple';
import classes from './touchRippleClasses';

describe('<Ripple />', () => {
  const { clock, render } = createRenderer();

  it('should have the ripple className', () => {
    const { container } = render(
      <Ripple classes={classes} timeout={0} rippleX={0} rippleY={0} rippleSize={11} />,
    );
    const ripple = container.querySelector('span');
    expect(ripple).to.have.class(classes.ripple);
    expect(ripple).not.to.have.class(classes.fast);
  });

  describe('starting and stopping', () => {
    it('should start the ripple', () => {
      const { container, setProps } = render(
        <Ripple classes={classes} timeout={0} rippleX={0} rippleY={0} rippleSize={11} />,
      );

      setProps({ in: true });

      const ripple = container.querySelector('span');
      expect(ripple).to.have.class(classes.rippleVisible);
    });

    it('should stop the ripple', () => {
      const { container, setProps } = render(
        <Ripple classes={classes} in timeout={0} rippleX={0} rippleY={0} rippleSize={11} />,
      );

      setProps({ in: false });

      const child = container.querySelector('span > span');
      expect(child).to.have.class(classes.childLeaving);
    });
  });

  describe('pulsating and stopping 1', () => {
    it('should render the ripple inside a pulsating Ripple', () => {
      const { container } = render(
        <Ripple classes={classes} timeout={0} rippleX={0} rippleY={0} rippleSize={11} pulsate />,
      );

      const ripple = container.querySelector('span');
      expect(ripple).to.have.class(classes.ripple);
      expect(ripple).to.have.class(classes.ripplePulsate);
      const child = container.querySelector('span > span');
      expect(child).to.have.class(classes.childPulsate);
    });

    it('should start the ripple', () => {
      const { container, setProps } = render(
        <Ripple classes={classes} timeout={0} rippleX={0} rippleY={0} rippleSize={11} pulsate />,
      );

      setProps({ in: true });

      const ripple = container.querySelector('span');
      expect(ripple).to.have.class(classes.rippleVisible);
      const child = container.querySelector('span > span');
      expect(child).to.have.class(classes.childPulsate);
    });

    it('should stop the ripple', () => {
      const { container, setProps } = render(
        <Ripple classes={classes} timeout={0} rippleX={0} rippleY={0} rippleSize={11} pulsate />,
      );

      setProps({ in: true });
      setProps({ in: false });
      const child = container.querySelector('span > span');
      expect(child).to.have.class(classes.childLeaving);
    });
  });

  describe('pulsating and stopping 2', () => {
    clock.withFakeTimers();

    it('handleExit should trigger a timer', () => {
      const handleExited = spy();
      const { setProps } = render(
        <Ripple
          classes={classes}
          timeout={550}
          in
          onExited={handleExited}
          rippleX={0}
          rippleY={0}
          rippleSize={11}
          pulsate
        />,
      );

      setProps({ in: false });
      clock.tick(549);
      expect(handleExited.callCount).to.equal(0);
      clock.tick(1);
      expect(handleExited.callCount).to.equal(1);
    });

    it('does not restart the exit timer when onExited changes while leaving', () => {
      const firstHandleExited = spy();
      const secondHandleExited = spy();
      const { setProps } = render(
        <Ripple
          classes={classes}
          timeout={550}
          in
          onExited={firstHandleExited}
          rippleX={0}
          rippleY={0}
          rippleSize={11}
          pulsate
        />,
      );

      setProps({ in: false });
      clock.tick(300);
      setProps({ in: false, onExited: secondHandleExited });
      clock.tick(249);
      expect(firstHandleExited.callCount).to.equal(0);
      expect(secondHandleExited.callCount).to.equal(0);
      clock.tick(1);
      expect(firstHandleExited.callCount).to.equal(0);
      expect(secondHandleExited.callCount).to.equal(1);
    });

    it('unmount should defuse the handleExit timer', () => {
      const handleExited = spy();
      const { setProps, unmount } = render(
        <Ripple
          classes={classes}
          timeout={550}
          in
          onExited={handleExited}
          rippleX={0}
          rippleY={0}
          rippleSize={11}
          pulsate
        />,
      );

      setProps({ in: false });
      unmount();
      clock.tick(550);
      expect(handleExited.callCount).to.equal(0);
    });
  });
});
