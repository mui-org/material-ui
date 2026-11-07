'use client';
import * as React from 'react';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import type { SxProps } from '@mui/system';
import { mergeProps } from '@base-ui/react/merge-props';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import type { Theme } from '../styles';
import ListContext from '../List/ListContext';
import type { MuiKeyboardEvent } from '../ButtonBase/useButtonBase';
import mergeSlotProps from '../utils/mergeSlotProps';
import useSlot from '../utils/useSlot';
import type { Menu2RootSlotProps, Menu2RootSlots, StateClassName } from './menu2Utils';
import { getMenu2RootRender, mergeStateClassName } from './menu2Utils';

// The owner state from the props. Each part adds the live Base UI state.
export interface Menu2ItemBaseOwnerState {
  checked?: boolean | undefined;
  dense: boolean;
  disabled: boolean;
  divider: boolean;
  disableGutters: boolean;
}

export interface Menu2ItemVisualProps<
  Classes,
  Slots = Menu2RootSlots,
  SlotProps = Menu2RootSlotProps<Menu2ItemBaseOwnerState>,
> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Classes> | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Slots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: SlotProps | undefined;
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * @default false
   */
  dense?: boolean | undefined;
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters?: boolean | undefined;
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface Menu2ItemBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * Whether the component renders a native `<button>` element.
   * Inferred from a button element passed to `render`.
   * Set to `true` for a custom component or render function that returns a button.
   */
  nativeButton?: boolean | undefined;
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * Whether to close the menu when the item is clicked.
   * @default true
   */
  closeOnClick?: boolean | undefined;
}

export interface Menu2LinkItemBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The URL that the link item points to.
   */
  href?: string | undefined;
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * Whether to close the menu when the item is clicked.
   * @default false
   */
  closeOnClick?: boolean | undefined;
}

export interface Menu2SubmenuTriggerBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * Whether the component renders a native `<button>` element.
   * Inferred from a button element passed to `render`.
   * Set to `true` for a custom component or render function that returns a button.
   */
  nativeButton?: boolean | undefined;
  /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */
  label?: string | undefined;
  /**
   * How long to wait before the submenu may be opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay?: number | undefined;
  /**
   * How long to wait before closing the submenu that was opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay?: number | undefined;
  /**
   * Whether the submenu should also open when the trigger is hovered.
   * @default true
   */
  openOnHover?: boolean | undefined;
}

export interface Menu2BaseItemState {
  disabled?: boolean | undefined;
  highlighted?: boolean | undefined;
}

// Like the classic MenuItem: the item prop wins, then the `dense` of the list.
export function useMenu2ItemListContext(denseProp: boolean, disableGutters: boolean) {
  const context = React.useContext(ListContext);
  const dense = denseProp || context.dense || false;
  return React.useMemo(() => ({ dense, disableGutters }), [dense, disableGutters]);
}

// Base UI owns the Enter and Space activation of a menu item. The item root is
// a ButtonBase rendered as a div, so ButtonBase would emulate a second one.
// `defaultMuiPrevented` is the MUI convention that turns that emulation off.
function suppressButtonBaseKeyboardActivation(props?: {
  onKeyDown?: React.KeyboardEventHandler<HTMLElement> | undefined;
  onKeyUp?: React.KeyboardEventHandler<HTMLElement> | undefined;
}) {
  const externalOnKeyDown = props?.onKeyDown;
  const externalOnKeyUp = props?.onKeyUp;

  return {
    onKeyDown: (event: MuiKeyboardEvent) => {
      externalOnKeyDown?.(event);
      event.defaultMuiPrevented = true;
    },
    onKeyUp: (event: MuiKeyboardEvent) => {
      externalOnKeyUp?.(event);
      event.defaultMuiPrevented = true;
    },
  };
}

export interface Menu2ItemRootSlotProps<OwnerState extends object> {
  /**
   * The props that Base UI passes to the `render` function of the item.
   */
  baseProps: HTMLProps;
  /**
   * The owner state, merged with the live Base UI state.
   */
  ownerState: OwnerState;
  /**
   * The styled default root.
   */
  elementType: React.ElementType;
  /**
   * The element that the default root renders when `component` is not set.
   * @default 'div'
   */
  defaultComponent?: React.ElementType | undefined;
  component?: React.ElementType | undefined;
  disableRipple?: boolean | undefined;
  internalRender?:
    React.ReactElement | ComponentRenderFn<Omit<HTMLProps, 'color'>, OwnerState> | undefined;
  internalRenderState?: OwnerState | undefined;
  nativeButton?: boolean | undefined;
  slots?: Menu2RootSlots | undefined;
  slotProps?: Menu2RootSlotProps<OwnerState> | undefined;
  sx?: SxProps<Theme> | undefined;
  startIndicator?: React.ReactNode;
  endIndicator?: React.ReactNode;
}

