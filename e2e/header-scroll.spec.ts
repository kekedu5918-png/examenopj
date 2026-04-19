import { expect, test } from './fixtures';

async function setDocumentScrollY(page: import('@playwright/test').Page, y: number) {
  await page.evaluate((yy) => {
    window.scrollTo(0, yy);
  }, y);
  await page.waitForTimeout(50);
}

async function expectScrolled(
  page: import('@playwright/test').Page,
  value: 'true' | 'false',
) {
  await expect.poll(async () =>
    page.locator('[data-site-header]').getAttribute('data-scrolled'),
  ).toBe(value);
}

test.describe('Header scroll — data-scrolled (hystérésis 50 / 40)', () => {
  for (const { name, width, height } of [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'mobile', width: 375, height: 667 },
  ] as const) {
    test(`${name} : scénario §3.7 (0 → 60 → 30 → 45 ×2)`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      await setDocumentScrollY(page, 0);
      await expectScrolled(page, 'false');

      await setDocumentScrollY(page, 60);
      await expectScrolled(page, 'true');

      await setDocumentScrollY(page, 30);
      await expectScrolled(page, 'false');

      await setDocumentScrollY(page, 0);
      await expectScrolled(page, 'false');
      await setDocumentScrollY(page, 45);
      await expectScrolled(page, 'false');

      await setDocumentScrollY(page, 60);
      await expectScrolled(page, 'true');
      await setDocumentScrollY(page, 45);
      await expectScrolled(page, 'true');
    });
  }
});
