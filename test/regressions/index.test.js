import * as fse from 'fs-extra';
import * as path from 'path';
import * as playwright from 'playwright';

async function main() {
  const baseUrl = 'http://localhost:5000';
  const screenshotDir = path.resolve(__dirname, './screenshots/chrome');

  const browser = await playwright.chromium.launch({
    args: ['--font-render-hinting=none'],
    // otherwise the loaded google Roboto font isn't applied
    headless: false,
  });
  // reuse viewport from `vrtest`
  // https://github.com/nathanmarks/vrtest/blob/1185b852a6c1813cedf5d81f6d6843d9a241c1ce/src/server/runner.js#L44
  const page = await browser.newPage({ viewport: { width: 1000, height: 700 } });

  // Block images since they slow down tests (need download).
  // They're also most likely decorative for documentation demos
  await page.route(/./, async (route, request) => {
    const type = await request.resourceType();
    if (type === 'image') {
      route.abort();
    } else {
      route.continue();
    }
  });

  // Wait for all requests to finish.
  // This should load shared ressources such as fonts.
  await page.goto(`${baseUrl}#no-dev`, { waitUntil: 'networkidle0' });
  // If we still get flaky fonts after awaiting this try `document.fonts.ready`
  await page.waitForSelector('[data-webfontloader="active"]', { state: 'attached' });

  // Simulate portrait mode for date pickers.
  // See `useIsLandscape`.
  await page.evaluate(() => {
    Object.defineProperty(window.screen.orientation, 'angle', {
      get() {
        return 0;
      },
    });
  });

  let routes = await page.$$eval('#tests a', (links) => {
    return links.map((link) => link.href);
  });
  routes = routes.map((route) => route.replace(baseUrl, ''));

  async function renderFixture(index) {
    // Use client-side routing which is much faster than full page navigation via page.goto().
    // Could become an issue with test isolation.
    // If tests are flaky due to global pollution switch to page.goto(route);
    // puppeteers built-in click() times out
    await page.$eval(`#tests li:nth-of-type(${index + 1}) a`, (link) => {
      link.click();
    });
    // Move cursor offscreen to not trigger unwanted hover effects.
    page.mouse.move(0, 0);

    const testcase = await page.waitForSelector('[data-testid="testcase"]:not([aria-busy="true"])');

    return testcase;
  }

  async function takeScreenshot({ testcase, route }) {
    const screenshotPath = path.resolve(screenshotDir, `.${route}.png`);
    await fse.ensureDir(path.dirname(screenshotPath));
    await testcase.screenshot({ path: screenshotPath, type: 'png' });
  }

  // prepare screenshots
  await fse.emptyDir(screenshotDir);

  describe('visual regressions', () => {
    after(async () => {
      await browser.close();
    });

    routes.forEach((route, index) => {
      it(`creates screenshots of ${route}`, async function test() {
        // With the playwright inspector we might want to call `page.pause` which would lead to a timeout.
        if (process.env.PWDEBUG) {
          this.timeout(0);
        }

        const testcase = await renderFixture(index);
        await takeScreenshot({ testcase, route });
      });
    });

    describe('Rating', () => {
      it('should handle focus-visible correctly', async () => {
        const index = routes.findIndex(
          (route) => route === '/regression-Rating/FocusVisibleRating',
        );
        const testcase = await renderFixture(index);
        await page.keyboard.press('Tab');
        await takeScreenshot({ testcase, route: '/regression-Rating/FocusVisibleRating2' });
        await page.keyboard.press('ArrowLeft');
        await takeScreenshot({ testcase, route: '/regression-Rating/FocusVisibleRating3' });
      });

      it('should handle focus-visible with precise ratings correctly', async () => {
        const index = routes.findIndex(
          (route) => route === '/regression-Rating/PreciseFocusVisibleRating',
        );
        const testcase = await renderFixture(index);
        await page.keyboard.press('Tab');
        await takeScreenshot({ testcase, route: '/regression-Rating/PreciseFocusVisibleRating2' });
        await page.keyboard.press('ArrowRight');
        await takeScreenshot({ testcase, route: '/regression-Rating/PreciseFocusVisibleRating3' });
      });
    });

    describe('DateTimePicker', () => {
      it('should handle change in pointer correctly', async () => {
        const index = routes.findIndex(
          (route) => route === '/regression-pickers/UncontrolledDateTimePicker',
        );
        const testcase = await renderFixture(index);

        await page.click('[aria-label="Choose date"]');
        await page.click('[aria-label*="switch to year view"]');
        await takeScreenshot({
          testcase: await page.waitForSelector('[role="dialog"]'),
          route: '/regression-pickers/UncontrolledDateTimePicker-desktop',
        });
        await page.evaluate(() => {
          window.muiTogglePickerMode();
        });
        await takeScreenshot({
          testcase,
          route: '/regression-pickers/UncontrolledDateTimePicker-mobile',
        });
      });
    });
  });

  run();
}

main().catch((error) => {
  // error during setup.
  // Throwing lets mocha hang.
  console.error(error);
  process.exit(1);
});
