import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { FabProps } from '../Fab';
import { TransitionProps } from '../transitions';
import { SpeedDialClasses } from './speedDialClasses';
import { CreateSlotsAndSlotProps, SlotComponentProps, SlotProps } from '../utils/types';

export type CloseReason = 'toggle' | 'blur' | 'mouseLeave' | 'escapeKeyDown';
export type OpenReason = 'toggle' | 'focus' | 'mouseEnter';

export interface SpeedDialSlots {
  /**
   * The component that renders the root slot.
   * @default 'div'
   */
  root: React.ElementType;
  /**
   * The component that renders the fab.
   * @default Fab
   */
  fab: React.ElementType;
  /**
   * The component that renders the transition.
   * [Follow this guide](/material-ui/transitions/#transition-slots) to learn more about the requirements for this component.
   * @default Zoom
   */
  transition: React.ElementType;
}

export interface SpeedDialFabSlotPropsOverrides {}

export type SpeedDialSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SpeedDialSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on div element.
     */
    root: SlotComponentProps<'div', React.HTMLAttributes<HTMLDivElement>, SpeedDialOwnerState>;
    /**
     * Props forwarded to the fab slot.
     * By default, the available props are based on the [Fab](https://mui.com/material-ui/api/fab/#props) component.
     */
    fab: SlotProps<
      React.ElementType<FabProps>,
      SpeedDialFabSlotPropsOverrides,
      SpeedDialOwnerState
    >;
    /**
     * Props forwarded to the transition slot.
     * By default, the available props are based on the [Zoom](https://mui.com/material-ui/api/zoom/#props) component.
     */
    transition: SlotComponentProps<
      React.ElementType<TransitionProps>,
      TransitionProps,
      SpeedDialOwnerState
    >;
  }
>;

export interface SpeedDialProps
  extends
    StandardProps<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    SpeedDialSlotsAndSlotProps {
  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SpeedDialClasses> | undefined;
  /**
   * The aria-label of the button element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: string;
  /**
   * The direction the actions open relative to the floating action button.
   * @default 'up'
   */
  direction?: 'up' | 'down' | 'left' | 'right' | undefined;
  /**
   * If `true`, the SpeedDial is hidden.
   * @default false
   */
  hidden?: boolean | undefined;
  /**
   * Props applied to the [`Fab`](https://mui.com/material-ui/api/fab/) element.
   * @default {}
   * @deprecated Use `slotProps.fab` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  FabProps?: Partial<FabProps> | undefined;
  /**
   * The icon to display in the SpeedDial Fab. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon?: React.ReactNode;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"blur"`, `"mouseLeave"`, `"escapeKeyDown"`.
   */
  onClose?: ((event: React.SyntheticEvent<{}>, reason: CloseReason) => void) | undefined;
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"focus"`, `"mouseEnter"`.
   */
  onOpen?: ((event: React.SyntheticEvent<{}>, reason: OpenReason) => void) | undefined;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean | undefined;
  /**
   * The icon to display in the SpeedDial Fab when the SpeedDial is open.
   */
  openIcon?: React.ReactNode;
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

export interface SpeedDialOwnerState extends SpeedDialProps {}

/**
 *
 * Demos:
 *
 * - [Speed Dial](https://next.mui.com/material-ui/react-speed-dial/)
 *
 * API:
 *
 * - [SpeedDial API](https://next.mui.com/material-ui/api/speed-dial/)
 */
export default function SpeedDial(props: SpeedDialProps): React.JSX.Element;
