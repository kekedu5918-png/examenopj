import { Suspense } from 'react';
import type { Metadata } from 'next';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { QuizPageClient } from '@/components/quiz/quiz-page-client';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
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
      fallback={
        <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.quiz} pad='default' innerClassName='flex min-h-[50vh] items-center justify-center'>
          <p className='sr-only'>Chargement du quiz…</p>
          <div className='h-10 w-10 animate-pulse rounded-full bg-white/10' aria-hidden />
        </InteriorPageShell>
      }
    >
      <QuizPageClient initialAccess={access} />
    </Suspense>
  );
}
