import { Suspense } from 'react';

import { FlashcardsPageClient } from '@/components/flashcards/FlashcardsPageClient';

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
