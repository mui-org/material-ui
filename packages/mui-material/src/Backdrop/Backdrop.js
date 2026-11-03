'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import useSlot from '../utils/useSlot';
import Fade from '../Fade';
import { getBackdropUtilityClass } from './backdropClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, invisible } = ownerState;

  const slots = {
    root: ['root', invisible && 'invisible'],
  };

  return composeClasses(slots, getBackdropUtilityClass, classes);
};

const BackdropRoot = styled('div', {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.invisible && styles.invisible];
  },
})({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent',
  variants: [
    {
      props: { invisible: true },
      style: {
        backgroundColor: 'transparent',
      },
    },
  ],
});

const Backdrop = React.forwardRef(function Backdrop(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiBackdrop' });
  const {
    children,
    className,
    component = 'div',
    invisible = false,
    open,
    slotProps = {},
    slots = {},
    transitionDuration,
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    invisible,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    component,
    slots,
    slotProps,
  };

  const [RootSlot, rootProps] = useSlot('root', {
    elementType: BackdropRoot,
    externalForwardedProps,
    className: clsx(classes.root, className),
    ownerState,
  });

  const [TransitionSlot, transitionProps] = useSlot('transition', {
    elementType: Fade,
    externalForwardedProps,
    ownerState,
  });

  return (
    <TransitionSlot in={open} timeout={transitionDuration} {...other} {...transitionProps}>
      <RootSlot {...rootProps} ref={ref}>
        {children}
      </RootSlot>
    </TransitionSlot>
  );
});

Backdrop.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: PropTypes.bool,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
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

export default Backdrop;
