import { Suspense } from 'react';
import type { Metadata } from 'next';

import { FlashcardsPageClient } from '@/components/flashcards/FlashcardsPageClient';
import { getContentAccess } from '@/features/access/get-content-access';

export const metadata: Metadata = {
  title: 'Flashcards — Examen OPJ',
  description: 'Révision active par cartes mémoire : recto / verso pour ancrer les points clés du programme OPJ.',
};

export default async function EntrainementFlashcardsPage() {
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
