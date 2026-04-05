import type { FasciculeMetadata } from '@/data/fascicules-list';
import { fasciculesList } from '@/data/fascicules-list';

/** Fascicule du programme SDCP / IREP par défaut pour chaque chapitre du corpus étendu. */
export const CHAPTER_TO_FASCICULE_ID: Record<string, string> = {
  ch1: 'f14',
  ch2: 'f11',
  ch3: 'f11',
  ch4: 'f11',
  ch5: 'f09',
  ch6: 'f01',
  ch7: 'f02',
  ch8: 'f11',
  ch9: 'f08',
  ch10: 'f10',
  ch11: 'f11',
  ch12: 'f12',
  ch13: 'f02',
  ch14: 'f11',
  ch15: 'f11',
};

/**
 * Affinage fascicule par leçon (prioritaire sur le chapitre).
 * Permet d’aligner la traçabilité F01–F15 avec le sommaire officiel.
 */
export const LESSON_FASCICULE_OVERRIDE: Record<string, string> = {
  L1001: 'f09',
  L702: 'f05',
  L704: 'f04',
  L803: 'f11',
  L901: 'f08',
  L902: 'f08',
  L1101: 'f08',
  L1102: 'f08',
  L1104: 'f07',
  L1105: 'f03',
  L303: 'f06',
  L307: 'f06',
  L211: 'f06',
  L1301: 'f02',
  L1204: 'f13',
};

/**
 * Fiches à absolument maîtriser pour l’écrit et l’oral (méthode + pièges fréquents).
 * Le reste du corpus reste aligné programme mais peut être priorisé après celles-ci.
 */
export const LECONS_INDISPENSABLES_EXAMEN = new Set<string>([
  'L101',
  'L102',
  'L103',
  'L106',
  'L201',
  'L202',
  'L203',
  'L301',
  'L302',
  'L303',
  'L304',
  'L401',
  'L402',
  'L403',
  'L404',
  'L501',
  'L502',
  'L601',
  'L602',
  'L603',
  'L701',
  'L801',
  'L1001',
  'L1002',
  'L1101',
  'L1201',
  'L1202',
  'L1203',
  'L1501',
]);

export function resolveFasciculeForLesson(chapterId: string, lessonId: string): FasciculeMetadata {
  const id = LESSON_FASCICULE_OVERRIDE[lessonId] ?? CHAPTER_TO_FASCICULE_ID[chapterId] ?? 'f11';
  const meta = fasciculesList.find((m) => m.id === id);
  if (!meta) {
    return fasciculesList.find((m) => m.id === 'f11')!;
  }
  return meta;
}
