'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import useSnackbar from './useSnackbar';
import ClickAwayListener from '../ClickAwayListener';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import Grow from '../Grow';
import SnackbarContent from '../SnackbarContent';
import { getSnackbarUtilityClass } from './snackbarClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, anchorOrigin } = ownerState;

  const slots = {
    root: [
      'root',
      `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`,
    ],
  };

  return composeClasses(slots, getSnackbarUtilityClass, classes);
};

const SnackbarRoot = styled('div', {
  name: 'MuiSnackbar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[
        `anchorOrigin${capitalize(ownerState.anchorOrigin.vertical)}${capitalize(
          ownerState.anchorOrigin.horizontal,
        )}`
      ],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    zIndex: (theme.vars || theme).zIndex.snackbar,
    position: 'fixed',
    display: 'flex',
    left: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    variants: [
      {
        props: ({ ownerState }) => ownerState.anchorOrigin.vertical === 'top',
        style: { top: 8, [theme.breakpoints.up('sm')]: { top: 24 } },
      },
      {
        props: ({ ownerState }) => ownerState.anchorOrigin.vertical !== 'top',
        style: { bottom: 8, [theme.breakpoints.up('sm')]: { bottom: 24 } },
      },
      {
        props: ({ ownerState }) => ownerState.anchorOrigin.horizontal === 'left',
        style: {
          justifyContent: 'flex-start',
          [theme.breakpoints.up('sm')]: {
            left: 24,
            right: 'auto',
          },
        },
      },
      {
        props: ({ ownerState }) => ownerState.anchorOrigin.horizontal === 'right',
        style: {
          justifyContent: 'flex-end',
          [theme.breakpoints.up('sm')]: {
            right: 24,
            left: 'auto',
          },
        },
      },
      {
        props: ({ ownerState }) => ownerState.anchorOrigin.horizontal === 'center',
        style: {
          [theme.breakpoints.up('sm')]: {
            left: '50%',
            right: 'auto',
            transform: 'translateX(-50%)',
          },
        },
      },
    ],
  })),
);

const Snackbar = React.forwardRef(function Snackbar(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSnackbar' });
  const theme = useTheme();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    action,
    anchorOrigin: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'left' },
    autoHideDuration = null,
    children,
    className,
    disableWindowBlurListener = false,
    message,
    onBlur,
    onClose,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    slots = {},
    slotProps = {},
    transitionDuration = defaultTransitionDuration,
    ...other
  } = props;

  const ownerState = {
    ...props,
    anchorOrigin: { vertical, horizontal },
    autoHideDuration,
    disableWindowBlurListener,
    transitionDuration,
  };

  const classes = useUtilityClasses(ownerState);

  const { getRootProps, onClickAway } = useSnackbar(ownerState);

  const [exited, setExited] = React.useState(true);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [Root, rootProps] = useSlot('root', {
    ref,
    className: [classes.root, className],
    elementType: SnackbarRoot,
    getSlotProps: getRootProps,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
    },
    ownerState,
  });

  const [ClickAwaySlot, { ownerState: clickAwayOwnerStateProp, ...clickAwayListenerProps }] =
    useSlot('clickAwayListener', {
      elementType: ClickAwayListener,
      externalForwardedProps,
      getSlotProps: (handlers) => ({
        onClickAway: (...params) => {
          const event = params[0];
          handlers.onClickAway?.(...params);
          if (event?.defaultMuiPrevented) {
            return;
          }
          onClickAway(...params);
        },
      }),
      ownerState,
    });

  const [ContentSlot, contentSlotProps] = useSlot('content', {
    elementType: SnackbarContent,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    additionalProps: {
      message,
      action,
    },
    ownerState,
  });

  const [TransitionSlot, transitionProps] = useSlot('transition', {
    elementType: Grow,
    externalForwardedProps,
    getSlotProps: (handlers) => ({
      onEnter: (...params) => {
        handlers.onEnter?.(...params);
        setExited(false);
      },
      onExited: (...params) => {
        handlers.onExited?.(...params);
        setExited(true);
      },
    }),
    additionalProps: {
      appear: true,
      in: open,
      timeout: transitionDuration,
      direction: vertical === 'top' ? 'down' : 'up',
    },
    ownerState,
  });

  // So we only render active snackbars.
  if (!open && exited) {
    return null;
  }

  return (
    <ClickAwaySlot
      {...clickAwayListenerProps}
      {...(slots.clickAwayListener && { ownerState: clickAwayOwnerStateProp })}
    >
      <Root {...rootProps}>
        <TransitionSlot {...transitionProps}>
          {children || <ContentSlot {...contentSlotProps} />}
        </TransitionSlot>
      </Root>
    </ClickAwaySlot>
  );
});

Snackbar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: PropTypes.node,
  /**
   * The anchor of the `Snackbar`.
   * On smaller screens, the component grows to occupy all the available width,
   * the horizontal alignment is ignored.
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired,
  }),
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: PropTypes.number,
  /**
   * Replace the `SnackbarContent` component.
   */
  children: PropTypes.element,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: PropTypes.bool,
  /**
   * When displaying multiple consecutive snackbars using a single parent-rendered
   * `<Snackbar/>`, add the `key` prop to ensure independent treatment of each message.
   * For instance, use `<Snackbar key={message} />`. Otherwise, messages might update
   * in place, and features like `autoHideDuration` could be affected.
   */
  key: () => null,
  /**
   * The message to display.
   */
  message: PropTypes.node,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event | null} event The event source of the callback, or `null` when `autoHideDuration` expired.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: PropTypes.number,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    clickAwayListener: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    clickAwayListener: PropTypes.elementType,
    content: PropTypes.elementType,
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

export default Snackbar;
