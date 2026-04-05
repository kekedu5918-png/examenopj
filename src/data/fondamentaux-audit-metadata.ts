/**
 * Audit « rangement » des fiches fondamentaux : index génératif + suggestions de regroupement.
 * Maintenir ce fichier quand une fiche est fusionnée ou renommée.
 */

import { FICHES } from '@/data/fondamentaux-data';

export type FondamentauxFicheIndexRow = {
  id: string;
  titre: string;
  categorie: string;
  fasciculeNumero: number | undefined;
  source: 'part' | 'chapters';
};

function sourceForId(id: string): 'part' | 'chapters' {
  if (
    /^L\d+$/.test(id) ||
    id.startsWith('repères-') ||
    id.startsWith('synthese-')
  ) {
    return 'chapters';
  }
  return 'part';
}

/** Liste plat de toutes les fiches affichées sur /fondamentaux (ordre d’insertion des modules). */
export const FONDAMENTAUX_FICHES_INDEX: FondamentauxFicheIndexRow[] = FICHES.map((f) => ({
  id: f.id,
  titre: f.titre,
  categorie: f.categorie,
  fasciculeNumero: f.fasciculeNumero ?? undefined,
  source: sourceForId(f.id),
}));

export type FondamentauxMergeSuggestion = {
  theme: string;
  ficheIds: string[];
  /** Garder des fiches séparées mais liées par `regles` / accroches, ou fusionner le contenu dans une seule fiche. */
  action: 'keep_cross_link' | 'merge_candidate' | 'review_duplicate_intro';
  rationale: string;
};

/**
 * Plan de regroupement (éditorial). Les entrées `merge_candidate` exigent une passe manuelle
 * pour éviter les contradictions entre `fondamentaux-fiches-part*` et `fondamentaux-from-chapters`.
 */
export const FONDAMENTAUX_MERGE_SUGGESTIONS: FondamentauxMergeSuggestion[] = [
  {
    theme: 'Privation de liberté et auditions (mineurs / majeurs)',
    ficheIds: ['garde-a-vue', 'audition', 'controle-identite', 'repères-f06-mineurs-famille'],
    action: 'keep_cross_link',
    rationale:
      'Une seule « méga-fiche » serait illisible ; conserver des fiches distinctes avec renvois explicites sur retenue 10–13 ans, GAV 13–16 ans et auditions (L303/L307 / F06).',
  },
  {
    theme: 'Actes d’enquête matériels',
    ficheIds: ['perquisition', 'saisies-scelles', 'interpellation', 'mandats-justice'],
    action: 'keep_cross_link',
    rationale:
      'Regroupement logique pour révision ; en UI, l’affichage par fascicule F01–F15 couvre déjà le fil programme. Ajouter des liens « Voir aussi » dans les accroches si besoin.',
  },
  {
    theme: 'Synthèses chapitres vs repères F06 / F08–F15',
    ficheIds: [
      'repères-f06-mineurs-famille',
      'synthese-liberte-loi-sanction',
      'synthese-pj-instruction-jugement',
      'synthese-parquet-controle-nullite',
    ],
    action: 'review_duplicate_intro',
    rationale:
      'Vérifier que les accroches « repères » ne contredisent pas les synthèses longues du même thème ; harmoniser les durées (GAV, mineurs) à un seul endroit puis synchroniser.',
  },
  {
    theme: 'DPG — éléments et causes',
    ficheIds: ['elements-constitutifs', 'classification-infractions', 'circonstances-aggravantes', 'tentative-penale'],
    action: 'merge_candidate',
    rationale:
      'Carte mentale commune épreuve 1 ; envisager une fiche « Moteur qualification » avec sections repliables plutôt que quatre entrées redondantes en navigation par thème.',
  },
];
