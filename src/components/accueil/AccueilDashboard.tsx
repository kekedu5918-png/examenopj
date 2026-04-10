'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/utils/cn';

const EXAM = new Date(Date.UTC(2026, 5, 11, 0, 0, 0));

export type AccueilRecent = { href: string; label: string; hint: string };

export type SessionDuJour = {
  title: string;
  points: string[];
  href: string;
  estimatedMinutes: number;
  /** Ex. "Fascicule 02 — score récent 45 %" */
  reason?: string;
};

export type AccueilDashboardProps = {
  loggedIn: boolean;
  /** 0–100 */
  programmePct: number;
  infractionsVues: number;
  qcmReussis: number;
  sessionsCount: number;
  recent: AccueilRecent[];
  suggestedSession: SessionDuJour;
};

export function AccueilDashboard({
  loggedIn,
  programmePct,
  infractionsVues,
  qcmReussis,
  sessionsCount,
  recent,
  suggestedSession,
}: AccueilDashboardProps) {
  const now = new Date();
  const ms = EXAM.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));

  return (
    <div className='mx-auto max-w-5xl px-4 pb-24 pt-8 md:pt-12'>
      <header className='mb-8'>
        <h1 className='font-display text-3xl font-bold tracking-tight text-white md:text-4xl'>Ton espace</h1>
        <p className='mt-2 text-examen-inkMuted'>Un objectif clair par session — rien d&apos;indispensable sous le pli.</p>
      </header>

      <div className='grid gap-6 lg:grid-cols-[1fr_minmax(0,260px)] lg:items-start'>
        {/* Session du jour */}
        <GlassCard padding='p-6 md:p-8' className='border-examen-accent/25 bg-gradient-to-br from-examen-accent/10 to-transparent lg:min-h-[320px]'>
          <div className='flex items-center justify-between'>
            <p className='text-xs font-bold uppercase tracking-widest text-examen-accent'>Ta session du jour</p>
            {suggestedSession.reason ? (
              <span className='rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-gray-500'>
                {suggestedSession.reason}
              </span>
            ) : null}
          </div>
          <h2 className='mt-3 font-sans text-xl font-bold text-white md:text-2xl'>
            {suggestedSession.title}
          </h2>
          <p className='mt-2 inline-flex items-center gap-2 text-sm text-examen-inkMuted'>
            <Clock className='h-4 w-4' aria-hidden />
            ~{suggestedSession.estimatedMinutes} minutes
          </p>
          <ul className='mt-5 space-y-2 text-sm text-slate-300'>
            {suggestedSession.points.map((point) => (
              <li key={point} className='flex gap-2'>
                <span className='text-examen-accent' aria-hidden>·</span>
                {point}
              </li>
            ))}
          </ul>
          <div className='mt-8'>
            <Link
              href={suggestedSession.href}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl bg-examen-accent px-6 py-3 text-sm font-semibold text-white',
                'transition hover:bg-examen-accentHover focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/50',
              )}
            >
              Commencer
              <ArrowRight className='h-4 w-4' aria-hidden />
            </Link>
          </div>
        </GlassCard>

        <div className='flex flex-col gap-4'>
          {/* Progression */}
          <GlassCard padding='p-5' className='text-sm'>
            <p className='text-xs font-bold uppercase tracking-widest text-examen-inkMuted'>Progression</p>
            <div className='mt-3 h-2 overflow-hidden rounded-full bg-white/10'>
              <div
                className='h-full rounded-full bg-gradient-to-r from-examen-accent to-emerald-400 transition-[width] duration-700'
                style={{ width: `${Math.min(100, Math.round(programmePct))}%` }}
                role='progressbar'
                aria-valuenow={Math.round(programmePct)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${Math.round(programmePct)} % du programme`}
              />
            </div>
            <p className='mt-2 text-lg font-bold text-white'>{Math.round(programmePct)} % du programme</p>
            <div className='mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-examen-inkMuted'>
              <div>
                <p className='font-mono text-lg text-white'>{infractionsVues}</p>
                <p>Maîtrisés</p>
              </div>
              <div>
                <p className='font-mono text-lg text-white'>{qcmReussis}</p>
                <p>QCM réussis</p>
              </div>
              <div>
                <p className='font-mono text-lg text-white'>{sessionsCount}</p>
                <p>Sessions</p>
              </div>
            </div>
          </GlassCard>

          {/* Compte à rebours */}
          <GlassCard padding='p-5' className='text-sm'>
            <p className='text-xs font-bold uppercase tracking-widest text-examen-inkMuted'>Compte à rebours</p>
            <p className='mt-3 font-sans text-2xl font-bold text-white'>{daysLeft} jours</p>
            <p className='text-examen-inkMuted'>avant l&apos;écrit — 11 juin 2026</p>
            <Link href='/dashboard/progression' className='mt-3 block text-xs font-semibold text-examen-accent hover:underline'>
              Voir mes statistiques détaillées →
            </Link>
          </GlassCard>
        </div>
      </div>

      {/* Reprendre */}
      <section className='mt-10'>
        <h2 className='font-sans text-lg font-bold text-white'>Reprendre</h2>
        <div className='mt-4 grid gap-3 md:grid-cols-3'>
          {(loggedIn ? recent : []).map((r) => (
            <GlassCard key={r.href + r.label} padding='p-4' className='flex flex-col justify-between'>
              <div>
                <p className='text-xs text-examen-inkMuted'>{r.hint}</p>
                <p className='mt-1 font-medium text-white'>{r.label}</p>
              </div>
              <Link href={r.href} className='mt-3 text-sm font-semibold text-examen-accent hover:underline'>
                Reprendre
              </Link>
            </GlassCard>
          ))}
          {!loggedIn || recent.length === 0 ? (
            <GlassCard padding='p-4' className='md:col-span-3'>
              <p className='text-sm text-examen-inkMuted'>
                {loggedIn
                  ? 'Aucune activité récente. Lance un quiz ou une série de flashcards.'
                  : 'Connecte-toi pour retrouver tes dernières sessions ici.'}
              </p>
              {!loggedIn ? (
                <Link href='/login?next=%2Faccueil' className='mt-2 inline-block text-sm font-semibold text-examen-accent'>
                  Se connecter
                </Link>
              ) : (
                <Link href='/quiz' className='mt-2 inline-block text-sm font-semibold text-examen-accent'>
                  Lancer un QCM
                </Link>
              )}
            </GlassCard>
          ) : null}
        </div>
      </section>
    </div>
  );
}
