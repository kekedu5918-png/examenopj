import type { FicheFrontmatterV3 } from '@/lib/fondamentaux/fiche-frontmatter-v3';

/** Données de démo pour la preview `/design-system/fiche-v3` et tests visuels. */
export const FICHE_V3_DEMO_DATA: FicheFrontmatterV3 = {
  title: "L'enquête de flagrance — preview V3",
  chapitre: 1,
  partie: 1,
  description:
    'Cadre juridique, durées et pièges fréquents — aperçu premium Institut Judiciaire (données factices de démo).',
  tags: ['flagrance', 'CPP', 'pilote'],
  loi2025: true,
  derniereMiseAJour: '2025-12-01',
  articlesCles: [
    'Art. 53 CPP — Quatre cas de flagrance',
    'Art. 67 CPP — Peine requise',
    'Art. 56 CPP — Perquisitions',
    'Art. 53 al. 1 CPP — Durée initiale',
    'Art. 75 CPP — Bascule préliminaire',
  ],
  stats: [
    { num: '4', label: 'Cas F.R.C.I.' },
    { num: '8 j', label: 'Durée initiale' },
    { num: '16 j', label: 'Durée max.' },
    { num: '100 %', label: 'Contrôle parquet' },
  ],
  schemaMemo: {
    type: 'acronyme',
    titre: 'Les quatre cas (F.R.C.I.)',
    acronyme: 'F.R.C.I.',
    cards: [
      { lettre: 'F', mot: 'Flagrant', desc: 'Infraction en cours de commission.' },
      { lettre: 'R', mot: 'Récent', desc: 'Infraction terminée depuis très peu de temps.' },
      { lettre: 'C', mot: 'Clameur', desc: 'Poursuite par la clameur publique.' },
      { lettre: 'I', mot: 'Indices', desc: 'Indices matériels sur la personne.' },
    ],
  },
  blocs: {
    definition:
      'La flagrance est un cadre procédural d’exception déclenché lorsque l’infraction est flagrante, récente, révélée par clameur ou par indices apparents.',
    piege:
      'Qualifier la flagrance sans remplir les conditions de l’art. 53 CPP expose l’ensemble des actes à nullité d’ordre public.',
    pointCle:
      'La flagrance exige une infraction punie d’emprisonnement ; les contraventions en sont exclues.',
    memo: 'F.R.C.I. + emprisonnement → 8 j + 8 j (PR motivé) → bascule préliminaire obligatoire.',
  },
  timeline: [
    { temps: 'J0', event: 'Ouverture', detail: 'Premier acte de constatation ou saisine.' },
    { temps: 'J+8', event: 'Fin durée initiale', detail: 'Prolongation PR si conditions réunies.' },
  ],
  plan: [
    { num: '1', titre: 'Conditions de déclenchement', duree: '8 min' },
    { num: '2', titre: 'Durées et prolongation', duree: '6 min' },
  ],
};
