'use client';

/**
 * If `focusSource` is present, attempt to pass `focusVisible` through `focus()` options.
 * Fall back to a plain focus call when the browser does not support it.
 */
export default function focusWithVisible(
  element: HTMLElement,
  focusSource?: 'keyboard' | 'mouse' | 'touch' | null,
) {
  if (focusSource == null) {
    element.focus();
    return;
  }

  try {
    element.focus({ focusVisible: focusSource === 'keyboard' });
  } catch (error) {
    element.focus();
  }
}
