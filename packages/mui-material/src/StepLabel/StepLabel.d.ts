import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { StepIconProps } from '../StepIcon';
import { StepLabelClasses } from './stepLabelClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface StepLabelRootSlotPropsOverrides {}
export interface StepLabelLabelSlotPropsOverrides {}
export interface StepLabelStepIconSlotPropsOverrides {}

export interface StepLabelSlots {
  /**
   * The component that renders the root.
   * @default span
   */
  root: React.ElementType;
  /**
   * The component that renders the label.
   * @default span
   */
  label: React.ElementType;
  /**
   * The component to render in place of the [`StepIcon`](https://mui.com/material-ui/api/step-icon/).
   */
  stepIcon: React.ElementType;
}

export type StepLabelSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StepLabelSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the span element.
     */
    root: SlotProps<'span', StepLabelRootSlotPropsOverrides, StepLabelOwnerState>;
    /**
     * Props forwarded to the label slot.
     * By default, the available props are based on the span element.
     */
    label: SlotProps<'span', StepLabelLabelSlotPropsOverrides, StepLabelOwnerState>;
    /**
     * Props forwarded to the stepIcon slot.
     * By default, the available props are based on the div element.
     */
    stepIcon: SlotProps<
      React.ElementType<StepIconProps>,
      StepLabelStepIconSlotPropsOverrides,
      StepLabelOwnerState
    >;
  }
>;

export interface StepLabelOwnerState extends StepLabelProps {}

export interface StepLabelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>>, StepLabelSlotsAndSlotProps {
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepLabelClasses> | undefined;
  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error?: boolean | undefined;
  /**
   * Override the default label of the step icon.
   */
  icon?: React.ReactNode;
  /**
   * The optional node to display.
   */
  optional?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export type StepLabelClasskey = keyof NonNullable<StepLabelProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://next.mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepLabel API](https://next.mui.com/material-ui/api/step-label/)
 */
declare const StepLabel: ((props: StepLabelProps) => React.JSX.Element) & {
  muiName: string;
};

export default StepLabel;
