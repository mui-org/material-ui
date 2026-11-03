import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { InputBaseClasses } from './inputBaseClasses';

export interface InputBasePropsSizeOverrides {}

export interface InputBasePropsColorOverrides {}

export interface InputBaseComponentsPropsOverrides {}

export interface InputBaseProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  /*
   * `onBlur`, `onChange`, `onFocus`, `onInvalid`, `onKeyDown`, `onKeyUp` are applied to the inner `InputComponent`,
   * which by default is an input or textarea. Since these handlers differ from the
   * ones inherited by `React.HTMLAttributes<HTMLDivElement>` we need to omit them.
   */
  | 'children'
  | 'defaultValue'
  | 'onBlur'
  | 'onChange'
  | 'onFocus'
  | 'onInvalid'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'aria-label'
> {
  'aria-describedby'?: string | undefined;
  'aria-label'?: string | undefined;
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete?: string | undefined;
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus?: boolean | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputBaseClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        InputBasePropsColorOverrides
      >
    | undefined;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: unknown;
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, GlobalStyles for the auto-fill keyframes will not be injected/removed on mount/unmount. Make sure to inject them at the top of your application.
   * This option is intended to help with boosting the initial rendering performance if you are loading a big amount of Input components at once.
   * @default false
   */
  disableInjectingGlobalStyles?: boolean | undefined;
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: React.ReactNode;
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error?: boolean | undefined;
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean | undefined;
  /**
   * The id of the `input` element.
   */
  id?: string | undefined;
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent?: React.ElementType<InputBaseComponentProps> | undefined;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps?: InputBaseComponentProps | undefined;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any> | undefined;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin?: 'dense' | 'none' | undefined;
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline?: boolean | undefined;
  /**
   * Name attribute of the `input` element.
   */
  name?: string | undefined;
  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
  /**
   * Callback fired when the `input` doesn't satisfy its constraints.
   */
  onInvalid?: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string | undefined;
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly?: boolean | undefined;
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required?: boolean | undefined;
  renderSuffix?:
    | ((state: {
        disabled?: boolean | undefined;
        error?: boolean | undefined;
        filled?: boolean | undefined;
        focused?: boolean | undefined;
        margin?: 'dense' | 'none' | 'normal' | undefined;
        required?: boolean | undefined;
        startAdornment?: React.ReactNode;
      }) => React.ReactNode)
    | undefined;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number | undefined;
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows?: string | number | undefined;
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows?: string | number | undefined;
  /**
   * The size of the component.
   */
  size?: OverridableStringUnion<'small' | 'medium', InputBasePropsSizeOverrides> | undefined;
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps?:
    | {
        root?:
          | (React.HTMLAttributes<HTMLDivElement> &
              InputBaseComponentsPropsOverrides & { sx?: SxProps<Theme> | undefined })
          | undefined;
        input?:
          | (React.InputHTMLAttributes<HTMLInputElement> &
              InputBaseComponentsPropsOverrides & { sx?: SxProps<Theme> | undefined })
          | undefined;
      }
    | undefined;
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots?:
    | {
        root?: React.ElementType | undefined;
        input?: React.ElementType | undefined;
      }
    | undefined;
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type?: string | undefined;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
}

export interface InputBaseComponentProps extends React.HTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  // Accommodate arbitrary additional props coming from the `inputProps` prop
  [arbitrary: string]: any;
}

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 *
 * Demos:
 *
 * - [Text Field](https://next.mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [InputBase API](https://next.mui.com/material-ui/api/input-base/)
 */
export default function InputBase(props: InputBaseProps): React.JSX.Element;
