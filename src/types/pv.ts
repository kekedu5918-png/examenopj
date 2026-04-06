export type PVBloc =
  | { type: 'rubrique-numerotee'; numero: number; texte: string }
  | { type: 'paragraphe'; texte: string }
  | { type: 'signature'; signataires: string[] }
  | { type: 'annexe'; texte: string }
  | { type: 'mention'; texte: string }
  | { type: 'suite'; texte: string };

export type ModelePV = {
  id: string;
  titre: string;
  source: string;
  fascicule: string;
  categorie: PVCategorie;
  cartouche: {
    enteteGauche: string[];
    enteteDroit: string[];
    marginGauche: string[];
  };
  corps: PVBloc[];
  notesPedagogiques?: string[];
  isPremium: boolean;
};

export type PVCategorie =
  | 'plainte'
  | 'constatation'
  | 'voisinage'
  | 'interpellation'
  | 'audition-temoin'
  | 'audition-suspect-gav'
  | 'confrontation'
  | 'perquisition'
  | 'scelle'
  | 'requisition'
  | 'rapport-synthese';
