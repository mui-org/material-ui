import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { SwitchBaseProps } from '../internal/SwitchBase';
import { SwitchClasses } from './switchClasses';

export interface SwitchPropsSizeOverrides {}

export interface SwitchPropsColorOverrides {}

export interface SwitchRootSlotPropsOverrides {}
export interface SwitchTrackSlotPropsOverrides {}
export interface SwitchThumbSlotPropsOverrides {}
export interface SwitchSwitchBaseSlotPropsOverrides {}
export interface SwitchInputSlotPropsOverrides {}

export interface SwitchSlots {
  /**
   * The component that renders the root slot.
   * @default 'span'
   */
  root: React.ElementType;
  /**
   * The component that renders the track slot.
   * @default 'span'
   */
  track: React.ElementType;
  /**
   * The component that renders the thumb slot.
   * @default 'span'
   */
  thumb: React.ElementType;
  /**
   * The component that renders the switchBase slot.
   * @default SwitchBase
   */
  switchBase: React.ElementType;
  /**
   * The component that renders the switchBase's input slot.
   * @default SwitchBaseInput
   */
  input: React.ElementType;
}

export type SwitchSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SwitchSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the span element.
     */
    root: SlotProps<'span', SwitchRootSlotPropsOverrides, SwitchOwnerState>;
    /**
     * Props forwarded to the track slot.
     * By default, the available props are based on the span element.
     */
    track: SlotProps<'span', SwitchTrackSlotPropsOverrides, SwitchOwnerState>;
    /**
     * Props forwarded to the thumb slot.
     * By default, the available props are based on the span element.
     */
    thumb: SlotProps<'span', SwitchThumbSlotPropsOverrides, SwitchOwnerState>;
    /**
     * Props forwarded to the switchBase slot.
     * By default, the available props are based on the internal SwitchBase component.
     */
    switchBase: SlotProps<
      React.ElementType<SwitchBaseProps>,
      SwitchSwitchBaseSlotPropsOverrides,
      SwitchOwnerState
    >;
    /**
     * Props forwarded to the input slot.
     * By default, the available props are based on the input element.
     */
    input: SlotProps<'input', SwitchInputSlotPropsOverrides, SwitchOwnerState>;
  }
>;

export interface SwitchOwnerState extends Omit<SwitchProps, 'slots' | 'slotProps'> {}

export interface SwitchProps
  extends
    StandardProps<SwitchBaseProps, 'checkedIcon' | 'color' | 'icon' | 'slots' | 'slotProps'>,
    SwitchSlotsAndSlotProps {
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SwitchClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default',
        SwitchPropsColorOverrides
      >
    | undefined;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean | undefined;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', SwitchPropsSizeOverrides> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: unknown;
}

/**
 *
 * Demos:
 *
 * - [Switch](https://next.mui.com/material-ui/react-switch/)
 * - [Transfer List](https://next.mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [Switch API](https://next.mui.com/material-ui/api/switch/)
 * - inherits [IconButton API](https://next.mui.com/material-ui/api/icon-button/)
 */
export default function Switch(props: SwitchProps): React.JSX.Element;
