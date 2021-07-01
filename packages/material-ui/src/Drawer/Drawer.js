import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { integerPropType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Modal from '../Modal';
import Slide from '../Slide';
import Paper from '../Paper';
import capitalize from '../utils/capitalize';
import { duration } from '../styles/createTransitions';
import useTheme from '../styles/useTheme';
import useThemeProps from '../styles/useThemeProps';
import styled, { rootShouldForwardProp } from '../styles/styled';
import { getDrawerUtilityClass } from './drawerClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return [
    styles.root,
    (styleProps.variant === 'permanent' || styleProps.variant === 'persistent') && styles.docked,
    styles.modal,
  ];
};

const useUtilityClasses = (styleProps) => {
  const { classes, anchor, variant } = styleProps;

  const slots = {
    root: ['root'],
    docked: [(variant === 'permanent' || variant === 'persistent') && 'docked'],
    modal: ['modal'],
    paper: [
      'paper',
      `paperAnchor${capitalize(anchor)}`,
      variant !== 'temporary' && `paperAnchorDocked${capitalize(anchor)}`,
    ],
  };

  return composeClasses(slots, getDrawerUtilityClass, classes);
};

const DrawerRoot = styled(Modal, {
  name: 'MuiDrawer',
  slot: 'Root',
  overridesResolver,
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer,
}));

const DrawerDockedRoot = styled('div', {
  shouldForwardProp: rootShouldForwardProp,
  name: 'MuiDrawer',
  slot: 'Docked',
  skipVariantsResolver: false,
  overridesResolver,
})({
  /* Styles applied to the root element if `variant="permanent or persistent"`. */
  flex: '0 0 auto',
});

const DrawerPaper = styled(Paper, {
  name: 'MuiDrawer',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.paper,
      styles[`paperAnchor${capitalize(styleProps.anchor)}`],
      styleProps.variant !== 'temporary' &&
        styles[`paperAnchorDocked${capitalize(styleProps.anchor)}`],
    ];
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to the Paper component. */
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: '1 0 auto',
  zIndex: theme.zIndex.drawer,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  // temporary style
  position: 'fixed',
  top: 0,
  // We disable the focus ring for mouse, touch and keyboard users.
  // At some point, it would be better to keep it for keyboard users.
  // :focus-ring CSS pseudo-class will help.
  outline: 0,
  ...(styleProps.anchor === 'left' && {
    /* Styles applied to the Paper component if `anchor="left"`. */
    left: 0,
  }),
  ...(styleProps.anchor === 'top' && {
    /* Styles applied to the Paper component if `anchor="top"`. */
    top: 0,
    left: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100%',
  }),
  ...(styleProps.anchor === 'right' && {
    /* Styles applied to the Paper component if `anchor="right"`. */
    right: 0,
  }),
  ...(styleProps.anchor === 'bottom' && {
    /* Styles applied to the Paper component if `anchor="bottom"`. */
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100%',
  }),
  ...(styleProps.anchor === 'left' &&
    styleProps.variant !== 'temporary' && {
      /* Styles applied to the Paper component if `anchor="left"` and `variant` is not "temporary". */
      borderRight: `1px solid ${theme.palette.divider}`,
    }),
  ...(styleProps.anchor === 'top' &&
    styleProps.variant !== 'temporary' && {
      /* Styles applied to the Paper component if `anchor="top"` and `variant` is not "temporary". */
      borderBottom: `1px solid ${theme.palette.divider}`,
    }),
  ...(styleProps.anchor === 'right' &&
    styleProps.variant !== 'temporary' && {
      /* Styles applied to the Paper component if `anchor="right"` and `variant` is not "temporary". */
      borderLeft: `1px solid ${theme.palette.divider}`,
    }),
  ...(styleProps.anchor === 'bottom' &&
    styleProps.variant !== 'temporary' && {
      /* Styles applied to the Paper component if `anchor="bottom"` and `variant` is not "temporary". */
      borderTop: `1px solid ${theme.palette.divider}`,
    }),
}));

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
};

export function isHorizontal(anchor) {
  return ['left', 'right'].indexOf(anchor) !== -1;
}

export function getAnchor(theme, anchor) {
  return theme.direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}

const defaultTransitionDuration = { enter: duration.enteringScreen, exit: duration.leavingScreen };
/**
 * The props of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
const Drawer = React.forwardRef(function Drawer(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiDrawer' });
  const {
    anchor: anchorProp = 'left',
    BackdropProps,
    children,
    className,
    elevation = 16,
    hideBackdrop = false,
    ModalProps: { BackdropProps: BackdropPropsProp, ...ModalProps } = {},
    onClose,
    open = false,
    PaperProps = {},
    SlideProps,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Slide,
    transitionDuration = defaultTransitionDuration,
    variant = 'temporary',
    ...other
  } = props;
  const theme = useTheme();

  // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.
  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);

  const anchorInvariant = getAnchor(theme, anchorProp);
  const anchor = anchorProp;

  const styleProps = {
    ...props,
    anchor,
    elevation,
    open,
    variant,
    ...other,
  };

  const classes = useUtilityClasses(styleProps);

  const drawer = (
    <DrawerPaper
      elevation={variant === 'temporary' ? elevation : 0}
      square
      {...PaperProps}
      className={clsx(classes.paper, PaperProps.className)}
      styleProps={styleProps}
    >
      {children}
    </DrawerPaper>
  );

  if (variant === 'permanent') {
    return (
      <DrawerDockedRoot
        className={clsx(classes.root, classes.docked, className)}
        styleProps={styleProps}
        ref={ref}
        {...other}
      >
        {drawer}
      </DrawerDockedRoot>
    );
  }

  const slidingDrawer = (
    <TransitionComponent
      in={open}
      direction={oppositeDirection[anchorInvariant]}
      timeout={transitionDuration}
      appear={mounted.current}
      {...SlideProps}
    >
      {drawer}
    </TransitionComponent>
  );

  if (variant === 'persistent') {
    return (
      <DrawerDockedRoot
        className={clsx(classes.root, classes.docked, className)}
        styleProps={styleProps}
        ref={ref}
        {...other}
      >
        {slidingDrawer}
      </DrawerDockedRoot>
    );
  }

  // variant === temporary
  return (
    <DrawerRoot
      BackdropProps={{
        ...BackdropProps,
        ...BackdropPropsProp,
        transitionDuration,
      }}
      className={clsx(classes.root, classes.modal, className)}
      open={open}
      styleProps={styleProps}
      onClose={onClose}
      hideBackdrop={hideBackdrop}
      ref={ref}
      {...other}
      {...ModalProps}
    >
      {slidingDrawer}
    </DrawerRoot>
  );
});

Drawer.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * @ignore
   */
  BackdropProps: PropTypes.object,
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
   * Props applied to the [`Modal`](/api/modal/) element.
   * @default {}
   */
  ModalProps: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: PropTypes.bool,
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   * @default {}
   */
  PaperProps: PropTypes.object,
  /**
   * Props applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default { enter: duration.enteringScreen, exit: duration.leavingScreen }
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
