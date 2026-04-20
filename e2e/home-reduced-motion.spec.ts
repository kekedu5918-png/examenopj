import { expect, test } from './fixtures';

/**
 * Reduced motion — périmètre élargi en 2B.2.3 (pastille, flèche, etc.).
 * 2B.2.1 : compteurs « Chiffres clés » → valeurs finales immédiates.
 * 2B.2.2 : cartes diagnostic + sections sous le hero → pas d’état masqué (opacity 0) au repos.
 */
test.describe('Accueil — prefers-reduced-motion (2B.2.1 / 2B.2.2)', () => {
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

  test('StartHere : les 3 titres de cartes sont visibles (pas masqués)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const startHere = page.locator('section[aria-labelledby="start-here-title"]');
    await startHere.scrollIntoViewIfNeeded();
    await expect(startHere.getByRole('heading', { name: 'Je découvre' })).toBeVisible();
    await expect(startHere.getByRole('heading', { name: 'Je révise le fond' })).toBeVisible();
    await expect(startHere.getByRole('heading', { name: "Je m'entraîne" })).toBeVisible();
  });

  test('section sous le hero (strip parcours) visible en reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const journey = page.locator('section[aria-labelledby="journey-strip-title"]');
    await journey.scrollIntoViewIfNeeded();
    await expect(journey.getByText('Parcours type référence')).toBeVisible();
  });
});
