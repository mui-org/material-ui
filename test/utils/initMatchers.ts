import chai, { AssertionError } from 'chai';
import chaiDom from 'chai-dom';
import _ from 'lodash';
import { isInaccessible } from '@testing-library/dom';
import { prettyDOM } from '@testing-library/react/pure';
import { computeAccessibleDescription, computeAccessibleName } from 'dom-accessibility-api';
import formatUtil from 'format-util';

chai.use(chaiDom);

const isKarma = Boolean(process.env.KARMA);

// https://stackoverflow.com/a/46755166/3406963
declare global {
  namespace Chai {
    interface Assertion {
      /**
       * Checks if the element in question is considered `aria-hidden`.
       * Does not replace accessibility check as that requires display/visibility/layout
       * @deprecated Use `inaccessible` + `visible` instead
       */
      toBeAriaHidden(): void;
      /**
       * Checks `expectedStyle` is a subset of the elements inline style i.e. `element.style`.
       * @example expect(element).toHaveInlineStyle({ width: '200px' })
       */
      toHaveInlineStyle(
        expectedStyle: Record<
          Exclude<
            keyof CSSStyleDeclaration,
            | 'getPropertyPriority'
            | 'getPropertyValue'
            | 'item'
            | 'removeProperty'
            | 'setProperty'
            | number
          >,
          string
        >,
      ): void;
      /**
       * Checks `expectedStyle` is a subset of the elements computed style i.e. `window.getComputedStyle(element)`.
       * @example expect(element).toHaveComputedStyle({ width: '200px' })
       */
      toHaveComputedStyle(
        expectedStyle: Record<
          Exclude<
            keyof CSSStyleDeclaration,
            | 'getPropertyPriority'
            | 'getPropertyValue'
            | 'item'
            | 'removeProperty'
            | 'setProperty'
            | number
          >,
          string
        >,
      ): void;
      /**
       * Check if an element's [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) is not `hidden` or `collapsed`.
       */
      toBeVisible(): void;
      /**
       * Checks if the element is inaccessible.
       *
       * Elements are considered inaccessible if they either:
       * - have [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) `hidden`
       * - have [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display) `none`
       * - have `aria-hidden` `true` or any of their parents
       *
       * @see [Excluding Elements from the Accessibility Tree](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion)
       */
      toBeInaccessible(): void;
      /**
       * Matcher with useful error messages if the dates don't match.
       */
      toEqualDateTime(expected: Date): void;
      /**
       * Checks if the accessible name computation (according to `accname` spec)
       * matches the expectation.
       *
       * @see https://www.w3.org/TR/accname-1.2/
       * @param name
       */
      toHaveAccessibleName(name: string): void;
      /**
       * Checks if the element is actually focused i.e. `document.activeElement` is equal to the actual element.
       */
      toHaveFocus(): void;
      /**
       * Checks if the element is the active-descendant of the active element.
       */
      toHaveVirtualFocus(): void;
      /**
       * Matches calls to `console.warn` in the asserted callback.
       *
       * @example expect(() => render()).not.toWarnDev()
       * @example expect(() => render()).toWarnDev('single message')
       * @example expect(() => render()).toWarnDev(['first warning', 'then the second'])
       */
      toWarnDev(messages?: string | readonly string[]): void;
      /**
       * Matches calls to `console.error` in the asserted callback.
       *
       * @example expect(() => render()).not.toErrorDev()
       * @example expect(() => render()).toErrorDev('single message')
       * @example expect(() => render()).toErrorDev(['first warning', 'then the second'])
       */
      toErrorDev(messages?: string | readonly string[]): void;
      /**
       * Asserts that the given callback throws an error matching the given message in development (process.env.NODE_ENV !== 'production').
       * In production it expects a minified error.
       */
      toThrowMinified(message: string): void;
    }
  }
}

function isInJSDOM() {
  return /jsdom/.test(window.navigator.userAgent);
}

