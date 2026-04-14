import { Suspense } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { TrackOnMount } from '@/components/analytics/TrackOnMount';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getContentAccess } from '@/features/access/get-content-access';
import { AnalyticsEvents } from '@/lib/analytics/events';
import { openGraphForPage } from '@/utils/seo-metadata';

const QuizPageClient = dynamic(() => import('@/components/quiz/quiz-page-client').then((m) => m.QuizPageClient), {
  ssr: true,
});

export const metadata: Metadata = {
  title: 'Quiz — Examen OPJ',
  description:
    'QCM et mode « hardcore » pour l’examen OPJ : thèmes, domaines et quiz global. Entraînez-vous avec correction immédiate.',
  alternates: { canonical: '/entrainement/quiz' },
  ...openGraphForPage(
    '/entrainement/quiz',
    'Quiz — Examen OPJ',
    'QCM et entraînement ciblé pour l’examen OPJ : thèmes, domaines, mode réponse libre.',
  ),
};

export default async function EntrainementQuizPage() {
  const access = await getContentAccess();

  return (
    <Suspense
      fallback={
        <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.quiz} pad='default' innerClassName='flex min-h-[50vh] items-center justify-center'>
          <p className='sr-only'>Chargement du quiz…</p>
          <div className='h-10 w-10 animate-pulse rounded-full bg-white/10' aria-hidden />
        </InteriorPageShell>
      }
    >
      <TrackOnMount event={AnalyticsEvents.quizSessionStart} />
      <QuizPageClient initialAccess={access} />
    </Suspense>
  );
}
