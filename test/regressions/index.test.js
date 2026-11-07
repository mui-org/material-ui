import * as url from 'url';
import * as path from 'path';
import * as fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { describe, test as base, afterAll } from 'vitest';
import { recordA11y, WCAG_TAGS, GLOBAL_DISABLED_RULES } from './a11y/axe';
import { CSS_LAYOUT_SUITES, FOCUS_VISIBLE_TARGETS } from './a11y/criteriaSuites';
import { A11Y_RULES, DEFAULT_VIEWPORT, SCREENSHOT_RULES, getConfig, parseRoute } from './demoMeta';
import { RECENT_SEARCHES, stubAlgoliaSearch, unstubAlgoliaSearch } from './algoliaSearchStub';
import { favoriteSearchesKey, QUERY, recentSearchesKey } from './docsearchFixtureData';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const AXE_SCRIPT = path.resolve(currentDirectory, '../../node_modules/axe-core/axe.min.js');

async function main() {
  const baseUrl = 'http://localhost:5001';
  const screenshotDir = path.resolve(currentDirectory, './screenshots/chrome');

  const browser = await chromium.launch({
    args: ['--font-render-hinting=none'],
    // New headless mode of the full Chromium build, so that only Playwright sends input.
    // Under xvfb, a headed browser also gets mouse moves from the X server pointer.
    channel: 'chromium',
    // Keep the scrollbars that Playwright hides in headless mode. They are part of the captures.
    ignoreDefaultArgs: ['--hide-scrollbars'],
  });

  /**
   * Builds a Playwright page wired up for regression testing: viewport,
   * reduced motion, image blocking, navigated to the dev fixture host with
   * fonts loaded and orientation pinned to portrait.
   *
   * @param {import('@playwright/test').Browser} _browser
   * @returns {Promise<import('@playwright/test').Page>}
   */
  async function newTestPage(_browser) {
    // Viewport is set per-acquisition in the `pooled` fixture (reset to
    // DEFAULT_VIEWPORT) and per-route in the screenshot loop, so it's not set
    // here. Default sizing reused from `vrtest`:
    // https://github.com/nathanmarks/vrtest/blob/1185b852a6c1813cedf5d81f6d6843d9a241c1ce/src/server/runner.js#L44
    const page = await _browser.newPage({
      reducedMotion: 'reduce',
      // Pin the timezone so the frozen `Date` (see `index.html`) renders the
      // same instant regardless of the CI machine's local timezone.
      timezoneId: 'UTC',
    });

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

    // Wait for all requests to finish. That covers the font stylesheet too --
    // `loadFonts` appends it during module evaluation -- so a stalled font host
    // fails here instead of hanging every test.
    await page.goto(`${baseUrl}#dev`, { waitUntil: 'networkidle0' });

    // Simulate portrait mode for date pickers.
    // See `useIsLandscape`.
    await page.evaluate(() => {
      Object.defineProperty(window.screen.orientation, 'angle', {
        get() {
          return 0;
        },
      });
    });

    return page;
  }

  const pool = createPagePool(() => newTestPage(browser));

  // prepare screenshots
  await fs.rm(screenshotDir, { recursive: true, force: true });
  await fs.mkdir(screenshotDir, { recursive: true });

  const probePage = await pool.acquire();
  // React renders the nav, so wait for it: `$$eval` returns [] when it is
  // missing, which registers zero route tests and still passes.
  await probePage.waitForSelector('#tests a', { state: 'attached' });
  let routes = await probePage.$$eval('#tests a', (links) => {
    return links.map((link) => link.href);
  });
  routes = routes.map((route) => route.replace(baseUrl, ''));
  const reactMajor = Number(
    (await probePage.evaluate(() => window.muiFixture.reactVersion)).split('.')[0],
  );
  pool.release(probePage);

  const test = base.extend({
    // eslint-disable-next-line no-empty-pattern
    pooled: async ({}, use) => {
      const page = await pool.acquire();
      // Reset per-acquisition state. Pages are pooled and reused, so a prior
      // test may have left a different viewport (route tests set per-route
      // widths below); start every test from the default so tests that don't
      // set their own viewport (the dedicated blocks at the bottom) are
      // deterministic.
      await page.setViewportSize(DEFAULT_VIEWPORT);
      await page.evaluate(() => {
        localStorage.clear();
      });
      try {
        // `use` here is the vitest fixture callback, not a React hook.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await use({ page });
      } finally {
        pool.release(page);
      }
    },
  });

  const axeSource = await fs.readFile(AXE_SCRIPT, 'utf8');

  /**
   * @param {import('@playwright/test').Page} page
   * @param {string} route
   */
  async function renderFixture(page, route) {
    // Screenshots taken with fallback faces look like a repo-wide text rendering
    // change. Gate here so it happens before the fixture mounts -- components
    // that measure text at mount would otherwise bake in fallback metrics that
    // the later font swap does not recompute.
    await page.evaluate(() => window.muiFixture.fontsReady);

    await page.evaluate((_route) => {
      // Use client-side routing which is much faster than full page navigation via page.goto().
      window.muiFixture.navigate(`${_route}#no-dev`);

      // Playwright hides scrollbar when capturing a screenshot on an element or with fullPage: true.
      // When the body has a scrollbar, this causes a brief layout shift. Disable the body overflow
      // altogether to prevent this
      window.document.body.style.overflow = 'hidden';
    }, route);

    // Move cursor offscreen to not trigger unwanted hover effects.
    await page.mouse.move(0, 0);

    const testcase = await page.waitForSelector(
      `[data-testid="testcase"][data-testpath="${route}"]:not([aria-busy="true"])`,
    );

    // `aria-busy` covers fonts, not images. The route handler aborts every
    // image request, and components like Avatar only swap to their fallback
    // after the error event triggers a re-render -- strictly later than the
    // busy flip, so under CI contention the screenshot can catch the pending
    // <img>: blank where every baseline has the settled fallback. Wait for
    // each image to settle, then two frames so React commits the swap the
    // load/error event scheduled.
    await testcase.evaluate(async (element) => {
      await Promise.all(
        Array.from(element.querySelectorAll('img'), (img) => {
          if (img.complete) {
            return undefined;
          }
          return new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
          });
        }),
      );
      await new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      });
    });

    return testcase;
  }

  async function takeScreenshot(page, { testcase, route }) {
    const screenshotPath = path.resolve(screenshotDir, `.${route}.png`);
    await fs.mkdir(path.dirname(screenshotPath), { recursive: true });

    const explicitScreenshotTarget = await page.$('[data-testid="screenshot-target"]');
    const screenshotTarget = explicitScreenshotTarget || testcase;

    await screenshotTarget.screenshot({
      path: screenshotPath,
      type: 'png',
      animations: 'disabled',
    });
  }

  describe('visual regressions', () => {
    afterAll(async () => {
      await pool.closeAll();
      await browser.close();
    });

    describe.concurrent('routes', () => {
      routes.forEach((route) => {
        const parsed = parseRoute(route);
        const screenshotRule = parsed ? getConfig(SCREENSHOT_RULES, parsed.path) : undefined;
        const a11yRule = parsed ? getConfig(A11Y_RULES, parsed.path) : undefined;
        const meetsReactFloor = reactMajor >= (screenshotRule?.minReactMajor ?? 0);
        const runScreenshot = parsed ? (screenshotRule?.enabled ?? true) && meetsReactFloor : true;
        const runA11y = a11yRule?.enabled === true;
        if (!runScreenshot && !runA11y) {
          return;
        }

        let action;
        if (runA11y && runScreenshot) {
          action = 'creates screenshots and runs a11y on';
        } else if (runA11y) {
          action = 'runs a11y on';
        } else {
          action = 'creates screenshots of';
        }

        test(
          `${action} ${route}`,
          { timeout: process.env.PWDEBUG ? 0 : undefined },
          async ({ pooled, task }) => {
            const { page } = pooled;
            // Apply the per-route viewport width before rendering so the
            // composite renders at its desktop breakpoint. Only the width
            // varies per rule (the screenshot captures the testcase element's
            // full height regardless); the height stays at the default. The
            // `pooled` fixture already reset the page to DEFAULT_VIEWPORT, so
            // only override when a rule actually sets a width — saves a CDP
            // round-trip on the vast majority of routes.
            if (typeof screenshotRule?.viewportWidth === 'number') {
              await page.setViewportSize({
                width: screenshotRule.viewportWidth,
                height: DEFAULT_VIEWPORT.height,
              });
            }
            const testcase = await renderFixture(page, route);

            // Scope the wait to the route's testcase element: pooled pages
            // keep the previous route's DOM around briefly, so a page-global
            // selector could match a leftover fixture instead of this one.
            if (screenshotRule?.waitForSelector) {
              await testcase.waitForSelector(screenshotRule.waitForSelector);
            }

            // Run axe before the screenshot (if any) so it observes the natural
            // DOM — Playwright's `animations: 'disabled'` injects inline
            // `!important` styles that otherwise perturb rule applicability.
            if (runA11y) {
              // Inject axe fresh each run — page.addScriptTag can leak between navigations.
              await page.evaluate(axeSource);
              const results = await page.evaluate(
                async ({ element, disabledRules, tags }) => {
                  window.axe.configure({
                    rules: disabledRules.map((id) => ({ id, enabled: false })),
                  });
                  return window.axe.run(element, {
                    runOnly: { type: 'tag', values: tags },
                  });
                },
                { element: testcase, disabledRules: GLOBAL_DISABLED_RULES, tags: WCAG_TAGS },
              );
              recordA11y({ task }, results, {
                slug: parsed.slug,
                demo: parsed.demo,
                assertions: a11yRule.assertions,
                skipAssertions: a11yRule.skipAssertions,
              });
            }

            if (runScreenshot) {
              await takeScreenshot(page, { testcase, route });
            }
          },
        );
      });
    });

    describe('Rating', () => {
      test('should handle focus-visible correctly', async ({ pooled }) => {
        const { page } = pooled;
        const testcase = await renderFixture(page, '/regression-Rating/FocusVisibleRating');
        await page.keyboard.press('Tab');
        await takeScreenshot(page, {
          testcase,
          route: '/regression-Rating/FocusVisibleRating2',
        });
        await page.keyboard.press('ArrowLeft');
        await takeScreenshot(page, {
          testcase,
          route: '/regression-Rating/FocusVisibleRating3',
        });
      });

      test('should handle focus-visible with precise ratings correctly', async ({ pooled }) => {
        const { page } = pooled;
        const testcase = await renderFixture(page, '/regression-Rating/PreciseFocusVisibleRating');
        await page.keyboard.press('Tab');
        await takeScreenshot(page, {
          testcase,
          route: '/regression-Rating/PreciseFocusVisibleRating2',
        });
        await page.keyboard.press('ArrowRight');
        await takeScreenshot(page, {
          testcase,
          route: '/regression-Rating/PreciseFocusVisibleRating3',
        });
      });
    });

    describe.each(['SearchModal', 'SearchModalDark'])('AppSearch/%s', (fixture) => {
      // The route belongs in the name so the `-t` filter documented in
      // `AGENTS.md` reaches this test. Without it a scoped run refreshes only
      // the closed-button capture the route loop generates, and leaves the
      // three below stale.
      test(`should render /regression-AppSearch/${fixture} correctly`, async ({ pooled }) => {
        const { page } = pooled;
        // Seed from here rather than from the fixture. The `pooled` fixture
        // clears storage on acquisition, and navigating to a route the pooled
        // page already rendered does not remount it, so a seed written on mount
        // would be gone by the time the modal reads it.
        await page.evaluate(
          ([key, favoriteKey, hits]) => {
            localStorage.setItem(key, JSON.stringify(hits));
            localStorage.setItem(favoriteKey, '[]');
          },
          [recentSearchesKey, favoriteSearchesKey, RECENT_SEARCHES],
        );
        await renderFixture(page, `/regression-AppSearch/${fixture}`);
        // The modal portals to `document.body`, so it lands outside the
        // testcase element and has to be screenshotted on its own.
        await page.getByRole('button', { name: /search/i }).click();
        const modal = await page.waitForSelector('.DocSearch-Modal');
        // `useLazyCSS` fetches the DocSearch stylesheet and injects it as a
        // `<style data-href>`. Without it the modal is unstyled.
        await page.waitForFunction(() =>
          Boolean(document.querySelector('style[data-href*="docsearch"]')),
        );
        // Neither of the waits above says anything about the two areas this
        // screenshot is for. The stylesheet request starts when `AppSearch`
        // mounts, well before the modal opens, so that wait can already be
        // satisfied. The stored searches arrive through autocomplete's async
        // source pipeline, and the custom start screen is portalled in from an
        // effect. Wait for one sentinel from each.
        await page.waitForSelector('.DocSearch-Modal .DocSearch-Hit');
        await page.waitForSelector('.DocSearch-Modal .DocSearch-NewStartScreenItem');
        // Rank `docsearch` below `mui`, the way the layer order that
        // `BrandingCssVarsProvider` declares does in the docs. Without it the
        // DocSearch stylesheet wins and none of the `AppSearch` overrides
        // apply. It has to happen here rather than in the fixture: a layer's
        // position is fixed by where it is first named, emotion prepends its
        // tags above everything in `<head>`, and it keeps doing so as
        // components mount — so the only stable point is once the modal has
        // finished rendering.
        //
        // It only inserts `docsearch`: `mui` already ranks first here, because
        // emotion prepends its tags above the bundle stylesheet and outranks the
        // order `global.css` declares. Every other layer keeps its position.
        try {
          await page.evaluate(() => {
            const style = document.createElement('style');
            style.id = 'docsearch-layer-order';
            style.textContent = '@layer docsearch, mui;';
            document.head.prepend(style);
          });
          await takeScreenshot(page, {
            testcase: modal,
            route: `/regression-AppSearch/${fixture}Open`,
          });

          // The results screen carries the markup the start screen never shows:
          // highlighted matches, breadcrumbs, and the tree connector between a
          // section and its children.
          await stubAlgoliaSearch(page);
          await page.locator('.DocSearch-Input').fill(QUERY);
          await page.waitForSelector('.DocSearch-Hit mark');
          await takeScreenshot(page, {
            testcase: modal,
            route: `/regression-AppSearch/${fixture}Results`,
          });

          // Below 768px DocSearch lets the hit title and path wrap. Cropping to
          // the modal does not reach that rule -- media queries read the
          // viewport -- so the width has to change. 767px keeps the modal at
          // the same width our `max-width` override gives it on desktop, which
          // leaves the typography as the only thing that differs. The `pooled`
          // fixture resets the viewport on acquisition, so this does not leak.
          await page.setViewportSize({ width: 767, height: DEFAULT_VIEWPORT.height });
          await page.waitForFunction(() => window.matchMedia('(max-width: 768px)').matches);
          await takeScreenshot(page, {
            testcase: modal,
            route: `/regression-AppSearch/${fixture}ResultsNarrow`,
          });
        } finally {
          // Pages are pooled and only the viewport and storage are reset between
          // tests, so undo the rest ourselves. The layer declaration is inert for
          // fixtures that put nothing in `docsearch`, but leaving it behind makes
          // their layer order depend on which test ran first.
          await unstubAlgoliaSearch(page);
          await page.evaluate(() => {
            document.getElementById('docsearch-layer-order')?.remove();
          });
        }
      });
    });

    describe('Autocomplete', () => {
      test('should not close immediately when textbox expands', async ({ pooled }) => {
        const { page } = pooled;
        const testcase = await renderFixture(
          page,
          '/regression-Autocomplete/TextboxExpandsOnListboxOpen',
        );
        await page.getByRole('combobox').click();
        await page.waitForTimeout(10);
        await takeScreenshot(page, {
          testcase,
          route: '/regression-Autocomplete/TextboxExpandsOnListboxOpen2',
        });
      });

      test('should style virtualized listbox correctly', async ({ pooled }) => {
        const { page } = pooled;
        const testcase = await renderFixture(page, '/regression-Autocomplete/Virtualize');
        await page.getByRole('combobox').click();
        await takeScreenshot(page, { testcase, route: '/regression-Autocomplete/Virtualize2' });
        await page.hover('[role="option"]');
        await takeScreenshot(page, { testcase, route: '/regression-Autocomplete/Virtualize3' });
        await page.click('[role="option"]');
        await takeScreenshot(page, { testcase, route: '/regression-Autocomplete/Virtualize4' });
      });
    });

    describe('Switch', () => {
      test('should render standard variant correctly in forced-colors mode', async ({ pooled }) => {
        const { page } = pooled;
        await page.emulateMedia({ forcedColors: 'active' });
        try {
          const testcase = await renderFixture(page, '/regression-Switch/SimpleSwitch');
          await takeScreenshot(page, {
            testcase,
            route: '/regression-Switch/SimpleSwitchForcedColors',
          });
        } finally {
          await page.emulateMedia({ forcedColors: 'none' });
        }
      });
    });

    describe('theme.focusVisible ring', () => {
      // The FocusVisible fixtures render already focus-visible, so the standard screenshot loop
      // above captures the ring. Only the forced-colors variant needs Playwright here.
      test('keeps the outline ring visible in forced-colors mode', async ({ pooled }) => {
        const { page } = pooled;
        await page.emulateMedia({ forcedColors: 'active' });
        try {
          const testcase = await renderFixture(page, '/regression-FocusVisible/InsetControls');
          await takeScreenshot(page, {
            testcase,
            route: '/regression-FocusVisible/InsetControlsForcedColors',
          });
        } finally {
          await page.emulateMedia({ forcedColors: 'none' });
        }
      });
    });

    describe('TextField', () => {
      test('should render standard variant correctly in forced-colors mode', async ({ pooled }) => {
        const { page } = pooled;
        await page.emulateMedia({ forcedColors: 'active' });
        try {
          const testcase = await renderFixture(page, '/regression-TextField/StandardTextField');
          await takeScreenshot(page, {
            testcase,
            route: '/regression-TextField/StandardTextFieldForcedColors',
          });
        } finally {
          await page.emulateMedia({ forcedColors: 'none' });
        }
      });
    });

    describe('Textarea', () => {
      test('should keep input caret position at the end when adding a newline', async ({
        pooled,
      }) => {
        const { page } = pooled;
        await renderFixture(page, '/regression-Textarea/TextareaAutosize');
        await page.getByTestId('input').focus();

        const textWithEndline = `abc def abc def abc def\n`;
        await page.evaluate((text) => {
          navigator.clipboard.writeText(text);
        }, textWithEndline);

        const pasteCommand = process.platform === 'darwin' ? 'Meta+V' : 'Control+V';

        await page.keyboard.press(pasteCommand);
        await page.keyboard.press(pasteCommand);
        await page.keyboard.press(pasteCommand);

        await page.evaluate(() => {
          const textarea = document.querySelector('textarea');
          if (textarea.selectionStart !== textarea.value.length) {
            throw new Error('The caret is not at the end of the textarea');
          }
        });
      });
    });
    describe('Chip', () => {
      // A tripwire for the text-only resize limitation (1.4.4) and the 1.4.10 and
      // 1.4.12 gaps: the label does not wrap, so text that fits ends with an ellipsis. When
      // this fails, Chip wraps its label: update Chip/accessibility.md and knownGaps.json.
      const ROUTE = '/a11y-chips/ChipA11yLongLabel';
      const truncated = (page, index) =>
        page.evaluate((i) => {
          const label = document.querySelectorAll('.MuiChip-label')[i];
          return label.scrollWidth > label.clientWidth + 1;
        }, index);
      const whiteSpace = (page, index) =>
        page.evaluate(
          (i) => getComputedStyle(document.querySelectorAll('.MuiChip-label')[i]).whiteSpace,
          index,
        );

      test('known gap: a label that fits at 100% is truncated at 200% text-only resize and with WCAG text spacing', async ({
        pooled,
      }) => {
        const { page } = pooled;
        await renderFixture(page, ROUTE);
        if (await truncated(page, 0)) {
          throw new Error('ChipA11yLongLabel no longer fits at 100%; pick a shorter label');
        }
        // The spacing step has about 5 px of margin, so also pin the cause: the label does not wrap.
        if ((await whiteSpace(page, 0)) !== 'nowrap') {
          throw new Error('Chip label can wrap now; the gap may be fixed');
        }
        for (const css of [
          'html { font-size: 200% !important; }',
          '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }',
        ]) {
          // eslint-disable-next-line no-await-in-loop
          const style = await page.addStyleTag({ content: css });
          // eslint-disable-next-line no-await-in-loop
          if (!(await truncated(page, 0))) {
            throw new Error(`Chip label no longer truncates with ${css}; the gap may be fixed`);
          }
          // eslint-disable-next-line no-await-in-loop
          await style.evaluate((node) => node.remove());
        }
      });

      test('known gap: a label that fits a wide viewport is truncated at 320 CSS px', async ({
        pooled,
      }) => {
        const { page } = pooled;
        await renderFixture(page, ROUTE);
        if (await truncated(page, 1)) {
          throw new Error('ChipA11yLongLabel no longer fits at the default viewport');
        }
        await page.setViewportSize({ width: 320, height: 512 });
        try {
          await renderFixture(page, ROUTE);
          if (!(await truncated(page, 1))) {
            throw new Error('Chip label no longer truncates at 320 CSS px; the gap may be fixed');
          }
        } finally {
          await page.setViewportSize(DEFAULT_VIEWPORT);
        }
      });
    });

    describe('Avatar', () => {
      // Deterministic clip check for 1.4.12 Text Spacing, which axe cannot cover.
      // Renders `LetterAvatars` and targets the two-character ("OP") avatar,
      // whose fixed 40px box with `overflow: hidden` is the only clipping risk.
      test('1.4.12 Text Spacing: initials stay visible under the WCAG overrides', async ({
        pooled,
      }) => {
        const { page } = pooled;
        await renderFixture(page, '/docs-components-avatars/LetterAvatars');
        const clipped = await page.evaluate(() => {
          const style = document.createElement('style');
          style.textContent =
            '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }';
          document.head.appendChild(style);
          const avatar = Array.from(document.querySelectorAll('.MuiAvatar-root')).find(
            (node) => node.textContent === 'OP',
          );
          if (!avatar) {
            throw new Error('LetterAvatars no longer renders an "OP" avatar');
          }
          const range = document.createRange();
          range.selectNodeContents(avatar);
          const text = range.getBoundingClientRect();
          const box = avatar.getBoundingClientRect();
          style.remove();
          return (
            text.left < box.left - 0.5 ||
            text.right > box.right + 0.5 ||
            text.top < box.top - 0.5 ||
            text.bottom > box.bottom + 0.5
          );
        });
        if (clipped) {
          throw new Error('Avatar initials are clipped under WCAG text-spacing overrides');
        }
      });
    });

    registerCssLayoutSuites({ test, renderFixture, routes });
    registerFocusVisibleSuites({ test, renderFixture, routes });
  });
}

