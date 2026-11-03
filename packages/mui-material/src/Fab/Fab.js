'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import fabClasses, { getFabUtilityClass } from './fabClasses';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const { color, variant, classes, size } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      `size${capitalize(size)}`,
      color === 'inherit' ? 'colorInherit' : color,
    ],
  };

  const composedClasses = composeClasses(slots, getFabUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses,
  };
};

const FabRoot = styled(ButtonBase, {
  name: 'MuiFab',
  slot: 'Root',
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.color === 'inherit' && styles.colorInherit,
      styles[capitalize(ownerState.size)],
      styles[ownerState.color],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.button,
    minHeight: 36,
    ...getTransitionStyles(theme, ['background-color', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    zIndex: (theme.vars || theme).zIndex.fab,
    boxShadow: (theme.vars || theme).shadows[6],
    '&:active': {
      boxShadow: (theme.vars || theme).shadows[12],
    },
    color: theme.vars
      ? theme.vars.palette.grey[900]
      : theme.palette.getContrastText?.(theme.palette.grey[300]),
    backgroundColor: (theme.vars || theme).palette.grey[300],
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.grey.A100,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette.grey[300],
      },
      textDecoration: 'none',
    },
    [`&.${fabClasses.focusVisible}`]: {
      ...theme.focusVisible,
      boxShadow: theme.focusVisible?.boxShadow
        ? `${(theme.vars || theme).shadows[6]}, ${theme.focusVisible.boxShadow}`
        : (theme.vars || theme).shadows[6],
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          width: 40,
          height: 40,
        },
      },
      {
        props: { size: 'medium' },
        style: {
          width: 48,
          height: 48,
        },
      },
      {
        props: { variant: 'extended' },
        style: {
          borderRadius: 48 / 2,
          padding: '0 16px',
          width: 'auto',
          minHeight: 'auto',
          minWidth: 48,
          height: 48,
        },
      },
      {
        props: { variant: 'extended', size: 'small' },
        style: {
          width: 'auto',
          padding: '0 8px',
          borderRadius: 34 / 2,
          minWidth: 34,
          height: 34,
        },
      },
      {
        props: { variant: 'extended', size: 'medium' },
        style: {
          width: 'auto',
          padding: '0 16px',
          borderRadius: 40 / 2,
          minWidth: 40,
          height: 40,
        },
      },
      {
        props: { color: 'inherit' },
        style: {
          color: 'inherit',
        },
      },
    ],
  })),
  memoTheme(({ theme }) => ({
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['dark', 'contrastText'])) // check all the used fields in the style below
        .map(([color]) => ({
          props: { color },
          style: {
            color: (theme.vars || theme).palette[color].contrastText,
            backgroundColor: (theme.vars || theme).palette[color].main,
            '&:hover': {
              backgroundColor: (theme.vars || theme).palette[color].dark,
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: (theme.vars || theme).palette[color].main,
              },
            },
          },
        })),
    ],
  })),
  memoTheme(({ theme }) => ({
    [`&.${fabClasses.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
      boxShadow: (theme.vars || theme).shadows[0],
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
    },
  })),
);

const Fab = React.forwardRef(function Fab(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiFab' });
  const {
    children,
    className,
    color = 'default',
    component = 'button',
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = 'large',
    variant = 'circular',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  // Don't forward the 'root' class to the ButtonBase, as it will get duplicated with the one passed to the className prop.
  const { root, ...forwardedClasses } = classes;

  return (
    <FabRoot
      className={clsx(classes.root, className)}
      component={component}
      internalNativeButton
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      ownerState={ownerState}
      ref={ref}
      {...other}
      classes={forwardedClasses}
    >
      {children}
    </FabRoot>
  );
});

Fab.propTypes /* remove-proptypes */ = {
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'default',
      'error',
      'info',
      'inherit',
      'primary',
      'secondary',
      'success',
      'warning',
    ]),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'large'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'extended']),
    PropTypes.string,
  ]),
};

export default Fab;
