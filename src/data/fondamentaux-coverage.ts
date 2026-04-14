import { fasciculesList } from '@/data/fascicules-list';
import { FICHES } from '@/data/fondamentaux-fiches';
import type { Fiche } from '@/data/fondamentaux-types';

export type FondamentauxCoverageRow = {
  moduleId: string;
  href: string;
  numero: number;
  titre: string;
  ficheIds: string[];
};

function moduleKeyForFiche(f: Fiche): string | null {
  if (f.fasciculeId?.trim()) return f.fasciculeId.trim().toLowerCase();
  const q = f.lienQuiz;
  if (q) {
    const m = q.match(/[?&]f=(f\d+)/i);
    if (m) return m[1]!.toLowerCase();
  }
  return null;
}

/**
 * Grille de couverture : thème programme (référence interne f01–f15) → fiches « fondamentaux » associées.
 */
export function getFondamentauxCoverageRows(): FondamentauxCoverageRow[] {
  const acc = new Map<string, string[]>();
  for (const f of FICHES) {
    const id = moduleKeyForFiche(f);
    if (!id) continue;
    const prev = acc.get(id) ?? [];
    prev.push(f.id);
    acc.set(id, prev);
  }

  const rows: FondamentauxCoverageRow[] = [];
  for (const meta of fasciculesList) {
    const ficheIds = acc.get(meta.id);
    if (!ficheIds?.length) continue;
    rows.push({
      moduleId: meta.id,
      href: '/fondamentaux',
      numero: meta.numero,
      titre: meta.titre,
      ficheIds: [...new Set(ficheIds)].sort(),
    });
  }
  return rows.sort((a, b) => a.numero - b.numero);
}

/** Thèmes du programme sans fiche fondamentaux liée encore (repère pour audit). */
export function getFondamentauxModulesSansFiche(): { id: string; numero: number; titre: string }[] {
  const rows = getFondamentauxCoverageRows();
  const couverts = new Set(rows.map((r) => r.moduleId));
  return fasciculesList
    .filter((f) => !couverts.has(f.id))
    .map((f) => ({ id: f.id, numero: f.numero, titre: f.titre }));
}
