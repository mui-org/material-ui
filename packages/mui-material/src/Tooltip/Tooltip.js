'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useTimeout, { Timeout } from '@mui/utils/useTimeout';
import elementAcceptingRef from '@mui/utils/elementAcceptingRef';
import composeClasses from '@mui/utils/composeClasses';
import isFocusVisible from '@mui/utils/isFocusVisible';
import getReactElementRef from '@mui/utils/getReactElementRef';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import Grow from '../Grow';
import Popper from '../Popper';
import useEventCallback from '../utils/useEventCallback';
import useForkRef from '../utils/useForkRef';
import useId from '../utils/useId';
import useControlled from '../utils/useControlled';
import useSlot from '../utils/useSlot';
import tooltipClasses, { getTooltipUtilityClass } from './tooltipClasses';

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const useUtilityClasses = (ownerState) => {
  const { classes, disableInteractive, arrow, touch, placement, open } = ownerState;

  const slots = {
    popper: [
      'popper',
      !disableInteractive && 'popperInteractive',
      arrow && 'popperArrow',
      !open && 'popperClose',
    ],
    tooltip: [
      'tooltip',
      arrow && 'tooltipArrow',
      touch && 'touch',
      `tooltipPlacement${capitalize(placement.split('-')[0])}`,
    ],
    arrow: ['arrow'],
  };

  return composeClasses(slots, getTooltipUtilityClass, classes);
};

const TooltipPopper = styled(Popper, {
  name: 'MuiTooltip',
  slot: 'Popper',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.popper,
      !ownerState.disableInteractive && styles.popperInteractive,
      ownerState.arrow && styles.popperArrow,
      !ownerState.open && styles.popperClose,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    zIndex: (theme.vars || theme).zIndex.tooltip,
    pointerEvents: 'none',
    variants: [
      {
        props: ({ ownerState }) => ownerState.open && !ownerState.disableInteractive,
        style: {
          pointerEvents: 'auto',
        },
      },
      {
        props: ({ ownerState }) => ownerState.arrow,
        style: {
          [`&[data-popper-placement*="bottom"] .${tooltipClasses.arrow}`]: {
            top: 0,
            marginTop: '-0.71em',
            '&::before': {
              transformOrigin: '0 100%',
            },
          },
          [`&[data-popper-placement*="top"] .${tooltipClasses.arrow}`]: {
            bottom: 0,
            marginBottom: '-0.71em',
            '&::before': {
              transformOrigin: '100% 0',
            },
          },
          [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
            height: '1em',
            width: '0.71em',
            insetInlineStart: 0,
            marginInlineStart: '-0.71em',
            '&::before': {
              transformOrigin: '100% 100%',
            },
          },
          [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
            height: '1em',
            width: '0.71em',
            insetInlineEnd: 0,
            marginInlineEnd: '-0.71em',
            '&::before': {
              transformOrigin: '0 0',
            },
          },
        },
      },
    ],
  })),
);

