'use client';
import * as React from 'react';

export interface UseFocusableWhenDisabledParameters {
  /**
   * Whether the component should be focusable when disabled.
   * When `undefined`, composite items are focusable when disabled by default.
   */
  focusableWhenDisabled?: boolean | undefined;
  /**
   * The disabled state of the component.
   */
  disabled: boolean;
  /**
   * Whether this is a composite item or not.
   * @default false
   */
  composite?: boolean | undefined;
  /**
   * @default 0
   */
  tabIndex?: number | undefined;
  isNativeButton: boolean;
}

interface FocusableWhenDisabledProps {
  'aria-disabled'?: boolean | undefined;
  disabled?: boolean | undefined;
  onKeyDown: (event: React.KeyboardEvent) => void;
  tabIndex?: number | undefined;
}

export default function useFocusableWhenDisabled(
  parameters: UseFocusableWhenDisabledParameters,
): FocusableWhenDisabledProps {
  const {
    focusableWhenDisabled,
    disabled,
    composite = false,
    tabIndex: tabIndexProp = 0,
    isNativeButton,
  } = parameters;

  const isFocusableComposite = composite && focusableWhenDisabled !== false;
  const isNonFocusableComposite = composite && focusableWhenDisabled === false;

  // we can't explicitly assign `undefined` to any of these props because it
  // would otherwise prevent subsequently merged props from setting them
  const props = React.useMemo(() => {
    const additionalProps: FocusableWhenDisabledProps = {
      // allow Tabbing away from focusableWhenDisabled elements
      onKeyDown(event: React.KeyboardEvent) {
        if (disabled && focusableWhenDisabled && event.key !== 'Tab') {
          event.preventDefault();
        }
      },
    };

    if (!composite) {
      additionalProps.tabIndex = tabIndexProp;

      if (!isNativeButton && disabled) {
        additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
      }
    }

    if (
      (isNativeButton && (focusableWhenDisabled || isFocusableComposite)) ||
      (!isNativeButton && disabled)
    ) {
      additionalProps['aria-disabled'] = disabled;
    }

    if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
      additionalProps.disabled = disabled;
    }

    return additionalProps;
  }, [
    composite,
    disabled,
    focusableWhenDisabled,
    isFocusableComposite,
    isNonFocusableComposite,
    isNativeButton,
    tabIndexProp,
  ]);

  return props;
}
