'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import elementAcceptingRef from '@mui/utils/elementAcceptingRef';
import getReactElementRef from '@mui/utils/getReactElementRef';
import Transition from '../internal/Transition';
import useReducedMotion from '../transitions/useReducedMotion';
import { useTheme } from '../zero-styled';
import {
  normalizedTransitionCallback,
  reflow,
  getTransitionProps,
  getTransitionChildStyle,
} from '../transitions/utils';
import useForkRef from '../utils/useForkRef';

const styles = {
  entering: { transform: 'none' },
  entered: { transform: 'none' },
  exiting: { transform: 'scale(0)' },
  exited: { transform: 'scale(0)' },
};

const hiddenStyles = { transform: 'scale(0)', visibility: 'hidden' };

/**
 * The Zoom transition can be used for the floating variant of the
 * [Button](/material-ui/react-floating-action-button/#animation) component.
 */
const Zoom = React.forwardRef(function Zoom(props, ref) {
  const theme = useTheme();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    addEndListener,
    appear = true,
    children,
    disablePrefersReducedMotion = false,
    easing,
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

  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, getReactElementRef(children), ref);

  const handleEntering = normalizedTransitionCallback(nodeRef, onEntering);

  const handleEnter = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
    if (!reducedMotion.shouldReduceMotion) {
      reflow(node); // Force layout so the animation starts from the initial styles.
    }

    const transitionProps = getTransitionProps(
      { style, timeout, easing },
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

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback(nodeRef, onEntered);

  const handleExiting = normalizedTransitionCallback(nodeRef, onExiting);

  const handleExit = normalizedTransitionCallback(nodeRef, (node) => {
    const transitionProps = getTransitionProps(
      { style, timeout, easing },
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

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback(nodeRef, (node) => {
    node.style.transition = '';

    if (onExited) {
      onExited(node);
    }
  });

  const handleAddEndListener = addEndListener
    ? (next) => {
        addEndListener(nodeRef.current, next);
      }
    : undefined;

  return (
    <Transition
      appear={appear}
      in={inProp}
      nodeRef={nodeRef}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      onExiting={handleExiting}
      addEndListener={handleAddEndListener}
      reduceMotion={reducedMotion.shouldReduceMotion}
      timeout={timeout}
      {...other}
    >
      {(state, { ownerState, ...restChildProps }) => {
        // Do not pass ownerState to a DOM child. ownerState is only for
        // Material UI styling, and React would treat it as an invalid DOM attribute.
        const childStyle = getTransitionChildStyle(
          state,
          inProp,
          styles,
          hiddenStyles,
          style,
          children.props.style,
        );

        return React.cloneElement(children, {
          style: childStyle,
          ref: handleRef,
          ...restChildProps,
        });
      }}
    </Transition>
  );
});

Zoom.propTypes /* remove-proptypes */ = {
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
   * If `true`, the transition ignores `theme.motion.reducedMotion` and keeps its normal timing.
   * @default false
   */
  disablePrefersReducedMotion: PropTypes.bool,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
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

export default Zoom;
