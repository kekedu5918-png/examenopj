export type ElementConstitutif = {
  titre: string;
  description: string;
  sousElements?: {
    titre: string;
    description: string;
  }[];
};

export type Infraction = {
  id: string;
  nom: string;
  fascicule: number;
  legal: {
    article: string;
    description: string;
  };
  materiel: ElementConstitutif[];
  moral: {
    titre: string;
    description: string;
  };
  circonstancesAggravantes:
    | {
        nom: string;
        article: string;
        description: string;
      }[]
    | null;
  repression: {
    qualification: string;
    classification: string;
    article: string;
    peinesPrincipales: string[];
  }[];
  tentative: boolean;
  complicite: boolean;
  immunite: boolean | string;
};

export type Fascicule = {
  numero: number;
  titre: string;
  domaine: 'DPS' | 'DPG' | 'Procédure pénale';
  pages: number;
  infractions: Infraction[];
  notionsCles?: string[];
};

export type QuizCadreEnquete = 'flagrance' | 'preliminaire' | 'cr' | 'transversal';

export type QuizEnqueteCode =
  | 'alpha'
  | 'bravo'
  | 'charlie'
  | 'delta'
  | 'echo'
  | 'foxtrot'
  | 'golf'
  | 'india'
  | 'accident'
  | 'patrimoniale';

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  fascicule: number;
  domaine: 'DPS' | 'DPG' | 'Procédure pénale';
  explication?: string;
  /**
   * Référence textuelle (CPP / CP / CSI / Légifrance) à afficher en feedback de réponse.
   * Format libre, ex. « Art. 62-2 CPP », « Art. 311-1 CP », « 78-2 et s. CPP ».
   */
  article?: string;
  /**
   * Mode réponse libre : formulations alternatives acceptées après normalisation
   * (synonymes, « art. » vs « article », abréviations courantes).
   */
  hardcoreAliases?: string[];
  /** Ciblage pédagogique — filtrage quiz par épreuve. */
  epreuveCible?: 1 | 2 | 3;
  cadreEnquete?: QuizCadreEnquete;
  enqueteCode?: QuizEnqueteCode;
  /** Lien vers rubrique fondamentaux (`/fondamentaux/[id]`). */
  fondamentalSlug?: string;
};
