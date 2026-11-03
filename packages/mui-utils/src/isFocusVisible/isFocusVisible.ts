/**
 * Returns a boolean indicating if the event's target has :focus-visible
 */
export default function isFocusVisible(element: Element): boolean {
  try {
    return element.matches(':focus-visible');
  } catch (error) {
    // Do not warn on jsdom tests, otherwise all tests that rely on focus have to be skipped
    // Tests that rely on `:focus-visible` will still have to be skipped in jsdom
    if (process.env.NODE_ENV !== 'production' && !window.navigator.userAgent.includes('jsdom')) {
      console.warn(
        [
          'MUI: The `:focus-visible` pseudo class is not supported in this browser.',
          'Some components rely on this feature to work properly.',
        ].join('\n'),
      );
    }
  }

  return false;
}
