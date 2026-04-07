/**
 * Modèles de PV par type d’acte et par enquête — alignement fascicules ME1 / enquêtes Alpha… Patrimoniale.
 * // TODO: chaque entrée doit être vérifiée mot pour mot contre les fascicules officiels — ne pas inventer de cartouche.
 */
export type EnquetePvCode = 'alpha' | 'bravo' | 'charlie' | 'delta' | 'echo' | 'foxtrot' | 'golf' | 'india' | 'accident' | 'patrimoniale';

export type TypePvModele =
  | 'plainte'
  | 'notification-gav'
  | 'audition-mec-gav'
  | 'perquisition'
  | 'rapport-synthese';

export type ModelePvStub = {
  enquete: EnquetePvCode;
  type: TypePvModele;
  /** Référence fascicule + page pour complétion. */
  todoRef: string;
};

/** Stubs pour Phase 6 — à remplacer par textes conformes aux fascicules. */
export const MODELES_PV_STUBS: ModelePvStub[] = [
  { enquete: 'alpha', type: 'plainte', todoRef: 'ME1 + enquête Alpha — // TODO' },
  { enquete: 'bravo', type: 'plainte', todoRef: 'ME1 + enquête Bravo — // TODO' },
  { enquete: 'charlie', type: 'plainte', todoRef: 'ME1 + enquête Charlie — // TODO' },
  { enquete: 'delta', type: 'plainte', todoRef: 'ME1 + enquête Delta — // TODO' },
  { enquete: 'echo', type: 'plainte', todoRef: 'ME1 + enquête Echo — // TODO' },
  { enquete: 'foxtrot', type: 'plainte', todoRef: 'ME1 + enquête Foxtrot — // TODO' },
  { enquete: 'golf', type: 'plainte', todoRef: 'ME1 + enquête Golf — // TODO' },
  { enquete: 'india', type: 'plainte', todoRef: 'ME1 + enquête India — // TODO' },
  { enquete: 'accident', type: 'plainte', todoRef: 'ME1 + enquête Accident — // TODO' },
  { enquete: 'patrimoniale', type: 'plainte', todoRef: 'ME1 + enquête Patrimoniale — // TODO' },
];
