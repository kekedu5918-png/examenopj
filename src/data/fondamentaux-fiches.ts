import { FONDAMENTAUX_PART1 } from './fondamentaux-fiches-part1';
import { FONDAMENTAUX_PART2 } from './fondamentaux-fiches-part2';
import { FONDAMENTAUX_PART3 } from './fondamentaux-fiches-part3';
import { FONDAMENTAUX_PART4 } from './fondamentaux-fiches-part4';
import type { Fiche } from './fondamentaux-types';

export const FICHES: Fiche[] = [
  ...FONDAMENTAUX_PART1,
  ...FONDAMENTAUX_PART2,
  ...FONDAMENTAUX_PART3,
  ...FONDAMENTAUX_PART4,
];
