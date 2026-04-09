'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

export type TocItem = {
  id: string;
  label: string;
};

type Props = {
  items: TocItem[];
  title?: string;
  className?: string;
};

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }
    return () => observerRef.current?.disconnect();
  }, [ids]);

  return activeId;
}

/** Sommaire sticky pour desktop — sur mobile, barre de liens horizontale en haut. */
export function StickyToc({ items, title = 'Sommaire', className }: Props) {
  const ids = items.map((i) => i.id);
  const activeId = useActiveSection(ids);

  return (
    <>
      {/* Desktop : sidebar sticky */}
      <aside className={cn('hidden lg:block', className)}>
        <nav
          aria-label={title}
          className='sticky top-24 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4'
        >
          <p className='mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600'>{title}</p>
          <ol className='space-y-0.5'>
            {items.map((item, i) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150',
                      active
                        ? 'bg-cyan-500/10 text-cyan-200'
                        : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-black transition-all',
                        active ? 'bg-cyan-500/60 text-white' : 'bg-white/[0.06] text-slate-600',
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className='leading-snug'>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>

      {/* Mobile : barre horizontale scrollable */}
      <nav
        aria-label={title}
        className='mb-6 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      >
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition',
                active
                  ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-200'
                  : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200',
              )}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </>
  );
}
