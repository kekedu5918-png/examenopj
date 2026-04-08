import { Suspense } from 'react';
import type { Metadata } from 'next';

import { QuizPageClient } from '@/components/quiz/quiz-page-client';
import { getContentAccess } from '@/features/access/get-content-access';

export const metadata: Metadata = {
  title: 'Quiz — Examen OPJ',
  description:
    "QCM et mode hardcore (réponse libre) pour l'examen OPJ : infractions, procédure et cas pratiques. Lien direct : ?hardcore=1.",
};

export default async function EntrainementQuizPage() {
  const access = await getContentAccess();

  return (
    <Suspense
      fallback={<div className='min-h-[50vh] bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950' aria-hidden />}
    >
      <QuizPageClient initialAccess={access} />
    </Suspense>
  );
}