const TooltipTooltip = styled('div', {
  name: 'MuiTooltip',
  slot: 'Tooltip',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.tooltip,
      ownerState.touch && styles.touch,
      ownerState.arrow && styles.tooltipArrow,
      styles[`tooltipPlacement${capitalize(ownerState.placement.split('-')[0])}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    backgroundColor: theme.vars
      ? theme.vars.palette.Tooltip.bg
      : theme.alpha(theme.palette.grey[700], 0.92),
    borderRadius: (theme.vars || theme).shape.borderRadius,
    color: (theme.vars || theme).palette.common.white,
    fontFamily: theme.typography.fontFamily,
    padding: '4px 8px',
    fontSize: theme.typography.pxToRem(11),
    maxWidth: 300,
    margin: 2,
    wordWrap: 'break-word',
    fontWeight: theme.typography.fontWeightMedium,
    [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
      transformOrigin: 'right center',
      marginInlineEnd: '14px',
    },
    [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
      transformOrigin: 'left center',
      marginInlineStart: '14px',
    },
    [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
      transformOrigin: 'center bottom',
      marginBottom: '14px',
    },
    [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
      transformOrigin: 'center top',
      marginTop: '14px',
    },
    variants: [
      {
        props: ({ ownerState }) => ownerState.arrow,
        style: {
          position: 'relative',
          marginBlock: 0,
        },
      },
      {
        props: ({ ownerState }) => ownerState.touch,
        style: {
          padding: '8px 16px',
          fontSize: theme.typography.pxToRem(14),
          lineHeight: `${round(16 / 14)}em`,
          fontWeight: theme.typography.fontWeightRegular,
        },
      },
      {
        props: ({ ownerState }) => ownerState.touch,
        style: {
          [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
            marginInlineEnd: '24px',
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
            marginInlineStart: '24px',
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
            marginBottom: '24px',
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
            marginTop: '24px',
          },
        },
      },
    ],
  })),
);

const TooltipArrow = styled('span', {
  name: 'MuiTooltip',
  slot: 'Arrow',
})(
  memoTheme(({ theme }) => ({
    overflow: 'hidden',
    position: 'absolute',
    width: '1em',
    height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
    boxSizing: 'border-box',
    color: theme.vars ? theme.vars.palette.Tooltip.bg : theme.alpha(theme.palette.grey[700], 0.9),
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: 'currentColor',
      transform: 'rotate(45deg)',
    },
  })),
);

let hystersisOpen = false;
const hystersisTimer = new Timeout();
let cursorPosition = { x: 0, y: 0 };

export function testReset() {
  hystersisOpen = false;
  hystersisTimer.clear();
}

function composeEventHandler(handler, eventHandler) {
  return (event, ...params) => {
    if (eventHandler) {
      eventHandler(event, ...params);
    }
    handler(event, ...params);
  };
}

const Tooltip = React.forwardRef(function Tooltip(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTooltip' });
  const {
    arrow = false,
    children: childrenProp,
    classes: classesProp,
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive: disableInteractiveProp = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = 'bottom',
    slotProps = {},
    slots = {},
    title,
    ...other
  } = props;

  // to prevent runtime errors, developers will need to provide a child as a React element anyway.
  const children = React.isValidElement(childrenProp) ? childrenProp : <span>{childrenProp}</span>;

  const theme = useTheme();

  const [childNode, setChildNode] = React.useState();
  const [arrowRef, setArrowRef] = React.useState(null);
  const ignoreNonTouchEvents = React.useRef(false);
  const openedByDisabledTriggerRef = React.useRef(false);

  const disableInteractive = disableInteractiveProp || followCursor;

  const closeTimer = useTimeout();
  const enterTimer = useTimeout();
  const leaveTimer = useTimeout();
  const touchTimer = useTimeout();

  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open',
  });

  let open = openState;
  const { current: isControlled } = React.useRef(openProp !== undefined);

  const id = useId(idProp);

  const prevUserSelect = React.useRef();
  const stopTouchInteraction = useEventCallback(() => {
    if (prevUserSelect.current !== undefined) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = undefined;
    }
    touchTimer.clear();
  });

  React.useEffect(() => stopTouchInteraction, [stopTouchInteraction]);

  const handleOpen = (event) => {
    hystersisTimer.clear();
    hystersisOpen = true;

    // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
    setOpenState(true);

    if (onOpen && !open) {
      onOpen(event);
    }
  };

  const handleClose = useEventCallback(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (event) => {
      openedByDisabledTriggerRef.current = false;
      hystersisTimer.start(800 + leaveDelay, () => {
        hystersisOpen = false;
      });
      setOpenState(false);

      if (onClose && open) {
        onClose(event);
      }

      closeTimer.start(theme.transitions.duration.shortest, () => {
        ignoreNonTouchEvents.current = false;
      });
    },
  );

  const handleMouseOver = (event) => {
    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    }

    // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).
    if (childNode) {
      childNode.removeAttribute('title');
    }

    enterTimer.clear();
    leaveTimer.clear();
    if (enterDelay || (hystersisOpen && enterNextDelay)) {
      enterTimer.start(hystersisOpen ? enterNextDelay : enterDelay, () => {
        handleOpen(event);
      });
    } else {
      handleOpen(event);
    }
  };

  const handleTriggerMouseOver = (event) => {
    if (childNode?.disabled && !isControlled) {
      // A disabled trigger can open the tooltip if it receives pointer events.
      // However, if the trigger became disabled while the tooltip was already open,
      // stray mouseover events must not cancel the pending close.
      if (open && !openedByDisabledTriggerRef.current) {
        return;
      }

      openedByDisabledTriggerRef.current = true;
    } else {
      openedByDisabledTriggerRef.current = false;
    }

    handleMouseOver(event);
  };

  const handleInteractiveWrapperMouseOver = (event) => {
    if (childNode?.disabled && !isControlled && !openedByDisabledTriggerRef.current) {
      return;
    }

    handleMouseOver(event);
  };

  const handleMouseLeave = (event) => {
    enterTimer.clear();
    leaveTimer.start(leaveDelay, () => {
      handleClose(event);
    });
  };

  const [, setChildIsFocusVisible] = React.useState(false);
  const handleBlur = (event) => {
    // Needed for https://github.com/mui/material-ui/issues/45373
    const target = event?.target ?? childNode;
    if (!target || target.disabled || !isFocusVisible(target)) {
      setChildIsFocusVisible(false);

      // InputBase can call onBlur() without an event when the input becomes disabled.
      // Tooltip must not assume an event object exists.
      const closeEvent = event ?? new Event('blur');

      // `new Event('blur')` has `target/currentTarget === null`, but Tooltip's close logic
      // (and user callbacks like onClose) may expect them to reference the anchor element.
      if (!event && target) {
        Object.defineProperty(closeEvent, 'target', { value: target });
        Object.defineProperty(closeEvent, 'currentTarget', { value: target });
      }
      handleMouseLeave(closeEvent);
    }
  };

  const handleFocus = (event) => {
    // Workaround for https://github.com/react/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    openedByDisabledTriggerRef.current = false;

    if (isFocusVisible(event.target)) {
      // Workaround for https://github.com/react/react/issues/9142.
      // React does not fire blur when a focused element becomes disabled.
      const handleNativeBlur = (blurEvent) => {
        if (blurEvent.target.disabled) {
          handleBlur(blurEvent);
        }
        blurEvent.target.removeEventListener('blur', handleNativeBlur);
      };

      event.target.addEventListener('blur', handleNativeBlur);
      setChildIsFocusVisible(true);
      handleMouseOver(event);
    }
  };

  const detectTouchStart = (event) => {
    ignoreNonTouchEvents.current = true;

    const childrenProps = children.props;
    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  const handleTouchStart = (event) => {
    detectTouchStart(event);
    leaveTimer.clear();
    closeTimer.clear();
    stopTouchInteraction();

    prevUserSelect.current = document.body.style.WebkitUserSelect;
    // Prevent iOS text selection on long-tap.
    document.body.style.WebkitUserSelect = 'none';

    touchTimer.start(enterTouchDelay, () => {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleTriggerMouseOver(event);
    });
  };

  const handleTouchEnd = (event) => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    stopTouchInteraction();
    leaveTimer.start(leaveTouchDelay, () => {
      handleClose(event);
    });
  };

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    /**
     * @param {KeyboardEvent} nativeEvent
     */
    function handleKeyDown(nativeEvent) {
      if (nativeEvent.key === 'Escape') {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);

  const handleRef = useForkRef(getReactElementRef(children), setChildNode, ref);

  // There is no point in displaying an empty tooltip.
  // So we exclude all falsy values, except 0, which is valid.
  if (!title && title !== 0) {
    open = false;
  }

  const popperRef = React.useRef();

  const handleMouseMove = (event) => {
    const childrenProps = children.props;
    if (childrenProps.onMouseMove) {
      childrenProps.onMouseMove(event);
    }

    cursorPosition = { x: event.clientX, y: event.clientY };

    if (popperRef.current) {
      popperRef.current.update();
    }
  };

  const nameOrDescProps = {};
  const titleIsString = typeof title === 'string';
  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps['aria-describedby'] = open ? id : null;
  } else {
    nameOrDescProps['aria-label'] = titleIsString ? title : null;
    nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
  }

  const childrenProps = {
    ...nameOrDescProps,
    ...other,
    ...children.props,
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef,
    ...(followCursor ? { onMouseMove: handleMouseMove } : {}),
  };

  if (process.env.NODE_ENV !== 'production') {
    childrenProps['data-mui-internal-clone-element'] = true;

    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks -- process.env never changes
    React.useEffect(() => {
      if (childNode && !childNode.getAttribute('data-mui-internal-clone-element')) {
        console.error(
          [
            'MUI: The `children` component of the Tooltip is not forwarding its props correctly.',
            'Please make sure that props are spread on the same element that the ref is applied to.',
          ].join('\n'),
        );
      }
    }, [childNode]);
  }

  const interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeEventHandler(
      handleTriggerMouseOver,
      childrenProps.onMouseOver,
    );
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);

    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleInteractiveWrapperMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);

    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (children.props.title) {
      console.error(
        [
          'MUI: You have provided a `title` prop to the child of <Tooltip />.',
          `Remove this title prop \`${children.props.title}\` or the Tooltip component.`,
        ].join('\n'),
      );
    }
  }

  const ownerState = {
    ...props,
    arrow,
    disableInteractive,
    open,
    placement,
    touch: ignoreNonTouchEvents.current,
  };

  const resolvedPopperProps =
    typeof slotProps.popper === 'function' ? slotProps.popper(ownerState) : slotProps.popper;
  const popperOptions = React.useMemo(() => {
    let tooltipModifiers = [
      {
        name: 'arrow',
        enabled: Boolean(arrowRef),
        options: {
          element: arrowRef,
          padding: 4,
        },
      },
    ];

    if (resolvedPopperProps?.popperOptions?.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(resolvedPopperProps.popperOptions.modifiers);
    }

    return {
      ...resolvedPopperProps?.popperOptions,
      modifiers: tooltipModifiers,
    };
  }, [arrowRef, resolvedPopperProps?.popperOptions]);

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps: {
      arrow: slotProps.arrow,
      popper: resolvedPopperProps,
      tooltip: slotProps.tooltip,
      transition: slotProps.transition,
    },
  };

  const [PopperSlot, popperSlotProps] = useSlot('popper', {
    elementType: TooltipPopper,
    externalForwardedProps,
    ownerState,
    className: classes.popper,
  });

  const [TransitionSlot, transitionSlotProps] = useSlot('transition', {
    elementType: Grow,
    externalForwardedProps,
    ownerState,
  });

  const [TooltipSlot, tooltipSlotProps] = useSlot('tooltip', {
    elementType: TooltipTooltip,
    className: classes.tooltip,
    externalForwardedProps,
    ownerState,
  });

  const [ArrowSlot, arrowSlotProps] = useSlot('arrow', {
    elementType: TooltipArrow,
    className: classes.arrow,
    externalForwardedProps,
    ownerState,
    ref: setArrowRef,
  });

  return (
    <React.Fragment>
      {React.cloneElement(children, childrenProps)}
      <PopperSlot
        as={Popper}
        placement={placement}
        anchorEl={
          followCursor
            ? {
                getBoundingClientRect: () => ({
                  top: cursorPosition.y,
                  left: cursorPosition.x,
                  right: cursorPosition.x,
                  bottom: cursorPosition.y,
                  width: 0,
                  height: 0,
                }),
              }
            : childNode
        }
        popperRef={popperRef}
        open={childNode ? open : false}
        id={id}
        transition
        {...interactiveWrapperListeners}
        {...popperSlotProps}
        popperOptions={popperOptions}
      >
        {({ TransitionProps: TransitionPropsInner }) => (
          <TransitionSlot
            timeout={theme.transitions.duration.shorter}
            {...TransitionPropsInner}
            {...transitionSlotProps}
          >
            <TooltipSlot {...tooltipSlotProps}>
              {title}
              {arrow ? <ArrowSlot {...arrowSlotProps} /> : null}
            </TooltipSlot>
          </TransitionSlot>
        )}
      </PopperSlot>
    </React.Fragment>
  );
});

Tooltip.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: PropTypes.bool,
  /**
   * Tooltip reference element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: PropTypes.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: PropTypes.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: PropTypes.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: PropTypes.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: PropTypes.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: PropTypes.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: PropTypes.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: PropTypes.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: PropTypes.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: PropTypes.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: PropTypes.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf([
    'auto-end',
    'auto-start',
    'auto',
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    arrow: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    arrow: PropTypes.elementType,
    popper: PropTypes.elementType,
    tooltip: PropTypes.elementType,
    transition: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: PropTypes.node,
};

export default Tooltip;
