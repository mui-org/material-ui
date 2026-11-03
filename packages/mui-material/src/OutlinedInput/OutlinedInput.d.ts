import * as React from 'react';
import { SxProps } from '@mui/system';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { InputBaseProps } from '../InputBase';
import { OutlinedInputClasses } from './outlinedInputClasses';

export interface OutlinedInputNotchedOutlineSlotPropsOverrides {}

interface OutlinedInputSlots {
  /**
   * The component that renders the notchedOutline slot.
   * @default NotchedOutline
   */
  notchedOutline: React.ElementType;
}

type OutlinedInputSlotsAndSlotProps = CreateSlotsAndSlotProps<
  OutlinedInputSlots,
  {
    notchedOutline: SlotProps<
      'fieldset',
      OutlinedInputNotchedOutlineSlotPropsOverrides,
      OutlinedInputOwnerState
    >;
  }
> & {
  slots?: InputBaseProps['slots'] | undefined;
  slotProps?: InputBaseProps['slotProps'] | undefined;
};

export interface OutlinedInputProps
  extends StandardProps<InputBaseProps, 'slots' | 'slotProps'>, OutlinedInputSlotsAndSlotProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<OutlinedInputClasses> | undefined;
  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`.
   */
  label?: React.ReactNode;
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface OutlinedInputOwnerState extends Omit<OutlinedInputProps, 'slots' | 'slotProps'> {}

/**
 *
 * Demos:
 *
 * - [Number Field](https://next.mui.com/material-ui/react-number-field/)
 * - [Text Field](https://next.mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [OutlinedInput API](https://next.mui.com/material-ui/api/outlined-input/)
 * - inherits [InputBase API](https://next.mui.com/material-ui/api/input-base/)
 */
declare const OutlinedInput: ((props: OutlinedInputProps) => React.JSX.Element) & {
  muiName: string;
};

export default OutlinedInput;
