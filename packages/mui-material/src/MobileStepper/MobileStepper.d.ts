import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { PaperProps } from '../Paper';
import { LinearProgressProps } from '../LinearProgress';
import { MobileStepperClasses } from './mobileStepperClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface MobileStepperSlots {
  /**
   * The component that renders the root slot.
   * @default Paper
   */
  root: React.ElementType;
  /**
   * The component that renders the progress slot.
   * @default LinearProgress
   */
  progress: React.ElementType;
  /**
   * The component that renders the dots slot.
   * @default 'div'
   */
  dots: React.ElementType;
  /**
   * The component that renders the dot slot.
   * @default 'div'
   */
  dot: React.ElementType;
}

export interface MobileStepperRootSlotPropsOverrides {}
export interface MobileStepperProgressSlotPropsOverrides {}
export interface MobileStepperDotsSlotPropsOverrides {}
export interface MobileStepperDotSlotPropsOverrides {}

export type MobileStepperSlotsAndSlotProps = CreateSlotsAndSlotProps<
  MobileStepperSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the [Paper](https://mui.com/material-ui/api/paper/#props) component.
     */
    root: SlotProps<
      React.ElementType<PaperProps>,
      MobileStepperRootSlotPropsOverrides,
      MobileStepperOwnerState
    >;
    /**
     * Props forwarded to the progress slot.
     * By default, the available props are based on the [LinearProgress](https://mui.com/material-ui/api/linear-progress/#props) component.
     */
    progress: SlotProps<
      React.ElementType<LinearProgressProps>,
      MobileStepperProgressSlotPropsOverrides,
      MobileStepperOwnerState
    >;
    /**
     * Props forwarded to the dots slot.
     * By default, the available props are based on the div element.
     */
    dots: SlotProps<'div', MobileStepperDotsSlotPropsOverrides, MobileStepperOwnerState>;
    /**
     * Props forwarded to the dot slot.
     * By default, the available props are based on the div element.
     */
    dot: SlotProps<'div', MobileStepperDotSlotPropsOverrides, MobileStepperOwnerState>;
  }
>;

export interface MobileStepperProps
  extends StandardProps<PaperProps, 'children' | 'variant'>, MobileStepperSlotsAndSlotProps {
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   * @default 0
   */
  activeStep?: number | undefined;
  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MobileStepperClasses> | undefined;
  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: React.ReactNode;
  /**
   * Set the positioning type.
   * @default 'bottom'
   */
  position?: 'bottom' | 'top' | 'static' | undefined;
  /**
   * The total steps.
   */
  steps: number;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The variant to use.
   * @default 'dots'
   */
  variant?: 'text' | 'dots' | 'progress' | undefined;
}

export interface MobileStepperOwnerState extends Omit<MobileStepperProps, 'slots' | 'slotProps'> {}

/**
 *
 * Demos:
 *
 * - [Stepper](https://next.mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [MobileStepper API](https://next.mui.com/material-ui/api/mobile-stepper/)
 * - inherits [Paper API](https://next.mui.com/material-ui/api/paper/)
 */
export default function MobileStepper(props: MobileStepperProps): React.JSX.Element;
