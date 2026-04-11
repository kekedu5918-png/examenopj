import { cn } from '@/utils/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Bloc titre de section (h3 visuel). */
export function FormationH3({ children, className }: Props) {
  return (
    <h3 className={cn('mt-8 scroll-mt-24 font-display text-base font-bold tracking-tight text-white first:mt-0 md:text-lg', className)}>
      {children}
    </h3>
  );
}

export function FormationH4({ children, className }: Props) {
  return <h4 className={cn('mt-5 text-sm font-bold text-cyan-100/95 md:text-base', className)}>{children}</h4>;
}

export function FormationH5({ children, className }: Props) {
  return <h5 className={cn('mt-4 text-xs font-bold uppercase tracking-wide text-slate-400', className)}>{children}</h5>;
}

export function FormationP({ children, className }: Props) {
  return <p className={cn('mt-3 text-sm leading-relaxed text-slate-300 md:text-[15px]', className)}>{children}</p>;
}

export function FormationUl({ children, className }: Props) {
  return (
    <ul className={cn('mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-cyan-500/80', className)}>
      {children}
    </ul>
  );
}

export function FormationOl({ children, className }: Props) {
  return (
    <ol className={cn('mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:font-medium marker:text-slate-500', className)}>
      {children}
    </ol>
  );
}

export function FormationQuote({ children, className }: Props) {
  return (
    <blockquote
      className={cn(
        'mt-3 border-l-2 border-violet-400/50 bg-white/[0.03] py-2 pl-4 text-sm italic leading-relaxed text-slate-300',
        className,
      )}
    >
      {children}
    </blockquote>
  );
}

/** Tableau responsive (scroll horizontal sur mobile). */
export function FormationTable({
  caption,
  headers,
  rows,
  className,
}: {
  caption?: string;
  headers: string[];
  rows: string[][];
  className?: string;
}) {
  return (
    <div className={cn('mt-4 overflow-x-auto rounded-xl border border-white/[0.08] bg-black/20', className)}>
      <table className='w-full min-w-[520px] border-collapse text-left text-xs md:min-w-0 md:text-sm'>
        {caption ? <caption className='border-b border-white/10 bg-white/[0.04] px-3 py-2 text-left text-[11px] font-semibold text-slate-400'>{caption}</caption> : null}
        <thead>
          <tr className='border-b border-white/10 bg-white/[0.06]'>
            {headers.map((h) => (
              <th key={h} className='px-3 py-2.5 font-semibold text-slate-200'>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className='border-b border-white/[0.06] last:border-0'>
              {row.map((cell, j) => (
                <td key={j} className='px-3 py-2.5 align-top text-slate-300'>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Chapitre repliable — mobile first, limiter la hauteur initiale. */
export function FormationChapter({
  id,
  title,
  badge,
  children,
  defaultOpen = false,
}: {
  id: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      id={id}
      className='group rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.05] to-transparent open:border-cyan-500/25 open:shadow-lg open:shadow-cyan-500/5'
      {...(defaultOpen ? { open: true } : {})}
    >
      <summary className='cursor-pointer list-none px-4 py-4 pr-12 marker:content-none md:px-5 md:py-5 [&::-webkit-details-marker]:hidden'>
        <span className='flex flex-wrap items-center gap-2'>
          {badge ? (
            <span className='rounded-full border border-cyan-500/35 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-200'>
              {badge}
            </span>
          ) : null}
          <span className='font-display text-base font-bold text-white md:text-lg'>{title}</span>
        </span>
        <span className='mt-2 block text-xs text-slate-500 group-open:hidden'>Toucher pour développer</span>
      </summary>
      <div className='border-t border-white/[0.06] px-4 pb-5 pt-2 md:px-5 md:pb-6'>{children}</div>
    </details>
  );
}
