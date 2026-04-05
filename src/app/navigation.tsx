export const navigation = {
  main: [
    {
      name: 'Cours',
      children: [
        {
          name: 'Fondamentaux',
          href: '/fondamentaux',
          description: 'Les notions clés à maîtriser',
        },
        {
          name: 'Enquêtes',
          href: '/cours/enquetes',
          description: 'Mises en situation complètes',
        },
      ],
    },
    {
      name: 'Infractions',
      children: [
        {
          name: 'Référentiel',
          href: '/infractions',
          description: 'Rechercher une infraction',
        },
        {
          name: 'Récapitulatif',
          href: '/entrainement/recapitulatif',
          description: 'Tableau élément légal / matériel / moral',
        },
      ],
    },
    {
      name: 'Épreuves',
      children: [
        {
          name: 'Vue d’ensemble (3 épreuves)',
          href: '/epreuves',
          description: 'Durées, attendus correcteurs, liens rapides',
        },
        {
          name: 'Épreuve 1 — Qualification juridique',
          href: '/epreuves/epreuve-1',
          description: 'Méthode et mise en forme',
        },
        {
          name: 'Épreuve 2 — Procédure (articulation + PV + rapport)',
          href: '/epreuves/epreuve-2',
          description: 'Rédaction et enchaînements',
        },
        {
          name: 'Épreuve 3 — Oral (compte-rendu parquet)',
          href: '/epreuves/epreuve-3',
          description: 'Préparation orale',
        },
      ],
    },
    {
      name: 'Entraînement',
      children: [
        {
          name: 'Parcours candidat',
          href: '/parcours-candidat',
          description: 'Fondamentaux → récap → enquête → épreuve 2 → articulation',
        },
        {
          name: 'Quiz (QCM)',
          href: '/entrainement/quiz',
          description: 'Questions par thème ou domaine',
        },
        {
          name: 'Flashcards (infractions)',
          href: '/entrainement/flashcards',
          description: 'Mémorisation active',
        },
        {
          name: 'Articulation interactive',
          href: '/entrainement/articulation',
          description: 'Enchaîner qualification et procédure',
        },
      ],
    },
    { name: 'Premium', href: '/pricing' },
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
