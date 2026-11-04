import { test as base, expect } from '@playwright/test';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import type { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test('able to navigate between products', async ({ page }) => {
  await page.goto('/material-ui/getting-started/installation/');

  await page.click('#mui-product-selector');

  await expect(page.locator('#mui-product-menu')).toBeVisible();

  await expect(
    page.locator('#mui-product-menu a[href^="/material-ui/getting-started/"]'),
  ).toBeVisible();

  await expect(page.locator('#mui-product-menu a[href^="/system/"]')).toHaveAttribute(
    'href',
    '/system/getting-started/',
  );

  await expect(page.locator('#mui-product-menu a[href^="/x/react-data-grid/"]')).toBeVisible();
  await expect(page.locator('#mui-product-menu a[href^="/x/react-date-pickers/"]')).toBeVisible();

  await expect(page.locator('#mui-product-menu a[href^="https://base-ui.com/"]')).toBeVisible();
});
