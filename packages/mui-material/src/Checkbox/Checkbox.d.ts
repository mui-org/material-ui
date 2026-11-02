import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { SwitchBaseProps } from '../internal/SwitchBase';
import { CheckboxClasses } from './checkboxClasses';

export interface CheckboxPropsSizeOverrides {}

export interface CheckboxPropsColorOverrides {}

export interface CheckboxRootSlotPropsOverrides {}

export interface CheckboxInputSlotPropsOverrides {}

export interface CheckboxSlots {
  /**
   * The component that renders the root slot.
   * @default SwitchBase
   */
  root: React.ElementType;
  /**
   * The component that renders the input slot.
   * @default SwitchBase's input
   */
  input: React.ElementType;
}

export type CheckboxSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CheckboxSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the div element.
     */
    root: SlotProps<
      React.ElementType<SwitchBaseProps>,
      CheckboxRootSlotPropsOverrides,
      CheckboxOwnerState
    >;
    /**
     * Props forwarded to the input slot.
     * By default, the available props are based on the input element.
     */
    input: SlotProps<'input', CheckboxInputSlotPropsOverrides, CheckboxOwnerState>;
  }
>;

export interface CheckboxProps
  extends
    StandardProps<
      SwitchBaseProps,
      'checkedIcon' | 'color' | 'icon' | 'type' | 'slots' | 'slotProps'
    >,
    CheckboxSlotsAndSlotProps {
  /**
   * If `true`, the component is checked.
   */
  checked?: SwitchBaseProps['checked'] | undefined;
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CheckboxClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default',
        CheckboxPropsColorOverrides
      >
    | undefined;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: SwitchBaseProps['disabled'] | undefined;
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: SwitchBaseProps['disableRipple'] | undefined;
  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon?: React.ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: SwitchBaseProps['id'] | undefined;
  /**
   * If `true`, the component appears indeterminate.
   * This sets the native input element to indeterminate,
   * and we also set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate?: boolean | undefined;
  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon?: React.ReactNode;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: SwitchBaseProps['onChange'] | undefined;
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required?: SwitchBaseProps['required'] | undefined;
  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size?:
    OverridableStringUnion<'small' | 'medium' | 'large', CheckboxPropsSizeOverrides> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: SwitchBaseProps['value'] | undefined;
}

export interface CheckboxOwnerState extends Omit<CheckboxProps, 'slots' | 'slotProps'> {}

/**
 *
 * Demos:
 *
 * - [Checkbox](https://next.mui.com/material-ui/react-checkbox/)
 * - [Transfer List](https://next.mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [Checkbox API](https://next.mui.com/material-ui/api/checkbox/)
 * - inherits [ButtonBase API](https://next.mui.com/material-ui/api/button-base/)
 */
export default function Checkbox(props: CheckboxProps): React.JSX.Element;
