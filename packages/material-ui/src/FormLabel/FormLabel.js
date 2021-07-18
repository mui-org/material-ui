import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import formLabelClasses, { getFormLabelUtilityClasses } from './formLabelClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, color, focused, disabled, error, filled, required } = styleProps;
  const slots = {
    root: [
      'root',
      `color${capitalize(color)}`,
      disabled && 'disabled',
      error && 'error',
      filled && 'filled',
      focused && 'focused',
      required && 'required',
    ],
    asterisk: ['asterisk', error && 'error'],
  };

  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};

export const FormLabelRoot = styled('label', {
  name: 'MuiFormLabel',
  slot: 'Root',
  overridesResolver: ({ styleProps }, styles) => {
    return {
      ...styles.root,
      ...(styleProps.color === 'secondary' && styles.colorSecondary),
      ...(styleProps.filled && styles.filled),
    };
  },
})(({ theme, styleProps }) => ({
  color: theme.palette.text.secondary,
  ...theme.typography.body1,
  lineHeight: '1.4375em',
  padding: 0,
  position: 'relative',
  [`&.${formLabelClasses.focused}`]: {
    color: theme.palette[styleProps.color].main,
  },
  [`&.${formLabelClasses.disabled}`]: {
    color: theme.palette.text.disabled,
  },
  [`&.${formLabelClasses.error}`]: {
    color: theme.palette.error.main,
  },
}));

const AsteriskComponent = styled('span', {
  name: 'MuiFormLabel',
  slot: 'Asterisk',
  overridesResolver: (props, styles) => styles.asterisk,
})(({ theme }) => ({
  [`&.${formLabelClasses.error}`]: {
    color: theme.palette.error.main,
  },
}));

const FormLabel = React.forwardRef(function FormLabel(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiFormLabel' });
  const {
    children,
    className,
    color,
    component = 'label',
    disabled,
    error,
    filled,
    focused,
    required,
    ...other
  } = props;

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
  });

  const styleProps = {
    ...props,
    color: fcs.color || 'primary',
    component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <FormLabelRoot
      as={component}
      styleProps={styleProps}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {children}
      {fcs.required && (
        <AsteriskComponent styleProps={styleProps} aria-hidden className={classes.asterisk}>
          &thinsp;{'*'}
        </AsteriskComponent>
      )}
    </FormLabelRoot>
  );
});

FormLabel.propTypes /* remove-proptypes */ = {
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
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default FormLabel;
