import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps, OverridableTypeMap } from '../OverridableComponent';
import { FormLabelClasses } from './formLabelClasses';

export interface FormLabelPropsColorOverrides {}

/**
 * This type is kept for compatibility. Use `FormLabelOwnProps` instead.
 */
export type FormLabelBaseProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export interface FormLabelOwnProps {
  /**
   * The content of the component.
   */
  children?: React.LabelHTMLAttributes<HTMLLabelElement>['children'] | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormLabelClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        FormLabelPropsColorOverrides
      >
    | undefined;
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the label is displayed in an error state.
   */
  error?: boolean | undefined;
  /**
   * If `true`, the label should use filled classes key.
   */
  filled?: boolean | undefined;
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused?: boolean | undefined;
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface FormLabelTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'label',
> {
  props: AdditionalProps & FormLabelBaseProps & FormLabelOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Checkbox](https://next.mui.com/material-ui/react-checkbox/)
 * - [Number Field](https://next.mui.com/material-ui/react-number-field/)
 * - [Radio Group](https://next.mui.com/material-ui/react-radio-button/)
 * - [Switch](https://next.mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormLabel API](https://next.mui.com/material-ui/api/form-label/)
 */
declare const FormLabel: OverridableComponent<FormLabelTypeMap>;

export interface ExtendFormLabelTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] & Pick<FormLabelOwnProps, 'filled' | 'color'>;
  defaultComponent: TypeMap['defaultComponent'];
}

export type FormLabelProps<
  RootComponent extends React.ElementType = FormLabelTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FormLabelTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default FormLabel;