// All item parts resolve their root here, from the live Base UI state, so slot
// callbacks and theme variants see the same state as the state classes.
export function Menu2ItemRootSlot<OwnerState extends object>(
  props: Menu2ItemRootSlotProps<OwnerState>,
) {
  const {
    baseProps,
    component,
    defaultComponent = 'div',
    disableRipple,
    elementType,
    endIndicator,
    internalRender,
    internalRenderState,
    nativeButton,
    ownerState,
    slotProps,
    slots,
    startIndicator,
    sx,
  } = props;
  const rootSlotProps: Record<string, any> | undefined = mergeSlotProps(
    resolveComponentProps(slotProps?.root, ownerState),
    { sx },
  );
  const [RootSlot, rootProps] = useSlot('root', {
    elementType,
    externalForwardedProps: { slots, slotProps: { root: rootSlotProps } },
    ownerState,
    className: undefined,
    ref: null,
    // Base UI lets an external handler cancel its internal handler.
    getSlotProps: (handlers): HTMLProps => mergeProps(baseProps, handlers),
    shouldForwardComponentProp: true,
  });

  return getMenu2RootRender(
    RootSlot,
    ownerState,
    {
      ...rootProps,
      ...(internalRender && { internalRender, internalRenderState }),
      // ButtonBase renders a <button> by default; the items keep their element.
      component: component ?? defaultComponent,
      // Pass it only when the caller sets it. An explicit prop beats the
      // `MuiButtonBase` default props, so ButtonBase resolves the default.
      ...(disableRipple !== undefined && { disableRipple }),
      // ButtonBase cannot infer it from a custom `component`.
      ...(nativeButton !== undefined && { nativeButton }),
      // Base UI owns the Enter and Space activation of the item.
      ...suppressButtonBaseKeyboardActivation(rootProps),
      children: (
        <React.Fragment>
          {startIndicator}
          {rootProps.children}
          {endIndicator}
        </React.Fragment>
      ),
    },
    elementType,
  );
}

export function getMenu2ItemOwnerState(
  props: Menu2ItemVisualProps<unknown> & {
    checked?: boolean | undefined;
    disabled?: boolean | undefined;
  },
): Menu2ItemBaseOwnerState {
  return {
    checked: props.checked,
    dense: props.dense ?? false,
    disabled: props.disabled ?? false,
    divider: props.divider ?? false,
    disableGutters: props.disableGutters ?? false,
  };
}

export function useMenu2ItemUtilityClasses<Classes extends object>(
  ownerState: Menu2ItemBaseOwnerState & {
    classes?: Partial<Classes> | undefined;
    checked?: boolean | undefined;
    open?: boolean | undefined;
  },
  getUtilityClass: (slot: string) => string,
) {
  const { dense, disabled, divider, disableGutters, checked, open, classes } = ownerState;
  const slots = {
    root: [
      'root',
      dense && 'dense',
      disabled && 'disabled',
      !disableGutters && 'gutters',
      divider && 'divider',
      checked && 'checked',
      open && 'open',
    ],
    highlighted: ['highlighted'],
    disabled: ['disabled'],
    checked: ['checked'],
    open: ['open'],
  };

  return {
    ...classes,
    ...composeClasses(slots, getUtilityClass, classes as Record<string, string> | undefined),
  } as Classes;
}

export function getMenu2ItemClassName<State extends Menu2BaseItemState>(
  classes: Partial<Record<'root' | 'highlighted' | 'disabled', string>>,
  ownerState: Menu2ItemBaseOwnerState,
  state: State,
) {
  return clsx(
    classes.root,
    state.highlighted && classes.highlighted,
    state.disabled && !ownerState.disabled && classes.disabled,
  );
}

export function mergeMenu2ItemClassName<State extends Menu2BaseItemState>(
  className: StateClassName<State>,
  classes: Partial<Record<'root' | 'highlighted' | 'disabled', string>>,
  ownerState: Menu2ItemBaseOwnerState,
) {
  return mergeStateClassName(className, (state) =>
    getMenu2ItemClassName(classes, ownerState, state),
  );
}
