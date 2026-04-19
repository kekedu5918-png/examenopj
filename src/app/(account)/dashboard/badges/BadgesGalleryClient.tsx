'use client';

import { useEffect, useMemo, useState } from 'react';

import { GlassCard } from '@/components/ui/GlassCard';
import {
  BADGE_CATALOG,
  type BadgeId,
  getQuizBadges,
  getQuizStreak,
  getTotalQuizzesCompleted,
} from '@/lib/quiz-gamification';
import { cn } from '@/utils/cn';

/**
 * Galerie de badges côté client : lit l'état localStorage et reflète les progrès en temps réel
 * grâce aux events `examenopj:quiz-gamification` émis par la lib gamification.
 */
export function BadgesGalleryClient() {
  const [earned, setEarned] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sync = () => {
      setEarned(new Set(getQuizBadges()));
      setStreak(getQuizStreak());
      setTotal(getTotalQuizzesCompleted());
    };
    sync();
    window.addEventListener('examenopj:quiz-gamification', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('examenopj:quiz-gamification', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Série en cours', value: streak > 0 ? `${streak} jour${streak > 1 ? 's' : ''}` : '—' },
      { label: 'Quiz complétés', value: String(total) },
      { label: 'Badges débloqués', value: `${earned.size} / ${BADGE_CATALOG.length}` },
    ],
    [streak, total, earned.size],
  );

  return (
    <div className='space-y-10'>
      <GlassCard className='grid gap-4 p-6 sm:grid-cols-3' padding=''>
        {stats.map((s) => (
          <div key={s.label} className='text-center'>
            <p className='text-[11px] font-bold uppercase tracking-wider text-slate-400'>{s.label}</p>
            <p className='mt-2 font-display text-2xl font-extrabold text-white'>{s.value}</p>
          </div>
        ))}
      </GlassCard>

      <section aria-labelledby='earned-title'>
        <h2 id='earned-title' className='mb-4 text-sm font-bold uppercase tracking-wider text-slate-400'>
          Débloqués
        </h2>
        {earned.size === 0 ? (
          <GlassCard className='p-8 text-center' padding=''>
            <p className='text-sm text-slate-400'>
              Aucun badge pour l&apos;instant. Lancez votre premier quiz pour décrocher
              «&nbsp;Premier quiz&nbsp;» et entamer la série.
            </p>
          </GlassCard>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {BADGE_CATALOG.filter((b) => earned.has(b.id)).map((b) => (
              <BadgeCard key={b.id} id={b.id} earned />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby='locked-title'>
        <h2 id='locked-title' className='mb-4 text-sm font-bold uppercase tracking-wider text-slate-400'>
          À débloquer
        </h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {BADGE_CATALOG.filter((b) => !earned.has(b.id)).map((b) => (
            <BadgeCard key={b.id} id={b.id} earned={false} />
          ))}
        </div>
      </section>
    </div>
  );
}

function BadgeCard({ id, earned }: { id: BadgeId; earned: boolean }) {
  const def = BADGE_CATALOG.find((b) => b.id === id)!;
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-2xl border p-5 transition-all',
        earned
          ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-white/[0.04] to-transparent shadow-lg shadow-amber-500/10'
          : 'border-white/[0.07] bg-white/[0.025] opacity-60 grayscale',
      )}
    >
      <div className='flex items-start gap-3'>
        <span className='text-3xl' aria-hidden>
          {def.icon}
        </span>
        <div className='min-w-0 flex-1'>
          <p className='text-sm font-bold text-white'>{def.label}</p>
          <p className='mt-1 text-xs leading-relaxed text-slate-400'>{def.description}</p>
        </div>
      </div>
      {earned ? (
        <span className='mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300'>
          ✓ Débloqué
        </span>
      ) : (
        <span className='mt-3 inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400'>
          À débloquer
        </span>
      )}
    </article>
  );
}
