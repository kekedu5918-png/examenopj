import type { Flashcard } from '@/data/flashcards-data';
import { flashcardsData } from '@/data/flashcards-data';
import { getInfractionsOfficielles } from '@/data/infractions-officielles-registry';
import type { InfractionCatalogItem } from '@/data/recapitulatif-data';
import type { InfractionOfficielleRecord } from '@/types/infractions-officielles';
import {
  formatMaterielFromOfficialRecord,
  formatMoralFromOfficialRecord,
  normalizeInfractionTitleKey,
  shouldUseOfficialElements,
} from '@/utils/official-infraction-elements';

function stripBold(s: string): string {
  return s.replace(/\*\*/g, '').trim();
}

function findOfficialForCatalogItem(
  infractionTitle: string,
  records: InfractionOfficielleRecord[],
): InfractionOfficielleRecord | undefined {
  const key = normalizeInfractionTitleKey(infractionTitle);
  return records.find((r) => {
    if (!shouldUseOfficialElements(r)) return false;
    const rk = normalizeInfractionTitleKey(r.titre);
    if (!rk || !key) return false;
    return rk === key || key.includes(rk) || rk.includes(key);
  });
}

/**
 * Associe une ligne récap à une flashcard (même catégorie) pour afficher tentative / complicité quand disponibles.
 * Si une entrée `reference/audit/infractions_officielles.json` est marquée complète et correspond au titre,
 * les éléments matériel et moral du fascicule (audit) remplacent ceux du récap TypeScript.
 */
export function enrichInfractionCatalog(items: InfractionCatalogItem[]): InfractionCatalogItem[] {
  const official = getInfractionsOfficielles();

  return items.map((item) => {
    let next: InfractionCatalogItem = item;

    const match = findOfficialForCatalogItem(item.infraction, official);
    if (match) {
      const materiel = formatMaterielFromOfficialRecord(match);
      const moral = formatMoralFromOfficialRecord(match);
      const fromAudit = !!(materiel || moral);
      next = {
        ...next,
        ...(materiel ? { materiel } : {}),
        ...(moral ? { moral } : {}),
        ...(fromAudit ? { elementsSource: 'fascicule_audit' as const } : {}),
      };
    }

    if (!next.flashcardsCat) return next;

    const title = stripBold(next.infraction);
    const pool = flashcardsData.filter((c) => c.categorieSlug === next.flashcardsCat);

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
      return next;
    }

    return {
      ...next,
      ...(tentative?.trim() ? { tentative: tentative.trim() } : {}),
      ...(complicite?.trim() ? { complicite: complicite.trim() } : {}),
    };
  });
}
