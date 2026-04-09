'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { type DomainFilter, DomainTabs } from '@/components/ui/DomainTabs';
import type { CourseModuleSynthesis } from '@/data/course-module-syntheses';
import type { Domain } from '@/data/fascicules-types';
import { cn } from '@/utils/cn';
import { getModuleNumGradient } from '@/utils/module-gradients';

export type ProgrammeModuleItem = {
  id: string;
  numero: number;
  titre: string;
  accroche: string;
  domaine: 'DPS' | 'DPG' | 'Procédure pénale';
  domaineLabel: string;
  domain: Domain;
  synthesis: CourseModuleSynthesis | null;
};

const DOMAIN_CARD_BORDER: Record<Domain, string> = {
  DPS: 'border-l-red-500',
  DPG: 'border-l-violet-500',
  PROCEDURE: 'border-l-blue-500',
};

const DOMAIN_BADGE: Record<Domain, string> = {
  DPS: 'border-red-400/30 bg-red-500/10 text-red-200',
  DPG: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
  PROCEDURE: 'border-blue-400/30 bg-blue-500/10 text-blue-200',
};

function ModuleExpanded({ synth }: { synth: CourseModuleSynthesis }) {
  return (
    <div className='mt-4 space-y-4 border-t border-white/[0.07] pt-4'>
      {synth.axes.map((ax) => (
        <div key={ax.titre}>
          <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>{ax.titre}</p>
          <ul className='mt-2 space-y-1.5'>
            {ax.points.map((pt, i) => (
              <li key={i} className='flex gap-2 text-sm text-slate-400'>
                <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/60' aria-hidden />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {synth.pieges.length > 0 && (
        <div className='rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3'>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-amber-300'>Pièges à l&apos;examen ⚠️</p>
          <ul className='space-y-1'>
            {synth.pieges.map((p, i) => (
              <li key={i} className='flex gap-2 text-xs text-slate-400'>
                <span className='mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60' aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ProgrammeCard({ module }: { module: ProgrammeModuleItem }) {
  const [expanded, setExpanded] = useState(false);
  const badge = `F${String(module.numero).padStart(2, '0')}`;

  return (
    <article
      className={cn(
        'flex flex-col rounded-2xl border border-l-4 border-white/[0.08] bg-white/[0.02]',
        'overflow-hidden transition-all hover:border-white/[0.14]',
        DOMAIN_CARD_BORDER[module.domain],
      )}
    >
      {/* En-tête module */}
      <div className='flex items-start gap-3 p-4'>
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-black text-white shadow-md',
            getModuleNumGradient(module.numero),
          )}
          aria-hidden
        >
          {badge}
        </span>
        <div className='min-w-0 flex-1'>
          <span
            className={cn(
              'inline-block rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
              DOMAIN_BADGE[module.domain],
            )}
          >
            {module.domaineLabel}
          </span>
          <h3 className='mt-1 font-display text-sm font-semibold leading-snug text-white sm:text-base'>
            {module.titre}
          </h3>
          <p className='mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400'>{module.accroche}</p>
        </div>
      </div>

      {/* CTAs */}
      <div className='flex gap-1 border-t border-white/[0.06] p-3'>
        <Link
          href={`/cours/modules/${module.id}`}
          className='flex-1 rounded-lg bg-white/[0.04] px-3 py-1.5 text-center text-xs font-semibold text-gray-200 transition hover:bg-cyan-500/15 hover:text-cyan-100'
        >
          Fiche synthèse →
        </Link>
        <Link
          href={`/quiz?mode=module&f=${module.id}`}
          className='rounded-lg border border-cyan-500/25 px-3 py-1.5 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/10'
        >
          Quiz
        </Link>
        <Link
          href={`/flashcards?f=${module.id}`}
          className='rounded-lg border border-amber-500/25 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/10'
        >
          Flashcards
        </Link>
      </div>

      {/* Expand synthèse */}
      {module.synthesis && (
        <>
          <button
            type='button'
            onClick={() => setExpanded((e) => !e)}
            className='flex w-full items-center justify-between border-t border-white/[0.06] px-4 py-2.5 text-xs font-medium text-slate-500 transition hover:bg-white/[0.03] hover:text-slate-300'
            aria-expanded={expanded}
          >
            <span>{expanded ? 'Masquer axes & pièges' : 'Voir axes, pièges et attendus examen'}</span>
            {expanded ? <ChevronUp className='h-3.5 w-3.5' /> : <ChevronDown className='h-3.5 w-3.5' />}
          </button>
          {expanded && (
            <div className='px-4 pb-5'>
              <ModuleExpanded synth={module.synthesis} />
            </div>
          )}
        </>
      )}
    </article>
  );
}

const DOMAIN_LABELS: Record<Domain, string> = {
  DPS: 'Droit pénal spécial',
  DPG: 'Droit pénal général',
  PROCEDURE: 'Procédure pénale',
};

const DOMAIN_SECTION_BG: Record<Domain, string> = {
  DPS: 'from-red-500/[0.07]',
  DPG: 'from-violet-500/[0.07]',
  PROCEDURE: 'from-blue-500/[0.07]',
};

const DOMAIN_HEADER_COLOR: Record<Domain, string> = {
  DPS: 'text-red-200',
  DPG: 'text-violet-200',
  PROCEDURE: 'text-blue-200',
};

function domainCounts(modules: ProgrammeModuleItem[]): Partial<Record<DomainFilter, number>> {
  return {
    ALL: modules.length,
    DPS: modules.filter((m) => m.domain === 'DPS').length,
    DPG: modules.filter((m) => m.domain === 'DPG').length,
    PROCEDURE: modules.filter((m) => m.domain === 'PROCEDURE').length,
  };
}

type Props = { modules: ProgrammeModuleItem[] };

export function ProgrammeClient({ modules }: Props) {
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('ALL');
  const counts = useMemo(() => domainCounts(modules), [modules]);

  const filtered = useMemo(
    () => modules.filter((m) => domainFilter === 'ALL' || m.domain === domainFilter),
    [modules, domainFilter],
  );

  const domainGroups = useMemo(() => {
    const domains: Domain[] = ['DPS', 'DPG', 'PROCEDURE'];
    return domains
      .map((d) => ({ domain: d, items: filtered.filter((m) => m.domain === d) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const showAllGrouped = domainFilter === 'ALL';

  return (
    <div className='space-y-6'>
      {/* Barre de filtrage */}
      <div className='space-y-3 rounded-xl border border-white/10 bg-white/[0.025] p-4'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-sm font-semibold text-white'>
            {filtered.length} module{filtered.length > 1 ? 's' : ''}
          </span>
          <span className='hidden text-xs text-slate-500 sm:block'>
            Cliquez sur un module pour voir axes et pièges
          </span>
        </div>
        <DomainTabs value={domainFilter} onChange={setDomainFilter} counts={counts} />
      </div>

      {/* Vue groupée par domaine (ALL) */}
      {showAllGrouped &&
        domainGroups.map(({ domain, items }) => (
          <section key={domain} aria-labelledby={`prog-domain-${domain}`}>
            <div
              className={cn(
                'mb-4 flex items-center gap-3 rounded-xl bg-gradient-to-r to-transparent px-4 py-3',
                DOMAIN_SECTION_BG[domain],
              )}
            >
              <h2
                id={`prog-domain-${domain}`}
                className={cn('font-display text-lg font-bold', DOMAIN_HEADER_COLOR[domain])}
              >
                {DOMAIN_LABELS[domain]}
              </h2>
              <span className='rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs text-slate-400'>
                {items.length} module{items.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className='grid gap-4 md:grid-cols-2'>
              {items.map((m) => (
                <ProgrammeCard key={m.id} module={m} />
              ))}
            </div>
          </section>
        ))}

      {/* Vue filtrée (un seul domaine) */}
      {!showAllGrouped && (
        <div className='grid gap-4 md:grid-cols-2'>
          {filtered.map((m) => (
            <ProgrammeCard key={m.id} module={m} />
          ))}
        </div>
      )}
    </div>
  );
}
