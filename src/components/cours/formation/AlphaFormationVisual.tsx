import { cn } from '@/utils/cn';

/** Pastilles « valeurs » (articles, durées, sigles). */
export function FormationValuePills({
  items,
  className,
}: {
  items: Array<{ label: string; sub?: string }>;
  className?: string;
}) {
  return (
    <ul
      className={cn('mt-4 flex flex-wrap gap-2', className)}
      aria-label='Valeurs et repères'
    >
      {items.map((it) => (
        <li
          key={it.label}
          className='rounded-full border border-cyan-500/35 bg-gradient-to-br from-cyan-950/60 to-slate-950/40 px-3 py-1.5 text-center shadow-sm shadow-black/20'
        >
          <span className='block text-[11px] font-bold uppercase tracking-wide text-cyan-200'>{it.label}</span>
          {it.sub ? <span className='mt-0.5 block text-[10px] text-slate-400'>{it.sub}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/** Étapes horizontales avec flèches (responsive : wrap). */
export function FormationStepFlow({
  steps,
  className,
}: {
  steps: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mt-4 flex flex-wrap items-center gap-1 rounded-xl border border-white/[0.08] bg-black/25 p-3 md:gap-2 md:p-4',
        className,
      )}
      role='list'
      aria-label='Enchaînement des étapes'
    >
      {steps.map((label, i) => (
        <div key={`${label}-${i}`} className='flex flex-wrap items-center gap-1 md:gap-2'>
          {i > 0 ? (
            <span className='text-cyan-500/80' aria-hidden>
              →
            </span>
          ) : null}
          <span
            role='listitem'
            className='inline-flex max-w-[11rem] items-center rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-center text-[11px] font-medium leading-snug text-slate-200 md:max-w-none md:text-xs'
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Grille de bulles (méthode ABC, droits, etc.). */
export function FormationBubbleGrid({
  items,
  columnsClass = 'sm:grid-cols-2 lg:grid-cols-3',
  className,
}: {
  items: Array<{ title: string; hint?: string }>;
  columnsClass?: string;
  className?: string;
}) {
  return (
    <ul
      className={cn('mt-4 grid gap-2', columnsClass, className)}
      aria-label='Liste détaillée'
    >
      {items.map((it) => (
        <li
          key={it.title}
          className='rounded-xl border border-violet-500/20 bg-violet-950/25 px-3 py-2.5 text-sm text-slate-200 shadow-inner shadow-black/20'
        >
          <span className='font-semibold text-violet-100'>{it.title}</span>
          {it.hint ? <span className='mt-1 block text-xs text-slate-400'>{it.hint}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/** Deux colonnes comparatives (ex. FD / EP, audition libre / GAV). */
export function FormationCompareCards({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
  className,
}: {
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
  className?: string;
}) {
  return (
    <div className={cn('mt-4 grid gap-3 md:grid-cols-2', className)}>
      <div className='rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-4'>
        <p className='mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300'>{leftTitle}</p>
        <ul className='space-y-1.5 text-xs text-slate-300'>
          {leftItems.map((t) => (
            <li key={t} className='flex gap-2'>
              <span className='text-emerald-500'>•</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='rounded-xl border border-amber-500/25 bg-amber-950/20 p-4'>
        <p className='mb-2 text-[11px] font-bold uppercase tracking-wider text-amber-300'>{rightTitle}</p>
        <ul className='space-y-1.5 text-xs text-slate-300'>
          {rightItems.map((t) => (
            <li key={t} className='flex gap-2'>
              <span className='text-amber-500'>•</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Schéma parade : ligne de silhouettes + légende. */
export function FormationParadeStrip({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const n = Math.min(8, Math.max(4, count));
  return (
    <div
      className={cn(
        'mt-4 rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-black/40 p-4',
        className,
      )}
    >
      <p className='mb-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
        Présentation physique — groupe homogène ({n} personnes)
      </p>
      <div className='flex flex-wrap items-end justify-center gap-2 md:gap-3'>
        {Array.from({ length: n }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex h-16 w-10 flex-col items-center justify-end rounded-t-lg border border-slate-600/80 bg-slate-800/80 md:h-20 md:w-12',
              i === 1 ? 'ring-2 ring-amber-400/60' : '',
            )}
            title={i === 1 ? 'Exemple : suspect (choix libre du numéro)' : 'Personne de composition'}
          >
            <span className='mb-1 block h-8 w-6 rounded-full bg-slate-600/90 md:h-10 md:w-7' aria-hidden />
            <span className='mb-1 text-[9px] font-mono text-slate-500'>{i + 1}</span>
          </div>
        ))}
      </div>
      <p className='mt-3 text-center text-[10px] text-slate-500'>
        Même gabarit vestimentaire · pas de mise en évidence · photo PTS annexée au PV
      </p>
    </div>
  );
}

/** Flux vertical numéroté (procédure type TAJ, articulation PV). */
export function FormationVerticalPipeline({
  steps,
  className,
}: {
  steps: string[];
  className?: string;
}) {
  return (
    <ol className={cn('relative mt-4 space-y-0 border-l-2 border-cyan-500/30 pl-5', className)} aria-label='Étapes'>
      {steps.map((label, i) => (
        <li key={`${label}-${i}`} className='relative pb-6 last:pb-0'>
          <span className='absolute -left-[1.4rem] flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-950/80 text-[11px] font-bold text-cyan-200'>
            {i + 1}
          </span>
          <p className='pt-0.5 text-sm leading-relaxed text-slate-300'>{label}</p>
        </li>
      ))}
    </ol>
  );
}

/** Mini schéma : PV (NOUS) vs rapport (JE). */
export function FormationPersonSchema({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mt-4 flex flex-col items-stretch gap-3 rounded-xl border border-white/[0.08] bg-black/30 p-4 md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      <div className='flex-1 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-4 py-3 text-center'>
        <p className='text-[10px] font-bold uppercase tracking-wider text-cyan-300'>Procès-verbal</p>
        <p className='mt-1 font-display text-2xl font-bold text-white'>NOUS</p>
        <p className='mt-1 text-xs text-slate-400'>Présent · sur le champ · art. 66 &amp; 107 CPP</p>
      </div>
      <div className='hidden text-slate-500 md:block' aria-hidden>
        ≠
      </div>
      <div className='flex-1 rounded-lg border border-violet-500/30 bg-violet-950/30 px-4 py-3 text-center'>
        <p className='text-[10px] font-bold uppercase tracking-wider text-violet-300'>Rapport de synthèse</p>
        <p className='mt-1 font-display text-2xl font-bold text-white'>JE</p>
        <p className='mt-1 text-xs text-slate-400'>1re personne du singulier</p>
      </div>
    </div>
  );
}

/** Bandeau « chaîne » saisine → jugement (schéma simplifié). */
export function FormationJusticeChain({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mt-4 overflow-x-auto rounded-xl border border-white/[0.08] bg-black/25 px-3 py-4',
        className,
      )}
    >
      <div className='flex min-w-[20rem] items-center justify-center gap-1 text-[11px] md:min-w-0 md:gap-2 md:text-xs'>
        <span className='rounded-lg bg-slate-800/80 px-2 py-1 text-slate-300'>Enquête</span>
        <span className='text-cyan-500'>→</span>
        <span className='rounded-lg bg-slate-800/80 px-2 py-1 text-slate-300'>Parquet / instruction</span>
        <span className='text-cyan-500'>→</span>
        <span className='rounded-lg border border-amber-500/40 bg-amber-950/40 px-2 py-1 font-semibold text-amber-100'>
          Juridiction de jugement
        </span>
      </div>
    </div>
  );
}
