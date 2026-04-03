// Types fascicules SDCP — Version 01/12/2025

export type Domain = 'DPS' | 'DPG' | 'PROCEDURE';

export interface FasciculeChapter {
  title: string;
  page?: number;
  subChapters?: string[];
}

export interface Fascicule {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  domain: Domain;
  pages: number;
  txtFile: string;
  chapters: FasciculeChapter[];
  infractions?: string[];
  note?: string;
}
