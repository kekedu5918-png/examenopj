/**
 * Mapping fascicule (module thématique) → fiche cours markdown la plus proche.
 *
 * Permet aux cartes « thèmes du programme » du dashboard d'envoyer le candidat sur
 * la fiche cours pertinente plutôt que sur le hub `/fondamentaux` générique.
 *
 * Lorsque plusieurs fiches couvrent le thème, on retient celle qui synthétise le mieux
 * le contenu central. Pour les fascicules sans fiche dédiée, on revient au hub par défaut
 * dans le composant appelant.
 */

const FASCICULE_TO_COURS_SLUG: Readonly<Record<number, string>> = {
  1: 'crimes-personnes',
  2: 'crimes-biens',
  3: 'crimes-personnes',
  4: 'crimes-biens',
  5: 'crimes-personnes',
  6: 'mineurs-cjpm',
  7: 'fouille-vehicule',
  8: 'libertes-publiques',
  9: 'loi-penale-responsabilite',
  10: 'sanction-penale',
  11: 'cadres-enquete',
  12: 'instruction-mandats',
  13: 'juridictions-jugement',
  14: 'police-judiciaire-statut',
  15: 'nullites-procedure',
};

/**
 * Fiches secondaires (sous-thèmes) recommandées par fascicule, après la fiche principale.
 * Permet d'afficher des suggestions « pour aller plus loin » sans alourdir la card principale.
 */
const FASCICULE_SECONDARY_SLUGS: Readonly<Record<number, readonly string[]>> = {
  6: ['auditions'],
  11: ['garde-a-vue', 'controle-identite', 'auditions', 'perquisition'],
  12: ['perquisition', 'saisies-scelles', 'instruction-mandats'],
  14: ['police-judiciaire-statut'],
  15: ['nullites-procedure'],
};

/** Renvoie le chemin de la fiche cours associée au fascicule, ou `null` si non mappé. */
export function getCoursPathForFascicule(numero: number): string | null {
  const slug = FASCICULE_TO_COURS_SLUG[numero];
  return slug ? `/fondamentaux/${slug}` : null;
}

/** Renvoie les chemins des fiches secondaires associées au fascicule (vide si aucun). */
export function getSecondaryCoursPathsForFascicule(numero: number): string[] {
  const slugs = FASCICULE_SECONDARY_SLUGS[numero];
  return slugs ? slugs.map((s) => `/fondamentaux/${s}`) : [];
}

/** Renvoie l'URL du quiz pré-filtré sur le fascicule. */
export function getQuizPathForFascicule(numero: number): string {
  return `/quiz?mode=module&f=f${String(numero).padStart(2, '0')}`;
}
