import { test as base, expect } from '@playwright/test';
import type { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test('should see the selected icon popup that match the query', async ({ page }) => {
  await page.goto('/material-ui/material-icons/?selected=AcUnit');

  await expect(page.locator('.MuiDialog-container h2:has-text("AcUnit")')).toBeVisible();
});