/**
 * Registers the CSS-dependent WCAG criteria that axe cannot cover: they need a
 * real layout at a real viewport. Kept out of `main` so the suite can be
 * introduced independently of the harness it runs on.
 */
function registerCssLayoutSuites({ test, renderFixture, routes }) {
  /**
   * Reports the document's horizontal overflow after applying `css`, plus any
   * element whose own content escapes its box. Both are the failure modes the
   * reflow, resize-text, and text-spacing criteria care about.
   */
  async function measureOverflow(page, css) {
    return page.evaluate((styleText) => {
      const style = document.createElement('style');
      style.textContent = styleText;
      document.head.appendChild(style);

      // Force layout before measuring.
      void document.documentElement.offsetHeight;

      const root = document.documentElement;
      const horizontalOverflow = root.scrollWidth - root.clientWidth;

      // These criteria are about losing *text*, so only elements that hide
      // overflow and actually render text count. Measuring the text range
      // rather than scrollWidth avoids flagging boxes that deliberately clip
      // decoration — a Switch root clipping its ripple loses no content.
      const clipped = Array.from(document.querySelectorAll('[class*="Mui"]'))
        .filter((node) => {
          const { overflowX, overflowY, visibility, display } = window.getComputedStyle(node);
          if (overflowX !== 'hidden' && overflowY !== 'hidden') {
            return false;
          }
          // Deliberately hidden content — a collapsed Accordion panel — is not
          // clipped content: these criteria are about what is on screen.
          if (visibility === 'hidden' || display === 'none') {
            return false;
          }
          const box = node.getBoundingClientRect();
          if (box.width === 0 || box.height === 0) {
            return false;
          }
          return node.textContent.trim() !== '';
        })
        .filter((node) => {
          const range = document.createRange();
          range.selectNodeContents(node);
          const text = range.getBoundingClientRect();
          const box = node.getBoundingClientRect();
          return (
            text.left < box.left - 0.5 ||
            text.right > box.right + 0.5 ||
            text.top < box.top - 0.5 ||
            text.bottom > box.bottom + 0.5
          );
        })
        .map((node) => node.getAttribute('class'));

      style.remove();
      return { horizontalOverflow, clipped: clipped.slice(0, 3) };
    }, css);
  }

  const TEXT_SPACING_CSS =
    '* { line-height: 1.5 !important; letter-spacing: 0.12em !important;' +
    ' word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }';

  CSS_LAYOUT_SUITES.forEach(({ component, route, skipCriteria = [] }) => {
    // A slug only enters the demo bundle once its component is enrolled, so skip
    // entries this build doesn't contain rather than waiting for a fixture that
    // was never bundled.
    if (!routes.includes(route)) {
      // The slug enters the bundle only when its component enrolls (see fixtures.js).
      describe(`${component} layout criteria`, () => {
        test.skip(`route not bundled: ${route}`, () => {});
      });
      return;
    }
    const covers = (criterion) => !skipCriteria.includes(criterion);

    describe(`${component} layout criteria`, () => {
      test.runIf(covers('1.4.10'))(
        '1.4.10 Reflow: no horizontal scrolling at 320 CSS pixels',
        async ({ pooled }) => {
          const { page } = pooled;
          await page.setViewportSize({ width: 320, height: 512 });
          try {
            await renderFixture(page, route);
            const { horizontalOverflow } = await measureOverflow(page, '');
            if (horizontalOverflow > 1) {
              throw new Error(
                `${component} overflows horizontally by ${horizontalOverflow}px at 320px wide`,
              );
            }
          } finally {
            await page.setViewportSize(DEFAULT_VIEWPORT);
          }
        },
      );

      test.runIf(covers('1.4.4'))(
        '1.4.4 Resize Text: content survives a 200% text size',
        async ({ pooled }) => {
          const { page } = pooled;
          await renderFixture(page, route);
          const { horizontalOverflow, clipped } = await measureOverflow(
            page,
            'html { font-size: 200% !important; }',
          );
          if (horizontalOverflow > 1) {
            throw new Error(
              `${component} overflows horizontally by ${horizontalOverflow}px at 200% text size`,
            );
          }
          if (clipped.length > 0) {
            throw new Error(`${component} clips its own content at 200%: ${clipped.join(', ')}`);
          }
        },
      );

      test.runIf(covers('1.4.12'))(
        '1.4.12 Text Spacing: content survives the WCAG spacing overrides',
        async ({ pooled }) => {
          const { page } = pooled;
          await renderFixture(page, route);
          const { horizontalOverflow, clipped } = await measureOverflow(page, TEXT_SPACING_CSS);
          if (horizontalOverflow > 1) {
            throw new Error(
              `${component} overflows horizontally by ${horizontalOverflow}px under the` +
                ' WCAG text-spacing overrides',
            );
          }
          if (clipped.length > 0) {
            throw new Error(
              `${component} clips its own content under the WCAG text-spacing overrides:` +
                ` ${clipped.join(', ')}`,
            );
          }
        },
      );
    });
  });
}

