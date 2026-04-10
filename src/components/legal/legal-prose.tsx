import { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

export function LegalProse({
  title,
  children,
  className,
}: PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <article className={cn('mx-auto max-w-3xl px-4 py-16 text-slate-300', className)}>
      <h1 className='mb-10 font-display text-3xl font-bold tracking-tight text-white'>{title}</h1>
      <div className='space-y-6 text-sm leading-relaxed'>{children}</div>
    </article>
  );
}

export function LegalSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className='space-y-3'>
      <h2 className='text-lg font-semibold text-white'>{title}</h2>
      <div className='space-y-2'>{children}</div>
    </section>
  );
}
