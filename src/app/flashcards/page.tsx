import { Suspense } from 'react';
import type { Metadata } from 'next';

import { FlashcardsPageClient } from '@/components/flashcards/FlashcardsPageClient';

export const metadata: Metadata = {
  title: 'Flashcards',
  description: 'Révision active par cartes mémoire : recto / verso pour ancrer les points clés du programme OPJ.',
};

export default function FlashcardsPage() {
  return (
    <Suspense
      fallback={
        <div className='container flex min-h-[40vh] items-center justify-center pb-16 pt-10 text-gray-400'>
          Chargement des flashcards…
        </div>
      }
    >
      <FlashcardsPageClient />
    </Suspense>
  );
}
