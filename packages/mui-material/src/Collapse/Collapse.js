'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import composeClasses from '@mui/utils/composeClasses';
import Transition from '../internal/Transition';
import useReducedMotion from '../transitions/useReducedMotion';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { duration } from '../styles/createTransitions';
import { normalizedTransitionCallback, getTransitionProps } from '../transitions/utils';
import { useForkRef } from '../utils';
import useSlot from '../utils/useSlot';
import { getCollapseUtilityClass } from './collapseClasses';

const EMPTY_OBJECT = {};

const useUtilityClasses = (ownerState) => {
  const { orientation, classes } = ownerState;

  const slots = {
    root: ['root', orientation],
    entered: ['entered'],
    hidden: ['hidden'],
    wrapper: ['wrapper', orientation],
    wrapperInner: ['wrapperInner', orientation],
  };

  return composeClasses(slots, getCollapseUtilityClass, classes);
};

const CollapseRoot = styled('div', {
  name: 'MuiCollapse',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.orientation],
      ownerState.state === 'entered' && styles.entered,
      ownerState.state === 'exited' &&
        !ownerState.in &&
        ownerState.collapsedSize === '0px' &&
        styles.hidden,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    height: 0,
    overflow: 'hidden',
    transition: theme.transitions.create('height'),
    variants: [
      {
        props: {
          orientation: 'horizontal',
        },
        style: {
          height: 'auto',
          width: 0,
          transition: theme.transitions.create('width'),
        },
      },
      {
        props: {
          state: 'entered',
        },
        style: {
          height: 'auto',
          overflow: 'visible',
        },
      },
      {
        props: {
          state: 'entered',
          orientation: 'horizontal',
        },
        style: {
          width: 'auto',
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.state === 'exited' && !ownerState.in && ownerState.collapsedSize === '0px',
        style: {
          visibility: 'hidden',
        },
      },
    ],
  })),
);

const CollapseWrapper = styled('div', {
  name: 'MuiCollapse',
  slot: 'Wrapper',
})({
  // Prevent children with negative margins from making the measured size too small.
  display: 'flex',
  width: '100%',
  variants: [
    {
      props: {
        orientation: 'horizontal',
      },
      style: {
        width: 'auto',
        height: '100%',
      },
    },
  ],
});

