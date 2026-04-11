/**
 * Halos `InteriorPageShell` — référence unique pour garder le site visuellement cohérent.
 *
 * | Couleur   | Usage principal |
 * |-----------|-----------------|
 * | violet    | Cours (hub), programme, guide long, pricing, auth, rapport synthèse |
 * | cyan      | Modules, contact, compte, dashboard, épreuve 2 (dossier) |
 * | amber     | Entraînement, parcours, quiz, flashcards, sujets blancs, récap |
 * | emerald   | Fondamentaux, PV / modèles |
 * | rose      | Infractions, épreuve 1 |
 * | amber hub | Hub épreuves (vue d’ensemble) |
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
