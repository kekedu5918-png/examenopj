import { Suspense } from 'react';
import type { Metadata } from 'next';

import { FlashcardsPageClient } from '@/components/flashcards/FlashcardsPageClient';
import { getContentAccess } from '@/features/access/get-content-access';
import { openGraphForPage } from '@/utils/seo-metadata';

export const metadata: Metadata = {
  title: 'Flashcards — Examen OPJ',
  description:
    'Cartes mémoire pour ancrer éléments constitutifs et procédure : filtrage par thème, révision active pour le concours OPJ.',
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
        <div className='container flex min-h-[40vh] items-center justify-center pb-16 pt-10 text-gray-400'>
          Chargement des flashcards…
        </div>
      }
    >
      <FlashcardsPageClient initialAccess={access} />
    </Suspense>
  );
}
