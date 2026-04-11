'use client';

import { BookOpen, ClipboardList, GraduationCap } from 'lucide-react';

import { AlphaCadresFlagranceFiche } from '@/components/cours/formation/AlphaCadresFlagranceFiche';
import {
  ALPHA_FORMATION_PLACEHOLDER,
  ALPHA_FORMATION_SCENARIO,
  ALPHA_FORMATION_SECTIONS,
  ALPHA_FORMATION_TITRE,
} from '@/data/enquetes/alpha-formation-programme';
import { cn } from '@/utils/cn';

/**
 * Programme de formation (document centre) pour l’enquête Alpha.
 * Les onglets Sujet / Articulation / PV / Rapport restent inchangés en dessous.
 */
export function EnqueteAlphaFormationProgramme() {
  return (
    <section
      className='mb-10 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 via-navy-950/50 to-navy-950 p-5 shadow-lg shadow-black/20 md:p-7'
      aria-labelledby='alpha-formation-title'
    >
      <div className='flex flex-wrap items-start gap-3'>
        <span className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/35 bg-violet-500/15 text-violet-200'>
          <GraduationCap className='h-5 w-5' aria-hidden />
        </span>
        <div className='min-w-0 flex-1'>
          <p className='text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300/90'>Programme — formation</p>
          <h2 id='alpha-formation-title' className='mt-1 font-display text-xl font-bold text-white md:text-2xl'>
            {ALPHA_FORMATION_TITRE}
          </h2>
          <p className='mt-2 text-sm text-slate-300'>({ALPHA_FORMATION_SCENARIO})</p>
          <p className='mt-3 text-xs leading-relaxed text-slate-500'>
            Les fiches s’enrichissent au fil de vos envois validés. Les onglets ci-dessous conservent le sujet, les
            exercices et les corrigés pour votre entraînement.
          </p>
        </div>
      </div>

      <div className='mt-8 space-y-10'>
        {ALPHA_FORMATION_SECTIONS.map((section) => (
          <div key={section.id}>
            <h3 className='mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-400'>
              {section.id === 'dps' ? (
                <BookOpen className='h-4 w-4 text-amber-200/90' aria-hidden />
              ) : (
                <ClipboardList className='h-4 w-4 text-cyan-200/90' aria-hidden />
              )}
              {section.titre}
            </h3>
            {section.id === 'dps' ? (
              <ul className='space-y-4'>
                {section.items.map((item) => (
                  <li key={item.id} className='list-none'>
                    <div className='rounded-xl border border-white/[0.08] bg-black/25 p-4'>
                      <p className='text-sm font-semibold leading-snug text-slate-100'>{item.titre}</p>
                      <div className='mt-3 border-l-2 border-violet-500/40 pl-3 text-sm leading-relaxed text-slate-400'>
                        {item.corps === ALPHA_FORMATION_PLACEHOLDER ? (
                          <span className='font-mono text-amber-200/90'>{ALPHA_FORMATION_PLACEHOLDER}</span>
                        ) : (
                          item.corps
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ol className='list-decimal space-y-4 pl-5 marker:font-medium marker:text-slate-500'>
                {section.items.map((item) => (
                  <li key={item.id} className='pl-2'>
                    <div className='rounded-xl border border-white/[0.08] bg-black/25 p-3 md:p-4'>
                      <p className='text-sm font-semibold leading-snug text-slate-100'>{item.titre}</p>
                      <div className='mt-3 text-sm leading-relaxed text-slate-400'>
                        {item.richModuleId === 'cadres-flagrance' ? (
                          <AlphaCadresFlagranceFiche />
                        ) : item.corps === ALPHA_FORMATION_PLACEHOLDER ? (
                          <div className='border-l-2 border-violet-500/40 pl-3'>
                            <span className='font-mono text-amber-200/90'>{ALPHA_FORMATION_PLACEHOLDER}</span>
                          </div>
                        ) : (
                          <div className='border-l-2 border-violet-500/40 pl-3'>{item.corps}</div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
