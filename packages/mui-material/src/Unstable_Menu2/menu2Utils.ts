import * as React from 'react';
import clsx from 'clsx';
import appendOwnerState from '@mui/utils/appendOwnerState';
import isHostComponent from '@mui/utils/isHostComponent';

// One log per component for each warning, so a bad trigger does not spam the
// console on every render.
const warnedFragmentTrigger = new Set<string>();
const warnedTriggerRef = new Set<string>();

export function resetMenu2WarningFlags() {
  warnedFragmentTrigger.clear();
  warnedTriggerRef.clear();
}

export function warnMenu2FragmentTrigger(
  trigger: unknown,
  componentName: string,
  triggerExample: string,
  propName = 'trigger',
) {
  // A fragment is an element, so the type does not catch it. Base UI cannot
  // merge the trigger behavior into a fragment, and the trigger renders as
  // bare content instead.
  if (
    !React.isValidElement(trigger) ||
    trigger.type !== React.Fragment ||
    warnedFragmentTrigger.has(componentName)
  ) {
    return;
  }

  warnedFragmentTrigger.add(componentName);
  console.error(
    `MUI: The \`${propName}\` prop of \`${componentName}\` cannot be a fragment. ` +
      `Pass a single element, for example a \`${triggerExample}\`.`,
  );
}

export function warnMenu2TriggerRef(trigger: unknown, componentName: string, propName = 'trigger') {
  // A wrapper that does not forward the ref also swallows the trigger behavior,
  // and nothing else reports it.
  if (
    trigger == null ||
    (React.isValidElement(trigger) && trigger.type === React.Fragment) ||
    warnedTriggerRef.has(componentName)
  ) {
    return;
  }

  warnedTriggerRef.add(componentName);
  console.error(
    `MUI: The element rendered by the \`${propName}\` prop of \`${componentName}\` did not receive a ref. ` +
      'A component used as the trigger must forward its props and its ref to ' +
      'the element that it renders, the way Tooltip does. Without them the ' +
      'menu behavior does not reach the element.',
  );
}

export type StateClassName<State> = string | ((state: State) => string | undefined) | undefined;

export function resolveStateClassName<State>(
  className: StateClassName<State>,
  state: State,
): string | undefined {
  return typeof className === 'function' ? className(state) : className;
}

export function mergeStateClassName<State>(
  className: StateClassName<State>,
  getClassName: (state: State) => string | undefined,
) {
  return (state: State) => clsx(getClassName(state), resolveStateClassName(className, state));
}

export type SlotProps<SlotPropsValue, OwnerState> =
  SlotPropsValue | ((ownerState: OwnerState) => SlotPropsValue) | undefined;

export interface Menu2RootSlots {
  root?: React.ElementType | undefined;
}

export interface Menu2RootSlotProps<OwnerState> {
  root?: SlotProps<Record<string, any>, OwnerState>;
}

export function getMenu2RootRender<OwnerState>(
  RootSlot: React.ElementType,
  ownerState: OwnerState,
  props?: Record<string, any>,
  defaultRootSlot?: React.ElementType,
) {
  const rootProps = { ...(props ?? {}) };

  // These props are internal to `ButtonBase`. Only the default root reaches it,
  // so a custom slot would spread them onto the DOM and React would warn.
  if (defaultRootSlot != null && RootSlot !== defaultRootSlot) {
    delete rootProps.disableRipple;
    delete rootProps.nativeButton;
  }

  if (isHostComponent(RootSlot)) {
    delete rootProps.as;
    delete rootProps.component;
    delete rootProps.ownerState;
    delete rootProps.sx;

    return React.createElement(RootSlot, rootProps);
  }

  return React.createElement(RootSlot, appendOwnerState(RootSlot, rootProps, ownerState));
}
