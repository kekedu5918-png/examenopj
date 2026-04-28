'use client';

import type { DashboardStats } from '@/lib/supabase/dashboard-queries';

type Props = {
  stats: DashboardStats;
};

function GaugeCircle({
  pct,
  label,
  detail,
  colorHex,
}: {
  pct: number;
  label: string;
  detail: string;
  colorHex: string;
}) {
  const clamped = Math.min(100, Math.max(0, Math.round(pct)));
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (clamped / 100) * c;

  return (
    <div className='flex flex-col items-center gap-2 text-center'>
      <div className='relative flex h-28 w-28 items-center justify-center'>
        <svg className='-rotate-90 text-slate-200 dark:text-slate-700' width='112' height='112' aria-hidden viewBox='0 0 100 100'>
          <circle cx='50' cy='50' r={r} fill='none' stroke='currentColor' strokeWidth='8' />
          <circle
            cx='50'
            cy='50'
            r={r}
            fill='none'
            stroke={colorHex}
            strokeWidth='8'
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap='round'
            className='transition-[stroke-dashoffset] duration-500 ease-out'
          />
        </svg>
        <span className='absolute inset-0 flex flex-col items-center justify-center'>
          <span className='text-2xl font-bold tabular-nums text-ds-text-primary'>{clamped}</span>
          <span className='text-[10px] font-medium uppercase tracking-wide text-ds-text-muted'>%</span>
        </span>
      </div>
      <p className='text-xs font-semibold text-ds-text-primary'>{label}</p>
      <p className='max-w-[9rem] text-[11px] leading-snug text-ds-text-muted'>{detail}</p>
    </div>
  );
}

export function DashboardStatsGauges({ stats }: Props) {
  const gauges = [
    {
      pct: stats.fiches.progress,
      label: 'Fiches parcours (leçons validées)',
      detail: `${stats.fiches.done} / ${stats.fiches.total} leçons`,
      colorHex: '#F59E0B',
    },
    {
      pct: stats.quiz.scoreMoyen,
      label: 'Score quiz moyen',
      detail: `${stats.quiz.attemptCount} session${stats.quiz.attemptCount > 1 ? 's' : ''} (${stats.quiz.uniqueSessions} profil${stats.quiz.uniqueSessions > 1 ? 's' : ''})`,
      colorHex: '#3B82F6',
    },
    {
      pct: stats.parcours.progress,
      label: 'Parcours cadres',
      detail: `${stats.parcours.done} / ${stats.parcours.total} étapes`,
      colorHex: '#10B981',
    },
  ];

  return (
    <div className='rounded-2xl border border-ds-border bg-ds-bg-secondary/90 p-6 dark:border-slate-700 dark:bg-navy-950/40'>
      <div className='mb-4 flex flex-wrap items-end justify-between gap-3'>
        <div>
          <h2 className='text-lg font-semibold text-ds-text-primary'>Vue synthèse</h2>
          <p className='text-xs text-ds-text-muted'>
            Données compte · streak, XP et badges depuis Supabase et le corpus local quiz.
          </p>
        </div>
        <div className='flex flex-wrap gap-3 text-xs text-ds-text-muted'>
          <span title='Série de jours'>
            🔥 Série : <strong className='text-ds-text-primary'>{stats.streak.current}</strong> jour
            {stats.streak.current > 1 ? 's' : ''}
          </span>
          <span title='XP parcours OPJ'>
            ⚡ XP : <strong className='text-ds-text-primary'>{stats.xp}</strong>
          </span>
          <span title='Badges'>
            🏅 Badges : <strong className='text-ds-text-primary'>{stats.badges.count}</strong>
          </span>
          <span title='Flashcards bien maîtrisées'>
            📇 SRS : <strong className='text-ds-text-primary'>{stats.flashcards.mastered}</strong>
          </span>
        </div>
      </div>
      <div className='grid gap-8 sm:grid-cols-3'>
        {gauges.map((g) => (
          <GaugeCircle key={g.label} pct={g.pct} label={g.label} detail={g.detail} colorHex={g.colorHex} />
        ))}
      </div>
    </div>
  );
}
