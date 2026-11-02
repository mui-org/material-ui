import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import Typography from '../Typography';
import { FormControlLabelClasses } from './formControlLabelClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface FormControlLabelTypographySlotPropsOverrides {}

export interface FormControlLabelSlots {
  /**
   * The component that renders the label.
   * This is unused if `disableTypography` is true.
   * @default Typography
   */
  typography: React.ElementType;
}

export type FormControlLabelSlotsAndSlotProps = CreateSlotsAndSlotProps<
  FormControlLabelSlots,
  {
    typography: SlotProps<
      typeof Typography,
      FormControlLabelTypographySlotPropsOverrides,
      FormControlLabelProps
    >;
  }
>;

export interface FormControlLabelProps
  extends
    StandardProps<React.LabelHTMLAttributes<HTMLLabelElement>, 'children' | 'onChange'>,
    FormControlLabelSlotsAndSlotProps {
  /**
   * If `true`, the component appears selected.
   */
  checked?: boolean | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormControlLabelClasses> | undefined;
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: React.ReactElement<unknown, any>;
  /**
   * If `true`, the control is disabled.
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the label is rendered as it is passed without an additional typography node.
   */
  disableTypography?: boolean | undefined;
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: React.ReactNode;
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom' | undefined;
  name?: string | undefined;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: ((event: React.SyntheticEvent, checked: boolean) => void) | undefined;
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The value of the component.
   */
  value?: unknown;
}

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 *
 * Demos:
 *
 * - [Checkbox](https://next.mui.com/material-ui/react-checkbox/)
 * - [Radio Group](https://next.mui.com/material-ui/react-radio-button/)
 * - [Switch](https://next.mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormControlLabel API](https://next.mui.com/material-ui/api/form-control-label/)
 */
export default function FormControlLabel(props: FormControlLabelProps): React.JSX.Element;
