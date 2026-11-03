import * as React from 'react';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { DrawerProps, DrawerOwnerState, DrawerSlotsAndSlotProps } from '../Drawer';

export interface SwipeableDrawerSwipeAreaSlotPropsOverrides {}

export interface SwipeableDrawerSlots {
  /**
   * The component used for the swipeArea slot.
   * @default div
   */
  swipeArea?: React.ElementType | undefined;
}

type SwipeableDrawerSlotsAndSlotProps = DrawerSlotsAndSlotProps &
  CreateSlotsAndSlotProps<
    SwipeableDrawerSlots,
    {
      /**
       * Props forwarded to the docked slot.
       * By default, the available props are based on a div element.
       */
      swipeArea: SlotProps<'div', SwipeableDrawerSwipeAreaSlotPropsOverrides, DrawerOwnerState>;
    }
  >;

export interface SwipeableDrawerProps
  extends
    Omit<DrawerProps, 'onClose' | 'open' | 'slots' | 'slotProps'>,
    SwipeableDrawerSlotsAndSlotProps {
  /**
   * If set to true, the swipe event will open the drawer even if the user begins the swipe on one of the drawer's children.
   * This can be useful in scenarios where the drawer is partially visible.
   * You can customize it further with a callback that determines which children the user can drag over to open the drawer
   * (for example, to ignore other elements that handle touch move events, like sliders).
   *
   * @param {TouchEvent} event The 'touchstart' event
   * @param {HTMLDivElement} swipeArea The swipe area element
   * @param {HTMLDivElement} paper The drawer's paper element
   *
   * @default false
   */
  allowSwipeInChildren?:
    | boolean
    | ((event: TouchEvent, swipeArea: HTMLDivElement, paper: HTMLDivElement) => boolean)
    | undefined;
  /**
   * Disable the backdrop transition.
   * This can improve the FPS on low-end devices.
   * @default false
   */
  disableBackdropTransition?: boolean | undefined;
  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   * @default false
   */
  disableDiscovery?: boolean | undefined;
  /**
   * If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers
   * navigation actions. Swipe to open is disabled on iOS browsers by default.
   * @default typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
   */
  disableSwipeToOpen?: boolean | undefined;
  /**
   * Affects how far the drawer must be opened/closed to change its state.
   * Specified as percent (0-1) of the width of the drawer
   * @default 0.52
   */
  hysteresis?: number | undefined;
  /**
   * Defines, from which (average) velocity on, the swipe is
   * defined as complete although hysteresis isn't reached.
   * Good threshold is between 250 - 1000 px/s
   * @default 450
   */
  minFlingVelocity?: number | undefined;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent<{}> | Event} event The event source of the callback.
   */
  onClose: { bivarianceHack(event: React.SyntheticEvent<{}> | Event): void }['bivarianceHack'];
  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {React.SyntheticEvent<{}> | Event} event The event source of the callback.
   */
  onOpen: { bivarianceHack(event: React.SyntheticEvent<{}> | Event): void }['bivarianceHack'];
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open?: boolean | undefined;
  /**
   * The width of the left most (or right most) area in `px` that
   * the drawer can be swiped open from.
   * @default 20
   */
  swipeAreaWidth?: number | undefined;
}

/**
 *
 * Demos:
 *
 * - [Drawer](https://next.mui.com/material-ui/react-drawer/)
 *
 * API:
 *
 * - [SwipeableDrawer API](https://next.mui.com/material-ui/api/swipeable-drawer/)
 * - inherits [Drawer API](https://next.mui.com/material-ui/api/drawer/)
 */
declare const SwipeableDrawer: React.JSXElementConstructor<SwipeableDrawerProps>;

export default SwipeableDrawer;
