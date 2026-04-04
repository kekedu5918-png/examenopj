export const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    {
      name: 'Cours',
      children: [
        {
          name: 'Hub cours',
          href: '/cours',
          description: 'Cours synthétiques, fondamentaux, guide, modèles de PV.',
        },
        {
          name: 'Enquêtes (entraînement)',
          href: '/cours/enquetes',
          description: 'Planches Alpha & Bravo : articulation, PV, rapport.',
        },
      ],
    },
    {
      name: 'Épreuves',
      children: [
        {
          name: 'Épreuve 1 — DPG/DPS',
          href: '/epreuves/epreuve-1',
          description: 'Méthodologie Droit Pénal',
        },
        {
          name: 'Épreuve 2 — Procédure',
          href: '/epreuves/epreuve-2',
          description: 'PV, Articulation, Synthèse',
        },
        {
          name: 'Épreuve 3 — Oral',
          href: '/epreuves/epreuve-3',
          description: 'CR Parquet',
        },
      ],
    },
    { name: 'Modules de cours', href: '/cours/modules' },
    { name: 'Infractions', href: '/infractions' },
    { name: 'Entraînement', href: '/entrainement' },
  ],
} as const;

export type NavigationMainItem =
  | { readonly name: string; readonly href: string }
  | {
      readonly name: string;
      readonly children: readonly {
        readonly name: string;
        readonly href: string;
        readonly description: string;
      }[];
    };
