import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  unstable_composeClasses as composeClasses,
  FormControlUnstyled,
} from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import capitalize from '../utils/capitalize';
import { getFormControlUtilityClasses } from './formControlClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, margin, fullWidth } = styleProps;
  const slots = {
    root: [margin !== 'none' && `margin${capitalize(margin)}`, fullWidth && 'fullWidth'],
  };

  return composeClasses(slots, getFormControlUtilityClasses, classes);
};

const FormControlRoot = styled('div', {
  name: 'MuiFormControl',
  slot: 'Root',
  overridesResolver: ({ styleProps }, styles) => {
    return {
      ...styles.root,
      ...styles[`margin${capitalize(styleProps.margin)}`],
      ...(styleProps.fullWidth && styles.fullWidth),
    };
  },
})(({ styleProps }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: 'top', // Fix alignment issue on Safari.
  ...(styleProps.margin === 'normal' && {
    marginTop: 16,
    marginBottom: 8,
  }),
  ...(styleProps.margin === 'dense' && {
    marginTop: 8,
    marginBottom: 4,
  }),
  ...(styleProps.fullWidth && {
    width: '100%',
  }),
}));

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 *
 * You can find one composition example below and more going to [the demos](/components/text-fields/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `InputBase` can be used within a FormControl because it create visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 */
const FormControl = React.forwardRef(function FormControl(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiFormControl' });
  const {
    children,
    className,
    color = 'primary',
    component = 'div',
    disabled = false,
    error = false,
    focused,
    fullWidth = false,
    hiddenLabel = false,
    margin = 'none',
    required = false,
    size = 'medium',
    variant = 'outlined',
    ...other
  } = props;

  const styleProps = {
    ...props,
    color,
    component,
    disabled,
    error,
    fullWidth,
    hiddenLabel,
    margin,
    required,
    size,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  const childContext = {
    color,
    fullWidth,
    size,
    variant,
  };

  const componentsProps = {
    root: { as: component },
  };

  return (
    <FormControlUnstyled
      className={clsx(classes.root, className)}
      component={FormControlRoot}
      componentsProps={componentsProps}
      disabled={disabled}
      error={error}
      extraContextProperties={childContext}
      focused={focused}
      hiddenLabel={hiddenLabel}
      ref={ref}
      required={required}
      styleProps={styleProps}
      {...other}
    >
      {children}
    </FormControlUnstyled>
  );
});

FormControl.propTypes /* remove-proptypes */ = {
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
    PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: PropTypes.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default FormControl;
