'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Circle, RotateCcw } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';

const STORAGE_KEY = 'examenopj:parcours-candidat-v1';

type Step = {
  id: string;
  title: string;
  description: string;
  href: string;
  hint?: string;
};

const STEPS: Step[] = [
  {
    id: 'fondamentaux',
    title: 'Fondamentaux',
    description: 'Les notions procédure / pénales à avoir sur le bout des doigts, alignées sur les fascicules.',
    href: '/fondamentaux',
    hint: 'Les nouvelles synthèses « programme complet » couvrent aussi les thèmes F08–F15 (libertés, loi pénale, sanction, PJ, instruction, juridictions, parquet, nullités).',
  },
  {
    id: 'recap-priorites',
    title: 'Récap « priorité examen »',
    description: 'Même tableau : toutes les lignes triées du plus indispensable au « à sécuriser » — idéal épreuve 1.',
    href: '/entrainement/recapitulatif?priorite=1',
    hint: 'Révisez mot pour mot ; sans éléments exacts = risque de 0 sur la qualification.',
  },
  {
    id: 'flashcards',
    title: 'Flashcards infractions',
    description: 'Mémorisation active sur le même référentiel que le récap.',
    href: '/entrainement/flashcards',
  },
  {
    id: 'enquetes',
    title: 'Enquête type formation',
    description: 'Sujet, articulation, PV et rapport : le socle pour l’épreuve 2 (comme en présentiel).',
    href: '/cours/enquetes',
    hint: 'Commencez par Alpha (gratuite, planches complètes), puis enchaînez selon vos thèmes faibles.',
  },
  {
    id: 'epreuve2',
    title: 'Méthode épreuve 2',
    description: 'Ce que attendent les correcteurs : cartouches, forme, erreurs à éviter.',
    href: '/epreuves/epreuve-2',
  },
  {
    id: 'articulation',
    title: 'Articulation interactive',
    description: 'Construire la ligne de temps des cartouches ; corrige-type Alpha/Bravo avec ?ref=.',
    href: '/entrainement/articulation',
    hint: 'Ex. /entrainement/articulation?ref=alpha après avoir relu l’enquête Alpha.',
  },
];

function readStored(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const p = JSON.parse(raw) as { completed?: Record<string, boolean> };
    return p?.completed && typeof p.completed === 'object' ? p.completed : {};
  } catch {
    return {};
  }
}

function writeStored(completed: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed }));
  } catch {
    /* ignore */
  }
}

export function ParcoursCandidatClient() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCompleted(readStored());
    setMounted(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      writeStored(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCompleted({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const doneCount = useMemo(
    () => STEPS.filter((s) => completed[s.id]).length,
    [completed],
  );

  return (
    <div className='container pb-24 pt-10 md:pt-14'>
      <nav className='mb-6 text-sm text-gray-500'>
        <Link href='/entrainement' className='text-cyan-400 hover:underline'>
          Entraînement
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-gray-400'>Parcours candidat</span>
      </nav>

      <SectionTitle
        badge='PARCOURS'
        badgeClassName='bg-gold-500/20 text-gold-200'
        title='Parcours candidat'
        subtitle='Enchaînement recommandé : fondamentaux → récap priorité examen → flashcards → enquête → épreuve 2 → articulation. Cocher les étapes faites (sauvegardé dans ce navigateur).'
        className='mb-8 max-w-3xl'
      />

      <div className='mb-8 flex flex-wrap items-center gap-4'>
        <GlassCard padding='p-4' className='inline-flex items-center gap-3 border-white/10'>
          <div
            className='relative flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-sm font-bold text-gold-200'
            aria-label='Progression'
          >
            {mounted ? `${doneCount}/${STEPS.length}` : '—'}
          </div>
          <div className='text-sm text-gray-400'>
            <p className='font-medium text-gray-200'>Progression locale</p>
            <p className='text-xs'>Rien n’est envoyé au serveur.</p>
          </div>
        </GlassCard>
        <button
          type='button'
          onClick={reset}
          className='inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10'
        >
          <RotateCcw className='h-4 w-4' aria-hidden />
          Réinitialiser la progression
        </button>
      </div>

      <ol className='space-y-4'>
        {STEPS.map((step, index) => {
          const isDone = Boolean(completed[step.id]);
          return (
            <li key={step.id}>
              <GlassCard
                padding='p-0'
                className={cn(
                  'overflow-hidden border transition',
                  isDone ? 'border-emerald-500/35 bg-emerald-500/[0.06]' : 'border-white/10',
                )}
              >
                <div className='flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between'>
                  <div className='flex gap-4'>
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                        isDone ? 'bg-emerald-600 text-white' : 'bg-white/10 text-gray-300',
                      )}
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h2 className='font-display text-lg font-bold text-white'>{step.title}</h2>
                      <p className='mt-1 text-sm text-gray-400'>{step.description}</p>
                      {step.hint ? <p className='mt-2 text-xs text-gray-500'>{step.hint}</p> : null}
                    </div>
                  </div>
                  <div className='flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center md:flex-col lg:flex-row'>
                    <Link
                      href={step.href}
                      className='inline-flex justify-center rounded-lg bg-cyan-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-cyan-500'
                    >
                      Ouvrir
                    </Link>
                    <button
                      type='button'
                      onClick={() => toggle(step.id)}
                      className={cn(
                        'inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition',
                        isDone
                          ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-100'
                          : 'border-white/15 text-gray-300 hover:bg-white/10',
                      )}
                    >
                      {isDone ? <Check className='h-4 w-4' aria-hidden /> : <Circle className='h-4 w-4' aria-hidden />}
                      {isDone ? 'Faite' : 'Marquer comme faite'}
                    </button>
                  </div>
                </div>
              </GlassCard>
            </li>
          );
        })}
      </ol>

      <GlassCard className='mt-10 p-6' padding=''>
        <p className='text-sm font-semibold text-white'>Aller plus loin</p>
        <ul className='mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-cyan-400'>
          <li>
            <Link href='/epreuves' className='hover:underline'>
              Vue d’ensemble des 3 épreuves
            </Link>
          </li>
          <li>
            <Link href='/guide-revision-opj' className='hover:underline'>
              Guide de révision (méthodo présentiel)
            </Link>
          </li>
          <li>
            <Link href='/entrainement/quiz' className='hover:underline'>
              Quiz QCM puis hardcore
            </Link>
          </li>
        </ul>
      </GlassCard>
    </div>
  );
}
