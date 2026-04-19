import { expect, test } from './fixtures';

/**
 * Verrou du mode clair (Phase 1bis) : même avec `localStorage.theme = 'light'`,
 * `<html>` doit rester en `.dark` (script inline layout + ThemeProvider).
 */
test.describe('Mode light verrouillé', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem('theme', 'light');
      } catch {
        /* ignore */
      }
    });
  });

  const pages: { name: string; path: string }[] = [
    { name: 'home', path: '/' },
    { name: 'fondamentaux', path: '/fondamentaux' },
    { name: 'espace-gratuit', path: '/espace-gratuit' },
    { name: 'articulation', path: '/entrainement/articulation' },
  ];

  for (const { name, path } of pages) {
    test(`${path} — html.dark + capture`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.ok(), `${path} doit répondre OK`).toBeTruthy();
      expect(
        await page.evaluate(() => document.documentElement.classList.contains('dark')),
        'document.documentElement doit garder la classe dark malgré localStorage.theme=light',
      ).toBe(true);
      await expect(page).toHaveScreenshot(`light-locked-${name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });
  }

  test('/design-system reste lisible (isolation DS)', async ({ page }) => {
    const response = await page.goto('/design-system');
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Institut Judiciaire');
  });
});
