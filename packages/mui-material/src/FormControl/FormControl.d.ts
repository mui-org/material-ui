import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { FormControlClasses } from './formControlClasses';

export interface FormControlPropsSizeOverrides {}
export interface FormControlPropsColorOverrides {}

export interface FormControlOwnProps {
  /**
   * The content of the component.
   */
  children?: React.HTMLAttributes<HTMLDivElement>['children'] | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormControlClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        FormControlPropsColorOverrides
      >
    | undefined;
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean | undefined;
  /**
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean | undefined;
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused?: boolean | undefined;
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel?: boolean | undefined;
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin?: 'dense' | 'normal' | 'none' | undefined;
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required?: boolean | undefined;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', FormControlPropsSizeOverrides> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
}

export interface FormControlTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & FormControlOwnProps;
  defaultComponent: RootComponent;
}

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 * * FormLabel
 * * FormHelperText
 * * Input
 * * InputLabel
 *
 * You can find one composition example below and more going to [the demos](https://next.mui.com/material-ui/react-text-field/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `InputBase` can be used within a FormControl because it creates visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 *
 * Demos:
 *
 * - [Checkbox](https://next.mui.com/material-ui/react-checkbox/)
 * - [Number Field](https://next.mui.com/material-ui/react-number-field/)
 * - [Radio Group](https://next.mui.com/material-ui/react-radio-button/)
 * - [Switch](https://next.mui.com/material-ui/react-switch/)
 * - [Text Field](https://next.mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [FormControl API](https://next.mui.com/material-ui/api/form-control/)
 */
declare const FormControl: OverridableComponent<FormControlTypeMap>;

export type FormControlProps<
  RootComponent extends React.ElementType = FormControlTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FormControlTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default FormControl;
