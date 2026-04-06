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

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  fascicule: number;
  domaine: 'DPS' | 'DPG' | 'Procédure pénale';
  explication?: string;
  /**
   * Mode réponse libre : formulations alternatives acceptées après normalisation
   * (synonymes, « art. » vs « article », abréviations courantes).
   */
  hardcoreAliases?: string[];
};
