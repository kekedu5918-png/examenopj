/**
 * Programme « document centre » — Enquête Alpha.
 * Aucun contenu juridique détaillé : compléter uniquement avec textes validés.
 * Miroir éditorial : content/enquetes/alpha-programme.md
 */

export const ALPHA_FORMATION_PLACEHOLDER = '[À COMPLÉTER]' as const;

export type AlphaFormationThemeItem = {
  id: string;
  /** Intitulé officiel du programme (tel que sur le document de formation). */
  titre: string;
  /** Synthèse ou fiche : uniquement après validation éditoriale. */
  corps: typeof ALPHA_FORMATION_PLACEHOLDER | string;
  /** Fiche riche pré-assemblée (ex. premier thème procédure Alpha). */
  richModuleId?: 'cadres-flagrance';
};

export type AlphaFormationSection = {
  id: 'dps' | 'procedure';
  titre: string;
  items: AlphaFormationThemeItem[];
};

export const ALPHA_FORMATION_TITRE = 'Enquête « Alpha »';

export const ALPHA_FORMATION_SCENARIO =
  'Vol dans un domicile, auteur identifié en flagrant délit.';

export const ALPHA_FORMATION_SECTIONS: AlphaFormationSection[] = [
  {
    id: 'dps',
    titre: 'Droit pénal spécial',
    items: [
      {
        id: 'biens',
        titre:
          'Atteintes aux biens (vol, extorsion, escroquerie et infractions voisines, détournements, recel et infractions assimilées, falsification des moyens de paiement)',
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
    ],
  },
  {
    id: 'procedure',
    titre: 'Procédure pénale',
    items: [
      {
        id: 'cadres-flag',
        titre: "Les cadres juridiques (généralités), l'enquête de flagrant délit",
        corps: ALPHA_FORMATION_PLACEHOLDER,
        richModuleId: 'cadres-flagrance',
      },
      {
        id: 'pv-probant',
        titre: 'Le formalisme et la valeur probante des procès-verbaux',
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'plainte-taj',
        titre:
          "La plainte et l'audition de témoin. Les droits des victimes ; la présentation et l'identification à partir de fiches TAJ",
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'pv-renseignements',
        titre: 'Le PV de renseignements',
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'constatations-voisinage',
        titre: "Les constatations et l'enquête de voisinage",
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'presentation-suspect',
        titre: 'La présentation de suspect à témoin ou victime',
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'interpellation',
        titre: "L'interpellation",
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'gav-majeur',
        titre: 'La garde à vue (régime général majeur)',
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'perquisition-fouille',
        titre: 'La perquisition et la fouille intégrale',
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'saisie-scelles',
        titre: 'La saisie et la mise sous scellé, la restitution',
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'audition-mis-en-cause',
        titre: "L'audition du mis en cause",
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'action-publique-civile',
        titre: "L'action publique et l'action civile",
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
      {
        id: 'saisine-convocation',
        titre: 'La saisine des juridictions de jugement — la convocation par OPJ',
        corps: ALPHA_FORMATION_PLACEHOLDER,
      },
    ],
  },
];
