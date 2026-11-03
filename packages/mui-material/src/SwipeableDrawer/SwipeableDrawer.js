'use client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import NoSsr from '../NoSsr';
import Drawer, { getAnchor, isHorizontal } from '../Drawer/Drawer';
import contains from '../utils/contains';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import useEventCallback from '../utils/useEventCallback';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import { useTheme } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getTransitionProps } from '../transitions/utils';
import useReducedMotion from '../transitions/useReducedMotion';
import { mergeSlotProps } from '../utils';
import useSlot from '../utils/useSlot';
import SwipeArea from './SwipeArea';

// This value is closed to what browsers are using internally to
// trigger a native scroll.
const UNCERTAINTY_THRESHOLD = 3; // px

// This is the part of the drawer displayed on touch start.
const DRAG_STARTED_SIGNAL = 20; // px

// We can only have one instance at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
// That's why we use a singleton here.
let claimedSwipeInstance = null;

// Exported for test purposes.
export function reset() {
  claimedSwipeInstance = null;
}

function calculateCurrentX(anchor, touches, doc) {
  return anchor === 'right' ? doc.body.offsetWidth - touches[0].pageX : touches[0].pageX;
}

function calculateCurrentY(anchor, touches, containerWindow) {
  return anchor === 'bottom'
    ? containerWindow.innerHeight - touches[0].clientY
    : touches[0].clientY;
}

function getMaxTranslate(horizontalSwipe, paperInstance) {
  return horizontalSwipe ? paperInstance.clientWidth : paperInstance.clientHeight;
}

function getTranslate(currentTranslate, startLocation, open, maxTranslate) {
  return Math.min(
    Math.max(
      open ? startLocation - currentTranslate : maxTranslate + startLocation - currentTranslate,
      0,
    ),
    maxTranslate,
  );
}

/**
 * @param {Element | null} element
 * @param {Element} rootNode
 */
function getDomTreeShapes(element, rootNode) {
  // Adapted from https://github.com/oliviertassinari/react-swipeable-views/blob/7666de1dba253b896911adf2790ce51467670856/packages/react-swipeable-views/src/SwipeableViews.js#L129
  const domTreeShapes = [];

  while (element && element !== rootNode.parentElement) {
    const style = ownerWindow(rootNode).getComputedStyle(element);

    if (
      // Ignore the scroll children if the element is absolute positioned.
      style.getPropertyValue('position') === 'absolute' ||
      // Ignore the scroll children if the element has an overflowX hidden
      style.getPropertyValue('overflow-x') === 'hidden'
    ) {
      // noop
    } else if (
      (element.clientWidth > 0 && element.scrollWidth > element.clientWidth) ||
      (element.clientHeight > 0 && element.scrollHeight > element.clientHeight)
    ) {
      // Ignore the nodes that have no width.
      // Keep elements with a scroll
      domTreeShapes.push(element);
    }

    element = element.parentElement;
  }

  return domTreeShapes;
}

/**
 * @param {object} param0
 * @param {ReturnType<getDomTreeShapes>} param0.domTreeShapes
 */
function computeHasNativeHandler({ domTreeShapes, start, current, anchor }) {
  // Adapted from https://github.com/oliviertassinari/react-swipeable-views/blob/7666de1dba253b896911adf2790ce51467670856/packages/react-swipeable-views/src/SwipeableViews.js#L175
  const axisProperties = {
    scrollPosition: {
      x: 'scrollLeft',
      y: 'scrollTop',
    },
    scrollLength: {
      x: 'scrollWidth',
      y: 'scrollHeight',
    },
    clientLength: {
      x: 'clientWidth',
      y: 'clientHeight',
    },
  };

  return domTreeShapes.some((shape) => {
    // Determine if we are going backward or forward.
    let goingForward = current >= start;
    if (anchor === 'top' || anchor === 'left') {
      goingForward = !goingForward;
    }
    const axis = anchor === 'left' || anchor === 'right' ? 'x' : 'y';
    const scrollPosition = Math.round(shape[axisProperties.scrollPosition[axis]]);

    const areNotAtStart = scrollPosition > 0;
    const areNotAtEnd =
      scrollPosition + shape[axisProperties.clientLength[axis]] <
      shape[axisProperties.scrollLength[axis]];

    if ((goingForward && areNotAtEnd) || (!goingForward && areNotAtStart)) {
      return true;
    }

    return false;
  });
}

