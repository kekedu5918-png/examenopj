import { expect, test } from './fixtures';

async function gotoFondamentauxHub(page: import('@playwright/test').Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/fondamentaux', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: /Les bases pour réussir/i })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId('fondamentaux-grid')).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId('fondamentaux-filter-partie').locator('option')).toHaveCount(7, { timeout: 20_000 });
}

test.describe('/fondamentaux — 2F.3 (hub)', () => {
  test.describe.configure({ mode: 'serial' });
  test('badge 2025 sur la fiche viol-agressions-sexuelles', async ({ page }) => {
    await gotoFondamentauxHub(page);
    const card = page.locator('[data-fiche-slug="viol-agressions-sexuelles"]');
    await expect(card).toBeVisible();
    await expect(card.getByTestId('fondamentaux-badge-2025')).toHaveText(/Mise à jour 2025/);
  });

  test('filtre par partie 1 : fiche Partie V absente, flagrance visible', async ({ page }) => {
    await gotoFondamentauxHub(page);
    const select = page.getByTestId('fondamentaux-filter-partie');
    expect(await page.locator('[data-partie-index="5"]').count()).toBeGreaterThan(0);
    await select.selectOption('1');
    await expect(select).toHaveValue('1', { timeout: 10_000 });
    // Aucune fiche de la partie V ne doit rester (plus robuste qu’un slug seul, charge parallèle Playwright)
    await expect
      .poll(async () => page.locator('[data-partie-index="5"]').count(), { timeout: 15_000 })
      .toBe(0);
    await expect(page.locator('[data-fiche-slug="enquete-flagrance"]')).toBeVisible();
  });

  test('ordre d’affichage par chapitre (data-chapitre non vides croissants)', async ({ page }) => {
    await gotoFondamentauxHub(page);
    const nums = await page.getByTestId('fondamentaux-card').evaluateAll((els) => {
      return els
        .map((el) => {
          const c = el.getAttribute('data-chapitre');
          return c && c.length > 0 ? parseInt(c, 10) : null;
        })
        .filter((n): n is number => n != null && !Number.isNaN(n));
    });
    const sorted = [...nums].sort((a, b) => a - b);
    expect(nums, 'tous les chapitres listés doivent être en ordre croissant').toEqual(sorted);
  });

  test('première carte = chapitre 1 (enquete-flagrance)', async ({ page }) => {
    await gotoFondamentauxHub(page);
    await expect(page.getByTestId('fondamentaux-card').first()).toHaveAttribute('data-fiche-slug', 'enquete-flagrance');
  });

  test('compteur de fiches cohérent', async ({ page }) => {
    await gotoFondamentauxHub(page);
    const total = await page.getByTestId('fondamentaux-card').count();
    const text = await page.getByTestId('fondamentaux-count-total').textContent();
    expect(text).toMatch(new RegExp(`${total} fiches`));
  });
});
