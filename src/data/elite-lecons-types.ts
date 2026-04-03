/** Structure des leçons importées depuis OPJ Elite (`js/data/chapters.js`). */

export type EliteLessonSectionTable = {
  th: string[];
  rows: string[][];
};

export type EliteLessonSection = {
  t: string;
  items?: string[];
  table?: EliteLessonSectionTable;
};

export type EliteLesson = {
  id: string;
  em: string;
  name: string;
  ref: string;
  xp: number;
  intro: string;
  secs: EliteLessonSection[];
  traps: string[];
  keys: string[];
};

export type EliteChapter = {
  id: string;
  num: string;
  title: string;
  sub: string;
  color: string;
  bg: string;
  icon: string;
  lessons: EliteLesson[];
};
