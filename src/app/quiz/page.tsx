import { Suspense } from 'react';
import type { Metadata } from 'next';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
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
      fallback={
        <InteriorPageShell maxWidth='6xl' glow='blue' pad='default' innerClassName='flex min-h-[50vh] items-center justify-center'>
          <p className='sr-only'>Chargement du quiz…</p>
          <div className='h-10 w-10 animate-pulse rounded-full bg-white/10' aria-hidden />
        </InteriorPageShell>
      }
    >
      <QuizPageClient initialAccess={access} />
    </Suspense>
  );
}
