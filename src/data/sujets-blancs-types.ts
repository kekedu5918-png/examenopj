import type { PieceJointe } from '@/data/sujets-rapport-synthese';

export type Epreuve1DPS = {
  duree: string;
  sujet: string;
  consignes: string[];
  pointsMethodo: string[];
  corrige?: string;
};

export type QuestionProcedure = {
  numero: number;
  intitule: string;
  bareme: number;
  type: 'pv' | 'articulation' | 'qualification' | 'rapport';
};

export type Epreuve2Procedure = {
  duree: string;
  contexte: string;
  pieces: PieceJointe[];
  questions: QuestionProcedure[];
  corrige?: string;
};

export type Epreuve3Oral = {
  duree: string;
  sujetTire: string;
  axesDeTravail: string[];
  questionsJury: string[];
};

export type SujetBlanc = {
  id: string;
  titre: string;
  description: string;
  theme: string;
  /** Fascicules F01–F15 mobilisés dans la session (prérequis / pont cours). */
  themesFascicules: string[];
  difficulte: 'intermediaire' | 'avance';
  epreuve1: Epreuve1DPS;
  epreuve2: Epreuve2Procedure;
  epreuve3: Epreuve3Oral;
  corrigeDisponible: boolean;
  isPremium: boolean;
};
