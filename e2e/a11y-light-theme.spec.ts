import AxeBuilder from '@axe-core/playwright';

import { expect, test } from './fixtures';

/**
 * A11y — parcours représentatifs (sans auth) avec `localStorage.theme = 'light'`.
 * Tant que le mode clair est verrouillé (Phase 1bis), le rendu reste en dark :
 * on vérifie surtout qu’axe ne remonte pas de régressions sur ces URLs.
 */
async function expectNoSeriousA11yViolations(page: import('@playwright/test').Page, path: string) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(serious, `a11y ${path}: ${serious.map((v) => v.id).join(', ')}`).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('theme', 'light');
    } catch {
      /* ignore */
    }
  });
});

test.describe('A11y — pages clés (préférence light persistée, rendu dark verrouillé)', () => {
  test('connexion', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('body')).toBeVisible();
    await expectNoSeriousA11yViolations(page, '/login');
  });

  test('inscription', async ({ page }) => {
    await page.goto('/inscription');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 15_000 });
    await expectNoSeriousA11yViolations(page, '/inscription');
  });

  test('entraînement quiz', async ({ page }) => {
    await page.goto('/entrainement/quiz');
    await expect(page.locator('body')).toBeVisible();
    await expectNoSeriousA11yViolations(page, '/entrainement/quiz');
  });
});
