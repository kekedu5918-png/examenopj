import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Lock, Sparkles } from 'lucide-react';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { SUJETS_BLANCS } from '@/data/sujets-blancs';
import { cn } from '@/utils/cn';

export const metadata: Metadata = {
  title: 'Sujets blancs — Examen OPJ',
  description:
    'Sujets blancs examen OPJ 2026 — 3 sessions complètes fictives. Épreuves 1, 2 et 3 avec corrigé. Entraînement en conditions réelles.',
  robots: { index: true, follow: true },
};

export default function SujetsBlancsIndexPage() {
  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.sujetsBlancs} pad='default' innerClassName='md:pt-16'>
      <header className='mx-auto max-w-3xl text-center'>
        <p className='text-xs font-bold uppercase tracking-widest text-examen-accent'>Simulation complète</p>
        <h1 className='mt-3 font-display text-3xl font-bold text-white md:text-4xl'>
          Épreuves blanches — Testez-vous en conditions réelles
        </h1>
        <p className='mt-4 text-sm leading-relaxed text-examen-inkMuted md:text-base'>
          Trois sessions cohérentes : la même affaire fictive sur l’épreuve écrite de qualification, le dossier de procédure
          et l’oral devant jury. Chaque session indique les fiches modules F à revoir avant de chronométrer. L’index est
          libre ; le détail complet est réservé aux abonnés Premium.
        </p>
      </header>

      <div className='mt-12 grid gap-6 md:grid-cols-3'>
        {SUJETS_BLANCS.map((s) => (
          <Link
            key={s.id}
            href={`/sujets-blancs/${s.id}`}
            className={cn(
              'group flex flex-col rounded-2xl border border-white/[0.08] bg-examen-card p-6 shadow-ex-card transition duration-200',
              'hover:-translate-y-0.5 hover:border-examen-accent/35 hover:shadow-ex-card-hover',
            )}
          >
            <div className='flex flex-wrap items-center gap-2'>
              <BookOpen className='h-8 w-8 text-examen-accent' aria-hidden />
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase',
                  s.difficulte === 'avance'
                    ? 'bg-rose-500/20 text-rose-200'
                    : 'bg-amber-500/20 text-amber-200',
                )}
              >
                {s.difficulte === 'avance' ? 'Avancé' : 'Intermédiaire'}
              </span>
              {s.corrigeDisponible ? (
                <span className='rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-200'>
                  Corrigé dispo.
                </span>
              ) : null}
              <span className='ml-auto inline-flex items-center gap-1 rounded-full border border-examen-premium/35 bg-examen-premium/15 px-2 py-0.5 text-[10px] font-bold text-violet-200'>
                <Lock className='h-3 w-3' aria-hidden />
                Premium
              </span>
            </div>
            <h2 className='mt-4 font-display text-lg font-bold text-white group-hover:text-examen-accent'>{s.titre}</h2>
            <p className='mt-2 text-sm text-examen-inkMuted'>{s.description}</p>
            <p className='mt-3 text-xs font-medium text-examen-accent'>
              Thème : {s.theme}
            </p>
            <span className='mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white'>
              <Sparkles className='h-4 w-4 text-examen-accent' aria-hidden />
              Ouvrir la session
            </span>
          </Link>
        ))}
      </div>
    </InteriorPageShell>
  );
}