// chai#utils.elToString that looks like stringified elements in testing-library
function elementToString(element: Element | null | undefined) {
  if (typeof element?.nodeType === 'number') {
    return prettyDOM(element, undefined, { highlight: !isKarma, maxDepth: 1 });
  }
  return String(element);
}
chai.use((chaiAPI, utils) => {
  const blockElements = new Set([
    'html',
    'address',
    'blockquote',
    'body',
    'dd',
    'div',
    'dl',
    'dt',
    'fieldset',
    'form',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'noframes',
    'ol',
    'p',
    'ul',
    'center',
    'dir',
    'hr',
    'menu',
    'pre',
  ]);

  function pretendVisibleGetComputedStyle(element: Element): CSSStyleDeclaration {
    // `CSSStyleDeclaration` is not constructable
    // https://stackoverflow.com/a/52732909/3406963
    // this is not equivalent to the declaration from `getComputedStyle`
    // e.g `getComputedStyle` would return a readonly declaration
    // let's hope this doesn't get passed around until it's no longer clear where it comes from
    const declaration = document.createElement('span').style;

    // initial values
    declaration.content = '';
    // technically it's `inline`. We partially apply the default user agent sheet (chrome) here
    // we're only interested in elements that use block
    declaration.display = blockElements.has(element.tagName) ? 'block' : 'inline';
    declaration.visibility = 'visible';

    return declaration;
  }

  // better diff view for expect(element).to.equal(document.activeElement)
  chai.Assertion.addMethod('toHaveFocus', function elementIsFocused() {
    const element = utils.flag(this, 'object');

    this.assert(
      element === document.activeElement,
      // karma does not show the diff like mocha does
      `expected element to have focus${isKarma ? '\nexpected #{exp}\nactual: #{act}' : ''}`,
      `expected element to NOT have focus \n${elementToString(element)}`,
      elementToString(element),
      elementToString(document.activeElement),
    );
  });

  chai.Assertion.addMethod('toHaveVirtualFocus', function elementIsVirtuallyFocused() {
    const element = utils.flag(this, 'object');
    const id = element.getAttribute('id');

    const virtuallyFocusedElementId = document.activeElement!.getAttribute('aria-activedescendant');

    this.assert(
      virtuallyFocusedElementId === id,
      `expected element to be virtually focused\nexpected id #{exp}\n${
        virtuallyFocusedElementId === null
          ? `activeElement: ${elementToString(document.activeElement)}`
          : 'actual id: #{act}'
      }`,
      'expected element to NOT to be virtually focused',
      id,
      virtuallyFocusedElementId,
      virtuallyFocusedElementId !== null,
    );
  });

  chai.Assertion.addMethod('toBeAriaHidden', function elementIsAccessible() {
    const element = utils.flag(this, 'object');

    // used for debugging failed assertions, will either point to the top most node
    // or the node that had aria-hidden="true"
    let previousNode = element;
    let currentNode = element;
    let ariaHidden = false;
    // "An element is considered hidden if it, or any of its ancestors are not
    // rendered or have their aria-hidden attribute value set to true."
    // -- https://www.w3.org/TR/wai-aria-1.1/#aria-hidden
    while (
      currentNode !== null &&
      // stoping at <html /> so that failed assertion message only prints
      // <body /> or below. use cases for aria-hidden on <html /> are unknown
      currentNode !== document.documentElement &&
      ariaHidden === false
    ) {
      ariaHidden = currentNode.getAttribute('aria-hidden') === 'true';
      previousNode = currentNode;
      currentNode = currentNode.parentElement;
    }

    this.assert(
      ariaHidden === true,
      `expected \n${elementToString(element)} to be aria-hidden`,
      `expected \n${elementToString(element)} to not be aria-hidden, but \n${elementToString(
        previousNode,
      )} had aria-hidden="true" instead`,
      // Not interested in a diff but the typings require the 4th parameter.
      undefined,
    );
  });

  chai.Assertion.addMethod('toBeInaccessible', function elementIsAccessible() {
    const element = utils.flag(this, 'object');

    const inaccessible = isInaccessible(element);

    this.assert(
      inaccessible === true,
      `expected \n${elementToString(element)} to be inaccessible but it was accessible`,
      `expected \n${elementToString(element)} to be accessible but it was inaccessible`,
      // Not interested in a diff but the typings require the 4th parameter.
      undefined,
    );
  });

  chai.Assertion.addMethod('toHaveAccessibleName', function hasAccessibleName(expectedName) {
    const root = utils.flag(this, 'object');
    // make sure it's an Element
    new chai.Assertion(root.nodeType, `Expected an Element but got '${String(root)}'`).to.equal(1);

    const actualName = computeAccessibleName(root, {
      computedStyleSupportsPseudoElements: !isInJSDOM(),
      // in local development we pretend to be visible. full getComputedStyle is
      // expensive and reserved for CI
      getComputedStyle: process.env.CI ? undefined : pretendVisibleGetComputedStyle,
    });

    this.assert(
      actualName === expectedName,
      `expected \n${elementToString(root)} to have accessible name #{exp} but got #{act} instead.`,
      `expected \n${elementToString(root)} not to have accessible name #{exp}.`,
      expectedName,
      actualName,
    );
  });

  chai.Assertion.addMethod(
    'toHaveAccessibleDescription',
    function hasAccessibleDescription(expectedDescription) {
      const root = utils.flag(this, 'object');
      // make sure it's an Element
      new chai.Assertion(root.nodeType, `Expected an Element but got '${String(root)}'`).to.equal(
        1,
      );

      const actualDescription = computeAccessibleDescription(root, {
        // in local development we pretend to be visible. full getComputedStyle is
        // expensive and reserved for CI
        getComputedStyle: process.env.CI ? undefined : pretendVisibleGetComputedStyle,
      });

      const possibleDescriptionComputationMessage = root.hasAttribute('title')
        ? ' computeAccessibleDescription can be misleading when a `title` attribute is used. This might be a bug in `dom-accessibility-api`.'
        : '';
      this.assert(
        actualDescription === expectedDescription,
        `expected \n${elementToString(
          root,
        )} to have accessible description #{exp} but got #{act} instead.${possibleDescriptionComputationMessage}`,
        `expected \n${elementToString(
          root,
        )} not to have accessible description #{exp}.${possibleDescriptionComputationMessage}`,
        expectedDescription,
        actualDescription,
      );
    },
  );

  /**
   * Correct name for `to.be.visible`
   */
  chai.Assertion.addMethod('toBeVisible', function toBeVisible() {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unused-expressions
    new chai.Assertion(this._obj).to.be.visible;
  });

  function assertMatchingStyles(
    this: Chai.AssertionStatic,
    actualStyleDeclaration: CSSStyleDeclaration,
    expectedStyleUnnormalized: Record<string, string>,
    options: { styleTypeHint: string },
  ): void {
    const { styleTypeHint } = options;
    // Compare objects using hyphen case.
    // This is closer to actual CSS and required for getPropertyValue anyway.
    const expectedStyle: Record<string, string> = {};
    Object.keys(expectedStyleUnnormalized).forEach((cssProperty) => {
      const hyphenCasedPropertyName = _.kebabCase(cssProperty);
      const isVendorPrefixed = /^(moz|ms|o|webkit)-/.test(hyphenCasedPropertyName);
      const propertyName = isVendorPrefixed
        ? `-${hyphenCasedPropertyName}`
        : hyphenCasedPropertyName;
      expectedStyle[propertyName] = expectedStyleUnnormalized[cssProperty];
    });

    const actualStyle: Record<string, string> = {};
    Object.keys(expectedStyle).forEach((cssProperty) => {
      actualStyle[cssProperty] = actualStyleDeclaration.getPropertyValue(cssProperty);
    });

    const jsdomHint =
      'Styles in JSDOM e.g. from `test:unit` are often misleading since JSDOM does not implement the Cascade nor actual CSS property value computation. ' +
      'If results differ between real browsers and JSDOM, skip the test in JSDOM e.g. `if (/jsdom/.test(window.navigator.userAgent)) this.skip();`';
    const shorthandHint =
      'Browsers can compute shorthand properties differently. Prefer longhand properties e.g. `borderTopColor`, `borderRightColor` etc. instead of `border` or `border-color`.';
    const messageHint = `${jsdomHint}\n${shorthandHint}`;

    if (isKarma) {
      // `#{exp}` and `#{act}` placeholders escape the newlines
      const expected = JSON.stringify(expectedStyle, null, 2);
      const actual = JSON.stringify(actualStyle, null, 2);
      // karma's `dots` reporter does not support diffs
      this.assert(
        // TODO Fix upstream docs/types
        (utils as any).eql(actualStyle, expectedStyle),
        `expected ${styleTypeHint} style of #{this} did not match\nExpected:\n${expected}\nActual:\n${actual}\n\n\n${messageHint}`,
        `expected #{this} to not have ${styleTypeHint} style\n${expected}\n\n\n${messageHint}`,
        expectedStyle,
        actualStyle,
      );
    } else {
      this.assert(
        // TODO Fix upstream docs/types
        (utils as any).eql(actualStyle, expectedStyle),
        `expected #{this} to have ${styleTypeHint} style #{exp} \n\n${messageHint}`,
        `expected #{this} not to have ${styleTypeHint} style #{exp}${messageHint}`,
        expectedStyle,
        actualStyle,
        true,
      );
    }
  }

  chai.Assertion.addMethod(
    'toHaveInlineStyle',
    function toHaveInlineStyle(expectedStyleUnnormalized: Record<string, string>) {
      const element = utils.flag(this, 'object') as HTMLElement;
      if (element?.nodeType !== 1) {
        // Same pre-condition for negated and unnegated  assertion
        throw new AssertionError(`Expected an Element but got ${String(element)}`);
      }

      assertMatchingStyles.call(this, element.style, expectedStyleUnnormalized, {
        styleTypeHint: 'inline',
      });
    },
  );

  chai.Assertion.addMethod(
    'toHaveComputedStyle',
    function toHaveComputedStyle(expectedStyleUnnormalized: Record<string, string>) {
      const element = utils.flag(this, 'object') as HTMLElement;
      if (element?.nodeType !== 1) {
        // Same pre-condition for negated and unnegated  assertion
        throw new AssertionError(`Expected an Element but got ${String(element)}`);
      }
      const computedStyle = element.ownerDocument.defaultView!.getComputedStyle(element);

      assertMatchingStyles.call(this, computedStyle, expectedStyleUnnormalized, {
        styleTypeHint: 'computed',
      });
    },
  );

  chai.Assertion.addMethod('toEqualDateTime', function toEqualDateTime(expectedDate, message) {
    // eslint-disable-next-line no-underscore-dangle
    const actualDate = this._obj;
    const assertion = new chai.Assertion(actualDate.toISOString(), message);
    // TODO: Investigate if `as any` can be removed after https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48634 is resolved.
    utils.transferFlags(this as any, assertion, false);
    assertion.to.equal(expectedDate.toISOString());
  });

  chai.Assertion.addMethod('toThrowMinified', function toThrowMinified(expectedDevMessage) {
    // TODO: Investigate if `as any` can be removed after https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48634 is resolved.
    if (process.env.NODE_ENV !== 'production') {
      (this as any).to.throw(expectedDevMessage);
    } else {
      utils.flag(
        this,
        'message',
        "Looks like the error was not minified. This can happen if the error code hasn't been generated yet. Run `yarn extract-error-codes` and try again.",
      );
      // TODO: Investigate if `as any` can be removed after https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48634 is resolved.
      (this as any).to.throw('Minified Material-UI error', 'helper');
    }
  });
});

