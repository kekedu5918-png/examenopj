import { fasciculesList } from '@/data/fascicules-list';

/**
 * Entrée alignée sur `recordQuizAttempt` : relie une session quiz aux leçons « QCM guidé » (*-2)
 * du parcours `learning_path` lorsque le domaine fascicule / domaine correspond.
 *
 * Règle métier : quiz **thématique** (fascicule ou domaine) DPS/DPG → leçon `inf-2` (pôle infractions) ;
 * fascicules / domaine **procédure** → `fla-2`. Quiz **global** : pas de pont (pas de leçon unique).
 *
 * @see supabase/migrations/*learning_path* — `client_key` inf-2, fla-2
 */
export type QuizToPathBridgeInput = {
  mode: 'global' | 'fascicule' | 'module' | 'domain';
  fasciculeNum?: number | null;
  domainKey?: string | null;
};

/** Leçons « practice » (QCM guidé) ciblées par le quiz multi-thèmes. */
export const QUIZ_BRIDGE_CLIENT_KEYS = {
  infractionsQcm: 'inf-2',
  procedureQcm: 'fla-2',
} as const;

export function quizAttemptToLessonClientKey(input: QuizToPathBridgeInput): string | null {
  if (input.mode === 'global') {
    return null;
  }

  if (input.mode === 'domain' && input.domainKey) {
    if (input.domainKey === 'DPS' || input.domainKey === 'DPG') {
      return QUIZ_BRIDGE_CLIENT_KEYS.infractionsQcm;
    }
    if (input.domainKey === 'Procédure pénale') {
      return QUIZ_BRIDGE_CLIENT_KEYS.procedureQcm;
    }
    return null;
  }

  if ((input.mode === 'fascicule' || input.mode === 'module') && input.fasciculeNum != null) {
    const meta = fasciculesList.find((f) => f.numero === input.fasciculeNum);
    if (!meta) return null;
    if (meta.domaine === 'Procédure pénale') {
      return QUIZ_BRIDGE_CLIENT_KEYS.procedureQcm;
    }
    if (meta.domaine === 'DPS' || meta.domaine === 'DPG') {
      return QUIZ_BRIDGE_CLIENT_KEYS.infractionsQcm;
    }
    return null;
  }

  return null;
}
