'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useTimeout from '@mui/utils/useTimeout';

/**
 * @ignore - internal component.
 */
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout,
  } = props;
  const [leaving, setLeaving] = React.useState(false);
  const exitTimer = useTimeout();
  const exitTimerStartedRef = React.useRef(false);
  const onExitedRef = React.useRef(onExited);
  onExitedRef.current = onExited;
  const hasExitedCallback = onExited != null;

  const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, {
    [classes.ripplePulsate]: pulsate,
  });

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  };

  const childClassName = clsx(classes.child, {
    [classes.childLeaving]: leaving,
    [classes.childPulsate]: pulsate,
  });

  if (!inProp && !leaving) {
    setLeaving(true);
  }
  React.useEffect(() => {
    if (!inProp && hasExitedCallback) {
      if (!exitTimerStartedRef.current) {
        exitTimerStartedRef.current = true;
        exitTimer.start(timeout, () => {
          exitTimerStartedRef.current = false;
          onExitedRef.current?.();
        });
      }
    } else {
      exitTimerStartedRef.current = false;
      exitTimer.clear();
    }
  }, [exitTimer, hasExitedCallback, inProp, timeout]);

  return (
    <span className={rippleClassName} style={rippleStyles}>
      <span className={childClassName} />
    </span>
  );
}

Ripple.propTypes /* remove-proptypes */ = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  /**
   * @ignore - controlled by TouchRipple
   */
  in: PropTypes.bool,
  /**
   * @ignore - controlled by TouchRipple
   */
  onExited: PropTypes.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: PropTypes.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: PropTypes.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number,
  /**
   * Exit delay.
   */
  timeout: PropTypes.number.isRequired,
};

export default Ripple;
