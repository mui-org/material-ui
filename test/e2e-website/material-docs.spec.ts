import type { Page } from '@playwright/test';
import { test as base, expect } from '@playwright/test';
import { kebabCase } from 'es-toolkit/string';
import type { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

test.describe('Material docs', () => {
  test('should have correct link with hash in the TOC', async ({ page }) => {
    await page.goto('/material-ui/getting-started/installation/');

    const anchors = page.locator('[aria-label="Page table of contents"] ul a');

    const firstAnchor = anchors.first();
    const textContent = await firstAnchor.textContent();

    await expect(firstAnchor).toHaveAttribute(
      'href',
      `/material-ui/getting-started/installation/#${kebabCase(textContent || '')}`,
    );
  });

  test('should move the focus to the main content with the skip link', async ({ page }) => {
    await page.goto('/material-ui/getting-started/installation/');

    await page.keyboard.press('Tab');

    await expect(page.locator('a[href="#main-content"]')).toBeFocused();

    await page.keyboard.press('Enter');

    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('[zh] should have correct link with hash in the TOC', async ({ page }) => {
    test.skip(
      (process.env.CIRCLE_BRANCH || '').startsWith('pull'),
      'There is no languages on the deploy preview',
    );
    await page.goto('/zh/material-ui/getting-started/installation/');

    const anchors = page.locator('main nav ul a');

    const firstAnchor = anchors.first();
    const textContent = await firstAnchor.textContent();

    await expect(firstAnchor).toHaveAttribute(
      'href',
      `/zh/material-ui/getting-started/installation/#${kebabCase(textContent || '')}`,
    );
  });

  test.describe('Demo page', () => {
    test('should have correct link for API section', async ({ page }) => {
      await page.goto('/material-ui/react-card/');

      const anchors = page.locator('div > h2#api ~ ul a');

      const firstAnchor = anchors.first();
      const textContent = await firstAnchor.textContent();

      await expect(firstAnchor).toHaveAttribute(
        'href',
        `/material-ui/api/${kebabCase(textContent || '')}/`,
      );
    });

    test('should have correct link for sidebar anchor', async ({ page }) => {
      await page.goto('/material-ui/react-card/');

      const anchor = page.locator('nav[aria-label="documentation"] .app-drawer-active');

      await expect(anchor).toHaveAttribute('href', '/material-ui/react-card/');
      await expect(anchor).toHaveText('Card');
    });

    test('should have plural url for Tabs', async ({ page }) => {
      await page.goto('/material-ui/react-tabs/');

      const anchor = page.locator('nav[aria-label="documentation"] .app-drawer-active');

      await expect(anchor).toHaveAttribute('href', '/material-ui/react-tabs/');
      await expect(anchor).toHaveText('Tabs');
    });

    test('should have plural url for Breadcrumbs', async ({ page }) => {
      await page.goto('/material-ui/react-breadcrumbs/');

      const anchor = page.locator('nav[aria-label="documentation"] .app-drawer-active');

      await expect(anchor).toHaveAttribute('href', '/material-ui/react-breadcrumbs/');
      await expect(anchor).toHaveText('Breadcrumbs');
    });

    test('should not have react- prefix for icons', async ({ page }) => {
      await page.goto('/material-ui/icons/');

      const anchor = page.locator('nav[aria-label="documentation"] .app-drawer-active');

      await expect(anchor).toHaveAttribute('href', '/material-ui/icons/');
      await expect(anchor).toHaveText('Icons');
    });

    test('should not have react- prefix for material-icons', async ({ page }) => {
      await page.goto('/material-ui/material-icons/');

      const anchor = page.locator('nav[aria-label="documentation"] .app-drawer-active');

      await expect(anchor).toHaveAttribute('href', '/material-ui/material-icons/');
      await expect(anchor).toHaveText('Material Icons');
    });

    test('should have correct API links when name of components conflicts with Base UI', async ({
      page,
    }) => {
      await page.goto('/material-ui/react-button/');

      const anchors = page.locator('div > h2#api ~ ul a');

      const firstAnchor = anchors.first();
      const textContent = await firstAnchor.textContent();

      await expect(textContent).toEqual('<Button />');
      await expect(firstAnchor).toHaveAttribute('href', '/material-ui/api/button/');
    });
  });

  test.describe('API page', () => {
    test('should have correct link for sidebar anchor', async ({ page }) => {
      await page.goto('/material-ui/api/card/');

      const anchor = page.locator('nav[aria-label="documentation"] ul a:text-is("Card")');

      await expect(anchor).toHaveClass(/app-drawer-active/);
      await expect(anchor).toHaveAttribute('href', '/material-ui/api/card/');
    });

    test('all the links in the main content should have correct prefix', async ({ page }) => {
      await page.goto('/material-ui/api/card/');

      const anchors = page.locator('div#main-content a');

      const handles = await anchors.elementHandles();

      const links = await Promise.all(handles.map((elm) => elm.getAttribute('href')));

      links.forEach((link) => {
        if (
          link &&
          ['/getting-started', '/customization', '/guides', '/discover-more'].some((path) =>
            link.includes(path),
          )
        ) {
          expect(link).toMatch(/^\/(material-ui|system)/);
        }

        expect(link).not.toMatch(/\/components/); // there should be no `/components` in the url anymore

        if (link && link.startsWith('/system')) {
          expect(link.startsWith('/system')).toBeTruthy();
          expect(link.match(/\/system{1}/g)).toHaveLength(1); // should not have repeated `/system/system/*`
        }
      });
    });
  });

  test.describe('Search', () => {
    const retryToggleSearch = async (page: Page, count = 3) => {
      try {
        await page.keyboard.press('Meta+k');
        await page.waitForSelector('input#docsearch-input', { timeout: 2000 });
      } catch (error) {
        if (count === 0) {
          throw error;
        }
        await retryToggleSearch(page, count - 1);
      }
    };
    test('should have correct link when searching component', async ({ page }) => {
      await page.goto('/material-ui/getting-started/installation/');

      await page.waitForLoadState('networkidle'); // wait for docsearch

      await retryToggleSearch(page);

      await page.type('input#docsearch-input', 'card', { delay: 50 });

      const anchor = page.locator('.DocSearch-Hits a:has-text("Card")');

      await expect(anchor.first()).toHaveAttribute('href', '/material-ui/react-card/');
    });

    test('should have correct link when searching API', async ({ page }) => {
      await page.goto('/material-ui/getting-started/installation/');

      await page.waitForLoadState('networkidle'); // wait for docsearch

      await retryToggleSearch(page);

      await page.type('input#docsearch-input', 'card api', { delay: 50 });

      const anchor = page.locator('.DocSearch-Hits a:has-text("Card API")');

      await expect(anchor.first()).toHaveAttribute('href', '/material-ui/api/card/');
    });
  });
});
