import { test, expect } from '@playwright/test';

/**
 * Smoke E2E — pages publiques sans auth.
 * Profils freemium / premium : ajouter des projets avec storageState ou variables d’environnement dédiées.
 */
test.describe('Pages publiques', () => {
  test('accueil ou racine marketing charge', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('tarifs charge', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 15_000 });
  });

  test('quiz charge', async ({ page }) => {
    await page.goto('/quiz');
    await expect(page.locator('body')).toBeVisible();
  });

  test('parcours OPJ charge', async ({ page }) => {
    await page.goto('/parcours-opj');
    await expect(page.getByRole('heading', { name: /7 modules/ })).toBeVisible({ timeout: 15_000 });
  });
});
