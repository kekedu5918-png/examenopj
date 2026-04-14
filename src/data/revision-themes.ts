/**
 * Parcours de révision par thème : aligné sur la logique formation
 * (conditions → cours → rubriques → exercices → épreuves 1 · 2 · 3).
 *
 * Les trois planches du présentiel document-centre sont traitées dans l’ordre
 * **Alpha → Bravo → Charlie** ; les autres enquêtes du site restent un complément
 * (hub), pas le fil principal de révision.
 */

export type RevisionEtapeCle =
  | 'conditions'
  | 'cours'
  | 'rubriques'
  | 'exercices'
  | 'epreuve1'
  | 'epreuve2'
  | 'epreuve3';

export type RevisionLien = { href: string; label: string };

/** Ordre chronologique des planches formation (comme sur le document centre). */
export const FORMATION_ENQUETES_CHRONO: RevisionLien[] = [
  { href: '/enquetes/alpha', label: '1 — Alpha' },
  { href: '/enquetes/bravo', label: '2 — Bravo' },
  { href: '/enquetes/charlie', label: '3 — Charlie' },
];

export type RevisionEtape = {
  cle: RevisionEtapeCle;
  titre: string;
  hint: string;
  liens: RevisionLien[];
};

/** Palette UI pour animations et dégradés (voir `RevisionThemesJourney`). */
export type RevisionThemeVisualKey = 'violet' | 'rose' | 'amber' | 'cyan' | 'emerald' | 'sky';

export type RevisionTheme = {
  id: string;
  titre: string;
  sousTitre: string;
  emoji: string;
  visualKey: RevisionThemeVisualKey;
  /** Classes Tailwind pour accent (bordure / texte) */
  accent: string;
  accentSoft: string;
  /** Rubriques jugées essentielles pour la révision sur ce thème */
  rubriquesEssentielles: string[];
  etapes: RevisionEtape[];
};

const ETAPES_META: Record<
  RevisionEtapeCle,
  { titre: string; hint: string }
> = {
  conditions: {
    titre: 'Conditions & cadre',
    hint: 'Repères et filtres : quand ce régime s’applique, quelles limites.',
  },
  cours: {
    titre: 'Cours thème',
    hint: 'Synthèse module officielle : structure ta lecture avant les cas.',
  },
  rubriques: {
    titre: 'Rubriques liées',
    hint: 'Référentiel infractions + récap : titres exacts et comparaisons.',
  },
  exercices: {
    titre: 'Exercices thème',
    hint: 'Quiz, flashcards, articulation : activer la mémoire sur ce bloc.',
  },
  epreuve1: {
    titre: 'Épreuve 1',
    hint: 'Qualifications, PRQC, dissertation / cas sur ce périmètre.',
  },
  epreuve2: {
    titre: 'Épreuve 2',
    hint: 'Dossier : même geste que sur les planches Alpha → Bravo → Charlie (ordre formation).',
  },
  epreuve3: {
    titre: 'Épreuve 3',
    hint: 'Oral : reformuler les points saillants du thème comme au jury.',
  },
};

function etape(
  cle: RevisionEtapeCle,
  liens: RevisionLien[],
  override?: Partial<{ titre: string; hint: string }>,
): RevisionEtape {
  const m = ETAPES_META[cle];
  return {
    cle,
    titre: override?.titre ?? m.titre,
    hint: override?.hint ?? m.hint,
    liens,
  };
}