const CollapseWrapperInner = styled('div', {
  name: 'MuiCollapse',
  slot: 'WrapperInner',
})({
  width: '100%',
  variants: [
    {
      props: {
        orientation: 'horizontal',
      },
      style: {
        width: 'auto',
        height: '100%',
      },
    },
  ],
});

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](/material-ui/react-stepper/#vertical-stepper) StepContent component.
 */
const Collapse = React.forwardRef(function Collapse(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiCollapse' });
  const {
    addEndListener,
    children,
    className,
    collapsedSize: collapsedSizeProp = '0px',
    component,
    disablePrefersReducedMotion = false,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    orientation = 'vertical',
    slots = EMPTY_OBJECT,
    slotProps = EMPTY_OBJECT,
    style,
    timeout = duration.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition,
    ...other
  } = props;

  const ownerState = {
    ...props,
    orientation,
    collapsedSize: collapsedSizeProp,
  };

  const classes = useUtilityClasses(ownerState);

  const theme = useTheme();
  const wrapperRef = React.useRef(null);
  const autoTransitionDuration = React.useRef(null);
  const collapsedSize =
    typeof collapsedSizeProp === 'number' ? `${collapsedSizeProp}px` : collapsedSizeProp;
  const isHorizontal = orientation === 'horizontal';
  const size = isHorizontal ? 'width' : 'height';
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, disablePrefersReducedMotion);

  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(ref, nodeRef);

  const getWrapperSize = () =>
    wrapperRef.current ? wrapperRef.current[isHorizontal ? 'clientWidth' : 'clientHeight'] : 0;

  const handleEnter = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
    if (wrapperRef.current && isHorizontal) {
      // Temporarily remove horizontal content from normal layout so we can
      // measure its natural width.
      wrapperRef.current.style.position = 'absolute';
    }
    node.style[size] = collapsedSize;

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntering = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
    const wrapperSize = getWrapperSize();

    if (wrapperRef.current && isHorizontal) {
      // Restore normal layout after measuring the horizontal content.
      wrapperRef.current.style.position = '';
    }

    const { duration: transitionDuration, easing: transitionTimingFunction } = getTransitionProps(
      { style, timeout, easing },
      {
        mode: 'enter',
      },
    );

    if (timeout === 'auto' && !reducedMotion.shouldReduceMotion) {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      autoTransitionDuration.current = duration2;
    } else {
      autoTransitionDuration.current = null;
    }
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: autoTransitionDuration.current ?? transitionDuration,
      delay: undefined,
    });

    node.style.transitionDuration =
      typeof transitionTiming.duration === 'string'
        ? transitionTiming.duration
        : `${transitionTiming.duration}ms`;

    node.style[size] = `${wrapperSize}px`;
    node.style.transitionTimingFunction = transitionTimingFunction;

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
    node.style[size] = 'auto';

    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });

  const handleExit = normalizedTransitionCallback(nodeRef, (node) => {
    node.style[size] = `${getWrapperSize()}px`;

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback(nodeRef, onExited);

  const handleExiting = normalizedTransitionCallback(nodeRef, (node) => {
    const wrapperSize = getWrapperSize();
    const { duration: transitionDuration, easing: transitionTimingFunction } = getTransitionProps(
      { style, timeout, easing },
      {
        mode: 'exit',
      },
    );

    if (timeout === 'auto' && !reducedMotion.shouldReduceMotion) {
      // getAutoHeightDuration also works for width; it calculates duration from size.
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      autoTransitionDuration.current = duration2;
    } else {
      autoTransitionDuration.current = null;
    }
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: autoTransitionDuration.current ?? transitionDuration,
      delay: undefined,
    });

    node.style.transitionDuration =
      typeof transitionTiming.duration === 'string'
        ? transitionTiming.duration
        : `${transitionTiming.duration}ms`;

    node.style[size] = collapsedSize;
    node.style.transitionTimingFunction = transitionTimingFunction;

    if (onExiting) {
      onExiting(node);
    }
  });

  const handleAddEndListener = addEndListener
    ? (next) => {
        addEndListener(nodeRef.current, next);
      }
    : undefined;

  const externalForwardedProps = {
    slots,
    slotProps,
    component,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref: handleRef,
    className: clsx(classes.root, className),
    elementType: CollapseRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      style: {
        [isHorizontal ? 'minWidth' : 'minHeight']: collapsedSize,
        ...style,
      },
    },
  });

  const [WrapperSlot, wrapperSlotProps] = useSlot('wrapper', {
    ref: wrapperRef,
    className: classes.wrapper,
    elementType: CollapseWrapper,
    externalForwardedProps,
    ownerState,
  });

  const [WrapperInnerSlot, wrapperInnerSlotProps] = useSlot('wrapperInner', {
    className: classes.wrapperInner,
    elementType: CollapseWrapperInner,
    externalForwardedProps,
    ownerState,
  });

  return (
    <TransitionComponent
      in={inProp}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      onExiting={handleExiting}
      addEndListener={handleAddEndListener}
      getAutoTimeout={timeout === 'auto' ? () => autoTransitionDuration.current : undefined}
      reduceMotion={reducedMotion.shouldReduceMotion}
      nodeRef={nodeRef}
      timeout={timeout === 'auto' ? null : timeout}
      {...other}
    >
      {/* Keep child props from replacing the ownerState used by Collapse slots. */}
      {(state, { ownerState: incomingOwnerState, ...restChildProps }) => {
        const stateOwnerState = { ...ownerState, state };
        return (
          <RootSlot
            {...rootSlotProps}
            className={clsx(rootSlotProps.className, {
              [classes.entered]: state === 'entered',
              [classes.hidden]: state === 'exited' && !inProp && collapsedSize === '0px',
            })}
            ownerState={stateOwnerState}
            {...restChildProps}
          >
            <WrapperSlot {...wrapperSlotProps} ownerState={stateOwnerState}>
              <WrapperInnerSlot {...wrapperInnerSlotProps} ownerState={stateOwnerState}>
                {children}
              </WrapperInnerSlot>
            </WrapperSlot>
          </RootSlot>
        );
      }}
    </TransitionComponent>
  );
});

Collapse.propTypes /* remove-proptypes */ = {
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
   * The content node to be collapsed.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
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
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    wrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    wrapperInner: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
    wrapper: PropTypes.elementType,
    wrapperInner: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

if (Collapse) {
  Collapse.muiSupportAuto = true;
}

export default Collapse;