/**
 * Registers 2.4.7 Focus Visible, which axe has no rule for and jsdom cannot
 * answer: several components carry a `skipIf(isJsdom())` unit test for it that
 * therefore never runs.
 *
 * The check is a pixel comparison rather than a computed-style diff because
 * MUI's focus indicator is usually the ripple — a child element that appears in
 * the DOM. Diffing styles on the control itself would miss it entirely.
 *
 * The `KeyboardRing` fixture repeats the check with `focusVisible: true` and
 * the ripple disabled. There the outline ring is the only possible pixel
 * change, so the themed variant asserts the ring itself.
 */
function registerFocusVisibleSuites({ test, renderFixture, routes }) {
  // TextField is absent: it has no ring, and the demo suite above already
  // covers its border-change indicator. Every Button variant is a target: the
  // fixture suppresses the contained focus shadow, so each variant passes only
  // through the ring.
  const RING_ROUTE = '/regression-FocusVisible/KeyboardRing';
  const FOCUS_RING_TARGETS = [
    { component: 'AccordionSummary', route: RING_ROUTE, selector: '.MuiAccordionSummary-root' },
    { component: 'Button (text)', route: RING_ROUTE, selector: '.MuiButton-text' },
    { component: 'Button (outlined)', route: RING_ROUTE, selector: '.MuiButton-outlined' },
    { component: 'Button (contained)', route: RING_ROUTE, selector: '.MuiButton-contained' },
    { component: 'Checkbox', route: RING_ROUTE, selector: '.MuiCheckbox-root' },
    { component: 'Chip', route: RING_ROUTE, selector: '.MuiChip-clickable' },
    { component: 'Radio', route: RING_ROUTE, selector: '.MuiRadio-root' },
    { component: 'Switch', route: RING_ROUTE, selector: '.MuiSwitch-root' },
    { component: 'ToggleButton', route: RING_ROUTE, selector: '.MuiToggleButton-root' },
  ];

  /** An outline or ring can paint outside the control, so capture a padded box. */
  const PADDING = 8;

  async function shotAround(page, handle) {
    const box = await handle.boundingBox();
    return page.screenshot({
      animations: 'disabled',
      clip: {
        x: Math.max(0, box.x - PADDING),
        y: Math.max(0, box.y - PADDING),
        width: box.width + PADDING * 2,
        height: box.height + PADDING * 2,
      },
    });
  }

  /** Tab until the target (or something inside it) holds focus. */
  async function tabTo(page, selector, maxTabs) {
    for (let attempt = 0; attempt < maxTabs; attempt += 1) {
      // eslint-disable-next-line no-await-in-loop
      await page.keyboard.press('Tab');
      // eslint-disable-next-line no-await-in-loop
      const reached = await page.evaluate(
        (target) => document.activeElement?.closest(target) !== null,
        selector,
      );
      if (reached) {
        return true;
      }
    }
    return false;
  }

  function registerTarget({ component, route, selector }, title, maxTabs) {
    if (!routes.includes(route)) {
      return;
    }

    test(`${component} ${title}`, async ({ pooled }) => {
      const { page } = pooled;
      const testcase = await renderFixture(page, route);
      const handle = await testcase.$(selector);
      if (!handle) {
        throw new Error(`${component}: no element matched ${selector} on ${route}`);
      }

      const unfocused = await shotAround(page, handle);
      if (!(await tabTo(page, selector, maxTabs))) {
        throw new Error(`${component}: could not reach ${selector} with the Tab key`);
      }
      const focused = await shotAround(page, handle);

      if (unfocused.equals(focused)) {
        throw new Error(
          `${component} looks identical focused and unfocused — no visible focus indicator`,
        );
      }
    });
  }

  FOCUS_VISIBLE_TARGETS.forEach((target) => {
    // Demo pages render tabbable elements this list does not know about, so
    // the tab budget is a fixed allowance.
    registerTarget(target, '2.4.7 Focus Visible: keyboard focus changes how the control looks', 12);
  });
  FOCUS_RING_TARGETS.forEach((target) => {
    // Every tab stop in the KeyboardRing fixture is a target, so the target
    // count bounds how far the target can sit from the start of the page.
    registerTarget(
      target,
      '2.4.7 Focus Visible: keyboard focus paints the theme.focusVisible ring',
      FOCUS_RING_TARGETS.length,
    );
  });
}

function createPagePool(factory) {
  const all = new Set();
  const available = [];

  return {
    async acquire() {
      const existing = available.shift();
      if (existing) {
        return existing;
      }
      const page = await factory();
      all.add(page);
      return page;
    },
    release(page) {
      available.push(page);
    },
    async closeAll() {
      const pages = Array.from(all);
      all.clear();
      available.length = 0;
      await Promise.all(pages.map((page) => page.close()));
    },
  };
}

await main();
