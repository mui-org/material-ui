import { NumberField as BaseNumberField } from '@base-ui/react/number-field';

import type { OverridableStringUnion } from '@mui/types';

import type { InputProps as StandardInputProps } from '../Input';
import type { InternalStandardProps as StandardProps } from '../internal';
import type { FormControlProps } from '../FormControl';
import type { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import type { NumberFieldClasses } from './numberFieldClasses';
import type { FormHelperTextProps } from '../FormHelperText';
import type { InputLabelProps } from '../InputLabel';
import type { Theme } from '../styles/createTheme';
import type { FilledInputProps, InputBaseProps, OutlinedInputProps, SxProps } from '..';

type NumberFieldVariants = 'outlined' | 'standard' | 'filled';

export interface NumberFieldSlots {
  /**
   * The component that renders the helper text.
   * @default FormHelperText
   */
  formHelperText: React.ElementType;
  /**
   * The component that renders the input.
   * @default OutlinedInput
   */
  input: React.ElementType;
  /**
   * The component that renders the input's label.
   * @default InputLabel
   */
  inputLabel: React.ElementType;
  /**
   * The html input element.
   * @default 'input'
   */
  htmlInput: React.ElementType;
  /** The component that renders the root
   * @default FormControl
   */
  root: React.ElementType;
}

export interface NumberFieldPropsSizeOverrides {}
export interface NumberFieldPropsColorOverrides {}

export interface NumberFieldRootSlotOverrides {}
export interface NumberFieldInputSlotPropsOverrides {}
export interface NumberFieldFormHelperTextSlotPropsOverrides {}
export interface NumberFieldInputLabelSlotPropsOverrides {}

export type NumberFieldSlotsAndSlotProps<InputPropsType> = CreateSlotsAndSlotProps<
  NumberFieldSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the [FormControl](https://mui.com/material-ui/api/form-control/#props) component.
     */
    root: SlotProps<
      React.ElementType<FormControlProps>,
      NumberFieldRootSlotOverrides,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the input slot.
     * By default, the available props are based on the [Input](https://mui.com/material-ui/api/input/#props) component.
     */
    input: SlotProps<
      React.ElementType<InputPropsType>,
      NumberFieldInputSlotPropsOverrides,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the input label slot.
     * By default, the available props are based on the [InputLabel](https://mui.com/material-ui/api/input-label/#props) component.
     */
    inputLabel: SlotProps<
      React.ElementType<InputLabelProps>,
      NumberFieldInputLabelSlotPropsOverrides,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the html input slot.
     * By default, the available props are based on the html input element.
     */
    htmlInput: SlotProps<
      React.ElementType<InputBaseProps['inputProps']>,
      {},
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the form helper text slot.
     * By default, the available props are based on the [FormHelperText](https://mui.com/material-ui/api/form-helper-text/#props) component.
     */
    formHelperText: SlotProps<
      React.ElementType<FormHelperTextProps>,
      NumberFieldFormHelperTextSlotPropsOverrides,
      NumberFieldOwnerState
    >;
  }
>;

export interface BaseNumberFieldProps extends StandardProps<
  FormControlProps,
  'children' | 'defaultValue' | 'onChange' | 'onBlur' | 'onFocus'
> {
  /**
   * If `true`, the number input element will allow values outside the specified range.
   */
  allowOutOfRange?: BaseNumberField.Root.Props['allowOutOfRange'] | undefined;
  /**
   * If `true`, the number input element will respond to wheel scrub gestures.
   */
  allowWheelScrub?: BaseNumberField.Root.Props['allowWheelScrub'] | undefined;
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus?: boolean | undefined;
  /**
   * @ignore
   */
  children?: FormControlProps['children'] | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<NumberFieldClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        NumberFieldPropsColorOverrides
      >
    | undefined;
  /**
   * The default value of the number input element.
   */
  defaultValue?: BaseNumberField.Root.Props['defaultValue'] | undefined;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean | undefined;
  /**
   * Identifies the form that owns the input element.
   */
  form?: BaseNumberField.Root.Props['form'] | undefined;
  /**
   * Options to format the input value.
   *
   * See [MDN - Intl](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl).
   */
  format?: BaseNumberField.Root.Props['format'] | undefined;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean | undefined;
  /**
   * The helper text content.
   */
  helperText?: React.ReactNode | undefined;
  /**
   * The id of the input element.
   */
  id?: string | undefined;
  /**
   * The ref of the input element.
   */
  inputRef?: React.Ref<HTMLInputElement> | undefined;
  /**
   * The label content.
   */
  label?: React.ReactNode | undefined;
  /**
   * The large step value for the number input element.
   */
  largeStep?: BaseNumberField.Root.Props['largeStep'] | undefined;
  /**
   * The locale used for number formatting and parsing.
   *
   * See [MDN - Intl Number Format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
   */
  locale?: BaseNumberField.Root.Props['locale'] | undefined;
  /**
   * The maximum value allowed for the number input element.
   */
  max?: BaseNumberField.Root.Props['max'] | undefined;
  /**
   * The minimum value allowed for the number input element.
   */
  min?: BaseNumberField.Root.Props['min'] | undefined;
  /**
   * Name attribute of the `input` element.
   */
  name?: string | undefined;
  /**
   * The blur event handler of the input element.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  /**
   * The focus event handler of the input element.
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
  /**
   * The change event handler of the number input element.
   */
  onValueChange?: BaseNumberField.Root.Props['onValueChange'] | undefined;
  /**
   * The committed value event handler of the number input element.
   */
  onValueCommitted?: BaseNumberField.Root.Props['onValueCommitted'] | undefined;
  /**
   * If `true`, the input element is read-only.
   * @default false
   */
  readOnly?: boolean | undefined;
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required?: boolean | undefined;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', NumberFieldPropsSizeOverrides> | undefined;
  /**
   * The small step value for the number input element.
   */
  smallStep?: BaseNumberField.Root.Props['smallStep'] | undefined;
  /**
   * If `true`, the number input element will snap to the nearest step value.
   */
  snapOnStep?: BaseNumberField.Root.Props['snapOnStep'] | undefined;
  /**
   * The step attribute of the number input element.
   */
  step?: BaseNumberField.Root.Props['step'] | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The value of the number input element.
   */
  value?: BaseNumberField.Root.Props['value'] | undefined;
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: NumberFieldVariants | undefined;
}

export interface StandardNumberFieldProps
  extends BaseNumberFieldProps, NumberFieldSlotsAndSlotProps<StandardInputProps> {
  variant: 'standard';
}

export interface OutlinedNumberFieldProps
  extends BaseNumberFieldProps, NumberFieldSlotsAndSlotProps<OutlinedInputProps> {
  variant?: 'outlined' | undefined;
}

export interface FilledNumberFieldProps
  extends BaseNumberFieldProps, NumberFieldSlotsAndSlotProps<FilledInputProps> {
  variant: 'filled';
}

export type NumberFieldProps<Variant extends NumberFieldVariants = NumberFieldVariants> =
  Variant extends 'filled'
    ? FilledNumberFieldProps
    : Variant extends 'standard'
      ? StandardNumberFieldProps
      : OutlinedNumberFieldProps;

export interface NumberFieldOwnerState
  extends BaseNumberFieldProps, Pick<NumberFieldProps, 'slots' | 'slotProps'> {
  color: NonNullable<NumberFieldProps['color']>;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  size: NonNullable<NumberFieldProps['size']>;
  variant: NumberFieldVariants;
}
