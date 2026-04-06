import { fasciculesList } from '@/data/fascicules-list';
import { FICHES } from '@/data/fondamentaux-fiches';

export type FondamentauxCoverageRow = {
  moduleId: string;
  href: string;
  numero: number;
  titre: string;
  ficheIds: string[];
};

/**
 * Grille de couverture : module fascicule officiel → identifiants des fiches « fondamentaux » associées.
 * À mettre à jour lors d’un audit sommaire F01–F15 ou fusion avec votre document de révision.
 */
export function getFondamentauxCoverageRows(): FondamentauxCoverageRow[] {
  const acc = new Map<string, string[]>();
  for (const f of FICHES) {
    if (!f.lienModule) continue;
    const id = f.lienModule.replace(/^\/cours\/modules\//, '');
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
      href: `/cours/modules/${meta.id}`,
      numero: meta.numero,
      titre: meta.titre,
      ficheIds: [...new Set(ficheIds)].sort(),
    });
  }
  return rows.sort((a, b) => a.numero - b.numero);
}

/** Fascicules du programme sans fiche fondamentaux liée encore (repère pour audit). */
export function getFondamentauxModulesSansFiche(): { id: string; numero: number; titre: string }[] {
  const rows = getFondamentauxCoverageRows();
  const couverts = new Set(rows.map((r) => r.moduleId));
  return fasciculesList
    .filter((f) => !couverts.has(f.id))
    .map((f) => ({ id: f.id, numero: f.numero, titre: f.titre }));
}
