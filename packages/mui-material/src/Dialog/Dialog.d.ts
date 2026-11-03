import * as React from 'react';
import { SxProps, Breakpoint } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { BackdropProps } from '../Backdrop';
import { PaperProps } from '../Paper';
import { ModalProps } from '../Modal';
import { TransitionProps } from '../transitions/types';
import { DialogClasses } from './dialogClasses';
import { CreateSlotsAndSlotProps, SlotComponentProps, SlotProps } from '../utils/types';

export interface DialogSlots {
  /**
   * The component that renders the transition.
   * [Follow this guide](/material-ui/transitions/#transition-slots) to learn more about the requirements for this component.
   * @default Collapse
   */
  transition?: React.ElementType | undefined;
  /**
   * The component that renders the paper.
   * @default Paper
   */
  paper?: React.ElementType | undefined;
  /**
   * The component that renders the container.
   */
  container?: React.ElementType | undefined;
  /**
   * The component that renders the backdrop.
   */
  backdrop?: React.ElementType | undefined;
  /**
   * The component that renders the root.
   */
  root?: React.ElementType | undefined;
}

export interface DialogTransitionSlotPropsOverrides {}
export interface DialogPaperSlotPropsOverrides {}
export interface DialogContainerSlotPropsOverrides {}
export interface DialogBackdropSlotPropsOverrides {}
export interface DialogRootSlotPropsOverrides {}

export type DialogSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DialogSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the [Modal](https://mui.com/material-ui/api/modal/#props) component.
     */
    root: SlotProps<React.ElementType<ModalProps>, DialogRootSlotPropsOverrides, DialogOwnerState>;
    /**
     * Props forwarded to the backdrop slot.
     * By default, the available props are based on the [Backdrop](https://mui.com/material-ui/api/backdrop/#props) component.
     */
    backdrop: SlotProps<
      React.ElementType<BackdropProps>,
      DialogBackdropSlotPropsOverrides,
      DialogOwnerState
    >;
    /**
     * Props forwarded to the container slot.
     * By default, the available props are based on a div element.
     */
    container: SlotProps<'div', DialogContainerSlotPropsOverrides, DialogOwnerState>;
    /**
     * Props forwarded to the transition slot.
     * By default, the available props are based on the [Fade](https://mui.com/material-ui/api/fade/#props) component.
     */
    transition: SlotComponentProps<
      React.ElementType<TransitionProps>,
      TransitionProps & DialogTransitionSlotPropsOverrides,
      DialogOwnerState
    >;
    /**
     * Props forwarded to the paper slot.
     * By default, the available props are based on the [Paper](https://mui.com/material-ui/api/paper/#props) component.
     */
    paper: SlotProps<
      React.ElementType<PaperProps>,
      DialogPaperSlotPropsOverrides,
      DialogOwnerState
    >;
  }
>;

export interface DialogProps
  extends StandardProps<ModalProps, 'children' | 'slots' | 'slotProps'>, DialogSlotsAndSlotProps {
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby'?: string | undefined;
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby'?: string | undefined;
  /**
   * Informs assistive technologies that the element is modal.
   * It's added on the element with role="dialog".
   * @default true
   */
  'aria-modal'?: boolean | 'true' | 'false' | undefined;
  /**
   * Dialog children, usually the included sub-components.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogClasses> | undefined;
  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen?: boolean | undefined;
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth?: boolean | undefined;
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth?: Breakpoint | false | undefined;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: ModalProps['onClose'] | undefined;
  /**
   * If `true`, the component is shown.
   */
  open: ModalProps['open'];
  /**
   * The ARIA role for the dialog element.
   * The main dialog role is `dialog`, but `alertdialog` can be used if the content of the dialog requires immediate attention.
   * See https://www.w3.org/TR/wai-aria-1.2/#dialog and https://www.w3.org/TR/wai-aria-1.2/#alertdialog for more details.
   * @default 'dialog'
   */
  role?: 'dialog' | 'alertdialog' | undefined;
  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent?: React.JSXElementConstructor<PaperProps> | undefined;
  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll?: 'body' | 'paper' | undefined;
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
}

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 *
 * Demos:
 *
 * - [Dialog](https://next.mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [Dialog API](https://next.mui.com/material-ui/api/dialog/)
 * - inherits [Modal API](https://next.mui.com/material-ui/api/modal/)
 */
export default function Dialog(props: DialogProps): React.JSX.Element;

export interface DialogOwnerState extends Omit<DialogProps, 'slots' | 'slotProps'> {}
