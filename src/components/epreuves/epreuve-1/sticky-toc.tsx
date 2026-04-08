'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';

const links = [
  { id: 'bareme', label: 'Barème' },
  { id: 'methodologie', label: 'Méthodologie' },
  { id: 'structure', label: 'Structure' },
  { id: 'phrases', label: 'Phrases types' },
  { id: 'exemple-ca', label: 'Exemple CA' },
  { id: 'prqc', label: 'PRQC' },
] as const;

export function StickyToc() {
  const [active, setActive] = useState<string>(links[0].id);

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: '-12% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <aside className='hidden w-52 shrink-0 lg:block'>
      <nav
        className='sticky top-28 max-h-[calc(100vh-8rem)] space-y-1 overflow-y-auto rounded-xl border border-white/10 bg-navy-950/80 p-4 text-sm backdrop-blur-md'
        aria-label='Sommaire de la page'
      >
        <p className='mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500'>Sur cette page</p>
        <ul className='space-y-1'>
          {links.map((l) => (
            <li key={l.id}>
              <button
                type='button'
                onClick={() => scrollTo(l.id)}
                className={cn(
                  'w-full rounded-lg px-3 py-2 text-left transition-colors',
                  active === l.id ? 'bg-gold-400/15 font-medium text-gold-300' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                )}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
