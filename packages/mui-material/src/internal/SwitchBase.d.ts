import * as React from 'react';
import { InternalStandardProps as StandardProps } from '.';
import { ButtonBaseProps } from '../ButtonBase';
import { SwitchBaseClasses } from './switchBaseClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

interface SwitchBaseSlots {
  /**
   * The component that renders the root slot.
   * @default ButtonBase
   */
  root: React.ElementType;
  /**
   * The component that renders the input slot.
   * @default 'input'
   */
  input: React.ElementType;
}

type SwitchBaseSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SwitchBaseSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the [ButtonBase](https://mui.com/material-ui/api/button-base/#props) component.
     */
    root: SlotProps<
      React.ElementType<Omit<ButtonBaseProps, 'nativeButton'>>,
      {},
      SwitchBaseOwnerState
    >;
    /**
     * Props forwarded to the input slot.
     */
    input: SlotProps<'input', {}, SwitchBaseOwnerState>;
  }
>;

export interface SwitchBaseProps
  extends
    StandardProps<ButtonBaseProps, 'nativeButton' | 'children' | 'onChange' | 'type' | 'value'>,
    SwitchBaseSlotsAndSlotProps {
  autoFocus?: boolean | undefined;
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean | undefined;
  checkedIcon: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SwitchBaseClasses> | undefined;
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean | undefined;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean | undefined;
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean | undefined;
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge?: 'start' | 'end' | false | undefined;
  icon: React.ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: string | undefined;
  /**
   * Name attribute of the `input` element.
   */
  name?: string | undefined;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined;
  readOnly?: boolean | undefined;
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required?: boolean | undefined;
  tabIndex?: number | undefined;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'] | undefined;
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value?: unknown;
}

export interface SwitchBaseOwnerState extends Omit<SwitchBaseProps, 'slots' | 'slotProps'> {}

declare const SwitchBase: React.JSXElementConstructor<SwitchBaseProps>;

export default SwitchBase;
