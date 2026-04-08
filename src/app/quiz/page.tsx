import { Suspense } from 'react';
import type { Metadata } from 'next';

import { QuizPageClient } from '@/components/quiz/quiz-page-client';
import { getContentAccess } from '@/features/access/get-content-access';
import { openGraphForPage } from '@/utils/seo-metadata';

export const metadata: Metadata = {
  title: 'Quiz — Examen OPJ',
  description:
    'QCM et mode « hardcore » pour l’examen OPJ : thèmes F01–F15, domaines et quiz global. Entraînez-vous avec correction immédiate.',
  alternates: { canonical: '/quiz' },
  ...openGraphForPage('/quiz', 'Quiz — Examen OPJ', 'QCM et entraînement ciblé pour l’examen OPJ 2026 : thèmes, domaines, mode réponse libre.'),
};

export default async function QuizPage() {
  const access = await getContentAccess();

  return (
    <Suspense
      fallback={<div className='min-h-[50vh] bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950' aria-hidden />}
    >
      <QuizPageClient initialAccess={access} />
    </Suspense>
  );
}
