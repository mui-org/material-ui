import fs from 'fs/promises';
import path from 'path';
import { chromium } from '@playwright/test';

/**
 * README
 *
 * Usage:
 * - `pnpm template:screenshot` to generate all screenshots
 * - `pnpm template:screenshot material-ui` to generate all screenshots for Material UI templates
 * - `pnpm template:screenshot order-dashboard` to generate screenshots for file named `order-dashboard.tsx`
 * - `pnpm template:screenshot material-ui dashboard` to generate screenshots for file named `dashboard.tsx` of Material UI templates
 *
 * Note:
 * - The screenshot with `-dark` suffix is generated if the page has a button with id `toggle-mode`
 *   <button data-screenshot="toggle-mode" onClick={toggleMode}>Toggle Mode</button>
 *
 * - The screenshot with `-default` suffix is generated if the page has a button with id `toggle-default-theme`
 *   <button data-screenshot="toggle-default-theme" onClick={toggleDefaultTheme}>Toggle Default Theme</button>
 *
 * - The screenshot with `-default-dark` suffix is generated if the page has both buttons
 *
 * Debug:
 * - Set `chromium.launch({ headless: false })` in line:50 to see the browser
 */

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const host = process.env.DEPLOY_PREVIEW || 'http://localhost:3000';

/**
 * project key should be `mui.com/<project-key>/*`
 */
const projects = {
  'material-ui': {
    input: path.join(process.cwd(), 'docs/pages/material-ui/getting-started/templates'),
    output: 'docs/public/static/screenshots',
    viewport: { width: 813 * 2, height: 457 * 2 },
  },
};

const names = new Set(process.argv.slice(2));

async function main() {
  // eslint-disable-next-line no-console
  console.info('Host:', host);
  const browser = await chromium.launch({ headless: true });

  const selected = Object.entries(projects).filter(
    ([project]) => names.size === 0 || names.has(project),
  );

  try {
    const failed: string[] = [];

    await Promise.allSettled(
      selected.map(async ([project, { input, output, viewport }]) => {
        try {
          const page = await browser.newPage({
            viewport,
            reducedMotion: 'reduce',
          });

          try {
            names.delete(project);

            const files = await fs.readdir(input);
            const urls = files
              .filter(
                (file) =>
                  !file.startsWith('index') &&
                  (names.size === 0 || names.has(file.replace(/\.(js|tsx)$/, ''))),
              )
              .map(
                (file) =>
                  `/${project}/getting-started/templates/${file.replace(/\.(js|tsx)$/, '/')}`,
              );

            async function toggleMode() {
              await page
                .locator('css=[data-screenshot="toggle-mode"]')
                .locator('visible=true')
                .click();
            }

            async function captureDarkMode(outputPath: string) {
              const btn = await page.$('[data-screenshot="toggle-mode"]');
              if (btn) {
                if ((await btn.getAttribute('aria-haspopup')) === 'true') {
                  await toggleMode();
                  await page.getByRole('menuitem').filter({ hasText: /dark/i }).click();
                  await page.waitForLoadState('networkidle'); // changing to dark mode might trigger image loading
                  await sleep(100); // give time for image decoding, resizing, rendering

                  await page.screenshot({ path: outputPath, animations: 'disabled' });

                  await toggleMode();
                  await page
                    .getByRole('menuitem')
                    .filter({ hasText: /system/i })
                    .click(); // switch back to light
                } else if ((await btn.getAttribute('aria-haspopup')) === 'listbox') {
                  await toggleMode();
                  await page.getByRole('option').filter({ hasText: /dark/i }).click();
                  await page.waitForLoadState('networkidle'); // changing to dark mode might trigger image loading
                  await sleep(100); // give time for image decoding, resizing, rendering

                  await page.screenshot({ path: outputPath, animations: 'disabled' });

                  await toggleMode();
                  await page
                    .getByRole('option')
                    .filter({ hasText: /system/i })
                    .click(); // switch back to light
                } else {
                  await toggleMode();
                  await page.waitForLoadState('networkidle'); // changing to dark mode might trigger image loading
                  await sleep(100); // give time for image decoding, resizing, rendering

                  await page.screenshot({ path: outputPath, animations: 'disabled' });

                  await toggleMode(); // switch back to light
                }
              }
            }

            for (const aUrl of urls) {
              /* eslint-disable no-await-in-loop -- screenshots share one page, so they run in sequence */
              await page.goto(`${host}${aUrl}?hideFrame=true`, { waitUntil: 'networkidle' });

              const filePath = `${output}${aUrl.replace(/\/$/, '')}.jpg`;
              // eslint-disable-next-line no-console
              console.info('Saving screenshot to:', filePath);
              await page.screenshot({ path: filePath, animations: 'disabled' });

              await captureDarkMode(filePath.replace('.jpg', '-dark.jpg'));

              // capture custom theme
              const toggleTheme = await page.$('[data-screenshot="toggle-default-theme"]');
              if (toggleTheme) {
                await page.click('[data-screenshot="toggle-default-theme"]');
                await page.screenshot({
                  path: filePath.replace('.jpg', '-default.jpg'),
                  animations: 'disabled',
                });

                await captureDarkMode(filePath.replace('.jpg', '-default-dark.jpg'));
              }
              /* eslint-enable no-await-in-loop */
            }
          } finally {
            await page.close();
          }
        } catch (error) {
          console.error(`Failed to generate screenshots for ${project}:`, error);
          failed.push(project);
        }
      }),
    );

    if (failed.length > 0) {
      throw new Error(`Failed to generate screenshots for: ${failed.join(', ')}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
