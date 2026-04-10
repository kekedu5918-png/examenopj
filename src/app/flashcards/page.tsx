import { Suspense } from 'react';
import type { Metadata } from 'next';

import { FlashcardsPageClient } from '@/components/flashcards/FlashcardsPageClient';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { getContentAccess } from '@/features/access/get-content-access';
import { openGraphForPage } from '@/utils/seo-metadata';

export const metadata: Metadata = {
  title: 'Flashcards — Examen OPJ',
  description:
    'Cartes mémoire pour ancrer éléments constitutifs et procédure : filtrage par thème, révision active pour l’examen OPJ.',
  alternates: { canonical: '/flashcards' },
  ...openGraphForPage(
    '/flashcards',
    'Flashcards — Examen OPJ',
    'Révision active par flashcards : thèmes OPJ, recto/verso et suivi de mémorisation.',
  ),
};

export default async function FlashcardsPage() {
  const access = await getContentAccess();

  return (
    <Suspense
      fallback={
        <InteriorPageShell maxWidth='6xl' glow='amber' pad='default' innerClassName='flex min-h-[40vh] items-center justify-center text-gray-400'>
          Chargement des flashcards…
        </InteriorPageShell>
      }
    >
      <FlashcardsPageClient initialAccess={access} />
    </Suspense>
  );
}
