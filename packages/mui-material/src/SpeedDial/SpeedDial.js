'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useTimeout from '@mui/utils/useTimeout';
import clamp from '@mui/utils/clamp';
import setRef from '@mui/utils/setRef';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Zoom from '../Zoom';
import Fab from '../Fab';
import { getReducedMotionStyles } from '../transitions/utils';
import capitalize from '../utils/capitalize';
import isMuiElement from '../utils/isMuiElement';
import useForkRef from '../utils/useForkRef';
import useControlled from '../utils/useControlled';
import speedDialClasses, { getSpeedDialUtilityClass } from './speedDialClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, open, direction } = ownerState;

  const slots = {
    root: ['root', `direction${capitalize(direction)}`],
    fab: ['fab'],
    actions: ['actions', !open && 'actionsClosed'],
  };

  return composeClasses(slots, getSpeedDialUtilityClass, classes);
};

function getOrientation(direction) {
  if (direction === 'up' || direction === 'down') {
    return 'vertical';
  }
  if (direction === 'right' || direction === 'left') {
    return 'horizontal';
  }
  return undefined;
}

const dialRadius = 32;
const spacingActions = 16;

const SpeedDialRoot = styled('div', {
  name: 'MuiSpeedDial',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[`direction${capitalize(ownerState.direction)}`]];
  },
})(
  memoTheme(({ theme }) => ({
    zIndex: (theme.vars || theme).zIndex.speedDial,
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
    variants: [
      {
        props: {
          direction: 'up',
        },
        style: {
          flexDirection: 'column-reverse',
          [`& .${speedDialClasses.actions}`]: {
            flexDirection: 'column-reverse',
            marginBottom: -dialRadius,
            paddingBottom: spacingActions + dialRadius,
          },
        },
      },
      {
        props: {
          direction: 'down',
        },
        style: {
          flexDirection: 'column',
          [`& .${speedDialClasses.actions}`]: {
            flexDirection: 'column',
            marginTop: -dialRadius,
            paddingTop: spacingActions + dialRadius,
          },
        },
      },
      {
        props: {
          direction: 'left',
        },
        style: {
          flexDirection: 'row-reverse',
          [`& .${speedDialClasses.actions}`]: {
            flexDirection: 'row-reverse',
            marginRight: -dialRadius,
            paddingRight: spacingActions + dialRadius,
          },
        },
      },
      {
        props: {
          direction: 'right',
        },
        style: {
          flexDirection: 'row',
          [`& .${speedDialClasses.actions}`]: {
            flexDirection: 'row',
            marginLeft: -dialRadius,
            paddingLeft: spacingActions + dialRadius,
          },
        },
      },
    ],
  })),
);

const SpeedDialFab = styled(Fab, {
  name: 'MuiSpeedDial',
  slot: 'Fab',
})({
  pointerEvents: 'auto',
});

const SpeedDialActions = styled('div', {
  name: 'MuiSpeedDial',
  slot: 'Actions',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.actions, !ownerState.open && styles.actionsClosed];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    pointerEvents: 'auto',
    variants: [
      {
        props: ({ ownerState }) => !ownerState.open,
        style: {
          transition: 'top 0s linear 0.2s',
          ...getReducedMotionStyles(theme),
          pointerEvents: 'none',
        },
      },
    ],
  })),
);