const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const SwipeableDrawer = React.forwardRef(function SwipeableDrawer(inProps, ref) {
  const props = useDefaultProps({ name: 'MuiSwipeableDrawer', props: inProps });
  const theme = useTheme();
  const transitionDurationDefault = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const {
    anchor = 'left',
    disableBackdropTransition = false,
    disableDiscovery = false,
    disableSwipeToOpen = iOS,
    hideBackdrop,
    hysteresis = 0.52,
    allowSwipeInChildren = false,
    minFlingVelocity = 450,
    ModalProps: ModalPropsProp = {},
    onClose,
    onOpen,
    open = false,
    swipeAreaWidth = 20,
    transitionDuration = transitionDurationDefault,
    variant = 'temporary', // Mobile first.
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, false);

  const [maybeSwiping, setMaybeSwiping] = React.useState(false);
  const swipeInstance = React.useRef({
    isSwiping: null,
  });

  const swipeAreaRef = React.useRef();
  const backdropRef = React.useRef();
  const paperRef = React.useRef();

  const touchDetected = React.useRef(false);

  // Ref for transition duration based on / to match swipe speed
  const calculatedDurationRef = React.useRef();

  // Use a ref so the open value used is always up to date inside useCallback.
  useEnhancedEffect(() => {
    calculatedDurationRef.current = null;
  }, [open]);

  const setPosition = React.useCallback(
    (translate, options = {}) => {
      const { mode = null, changeTransition = true } = options;

      const anchorRtl = getAnchor(theme, anchor);
      const rtlTranslateMultiplier = ['right', 'bottom'].includes(anchorRtl) ? 1 : -1;
      const horizontalSwipe = isHorizontal(anchor);

      // Slide preserves this active-swipe `translate(x, y)` transform on exit.
      // Keep this in sync with isGestureTranslate in Slide.js.
      const transform = horizontalSwipe
        ? `translate(${rtlTranslateMultiplier * translate}px, 0)`
        : `translate(0, ${rtlTranslateMultiplier * translate}px)`;
      const drawerStyle = paperRef.current.style;
      drawerStyle.transform = transform;

      let transition = '';

      if (mode) {
        const transitionProps = getTransitionProps(
          {
            easing: undefined,
            style: undefined,
            timeout: transitionDuration,
          },
          {
            mode,
          },
        );
        const transitionTiming = reducedMotion.getTransitionTiming({
          duration: transitionProps.duration,
          delay: transitionProps.delay,
        });

        transition = theme.transitions.create('all', {
          ...transitionProps,
          duration: transitionTiming.duration,
          delay: transitionTiming.delay,
        });
      }

      if (changeTransition) {
        drawerStyle.transition = transition;
      }

      if (!disableBackdropTransition && !hideBackdrop) {
        const backdropStyle = backdropRef.current.style;
        backdropStyle.opacity = 1 - translate / getMaxTranslate(horizontalSwipe, paperRef.current);

        if (changeTransition) {
          backdropStyle.transition = transition;
        }
      }
    },
    [anchor, disableBackdropTransition, hideBackdrop, reducedMotion, theme, transitionDuration],
  );

  const handleBodyTouchEnd = useEventCallback((nativeEvent) => {
    if (!touchDetected.current) {
      return;
    }
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- claimedSwipeInstance is a singleton
    claimedSwipeInstance = null;
    touchDetected.current = false;
    ReactDOM.flushSync(() => {
      setMaybeSwiping(false);
    });

    // The swipe wasn't started.
    if (!swipeInstance.current.isSwiping) {
      swipeInstance.current.isSwiping = null;
      return;
    }

    swipeInstance.current.isSwiping = null;

    const anchorRtl = getAnchor(theme, anchor);
    const horizontal = isHorizontal(anchor);
    let current;
    if (horizontal) {
      current = calculateCurrentX(
        anchorRtl,
        nativeEvent.changedTouches,
        ownerDocument(nativeEvent.currentTarget),
      );
    } else {
      current = calculateCurrentY(
        anchorRtl,
        nativeEvent.changedTouches,
        ownerWindow(nativeEvent.currentTarget),
      );
    }

    const startLocation = horizontal ? swipeInstance.current.startX : swipeInstance.current.startY;
    const maxTranslate = getMaxTranslate(horizontal, paperRef.current);
    const currentTranslate = getTranslate(current, startLocation, open, maxTranslate);
    const translateRatio = currentTranslate / maxTranslate;

    if (Math.abs(swipeInstance.current.velocity) > minFlingVelocity) {
      // Calculate transition duration to match swipe speed
      calculatedDurationRef.current =
        Math.abs((maxTranslate - currentTranslate) / swipeInstance.current.velocity) * 1000;
    }

    if (open) {
      if (swipeInstance.current.velocity > minFlingVelocity || translateRatio > hysteresis) {
        onClose(nativeEvent);
      } else {
        // Reset the position, the swipe was aborted.
        setPosition(0, {
          mode: 'exit',
        });
      }

      return;
    }

    if (swipeInstance.current.velocity < -minFlingVelocity || 1 - translateRatio > hysteresis) {
      onOpen(nativeEvent);
    } else {
      // Reset the position, the swipe was aborted.
      setPosition(getMaxTranslate(horizontal, paperRef.current), {
        mode: 'enter',
      });
    }
  });

  const startMaybeSwiping = (force = false) => {
    if (!maybeSwiping) {
      // on Safari Mobile, if you want to be able to have the 'click' event fired on child elements, nothing in the DOM can be changed.
      // this is because Safari Mobile will not fire any mouse events (still fires touch though) if the DOM changes during mousemove.
      // so do this change on first touchmove instead of touchstart
      if (force || !(disableDiscovery && allowSwipeInChildren)) {
        ReactDOM.flushSync(() => {
          setMaybeSwiping(true);
        });
      }

      const horizontalSwipe = isHorizontal(anchor);

      if (!open && paperRef.current) {
        // The ref may be null when a parent component updates while swiping.
        setPosition(
          getMaxTranslate(horizontalSwipe, paperRef.current) +
            (disableDiscovery ? 15 : -DRAG_STARTED_SIGNAL),
          {
            changeTransition: false,
          },
        );
      }

      swipeInstance.current.velocity = 0;
      swipeInstance.current.lastTime = null;
      swipeInstance.current.lastTranslate = null;
      swipeInstance.current.paperHit = false;

      touchDetected.current = true;
    }
  };

  const handleBodyTouchMove = useEventCallback((nativeEvent) => {
    // the ref may be null when a parent component updates while swiping
    if (!paperRef.current || !touchDetected.current) {
      return;
    }

    // We are not supposed to handle this touch move because the swipe was started in a scrollable container in the drawer
    if (claimedSwipeInstance !== null && claimedSwipeInstance !== swipeInstance.current) {
      return;
    }

    startMaybeSwiping(true);

    const anchorRtl = getAnchor(theme, anchor);
    const horizontalSwipe = isHorizontal(anchor);

    const currentX = calculateCurrentX(
      anchorRtl,
      nativeEvent.touches,
      ownerDocument(nativeEvent.currentTarget),
    );

    const currentY = calculateCurrentY(
      anchorRtl,
      nativeEvent.touches,
      ownerWindow(nativeEvent.currentTarget),
    );

    if (open && contains(paperRef.current, nativeEvent.target) && claimedSwipeInstance === null) {
      const domTreeShapes = getDomTreeShapes(nativeEvent.target, paperRef.current);
      const hasNativeHandler = computeHasNativeHandler({
        domTreeShapes,
        start: horizontalSwipe ? swipeInstance.current.startX : swipeInstance.current.startY,
        current: horizontalSwipe ? currentX : currentY,
        anchor,
      });

      if (hasNativeHandler) {
        claimedSwipeInstance = true;
        return;
      }
      claimedSwipeInstance = swipeInstance.current;
    }

    // We don't know yet.
    if (swipeInstance.current.isSwiping == null) {
      const dx = Math.abs(currentX - swipeInstance.current.startX);
      const dy = Math.abs(currentY - swipeInstance.current.startY);

      const definitelySwiping = horizontalSwipe
        ? dx > dy && dx > UNCERTAINTY_THRESHOLD
        : dy > dx && dy > UNCERTAINTY_THRESHOLD;

      if (definitelySwiping && nativeEvent.cancelable) {
        nativeEvent.preventDefault();
      }

      if (
        definitelySwiping === true ||
        (horizontalSwipe ? dy > UNCERTAINTY_THRESHOLD : dx > UNCERTAINTY_THRESHOLD)
      ) {
        swipeInstance.current.isSwiping = definitelySwiping;
        if (!definitelySwiping) {
          handleBodyTouchEnd(nativeEvent);
          return;
        }

        // Shift the starting point.
        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY;

        // Compensate for the part of the drawer displayed on touch start.
        if (!disableDiscovery && !open) {
          if (horizontalSwipe) {
            swipeInstance.current.startX -= DRAG_STARTED_SIGNAL;
          } else {
            swipeInstance.current.startY -= DRAG_STARTED_SIGNAL;
          }
        }
      }
    }

    if (!swipeInstance.current.isSwiping) {
      return;
    }

    const maxTranslate = getMaxTranslate(horizontalSwipe, paperRef.current);
    let startLocation = horizontalSwipe
      ? swipeInstance.current.startX
      : swipeInstance.current.startY;
    if (open && !swipeInstance.current.paperHit) {
      startLocation = Math.min(startLocation, maxTranslate);
    }

    const translate = getTranslate(
      horizontalSwipe ? currentX : currentY,
      startLocation,
      open,
      maxTranslate,
    );

    if (open) {
      if (!swipeInstance.current.paperHit) {
        const paperHit = horizontalSwipe ? currentX < maxTranslate : currentY < maxTranslate;
        if (paperHit) {
          swipeInstance.current.paperHit = true;
          swipeInstance.current.startX = currentX;
          swipeInstance.current.startY = currentY;
        } else {
          return;
        }
      } else if (translate === 0) {
        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY;
      }
    }

    if (swipeInstance.current.lastTranslate === null) {
      swipeInstance.current.lastTranslate = translate;
      swipeInstance.current.lastTime = performance.now() + 1;
    }

    const velocity =
      ((translate - swipeInstance.current.lastTranslate) /
        (performance.now() - swipeInstance.current.lastTime)) *
      1e3;

    // Low Pass filter.
    swipeInstance.current.velocity = swipeInstance.current.velocity * 0.4 + velocity * 0.6;

    swipeInstance.current.lastTranslate = translate;
    swipeInstance.current.lastTime = performance.now();

    // We are swiping, let's prevent the scroll event on iOS.
    if (nativeEvent.cancelable) {
      nativeEvent.preventDefault();
    }

    setPosition(translate);
  });

  const handleBodyTouchStart = useEventCallback((nativeEvent) => {
    // We are not supposed to handle this touch move.
    // Example of use case: ignore the event if there is a Slider.
    if (nativeEvent.defaultPrevented) {
      return;
    }

    // We can only have one node at the time claiming ownership for handling the swipe.
    if (nativeEvent.defaultMuiPrevented) {
      return;
    }

    // At least one element clogs the drawer interaction zone.
    if (
      open &&
      (hideBackdrop || !contains(backdropRef.current, nativeEvent.target)) &&
      !contains(paperRef.current, nativeEvent.target)
    ) {
      return;
    }

    const anchorRtl = getAnchor(theme, anchor);
    const horizontalSwipe = isHorizontal(anchor);

    const currentX = calculateCurrentX(
      anchorRtl,
      nativeEvent.touches,
      ownerDocument(nativeEvent.currentTarget),
    );

    const currentY = calculateCurrentY(
      anchorRtl,
      nativeEvent.touches,
      ownerWindow(nativeEvent.currentTarget),
    );

    if (!open) {
      // logic for if swipe should be ignored:
      // if disableSwipeToOpen
      // if target != swipeArea, and target is not a child of paper ref
      // if is a child of paper ref, and `allowSwipeInChildren` does not allow it
      if (
        disableSwipeToOpen ||
        !(
          nativeEvent.target === swipeAreaRef.current ||
          (contains(paperRef.current, nativeEvent.target) &&
            (typeof allowSwipeInChildren === 'function'
              ? allowSwipeInChildren(nativeEvent, swipeAreaRef.current, paperRef.current)
              : allowSwipeInChildren))
        )
      ) {
        return;
      }
      if (horizontalSwipe) {
        if (currentX > swipeAreaWidth) {
          return;
        }
      } else if (currentY > swipeAreaWidth) {
        return;
      }
    }

    nativeEvent.defaultMuiPrevented = true;
    claimedSwipeInstance = null;
    swipeInstance.current.startX = currentX;
    swipeInstance.current.startY = currentY;

    startMaybeSwiping();
  });

  React.useEffect(() => {
    if (variant === 'temporary') {
      const doc = ownerDocument(paperRef.current);
      doc.addEventListener('touchstart', handleBodyTouchStart);
      // A blocking listener prevents Firefox's navbar to auto-hide on scroll.
      // It only needs to prevent scrolling on the drawer's content when open.
      // When closed, the overlay prevents scrolling.
      doc.addEventListener('touchmove', handleBodyTouchMove, { passive: !open });
      doc.addEventListener('touchend', handleBodyTouchEnd);

      return () => {
        doc.removeEventListener('touchstart', handleBodyTouchStart);
        doc.removeEventListener('touchmove', handleBodyTouchMove, { passive: !open });
        doc.removeEventListener('touchend', handleBodyTouchEnd);
      };
    }

    return undefined;
  }, [variant, open, handleBodyTouchStart, handleBodyTouchMove, handleBodyTouchEnd]);

  React.useEffect(
    () => () => {
      // We need to release the lock.
      if (claimedSwipeInstance === swipeInstance.current) {
        claimedSwipeInstance = null;
      }
    },
    [],
  );

  React.useEffect(() => {
    if (!open) {
      setMaybeSwiping(false);
    }
  }, [open]);

  const [SwipeAreaSlot, swipeAreaSlotProps] = useSlot('swipeArea', {
    ref: swipeAreaRef,
    elementType: SwipeArea,
    ownerState: props,
    externalForwardedProps: {
      slots,
      slotProps,
    },
    additionalProps: {
      width: swipeAreaWidth,
      anchor,
    },
  });

  return (
    <React.Fragment>
      <Drawer
        open={variant === 'temporary' && maybeSwiping ? true : open}
        variant={variant}
        ModalProps={{
          // Ensures that paperRef.current will be defined inside the touch start event handler
          // See https://github.com/mui/material-ui/issues/30414 for more information
          ...(variant === 'temporary' && {
            keepMounted: true,
          }),
          ...ModalPropsProp,
        }}
        hideBackdrop={hideBackdrop}
        anchor={anchor}
        transitionDuration={calculatedDurationRef.current || transitionDuration}
        onClose={onClose}
        ref={ref}
        slots={slots}
        slotProps={{
          ...slotProps,
          backdrop: mergeSlotProps(slotProps.backdrop, {
            ref: backdropRef,
          }),
          paper: mergeSlotProps(slotProps.paper, {
            style: {
              pointerEvents:
                variant === 'temporary' && !open && !allowSwipeInChildren ? 'none' : '',
            },
            ref: paperRef,
          }),
        }}
        {...other}
      />
      {!disableSwipeToOpen && variant === 'temporary' && (
        <NoSsr>
          <SwipeAreaSlot {...swipeAreaSlotProps} />
        </NoSsr>
      )}
    </React.Fragment>
  );
});

