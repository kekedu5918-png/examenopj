import { Suspense } from 'react';

import { QuizPageClient } from '@/components/quiz/quiz-page-client';

export default function QuizPage() {
  return (
    <Suspense
      fallback={<div className='min-h-[50vh] bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950' aria-hidden />}
    >
      <QuizPageClient />
    </Suspense>
  );
}
