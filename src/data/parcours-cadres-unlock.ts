import type { CadresStepSlug } from '@/data/parcours-cadres-enquetes';
import { CADRES_STEPS } from '@/data/parcours-cadres-enquetes';

export type CadresProgressLike = Partial<
  Record<
    CadresStepSlug,
    {
      lesson_completed?: boolean;
      quiz_passed?: boolean;
    }
  >
>;

const ORDER: CadresStepSlug[] = CADRES_STEPS.map((s) => s.slug);

/** Logique pure — utilisée côté client et serveur. */
export function isCadresStepUnlocked(slug: CadresStepSlug, p: CadresProgressLike): boolean {
  if (slug === 'intro') return true;
  if (slug === 'synthese') {
    const need: CadresStepSlug[] = ['flagrance', 'garde-a-vue', 'enquete-preliminaire'];
    return need.every((s) => p[s]?.quiz_passed === true);
  }
  if (slug === 'flagrance') {
    return p.intro?.lesson_completed === true;
  }
  const i = ORDER.indexOf(slug);
  if (i <= 0) return true;
  const prevSlug = ORDER[i - 1]!;
  if (prevSlug === 'intro') {
    return p.intro?.lesson_completed === true;
  }
  return p[prevSlug as CadresStepSlug]?.quiz_passed === true;
}