export const REVISION_THEMES: RevisionTheme[] = [
  {
    id: 'socle-procedure',
    titre: 'Socle procédural',
    sousTitre: 'Procès pénal, OPJ / APJ, cadres d’enquête',
    emoji: '⚖️',
    visualKey: 'violet',
    accent: 'border-violet-500/50 text-violet-200',
    accentSoft: 'from-violet-500/15 to-transparent',
    rubriquesEssentielles: [
      'Les trois cadres (flagrance, préliminaire, CR) et leurs effets sur les actes',
      'Durées GAV et visas — à citer sans improviser',
      'Hiérarchie parquet / magistrat / juridictions saisies',
    ],
    etapes: [
      etape('conditions', [
        { href: '/fondamentaux/cadres-enquete', label: 'Cadres d’enquête' },
        { href: '/fondamentaux/garde-a-vue', label: 'Garde à vue' },
        { href: '/fondamentaux', label: 'Index fondamentaux' },
      ]),
      etape('cours', [
        { href: '/fondamentaux', label: 'Thème 11 — Cadres et actes PJ' },
        { href: '/fondamentaux', label: 'Thème 14 — Police judiciaire' },
      ]),
      etape('rubriques', [
        { href: '/infractions', label: 'Référentiel infractions' },
        { href: '/entrainement/recapitulatif', label: 'Tableaux récap' },
      ]),
      etape('exercices', [
        { href: '/quiz?mode=module&f=f11', label: 'Quiz thème 11' },
        { href: '/flashcards?f=f11', label: 'Flashcards thème 11' },
        { href: '/entrainement/articulation', label: 'Articulation' },
      ]),
      etape('epreuve1', [{ href: '/epreuves/epreuve-1', label: 'Méthode Épreuve 1' }]),
      etape('epreuve2', [
        { href: '/epreuves/epreuve-2', label: 'Méthode Épreuve 2' },
        { href: '/entrainement/redaction-pv', label: 'Modèles PV' },
      ]),
      etape('epreuve3', [{ href: '/epreuves/epreuve-3', label: 'Méthode Épreuve 3' }]),
    ],
  },
  {
    id: 'personnes',
    titre: 'Atteintes aux personnes',
    sousTitre: 'Vie, intégrité, violences, agressions sexuelles',
    emoji: '🛡️',
    visualKey: 'rose',
    accent: 'border-rose-500/50 text-rose-200',
    accentSoft: 'from-rose-500/15 to-transparent',
    rubriquesEssentielles: [
      'Éléments matériel / moral / circonstances par famille d’infractions',
      'ITT, qualification vs tentatives / complicité',
      'Titres PRQC exacts depuis le référentiel',
    ],
    etapes: [
      etape('conditions', [{ href: '/fondamentaux/crimes-personnes', label: 'Synthèse — atteintes aux personnes' }]),
      etape('cours', [{ href: '/fondamentaux/crimes-personnes', label: 'Lecture guidée' }]),
      etape('rubriques', [
        { href: '/infractions?q=violences', label: 'Référentiel — violences' },
        { href: '/entrainement/recapitulatif?f=f01p1', label: 'Récap partie 1' },
      ]),
      etape('exercices', [
        { href: '/quiz?f=f01', label: 'Quiz thème 01' },
        { href: '/flashcards?f=f01', label: 'Flashcards thème 01' },
      ]),
      etape('epreuve1', [{ href: '/epreuves/epreuve-1', label: 'Méthode Épreuve 1' }]),
      etape('epreuve2', [
        { href: '/epreuves/epreuve-2', label: 'Méthode Épreuve 2' },
        { href: '/enquetes/bravo', label: '2 — Bravo (personnes)' },
        { href: '/enquetes/charlie', label: '3 — Charlie (sexuel / CR)' },
      ]),
      etape('epreuve3', [{ href: '/epreuves/epreuve-3', label: 'Oral — thème personnes' }]),
    ],
  },
  {
    id: 'biens',
    titre: 'Atteintes aux biens',
    sousTitre: 'Vol, escroquerie, abus de confiance, recel…',
    emoji: '💼',
    visualKey: 'amber',
    accent: 'border-amber-500/50 text-amber-200',
    accentSoft: 'from-amber-500/15 to-transparent',
    rubriquesEssentielles: [
      'Distinction vol / escroquerie / abus de confiance au geste',
      'Concours, tentative, complicité sur faits patrimoniaux',
      'Lien avec constatations et PV (Alpha, scellés)',
    ],
    etapes: [
      etape('conditions', [{ href: '/fondamentaux/crimes-biens', label: 'Synthèse — atteintes aux biens' }]),
      etape('cours', [{ href: '/fondamentaux/crimes-biens', label: 'Lecture guidée' }]),
      etape('rubriques', [
        { href: '/infractions?q=vol', label: 'Référentiel — biens' },
        { href: '/entrainement/recapitulatif', label: 'Récap comparatif' },
      ]),
      etape('exercices', [
        { href: '/quiz?f=f02', label: 'Quiz thème 02' },
        { href: '/flashcards?f=f02', label: 'Flashcards thème 02' },
      ]),
      etape('epreuve1', [{ href: '/epreuves/epreuve-1', label: 'Cas & dissertation E1' }]),
      etape('epreuve2', [
        { href: '/epreuves/epreuve-2', label: 'Méthode Épreuve 2' },
        { href: '/enquetes/alpha', label: '1 — Alpha (biens)' },
      ]),
      etape('epreuve3', [{ href: '/epreuves/epreuve-3', label: 'Oral — thème biens' }]),
    ],
  },
  {
    id: 'route-stup-armes',
    titre: 'Route · stupéfiants · armes',
    sousTitre: 'Circulation, stupéfiants, armes — régimes spéciaux et seuils',
    emoji: '🚔',
    visualKey: 'cyan',
    accent: 'border-cyan-500/50 text-cyan-200',
    accentSoft: 'from-cyan-500/15 to-transparent',
    rubriquesEssentielles: [
      'Qualifications route (ITT, taux, délit de fuite)',
      'Figures stupéfiants et criminalité organisée (repères)',
      'Classes d’armes et infractions aux régimes',
    ],
    etapes: [
      etape('conditions', [
        { href: '/fondamentaux', label: 'Thème 03 — circulation' },
        { href: '/fondamentaux', label: 'Thème 05 — stupéfiants' },
      ]),
      etape('cours', [{ href: '/fondamentaux', label: 'Thème 07 — armes' }]),
      etape('rubriques', [
        { href: '/infractions', label: 'Référentiel' },
        { href: '/entrainement/recapitulatif', label: 'Récap' },
      ]),
      etape('exercices', [
        { href: '/quiz?f=f03', label: 'Quiz thème 03' },
        { href: '/quiz?f=f05', label: 'Quiz thème 05' },
        { href: '/quiz?f=f07', label: 'Quiz thème 07' },
      ]),
      etape('epreuve1', [{ href: '/epreuves/epreuve-1', label: 'Épreuve 1' }]),
      etape('epreuve2', [
        { href: '/epreuves/epreuve-2', label: 'Méthode Épreuve 2' },
        { href: '/enquetes', label: 'Autres planches (complément)' },
      ]),
      etape('epreuve3', [{ href: '/epreuves/epreuve-3', label: 'Épreuve 3' }]),
    ],
  },
  {
    id: 'dpg-peines',
    titre: 'DPG & peines',
    sousTitre: 'DPG, peines — tentative, complicité, récidive, circonstances',
    emoji: '📐',
    visualKey: 'emerald',
    accent: 'border-emerald-500/50 text-emerald-200',
    accentSoft: 'from-emerald-500/15 to-transparent',
    rubriquesEssentielles: [
      'Concours d’infractions vs pluralité de qualifications',
      'Circonstances aggravantes et personnalisation',
      'Récidive légale : conditions strictes',
    ],
    etapes: [
      etape('conditions', [
        { href: '/fondamentaux', label: 'Thème 09 — DPG' },
        { href: '/fondamentaux', label: 'Thème 10 — peines' },
      ]),
      etape('cours', [
        { href: '/fondamentaux', label: 'Synthèse DPG' },
        { href: '/fondamentaux', label: 'Synthèse peines' },
      ]),
      etape('rubriques', [
        { href: '/infractions', label: 'Référentiel' },
        { href: '/entrainement/recapitulatif', label: 'Récap DPG & peines' },
      ]),
      etape('exercices', [
        { href: '/quiz?mode=domain&domain=DPG', label: 'Quiz DPG' },
        { href: '/flashcards', label: 'Flashcards' },
      ]),
      etape('epreuve1', [{ href: '/epreuves/epreuve-1', label: 'Dissertation / cas E1' }]),
      etape('epreuve2', [
        { href: '/epreuves/epreuve-2', label: 'Méthode Épreuve 2' },
        { href: '/enquetes', label: 'Hub enquêtes (complément)' },
      ]),
      etape('epreuve3', [{ href: '/epreuves/epreuve-3', label: 'Oral — peines & principes' }]),
    ],
  },
  {
    id: 'pj-juridictions',
    titre: 'PJ, instruction, juridictions',
    sousTitre: 'Instruction, juridictions, exécution',
    emoji: '🏛️',
    visualKey: 'sky',
    accent: 'border-sky-500/50 text-sky-200',
    accentSoft: 'from-sky-500/15 to-transparent',
    rubriquesEssentielles: [
      'Qui saisit qui : PR, JLD, JI, chambre de l’instruction',
      'Nullités et conséquences sur la preuve',
      'Exécution des peines et contraintes — repères pour l’oral',
    ],
    etapes: [
      etape('conditions', [
        { href: '/fondamentaux', label: 'Index fondamentaux' },
        { href: '/fondamentaux', label: 'Thème 12 — instruction' },
      ]),
      etape('cours', [
        { href: '/fondamentaux', label: 'Thème 13 — juridictions' },
        { href: '/fondamentaux', label: 'Thème 15 — exécution' },
      ]),
      etape('rubriques', [
        { href: '/infractions', label: 'Référentiel' },
        { href: '/entrainement/recapitulatif', label: 'Récap' },
      ]),
      etape('exercices', [
        { href: '/quiz?f=f12', label: 'Quiz thème 12' },
        { href: '/quiz?f=f13', label: 'Quiz thème 13' },
        { href: '/entrainement/articulation', label: 'Articulation' },
      ]),
      etape('epreuve1', [{ href: '/epreuves/epreuve-1', label: 'Épreuve 1' }]),
      etape('epreuve2', [
        { href: '/epreuves/epreuve-2', label: 'Méthode Épreuve 2' },
        { href: '/enquetes', label: 'Hub enquêtes (complément)' },
      ]),
      etape('epreuve3', [{ href: '/epreuves/epreuve-3', label: 'Épreuve 3 — oral technique' }]),
    ],
  },
];
