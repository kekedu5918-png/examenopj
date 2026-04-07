export type Categorie = 'procedure' | 'droit-penal' | 'acteurs' | 'juridictions' | 'special';

export interface Regle {
  label: string;
  detail?: string;
  article?: string;
  alerte?: boolean;
}

export interface Tableau {
  colonnes: string[];
  lignes: string[][];
}

/** Section pédagogique (liste et/ou tableau), p. ex. contenu aligné sur les fascicules. */
export interface FicheBlocDetail {
  titre: string;
  items?: string[];
  tableau?: Tableau;
}

/** Domaine du programme tel qu’affiché sur les modules (couleurs de repère). */
export type FasciculeDomaineMeta = 'DPS' | 'DPG' | 'Procédure pénale';

export interface Fiche {
  id: string;
  categorie: Categorie;
  titre: string;
  accroche: string;
  source: string;
  regles: Regle[];
  tableau?: Tableau;
  /** Paragraphes structurés avec titres de section (pièges / fiches longues). */
  blocsDetail?: FicheBlocDetail[];
  /** Vigilance examen — affiché en encadré d’alerte. */
  piegesExamen?: string[];
  /** Formules et rappels à retenir. */
  cles?: string[];
  /** Emoji en tête de fiche à la place de l’icône Lucide. */
  emojiAffiche?: string;
  /** Repère programme : module fascicule officiel F01–F15 (traçabilité). */
  fasciculeId?: string;
  fasciculeNumero?: number;
  fasciculeDomaine?: FasciculeDomaineMeta;
  /** Priorité examen : pièges et méthode ultra-fréquents à l’écrit / à l’oral. */
  indispensableExamen?: boolean;
  /** Lien vers la fiche synthétique du thème correspondant sur ExamenOPJ. */
  lienModule?: string;
  lienQuiz?: string;
  /** Temps de lecture estimé (minutes) — sinon dérivé des repères. */
  estimatedMinutes?: number;
  /** Identifiant stable pour deep links quiz (`?fondamental=…`). */
  quizTag?: string;
}

export const CATEGORIES: Record<Categorie, { label: string; couleur: string }> = {
  procedure: { label: 'Procédure pénale', couleur: 'emerald' },
  'droit-penal': { label: 'Droit pénal', couleur: 'red' },
  acteurs: { label: 'Acteurs judiciaires', couleur: 'blue' },
  juridictions: { label: 'Juridictions', couleur: 'violet' },
  special: { label: 'Thèmes spéciaux', couleur: 'amber' },
};
