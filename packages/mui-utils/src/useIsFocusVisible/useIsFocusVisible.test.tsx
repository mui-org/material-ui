import { describe, beforeAll, beforeEach, afterEach, it, expect } from 'vitest';
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import {
  act,
  createRenderer,
  focusVisible,
  simulatePointerDevice,
  programmaticFocusTriggersFocusVisible,
} from '@mui/internal-test-utils';
import useIsFocusVisible, { teardown as teardownFocusVisible } from './useIsFocusVisible';
import useForkRef from '../useForkRef';

type SimpleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React.ForwardedRef<HTMLButtonElement>;
};

const SimpleButton = React.forwardRef(function SimpleButton(
  props: SimpleButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  const handleRef = useForkRef(focusVisibleRef, ref);

  const [isFocusVisible, setIsFocusVisible] = React.useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setIsFocusVisible(false);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setIsFocusVisible(true);
    }
  };

  return (
    <button
      type="button"
      {...props}
      ref={handleRef}
      className={isFocusVisible ? 'focus-visible' : undefined}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
});

describe('useIsFocusVisible', () => {
  const { render } = createRenderer();

  beforeAll(() => {
    // isolate test from previous component test that use the polyfill in the document scope
    teardownFocusVisible(document);
  });

  const isHeadlessChrome = /HeadlessChrome/.test(window.navigator.userAgent);
  describe.skipIf(!isHeadlessChrome)('focus inside shadowRoot', () => {
    let rootElement: HTMLDivElement;
    let reactRoot: ReactDOMClient.Root;

    beforeEach(() => {
      rootElement = document.createElement('div');
      document.body.appendChild(rootElement);
      rootElement.attachShadow({ mode: 'open' });
      reactRoot = ReactDOMClient.createRoot(rootElement.shadowRoot!);
    });

    afterEach(() => {
      act(() => {
        reactRoot.unmount();
      });

      // @ts-expect-error TODO: investigate why TS is not happy with `shadowRoot` here
      teardownFocusVisible(rootElement.shadowRoot);
      document.body.removeChild(rootElement);
    });

    it('should set focus state for shadowRoot children', () => {
      const buttonRef = React.createRef<HTMLButtonElement>();
      render(
        <SimpleButton id="test-button" ref={buttonRef}>
          Hello
        </SimpleButton>,
        {},
        // @ts-expect-error TODO: investigate why this third argument is here
        {
          container: rootElement.shadowRoot,
        },
      );
      simulatePointerDevice();

      const { current: button } = buttonRef;
      if (button!.nodeName !== 'BUTTON') {
        throw new Error('missing button');
      }

      expect(button!.classList.contains('focus-visible')).to.equal(false);

      act(() => {
        button!.focus();
      });

      if (programmaticFocusTriggersFocusVisible()) {
        expect(button).to.have.class('focus-visible');
      } else {
        expect(button).not.to.have.class('focus-visible');
      }

      act(() => {
        button!.blur();
      });
      focusVisible(button!);

      expect(button!.classList.contains('focus-visible')).to.equal(true);
    });
  });
});