chai.use((chaiAPI, utils) => {
  function addConsoleMatcher(matcherName: string, methodName: keyof typeof console) {
    /**
     * @param {string[]} expectedMessages
     */
    function matcher(this: Chai.AssertionStatic, expectedMessagesInput = []) {
      // documented pattern to get the actual value of the assertion
      // eslint-disable-next-line no-underscore-dangle
      const callback = this._obj;

      if (process.env.NODE_ENV !== 'production') {
        const expectedMessages =
          typeof expectedMessagesInput === 'string'
            ? [expectedMessagesInput]
            : expectedMessagesInput.slice();
        const unexpectedMessages: Error[] = [];
        let caughtError = null;

        this.assert(
          expectedMessages.length > 0,
          `Expected to call console.${methodName} but didn't provide messages. ` +
            `If you don't expect any messages prefer \`expect().not.${matcherName}();\`.`,
          `Expected no call to console.${methodName} while also expecting messages.` +
            'Expected no call to console.error but provided messages. ' +
            "If you want to make sure a certain message isn't logged prefer the positive. " +
            'By expecting certain messages you automatically expect that no other messages are logged',
          // Not interested in a diff but the typings require the 4th parameter.
          undefined,
        );

        // Ignore skipped messages in e.g. `[condition && 'foo']`
        const remainingMessages = expectedMessages.filter((messageOrFalse) => {
          return messageOrFalse !== false;
        });

        // eslint-disable-next-line no-console
        const originalMethod = console[methodName];

        let messagesMatched = 0;
        const consoleMatcher = (format: string, ...args: readonly unknown[]) => {
          // Ignore legacy root deprecation warnings
          // TODO: Remove once we no longer use legacy roots.
          if (
            format.indexOf('Use createRoot instead.') !== -1 ||
            format.indexOf('Use hydrateRoot instead.') !== -1
          ) {
            return;
          }
          const actualMessage = formatUtil(format, ...args);
          const expectedMessage = remainingMessages.shift();
          messagesMatched += 1;

          let message = null;
          if (expectedMessage === undefined) {
            message = `Expected no more error messages but got:\n"${actualMessage}"`;
          } else if (!actualMessage.includes(expectedMessage)) {
            message = `Expected #${messagesMatched} "${expectedMessage}" to be included in \n"${actualMessage}"`;
          }

          if (message !== null) {
            const error = new Error(message);

            const { stack: fullStack } = error;
            const fullStacktrace = fullStack!.replace(`Error: ${message}\n`, '').split('\n');

            const usefulStacktrace = fullStacktrace
              //
              // first line points to this frame which is irrelevant for the tester
              .slice(1);
            const usefulStack = `${message}\n${usefulStacktrace.join('\n')}`;

            error.stack = usefulStack;
            unexpectedMessages.push(error);
          }
        };
        // eslint-disable-next-line no-console
        console[methodName] = consoleMatcher;

        try {
          callback();
        } catch (error) {
          caughtError = error;
        } finally {
          // eslint-disable-next-line no-console
          console[methodName] = originalMethod;

          // unexpected thrown error takes precedence over unexpected console call
          if (caughtError !== null) {
            // not the same pattern as described in the block because we don't rethrow in the catch
            // eslint-disable-next-line no-unsafe-finally
            throw caughtError;
          }

          const formatMessages = (messages: ReadonlyArray<Error | string>) => {
            const formattedMessages = messages.map((message) => {
              if (typeof message === 'string') {
                return `"${message}"`;
              }
              // full Error
              return `${message.stack}`;
            });
            return `\n\n  - ${formattedMessages.join('\n\n-  ')}`;
          };

          const shouldHaveWarned = utils.flag(this, 'negate') !== true;

          // unreachable from expect().not.toWarnDev(messages)
          if (unexpectedMessages.length > 0) {
            const unexpectedMessageRecordedMessage = `Recorded unexpected console.${methodName} calls: ${formatMessages(
              unexpectedMessages,
            )}`;
            // chai will duplicate the stack frames from the unexpected calls in their assertion error
            // it's not ideal but the test failure is located the second to last stack frame
            // and the origin of the call is the second stackframe in the stack
            this.assert(
              // force chai to always trigger an assertion error
              !shouldHaveWarned,
              unexpectedMessageRecordedMessage,
              unexpectedMessageRecordedMessage,
              // Not interested in a diff but the typings require the 4th parameter.
              undefined,
            );
          }

          if (shouldHaveWarned) {
            this.assert(
              remainingMessages.length === 0,
              `Could not match the following console.${methodName} calls. ` +
                `Make sure previous actions didn't call console.${methodName} by wrapping them in expect(() => {}).not.${matcherName}(): ${formatMessages(
                  remainingMessages,
                )}`,
              `Impossible state reached in \`expect().${matcherName}()\`. ` +
                `This is a bug in the matcher.`,
              // Not interested in a diff but the typings require the 4th parameter.
              undefined,
            );
          }
        }
      } else {
        // nothing to do in prod
        // If there are still console calls than our test setup throws.
        callback();
      }
    }

    chai.Assertion.addMethod(matcherName, matcher);
    /* eslint-enable no-console */
  }

  /**
   * @example expect(() => render()).toWarnDev('single message')
   * @example expect(() => render()).toWarnDev(['first warning', 'then the second'])
   */
  addConsoleMatcher('toWarnDev', 'warn');
  addConsoleMatcher('toErrorDev', 'error');
});
