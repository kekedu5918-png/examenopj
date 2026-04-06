import type { Flashcard } from '@/data/flashcards-data';
import { flashcardsData } from '@/data/flashcards-data';
import type { InfractionCatalogItem } from '@/data/recapitulatif-data';

function stripBold(s: string): string {
  return s.replace(/\*\*/g, '').trim();
}

/**
 * Associe une ligne récap à une flashcard (même catégorie) pour afficher tentative / complicité quand disponibles.
 */
export function enrichInfractionCatalog(items: InfractionCatalogItem[]): InfractionCatalogItem[] {
  return items.map((item) => {
    if (!item.flashcardsCat) return item;

    const title = stripBold(item.infraction);
    const pool = flashcardsData.filter((c) => c.categorieSlug === item.flashcardsCat);

    const exact = pool.filter((c) => c.nom === title);
    let fc: Flashcard | undefined =
      exact.find((c) => c.tentative != null && c.tentative !== '') ?? exact[0];

    if (!fc) {
      const long = pool.filter((c) => c.nom.length >= 10);
      fc = long.find((c) => title.includes(c.nom));
    }
    if (!fc) {
      fc = pool.find((c) => c.nom.length >= 6 && (title.includes(c.nom) || c.nom.includes(title)));
    }

    const tentative = fc?.tentative;
    const complicite = fc?.complicite;
    if (!tentative?.trim() && !complicite?.trim()) {
      return item;
    }

    return {
      ...item,
      ...(tentative?.trim() ? { tentative: tentative.trim() } : {}),
      ...(complicite?.trim() ? { complicite: complicite.trim() } : {}),
    };
  });
}
