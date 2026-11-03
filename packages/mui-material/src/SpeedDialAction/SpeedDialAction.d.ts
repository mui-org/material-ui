import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { FabProps } from '../Fab';
import { TooltipProps } from '../Tooltip';
import { SpeedDialActionClasses } from './speedDialActionClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface SpeedDialActionSlots {
  /**
   * The component that renders the fab.
   * @default Fab
   */
  fab?: React.ElementType | undefined;
  /**
   * The component that renders the tooltip.
   * @default Tooltip
   */
  tooltip?: React.ElementType | undefined;
  /**
   * The component that renders the static tooltip.
   * @default 'span'
   */
  staticTooltip?: React.ElementType | undefined;
  /**
   * The component that renders the static tooltip label.
   * @default 'span'
   */
  staticTooltipLabel?: React.ElementType | undefined;
}

export interface SpeedDialActionFabSlotPropsOverrides {}
export interface SpeedDialActionTooltipSlotPropsOverrides {}
export interface SpeedDialActionStaticTooltipSlotPropsOverrides {}
export interface SpeedDialActionStaticTooltipLabelSlotPropsOverrides {}

export type SpeedDialActionSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SpeedDialActionSlots,
  {
    /**
     * Props forwarded to the fab slot.
     * By default, the available props are based on the [Fab](https://mui.com/material-ui/api/fab/#props) component.
     */
    fab: SlotProps<
      React.ElementType<FabProps>,
      SpeedDialActionFabSlotPropsOverrides,
      SpeedDialActionOwnerState
    >;
    /**
     * Props forwarded to the tooltip slot.
     * By default, the available props are based on the [Tooltip](https://mui.com/material-ui/api/tooltip/#props) component.
     */
    tooltip: SlotProps<
      React.ElementType<TooltipProps>,
      SpeedDialActionTooltipSlotPropsOverrides,
      SpeedDialActionOwnerState
    >;
    /**
     * Props forwarded to the static tooltip slot.
     * By default, the available props are based on a span element.
     */
    staticTooltip: SlotProps<
      'span',
      SpeedDialActionStaticTooltipSlotPropsOverrides,
      SpeedDialActionOwnerState
    >;
    /**
     * Props forwarded to the static tooltip label slot.
     * By default, the available props are based on a span element.
     */
    staticTooltipLabel: SlotProps<
      'span',
      SpeedDialActionStaticTooltipLabelSlotPropsOverrides,
      SpeedDialActionOwnerState
    >;
  }
>;

export interface SpeedDialActionProps
  extends
    StandardProps<Partial<TooltipProps>, 'children' | 'slots' | 'slotProps'>,
    SpeedDialActionSlotsAndSlotProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SpeedDialActionClasses> | undefined;
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   * @default 0
   */
  delay?: number | undefined;
  /**
   * The icon to display in the SpeedDial Fab.
   */
  icon?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Speed Dial](https://next.mui.com/material-ui/react-speed-dial/)
 *
 * API:
 *
 * - [SpeedDialAction API](https://next.mui.com/material-ui/api/speed-dial-action/)
 * - inherits [Tooltip API](https://next.mui.com/material-ui/api/tooltip/)
 */
export default function SpeedDialAction(props: SpeedDialActionProps): React.JSX.Element;

export interface SpeedDialActionOwnerState extends Omit<
  SpeedDialActionProps,
  'slots' | 'slotProps'
> {}
