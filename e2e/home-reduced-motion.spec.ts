import { expect, test } from './fixtures';

/**
 * Reduced motion.
 * 2B.2.1 : compteurs « Chiffres clés » → valeurs finales immédiates.
 * 2B.2.2 : cartes diagnostic + sections sous le hero → pas d’état masqué (opacity 0) au repos.
 * 2B.2.3 : hero ATF — data-reduced-motion pastille / flèche ; quiz cliquable.
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

test.describe('Accueil — prefers-reduced-motion (2B.2.3 hero ATF)', () => {
  test('pastille + flèche CTA : data-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('[data-testid="hero-pastille"]')).toHaveAttribute('data-reduced-motion', 'true', {
      timeout: 15_000,
    });
    await expect(page.locator('[data-testid="hero-cta-arrow"]')).toHaveAttribute('data-reduced-motion', 'true', {
      timeout: 15_000,
    });
  });

  test('quiz : première option (A) visible et cliquable', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const list = page.locator('ul[aria-label="Propositions de réponse"]');
    await list.scrollIntoViewIfNeeded();
    const firstOption = list.locator('li').first();
    await expect(firstOption).toBeVisible();
    await expect(firstOption.locator('span.font-mono').filter({ hasText: 'A' })).toBeVisible();
    await firstOption.click();
    await expect(page.locator('[role="status"]').first()).toBeVisible({ timeout: 10_000 });
  });
});
