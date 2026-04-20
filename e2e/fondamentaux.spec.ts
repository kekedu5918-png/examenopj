import AxeBuilder from '@axe-core/playwright';

import { expect, test } from './fixtures';

async function expectNoSeriousA11yViolations(page: import('@playwright/test').Page, path: string) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(serious, `a11y ${path}: ${serious.map((v) => v.id).join(', ')}`).toEqual([]);
}

async function gotoFondamentauxHub(page: import('@playwright/test').Page) {
  await page.goto('/fondamentaux', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: /Les bases pour réussir/i })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByRole('searchbox', { name: /Filtrer les fiches/i })).toBeVisible({ timeout: 30_000 });
}

test.describe('/fondamentaux — Phase 2D (hub)', () => {
  test.describe.configure({ mode: 'serial' });

  test('axe : pas de violation serious/critical', async ({ page }) => {
    await gotoFondamentauxHub(page);
    await expectNoSeriousA11yViolations(page, '/fondamentaux');
  });

  test('reduced-motion : data-reduced-motion sur grille et cartes', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await gotoFondamentauxHub(page);
    await expect(page.getByTestId('fondamentaux-grid')).toHaveAttribute('data-reduced-motion', 'true', { timeout: 30_000 });
    await expect(page.getByTestId('fondamentaux-card').first()).toHaveAttribute('data-reduced-motion', 'true');
  });

  test('clavier : champ filtre focusable', async ({ page }) => {
    await gotoFondamentauxHub(page);
    const input = page.getByRole('searchbox', { name: /Filtrer les fiches/i });
    await input.focus();
    await expect(input).toBeFocused();
  });
});
