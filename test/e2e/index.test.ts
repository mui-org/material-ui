import { expect } from 'chai';
import * as playwright from 'playwright';
import type {
  ByRoleMatcher,
  ByRoleOptions,
  Matcher,
  MatcherOptions,
  SelectorMatcherOptions,
} from '@testing-library/dom';
import '../utils/initPlaywrightMatchers';

function sleep(timeoutMS: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeoutMS);
  });
}

interface PlaywrightScreen {
  getByLabelText: (
    labelText: Matcher,
    options?: SelectorMatcherOptions,
  ) => Promise<playwright.ElementHandle<HTMLElement>>;
  getByRole: (
    role: ByRoleMatcher,
    options?: ByRoleOptions,
  ) => Promise<playwright.ElementHandle<HTMLElement>>;
  getByTestId: (
    testId: string,
    options?: MatcherOptions,
  ) => Promise<playwright.ElementHandle<HTMLElement>>;
  getByText: (
    text: Matcher,
    options?: SelectorMatcherOptions,
  ) => Promise<playwright.ElementHandle<HTMLElement>>;
}

/**
 * Attempts page.goto with retries
 *
 * @remarks The server and runner can be started up simultaneously
 * @param page
 * @param url
 */
async function attemptGoto(page: playwright.Page, url: string): Promise<boolean> {
  const maxAttempts = 10;
  const retryTimeoutMS = 250;

  let didNavigate = false;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await page.goto(url);
      didNavigate = true;
    } catch (error) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(retryTimeoutMS);
    }
  }

  return didNavigate;
}

describe('e2e', () => {
  const baseUrl = 'http://localhost:5000';
  let browser: playwright.Browser;
  let page: playwright.Page;
  const screen: PlaywrightScreen = {
    getByLabelText: (...inputArgs) => {
      return page.evaluateHandle(
        (args) => window.DomTestingLibrary.getByLabelText(document.body, ...args),
        inputArgs,
      );
    },
    getByRole: (...inputArgs) => {
      return page.evaluateHandle(
        (args) => window.DomTestingLibrary.getByRole(document.body, ...args),
        inputArgs,
      );
    },
    getByText: (...inputArgs) => {
      return page.evaluateHandle(
        (args) => window.DomTestingLibrary.getByText(document.body, ...args),
        inputArgs,
      );
    },
    getByTestId: (...inputArgs) => {
      return page.evaluateHandle(
        (args) => window.DomTestingLibrary.getByTestId(document.body, ...args),
        inputArgs,
      );
    },
  };

  async function renderFixture(fixturePath: string) {
    await page.goto(`${baseUrl}/e2e/${fixturePath}#no-dev`);
    await page.waitForSelector('[data-testid="testcase"]:not([aria-busy="true"])');
  }

  before(async function beforeHook() {
    this.timeout(20000);

    browser = await playwright.chromium.launch({
      headless: true,
    });
    page = await browser.newPage();
    const isServerRunning = await attemptGoto(page, `${baseUrl}#no-dev`);
    if (!isServerRunning) {
      throw new Error(
        `Unable to navigate to ${baseUrl} after multiple attempts. Did you forget to run \`yarn test:e2e:server\` and \`yarn test:e2e:build\`?`,
      );
    }
  });

  after(async () => {
    await browser.close();
  });

  describe('<TrapFocus />', () => {
    it('should loop the tab key', async () => {
      await renderFixture('Unstable_TrapFocus/OpenTrapFocus');

      await expect(screen.getByTestId('root')).toHaveFocus();

      await page.keyboard.press('Tab');
      await expect(screen.getByText('x')).toHaveFocus();
      await page.keyboard.press('Tab');
      await expect(screen.getByText('cancel')).toHaveFocus();
      await page.keyboard.press('Tab');
      await expect(screen.getByText('ok')).toHaveFocus();
      await page.keyboard.press('Tab');
      await expect(screen.getByText('x')).toHaveFocus();

      await screen.getByTestId('initial-focus').then(($element) => $element.focus());
      await expect(screen.getByTestId('root')).toHaveFocus();
      await screen.getByText('x').then(($element) => $element.focus());
      await page.keyboard.press('Shift+Tab');
      await expect(screen.getByText('ok')).toHaveFocus();
    });

    it('should loop the tab key after activation', async () => {
      await renderFixture('Unstable_TrapFocus/DefaultOpenLazyTrapFocus');

      await expect(screen.getByTestId('initial-focus')).toHaveFocus();

      await page.keyboard.press('Tab');
      await expect(screen.getByText('close')).toHaveFocus();
      await page.keyboard.press('Tab');
      await expect(screen.getByText('noop')).toHaveFocus();
      await page.keyboard.press('Tab');
      await expect(screen.getByText('close')).toHaveFocus();
      await page.keyboard.press('Enter');
      await expect(screen.getByTestId('initial-focus')).toHaveFocus();
    });

    it('should focus on first focus element after last has received a tab click', async () => {
      await renderFixture('Unstable_TrapFocus/OpenTrapFocus');

      await page.keyboard.press('Tab');
      await expect(screen.getByText('x')).toHaveFocus();
      await page.keyboard.press('Tab');
      await expect(screen.getByText('cancel')).toHaveFocus();
      await page.keyboard.press('Tab');
      await expect(screen.getByText('ok')).toHaveFocus();
    });
  });

  describe('<Rating />', () => {
    it('should loop the arrow key', async () => {
      await renderFixture('Rating/BasicRating');

      await page.focus('input[name="rating-test"]:checked');
      await expect(page.evaluateHandle(() => document.activeElement)).toHaveAttribute('value', '1');
      await page.keyboard.press('ArrowLeft');
      await expect(page.evaluateHandle(() => document.activeElement)).to.toHaveAttribute(
        'value',
        '',
      );
      await page.keyboard.press('ArrowLeft');
      await expect(page.evaluateHandle(() => document.activeElement)).to.toHaveAttribute(
        'value',
        '5',
      );
    });
  });
});
