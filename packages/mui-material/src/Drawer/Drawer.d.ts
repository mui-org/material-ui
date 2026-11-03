import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { ModalProps } from '../Modal';
import { BackdropProps } from '../Backdrop';
import { PaperProps } from '../Paper';
import { TransitionProps } from '../transitions/types';
import { DrawerClasses } from './drawerClasses';

export interface DrawerRootSlotPropsOverrides {}

export interface DrawerDockedSlotPropsOverrides {}

export interface DrawerPaperSlotPropsOverrides {}

export interface DrawerTransitionSlotPropsOverrides {}

export interface DrawerBackdropSlotPropsOverrides {}

export interface DrawerSlots {
  /**
   * The component used for the root when the variant is `temporary`.
   * @default Modal
   */
  root: React.ElementType;
  /**
   * The component used for the Modal backdrop.
   * @default Backdrop
   */
  backdrop: React.ElementType;
  /**
   * The component used for the root element when the variant is `permanent` or `persistent`.
   * @default div
   */
  docked: React.ElementType;
  /**
   * The component used for the paper.
   * @default Paper
   */
  paper: React.ElementType;
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transition-slots) to learn more about the requirements for this component.
   * @default Slide
   */
  transition: React.ElementType;
}

export type DrawerSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DrawerSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the [Modal](https://mui.com/material-ui/api/modal/#props) component.
     */
    root: SlotProps<React.ElementType<ModalProps>, DrawerRootSlotPropsOverrides, DrawerOwnerState>;
    /**
     * Props forwarded to the backdrop slot.
     * By default, the available props are based on the [Backdrop](https://mui.com/material-ui/api/backdrop/#props) component.
     */
    backdrop: SlotProps<
      React.ElementType<BackdropProps>,
      DrawerBackdropSlotPropsOverrides,
      DrawerOwnerState
    >;
    /**
     * Props forwarded to the docked slot.
     * By default, the available props are based on a div element.
     */
    docked: SlotProps<'div', DrawerDockedSlotPropsOverrides, DrawerOwnerState>;
    /**
     * Props forwarded to the paper slot.
     * By default, the available props are based on the [Paper](https://mui.com/material-ui/api/paper/#props) component.
     */
    paper: SlotProps<
      React.ElementType<PaperProps>,
      DrawerPaperSlotPropsOverrides,
      DrawerOwnerState
    >;
    /**
     * Props forwarded to the transition slot.
     * By default, the available props are based on the [Slide](https://mui.com/material-ui/api/slide/#props) component.
     */
    transition: SlotProps<
      React.ElementType<TransitionProps>,
      TransitionProps & DrawerTransitionSlotPropsOverrides,
      DrawerOwnerState
    >;
  }
>;

export interface DrawerProps
  extends
    StandardProps<ModalProps, 'open' | 'children' | 'slots' | 'slotProps'>,
    DrawerSlotsAndSlotProps {
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor?: 'left' | 'top' | 'right' | 'bottom' | undefined;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DrawerClasses> | undefined;
  /**
   * The elevation of the drawer.
   * @default 16
   */
  elevation?: number | undefined;
  /**
   * Props applied to the [`Modal`](https://mui.com/material-ui/api/modal/) element.
   * @default {}
   */
  ModalProps?: Partial<ModalProps> | undefined;
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: ModalProps['onClose'] | undefined;
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration?: TransitionProps['timeout'] | undefined;
  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant?: 'permanent' | 'persistent' | 'temporary' | undefined;
}

// omit `slots` and `slotProps` to prevent recursion
export interface DrawerOwnerState extends Omit<DrawerProps, 'slots' | 'slotProps'> {}

/**
 * The props of the [Modal](https://next.mui.com/material-ui/api/modal/) component are available
 * when `variant="temporary"` is set.
 *
 * Demos:
 *
 * - [Drawer](https://next.mui.com/material-ui/react-drawer/)
 *
 * API:
 *
 * - [Drawer API](https://next.mui.com/material-ui/api/drawer/)
 */
export default function Drawer(props: DrawerProps): React.JSX.Element;
