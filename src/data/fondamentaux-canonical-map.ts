/**
 * Fiches « point d’accès » (leçons L…) qui renvoient vers une synthèse de référence déjà publiée.
 * Une seule fiche source = contenu complet ; les doublons naviguent vers l’URL canonique.
 */
export const FONDAMENTAUX_FICHE_CANONIQUE_ID: Record<string, string> = {
  /** Corpus leçons GAV — synthèse unique : `garde-a-vue` (tableau 706-88, mineurs, droits, reprise…). */
  L301: 'garde-a-vue',
  L302: 'garde-a-vue',
  L303: 'garde-a-vue',
  L304: 'garde-a-vue',
  L305: 'garde-a-vue',
  /** Présentation au magistrat : traitée dans la chaîne GAV / mineurs de la fiche de référence. */
  L307: 'garde-a-vue',
  /** L306 (contrôles CGLPL / locaux) reste une entrée autonome — pas de doublon dans les fiches « part ». */
  /** Leçon 78-2 — doublon de la fiche « contrôle d’identité ». */
  L1101: 'controle-identite',
};
