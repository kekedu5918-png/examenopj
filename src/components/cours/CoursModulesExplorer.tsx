'use client';

import { useMemo, useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';

import { ModuleCard } from '@/components/cours/ModuleCard';
import { type DomainFilter, DomainTabs } from '@/components/ui/DomainTabs';
import { compareModulesForCandidate } from '@/data/cours-candidate-order';
import { type ExamNumber, getFasciculeExamProfile } from '@/data/exam-competency-map';
import { DOMAIN_LABELS } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';
import { useReadModuleIds } from '@/hooks/use-read-module-ids';
import { cn } from '@/utils/cn';

export type CoursModuleExplorerItem = {
  id: string;
  numero: number;
  titre: string;
  accroche: string;
  domain: Domain;
};

function stripDiacritics(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

type ListView = 'priority' | 'programme';
type DisplayMode = 'grid' | 'list';

type Props = {
  modules: CoursModuleExplorerItem[];
  defaultView?: ListView;
};

function EpreuveChips({ epreuves }: { epreuves: readonly ExamNumber[] }) {
  const sorted = [...epreuves].sort((a, b) => a - b);
  return (
    <span className='flex flex-wrap gap-1'>
      {sorted.map((n) => (
        <span
          key={n}
          className='rounded border border-cyan-500/35 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-bold text-cyan-100'
        >
          Épr. {n}
        </span>
      ))}
    </span>
  );
}

export function CoursModulesExplorer({ modules, defaultView = 'programme' }: Props) {
  const readIds = useReadModuleIds();
  const [listView, setListView] = useState<ListView>(defaultView);
  const [query, setQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('ALL');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');

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

  const filteredPrioritySorted = useMemo(
    () => [...filtered].sort(compareModulesForCandidate),
    [filtered],
  );

  const priorityPartition = useMemo(() => {
    const p0 = filteredPrioritySorted.filter((m) => getFasciculeExamProfile(m.id).priority === 'P0');
    const p1 = filteredPrioritySorted.filter((m) => getFasciculeExamProfile(m.id).priority === 'P1');
    return { p0, p1 };
  }, [filteredPrioritySorted]);

  const byDomain = (d: Domain) => filtered.filter((m) => m.domain === d);

  const domainCounts: Partial<Record<DomainFilter, number>> = useMemo(() => ({
    ALL: modules.length,
    DPS: modules.filter((m) => m.domain === 'DPS').length,
    DPG: modules.filter((m) => m.domain === 'DPG').length,
    PROCEDURE: modules.filter((m) => m.domain === 'PROCEDURE').length,
  }), [modules]);

  const gridClass = displayMode === 'grid'
    ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
    : 'flex flex-col gap-3';

  return (
    <div className='space-y-6'>
      {/* Barre de contrôle */}
      <div className='space-y-3 rounded-xl border border-white/10 bg-white/[0.025] p-4'>
        {/* Vue + Mode d'affichage */}
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div className='flex flex-wrap gap-2'>
            <button
              type='button'
              onClick={() => setListView('priority')}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm font-medium transition',
                listView === 'priority'
                  ? 'border-amber-500/50 bg-amber-500/15 text-amber-100'
                  : 'border-white/10 bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]',
              )}
            >
              ⭐ Priorité examen OPJ
            </button>
            <button
              type='button'
              onClick={() => setListView('programme')}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm font-medium transition',
                listView === 'programme'
                  ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-100'
                  : 'border-white/10 bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]',
              )}
            >
              📋 Programme officiel
            </button>
          </div>
          <div className='flex gap-1 rounded-lg border border-white/10 p-1'>
            <button
              type='button'
              onClick={() => setDisplayMode('grid')}
              className={cn(
                'rounded p-1.5 transition',
                displayMode === 'grid' ? 'bg-white/15 text-white' : 'text-gray-500 hover:text-gray-300',
              )}
              aria-label='Vue grille'
            >
              <LayoutGrid className='h-4 w-4' />
            </button>
            <button
              type='button'
              onClick={() => setDisplayMode('list')}
              className={cn(
                'rounded p-1.5 transition',
                displayMode === 'list' ? 'bg-white/15 text-white' : 'text-gray-500 hover:text-gray-300',
              )}
              aria-label='Vue liste'
            >
              <List className='h-4 w-4' />
            </button>
          </div>
        </div>

        {/* Recherche */}
        <input
          type='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Rechercher un thème, F01…F15, mot-clé…'
          autoComplete='off'
          className='w-full rounded-lg border border-white/15 bg-navy-950/80 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/25'
        />

        {/* Tabs domaine */}
        <DomainTabs value={domainFilter} onChange={setDomainFilter} counts={domainCounts} />
      </div>

      {/* Aucun résultat */}
      {filtered.length === 0 && (
        <p className='rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-6 text-center text-sm text-amber-100/90'>
          Aucun module ne correspond. Essayez un autre mot-clé ou élargissez le filtre.
        </p>
      )}

      {/* Vue Programme officiel — par domaine */}
      {listView === 'programme' &&
        (['DPS', 'DPG', 'PROCEDURE'] as const).map((domain) => {
          const items = byDomain(domain);
          if (items.length === 0) return null;
          return (
            <section key={domain} id={`cours-domain-${domain}`} className='scroll-mt-28'>
              <div className='mb-4 flex items-center gap-3'>
                <h2 className='font-display text-lg font-bold text-white'>{DOMAIN_LABELS[domain]}</h2>
                <span className='rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs font-semibold text-gray-400'>
                  {items.length} module{items.length > 1 ? 's' : ''}
                </span>
              </div>
              <ul className={gridClass}>
                {items.map((m) => (
                  <li key={m.id}>
                    <ModuleCard
                      id={m.id}
                      numero={m.numero}
                      titre={m.titre}
                      accroche={m.accroche}
                      domain={m.domain}
                      isRead={readIds.has(m.id)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

      {/* Vue Priorité OPJ — P0 puis P1 */}
      {listView === 'priority' &&
        (['p0', 'p1'] as const).map((tier) => {
          const items = tier === 'p0' ? priorityPartition.p0 : priorityPartition.p1;
          if (items.length === 0) return null;
          const id = tier === 'p0' ? 'cours-priorite-p0' : 'cours-priorite-p1';
          const title =
            tier === 'p0'
              ? '⭐ À traiter en priorité (P0 — décisifs à l'examen)'
              : '📌 À solidifier ensuite (P1)';
          const desc =
            tier === 'p0'
              ? 'Thèmes où le jury attend une maîtrise nette à l'écrit et à l'oral.'
              : 'À aborder une fois le socle P0 solide, ou selon vos lacunes.';
          return (
            <section key={tier} id={id} className='scroll-mt-28'>
              <div className='mb-2 flex items-center gap-3'>
                <h2 className='font-display text-lg font-bold text-white'>{title}</h2>
                <span className='rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs font-semibold text-gray-400'>
                  {items.length}
                </span>
              </div>
              <p className='mb-5 text-sm text-gray-500'>{desc}</p>
              <ul className={gridClass}>
                {items.map((m) => {
                  const prof = getFasciculeExamProfile(m.id);
                  return (
                    <li key={m.id}>
                      <div className='flex flex-col'>
                        <ModuleCard
                          id={m.id}
                          numero={m.numero}
                          titre={m.titre}
                          accroche={m.accroche}
                          domain={m.domain}
                          isRead={readIds.has(m.id)}
                          showDomain
                        />
                        {prof.primaryEpreuves.length > 0 && (
                          <div className='mt-1 flex items-center gap-1 px-1'>
                            <EpreuveChips epreuves={prof.primaryEpreuves} />
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
    </div>
  );
}
