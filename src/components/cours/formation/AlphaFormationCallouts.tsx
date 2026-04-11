import { AlertTriangle, BookMarked, Lightbulb } from 'lucide-react';

import { cn } from '@/utils/cn';

type BaseProps = {
  children: React.ReactNode;
  className?: string;
};

/** Piège examen — mise en avant sans modifier le fond juridique. */
export function FormationExamTrap({ children, className }: BaseProps) {
  return (
    <aside
      className={cn(
        'rounded-xl border border-amber-500/35 bg-gradient-to-br from-amber-950/50 to-amber-950/20 p-4 shadow-[0_0_24px_-8px_rgba(245,158,11,0.25)]',
        className,
      )}
    >
      <div className='flex gap-3'>
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-200'>
          <AlertTriangle className='h-4 w-4' aria-hidden />
        </span>
        <div className='min-w-0 text-sm leading-relaxed text-amber-50/95 [&_strong]:text-amber-100'>
          <p className='mb-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-200/90'>Piège examen</p>
          {children}
        </div>
      </div>
    </aside>
  );
}

export function FormationTip({ children, className }: BaseProps) {
  return (
    <aside
      className={cn(
        'rounded-xl border border-sky-500/30 bg-gradient-to-br from-sky-950/40 to-slate-950/40 p-4',
        className,
      )}
    >
      <div className='flex gap-3'>
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sky-200'>
          <Lightbulb className='h-4 w-4' aria-hidden />
        </span>
        <div className='min-w-0 text-sm leading-relaxed text-slate-200 [&_strong]:text-white'>{children}</div>
      </div>
    </aside>
  );
}

export function FormationKeyJuris({ title, children, className }: BaseProps & { title?: string }) {
  return (
    <aside
      className={cn(
        'rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-950/45 to-slate-950/50 p-4',
        className,
      )}
    >
      <div className='flex gap-3'>
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-violet-200'>
          <BookMarked className='h-4 w-4' aria-hidden />
        </span>
        <div className='min-w-0 text-sm leading-relaxed text-slate-200'>
          {title ? <p className='mb-1.5 font-semibold text-violet-100'>{title}</p> : null}
          {children}
        </div>
      </div>
    </aside>
  );
}
