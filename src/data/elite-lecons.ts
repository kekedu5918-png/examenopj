import eliteLeconsContent from './elite-lecons-content.json';

import type { EliteChapter, EliteLesson } from './elite-lecons-types';

export type { EliteChapter, EliteLesson, EliteLessonSection, EliteLessonSectionTable } from './elite-lecons-types';

/** Données brutes des 15 chapitres « Mes Leçons » (OPJ Elite), sérialisées depuis `tools/elite-chapters-raw.js`. */
export const eliteLeconsChapters = eliteLeconsContent as EliteChapter[];

export function getEliteLessonById(lessonId: string): { chapter: EliteChapter; lesson: EliteLesson } | undefined {
  for (const chapter of eliteLeconsChapters) {
    const lesson = chapter.lessons.find((l) => l.id === lessonId);
    if (lesson) return { chapter, lesson };
  }
  return undefined;
}

/** Toutes les leçons avec leur chapitre d’origine (hors module « Infractions » Elite). */
export function listEliteLessonsFlat(): Array<{ chapter: EliteChapter; lesson: EliteLesson }> {
  const out: Array<{ chapter: EliteChapter; lesson: EliteLesson }> = [];
  for (const chapter of eliteLeconsChapters) {
    for (const lesson of chapter.lessons) {
      out.push({ chapter, lesson });
    }
  }
  return out;
}
