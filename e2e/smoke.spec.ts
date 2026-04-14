import { test, expect } from '@playwright/test';

/**
 * Smoke E2E — pages publiques sans auth.
 * Les cinq rubriques pédagogiques : fondamentaux, infractions, enquêtes, épreuves, entraînement.
 */
test.describe('Pages publiques', () => {
  test('accueil charge', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('tarifs charge', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 15_000 });
  });

  test('quiz redirige vers entraînement', async ({ page }) => {
    await page.goto('/quiz');
    await expect(page).toHaveURL(/\/entrainement\/quiz/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('les cinq rubriques pédagogiques répondent 200', async ({ page }) => {
    for (const path of ['/fondamentaux', '/infractions', '/enquetes', '/epreuves', '/entrainement']) {
      const res = await page.goto(path);
      expect(res?.ok(), `${path} doit répondre OK`).toBeTruthy();
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('filtre famille visible sur infractions', async ({ page }) => {
    await page.goto('/infractions');
    await expect(page.getByText(/Contre les personnes|Contre les biens/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
