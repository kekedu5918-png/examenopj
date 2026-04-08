/**
 * Méta « qualité contenu » : à mettre à jour après chaque passe de relecture (fascicule + Légifrance).
 * Affiché sur les rubriques les plus sensibles juridiquement.
 */
export const CONTENT_REVIEW = {
  /** ISO 8601 date (affichage localisé côté UI). */
  lastReviewDate: '2026-04-05',
  /** Résumé de la portée de la dernière passe (une ligne lisible candidat). */
  scopeShort:
    'PV ME1 (gabarit + exercices), référentiel infractions (bulle), compléments quiz procédure / DPS.',
} as const;

export const LEGIFRANCE_HOME = 'https://www.legifrance.gouv.fr';
