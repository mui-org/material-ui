import chai, { AssertionError } from 'chai';
import * as DomTestingLibrary from '@testing-library/dom';
import type { ElementHandle } from 'playwright';

// https://stackoverflow.com/a/46755166/3406963
declare global {
  namespace Chai {
    interface Assertion {
      /**
       * Checks if the element handle is actually focused i.e. the element handle is pointing to `document.activeElement`.
       */
      toHaveFocus(): Promise<void>;
    }
  }

  interface Window {
    DomTestingLibrary: typeof DomTestingLibrary;
    /**
     * @example $element.evaluate(element => window.pageElementToString(element))
     */
    elementToString(element: Node | null | undefined): string | false;
  }
}

chai.use((chaiAPI, utils) => {
  // better diff view for expect(element).to.equal(document.activeElement)
  chai.Assertion.addMethod('toHaveFocus', async function elementHandleIsFocused() {
    const $elementOrHandle: ElementHandle | Promise<ElementHandle> = utils.flag(this, 'object');
    if ($elementOrHandle == null) {
      throw new AssertionError(`Expected an element handle but got ${String($elementOrHandle)}.`);
    }
    const $element =
      typeof ($elementOrHandle as Promise<any>).then === 'function'
        ? await ($elementOrHandle as Promise<ElementHandle>)
        : ($elementOrHandle as ElementHandle);

    const { isFocused, stringifiedActiveElement, stringifiedElement } = await $element.evaluate(
      (element) => {
        const activeElement = element.ownerDocument?.activeElement;
        return {
          isFocused: activeElement === element,
          stringifiedElement: window.elementToString(element),
          stringifiedActiveElement: window.elementToString(activeElement),
        };
      },
    );

    this.assert(
      isFocused,
      `expected element to have focus`,
      `expected element to NOT have focus \n${stringifiedElement}`,
      stringifiedElement,
      stringifiedActiveElement,
    );
  });
});
