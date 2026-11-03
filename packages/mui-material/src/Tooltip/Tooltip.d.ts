import * as React from 'react';
import { SxProps } from '@mui/system';
import { PopperProps } from '../Popper';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { TransitionProps } from '../transitions/types';
import { TooltipClasses } from './tooltipClasses';

export interface TooltipPopperSlotPropsOverrides {}

export interface TooltipTransitionSlotPropsOverrides {}

export interface TooltipTooltipSlotPropsOverrides {}

export interface TooltipArrowSlotPropsOverrides {}

export interface TooltipSlots {
  /**
   * The component used for the popper.
   * @default Popper
   */
  popper: React.ElementType;
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transition-slots) to learn more about the requirements for this component.
   * @default Grow
   */
  transition: React.ElementType;
  /**
   * The component used for the tooltip.
   */
  tooltip: React.ElementType;
  /**
   * The component used for the arrow.
   */
  arrow: React.ElementType;
}

export type TooltipSlotsAndSlotProps = CreateSlotsAndSlotProps<
  TooltipSlots,
  {
    /**
     * Props forwarded to the popper slot.
     * By default, the available props are based on the [Popper](https://mui.com/material-ui/api/popper/#props) component.
     */
    popper: SlotProps<
      React.ElementType<PopperProps>,
      TooltipPopperSlotPropsOverrides,
      TooltipOwnerState
    >;
    /**
     * Props forwarded to the transition slot.
     * By default, the available props are based on the [Grow](https://mui.com/material-ui/api/grow/#props) component.
     */
    transition: SlotProps<
      React.ElementType<TransitionProps>,
      TransitionProps & TooltipTransitionSlotPropsOverrides,
      TooltipOwnerState
    >;
    /**
     * Props forwarded to the tooltip slot.
     * By default, the available props are based on the div element.
     */
    tooltip: SlotProps<'div', TooltipTooltipSlotPropsOverrides, TooltipOwnerState>;
    /**
     * Props forwarded to the tooltip slot.
     * By default, the available props are based on the span element.
     */
    arrow: SlotProps<'span', TooltipArrowSlotPropsOverrides, TooltipOwnerState>;
  }
>;

export interface TooltipProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'title'>, TooltipSlotsAndSlotProps {
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow?: boolean | undefined;
  /**
   * Tooltip reference element.
   */
  children: React.ReactElement<unknown, any>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TooltipClasses> | undefined;
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild?: boolean | undefined;
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener?: boolean | undefined;
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener?: boolean | undefined;
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive?: boolean | undefined;
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener?: boolean | undefined;
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay?: number | undefined;
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay?: number | undefined;
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay?: number | undefined;
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor?: boolean | undefined;
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id?: string | undefined;
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay?: number | undefined;
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay?: number | undefined;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose?: ((event: React.SyntheticEvent | Event) => void) | undefined;
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen?: ((event: React.SyntheticEvent) => void) | undefined;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean | undefined;
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement?: PopperProps['placement'] | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: React.ReactNode;
}

export interface TooltipOwnerState extends TooltipProps {}

/**
 *
 * Demos:
 *
 * - [Tooltip](https://next.mui.com/material-ui/react-tooltip/)
 *
 * API:
 *
 * - [Tooltip API](https://next.mui.com/material-ui/api/tooltip/)
 */
export default function Tooltip(props: TooltipProps): React.JSX.Element;
