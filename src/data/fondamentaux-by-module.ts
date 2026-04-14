import { FICHES } from '@/data/fondamentaux-fiches';

/** Fiches liées à un module interne (`f11`, `f12`…), via `lienQuiz` ou `fasciculeId` — sans exposer de chemins `/cours`. */
export function getFondamentauxLinksForCourseModule(moduleId: string): { id: string; titre: string; href: string }[] {
  const m = moduleId.trim().toLowerCase();
  const needle = `f=${m}`;
  return FICHES.filter((f) => f.fasciculeId?.toLowerCase() === m || (f.lienQuiz?.includes(needle) ?? false)).map(
    (f) => ({
      id: f.id,
      titre: f.titre,
      href: `/fondamentaux/${f.id}`,
    }),
  );
}
