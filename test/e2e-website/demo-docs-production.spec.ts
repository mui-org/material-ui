import path from 'node:path';
import { createRequire } from 'node:module';
import type { Locator, Page } from '@playwright/test';
import { test as base, expect } from '@playwright/test';
import type * as LZStringModule from 'lz-string';
import type { TestFixture } from './playwright.config';

const requireFromDocs = createRequire(path.resolve('docs/package.json'));
const LZString = requireFromDocs('lz-string') as typeof LZStringModule;

const test = base.extend<TestFixture>({});

const WEBSITE_ORIGIN = new URL(process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://mui.com').origin;
const DEMOS_PATH = '/experiments/docs/demos/';
const BUTTONS_PATH = '/material-ui/react-button/';
const BUTTONS_PREVIEW_SOURCE = `<Button variant="text">Text</Button>
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>`;

interface SandboxSubmission {
  action: string;
  fields: Record<string, string>;
}

function decodeCodeSandboxParameters(parameters: string) {
  const base64 = parameters.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(LZString.decompressFromBase64(base64));
}

function getDemo(page: Page, name: string, occurrence = 0) {
  return page.locator(`#${name}`).nth(occurrence).locator('..');
}

// Demo source tools mount once the demo enters the viewport, so anything below
// the fold has to be scrolled to before it can be driven.
async function reveal(target: Locator) {
  await target.scrollIntoViewIfNeeded();
  return target;
}

// Scrolling mounts the demo, but its preview hydrates a beat later and swallows
// clicks until it does — retry until the click actually lands.
async function clickForEffect(target: Locator, expectation: () => Promise<void>) {
  await expect(async () => {
    await target.click();
    await expectation();
  }).toPass({ timeout: 15_000 });
}

// The textarea editor mounts on the reader's first pointer-down or keyboard
// entry on the code (`editActivation: 'interaction'`), so activate it first.
async function editor(demo: Locator) {
  const textarea = demo.locator('textarea:visible');
  if ((await textarea.count()) === 0) {
    await demo.getByRole('group', { name: 'Editable code' }).first().click();
  }
  await textarea.waitFor();
  return textarea;
}

async function expectButtonsPreview(demo: Locator) {
  await expect(await editor(demo)).toHaveValue(BUTTONS_PREVIEW_SOURCE);
}

test.describe('Demo docs', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  test.describe('source preview and editor', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BUTTONS_PATH);
    });

    test('renders a bundled demo with an editable highlighted preview', async ({ page }) => {
      const demo = getDemo(page, 'BasicButtons');

      await expect(demo.getByRole('button', { name: 'Text' })).toBeVisible();
      await expect(demo.getByRole('button', { name: 'Contained' })).toBeVisible();
      await expect(demo.getByRole('button', { name: 'Outlined' })).toBeVisible();
      await expect(demo.getByRole('toolbar', { name: 'demo source' })).toBeVisible();
      await expectButtonsPreview(demo);
      await expect(demo.locator('pre code.language-tsx [class^="pl-"]')).not.toHaveCount(0);
      await expect(demo.getByRole('button', { name: 'Expand code' })).toHaveAttribute(
        'aria-controls',
        /demo-source-/,
      );
    });

    test('expands full source and collapses back to the preview', async ({ page }) => {
      const demo = getDemo(page, 'BasicButtons');
      await demo.getByRole('button', { name: 'Expand code' }).click();

      await expect(demo.getByRole('button', { name: 'Collapse code' })).toBeVisible();
      await expect(await editor(demo)).toHaveValue(/import Stack from '@mui\/material\/Stack'/);
      await expect(await editor(demo)).toHaveValue(/export default function BasicButtons/);

      await demo.getByRole('button', { name: 'Collapse code' }).click();

      await expect(demo.getByRole('button', { name: 'Expand code' })).toBeVisible();
      await expectButtonsPreview(demo);
    });

    test('runs edited preview source in place', async ({ page }) => {
      const demo = getDemo(page, 'BasicButtons');
      await (await editor(demo)).fill('<Button variant="contained">Edited live</Button>');

      await expect(demo.getByRole('button', { name: 'Edited live' })).toBeVisible();
      await expect(demo.locator('pre code')).toContainText('Edited live');
    });

    test('resets preview edits when expanding, then runs full-source edits', async ({ page }) => {
      const demo = getDemo(page, 'BasicButtons');
      await (await editor(demo)).fill('<Button>Preview edit</Button>');
      await expect(demo.getByRole('button', { name: 'Preview edit' })).toBeVisible();

      await demo.getByRole('button', { name: 'Expand code' }).click();

      const textarea = await editor(demo);
      await expect(textarea).not.toHaveValue(/Preview edit/);
      await expect(textarea).toHaveValue(/export default function BasicButtons/);
      await textarea.fill(`import Button from '@mui/material/Button';

export default function BasicButtons() {
  return <Button variant="contained">Full source edit</Button>;
}`);
      await expect(demo.getByRole('button', { name: 'Full source edit' })).toBeVisible();

      await demo.getByRole('button', { name: 'Collapse code' }).click();

      await expectButtonsPreview(demo);
      await expect(demo.getByRole('button', { name: 'Text' })).toBeVisible();
    });

    test('reports live syntax errors without replacing the last valid render', async ({ page }) => {
      const demo = getDemo(page, 'BasicButtons');
      const textarea = await editor(demo);
      await textarea.fill('<Button>Last valid render</Button>');
      await expect(demo.getByRole('button', { name: 'Last valid render' })).toBeVisible();

      await textarea.fill('<Button>');

      await expect(demo.getByRole('alert').filter({ hasText: 'SyntaxError' })).toBeVisible();
      await expect(demo.getByRole('button', { name: 'Last valid render' })).toBeVisible();
    });

    test('resets edited source and remounts the bundled demo', async ({ page }) => {
      const demo = getDemo(page, 'BasicButtons');
      await (await editor(demo)).fill('<Button>Edited live</Button>');
      await expect(demo.getByRole('button', { name: 'Edited live' })).toBeVisible();

      await demo.getByRole('button', { name: 'Reset demo' }).click();

      await expectButtonsPreview(demo);
      await expect(demo.getByRole('button', { name: 'Text' })).toBeVisible();
      await expect(demo.getByRole('button', { name: 'Contained' })).toBeVisible();
      await expect(demo.getByRole('button', { name: 'Outlined' })).toBeVisible();
    });

    test('remounts a stateful demo when reset', async ({ page }) => {
      await page.goto('/material-ui/react-checkbox/');

      const demo = await reveal(getDemo(page, 'ControlledCheckbox'));
      // The checkbox is server-rendered, so it accepts clicks before the demo
      // hydrates and silently drops them. The skeleton toolbar is `aria-busy`
      // until the live demo mounts, so waiting for it to clear gates the click
      // on a hydrated tree. Retrying the click is not an option here: a second
      // one would toggle the box back.
      await expect(demo.getByRole('toolbar', { name: 'demo source' })).not.toHaveAttribute(
        'aria-busy',
        'true',
      );

      const checkbox = demo.getByRole('checkbox', { name: 'controlled' });
      await expect(checkbox).toBeChecked();
      await checkbox.click();
      await expect(checkbox).not.toBeChecked();

      await demo.getByRole('button', { name: 'Reset demo' }).click();

      await expect(checkbox).toBeChecked();
    });

    test('supports keyboard entry and exit for the editor', async ({ page }) => {
      const demo = getDemo(page, 'BasicButtons');
      // The editable region itself is the tab stop; the hint is its description.
      const editorHint = demo.getByRole('group', { name: 'Editable code' });
      const textarea = demo.locator('textarea');

      // The demo surface is code-split, so retry until its key handler is live.
      await expect(async () => {
        await editorHint.focus();
        await page.keyboard.press('Enter');
        await expect(textarea).toBeFocused({ timeout: 1000 });
      }).toPass();

      await page.keyboard.press('Escape');
      await expect(editorHint).toBeFocused();
    });
  });

  test.describe('source state and variants', () => {
    test('uses Expand/Collapse for previews and Show/Hide for closed source', async ({ page }) => {
      await page.goto(BUTTONS_PATH);

      const previewDemo = getDemo(page, 'BasicButtons');
      await expect(previewDemo.locator('pre code')).toBeVisible();
      await expect(previewDemo.getByRole('button', { name: 'Expand code' })).toBeVisible();
      await previewDemo.getByRole('button', { name: 'Expand code' }).click();
      await expect(previewDemo.getByRole('button', { name: 'Collapse code' })).toBeVisible();

      const closedDemo = await reveal(getDemo(page, 'CustomizedButtons'));
      await expect(closedDemo.locator('textarea')).toHaveCount(0);
      await expect(closedDemo.getByRole('button', { name: 'Show code' })).toBeVisible();
      await closedDemo.getByRole('button', { name: 'Show code' }).click();
      await expect(await editor(closedDemo)).toHaveValue(
        /export default function CustomizedButtons/,
      );
      await expect(closedDemo.getByRole('button', { name: 'Hide code' })).toBeVisible();
      await closedDemo.getByRole('button', { name: 'Hide code' }).click();
      await expect(closedDemo.locator('textarea')).toHaveCount(0);
    });

    test('does not render source tools when hideToolbar is true', async ({ page }) => {
      await page.goto('/material-ui/react-popover/');

      const demo = getDemo(page, 'AnchorPlayground');
      await expect(demo).toBeVisible();
      await expect(demo.getByRole('toolbar', { name: 'demo source' })).toHaveCount(0);
      await expect(demo.locator('textarea')).toHaveCount(0);
      await expect(demo.locator('[id^="demoSource-"]')).toHaveCount(0);
    });

    test('hydrates with the language selected immediately after navigation starts', async ({
      page,
      context,
    }) => {
      await context.addCookies([{ name: 'codeVariant', value: 'JS', url: WEBSITE_ORIGIN }]);
      let releaseRequest: () => void;
      const requestGate = new Promise<void>((resolve) => {
        releaseRequest = resolve;
      });
      await page.route('**/material-ui/react-button/', async (route) => {
        await requestGate;
        await route.continue();
      });

      const navigation = page.goto(BUTTONS_PATH);
      await context.addCookies([{ name: 'codeVariant', value: 'TS', url: WEBSITE_ORIGIN }]);
      releaseRequest!();
      await navigation;

      const demo = getDemo(page, 'BasicButtons');
      await expect(demo.locator('pre code.language-tsx')).toBeVisible();
      await demo.getByRole('button', { name: 'Expand code' }).click();
      await expect(demo.getByRole('button', { name: 'Show TypeScript source' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
      await expect(await editor(demo)).toHaveValue(/export default function BasicButtons/);
      await expect(await editor(demo)).not.toHaveValue(/BasicButtons\.propTypes/);
    });

    test('switches source languages, resets edits, and persists the preference', async ({
      page,
    }) => {
      await page.goto('/material-ui/react-checkbox/#ControlledCheckbox.js');

      const demo = getDemo(page, 'ControlledCheckbox');
      const textarea = await editor(demo);
      const javascript = demo.getByRole('button', { name: 'Show JavaScript source' });
      const typescript = demo.getByRole('button', { name: 'Show TypeScript source' });

      await expect(javascript).toHaveAttribute('aria-pressed', 'true');
      await expect(textarea).toHaveValue(/const handleChange = \(event\) =>/);
      await textarea.fill(
        'export default function ControlledCheckbox() { return <div>JavaScript edit</div>; }',
      );
      await expect(demo.getByText('JavaScript edit', { exact: true })).toBeVisible();

      await typescript.click();

      await expect(typescript).toHaveAttribute('aria-pressed', 'true');
      await expect(textarea).not.toHaveValue(/JavaScript edit/);
      await expect(textarea).toHaveValue(/event: React\.ChangeEvent<HTMLInputElement>/);
      await expect
        .poll(
          async () =>
            (await page.context().cookies()).find(({ name }) => name === 'codeVariant')?.value,
        )
        .toBe('TS');

      await page.goto('/material-ui/react-checkbox/');
      const reloadedDemo = await reveal(getDemo(page, 'ControlledCheckbox'));
      await reloadedDemo.getByRole('button', { name: 'Expand code' }).click();
      await expect(
        reloadedDemo.getByRole('button', { name: 'Show TypeScript source' }),
      ).toHaveAttribute('aria-pressed', 'true');
      await expect(await editor(reloadedDemo)).toHaveValue(
        /event: React\.ChangeEvent<HTMLInputElement>/,
      );
    });

    test('opens matching source and renders relative modules as tabs', async ({ page }) => {
      await page.goto('/material-ui/react-number-field/#FieldDemo.js');

      const demo = getDemo(page, 'FieldDemo');
      await expect(demo.getByRole('button', { name: 'Collapse code' })).toBeVisible();
      const tabs = demo.getByRole('tab');
      await expect(tabs).toHaveCount(2);
      await expect(tabs.first()).toHaveText('FieldDemo.jsx');
      await expect(tabs.nth(1)).toHaveText('NumberField.jsx');
      await editor(demo);
      await expect(demo.locator('textarea:visible')).toHaveCount(1);

      await tabs.nth(1).click();

      await expect(tabs.nth(1)).toHaveAttribute('data-active', '');
      // Unlike production, docs-infra also makes related files editable.
      await editor(demo);
      await expect(demo.locator('textarea:visible')).toHaveCount(1);
      await expect(demo.locator('pre code:visible')).toContainText('NumberField');
    });

    test('copies source from the active relative module tab', async ({ browser }) => {
      const context = await browser.newContext({
        baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://mui.com',
        permissions: ['clipboard-read', 'clipboard-write'],
        viewport: { width: 1280, height: 800 },
      });
      const page = await context.newPage();
      await page.goto('/material-ui/react-number-field/#FieldDemo.js');

      const demo = getDemo(page, 'FieldDemo');
      await (await editor(demo)).fill('export default function FieldDemo() { return null; }');
      await demo.getByRole('button', { name: 'Copy the source' }).click();
      await expect
        .poll(async () => page.evaluate(() => navigator.clipboard.readText()))
        .toContain("import Box from '@mui/material/Box';");

      await demo.getByRole('tab').nth(1).click();
      await demo.getByRole('button', { name: 'Copy the source' }).click();
      await expect
        .poll(async () => page.evaluate(() => navigator.clipboard.readText()))
        .toContain('function SSRInitialFilled');

      await context.close();
    });

    test('renders static source when live editing is disabled', async ({ page }) => {
      await page.goto('/material-ui/react-app-bar/#HideAppBar.js');

      const demo = getDemo(page, 'HideAppBar');
      await expect(demo.getByRole('button', { name: 'Hide code' })).toBeVisible();
      await expect(demo.locator('textarea')).toHaveCount(0);
      await expect(demo.locator('pre code.language-jsx')).toContainText(
        'export default function HideAppBar',
      );
    });
  });

  test.describe('toolbar', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BUTTONS_PATH);
    });

    test('links the authored .tsx file on GitHub regardless of source language', async ({
      page,
    }) => {
      const demo = getDemo(page, 'BasicButtons');
      await expect(demo.getByRole('button', { name: 'Edit in StackBlitz' })).toBeVisible();
      await expect(demo.getByRole('button', { name: 'Edit in CodeSandbox' })).toBeVisible();
      await expect(demo.getByRole('button', { name: 'Copy the source' })).toBeVisible();
      await expect(
        demo.getByRole('button', { name: 'Reset focus to test keyboard navigation' }),
      ).toBeVisible();
      await expect(demo.getByRole('button', { name: 'Reset demo' })).toBeVisible();

      await demo.getByRole('button', { name: 'See more' }).click();

      // `createDemo` builds this link from the deploy's own repository and
      // commit, so the owner and ref differ between local and Netlify builds.
      const sourceLink = page.getByRole('menuitem', { name: 'View the source on GitHub' });
      await expect(sourceLink).toHaveAttribute(
        'href',
        /github\.com\/[^/]+\/material-ui\/blob\/[^/]+\/docs\/data\/material\/components\/buttons\/demos\/basic\/BasicButtons\.tsx$/,
      );
      await expect(sourceLink).toHaveAttribute('target', '_blank');

      await page.keyboard.press('Escape');
      await demo.getByRole('button', { name: 'Expand code' }).click();
      await demo.getByRole('button', { name: 'Show JavaScript source' }).click();
      await demo.getByRole('button', { name: 'See more' }).click();
      // The JS view is a transform of the `.tsx` source; no `.jsx` file exists.
      await expect(sourceLink).toHaveAttribute(
        'href',
        /github\.com\/[^/]+\/material-ui\/blob\/[^/]+\/docs\/data\/material\/components\/buttons\/demos\/basic\/BasicButtons\.tsx$/,
      );
    });

    test('copies JavaScript and TypeScript source links from the overflow menu', async ({
      browser,
    }) => {
      test.setTimeout(60_000);
      const context = await browser.newContext({
        baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://mui.com',
        permissions: ['clipboard-read', 'clipboard-write'],
        viewport: { width: 1280, height: 800 },
      });
      const page = await context.newPage();
      await page.goto(BUTTONS_PATH);

      const demo = getDemo(page, 'BasicButtons');
      const more = demo.getByRole('button', { name: 'See more' });
      await more.click();
      await page.getByRole('menuitem', { name: 'Copy link to JavaScript source' }).click();
      await expect
        .poll(async () => page.evaluate(() => navigator.clipboard.readText()))
        .toMatch(/\/material-ui\/react-button\/#BasicButtons\.jsx$/);

      await expect(page.getByRole('menu')).toBeHidden();
      await page.evaluate(() =>
        document.querySelector<HTMLElement>('[aria-label="See more"]')?.click(),
      );
      await expect(
        page.getByRole('menuitem', { name: 'Copy link to TypeScript source' }),
      ).toBeVisible();
      await page.getByRole('menuitem', { name: 'Copy link to TypeScript source' }).click();
      await expect
        .poll(async () => page.evaluate(() => navigator.clipboard.readText()))
        .toMatch(/\/material-ui\/react-button\/#BasicButtons\.tsx$/);

      await context.close();
    });

    test('copies raw source from the toolbar', async ({ browser }) => {
      const context = await browser.newContext({
        baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://mui.com',
        permissions: ['clipboard-read', 'clipboard-write'],
        viewport: { width: 1280, height: 800 },
      });
      const page = await context.newPage();
      await page.goto(BUTTONS_PATH);

      const demo = getDemo(page, 'BasicButtons');
      await demo.getByRole('button', { name: 'Copy the source' }).click();

      await expect
        .poll(async () => page.evaluate(() => navigator.clipboard.readText()))
        .toContain("import Stack from '@mui/material/Stack';");

      await context.close();
    });

    test('generates StackBlitz and CodeSandbox submissions', async ({ page }) => {
      await page.addInitScript(() => {
        const submissions: Array<{ action: string; fields: Record<string, string> }> = [];
        Object.defineProperty(window, 'demoSubmissions', { value: submissions });
        HTMLFormElement.prototype.submit = function submit() {
          submissions.push({
            action: this.action,
            fields: Object.fromEntries(new FormData(this).entries()) as Record<string, string>,
          });
        };
      });
      await page.goto(BUTTONS_PATH);

      const demo = getDemo(page, 'BasicButtons');
      await demo.getByRole('button', { name: 'Edit in StackBlitz' }).click();
      await demo.getByRole('button', { name: 'Edit in CodeSandbox' }).click();

      const submissions = await page.evaluate(
        () =>
          (
            window as Window & {
              demoSubmissions: Array<{ action: string; fields: Record<string, string> }>;
            }
          ).demoSubmissions,
      );
      expect(submissions).toHaveLength(2);
      expect(submissions[0].action).toBe('https://stackblitz.com/run?file=src/Demo.tsx');
      expect(submissions[0].fields['project[files][src/Demo.tsx]']).toContain(
        'export default function BasicButtons',
      );
      expect(submissions[0].fields['project[files][package.json]']).toContain('"vite"');
      expect(submissions[1].action).toBe('https://codesandbox.io/api/v1/sandboxes/define');
      const codeSandboxProject = decodeCodeSandboxParameters(submissions[1].fields.parameters);
      expect(codeSandboxProject.files['src/Demo.tsx'].content).toContain(
        'export default function BasicButtons',
      );
      // The generated entry imports `src/Demo.tsx` under the exporter's `App` alias.
      expect(codeSandboxProject.files['src/index.tsx'].content).toContain('<App />');
      expect(codeSandboxProject.files['tsconfig.json'].content).toContain('"strict": true');
      // docs-infra serializes package.json as text rather than an object.
      expect(
        JSON.parse(codeSandboxProject.files['package.json'].content).dependencies,
      ).toHaveProperty('@mui/material');
      expect(submissions[1].fields.query).toBe('file=src/Demo.tsx');
    });

    test('includes relative source files in external sandboxes', async ({ page }) => {
      await page.addInitScript(() => {
        const submissions: SandboxSubmission[] = [];
        Object.defineProperty(window, 'demoSubmissions', { value: submissions });
        HTMLFormElement.prototype.submit = function submit() {
          submissions.push({
            action: this.action,
            fields: Object.fromEntries(new FormData(this).entries()) as Record<string, string>,
          });
        };
      });
      await page.goto('/material-ui/react-number-field/#FieldDemo.tsx');

      const demo = getDemo(page, 'FieldDemo');
      await demo.getByRole('button', { name: 'Edit in StackBlitz' }).click();
      await demo.getByRole('button', { name: 'Edit in CodeSandbox' }).click();

      const submissions = await page.evaluate(
        () =>
          (
            window as Window & {
              demoSubmissions: SandboxSubmission[];
            }
          ).demoSubmissions,
      );
      expect(submissions[0].fields['project[files][src/NumberField.tsx]']).toContain(
        'function SSRInitialFilled',
      );
      expect(submissions[0].fields['project[files][src/Demo.tsx]']).toContain(
        "from './NumberField'",
      );

      const codeSandboxProject = decodeCodeSandboxParameters(submissions[1].fields.parameters);
      expect(codeSandboxProject.files['src/NumberField.tsx'].content).toContain(
        'function SSRInitialFilled',
      );
      expect(codeSandboxProject.files['src/Demo.tsx'].content).toContain("from './NumberField'");
    });

    test('supports keyboard navigation', async ({ page }) => {
      const demo = getDemo(page, 'BasicButtons');
      const expand = demo.getByRole('button', { name: 'Expand code' });
      const stackBlitz = demo.getByRole('button', { name: 'Edit in StackBlitz' });
      const more = demo.getByRole('button', { name: 'See more' });

      // The skeleton toolbar is inert until the live one mounts; a focus
      // attempt before that lands nowhere, so wait for `aria-busy` to clear.
      await expect(demo.getByRole('toolbar', { name: 'demo source' })).not.toHaveAttribute(
        'aria-busy',
        'true',
      );
      await expand.focus();
      await page.keyboard.press('ArrowRight');
      await expect(stackBlitz).toBeFocused();

      await page.keyboard.press('End');
      await expect(more).toBeFocused();

      // The MUI Chat action is the toolbar's first control.
      await page.keyboard.press('Home');
      await expect(demo.getByRole('button', { name: 'Edit in Chat' })).toBeFocused();
    });

    test('resets focus to the demo start', async ({ page }) => {
      const demo = getDemo(page, 'BasicButtons');
      await demo.getByRole('button', { name: 'Reset focus to test keyboard navigation' }).click();

      await expect(
        demo.getByRole('button', {
          name: 'A generic container that is programmatically focused to test keyboard navigation of our components.',
        }),
      ).toBeFocused();
    });

    test('shows runtime evaluation errors and recovers on reset', async ({ page }) => {
      const demo = getDemo(page, 'BasicButtons');
      await demo.getByRole('button', { name: 'Expand code' }).click();
      await (await editor(demo)).fill("throw new Error('Runtime crash');");

      await expect(demo.getByRole('alert').filter({ hasText: 'Runtime crash' })).toBeVisible();
      await demo.getByRole('button', { name: 'Reset demo' }).click();

      await expect(demo.getByRole('button', { name: 'Text' })).toBeVisible();
      await expect(demo.getByRole('alert').filter({ hasText: 'Runtime crash' })).toHaveCount(0);
    });
  });

  test.describe('sandboxing and themes', () => {
    test('mode toggle demos should work', async ({ page }) => {
      await page.goto(DEMOS_PATH);
      await reveal(page.locator('[data-element="demo-mode-toggle-paper"]'));

      await expect(page.locator('div:has(> [data-element="demo-mode-toggle-paper"])')).toHaveClass(
        /light/,
      );
      await expect(page.locator('[data-element="demo-mode-toggle-paper"]')).toHaveCSS(
        'background-color',
        'rgb(255, 255, 255)',
      );

      await clickForEffect(
        page.getByRole('radiogroup', { name: /^demo-mode-toggle$/ }).locator('label:nth-child(3)'),
        async () => {
          await expect(
            page.locator('div:has(> [data-element="demo-mode-toggle-paper"])'),
          ).toHaveClass(/dark/, { timeout: 2000 });
          await expect(page.locator('[data-element="demo-mode-toggle-paper"]')).toHaveCSS(
            'background-color',
            'rgb(18, 18, 18)',
            { timeout: 10_000 },
          );
        },
      );
    });

    test('mode toggle custom theme demos should work', async ({ page }) => {
      await page.goto(DEMOS_PATH);
      await reveal(page.locator('[data-element="demo-mode-toggle-custom-theme-paper"]'));

      await expect(
        page.getByRole('radiogroup', { name: /^demo-mode-toggle-custom-theme$/ }),
      ).toBeVisible();
      await expect(
        page.locator('div:has(> [data-element="demo-mode-toggle-custom-theme-paper"])'),
      ).toHaveClass(/light/);
      await expect(page.locator('[data-element="demo-mode-toggle-custom-theme-paper"]')).toHaveCSS(
        'background-color',
        'rgb(239, 154, 154)',
      );

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
          ).toHaveCSS('background-color', 'rgb(183, 28, 28)', { timeout: 10_000 });
        },
      );
    });

    test('mode toggle iframe demos should work', async ({ page }) => {
      await page.goto(DEMOS_PATH);
      await reveal(page.locator('iframe[title*="Mode Toggle Iframe"]'));

      const iframe = page.locator('iframe[title*="Mode Toggle Iframe"]').contentFrame();

      await expect(iframe.locator('html')).toHaveClass(/light/);
      await expect(iframe.locator('[data-element="demo-mode-toggle-iframe-paper"]')).toHaveCSS(
        'background-color',
        'rgb(255, 255, 255)',
      );

      await clickForEffect(
        iframe
          .getByRole('radiogroup', { name: /^demo-mode-toggle-iframe$/ })
          .locator('label:nth-child(3)'),
        async () => {
          await expect(iframe.locator('html')).toHaveClass(/dark/, { timeout: 2000 });
          await expect(iframe.locator('[data-element="demo-mode-toggle-iframe-paper"]')).toHaveCSS(
            'background-color',
            'rgb(18, 18, 18)',
            { timeout: 10_000 },
          );
        },
      );
    });
  });

  test('hides the toolbar below the small breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 599, height: 800 });
    await page.goto(BUTTONS_PATH);

    const demo = getDemo(page, 'BasicButtons');
    await expect(demo.getByRole('toolbar', { name: 'demo source' })).toBeHidden();
  });

  test('lands a source link on the toolbar with the source expanded', async ({ page }) => {
    await page.goto('/material-ui/react-button/#BasicButtons.jsx');

    const demo = getDemo(page, 'BasicButtons');
    await expect(demo.getByRole('button', { name: 'Collapse code' })).toBeVisible();
    // The anchor sits just above the toolbar, so the toolbar lands under the
    // app bar with the preview scrolled out above it.
    const toolbar = demo.getByRole('toolbar', { name: 'demo source' });
    await expect.poll(async () => (await toolbar.boundingBox())?.y).toBeGreaterThan(40);
    await expect.poll(async () => (await toolbar.boundingBox())?.y).toBeLessThan(90);

    await expect(demo.getByRole('toolbar', { name: 'demo source' })).not.toHaveAttribute(
      'aria-busy',
      'true',
    );
    await expect(demo.getByRole('button', { name: 'Show JavaScript source' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    // A deep link opens the source without the reader engaging the demo, so
    // the inline ad stays hidden, as on master.
    await expect(demo.locator('.carbonads')).toHaveCount(0);
  });

  // The legacy docs previewed a demo's JSX up to 16 lines long; a focus region
  // in that range must still render as the collapsed snippet.
  test('shows a focused snippet longer than twelve lines', async ({ page }) => {
    await page.goto('/material-ui/react-select/');

    const demo = getDemo(page, 'BasicSelect');
    await expect(demo.locator('pre > code')).toHaveAttribute('data-focused-lines', '14');
    await expect(await editor(demo)).toHaveValue(/^<FormControl fullWidth>/);
  });
});
