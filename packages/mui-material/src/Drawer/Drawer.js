'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import integerPropType from '@mui/utils/integerPropType';
import composeClasses from '@mui/utils/composeClasses';
import { useRtl } from '@mui/system/RtlProvider';
import Modal from '../Modal';
import Slide from '../Slide';
import Paper from '../Paper';
import capitalize from '../utils/capitalize';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import useForkRef from '../utils/useForkRef';
import { getDrawerUtilityClass } from './drawerClasses';
import useSlot from '../utils/useSlot';
import { FOCUSABLE_ATTRIBUTE } from '../utils/focusable';
import { mergeSlotProps } from '../utils';

const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    (ownerState.variant === 'permanent' || ownerState.variant === 'persistent') && styles.docked,
    ownerState.variant === 'temporary' && styles.modal,
  ];
};

const useUtilityClasses = (ownerState) => {
  const { classes, anchor, variant } = ownerState;

  const slots = {
    root: ['root', `anchor${capitalize(anchor)}`],
    docked: [(variant === 'permanent' || variant === 'persistent') && 'docked'],
    modal: ['modal'],
    paper: ['paper'],
  };

  return composeClasses(slots, getDrawerUtilityClass, classes);
};

const DrawerRoot = styled(Modal, {
  name: 'MuiDrawer',
  slot: 'Root',
  overridesResolver,
})(
  memoTheme(({ theme }) => ({
    zIndex: (theme.vars || theme).zIndex.drawer,
  })),
);

const DrawerDockedRoot = styled('div', {
  shouldForwardProp: rootShouldForwardProp,
  name: 'MuiDrawer',
  slot: 'Docked',
  skipVariantsResolver: false,
  overridesResolver,
})({
  flex: '0 0 auto',
});

const DrawerPaper = styled(Paper, {
  name: 'MuiDrawer',
  slot: 'Paper',
})(
  memoTheme(({ theme }) => ({
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: '1 0 auto',
    zIndex: (theme.vars || theme).zIndex.drawer,
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: 'touch',
    // temporary style
    position: 'fixed',
    top: 0,
    // We disable the focus ring for mouse, touch and keyboard users.
    // At some point, it would be better to keep it for keyboard users.
    // :focus-ring CSS pseudo-class will help.
    outline: 0,
    variants: [
      {
        props: {
          anchor: 'left',
        },
        style: {
          left: 0,
        },
      },
      {
        props: {
          anchor: 'top',
        },
        style: {
          top: 0,
          left: 0,
          right: 0,
          height: 'auto',
          maxHeight: '100%',
        },
      },
      {
        props: {
          anchor: 'right',
        },
        style: {
          right: 0,
        },
      },
      {
        props: {
          anchor: 'bottom',
        },
        style: {
          top: 'auto',
          left: 0,
          bottom: 0,
          right: 0,
          height: 'auto',
          maxHeight: '100%',
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchor === 'left' && ownerState.variant !== 'temporary',
        style: {
          borderRight: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchor === 'top' && ownerState.variant !== 'temporary',
        style: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchor === 'right' && ownerState.variant !== 'temporary',
        style: {
          borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.anchor === 'bottom' && ownerState.variant !== 'temporary',
        style: {
          borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
      },
    ],
  })),
);

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
};

export function isHorizontal(anchor) {
  return ['left', 'right'].includes(anchor);
}

export function getAnchor({ direction }, anchor) {
  return direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}

/**
 * The props of the [Modal](/material-ui/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
const Drawer = React.forwardRef(function Drawer(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiDrawer' });
  const theme = useTheme();
  const isRtl = useRtl();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    anchor: anchorProp = 'left',
    children,
    className,
    elevation = 16,
    hideBackdrop = false,
    ModalProps = {},
    onClose,
    open = false,
    transitionDuration = defaultTransitionDuration,
    variant = 'temporary',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.
  const mounted = React.useRef(false);
  const rootRef = React.useRef(null);
  const handleRef = useForkRef(ref, rootRef);

  React.useEffect(() => {
    mounted.current = true;
  }, []);

  // Resolve the container lazily so Slide reads the mounted modal root
  // after refs are assigned, rather than the initial null ref during render.
  const resolveSlideContainer = React.useCallback(() => rootRef.current, []);

  const anchorInvariant = getAnchor({ direction: isRtl ? 'rtl' : 'ltr' }, anchorProp);
  const anchor = anchorProp;

  const ownerState = {
    ...props,
    anchor,
    elevation,
    open,
    variant,
    ...other,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps: {
      ...slotProps,
      backdrop: mergeSlotProps(slotProps.backdrop, {
        transitionDuration,
      }),
    },
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref: handleRef,
    elementType: DrawerRoot,
    className: clsx(classes.root, classes.modal, className),
    shouldForwardComponentProp: true,
    ownerState,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      ...ModalProps,
    },
    additionalProps: {
      closeAfterTransition: true,
      open,
      onClose,
      hideBackdrop,
      slots: {
        backdrop: externalForwardedProps.slots.backdrop,
      },
      slotProps: {
        backdrop: externalForwardedProps.slotProps.backdrop,
      },
    },
  });

  const [PaperSlot, paperSlotProps] = useSlot('paper', {
    elementType: DrawerPaper,
    shouldForwardComponentProp: true,
    className: classes.paper,
    ownerState,
    externalForwardedProps,
    additionalProps: {
      elevation: variant === 'temporary' ? elevation : 0,
      square: true,
      ...(variant === 'temporary' && {
        role: 'dialog',
        'aria-modal': 'true',
        [FOCUSABLE_ATTRIBUTE]: '',
        tabIndex: -1,
      }),
    },
  });

  const [DockedSlot, dockedSlotProps] = useSlot('docked', {
    elementType: DrawerDockedRoot,
    ref: handleRef,
    className: clsx(classes.root, classes.docked, className),
    ownerState,
    externalForwardedProps,
    additionalProps: other, // pass `other` here because `DockedSlot` is also a root slot for some variants
  });

  const [TransitionSlot, transitionSlotProps] = useSlot('transition', {
    elementType: Slide,
    ownerState,
    externalForwardedProps,
    additionalProps: {
      in: open,
      direction: oppositeDirection[anchorInvariant],
      timeout: transitionDuration,
      appear: mounted.current,
      ...(variant === 'temporary' &&
        (slots.transition == null || slots.transition === Slide) && {
          container: resolveSlideContainer,
        }),
    },
  });

  const drawer = <PaperSlot {...paperSlotProps}>{children}</PaperSlot>;

  if (variant === 'permanent') {
    return <DockedSlot {...dockedSlotProps}>{drawer}</DockedSlot>;
  }

  const slidingDrawer = <TransitionSlot {...transitionSlotProps}>{drawer}</TransitionSlot>;

  if (variant === 'persistent') {
    return <DockedSlot {...dockedSlotProps}>{slidingDrawer}</DockedSlot>;
  }

  // variant === temporary
  return <RootSlot {...rootSlotProps}>{slidingDrawer}</RootSlot>;
});

Drawer.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * The content of the component.
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
   * The elevation of the drawer.
   * @default 16
   */
  elevation: integerPropType,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: PropTypes.bool,
  /**
   * Props applied to the [`Modal`](https://mui.com/material-ui/api/modal/) element.
   * @default {}
   */
  ModalProps: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,
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
  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

export default Drawer;
