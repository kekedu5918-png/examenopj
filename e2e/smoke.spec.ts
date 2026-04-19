import AxeBuilder from '@axe-core/playwright';

import { expect, test } from './fixtures';

/**
 * Smoke E2E — pages publiques sans auth.
 * Les cinq rubriques pédagogiques : fondamentaux, infractions, enquêtes, épreuves, entraînement.
 * A11y : 0 violation `serious`+ sur les URLs clés (axe-core).
 */
async function expectNoSeriousA11yViolations(page: import('@playwright/test').Page, path: string) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(serious, `a11y ${path}: ${serious.map((v) => v.id).join(', ')}`).toEqual([]);
}

test.describe('Pages publiques', () => {
  test('accueil charge', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    await expectNoSeriousA11yViolations(page, '/');
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
      await expectNoSeriousA11yViolations(page, path);
    }
  });

  test('filtre famille visible sur infractions', async ({ page }) => {
    await page.goto('/infractions');
    await expect(page.getByText(/Contre les personnes|Contre les biens/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
