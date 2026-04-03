import type { Metadata } from 'next';

import { CoursPageClient } from '@/components/cours/CoursPageClient';

export const metadata: Metadata = {
  title: 'Cours & fondamentaux — Examen OPJ',
  description:
    'Parcours structuré pour consolider le droit pénal spécial, général et la procédure : fascicules, quiz, flashcards et référentiels, en dehors de la logique purement « épreuve ».',
};

export default function CoursPage() {
  return <CoursPageClient />;
}
