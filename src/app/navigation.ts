/** Navigation principale unifiée (ordre = hiérarchie des piliers). */
export const NAV_PRIMARY_LINKS = [
  { href: '/cours/enquetes', label: 'Enquêtes' },
  { href: '/epreuves', label: 'Épreuves' },
  { href: '/infractions', label: 'Infractions' },
  { href: '/fondamentaux', label: 'Fondamentaux' },
  { href: '/cours', label: 'Cours' },
  { href: '/guide-revision-opj', label: 'Guide' },
] as const;

export type NavMegaChild = {
  readonly name: string;
  readonly href: string;
  readonly description: string;
  readonly badge?: 'nouveau';
};

export const NAV_COURS_CHILDREN: readonly NavMegaChild[] = [
  {
    name: 'Plan de révision',
    href: '/cours',
    description: 'Méthode en 4 temps, priorités P0, fil 7 leçons — quoi faire concrètement',
  },
  {
    name: 'Modules & fiches',
    href: '/cours/modules',
    description: 'Priorité examen OPJ (P0/P1) ou index officiel — fondamentaux en appui',
  },
  {
    name: 'Modèles de PV',
    href: '/cours/modeles-pv',
    description: 'Bibliothèque complète, mise en forme officielle',
  },
  {
    name: 'Enquêtes thématiques',
    href: '/cours/enquetes',
    description: 'Mises en situation complètes',
  },
  {
    name: 'Fondamentaux',
    href: '/fondamentaux',
    description: 'Notions clés à maîtriser',
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
    description: 'Compte-rendu parquet',
  },
  {
    name: 'Sujets blancs',
    href: '/sujets-blancs',
    description: 'Les 3 épreuves — session fictive complète',
    badge: 'nouveau',
  },
] as const;

export const NAV_ENTRAINEMENT_CHILDREN: readonly NavMegaChild[] = [
  {
    name: 'Vue d’ensemble',
    href: '/entrainement',
    description: 'Hub quiz, flashcards, parcours',
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
export const NAV_GUIDE_HREF = '/guide-revision-opj' as const;
export const NAV_PREMIUM_HREF = '/pricing' as const;

/** Fin d’affichage du badge « Nouveau » sur Sujets blancs (30 jours après mise en ligne). */
export const NAV_SUJETS_BLANCS_BADGE_DEADLINE_MS = new Date('2026-05-06T23:59:59').getTime();
