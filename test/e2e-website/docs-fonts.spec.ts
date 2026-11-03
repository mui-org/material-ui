import { test as base, expect } from '@playwright/test';
import type { TestFixture } from './playwright.config';

const test = base.extend<TestFixture>({});

for (const javaScriptEnabled of [false, true]) {
  test.describe(`Docs fonts (${javaScriptEnabled ? 'hydrated' : 'server-rendered'})`, () => {
    test.use({ javaScriptEnabled });

    test('keeps normal body text and semibold headings', async ({ page }) => {
      await page.goto('/material-ui/getting-started/installation/');
      if (javaScriptEnabled) {
        await expect(page.locator('body')).toHaveAttribute('dir', 'ltr');
      }

      await expect(page.locator('body')).toHaveCSS('font-weight', '400');
      // The fallback face comes from the `next/font` variable.
      await expect(page.locator('body')).toHaveCSS('font-family', /IBM Plex Sans.*Fallback/);

      // Use plain elements to check inheritance without component typography styles.
      const inheritedWeights = await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML =
          '<p>Paragraph</p><label>Label</label><fieldset><legend>Legend</legend></fieldset>';
        document.body.appendChild(container);
        const weights = Array.from(
          container.querySelectorAll('p, label, legend'),
          (element) => getComputedStyle(element).fontWeight,
        );
        container.remove();
        return weights;
      });
      expect(inheritedWeights).toEqual(['400', '400', '400']);

      const heading = page.getByRole('heading', { name: 'Installation', exact: true });
      await expect(heading).toHaveCSS('font-weight', '600');
      await expect(heading).toHaveCSS('font-family', /General Sans.*Fallback/);

      // The declared font-family does not prove that the font face loads.
      // The dev server injects font CSS with JavaScript, so check only when hydrated.
      if (javaScriptEnabled) {
        await expect
          .poll(() =>
            page.evaluate(() =>
              Array.from(document.fonts).some(
                (font) =>
                  font.family.replace(/"/g, '') === 'General Sans' &&
                  font.weight === '600' &&
                  font.status === 'loaded',
              ),
            ),
          )
          .toBe(true);
      }
    });
  });
}
