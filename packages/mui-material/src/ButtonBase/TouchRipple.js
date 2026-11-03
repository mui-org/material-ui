'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useOnMount from '@mui/utils/useOnMount';
import useTimeout from '@mui/utils/useTimeout';
import { keyframes, css, styled, useTheme } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import Ripple from './Ripple';
import touchRippleClasses from './touchRippleClasses';
import useEventCallback from '../utils/useEventCallback';
import useReducedMotion from '../transitions/useReducedMotion';

const DURATION = 550;
export const DELAY_RIPPLE = 80;

const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];
const NOOP = () => {};

/**
 * Keep the same DOM order TouchRipple had when it used react-transition-group:
 * exiting ripples stay in place, and new ripples are inserted before the final
 * group of ripples that are waiting for their exit animation to finish.
 *
 * @param {number[]} prevOrder The previous DOM order, including ripples that may be exiting.
 * @param {number[]} nextActiveKeys The ripples that should still be treated as active.
 * @returns {number[]} The next DOM order, preserving the position of exiting ripples where possible.
 */
function mergeRippleOrder(prevOrder, nextActiveKeys) {
  const nextKeySet = new Set(nextActiveKeys);
  const nextKeysPending = new Map();
  let pendingKeys = [];

  for (const prevKey of prevOrder) {
    if (nextKeySet.has(prevKey)) {
      if (pendingKeys.length > 0) {
        nextKeysPending.set(prevKey, pendingKeys);
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  const nextOrder = [];

  for (const nextKey of nextActiveKeys) {
    const pendingBefore = nextKeysPending.get(nextKey);

    if (pendingBefore) {
      nextOrder.push(...pendingBefore);
    }

    nextOrder.push(nextKey);
  }

  nextOrder.push(...pendingKeys);

  return nextOrder;
}

/**
 * Calculate where the ripple should start and how large it must be to cover the host element.
 *
 * @param {object} params
 * @param {object} params.event The mouse or touch event that started the ripple.
 * @param {HTMLElement | null} params.element The host element used for measurements. Tests pass `null`.
 * @param {boolean} params.center If `true`, start the ripple from the center of the host element.
 * @returns {{ rippleX: number, rippleY: number, rippleSize: number }} The ripple position and size.
 */
function computeRippleState({ event, element, center }) {
  const rect = element
    ? element.getBoundingClientRect()
    : {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };

  let rippleX;
  let rippleY;

  if (
    center ||
    event === undefined ||
    (event.clientX === 0 && event.clientY === 0) ||
    (!event.clientX && !event.touches)
  ) {
    rippleX = Math.round(rect.width / 2);
    rippleY = Math.round(rect.height / 2);
  } else {
    const { clientX, clientY } =
      event.touches && event.touches.length > 0 ? event.touches[0] : event;
    rippleX = Math.round(clientX - rect.left);
    rippleY = Math.round(clientY - rect.top);
  }

  let rippleSize;

  if (center) {
    rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

    // Mobile Chrome can skip this animation for even pixel sizes.
    if (rippleSize % 2 === 0) {
      rippleSize += 1;
    }
  } else {
    const sizeX =
      Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
    const sizeY =
      Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
    rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
  }

  return { rippleX, rippleY, rippleSize };
}

const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;

const exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;

function getAnimationStyles(theme) {
  if (theme.motion.reducedMotion === 'always') {
    return null;
  }

  const styles = css`
    &.${touchRippleClasses.rippleVisible} {
      animation-name: ${enterKeyframe};
      animation-duration: ${DURATION}ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
    }

    &.${touchRippleClasses.ripplePulsate} {
      animation-duration: ${theme.transitions.duration.shorter}ms;
    }

    & .${touchRippleClasses.childLeaving} {
      animation-name: ${exitKeyframe};
      animation-duration: ${DURATION}ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
    }

    & .${touchRippleClasses.childPulsate} {
      animation-name: ${pulsateKeyframe};
      animation-duration: 2500ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;

  if (theme.motion.reducedMotion === 'system') {
    return css`
      @media (prefers-reduced-motion: no-preference) {
        ${styles}
      }
    `;
  }

  return styles;
}

export const TouchRippleRoot = styled('span', {
  name: 'MuiTouchRipple',
  slot: 'Root',
})({
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit',
});

// This `styled()` call uses keyframes. styled-components only supports keyframes
// in template strings, so do not convert these styles to a JS object.
export const TouchRippleRipple = styled(Ripple, {
  name: 'MuiTouchRipple',
  slot: 'Ripple',
})`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
  }

  /*
   * Order matters: 'child', 'childLeaving' and 'childPulsate' apply to the same
   * element with equal specificity, so the later rule wins. 'child' must come
   * before 'childLeaving' so the leaving 'opacity: 0' takes precedence. A focus
   * (pulsate) ripple keeps 'pulsateKeyframe' (no opacity animation) on exit, so
   * it relies on this static 'opacity: 0' to disappear on blur instead of
   * lingering until removal.
   */
  & .${touchRippleClasses.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${touchRippleClasses.childLeaving} {
    opacity: 0;
  }

  & .${touchRippleClasses.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({ theme }) => getAnimationStyles(theme)}
`;

/**
 * @ignore - internal component.
 */
const TouchRipple = React.forwardRef(function TouchRipple(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTouchRipple' });
  const theme = useTheme();
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, false);

  const { center: centerProp = false, classes = EMPTY_OBJ, className, ...other } = props;
  // Store ripples as data so we can keep exiting ripples mounted until their
  // exit animation ends. Ripple calls onExited when it is safe to remove one.
  const [rippleState, setRippleState] = React.useState({
    items: EMPTY_ARRAY,
    order: EMPTY_ARRAY,
  });
  const ripples = rippleState.items;
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef(null);
  const mountedRef = React.useRef(false);

  useOnMount(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);

  // Used to filter out mouse emulated events on mobile.
  const ignoringMouseDown = React.useRef(false);
  // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.
  const startTimer = useTimeout();

  // Holds delayed touch-start work until the delay expires or touchend forces it to run.
  const startTimerCommit = React.useRef(null);
  const container = React.useRef(null);

  const handleExited = useEventCallback((key) => {
    if (!mountedRef.current) {
      return;
    }
    setRippleState((prevState) => {
      const nextItems = prevState.items.filter((ripple) => ripple.key !== key);
      const nextOrder = mergeRippleOrder(
        prevState.order.filter((rippleKey) => rippleKey !== key),
        nextItems.filter((ripple) => !ripple.exiting).map((ripple) => ripple.key),
      );

      return { items: nextItems, order: nextOrder };
    });
  });

  const startCommit = useEventCallback((params) => {
    const { pulsate, rippleX, rippleY, rippleSize, cb } = params;
    const key = nextKey.current;
    nextKey.current += 1;

    setRippleState((prevState) => {
      const nextItems = [
        ...prevState.items,
        {
          key,
          pulsate,
          rippleX,
          rippleY,
          rippleSize,
          exiting: false,
        },
      ];

      return {
        items: nextItems,
        order: mergeRippleOrder(
          prevState.order,
          nextItems.filter((ripple) => !ripple.exiting).map((ripple) => ripple.key),
        ),
      };
    });
    rippleCallback.current = cb;
  });

  const start = useEventCallback((event = EMPTY_OBJ, options = EMPTY_OBJ, cb = NOOP) => {
    const {
      pulsate = false,
      center = centerProp || options.pulsate,
      fakeElement = false, // Used only by tests.
    } = options;

    if (event?.type === 'mousedown' && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }

    if (event?.type === 'touchstart') {
      ignoringMouseDown.current = true;
    }

    const element = fakeElement ? null : container.current;
    const { rippleX, rippleY, rippleSize } = computeRippleState({ event, element, center });

    // Delay touch ripples so scroll gestures do not flash a ripple.
    if (event?.touches) {
      // Ignore extra touchstart events from multi-touch. There is only one
      // delayed start callback to clear on unmount.
      if (startTimerCommit.current === null) {
        startTimerCommit.current = () => {
          startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
        };
        startTimer.start(DELAY_RIPPLE, () => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        });
      }
    } else {
      startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
    }
  });

  const pulsate = useEventCallback(() => {
    start(EMPTY_OBJ, { pulsate: true });
  });

  const stop = useEventCallback((event, cb) => {
    startTimer.clear();

    // If touch ends before the delay finishes, show the ripple now and stop it
    // on the next tick so the user still gets feedback.
    if (event?.type === 'touchend' && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.start(0, () => {
        stop(event, cb);
      });
      return;
    }

    startTimerCommit.current = null;

    setRippleState((prevState) => {
      const firstActiveIndex = prevState.items.findIndex((ripple) => !ripple.exiting);
      if (firstActiveIndex === -1) {
        return prevState;
      }

      const nextItems = prevState.items.slice();
      nextItems[firstActiveIndex] = { ...nextItems[firstActiveIndex], exiting: true };

      return {
        items: nextItems,
        order: mergeRippleOrder(
          prevState.order,
          nextItems.filter((ripple) => !ripple.exiting).map((ripple) => ripple.key),
        ),
      };
    });
    rippleCallback.current = cb;
  });

  React.useImperativeHandle(
    ref,
    () => ({
      pulsate,
      start,
      stop,
    }),
    [pulsate, start, stop],
  );

  const rippleByKey = new Map(ripples.map((ripple) => [ripple.key, ripple]));
  const orderedRipples = rippleState.order
    .map((rippleKey) => rippleByKey.get(rippleKey))
    .filter(Boolean);

  // Keep the old react-transition-group DOM order:
  // exiting ripples stay in place, and new ripples are inserted before the
  // final group waiting for its exit animation to finish.
  return (
    <TouchRippleRoot
      className={clsx(touchRippleClasses.root, classes.root, className)}
      ref={container}
      {...other}
    >
      {orderedRipples.map((ripple) => (
        <TouchRippleRipple
          key={ripple.key}
          classes={{
            ripple: clsx(classes.ripple, touchRippleClasses.ripple),
            rippleVisible: clsx(classes.rippleVisible, touchRippleClasses.rippleVisible),
            ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses.ripplePulsate),
            child: clsx(classes.child, touchRippleClasses.child),
            childLeaving: clsx(classes.childLeaving, touchRippleClasses.childLeaving),
            childPulsate: clsx(classes.childPulsate, touchRippleClasses.childPulsate),
          }}
          timeout={reducedMotion.shouldReduceMotion ? 0 : DURATION}
          pulsate={ripple.pulsate}
          rippleX={ripple.rippleX}
          rippleY={ripple.rippleY}
          rippleSize={ripple.rippleSize}
          in={!ripple.exiting}
          onExited={() => handleExited(ripple.key)}
        />
      ))}
    </TouchRippleRoot>
  );
});

TouchRipple.propTypes /* remove-proptypes */ = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default TouchRipple;
