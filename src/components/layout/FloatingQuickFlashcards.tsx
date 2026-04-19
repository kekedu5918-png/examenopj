'use client';

import Link from 'next/link';

/** Raccourci permanent — série courte flashcards (objectif ~10 min côté utilisateur). */
export function FloatingQuickFlashcards() {
  return (
    <Link
      href='/entrainement/flashcards'
      data-print-hide
      className='fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-examen-raised/95 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/40 backdrop-blur-md transition hover:border-examen-accent/40 hover:bg-examen-accent/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/50 md:bottom-8 md:right-6'
      title='Série flashcards rapide'
    >
      <span aria-hidden>⚡</span>
      <span>10 min</span>
    </Link>
  );
}
