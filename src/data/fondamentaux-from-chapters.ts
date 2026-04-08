import { courseModulePath } from '@/data/fascicules-list';
import { FONDAMENTAUX_FICHE_CANONIQUE_ID } from '@/data/fondamentaux-canonical-map';
import { LECONS_INDISPENSABLES_EXAMEN, resolveFasciculeForLesson } from '@/data/fondamentaux-fascicule-bridge';
import { quizHrefForFasciculeId } from '@/data/fondamentaux-fascicule-reperes';
import type { Categorie, FasciculeDomaineMeta, Fiche, FicheBlocDetail } from '@/data/fondamentaux-types';
import { CHAPTERS } from '@/data/lecons-chapters';

const CHAPTER_CATEGORIE: Record<string, Categorie> = {
  ch1: 'procedure',
  ch2: 'procedure',
  ch3: 'procedure',
  ch4: 'procedure',
  ch5: 'droit-penal',
  ch6: 'droit-penal',
  ch7: 'droit-penal',
  ch8: 'special',
  ch9: 'special',
  ch10: 'droit-penal',
  ch11: 'procedure',
  ch12: 'procedure',
  ch13: 'special',
  ch14: 'procedure',
  ch15: 'procedure',
};

type ChapterRow = (typeof CHAPTERS)[number];
type LessonRow = ChapterRow['lessons'][number];

function secToBloc(sec: NonNullable<LessonRow['secs']>[number]): FicheBlocDetail {
  const tableau = sec.table
    ? { colonnes: sec.table.th, lignes: sec.table.rows }
    : undefined;
  return { titre: sec.t, items: sec.items, tableau };
}

function lessonToFiche(ch: ChapterRow, lesson: LessonRow): Fiche {
  const categorie = CHAPTER_CATEGORIE[ch.id] ?? 'procedure';
  const fasc = resolveFasciculeForLesson(ch.id, lesson.id);
  const domaine = fasc.domaine as FasciculeDomaineMeta;
  const canoniqueId = FONDAMENTAUX_FICHE_CANONIQUE_ID[lesson.id];

  if (canoniqueId) {
    return {
      id: lesson.id,
      categorie,
      titre: lesson.name,
      accroche:
        'Ce thème est traité dans une fiche de référence unique sur le site (pas de contenu dupliqué). → Voir la fiche complète.',
      source: `Renvoi canonique · ${lesson.ref} · Ch. ${ch.num} — ${ch.title}`,
      regles: [],
      blocsDetail: undefined,
      piegesExamen: undefined,
      cles: undefined,
      emojiAffiche: lesson.em,
      lienModule: courseModulePath(fasc.id),
      lienQuiz: quizHrefForFasciculeId(fasc.id),
      fasciculeId: fasc.id,
      fasciculeNumero: fasc.numero,
      fasciculeDomaine: domaine,
      indispensableExamen: LECONS_INDISPENSABLES_EXAMEN.has(lesson.id),
      ficheCanoniqueId: canoniqueId,
    };
  }

  return {
    id: lesson.id,
    categorie,
    titre: lesson.name,
    accroche: lesson.intro,
    source: `${lesson.ref} · Ch. ${ch.num} — ${ch.title}`,
    regles: [],
    blocsDetail: (lesson.secs ?? []).map(secToBloc),
    piegesExamen: lesson.traps,
    cles: lesson.keys,
    lienModule: courseModulePath(fasc.id),
    lienQuiz: quizHrefForFasciculeId(fasc.id),
    fasciculeId: fasc.id,
    fasciculeNumero: fasc.numero,
    fasciculeDomaine: domaine,
    indispensableExamen: LECONS_INDISPENSABLES_EXAMEN.has(lesson.id),
  };
}

/** Fiches longues dérivées du corpus chapitres (programme / fascicules), fusionnées dans `FICHES`. */
export const FONDAMENTAUX_FROM_CHAPTERS: Fiche[] = CHAPTERS.flatMap((ch) =>
  ch.lessons.map((lesson) => lessonToFiche(ch, lesson)),
);
