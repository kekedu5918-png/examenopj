'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { WrittenExamDaysCount } from '@/components/home/hydration-safe-day-counts';

export function UrgencyBanner() {
  const pathname = usePathname();
  if (pathname !== '/') return null;

  return (
    <div
      className='sticky top-0 z-[60] border-b border-examen-accent/30 bg-gradient-to-r from-examen-accent/20 to-examen-premium/20 px-4 py-2.5'
      role='region'
      aria-label='Rappel date des épreuves écrites'
    >
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 sm:text-left'>
        <p className='text-sm font-medium text-examen-ink'>
          <span aria-hidden>⏳ </span>
          Examen OPJ — <WrittenExamDaysCount className='tabular-nums' /> jours · Écrits le 11 juin 2026
          <span className='hidden sm:inline'> →</span>
        </p>
        <Link
          href='/signup'
          className='text-sm font-semibold text-examen-accent underline-offset-4 transition hover:text-examen-accentHover hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-examen-canvas'
        >
          Commencer les révisions
        </Link>
      </div>
    </div>
  );
}
