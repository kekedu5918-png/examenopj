'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { DOMAIN_LABELS } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';
import { useReadModuleIds } from '@/hooks/use-read-module-ids';
import { cn } from '@/utils/cn';
import { getModuleNumGradient } from '@/utils/module-gradients';

export type CoursModuleExplorerItem = {
  id: string;
  numero: number;
  titre: string;
  accroche: string;
  domain: Domain;
};

const DOMAIN_STYLES: Record<Domain, string> = {
  DPS: 'border-red-500/25 bg-red-500/5',
  DPG: 'border-violet-500/25 bg-violet-500/5',
  PROCEDURE: 'border-blue-500/25 bg-blue-500/5',
};

function stripDiacritics(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

type Props = {
  modules: CoursModuleExplorerItem[];
};

export function CoursModulesExplorer({ modules }: Props) {
  const readIds = useReadModuleIds();
  const [query, setQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<Domain | 'ALL'>('ALL');

  const filtered = useMemo(() => {
    const needle = stripDiacritics(query.trim());
    return modules.filter((m) => {
      if (domainFilter !== 'ALL' && m.domain !== domainFilter) return false;
      if (!needle) return true;
      const haystack = stripDiacritics(
        `${m.titre} ${m.accroche} ${m.id} f${m.numero} ${String(m.numero).padStart(2, '0')}`,
      );
      return haystack.includes(needle);
    });
  }, [modules, query, domainFilter]);

  const byDomain = (d: Domain) => filtered.filter((m) => m.domain === d);

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:flex-wrap md:items-end md:justify-between'>
        <div className='min-w-[min(100%,280px)] flex-1'>
          <label htmlFor='module-search' className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500'>
            Rechercher
          </label>
          <input
            id='module-search'
            type='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Titre, F01…F15, mot-clé…'
            autoComplete='off'
            className='w-full rounded-lg border border-white/15 bg-navy-950/80 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/25'
          />
        </div>
        <div className='flex flex-wrap gap-2'>
          <span className='w-full text-xs font-semibold uppercase tracking-wide text-gray-500 md:w-auto md:self-center'>
            Domaine
          </span>
          <button
            type='button'
            onClick={() => setDomainFilter('ALL')}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-sm font-medium transition',
              domainFilter === 'ALL'
                ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-100'
                : 'border-white/10 bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]',
            )}
          >
            Tous
          </button>
          {(['DPS', 'DPG', 'PROCEDURE'] as const).map((d) => (
            <button
              key={d}
              type='button'
              onClick={() => setDomainFilter(d)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm font-medium transition',
                domainFilter === d
                  ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-100'
                  : 'border-white/10 bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]',
              )}
            >
              {DOMAIN_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 text-sm'>
        <span className='text-gray-500'>Aller à :</span>
        {(['DPS', 'DPG', 'PROCEDURE'] as const).map((d) => (
          <a
            key={d}
            href={`#cours-domain-${d}`}
            className='rounded-md text-cyan-400 underline-offset-2 hover:underline'
          >
            {DOMAIN_LABELS[d]}
          </a>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className='rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-6 text-center text-sm text-amber-100/90'>
          Aucun module ne correspond à votre recherche. Essayez un autre mot-clé ou élargissez le filtre domaine.
        </p>
      ) : null}

      {(['DPS', 'DPG', 'PROCEDURE'] as const).map((domain) => {
        const items = byDomain(domain);
        if (items.length === 0) return null;
        return (
          <section key={domain} id={`cours-domain-${domain}`} className='scroll-mt-28'>
            <h2 className='mb-6 font-display text-xl font-bold text-white'>{DOMAIN_LABELS[domain]}</h2>
            <ul className='grid gap-4 sm:grid-cols-2'>
              {items.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/cours/modules/${m.id}`}
                    className={cn(
                      'block rounded-xl border p-5 shadow-ex-card transition duration-200 hover:-translate-y-0.5 hover:border-examen-accent/35 hover:shadow-ex-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-examen-accent/50',
                      DOMAIN_STYLES[domain],
                    )}
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <span
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-black text-white shadow-md',
                          getModuleNumGradient(m.numero),
                        )}
                        aria-hidden
                      >
                        {String(m.numero).padStart(2, '0')}
                      </span>
                      {readIds.has(m.id) ? (
                        <span className='shrink-0 rounded-md border border-examen-success/35 bg-examen-success/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-examen-success'>
                          ✓ Lu
                        </span>
                      ) : (
                        <span className='shrink-0 rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-examen-inkMuted'>
                          Fiche synthèse
                        </span>
                      )}
                    </div>
                    <p className='mt-3 font-display text-lg font-semibold text-white'>{m.titre}</p>
                    <p className='mt-2 text-sm leading-relaxed text-gray-400'>{m.accroche}</p>
                    <p className='mt-3 text-sm font-medium text-examen-accent'>Ouvrir la fiche →</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
