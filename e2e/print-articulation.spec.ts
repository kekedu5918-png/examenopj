import { expect, test } from './fixtures';

/**
 * Bug 0.1 — non-régression : à l'impression, le chrome du site (Header
 * sticky, Footer, raccourci flottant) doit disparaître pour ne laisser
 * que le bloc `#articulation-print-area`.
 *
 * On valide via `page.emulateMedia({ media: 'print' })`. On ne va pas
 * jusqu'au handler `window.print()` (boîte système), on remplit deux
 * cartouches et on termine pour faire apparaître le bloc imprimable.
 */
test.describe('Impression /entrainement/articulation', () => {
  test('le chrome du site disparaît en mode print', async ({ page }) => {
    await page.goto('/entrainement/articulation');

    /** Le header est rendu en SSR — vérifier d'abord qu'il porte bien le marqueur. */
    const header = page.locator('header[data-site-header]');
    const footer = page.locator('footer[data-site-footer]');
    await expect(header).toBeAttached({ timeout: 15_000 });
    await expect(footer).toBeAttached();

    /** Saisie minimale : 2 cartouches puis « Terminer ». */
    async function remplirCartouche(numero: number, titre: string, contenu: string) {
      await page.getByLabel('Date', { exact: false }).nth(0).fill('19/04/26');
      await page.getByLabel('Heure', { exact: false }).nth(0).fill('10h00');
      await page.locator(`#art-titre-${numero}`).fill(titre);
      await page.locator(`#art-contenu-${numero}`).fill(contenu);
      await page.getByRole('button', { name: /Valider cette côte/i }).click();
    }

    await remplirCartouche(1, 'SAISINE — PLAINTE', '- Réception plainte\n- Qualification');
    await remplirCartouche(2, 'TRANSPORT SUR LES LIEUX', '- Constatations\n- Photos');

    await page.getByRole('button', { name: /Terminer l'articulation/i }).click();

    const printArea = page.locator('#articulation-print-area');
    await expect(printArea).toBeVisible();

    /** Bascule en émulation print et vérifie les display computés. */
    await page.emulateMedia({ media: 'print' });

    await expect.poll(async () => {
      return page.evaluate(() => {
        const h = document.querySelector('header[data-site-header]') as HTMLElement | null;
        return h ? getComputedStyle(h).display : 'absent';
      });
    }).toBe('none');

    await expect.poll(async () => {
      return page.evaluate(() => {
        const f = document.querySelector('footer[data-site-footer]') as HTMLElement | null;
        return f ? getComputedStyle(f).display : 'absent';
      });
    }).toBe('none');

    /** Le raccourci flottant doit être marqué pour disparaître à l'impression. */
    await expect.poll(async () => {
      return page.evaluate(() => {
        const el = document.querySelector('[data-print-hide]') as HTMLElement | null;
        return el ? getComputedStyle(el).display : 'absent';
      });
    }).toBe('none');

    /** Le bloc imprimable, lui, doit rester visible. */
    await expect.poll(async () => {
      return page.evaluate(() => {
        const el = document.querySelector('#articulation-print-area') as HTMLElement | null;
        return el ? getComputedStyle(el).display : 'absent';
      });
    }).not.toBe('none');
  });
});
