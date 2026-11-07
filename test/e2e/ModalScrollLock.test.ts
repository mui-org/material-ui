import type { Browser, Page } from '@playwright/test';
import { chromium, expect } from '@playwright/test';
import { afterAll, afterEach, beforeAll, beforeEach, describe, it } from 'vitest';
import '@mui/internal-test-utils/initPlaywrightMatchers';

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:5001';

describe('Modal native scroll lock', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
  });

  afterAll(async () => {
    await browser?.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    // The fixture server and runner can start at the same time in test:e2e.
    await expect(async () => {
      await page.goto(`${BASE_URL}/e2e/Modal/IndependentBodyScrollLock#no-dev`);
    }).toPass({ timeout: 5000 });
    await page.waitForSelector('[data-testid="testcase"]:not([aria-busy="true"])');
  });

  afterEach(async () => {
    await page?.close();
  });

  async function wheel(deltaX: number, deltaY: number) {
    await page.mouse.wheel(deltaX, deltaY);
    // Wheel events are asynchronous. Wait for rendering to consume the input
    // before checking that a lock prevented native scrolling.
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        }),
    );
  }

  it('blocks the first outside click of a modal Menu2 and keeps its trigger working', async () => {
    const menu = page.getByRole('menu');
    const center = async (name: string) => {
      const box = (await page.getByRole('button', { name, exact: true }).boundingBox())!;
      return [box.x + box.width / 2, box.y + box.height / 2] as const;
    };
    // Real mouse input. The open menu's backdrop covers the trigger and the page.
    const trigger = await center('Open menu');
    const outside = await center('Open dialog');

    await page.mouse.click(...trigger);
    await expect(menu).toBeVisible();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

    await page.mouse.click(...outside);
    await expect(menu).toBeHidden();
    await expect(page.getByRole('dialog')).toBeHidden();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('');

    await page.mouse.click(...trigger);
    await expect(menu).toBeVisible();
    await page.mouse.click(...trigger);
    await expect(menu).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toBeFocused();
    // Two frames let a release that reopens the menu show its effect.
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        }),
    );
    await expect(menu).toBeHidden();
  });

  ['hidden', 'clip'].forEach((htmlOverflow) => {
    ['auto', 'scroll'].forEach((bodyOverflow) => {
      [false, true].forEach((fromMenu) => {
        it(`blocks native wheel input with html=${htmlOverflow}, body=${bodyOverflow}${fromMenu ? ' when opened from Menu2' : ''}`, async () => {
          await page.evaluate(
            ({ html, body }) => {
              document.documentElement.style.overflow = html;
              Object.assign(document.body.style, {
                height: '320px',
                margin: '0',
                overflow: body,
                scrollBehavior: 'auto',
                // The body is an independent scroll container, not the viewport.
                // This also makes the fixed dialog a descendant for wheel chaining.
                transform: 'translateZ(0)',
              });
            },
            { html: htmlOverflow, body: bodyOverflow },
          );

          const scrollTop = () => page.evaluate(() => document.body.scrollTop);
          await page.mouse.move(200, 150);
          await wheel(0, 200);
          await expect.poll(scrollTop).toBeGreaterThan(0);
          expect(await page.evaluate(() => window.scrollY)).toBe(0);
          await wheel(0, -1000);
          await expect.poll(scrollTop).toBe(0);

          if (fromMenu) {
            await page.getByRole('button', { name: 'Open menu', exact: true }).click();
            await page.getByRole('menuitem', { name: 'Open dialog from menu' }).click();
            await expect(page.getByRole('menu')).toBeHidden();
            await expect(page.locator('html')).not.toHaveAttribute('data-base-ui-scroll-locked');
          } else {
            await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
          }

          const closeButton = page.getByRole('button', { name: 'Close dialog' });
          await expect(closeButton).toBeVisible();
          await closeButton.hover();
          await wheel(0, 200);
          expect(await scrollTop()).toBe(0);

          await closeButton.click();
          await expect(page.getByRole('dialog')).toBeHidden();
          expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe(
            htmlOverflow,
          );
          expect(await page.evaluate(() => document.body.style.overflow)).toBe(bodyOverflow);

          await page.mouse.move(200, 150);
          await wheel(0, 200);
          await expect.poll(scrollTop).toBeGreaterThan(0);
          expect(await page.evaluate(() => window.scrollY)).toBe(0);
        });
      });
    });
  });

  ['hidden', 'clip'].forEach((htmlOverflow) => {
    it(`blocks horizontal-only body wheel scrolling with html=${htmlOverflow}`, async () => {
      await page.evaluate((overflow) => {
        document.documentElement.style.overflow = overflow;
        Object.assign(document.body.style, {
          height: '320px',
          width: '400px',
          margin: '0',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollBehavior: 'auto',
          transform: 'translateZ(0)',
        });
      }, htmlOverflow);
      await page.getByTestId('scroll-content').evaluate((element) => {
        Object.assign(element.style, { height: '100px', width: '2000px' });
      });

      const scrollLeft = () => page.evaluate(() => document.body.scrollLeft);
      await page.mouse.move(200, 150);
      await wheel(200, 0);
      await expect.poll(scrollLeft).toBeGreaterThan(0);
      expect(await page.evaluate(() => window.scrollX)).toBe(0);
      await wheel(-1000, 0);
      await expect.poll(scrollLeft).toBe(0);

      await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
      const closeButton = page.getByRole('button', { name: 'Close dialog' });
      await closeButton.hover();
      await wheel(200, 0);
      expect(await scrollLeft()).toBe(0);

      await closeButton.click();
      await expect(page.getByRole('dialog')).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe(htmlOverflow);
      expect(await page.evaluate(() => document.body.style.overflowX)).toBe('auto');
      expect(await page.evaluate(() => document.body.style.overflowY)).toBe('hidden');

      await page.mouse.move(200, 150);
      await wheel(200, 0);
      await expect.poll(scrollLeft).toBeGreaterThan(0);
      expect(await page.evaluate(() => window.scrollX)).toBe(0);
    });

    it(`blocks body wheel scrolling after content grows with html=${htmlOverflow}`, async () => {
      await page.evaluate((overflow) => {
        document.documentElement.style.overflow = overflow;
        Object.assign(document.body.style, {
          height: '320px',
          width: '400px',
          margin: '0',
          overflow: 'auto',
          scrollBehavior: 'auto',
          transform: 'translateZ(0)',
        });
      }, htmlOverflow);
      const content = page.getByTestId('scroll-content');
      await content.evaluate((element) => {
        element.style.height = '100px';
      });
      expect(await page.evaluate(() => document.body.scrollHeight)).toBe(
        await page.evaluate(() => document.body.clientHeight),
      );

      await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
      const closeButton = page.getByRole('button', { name: 'Close dialog' });
      await expect(closeButton).toBeVisible();
      await content.evaluate((element) => {
        element.style.height = '2000px';
      });
      expect(await page.evaluate(() => document.body.scrollHeight)).toBeGreaterThan(
        await page.evaluate(() => document.body.clientHeight),
      );
      const scrollTop = () => page.evaluate(() => document.body.scrollTop);
      await closeButton.hover();
      await wheel(0, 200);
      expect(await scrollTop()).toBe(0);

      await closeButton.click();
      await expect(page.getByRole('dialog')).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe(htmlOverflow);
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('auto');

      await page.mouse.move(200, 150);
      await wheel(0, 200);
      await expect.poll(scrollTop).toBeGreaterThan(0);
      expect(await page.evaluate(() => window.scrollY)).toBe(0);
    });
  });

  ['', 'auto', 'hidden', 'clip'].forEach((bodyOverflow) => {
    it(`blocks native wheel input when Menu2 transfers the viewport lock with body=${JSON.stringify(bodyOverflow)}`, async () => {
      await page.evaluate((overflow) => {
        document.documentElement.style.overflow = 'scroll';
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.overflow = overflow;
      }, bodyOverflow);

      const scrollY = () => page.evaluate(() => window.scrollY);
      await page.mouse.move(200, 150);
      await wheel(0, 200);
      await expect.poll(scrollY).toBeGreaterThan(0);
      await wheel(0, -1000);
      await expect.poll(scrollY).toBe(0);

      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      const menuItem = page.getByRole('menuitem', { name: 'Open dialog from menu' });
      await menuItem.hover();
      await expect(page.locator('html')).toHaveCSS('overflow-y', 'hidden');
      await wheel(0, 200);
      expect(await scrollY()).toBe(0);

      await menuItem.click();
      await expect(page.getByRole('menu')).toBeHidden();
      const closeButton = page.getByRole('button', { name: 'Close dialog' });
      await closeButton.hover();
      await wheel(0, 200);
      expect(await scrollY()).toBe(0);

      await closeButton.click();
      await expect(page.getByRole('dialog')).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('scroll');
      expect(await page.evaluate(() => document.body.style.overflow)).toBe(bodyOverflow);

      await page.mouse.move(200, 150);
      await wheel(0, 200);
      await expect.poll(scrollY).toBeGreaterThan(0);
    });
  });
});
