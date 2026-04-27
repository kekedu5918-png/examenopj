import AxeBuilder from '@axe-core/playwright';

import { expect, test } from './fixtures';

/**
 * Preview fiche V3 — `/design-system/fiche-v3` (ENABLE_DESIGN_SYSTEM via webServer Playwright).
 */
test.describe('Fiche V3 — preview design-system', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem('theme', 'light');
      } catch {
        /* ignore */
      }
    });
  });

  test('smoke : 200 + hero visible', async ({ page }) => {
    const response = await page.goto('/design-system/fiche-v3');
    expect(response?.status()).toBe(200);

    const root = page.locator('[data-fiche-v3-preview]');
    await expect(root).toBeVisible();
    await expect(page.getByTestId('fiche-hero')).toBeVisible();
    await expect(page.getByTestId('fiche-premium')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('flagrance');
  });

  test('a11y : pas de violation serious/critical sur la preview', async ({ page }) => {
    /** Évite les faux positifs contraste tant que le stagger Framer laisse des opacités intermédiaires. */
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/design-system/fiche-v3');
    await page.getByTestId('fiche-hero').waitFor();

    const results = await new AxeBuilder({ page })
      .include('[data-fiche-v3-preview]')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(
      serious,
      `a11y fiche-v3 : ${serious.map((v) => `${v.id} (${v.nodes.length} nodes)`).join(', ')}`,
    ).toEqual([]);
  });

  test('reduced-motion : fiche premium marque data-reduced-motion', async ({ page }) => {
    /** Même page que les autres tests (fixtures) : `newContext` seul ne propage pas toujours `matchMedia` vers l’hydratation React. */
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/design-system/fiche-v3');
    await expect
      .poll(() => page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches))
      .toBe(true);
    await page.getByTestId('fiche-premium').waitFor({ timeout: 15_000 });
    await expect
      .poll(() => page.getByTestId('fiche-premium').getAttribute('data-reduced-motion'))
      .toBe('true');
  });

  test('snapshot visuel : [data-fiche-v3-preview]', async ({ page }) => {
    await page.goto('/design-system/fiche-v3');
    await page.getByTestId('fiche-hero').waitFor();
    await page.waitForLoadState('networkidle');

    const root = page.locator('[data-fiche-v3-preview]');
    await expect(root).toHaveScreenshot('fiche-v3-preview.png', {
      maxDiffPixelRatio: 0.06,
    });
  });
});
