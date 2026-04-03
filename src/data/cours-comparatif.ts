import coursComparatifRaw from './cours-comparatif-data.json';

export type CoursComparatifLesson = {
  id: string;
  name: string;
  ref: string;
};

export type CoursComparatifEliteChapter = {
  id: string;
  num: string;
  title: string;
  lessonCount: number;
  lessons: CoursComparatifLesson[];
};

export type CoursComparatifFasciculeRow = {
  numero: number;
  fichier: string;
  words: number;
  chars: number;
  eliteChapters: CoursComparatifEliteChapter[];
  eliteLessonTotal: number;
};

export type CoursComparatifData = {
  generatedAt: string;
  canonicalSource: {
    id: string;
    label: string;
    priorityRule: string;
  };
  methodology: {
    comparisonType: string;
    disclaimer: string;
  };
  totals: {
    fasciculeTxtWords: number;
    eliteLessonCount: number;
    eliteChapterCount: number;
  };
  fascicules: CoursComparatifFasciculeRow[];
};

export const coursComparatifData = coursComparatifRaw as CoursComparatifData;

export function getComparatifRow(numero: number): CoursComparatifFasciculeRow | undefined {
  return coursComparatifData.fascicules.find((f) => f.numero === numero);
}

/** Rappel court pour l’UI (priorité fascicule TXT). */
export const prioriteFasciculeTxt = coursComparatifData.canonicalSource.priorityRule;
