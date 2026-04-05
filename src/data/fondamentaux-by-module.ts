import { FICHES } from '@/data/fondamentaux-fiches';

/** Fiches « Fondamentaux » dont le lien module pointe vers ce fascicule (ex. f11 → cadres d’enquête, GAV…). */
export function getFondamentauxLinksForCourseModule(moduleId: string): { id: string; titre: string; href: string }[] {
  const prefix = `/cours/modules/${moduleId}`;
  return FICHES.filter((f) => f.lienModule === prefix).map((f) => ({
    id: f.id,
    titre: f.titre,
    href: `/fondamentaux/${f.id}`,
  }));
}
