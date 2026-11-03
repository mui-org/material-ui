'use client';
import * as React from 'react';
import { useRovingTabIndexContext, useRovingTabIndexItem } from '../utils/useRovingTabIndex';

interface RovingToggleButtonChildProps {
  ref?: React.Ref<HTMLElement> | undefined;
  tabIndex?: number | undefined;
}

interface RovingToggleButtonProps {
  children: React.ReactElement<RovingToggleButtonChildProps>;
  disabled?: boolean | undefined;
  selected?: boolean | undefined;
  value: unknown;
}

function RovingToggleButton(props: RovingToggleButtonProps, ref: React.ForwardedRef<HTMLElement>) {
  const { children, disabled = false, selected = false, value } = props;
  const rovingContext = useRovingTabIndexContext();
  const rovingItemProps = useRovingTabIndexItem({
    id: value,
    ref,
    disabled,
    selected,
  });

  // On the server, and on the first client render before registration effects run,
  // the roving item map is still empty. In that window, fall back to `tabIndex={0}`
  // for the selected toggle button so the rendered markup is immediately keyboard-accessible
  // and hydration stays consistent until item registration takes over.
  const shouldUseSelectedTabStopFallback = rovingContext.getItemMap().size === 0 && selected;
  const tabIndex = shouldUseSelectedTabStopFallback ? 0 : rovingItemProps.tabIndex;

  return React.cloneElement(React.Children.only(children), {
    ...rovingItemProps,
    tabIndex: children.props.tabIndex ?? tabIndex,
  });
}

export default React.forwardRef(RovingToggleButton);
