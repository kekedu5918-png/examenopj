'use client';

import { BookOpen, Brain, FileEdit, ListOrdered } from 'lucide-react';

import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

/** Chiffres éditoriaux figés (pas de fetch / DB). */
const FASCICULES = 15;
const INFRACTIONS = 55;
const EPREUVES = 3;
const QUESTIONS_QUIZ = 400;

export function StatsBandSection() {
  return (
    <section className='py-16 md:py-24' aria-label='Chiffres clés'>
      <div className='h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent' aria-hidden />
      <div className='border-y border-white/[0.06] bg-white/[0.02] py-10 backdrop-blur-sm md:py-12'>
        <div className='mx-auto max-w-5xl px-4'>
          <div className='rounded-[12px] border border-white/[0.06] bg-white/[0.03] px-6 py-8 backdrop-blur-sm md:px-8'>
            <div className='grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4'>
              <div className='relative flex flex-col items-center justify-center text-center md:min-h-[140px]'>
                <AnimatedCounter
                  value={FASCICULES}
                  label='Fascicules officiels'
                  icon={<BookOpen strokeWidth={2} aria-hidden />}
                />
              </div>
              <div className='relative flex flex-col items-center justify-center text-center md:min-h-[140px]'>
                <div
                  className='absolute left-0 top-4 hidden h-[calc(100%-2rem)] w-px bg-white/[0.08] md:block'
                  aria-hidden
                />
                <AnimatedCounter
                  value={INFRACTIONS}
                  suffix='+'
                  label='Infractions détaillées'
                  icon={<ListOrdered className='h-4 w-4' strokeWidth={2} aria-hidden />}
                />
              </div>
              <div className='relative flex flex-col items-center justify-center text-center md:min-h-[140px]'>
                <div
                  className='absolute left-0 top-4 hidden h-[calc(100%-2rem)] w-px bg-white/[0.08] md:block'
                  aria-hidden
                />
                <AnimatedCounter
                  value={EPREUVES}
                  label='Épreuves couvertes'
                  icon={<FileEdit strokeWidth={2} aria-hidden />}
                />
              </div>
              <div className='relative flex flex-col items-center justify-center text-center md:min-h-[140px]'>
                <div
                  className='absolute left-0 top-4 hidden h-[calc(100%-2rem)] w-px bg-white/[0.08] md:block'
                  aria-hidden
                />
                <AnimatedCounter
                  value={QUESTIONS_QUIZ}
                  suffix='+'
                  label='Questions de quiz'
                  icon={<Brain strokeWidth={2} aria-hidden />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