SwipeableDrawer.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If set to true, the swipe event will open the drawer even if the user begins the swipe on one of the drawer's children.
   * This can be useful in scenarios where the drawer is partially visible.
   * You can customize it further with a callback that determines which children the user can drag over to open the drawer
   * (for example, to ignore other elements that handle touch move events, like sliders).
   *
   * @param {TouchEvent} event The 'touchstart' event
   * @param {HTMLDivElement} swipeArea The swipe area element
   * @param {HTMLDivElement} paper The drawer's paper element
   *
   * @default false
   */
  allowSwipeInChildren: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   * @ignore
   */
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Disable the backdrop transition.
   * This can improve the FPS on low-end devices.
   * @default false
   */
  disableBackdropTransition: PropTypes.bool,
  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   * @default false
   */
  disableDiscovery: PropTypes.bool,
  /**
   * If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers
   * navigation actions. Swipe to open is disabled on iOS browsers by default.
   * @default typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
   */
  disableSwipeToOpen: PropTypes.bool,
  /**
   * @ignore
   */
  hideBackdrop: PropTypes.bool,
  /**
   * Affects how far the drawer must be opened/closed to change its state.
   * Specified as percent (0-1) of the width of the drawer
   * @default 0.52
   */
  hysteresis: PropTypes.number,
  /**
   * Defines, from which (average) velocity on, the swipe is
   * defined as complete although hysteresis isn't reached.
   * Good threshold is between 250 - 1000 px/s
   * @default 450
   */
  minFlingVelocity: PropTypes.number,
  /**
   * @ignore
   */
  ModalProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({}),
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent<{}> | Event} event The event source of the callback.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {React.SyntheticEvent<{}> | Event} event The event source of the callback.
   */
  onOpen: PropTypes.func.isRequired,
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    docked: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    swipeArea: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    docked: PropTypes.elementType,
    paper: PropTypes.elementType,
    root: PropTypes.elementType,
    swipeArea: PropTypes.elementType,
    transition: PropTypes.elementType,
  }),
  /**
   * The width of the left most (or right most) area in `px` that
   * the drawer can be swiped open from.
   * @default 20
   */
  swipeAreaWidth: PropTypes.number,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
  /**
   * @ignore
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

export default SwipeableDrawer;
