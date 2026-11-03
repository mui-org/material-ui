import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { FormHelperTextClasses } from './formHelperTextClasses';

export interface FormHelperTextPropsVariantOverrides {}

export interface FormHelperTextOwnProps {
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormHelperTextClasses> | undefined;
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error?: boolean | undefined;
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled?: boolean | undefined;
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused?: boolean | undefined;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense' | undefined;
  /**
   * If `true`, the helper text should use required classes key.
   */
  required?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The variant to use.
   */
  variant?:
    | OverridableStringUnion<
        'standard' | 'outlined' | 'filled',
        FormHelperTextPropsVariantOverrides
      >
    | undefined;
}

export interface FormHelperTextTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'p',
> {
  props: AdditionalProps & FormHelperTextOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Number Field](https://next.mui.com/material-ui/react-number-field/)
 * - [Text Field](https://next.mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [FormHelperText API](https://next.mui.com/material-ui/api/form-helper-text/)
 */
declare const FormHelperText: OverridableComponent<FormHelperTextTypeMap>;

export type FormHelperTextProps<
  RootComponent extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FormHelperTextTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default FormHelperText;
