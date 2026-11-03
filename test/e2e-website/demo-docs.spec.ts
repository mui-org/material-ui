import { test as base, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import type { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

const validationPage = '/experiments/docs/live-edit-validation/';
const WEBSITE_ORIGIN = new URL(process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://mui.com').origin;

function getDemo(page: Page, anchor: string) {
  return page.locator(`#${anchor}`).locator('..');
}

async function getSelectedFileEditor(demo: Locator) {
  const editor = demo.locator('textarea');
  if ((await editor.count()) === 0) {
    await demo.getByRole('group', { name: 'Editable code' }).click();
  }
  await editor.waitFor();
  return editor;
}

async function editSelectedFile(demo: Locator, update: (source: string) => string) {
  const editor = await getSelectedFileEditor(demo);
  await editor.fill(update(await editor.inputValue()));
}

// Clicks can land before the demo preview hydrates and get lost; retry until the effect shows.
async function clickForEffect(target: Locator, expectation: () => Promise<void>) {
  await expect(async () => {
    await target.click();
    await expectation();
  }).toPass({ timeout: 15_000 });
}

test.describe('Demo docs', () => {
  test('mode toggle demos should work', async ({ page }) => {
    await page.goto('/experiments/docs/demos/');

    await expect(page.locator('div:has(> [data-element="demo-mode-toggle-paper"])')).toHaveClass(
      /light/,
    );
    await expect(page.locator('[data-element="demo-mode-toggle-paper"]')).toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)',
    );

    // Toggle dark mode
    await clickForEffect(
      page.getByRole('radiogroup', { name: /^demo-mode-toggle$/ }).locator('label:nth-child(3)'),
      async () => {
        await expect(
          page.locator('div:has(> [data-element="demo-mode-toggle-paper"])'),
        ).toHaveClass(/dark/, { timeout: 2000 });
        await expect(page.locator('[data-element="demo-mode-toggle-paper"]')).toHaveCSS(
          'background-color',
          'rgb(18, 18, 18)',
          { timeout: 2000 },
        );
      },
    );
  });

  test('mode toggle custom theme demos should work', async ({ page }) => {
    await page.goto('/experiments/docs/demos/');

    await expect(
      page.locator('div:has(> [data-element="demo-mode-toggle-custom-theme-paper"])'),
    ).toHaveClass(/light/);
    await expect(page.locator('[data-element="demo-mode-toggle-custom-theme-paper"]')).toHaveCSS(
      'background-color',
      'rgb(239, 154, 154)',
    );

    // Toggle dark mode
    await clickForEffect(
      page
        .getByRole('radiogroup', { name: /^demo-mode-toggle-custom-theme$/ })
        .locator('label:nth-child(3)'),
      async () => {
        await expect(
          page.locator('div:has(> [data-element="demo-mode-toggle-custom-theme-paper"])'),
        ).toHaveClass(/dark/, { timeout: 2000 });
        await expect(
          page.locator('[data-element="demo-mode-toggle-custom-theme-paper"]'),
        ).toHaveCSS('background-color', 'rgb(183, 28, 28)', { timeout: 2000 });
      },
    );
  });

  test('mode toggle iframe demos should work', async ({ page }) => {
    await page.goto('/experiments/docs/demos/');

    const iframe = page.locator('iframe[title*="Mode Toggle Iframe"]').contentFrame();

    await expect(iframe.locator('html')).toHaveClass(/light/);
    await expect(iframe.locator('[data-element="demo-mode-toggle-iframe-paper"]')).toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)',
    );

    // Toggle dark mode
    await clickForEffect(
      iframe
        .getByRole('radiogroup', { name: /^demo-mode-toggle-iframe$/ })
        .locator('label:nth-child(3)'),
      async () => {
        await expect(iframe.locator('html')).toHaveClass(/dark/, { timeout: 2000 });
        await expect(iframe.locator('[data-element="demo-mode-toggle-iframe-paper"]')).toHaveCSS(
          'background-color',
          'rgb(18, 18, 18)',
          { timeout: 2000 },
        );
      },
    );
  });

  test.describe('live edit validation', () => {
    test('updates focused, extra TypeScript, and CSS module source', async ({ page }) => {
      await page.goto(validationPage);
      const demo = getDemo(page, 'FocusedLiveEdit');

      const editor = await getSelectedFileEditor(demo);
      await expect(editor).toHaveCSS('font-family', /Menlo/);
      await expect(editor).toHaveCSS('padding-top', '16px');
      await expect(editor).toHaveValue(/^<span/);
      await expect(demo.locator('pre [class*="pl-"]').first()).toBeAttached();
      await editor.fill(
        (await editor.inputValue()).replace("getMessage('Ready')", "getMessage('Edited')"),
      );
      await expect(page.getByTestId('focused-message')).toHaveText('Edited helper');

      await demo.locator('button[data-ga-event-action="expand"]').click();
      await expect(page.getByTestId('focused-message')).toHaveText('Ready helper');
      await editSelectedFile(demo, (source) =>
        source.replace("getMessage('Ready')", "getMessage('Edited')"),
      );
      await demo.getByRole('tab', { name: 'message.ts' }).click();
      await editSelectedFile(demo, (source) => source.replace('helper', 'module'));
      await expect(page.getByTestId('focused-message')).toHaveText('Edited module');

      await demo.getByRole('tab', { name: 'FocusedLiveEdit.module.css' }).click();
      await editSelectedFile(demo, (source) => source.replace('rgb(20 70 120)', 'rgb(120 40 20)'));
      await expect(page.getByTestId('focused-preview')).toHaveCSS('color', 'rgb(120, 40, 20)');
    });

    test('expansion discards edits from every file', async ({ page }) => {
      await page.goto(validationPage);
      const demo = getDemo(page, 'FocusedLiveEdit');
      const sourceToggle = demo.locator('button[data-ga-event-action="expand"]');

      await sourceToggle.click();
      await editSelectedFile(demo, (source) =>
        source.replace("getMessage('Ready')", "getMessage('Edited')"),
      );
      await demo.getByRole('tab', { name: 'message.ts' }).click();
      await editSelectedFile(demo, (source) => source.replace('helper', 'module'));
      await demo.getByRole('tab', { name: 'FocusedLiveEdit.module.css' }).click();
      await editSelectedFile(demo, (source) => source.replace('rgb(20 70 120)', 'rgb(120 40 20)'));

      await sourceToggle.click(); // Collapse without resetting edits.
      await sourceToggle.click(); // Re-expansion resets every file.
      await expect(page.getByTestId('focused-message')).toHaveText('Ready helper');
      await expect(page.getByTestId('focused-preview')).toHaveCSS('color', 'rgb(20, 70, 120)');

      await demo.getByRole('tab', { name: 'FocusedLiveEdit.tsx' }).click();
      await expect(await getSelectedFileEditor(demo)).toHaveValue(
        /\n {6}<span data-testid="focused-message"/,
      );
      await demo.getByRole('tab', { name: 'message.ts' }).click();
      await expect(await getSelectedFileEditor(demo)).toHaveValue(/helper/);
    });

    test('reset remounts component state', async ({ page }) => {
      await page.goto(validationPage);
      const demo = getDemo(page, 'FocusedLiveEdit');

      await clickForEffect(page.getByTestId('focused-count'), async () => {
        await expect(page.getByTestId('focused-count')).toHaveText(/Count: [1-9]/, {
          timeout: 2000,
        });
      });
      await demo.getByRole('button', { name: 'Reset demo' }).click();
      await expect(page.getByTestId('focused-count')).toHaveText('Count: 0');
    });

    test('delays errors, keeps the last good preview, and recovers', async ({ page }) => {
      await page.goto(validationPage);
      const demo = getDemo(page, 'FocusedLiveEdit');

      await editSelectedFile(demo, (source) =>
        source.replace("getMessage('Ready')", "getMessage('Last good')"),
      );
      await expect(page.getByTestId('focused-message')).toHaveText('Last good helper');

      await editSelectedFile(demo, (source) =>
        source.replace(
          "{getMessage('Last good')}",
          "{(() => { throw new Error('controlled failure'); })()}",
        ),
      );
      await page.waitForTimeout(250);
      await expect(demo.getByRole('alert')).toHaveCount(0);
      await expect(demo.getByRole('alert')).toContainText('controlled failure');
      await expect(page.getByTestId('focused-message')).toHaveText('Last good helper');

      await editSelectedFile(demo, (source) =>
        source.replace(
          "{(() => { throw new Error('controlled failure'); })()}",
          "{getMessage('Recovered')}",
        ),
      );
      await expect(page.getByTestId('focused-message')).toHaveText('Recovered helper');
      await expect(demo.getByRole('alert')).toHaveCount(0);
    });

    test('copies and exports original source after editing', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await page.goto(validationPage);
      await page.evaluate(() => {
        const runtimeWindow = window as typeof window & { exportedSource?: string };
        HTMLFormElement.prototype.submit = function captureSubmission() {
          runtimeWindow.exportedSource = Array.from(new FormData(this).values(), String).join('\n');
        };
      });
      const demo = getDemo(page, 'FocusedLiveEdit');

      await editSelectedFile(demo, (source) =>
        source.replace("getMessage('Ready')", "getMessage('Edited')"),
      );
      await expect(page.getByTestId('focused-message')).toHaveText('Edited helper');
      await demo.getByRole('button', { name: 'Copy the source' }).click();
      await expect
        .poll(() => page.evaluate(() => navigator.clipboard.readText()))
        .toContain("getMessage('Ready')");
      const copiedSource = await page.evaluate(() => navigator.clipboard.readText());
      expect(copiedSource).not.toContain("getMessage('Edited')");

      await demo.getByRole('button', { name: 'Edit in StackBlitz' }).click();
      await expect
        .poll(() =>
          page.evaluate(
            () => (window as typeof window & { exportedSource?: string }).exportedSource,
          ),
        )
        .toContain("getMessage('Ready')");
      expect(
        await page.evaluate(
          () => (window as typeof window & { exportedSource?: string }).exportedSource,
        ),
      ).not.toContain("getMessage('Edited')");
    });

    test('synchronizes and preserves language preference and lets a deep link override the cookie', async ({
      page,
    }) => {
      await page.goto(validationPage);
      await page.evaluate(() => {
        document.cookie = 'codeVariant=JS;path=/';
      });
      await page.reload();

      const focusedDemo = getDemo(page, 'FocusedLiveEdit');
      const syncDemo = getDemo(page, 'LanguageSync');
      await focusedDemo.getByRole('button', { name: 'Expand code' }).click();
      await expect(
        focusedDemo.getByRole('button', { name: 'Show JavaScript source' }),
      ).toHaveAttribute('aria-pressed', 'true');
      await expect(
        syncDemo.getByRole('button', { name: 'Show JavaScript source' }),
      ).toHaveAttribute('aria-pressed', 'true');

      await focusedDemo.getByRole('button', { name: 'Show TypeScript source' }).click();
      await expect(
        syncDemo.getByRole('button', { name: 'Show TypeScript source' }),
      ).toHaveAttribute('aria-pressed', 'true');

      await focusedDemo.getByRole('button', { name: 'Show JavaScript source' }).click();
      const editor = await getSelectedFileEditor(syncDemo);
      await expect(editor).toHaveValue(/function LanguageSync\(\{ label = 'Language sync' \}\)/);
      await expect(editor).not.toHaveValue(/LanguageSyncProps/);
      await page.waitForTimeout(500);
      await expect(editor).not.toHaveValue(/LanguageSyncProps/);

      const sourceToggle = syncDemo.locator('button[data-ga-event-action="expand"]');
      await sourceToggle.click();
      await sourceToggle.click();
      await expect(
        syncDemo.getByRole('button', { name: 'Show JavaScript source' }),
      ).toHaveAttribute('aria-pressed', 'true');
      await expect(await getSelectedFileEditor(syncDemo)).not.toHaveValue(/LanguageSyncProps/);

      await page.evaluate(() => {
        document.cookie = 'codeVariant=JS;path=/';
      });
      await page.goto(`${validationPage}#FocusedLiveEdit.tsx`);
      await expect(
        getDemo(page, 'FocusedLiveEdit').getByRole('button', { name: 'Show TypeScript source' }),
      ).toHaveAttribute('aria-pressed', 'true');
    });

    test('injects the runtime theme into the preview', async ({ page }) => {
      await page.addInitScript(() => {
        (window as typeof window & { getInjectTheme?: () => () => object }).getInjectTheme =
          () => () => ({ validationLabel: 'injected' });
      });
      await page.goto(validationPage);

      await expect(page.getByTestId('focused-theme')).toHaveText('injected');
    });

    test('supports toolbar keyboard navigation', async ({ page }) => {
      await page.goto(validationPage);
      const toolbar = getDemo(page, 'FocusedLiveEdit').getByRole('toolbar', {
        name: 'demo source',
      });
      const buttons = toolbar.locator('button:visible');

      // The skeleton toolbar is inert until the live one mounts; a focus
      // attempt before that lands nowhere, so wait for `aria-busy` to clear.
      await expect(toolbar).not.toHaveAttribute('aria-busy', 'true');
      await buttons.first().focus();
      await page.keyboard.press('End');
      await expect(toolbar.getByRole('button', { name: 'See more' })).toBeFocused();
      await page.keyboard.press('Home');
      await expect(buttons.first()).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await expect(buttons.nth(1)).toBeFocused();
      await expect(toolbar.locator('button[tabindex="0"]')).toHaveCount(1);
    });
  });

  // The JavaScript variant is produced by a transform whose source projection is
  // precomputed against the unedited source. Preferring it over the live one made
  // the collapsed preview expand into the whole module on the first keystroke.
  test('keeps the collapsed preview scoped while editing the JavaScript source', async ({
    page,
    context,
  }) => {
    await context.addCookies([{ name: 'codeVariant', value: 'JS', url: WEBSITE_ORIGIN }]);
    await page.goto('/material-ui/react-button/');
    const demo = getDemo(page, 'BasicButtons');

    const editor = await getSelectedFileEditor(demo);
    await expect(editor).toHaveValue(/^<Button/);
    const previewLines = await demo.locator('pre code .line').count();

    await editor.pressSequentially('x', { delay: 50 });
    await editor.pressSequentially('y', { delay: 50 });

    await expect(demo.locator('pre code .line')).toHaveCount(previewLines);
    await expect(editor).not.toHaveValue(/import Button from/);
  });

  test('uses show and hide labels when collapsed source is empty', async ({ page }) => {
    await page.goto('/material-ui/react-button/');
    const demo = getDemo(page, 'CustomizedButtons');

    await demo.scrollIntoViewIfNeeded();
    await demo.getByRole('button', { name: 'Show code', exact: true }).click();
    await expect(demo.getByRole('button', { name: 'Hide code', exact: true })).toBeVisible();
  });

  test('keeps disableLiveEdit App Bar and Drawer iframe demos non-editable', async ({ page }) => {
    await page.goto('/material-ui/react-app-bar/#HideAppBar.tsx');
    const appBarDemo = getDemo(page, 'HideAppBar');
    await expect(
      appBarDemo.locator('iframe').contentFrame().getByText('Scroll to hide App bar'),
    ).toBeVisible();
    await expect(appBarDemo.locator('.editable-code-wrapper')).toHaveCount(0);

    await page.goto('/material-ui/react-drawer/#ResponsiveDrawer.tsx');
    const drawerDemo = getDemo(page, 'ResponsiveDrawer');
    await expect(
      drawerDemo.locator('iframe').contentFrame().getByText('Responsive drawer'),
    ).toBeVisible();
    await expect(drawerDemo.locator('.editable-code-wrapper')).toHaveCount(0);
  });
});
