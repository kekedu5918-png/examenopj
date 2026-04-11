'use client';

import { BookOpen, ClipboardList, GraduationCap } from 'lucide-react';

import { AlphaCadresFlagranceFiche } from '@/components/cours/formation/AlphaCadresFlagranceFiche';
import { AlphaPvFormalismFiche } from '@/components/cours/formation/AlphaPvFormalismFiche';
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
      className='relative mb-10 overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/50 via-navy-950/60 to-[#0a0612] p-5 shadow-2xl shadow-violet-950/30 md:p-8'
      aria-labelledby='alpha-formation-title'
    >
      <div
        className='pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl'
        aria-hidden
      />
      <div className='relative flex flex-wrap items-start gap-3'>
        <span className='inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/40 bg-gradient-to-br from-violet-500/25 to-violet-950/50 text-violet-100 shadow-lg shadow-violet-950/40'>
          <GraduationCap className='h-6 w-6' aria-hidden />
        </span>
        <div className='min-w-0 flex-1'>
          <p className='text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300/90'>Programme — formation</p>
          <h2 id='alpha-formation-title' className='mt-1 font-display text-xl font-bold text-white md:text-2xl'>
            {ALPHA_FORMATION_TITRE}
          </h2>
          <p className='mt-2 text-sm text-slate-300'>({ALPHA_FORMATION_SCENARIO})</p>
          <div className='mt-4 flex flex-wrap gap-2'>
            <span className='rounded-full border border-cyan-500/35 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold text-cyan-100'>
              DPS / thèmes procédure
            </span>
            <span className='rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-100'>
              Mémo examen
            </span>
          </div>
          <p className='mt-3 text-xs leading-relaxed text-slate-500'>
            Fiches enrichissables — bascule vers l’onglet <strong className='text-slate-400'>Planches PDF</strong> pour le
            sujet et les corrigés.
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
                        ) : item.richModuleId === 'pv-formalisme-probant' ? (
                          <AlphaPvFormalismFiche />
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
