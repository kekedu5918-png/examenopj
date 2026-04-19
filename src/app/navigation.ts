/** Navigation principale — chemins réduits (hub par zone). */

export const NAV_ACCUEIL_HREF = '/account' as const;

export type NavDropdownItem = { readonly href: string; readonly label: string };

export const NAV_PREPARER_CHILDREN: readonly NavDropdownItem[] = [
  { href: '/epreuves/epreuve-1', label: 'Épreuve 1' },
  { href: '/epreuves/epreuve-2', label: 'Épreuve 2' },
  { href: '/epreuves/epreuve-3', label: 'Épreuve 3' },
] as const;

export const NAV_REFERENCES_CHILDREN: readonly NavDropdownItem[] = [
  { href: '/fondamentaux', label: 'Fondamentaux' },
  { href: '/infractions', label: 'Infractions' },
] as const;

export const NAV_ENTRAINER_CHILDREN: readonly NavDropdownItem[] = [
  { href: '/entrainement/quiz', label: 'Quiz' },
  { href: '/entrainement/flashcards', label: 'Flashcards' },
  { href: '/entrainement/articulation', label: 'Articulation' },
  { href: '/entrainement/redaction-pv', label: 'Rédaction PV' },
] as const;

export const NAV_PRIMARY_LINKS = [
  { href: '/fondamentaux', label: 'Fondamentaux' },
  { href: '/infractions', label: 'Infractions' },
  { href: '/enquetes', label: 'Enquêtes' },
  { href: '/epreuves', label: 'Épreuves' },
  { href: '/entrainement', label: 'Entraînement' },
] as const;

export type NavMegaChild = {
  readonly name: string;
  readonly href: string;
  readonly description: string;
  readonly badge?: 'nouveau';
};

export const NAV_COURS_CHILDREN: readonly NavMegaChild[] = [
  {
    name: 'Fondamentaux',
    href: '/fondamentaux',
    description: 'Synthèses procédure, cadres, GAV, perquisitions…',
  },
] as const;

export const NAV_EPREUVES_CHILDREN: readonly NavMegaChild[] = [
  {
    name: 'Épreuve 1 — DPG / DPS',
    href: '/epreuves/epreuve-1',
    description: 'Qualification juridique',
  },
  {
    name: 'Épreuve 2 — Procédure',
    href: '/epreuves/epreuve-2',
    description: 'Articulation, PV, rapport',
  },
  {
    name: 'Épreuve 3 — Oral',
    href: '/epreuves/epreuve-3',
    description: 'Mise en situation',
  },
] as const;

export const NAV_ENTRAINEMENT_CHILDREN: readonly NavMegaChild[] = [
  {
    name: 'Vue d’ensemble',
    href: '/entrainement',
    description: 'Hub quiz, flashcards, outils',
  },
  {
    name: 'Parcours cadres d’enquête',
    href: '/entrainement/parcours/cadres-enquetes',
    description: 'Flagrance, GAV, EP — leçons, QCM, synthèse débloquée',
  },
  {
    name: 'Rédaction PV',
    href: '/entrainement/redaction-pv',
    description: 'Atelier ME1 et correction IA',
  },
  {
    name: 'Rapport de synthèse',
    href: '/entrainement/rapport-synthese',
    description: 'Dossier complet, correction IA',
  },
] as const;

export const NAV_INFRACTIONS_HREF = '/infractions' as const;
export const NAV_ENTRAINEMENT_HREF = '/entrainement' as const;
/** `/premium` est en redirect 301 vers `/pricing` — on pointe directement sur l'URL canonique. */
export const NAV_PREMIUM_HREF = '/pricing' as const;

export const SITE_HEADER_INFRACTIONS_LINKS: readonly NavDropdownItem[] = [
  { href: '/infractions', label: 'Référentiel complet' },
] as const;

export const SITE_HEADER_COURS_LINKS: readonly NavDropdownItem[] = [
  { href: '/fondamentaux', label: 'Fiches fondamentaux' },
] as const;

export const SITE_HEADER_EPREUVES_LINKS: readonly NavDropdownItem[] = [
  { href: '/epreuves', label: "Vue d'ensemble" },
  { href: '/epreuves/epreuve-1', label: 'Épreuve 1' },
  { href: '/epreuves/epreuve-2', label: 'Épreuve 2' },
  { href: '/epreuves/epreuve-3', label: 'Épreuve 3' },
] as const;

export const SITE_HEADER_ENTRAINER_LINKS: readonly NavDropdownItem[] = [
  { href: '/entrainement', label: "Vue d'ensemble" },
  { href: '/entrainement/parcours/cadres-enquetes', label: 'Parcours cadres' },
  { href: '/entrainement/quiz', label: 'Quiz' },
  { href: '/entrainement/flashcards', label: 'Flashcards' },
  { href: '/entrainement/articulation', label: 'Articulation' },
  { href: '/entrainement/redaction-pv', label: 'Rédaction PV' },
  { href: '/entrainement/rapport-synthese', label: 'Rapport de synthèse' },
] as const;