const SpeedDial = React.forwardRef(function SpeedDial(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSpeedDial' });
  const theme = useTheme();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    ariaLabel,
    FabProps: { ref: origDialButtonRef, ...FabProps } = {},
    children: childrenProp,
    className,
    direction = 'up',
    hidden = false,
    icon,
    onBlur,
    onClose,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onOpen,
    open: openProp,
    openIcon,
    slots = {},
    slotProps = {},
    transitionDuration = defaultTransitionDuration,
    ...other
  } = props;

  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'SpeedDial',
    state: 'open',
  });

  const ownerState = { ...props, open, direction };
  const classes = useUtilityClasses(ownerState);

  const eventTimer = useTimeout();

  /**
   * an index in actions.current
   */
  const focusedAction = React.useRef(0);

  /**
   * pressing this key while the focus is on a child SpeedDialAction focuses
   * the next SpeedDialAction.
   * It is equal to the first arrow key pressed while focus is on the SpeedDial
   * that is not orthogonal to the direction.
   * @type {utils.ArrowKey?}
   */
  const nextItemArrowKey = React.useRef();

  /**
   * refs to the Button that have an action associated to them in this SpeedDial
   * [Fab, ...(SpeedDialActions > Button)]
   * @type {HTMLButtonElement[]}
   */
  const actions = React.useRef([]);
  actions.current = [actions.current[0]];

  const handleOwnFabRef = React.useCallback((fabFef) => {
    actions.current[0] = fabFef;
  }, []);
  const handleFabRef = useForkRef(origDialButtonRef, handleOwnFabRef);

  /**
   * creates a ref callback for the Button in a SpeedDialAction
   * Is called before the original ref callback for Button that was set in buttonProps
   *
   * @param dialActionIndex {number}
   * @param fabSlotOrigButtonRef {React.RefObject?}
   */
  const createHandleSpeedDialActionButtonRef = (dialActionIndex, fabSlotOrigButtonRef) => {
    return (buttonRef) => {
      actions.current[dialActionIndex + 1] = buttonRef;

      setRef(fabSlotOrigButtonRef, buttonRef);
    };
  };

  const handleKeyDown = (event) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    const key = event.key.replace('Arrow', '').toLowerCase();
    const { current: nextItemArrowKeyCurrent = key } = nextItemArrowKey;

    if (event.key === 'Escape') {
      setOpenState(false);
      actions.current[0].focus();

      if (onClose) {
        onClose(event, 'escapeKeyDown');
      }
      return;
    }

    if (
      getOrientation(key) === getOrientation(nextItemArrowKeyCurrent) &&
      getOrientation(key) !== undefined
    ) {
      event.preventDefault();

      const actionStep = key === nextItemArrowKeyCurrent ? 1 : -1;

      // stay within array indices
      const nextAction = clamp(focusedAction.current + actionStep, 0, actions.current.length - 1);
      actions.current[nextAction].focus();
      focusedAction.current = nextAction;
      nextItemArrowKey.current = nextItemArrowKeyCurrent;
    }
  };

  React.useEffect(() => {
    // actions were closed while navigation state was not reset
    if (!open) {
      focusedAction.current = 0;
      nextItemArrowKey.current = undefined;
    }
  }, [open]);

  const handleClose = (event) => {
    if (event.type === 'mouseleave' && onMouseLeave) {
      onMouseLeave(event);
    }

    if (event.type === 'blur' && onBlur) {
      onBlur(event);
    }

    eventTimer.clear();
    if (event.type === 'blur') {
      eventTimer.start(0, () => {
        setOpenState(false);
        if (onClose) {
          onClose(event, 'blur');
        }
      });
    } else {
      setOpenState(false);
      if (onClose) {
        onClose(event, 'mouseLeave');
      }
    }
  };

  const handleClick = (event) => {
    if (FabProps.onClick) {
      FabProps.onClick(event);
    }

    eventTimer.clear();

    if (open) {
      setOpenState(false);
      if (onClose) {
        onClose(event, 'toggle');
      }
    } else {
      setOpenState(true);
      if (onOpen) {
        onOpen(event, 'toggle');
      }
    }
  };

  const handleOpen = (event) => {
    if (event.type === 'mouseenter' && onMouseEnter) {
      onMouseEnter(event);
    }

    if (event.type === 'focus' && onFocus) {
      onFocus(event);
    }

    // When moving the focus between two items,
    // a chain if blur and focus event is triggered.
    // We only handle the last event.
    eventTimer.clear();

    if (!open) {
      // Wait for a future focus or click event
      eventTimer.start(0, () => {
        setOpenState(true);
        if (onOpen) {
          const eventMap = {
            focus: 'focus',
            mouseenter: 'mouseEnter',
          };

          onOpen(event, eventMap[event.type]);
        }
      });
    }
  };

  // Filter the label for valid id characters.
  const id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, '');

  const allItems = React.Children.toArray(childrenProp).filter((child) => {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "MUI: The SpeedDial component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    return React.isValidElement(child);
  });

  const children = allItems.map((child, index) => {
    const { slotProps: childSlotProps = {} } = child.props;

    const { fab: { ref: fabSlotOrigButtonRef, ...fabSlotProps } = {}, ...restOfSlotProps } =
      childSlotProps;

    const defaultPlacement = getOrientation(direction) === 'vertical' ? 'left' : 'top';

    return React.cloneElement(child, {
      slotProps: {
        ...restOfSlotProps,
        fab: {
          ...fabSlotProps,
          ref: createHandleSpeedDialActionButtonRef(index, fabSlotOrigButtonRef),
        },
        tooltip:
          typeof restOfSlotProps.tooltip === 'function'
            ? (state) => ({
                placement: defaultPlacement,
                ...restOfSlotProps.tooltip(state),
              })
            : { placement: defaultPlacement, ...restOfSlotProps.tooltip },
      },
      delay: 30 * (open ? index : allItems.length - index),
      open,
      id: `${id}-action-${index}`,
    });
  });

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    elementType: SpeedDialRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
    },
    ownerState,
    ref,
    className: clsx(classes.root, className),
    additionalProps: {
      role: 'presentation',
    },
    getSlotProps: (handlers) => ({
      ...handlers,
      onKeyDown: (event) => {
        handlers.onKeyDown?.(event);
        handleKeyDown(event);
      },
      onBlur: (event) => {
        handlers.onBlur?.(event);
        handleClose(event);
      },
      onFocus: (event) => {
        handlers.onFocus?.(event);
        handleOpen(event);
      },
      onMouseEnter: (event) => {
        handlers.onMouseEnter?.(event);
        handleOpen(event);
      },
      onMouseLeave: (event) => {
        handlers.onMouseLeave?.(event);
        handleClose(event);
      },
    }),
  });

  const [TransitionSlot, transitionProps] = useSlot('transition', {
    elementType: Zoom,
    externalForwardedProps,
    ownerState,
  });

  return (
    <RootSlot {...rootSlotProps}>
      <TransitionSlot in={!hidden} timeout={transitionDuration} unmountOnExit {...transitionProps}>
        <SpeedDialFab
          color="primary"
          aria-label={ariaLabel}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={`${id}-actions`}
          {...FabProps}
          onClick={handleClick}
          className={clsx(classes.fab, FabProps.className)}
          ref={handleFabRef}
          ownerState={ownerState}
        >
          {React.isValidElement(icon) && isMuiElement(icon, ['SpeedDialIcon'])
            ? React.cloneElement(icon, { open })
            : icon}
        </SpeedDialFab>
      </TransitionSlot>
      <SpeedDialActions
        id={`${id}-actions`}
        role="menu"
        aria-orientation={getOrientation(direction)}
        className={clsx(classes.actions, { [classes.actionsClosed]: !open })}
        ownerState={ownerState}
      >
        {children}
      </SpeedDialActions>
    </RootSlot>
  );
});

SpeedDial.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The aria-label of the button element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: PropTypes.string.isRequired,
  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
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
   * The direction the actions open relative to the floating action button.
   * @default 'up'
   */
  direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),
  /**
   * Props applied to the [`Fab`](https://mui.com/material-ui/api/fab/) element.
   * @default {}
   */
  FabProps: PropTypes.object,
  /**
   * If `true`, the SpeedDial is hidden.
   * @default false
   */
  hidden: PropTypes.bool,
  /**
   * The icon to display in the SpeedDial Fab. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"blur"`, `"mouseLeave"`, `"escapeKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"focus"`, `"mouseEnter"`.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The icon to display in the SpeedDial Fab when the SpeedDial is open.
   */
  openIcon: PropTypes.node,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
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
};

export default SpeedDial;
