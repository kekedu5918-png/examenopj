import AxeBuilder from '@axe-core/playwright';
import { expect,test } from '@playwright/test';

/**
 * A11y — thème clair sur parcours représentatifs (sans auth).
 * Complète la checklist manuelle « contrastes clair » documentée dans docs/TECH_DEBT.md.
 */
async function expectNoSeriousA11yViolations(page: import('@playwright/test').Page, path: string) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(serious, `a11y clair ${path}: ${serious.map((v) => v.id).join(', ')}`).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('theme', 'light');
    } catch {
      /* ignore */
    }
    document.documentElement.classList.remove('dark');
  });
});

test.describe('Thème clair — axe (pages clés)', () => {
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
