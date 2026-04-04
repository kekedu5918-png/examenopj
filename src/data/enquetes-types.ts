/** Contenu d’un bloc cartouche (articulation) — pour retranscription textuelle future. */
export type CartouchePV = {
  cote: number;
  date: string;
  heure: string;
  qualite: string;
  titre: string;
  contenu: string[];
  /** Notes manuscrites bleues du correcteur (à saisir depuis le PDF). */
  annotations?: string[];
};

export type PVSection = {
  type: 'header' | 'body' | 'question-reponse' | 'annexe' | 'mention' | 'avis';
  label?: string;
  content: string;
};

export type RapportSection = {
  type: 'entete' | 'objet' | 'faits' | 'enquete' | 'conclusion' | 'etat-civil' | 'transmission';
  content: string;
};

export type EnqueteDocument = {
  id: string;
  type: 'sujet' | 'articulation' | 'pv' | 'rapport' | 'articulation-suite';
  label: string;
};

export type EnqueteMeta = {
  id: string;
  code: string;
  titre: string;
  cadre: string;
  resume: string;
  qualification: string;
  articles: string;
  personnages: {
    opj: string;
    victime: string;
    misCause: string;
  };
  lieu: string;
  date: string;
  procedure: string;
  documents: EnqueteDocument[];
  premium: boolean;
};

/** Affichage : pages raster (fidélité pixel) + PDF officiel. */
export type EnqueteDocRender = {
  pdfUrl: string;
  pageUrls: string[];
  /** Si true : uniquement la transcription (PDF + téléchargement conservés). */
  hideFacSimile?: boolean;
  /** Transcription / structure HTML optionnelle. */
  cartouches?: CartouchePV[];
  sectionsPv?: PVSection[];
  /** Texte intégral du PV (blocs séparés par des lignes vides). */
  corpsPvTexte?: string;
  sectionsRapport?: RapportSection[];
  /** Texte brut du sujet (optionnel, si saisi). */
  sujetParagraphes?: string[];
};
