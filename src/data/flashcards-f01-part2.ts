import type { Flashcard } from '@/data/flashcards-types';
import { flashcardsF01P2AB } from '@/data/flashcards-f01-p2-a';
import { flashcardsF01P2C } from '@/data/flashcards-f01-p2-c';
import { flashcardsF01P2D } from '@/data/flashcards-f01-p2-d';

/** F01 partie 2 — Atteintes aux personnes (groupes A à D), 2 cartes par infraction. */
export const flashcardsF01Part2: Flashcard[] = [
  ...flashcardsF01P2AB,
  ...flashcardsF01P2C,
  ...flashcardsF01P2D,
];
