import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import fabClasses, { getFabUtilityClass } from './fabClasses';
import styled from '../styles/styled';

const useUtilityClasses = (styleProps) => {
  const { color, variant, classes, size } = styleProps;

  const slots = {
    root: [
      'root',
      variant,
      `size${capitalize(size)}`,
      color === 'inherit' && 'colorInherit',
      color === 'primary' && 'primary',
      color === 'secondary' && 'secondary',
    ],
    label: ['label'],
  };

  return composeClasses(slots, getFabUtilityClass, classes);
};

const FabRoot = styled(ButtonBase, {
  name: 'MuiFab',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.root,
      styles[styleProps.variant],
      styles[`size${capitalize(styleProps.size)}`],
      styleProps.color === 'inherit' && styles.colorInherit,
      styleProps.color === 'primary' && styles.primary,
      styleProps.color === 'secondary' && styles.secondary,
    ];
  },
})(
  ({ theme, styleProps }) => ({
    /* Styles applied to the root element. */
    ...theme.typography.button,
    minHeight: 36,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
    '&:active': {
      boxShadow: theme.shadows[12],
    },
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    '&:hover': {
      backgroundColor: theme.palette.grey.A100,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.grey[300],
      },
      textDecoration: 'none',
    },
    [`&.${fabClasses.focusVisible}`]: {
      boxShadow: theme.shadows[6],
    },
    [`&.${fabClasses.disabled}`]: {
      color: theme.palette.action.disabled,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.action.disabledBackground,
    },
    /* Styles applied to the root element if `size="small"``. */
    ...(styleProps.size === 'small' && {
      width: 40,
      height: 40,
    }),
    /* Styles applied to the root element if `size="medium"``. */
    ...(styleProps.size === 'medium' && {
      width: 48,
      height: 48,
    }),
    /* Styles applied to the root element if `variant="extended"`. */
    ...(styleProps.variant === 'extended' && {
      borderRadius: 48 / 2,
      padding: '0 16px',
      width: 'auto',
      minHeight: 'auto',
      minWidth: 48,
      height: 48,
    }),
    ...(styleProps.variant === 'extended' &&
      styleProps.size === 'small' && {
        width: 'auto',
        padding: '0 8px',
        borderRadius: 34 / 2,
        minWidth: 34,
        height: 34,
      }),
    ...(styleProps.variant === 'extended' &&
      styleProps.size === 'medium' && {
        width: 'auto',
        padding: '0 16px',
        borderRadius: 40 / 2,
        minWidth: 40,
        height: 40,
      }),
    /* Styles applied to the root element if `color="inherit"`. */
    ...(styleProps.color === 'inherit' && {
      color: 'inherit',
    }),
  }),
  ({ theme, styleProps }) => ({
    /* Styles applied to the root element if `color="primary"`. */
    ...(styleProps.color === 'primary' && {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary.main,
        },
      },
    }),
    /* Styles applied to the root element if `color="secondary"`. */
    ...(styleProps.color === 'secondary' && {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    }),
  }),
);

const FabLabel = styled('span', {
  name: 'MuiFab',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})({
  /* Styles applied to the span element that wraps the children. */
  width: '100%', // assure the correct width for iOS Safari
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit',
});

const Fab = React.forwardRef(function Fab(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiFab' });
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

  const styleProps = {
    ...props,
    color,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <FabRoot
      className={clsx(classes.root, className)}
      component={component}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    >
      <FabLabel className={classes.label} styleProps={styleProps}>
        {children}
      </FabLabel>
    </FabRoot>
  );
});

Fab.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
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
    PropTypes.oneOf(['large', 'medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
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
