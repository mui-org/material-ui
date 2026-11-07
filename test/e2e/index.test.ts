import type { Page, Browser } from '@playwright/test';
import { chromium, expect } from '@playwright/test';
import { describe, it, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import '@mui/internal-test-utils/initPlaywrightMatchers';

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:5001';

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

/**
 * Attempts page.goto with retries
 *
 * @remarks The server and runner can be started up simultaneously
 * @param page
 * @param url
 */
async function attemptGoto(page: Page, url: string): Promise<boolean> {
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
  let browser: Browser;
  let page: Page;

  async function renderFixture(fixturePath: string) {
    await page.goto(`${BASE_URL}/e2e/${fixturePath}#no-dev`);
    await page.waitForSelector('[data-testid="testcase"]:not([aria-busy="true"])');
  }

  beforeAll(async function beforeHook() {
    browser = await chromium.launch({
      headless: true,
    });
    page = await browser.newPage();
    const isServerRunning = await attemptGoto(page, `${BASE_URL}#no-dev`);
    if (!isServerRunning) {
      throw new Error(
        `Unable to navigate to ${BASE_URL} after multiple attempts. Did you forget to run \`pnpm test:e2e:dev\`?`,
      );
    }
  }, 20000);

  afterAll(async () => {
    await browser.close();
  });

  describe('<Modal />', () => {
    ['', 'hidden', 'clip'].forEach((bodyOverflow) => {
      it(`blocks wheel scrolling when html scrolls and body overflow is ${JSON.stringify(bodyOverflow)}`, async () => {
        await page.goto('about:blank');
        await renderFixture('Modal/ViewportScrollLock');
        await page.evaluate((overflow) => {
          document.documentElement.style.overflow = 'scroll';
          document.documentElement.style.scrollBehavior = 'auto';
          document.body.style.overflow = overflow;
        }, bodyOverflow);

        const trigger = page.getByRole('button', { name: 'Open dialog' });
        await trigger.hover();
        // Verify native wheel input can scroll the viewport before opening the dialog.
        await page.mouse.wheel(0, 500);
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
        await page.evaluate(() => window.scrollTo(0, 0));
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

        await trigger.click();
        const closeButton = page.getByRole('button', { name: 'Close dialog' });
        await expect(closeButton).toBeVisible();
        await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
        await closeButton.hover();
        await page.mouse.wheel(0, 500);
        await page.evaluate(
          () =>
            new Promise<void>((resolve) => {
              requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
            }),
        );
        expect(await page.evaluate(() => window.scrollY)).toBe(0);

        await closeButton.click();
        await expect(page.getByRole('dialog')).toBeHidden();
        await expect(page.locator('html')).toHaveCSS('overflow', 'scroll');
        expect(await page.evaluate(() => document.body.style.overflow)).toBe(bodyOverflow);
      });
    });
  });

  describe('<Menu2 />', () => {
    beforeEach(async () => {
      // Reload the fixture even when successive cases use the same URL and hash.
      await page.goto('about:blank');
    });

    afterEach(async () => {
      await page.emulateMedia({ forcedColors: 'none' });
    });

    [240, 600].forEach((viewportHeight) => {
      it(`keeps the long-menu demo within a ${viewportHeight}px viewport and scrolls to the last item`, async () => {
        const previousViewport = page.viewportSize()!;
        try {
          await page.setViewportSize({ width: 800, height: viewportHeight });
          await renderFixture('Menu2/LongMenu');

          const trigger = page.getByRole('button', { name: 'Country' });
          await page.keyboard.press('Tab');
          await expect(trigger).toBeFocused();
          await page.keyboard.press('ArrowDown');

          const menu = page.getByRole('menu');
          await expect(menu).toBeVisible();
          await expect(page.getByRole('menuitem', { name: 'Argentina' })).toBeFocused();
          await expect(menu).toHaveCSS('transform', 'none');
          const bounds = (await menu.boundingBox())!;
          expect(bounds.y).toBeGreaterThanOrEqual(0);
          expect(bounds.y + bounds.height).toBeLessThanOrEqual(viewportHeight);
          expect(bounds.height).toBeLessThanOrEqual(320);
          if (viewportHeight === 600) {
            expect(bounds.height).toBe(320);
          }
          expect(
            await menu.evaluate((element) => element.scrollHeight > element.clientHeight),
          ).toBe(true);

          await page.keyboard.press('End');
          const lastItem = page.getByRole('menuitem', { name: 'United Kingdom' });
          await expect(lastItem).toBeFocused();
          await expect(lastItem).toBeInViewport({ ratio: 1 });
          await expect.poll(() => menu.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);

          await page.keyboard.press('Escape');
          await expect(menu).toBeHidden();
          await expect(trigger).toBeFocused();
        } finally {
          await page.setViewportSize(previousViewport);
        }
      });
    });

    ['pointer', 'keyboard'].forEach((input) => {
      it(`keeps the Account menu named when opened with ${input} input`, async () => {
        await renderFixture('Menu2/AccountMenu');

        const trigger = page.getByRole('button', { name: 'Account settings' });
        if (input === 'pointer') {
          await trigger.hover();
        } else {
          await page.keyboard.press('Tab');
          await expect(trigger).toBeFocused();
        }
        await expect(page.getByRole('tooltip')).toBeVisible();
        expect(await page.getByRole('tooltip').getAttribute('id')).not.toBe(
          await trigger.getAttribute('id'),
        );

        if (input === 'pointer') {
          await trigger.click();
        } else {
          await page.keyboard.press('Enter');
        }

        const menu = page.getByRole('menu');
        await expect(menu).toHaveAccessibleName('Account settings');
        const triggerId = await trigger.getAttribute('id');
        expect(triggerId).toBeTruthy();
        await expect(menu).toHaveAttribute('aria-labelledby', triggerId!);
        await expect(trigger).toHaveAttribute('aria-controls', (await menu.getAttribute('id'))!);

        await page.mouse.move(0, 0);
        await expect(page.getByRole('tooltip')).toBeHidden();
        await expect(menu).toHaveAccessibleName('Account settings');

        await page.keyboard.press('Escape');
        await expect(menu).toBeHidden();
        await expect(trigger).toBeFocused();
      });
    });

    [
      { side: 'top', align: 'end' },
      { side: 'bottom', align: 'center' },
      { side: 'left', align: 'start' },
      { side: 'right', align: 'end' },
      { side: 'inline-start', align: 'center' },
      { side: 'inline-end', align: 'start' },
    ].forEach(({ side, align }) => {
      it(`updates the open positioning preview to ${side} without moving the trigger`, async () => {
        await renderFixture('Menu2/DocsLayout');
        const demo = page.getByTestId('positioned-demo');
        const getPositions = () =>
          demo.evaluate((element) => {
            const container = element.getBoundingClientRect();
            return Array.from(element.querySelectorAll('button'), (button) => {
              const trigger = button.getBoundingClientRect();
              return { x: trigger.left - container.left, y: trigger.top - container.top };
            });
          });
        const closedPositions = await getPositions();

        await demo.getByRole('button', { name: 'Open menu' }).click();
        await expect(page.getByRole('menu')).toBeVisible();
        const sideControl = demo.getByRole('combobox', { name: 'side', exact: true });
        await sideControl.press('Home');
        await sideControl.selectOption(side);
        await demo.getByRole('combobox', { name: 'align', exact: true }).selectOption(align);
        await expect(sideControl).toBeFocused();
        await expect(page.getByRole('menu')).toBeVisible();
        await expect(page.getByRole('menu')).toHaveAttribute('data-side', side);
        await expect(page.getByRole('menu')).toHaveAttribute('data-align', align);
        await expect.poll(getPositions, { timeout: 2000 }).toEqual(closedPositions);

        await page.keyboard.press('Escape');
        await expect(page.getByRole('menu')).toBeHidden();
        await expect.poll(getPositions, { timeout: 2000 }).toEqual(closedPositions);
      });
    });

    it('updates the open positioning preview offsets with pointer and keyboard input', async () => {
      await renderFixture('Menu2/DocsLayout');
      const demo = page.getByTestId('positioned-demo');
      const trigger = demo.getByRole('button', { name: 'Open menu' });
      await trigger.click();
      const menu = page.getByRole('menu');
      await expect(menu).toBeVisible();
      await demo.getByText('sideOffset: 8 px', { exact: true }).click();
      await expect(menu).toBeVisible();
      const sideOffset = demo.getByRole('slider', { name: /^sideOffset:/ });
      const alignOffset = demo.getByRole('slider', { name: /^alignOffset:/ });
      await sideOffset.press('ArrowRight');
      await sideOffset.press('ArrowRight');
      await alignOffset.press('ArrowLeft');
      await alignOffset.press('ArrowLeft');
      await alignOffset.press('ArrowLeft');
      await expect(sideOffset).toHaveValue('16');
      await expect(alignOffset).toHaveValue('-12');

      await expect(alignOffset).toBeFocused();
      await expect(menu).toBeVisible();
      await expect(menu).toHaveAttribute('data-side', 'bottom');
      await expect
        .poll(async () => {
          const triggerBox = (await trigger.boundingBox())!;
          const menuBox = (await menu.boundingBox())!;
          return {
            side: Math.round(menuBox.y - triggerBox.y - triggerBox.height),
            align: Math.round(menuBox.x - triggerBox.x),
          };
        })
        .toEqual({ side: 16, align: -12 });

      await trigger.click();
      await expect(menu).toBeHidden();
    });

    it('keeps the controlled demo trigger and text gap in place when opening and closing', async () => {
      await renderFixture('Menu2/DocsLayout');
      const demo = page.getByTestId('controlled-demo');
      const getLayout = () =>
        demo.evaluate((element) => {
          const container = element.getBoundingClientRect();
          const trigger = element.querySelector('button')!.getBoundingClientRect();
          const text = element.querySelector('p')!.getBoundingClientRect();
          return {
            x: trigger.left - container.left,
            y: trigger.top - container.top,
            gap: text.left - trigger.right,
          };
        });
      const closedLayout = await getLayout();

      await demo.getByRole('button', { name: 'More actions' }).click();
      await expect(page.getByRole('menu')).toBeVisible();
      await expect(demo.getByText('Opened with reason "trigger-press".')).toBeVisible();
      await expect.poll(getLayout, { timeout: 2000 }).toEqual(closedLayout);

      await page.keyboard.press('Escape');
      await expect(page.getByRole('menu')).toBeHidden();
      await expect(demo.getByText('Closed with reason "escape-key".')).toBeVisible();
      await expect.poll(getLayout, { timeout: 2000 }).toEqual(closedLayout);
    });

    [false, true].forEach((focusVisible) => {
      it(`separates pointer and keyboard styles, focusVisible=${focusVisible}`, async () => {
        await renderFixture('Menu2/ItemStates');
        await page.getByRole('checkbox', { name: 'Focus ring' }).setChecked(focusVisible);
        await page.getByRole('button', { name: 'Options' }).click();

        const items = [
          page.getByRole('menuitem', { name: 'Plain', exact: true }),
          page.getByRole('menuitem', { name: 'Link', exact: true }),
          page.getByRole('menuitemcheckbox', { name: 'Checkbox' }),
          page.getByRole('menuitemradio', { name: 'Radio' }),
        ];
        /* eslint-disable no-await-in-loop -- Test each pointer move in order. */
        for (const item of items) {
          await item.hover();
          await expect(item).toBeFocused();
          await expect(item).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.04)');
          await expect(item).not.toHaveClass(/Mui-focusVisible/);
        }
        /* eslint-enable no-await-in-loop */

        const lastAction = page.getByRole('menuitem', { name: 'Last action' });
        await lastAction.hover();
        await expect(lastAction).toBeFocused();
        await expect(lastAction).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.04)');
        await Promise.all(
          items.map((item) => expect(item).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')),
        );

        await page.keyboard.press('ArrowUp');
        const trigger = page.getByRole('menuitem', { name: 'More', exact: true });
        await expect(trigger).toBeFocused();
        await expect(trigger).toHaveClass(/Mui-focusVisible/);
        await expect(trigger).toHaveCSS(
          'background-color',
          focusVisible ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.12)',
        );
        if (focusVisible) {
          await expect(trigger).toHaveCSS('outline-width', '2px');
        }
      });
    });

    it('uses hover tint for the open parent and hovered child', async () => {
      await renderFixture('Menu2/ItemStates');
      await page.getByRole('button', { name: 'Options' }).click();
      const parent = page.getByRole('menuitem', { name: 'More', exact: true });
      await parent.hover();
      const child = page.getByRole('menuitem', { name: 'More tools' });
      await child.hover();
      await expect(child).toBeFocused();
      await expect(parent).toHaveClass(/Mui-open/);
      await expect(parent).not.toHaveClass(/MuiMenu2SubmenuTrigger-highlighted/);
      await expect(child).not.toHaveClass(/Mui-focusVisible/);
      await expect(child).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.04)');
      await expect(parent).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.04)');
    });

    [false, true].forEach((focusVisible) => {
      [false, true].forEach((forcedColors) => {
        it(`clears the submenu trigger tint during a pointer exit, focusVisible=${focusVisible}, forcedColors=${forcedColors}`, async () => {
          await page.emulateMedia({ forcedColors: forcedColors ? 'active' : 'none' });
          await renderFixture('Menu2/SubmenuPointerExit');
          await page.getByRole('checkbox', { name: 'Focus ring' }).setChecked(focusVisible);
          await page.getByRole('button', { name: 'Options' }).click();
          const trigger = page.getByRole('menuitem', { name: 'More', exact: true });
          const popup = page.getByTestId('submenu-popup');
          const idleColors = await trigger.evaluate((element) => {
            const style = getComputedStyle(element);
            return { color: style.color, backgroundColor: style.backgroundColor };
          });
          await trigger.hover();
          await expect(trigger).toHaveClass(/Mui-open/);
          await expect(popup).toBeVisible();
          // Move through Base UI's safe-travel pointer blocking without waiting for it to end.
          const sibling = page.getByRole('menuitem', { name: 'Plain', exact: true });
          await sibling.hover({ force: true });
          await expect(popup).toHaveAttribute('data-ending-style', '');
          await expect(trigger).toHaveAttribute('aria-expanded', 'false');
          expect(
            await trigger.evaluate((element) => {
              const style = getComputedStyle(element);
              return { color: style.color, backgroundColor: style.backgroundColor };
            }),
          ).toEqual(idleColors);
          await expect(popup).toBeAttached();
          await expect(popup).not.toBeAttached();
        });
      });
    });

    [false, true].forEach((forcedColors) => {
      it(`restores the exit tint for keyboard navigation after a pointer close, forcedColors=${forcedColors}`, async () => {
        await page.emulateMedia({ forcedColors: forcedColors ? 'active' : 'none' });
        await renderFixture('Menu2/SubmenuPointerExit');
        await page.getByRole('button', { name: 'Options' }).click();
        const trigger = page.getByRole('menuitem', { name: 'More', exact: true });
        const popup = page.getByTestId('submenu-popup');
        await trigger.hover();
        await expect(trigger).toHaveClass(/Mui-open/);
        await expect(popup).toBeVisible();
        await page.getByRole('menuitem', { name: 'Plain', exact: true }).hover({ force: true });
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        await expect(popup).not.toBeAttached();
        await page.getByRole('menuitem', { name: 'Plain', exact: true }).hover();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowRight');
        await expect(page.getByRole('menuitem', { name: 'Nested' })).toBeFocused();
        const openColor = await trigger.evaluate(
          (element) => getComputedStyle(element).backgroundColor,
        );
        await page.keyboard.press('Escape');
        await expect(popup).toHaveAttribute('data-ending-style', '');
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(await trigger.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(
          openColor,
        );
        await expect(popup).toBeAttached();
        await expect(popup).not.toBeAttached();
        await expect(trigger).toBeFocused();
      });
    });
  });

  describe('<FocusTrap />', () => {
    it('should loop the tab key', async () => {
      await renderFixture('FocusTrap/OpenFocusTrap');

      await expect(page.getByTestId('root')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByText('confirm')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('cancel')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('ok')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('confirm')).toBeFocused();

      await page.getByTestId('initial-focus').focus();
      await expect(page.getByTestId('root')).toBeFocused();
      await page.getByText('confirm').focus();
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByText('ok')).toBeFocused();
    });

    it('should loop the tab key in positive tabIndex order', async () => {
      await renderFixture('FocusTrap/PositiveTabIndexFocusTrap');

      await expect(page.getByTestId('root')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByText('indexed 1')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('indexed 2')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('indexed 3')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('normal 1')).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(page.getByText('indexed 3')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('normal 1')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('normal 2')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('normal 3')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('indexed 1')).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByText('normal 3')).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByText('normal 2')).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByText('normal 1')).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByText('indexed 3')).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByText('indexed 2')).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByText('indexed 1')).toBeFocused();
    });

    it('should loop the tab key after activation', async () => {
      await renderFixture('FocusTrap/DefaultOpenLazyFocusTrap');

      await expect(page.getByTestId('initial-focus')).toBeFocused();

      const close = page.getByRole('button', { name: 'close' });

      await page.keyboard.press('Tab');
      await expect(close).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('noop')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(close).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.getByTestId('initial-focus')).toBeFocused();
    });

    it('should focus on first focus element after last has received a tab click', async () => {
      await renderFixture('FocusTrap/OpenFocusTrap');

      await page.keyboard.press('Tab');
      await expect(page.getByText('confirm')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('cancel')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('ok')).toBeFocused();
    });

    it('should be able to be tabbed straight through when rendered closed', async () => {
      await renderFixture('FocusTrap/ClosedFocusTrap');

      await expect(page.getByText('initial focus')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('inside focusable')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByText('final tab target')).toBeFocused();
    });

    it('should not trap focus when clicking outside when disableEnforceFocus is set', async () => {
      await renderFixture('FocusTrap/DisableEnforceFocusFocusTrap');

      // initial focus is on the button outside of the trap focus
      await expect(page.getByTestId('initial-focus')).toBeFocused();

      // focus the button inside the trap focus
      await page.keyboard.press('Tab');
      await expect(page.getByTestId('inside-trap-focus')).toBeFocused();

      // the focus is now trapped inside
      await page.keyboard.press('Tab');
      await expect(page.getByTestId('inside-trap-focus')).toBeFocused();

      const initialFocus = (await page.getByTestId('initial-focus'))!;
      await initialFocus.click();

      await expect(page.getByTestId('initial-focus')).toBeFocused();
    });
  });

  describe('<Rating />', () => {
    it('should loop the arrow key', async () => {
      await renderFixture('Rating/BasicRating');

      const activeEl = page.locator(':focus');

      await page.focus('input[name="rating-test"]:checked');
      await expect(activeEl).toHaveAttribute('value', '1');
      await page.keyboard.press('ArrowLeft');
      await expect(activeEl).toHaveAttribute('value', '');
      await page.keyboard.press('ArrowLeft');
      await expect(activeEl).toHaveAttribute('value', '5');
    });
  });

  describe('<Autocomplete/>', () => {
    it('[Material Autocomplete] should highlight correct option when initial navigation through options starts from mouse move', async () => {
      await renderFixture('Autocomplete/HoverMaterialAutocomplete');

      const combobox = (await page.getByRole('combobox'))!;
      await combobox.click();

      const firstOption = (await page.getByText('one'))!;

      const dimensions = (await firstOption.boundingBox())!;

      await page.mouse.move(dimensions.x + 10, dimensions.y + 10); // moves to 1st option
      await page.keyboard.down('ArrowDown'); // moves to 2nd option
      await page.keyboard.down('ArrowDown'); // moves to 3rd option
      await page.keyboard.down('ArrowDown'); // moves to 4th option

      const listbox = await page.getByRole('listbox');
      const focusedOption = listbox.locator('.Mui-focused');
      const focusedOptionText = await focusedOption.innerHTML();

      expect(focusedOptionText).toEqual('four');
    });
  });

  describe('<TextareaAutosize />', () => {
    // https://github.com/mui/material-ui/issues/32640
    it('should handle suspense without error', async () => {
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.name));

      await renderFixture('TextareaAutosize/TextareaAutosizeSuspense');
      expect(await page.isVisible('textarea')).toEqual(true);
      await page.click('button');
      expect(await page.isVisible('textarea')).toEqual(false);
      await page.waitForTimeout(200); // Wait for debounce to fire (166)

      expect(pageErrors.length).toEqual(0);
    });

    it('should not glitch when resizing', async () => {
      await renderFixture('TextareaAutosize/BasicTextareaAutosize');

      const textarea = await page.getByTestId('textarea')!;

      // Get the element's dimensions
      const { x, y, width, height } = (await textarea.boundingBox())!;

      // Calculate coordinates of bottom-right corner
      const bottomRightX = x + width;
      const bottomRightY = y + height;

      // Get the initial height of textarea as a number
      const initialHeight = await textarea.evaluate((textareaElement) =>
        parseFloat(textareaElement.style.height),
      );

      // Move the mouse to the bottom-right corner, adjusting slightly to grab the resize handle
      await page.mouse.move(bottomRightX - 5, bottomRightY - 5);

      // Hold the mouse down without releasing the mouse button (mouseup) to grab the resize handle
      await page.mouse.down();

      // Move the mouse to resize the textarea
      await page.mouse.move(bottomRightX + 50, bottomRightY + 50);

      // Assert that the textarea height has increased after resizing
      expect(
        await textarea.evaluate((textareaElement) => parseFloat(textareaElement.style.height)),
      ).toBeGreaterThan(initialHeight);
    });
  });

  describe('<TextField />', () => {
    it('should fire `onClick` when clicking on the focused label position', async () => {
      await renderFixture('TextField/OutlinedTextFieldOnClick');

      // execute the click on the focused label position
      await page.getByRole('textbox').click({ position: { x: 10, y: 10 } });
      const errorSelector = page.locator('.MuiInputBase-root.Mui-error');
      await errorSelector.waitFor();
    });
  });

  describe('<Select />', () => {
    it('should not show focus-visible on menu item when opened by mouse', async () => {
      await renderFixture('Select/SelectFocusVisible');

      const trigger = page.getByRole('combobox');
      await trigger.click();

      await page.waitForSelector('[role="listbox"]');

      const selectedItem = page.locator('[role="option"][aria-selected="true"]');
      await expect(selectedItem).toBeFocused();
      const hasVisible = await selectedItem.evaluate((el) =>
        el.classList.contains('Mui-focusVisible'),
      );
      expect(hasVisible).toEqual(false);
    });

    it('should show focus-visible on menu item when opened by keyboard', async () => {
      await renderFixture('Select/SelectFocusVisible');

      await page.keyboard.press('Tab');
      const trigger = page.getByRole('combobox');
      await expect(trigger).toBeFocused();

      await page.keyboard.press('Enter');
      await page.waitForSelector('[role="listbox"]');

      const selectedItem = page.locator('[role="option"][aria-selected="true"]');
      await expect(selectedItem).toBeFocused();
      const hasVisible = await selectedItem.evaluate((el) =>
        el.classList.contains('Mui-focusVisible'),
      );
      expect(hasVisible).toEqual(true);
    });

    it('should not select an option while opening a flipped menu with a normal click', async () => {
      await page.setViewportSize({ width: 800, height: 240 });
      await renderFixture('Select/SelectPointerFlow');

      const trigger = page.getByRole('combobox');
      const box = await trigger.boundingBox();
      expect(box).not.toEqual(null);

      const x = box!.x + box!.width / 2;
      const y = box!.y + box!.height / 2;

      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.waitForSelector('[role="listbox"]');

      const optionAtPointer = await page.evaluate(
        (point) =>
          document.elementFromPoint(point.x, point.y)?.closest('[role="option"]')?.textContent,
        { x, y },
      );
      expect(optionAtPointer).not.toEqual(null);

      await page.mouse.up();

      await expect(page.getByRole('listbox')).toBeVisible();
      await expect(page.getByTestId('select-value')).toHaveText('10');

      await page.keyboard.press('Escape');
      await expect(page.getByRole('listbox')).toBeHidden();
    });

    it('should select an option when dragging from the trigger and releasing on the option', async () => {
      await page.setViewportSize({ width: 800, height: 600 });
      await renderFixture('Select/SelectPointerFlow');

      const trigger = page.getByRole('combobox');
      const triggerBox = await trigger.boundingBox();
      expect(triggerBox).not.toEqual(null);

      await page.mouse.move(
        triggerBox!.x + triggerBox!.width / 2,
        triggerBox!.y + triggerBox!.height / 2,
      );
      await page.mouse.down();
      await page.waitForSelector('[role="listbox"]');
      await page.waitForTimeout(250);

      const option = page.getByRole('option', { name: '20', exact: true });
      const optionBox = await option.boundingBox();
      expect(optionBox).not.toEqual(null);

      await page.mouse.move(
        optionBox!.x + optionBox!.width / 2,
        optionBox!.y + optionBox!.height / 2,
      );
      await page.mouse.up();

      await expect(page.getByTestId('select-value')).toHaveText('20', { timeout: 1000 });
      await expect(page.getByRole('listbox')).toBeHidden({ timeout: 1000 });
    });
  });
});
