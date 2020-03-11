import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface FormControlTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    color?: 'primary' | 'secondary';
    disabled?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    hiddenLabel?: boolean;
    margin?: PropTypes.Margin;
    required?: boolean;
    size?: 'small' | 'medium';
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
  classKey: FormControlClassKey;
}

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
 * ⚠️Only one input can be used within a FormControl.
 *
 * Demos:
 * - {@link https://material-ui.com/components/checkboxes Checkboxes}
 * - {@link https://material-ui.com/components/radio-buttons Radio Buttons}
 * - {@link https://material-ui.com/components/switches Switches}
 * - {@link https://material-ui.com/components/text-fields Text Fields}
 *
 * API:
 * - {@link https://material-ui.com/api/FormControl FormControl API}
 *
 */
declare const FormControl: OverridableComponent<FormControlTypeMap>;

export type FormControlClassKey = 'root' | 'marginNormal' | 'marginDense' | 'fullWidth';

export type FormControlProps<
  D extends React.ElementType = FormControlTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormControlTypeMap<P, D>, D>;

export default FormControl;
