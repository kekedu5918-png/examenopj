import AxeBuilder from '@axe-core/playwright';

import { expect, test } from './fixtures';

async function expectNoSeriousA11yViolations(page: import('@playwright/test').Page, path: string) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(serious, `a11y ${path}: ${serious.map((v) => v.id).join(', ')}`).toEqual([]);
}

test.describe('Header et footer (landmarks, a11y, viewports)', () => {
  test('accueil : data-site-header + data-site-footer visibles', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-site-header]')).toBeVisible();
    await expect(page.locator('[data-site-footer]')).toBeVisible();
  });

  test('accueil : aucune violation axe serious/critical (wcag2aa)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    await expectNoSeriousA11yViolations(page, '/');
  });

  test('clavier : premier Tab atteint le lien « Aller au contenu »', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.locator('a[href="#contenu-principal"]');
    await expect(skip).toBeFocused();
  });

  test('mobile 375px : bouton ouvrir le menu présent', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Ouvrir le menu' })).toBeVisible();
  });

  test('desktop 1280px : navigation « Menu » présente', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Menu' })).toBeVisible();
  });
});
