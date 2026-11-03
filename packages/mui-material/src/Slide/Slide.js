'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import chainPropTypes from '@mui/utils/chainPropTypes';
import HTMLElementType from '@mui/utils/HTMLElementType';
import elementAcceptingRef from '@mui/utils/elementAcceptingRef';
import getReactElementRef from '@mui/utils/getReactElementRef';
import Transition from '../internal/Transition';
import isLayoutSupported from '../utils/isLayoutSupported';
import debounce from '../utils/debounce';
import useForkRef from '../utils/useForkRef';
import { useTheme } from '../zero-styled';
import useReducedMotion from '../transitions/useReducedMotion';
import {
  normalizedTransitionCallback,
  reflow,
  getTransitionProps,
  getTranslateOffsets,
} from '../transitions/utils';
import { ownerWindow } from '../utils';

const hiddenStyles = { visibility: 'hidden' };
const DEFAULT_TRANSLATE_OPTIONS = {};

/**
 * Detects SwipeableDrawer's active-swipe `translate(x, y)` transform.
 * Keep this in sync with SwipeableDrawer.setPosition.
 */
function isGestureTranslate(transform) {
  return typeof transform === 'string' && /^translate\(.+,\s*.+\)$/.test(transform);
}

// Move the node off-screen. Later we reset transform to `none` to slide it in.
function getTranslateValue(
  direction,
  node,
  resolvedContainer,
  options = DEFAULT_TRANSLATE_OPTIONS,
) {
  const { resetInlineTransform = true } = options;
  const containerRect = resolvedContainer && resolvedContainer.getBoundingClientRect();
  const containerWindow = ownerWindow(node);
  let rect;
  let transform;

  if (resetInlineTransform) {
    // Read layout from the element's natural position, not from a previous
    // off-screen transform. Clear transition too, or the browser may report an
    // in-between animated value during exit.
    const previousTransform = node.style.transform;
    const previousTransition = node.style.transition;
    node.style.transition = '';
    node.style.transform = '';
    rect = node.getBoundingClientRect();
    const computedStyle = containerWindow.getComputedStyle(node);
    transform = computedStyle.getPropertyValue('transform');
    node.style.transform = previousTransform;
    node.style.transition = previousTransition;
  } else {
    rect = node.getBoundingClientRect();
    const computedStyle = containerWindow.getComputedStyle(node);
    transform = computedStyle.getPropertyValue('transform');
  }

  const { offsetX, offsetY } = getTranslateOffsets(transform);

  if (direction === 'left') {
    if (containerRect) {
      return `translateX(${containerRect.right + offsetX - rect.left}px)`;
    }

    return `translateX(${containerWindow.innerWidth + offsetX - rect.left}px)`;
  }

  if (direction === 'right') {
    if (containerRect) {
      return `translateX(-${rect.right - containerRect.left - offsetX}px)`;
    }

    return `translateX(-${rect.left + rect.width - offsetX}px)`;
  }

  if (direction === 'up') {
    if (containerRect) {
      return `translateY(${containerRect.bottom + offsetY - rect.top}px)`;
    }
    return `translateY(${containerWindow.innerHeight + offsetY - rect.top}px)`;
  }

  // direction === 'down'
  if (containerRect) {
    return `translateY(-${rect.top - containerRect.top + rect.height - offsetY}px)`;
  }
  return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

function resolveContainer(containerPropProp) {
  return typeof containerPropProp === 'function' ? containerPropProp() : containerPropProp;
}

export function setTranslateValue(direction, node, containerProp, options) {
  const resolvedContainer = resolveContainer(containerProp);
  const transform = getTranslateValue(direction, node, resolvedContainer, options);

  if (transform) {
    node.style.transform = transform;
  }
}

/**
 * The Slide transition is used by the [Drawer](/material-ui/react-drawer/) component.
 */
const Slide = React.forwardRef(function Slide(props, ref) {
  const theme = useTheme();
  const defaultEasing = {
    enter: theme.transitions.easing.easeOut,
    exit: theme.transitions.easing.sharp,
  };

  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    addEndListener,
    appear = true,
    children,
    container: containerProp,
    disablePrefersReducedMotion = false,
    direction = 'down',
    easing: easingProp = defaultEasing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    ...other
  } = props;
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, disablePrefersReducedMotion);

  const childrenRef = React.useRef(null);
  const preserveInlineTransformRef = React.useRef(false);
  const handleRef = useForkRef(getReactElementRef(children), childrenRef, ref);

  const handleEnter = normalizedTransitionCallback(childrenRef, (node, isAppearing) => {
    setTranslateValue(direction, node, containerProp);
    if (!reducedMotion.shouldReduceMotion) {
      reflow(node);
    }

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntering = normalizedTransitionCallback(childrenRef, (node, isAppearing) => {
    const transitionProps = getTransitionProps(
      { timeout, style, easing: easingProp },
      {
        mode: 'enter',
      },
    );
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: transitionProps.duration,
      delay: transitionProps.delay,
    });

    node.style.transition = theme.transitions.create('transform', {
      duration: transitionTiming.duration,
      easing: transitionProps.easing,
      delay: transitionTiming.delay,
    });

    node.style.transform = 'none';
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback(childrenRef, onEntered);
  const handleExiting = normalizedTransitionCallback(childrenRef, onExiting);

  const handleExit = normalizedTransitionCallback(childrenRef, (node) => {
    const transitionProps = getTransitionProps(
      { timeout, style, easing: easingProp },
      {
        mode: 'exit',
      },
    );
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: transitionProps.duration,
      delay: transitionProps.delay,
    });

    node.style.transition = theme.transitions.create('transform', {
      duration: transitionTiming.duration,
      easing: transitionProps.easing,
      delay: transitionTiming.delay,
    });

    const preserveInlineTransform = isGestureTranslate(node.style.transform);
    preserveInlineTransformRef.current = preserveInlineTransform;

    // Preserve SwipeableDrawer's inline gesture transform during exit. Slide's
    // own off-screen translateX/Y transforms still use the reset path.
    setTranslateValue(direction, node, containerProp, {
      resetInlineTransform: !preserveInlineTransform,
    });

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback(childrenRef, (node) => {
    preserveInlineTransformRef.current = false;
    // Hidden nodes stay off-screen without animating.
    node.style.transition = '';

    if (onExited) {
      onExited(node);
    }
  });

  const handleAddEndListener = addEndListener
    ? (next) => {
        addEndListener(childrenRef.current, next);
      }
    : undefined;

  const updatePosition = React.useCallback(() => {
    if (childrenRef.current) {
      setTranslateValue(direction, childrenRef.current, containerProp);
    }
  }, [direction, containerProp]);

  React.useEffect(() => {
    // Skip resize listeners when the off-screen position does not depend on screen size.
    if (inProp || direction === 'down' || direction === 'right') {
      return undefined;
    }

    const handleResize = debounce(() => {
      if (childrenRef.current) {
        setTranslateValue(direction, childrenRef.current, containerProp);
      }
    });

    const containerWindow = ownerWindow(childrenRef.current);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [direction, inProp, containerProp]);

  React.useEffect(() => {
    if (!inProp && !preserveInlineTransformRef.current) {
      // While hidden, keep the child at the correct off-screen position if
      // direction or container changes.
      updatePosition();
    }
  }, [inProp, updatePosition]);

  return (
    <Transition
      nodeRef={childrenRef}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      onExiting={handleExiting}
      addEndListener={handleAddEndListener}
      appear={appear}
      in={inProp}
      reduceMotion={reducedMotion.shouldReduceMotion}
      timeout={timeout}
      {...other}
    >
      {(state, { ownerState, ...restChildProps }) => {
        // Do not pass ownerState to a DOM child. ownerState is only for
        // Material UI styling, and React would treat it as an invalid DOM attribute.
        let childStyle;
        if (state === 'exited' && !inProp) {
          childStyle =
            style || children.props.style
              ? { visibility: 'hidden', ...style, ...children.props.style }
              : hiddenStyles;
        } else if (style && children.props.style) {
          childStyle = { ...style, ...children.props.style };
        } else {
          childStyle = style || children.props.style;
        }

        return React.cloneElement(children, {
          ref: handleRef,
          style: childStyle,
          ...restChildProps,
        });
      }}
    </Transition>
  );
});

Slide.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger.
   * Use it when you need custom logic to decide when the transition has ended.
   * Note: Timeouts are still used as a fallback if provided.
   *
   * @param {HTMLElement} node The transitioning DOM node.
   * @param {Function} done Call this when the transition has finished.
   */
  addEndListener: PropTypes.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: PropTypes.bool,
  /**
   * A single child content element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the container the Slide is transitioning from.
   */
  container: chainPropTypes(PropTypes.oneOfType([HTMLElementType, PropTypes.func]), (props) => {
    if (props.open) {
      const resolvedContainer = resolveContainer(props.container);

      if (resolvedContainer && resolvedContainer.nodeType === 1) {
        const box = resolvedContainer.getBoundingClientRect();

        if (process.env.NODE_ENV !== 'production') {
          if (
            isLayoutSupported() &&
            box.top === 0 &&
            box.left === 0 &&
            box.right === 0 &&
            box.bottom === 0
          ) {
            return new Error(
              [
                'MUI: The `container` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join('\n'),
            );
          }
        }
      } else if (
        !resolvedContainer ||
        typeof resolvedContainer.getBoundingClientRect !== 'function' ||
        (resolvedContainer.contextElement != null &&
          resolvedContainer.contextElement.nodeType !== 1)
      ) {
        return new Error(
          [
            'MUI: The `container` prop provided to the component is invalid.',
            'It should be an HTML element instance.',
          ].join('\n'),
        );
      }
    }

    return null;
  }),
  /**
   * Direction the child node will enter from.
   * @default 'down'
   */
  direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),
  /**
   * If `true`, the transition ignores `theme.motion.reducedMotion` and keeps its normal timing.
   * @default false
   */
  disablePrefersReducedMotion: PropTypes.bool,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   * @default {
   *   enter: theme.transitions.easing.easeOut,
   *   exit: theme.transitions.easing.sharp,
   * }
   */
  easing: PropTypes.oneOfType([
    PropTypes.shape({
      enter: PropTypes.string,
      exit: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

export default Slide;
