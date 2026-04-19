import { expect, test } from './fixtures';

/**
 * Reduced motion — périmètre élargi en 2B.2.2 / 2B.2.3 (pastille, flèche, etc.).
 * 2B.2.1 : vérifier que les compteurs « Chiffres clés » affichent immédiatement les valeurs finales.
 */
test.describe('Accueil — prefers-reduced-motion (2B.2.1 compteurs)', () => {
  test('section stats : valeurs finales visibles sans interpolation', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const section = page.locator('section[aria-labelledby="home-stats-title"]');
    await section.scrollIntoViewIfNeeded();

    const figures = section.locator('strong');
    await expect(figures).toHaveCount(4);
    await expect(figures.nth(0)).toHaveText('15');
    await expect(figures.nth(1)).toHaveText('55+');
    await expect(figures.nth(2)).toHaveText('3');
    await expect(figures.nth(3)).toHaveText('200+');
  });
});
