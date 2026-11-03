import { beforeAll, afterAll } from 'vitest';
import setupVitest from '@mui/internal-test-utils/setupVitest';

setupVitest({ emotion: true });

// In Firefox, calling focus() with arguments (e.g. focusOptions) fails silently,
// which causes focus-visible related tests to fail as a consequence.
// This override is only applied in a browser environment running Firefox.
if (typeof globalThis.navigator !== 'undefined' && !navigator.userAgent.includes('jsdom')) {
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

  if (isFirefox) {
    const originalFocus = HTMLElement.prototype.focus;

    beforeAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'focus', {
        configurable: true,
        value: function focusWithoutArguments() {
          originalFocus.call(this); // always call without arguments
        },
      });
    });

    afterAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'focus', {
        value: originalFocus,
      });
    });
  }
}
