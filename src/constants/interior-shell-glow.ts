/**
 * Références sémantiques pour `InteriorPageShell` — le rendu visuel du halo est unique (`--ex-shell-halo`).
 * Les clés servent surtout à la lisibilité du code ; seul `legal` désactive le halo (`none`).
 */

export const SHELL_GLOW = {
  coursHub: 'violet',
  programme: 'violet',
  modulesIndex: 'cyan',
  moduleDetail: 'cyan',
  entrainement: 'amber',
  articulation: 'cyan',
  parcours: 'amber',
  recapitulatif: 'amber',
  quiz: 'amber',
  flashcards: 'amber',
  sujetsBlancs: 'amber',
  redactionPv: 'amber',
  fondamentaux: 'emerald',
  infractions: 'rose',
  epreuvesHub: 'amber',
  epreuve1: 'rose',
  epreuve2: 'cyan',
  epreuve3: 'violet',
  account: 'cyan',
  contact: 'cyan',
  pricing: 'violet',
  dashboard: 'cyan',
  guideLong: 'violet',
  aPropos: 'violet',
  /** Login / inscription (même ambiance que pricing). */
  auth: 'violet',
  /** Atelier rapport de synthèse (entraînement). */
  rapportSynthese: 'violet',
  /** Modèles et fiches PV (rubrique cours). */
  modelesPv: 'emerald',
  legal: 'none',
} as const;
