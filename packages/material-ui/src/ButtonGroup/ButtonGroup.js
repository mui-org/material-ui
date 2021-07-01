import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import buttonGroupClasses, { getButtonGroupUtilityClass } from './buttonGroupClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return [
    { [`& .${buttonGroupClasses.grouped}`]: styles.grouped },
    {
      [`& .${buttonGroupClasses.grouped}`]: styles[`grouped${capitalize(styleProps.orientation)}`],
    },
    { [`& .${buttonGroupClasses.grouped}`]: styles[`grouped${capitalize(styleProps.variant)}`] },
    {
      [`& .${buttonGroupClasses.grouped}`]:
        styles[`grouped${capitalize(styleProps.variant)}${capitalize(styleProps.orientation)}`],
    },
    {
      [`& .${buttonGroupClasses.grouped}`]:
        styles[`grouped${capitalize(styleProps.variant)}${capitalize(styleProps.color)}`],
    },
    styles.root,
    styles[styleProps.variant],
    styleProps.disableElevation === true && styles.disableElevation,
    styleProps.fullWidth && styles.fullWidth,
    styleProps.orientation === 'vertical' && styles.vertical,
  ];
};

const useUtilityClasses = (styleProps) => {
  const { classes, color, disabled, disableElevation, fullWidth, orientation, variant } =
    styleProps;

  const slots = {
    root: [
      'root',
      variant,
      orientation === 'vertical' && 'vertical',
      fullWidth && 'fullWidth',
      disableElevation && 'disableElevation',
    ],
    grouped: [
      'grouped',
      `grouped${capitalize(orientation)}`,
      `grouped${capitalize(variant)}`,
      `grouped${capitalize(variant)}${capitalize(orientation)}`,
      color !== 'default' && `grouped${capitalize(variant)}${capitalize(color)}`,
      disabled && 'disabled',
    ],
  };

  return composeClasses(slots, getButtonGroupUtilityClass, classes);
};

const ButtonGroupRoot = styled('div', {
  name: 'MuiButtonGroup',
  slot: 'Root',
  overridesResolver,
})(({ theme, styleProps }) => ({
  display: 'inline-flex',
  borderRadius: theme.shape.borderRadius,
  ...(styleProps.variant === 'contained' && {
    boxShadow: theme.shadows[2],
  }),
  ...(styleProps.disableElevation && {
    boxShadow: 'none',
  }),
  ...(styleProps.fullWidth && {
    width: '100%',
  }),
  ...(styleProps.orientation === 'vertical' && {
    flexDirection: 'column',
  }),
  [`& .${buttonGroupClasses.grouped}`]: {
    minWidth: 40,
    '&:not(:first-of-type)': {
      ...(styleProps.orientation === 'horizontal' && {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }),
      ...(styleProps.orientation === 'vertical' && {
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
      }),
      ...(styleProps.variant === 'outlined' &&
        styleProps.orientation === 'horizontal' && {
          marginLeft: -1,
        }),
      ...(styleProps.variant === 'outlined' &&
        styleProps.orientation === 'vertical' && {
          marginTop: -1,
        }),
    },
    '&:not(:last-of-type)': {
      ...(styleProps.orientation === 'horizontal' && {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }),
      ...(styleProps.orientation === 'vertical' && {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      }),
      ...(styleProps.variant === 'text' &&
        styleProps.orientation === 'horizontal' && {
          borderRight: `1px solid ${
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
          }`,
        }),
      ...(styleProps.variant === 'text' &&
        styleProps.orientation === 'vertical' && {
          borderBottom: `1px solid ${
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
          }`,
        }),
      ...(styleProps.variant === 'text' &&
        styleProps.color !== 'inherit' && {
          borderColor: alpha(theme.palette[styleProps.color].main, 0.5),
        }),
      ...(styleProps.variant === 'outlined' &&
        styleProps.orientation === 'horizontal' && {
          borderRightColor: 'transparent',
        }),
      ...(styleProps.variant === 'outlined' &&
        styleProps.orientation === 'vertical' && {
          borderBottomColor: 'transparent',
        }),
      ...(styleProps.variant === 'contained' &&
        styleProps.orientation === 'horizontal' && {
          borderRight: `1px solid ${theme.palette.grey[400]}`,
          [`&.${buttonGroupClasses.disabled}`]: {
            borderRight: `1px solid ${theme.palette.action.disabled}`,
          },
        }),
      ...(styleProps.variant === 'contained' &&
        styleProps.orientation === 'vertical' && {
          borderBottom: `1px solid ${theme.palette.grey[400]}`,
          [`&.${buttonGroupClasses.disabled}`]: {
            borderBottom: `1px solid ${theme.palette.action.disabled}`,
          },
        }),
      ...(styleProps.variant === 'contained' &&
        styleProps.color !== 'inherit' && {
          borderColor: theme.palette[styleProps.color].dark,
        }),
    },
    '&:hover': {
      ...(styleProps.variant === 'outlined' &&
        styleProps.color !== 'inherit' && {
          borderColor: theme.palette[styleProps.color].main,
        }),
      ...(styleProps.variant === 'contained' && {
        boxShadow: 'none',
      }),
    },
    ...(styleProps.variant === 'contained' && {
      boxShadow: 'none',
    }),
  },
}));

const ButtonGroup = React.forwardRef(function ButtonGroup(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiButtonGroup' });
  const {
    children,
    className,
    color = 'primary',
    component = 'div',
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth = false,
    orientation = 'horizontal',
    size = 'medium',
    variant = 'outlined',
    ...other
  } = props;

  const styleProps = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    orientation,
    size,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <ButtonGroupRoot
      as={component}
      role="group"
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "Material-UI: The ButtonGroup component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        return React.cloneElement(child, {
          className: clsx(classes.grouped, child.props.className),
          color: child.props.color || color,
          disabled: child.props.disabled || disabled,
          disableElevation: child.props.disableElevation || disableElevation,
          disableFocusRipple,
          disableRipple,
          fullWidth,
          size: child.props.size || size,
          variant: child.props.variant || variant,
        });
      })}
    </ButtonGroupRoot>
  );
});

ButtonGroup.propTypes /* remove-proptypes */ = {
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
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'primary', 'secondary']),
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
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the button keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string,
  ]),
};

export default ButtonGroup;
