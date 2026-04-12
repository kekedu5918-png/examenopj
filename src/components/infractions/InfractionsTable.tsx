'use client';

import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronRight, List, X } from 'lucide-react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { InfractionDetailContent } from '@/components/infractions/InfractionDetailContent';
import { RecapBulletCell } from '@/components/recapitulatif/RecapBulletCell';
import {
  type InfractionCatalogItem,
  PRIORITE_EXAMEN_BADGE,
  PRIORITE_ORDER,
  type RecapPriorite,
} from '@/data/recapitulatif-data';
import { cn } from '@/utils/cn';
import { condenseMaterielKeys, derivePeineFromLegal, peineTierTextClass, stripMdBold } from '@/utils/infraction-display-derive';

type SortKey = 'examen' | 'nom' | 'article' | 'peine';
type SortDir = 'asc' | 'desc';

function peineSortValue(legal: string): number {
  const { label, tier } = derivePeineFromLegal(legal);
  if (tier === 'crime') return 1000;
  if (tier === 'contravention') return -1;
  const m = label.match(/(\d+)\s*ans/);
  return m ? parseInt(m[1]!, 10) : 0;
}

type Props = {
  rows: InfractionCatalogItem[];
  onOpenInListe: (id: string) => void;
};

export function InfractionsTable({ rows, onOpenInListe }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('examen');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [drawerItem, setDrawerItem] = useState<InfractionCatalogItem | null>(null);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(k);
      setSortDir('asc');
    }
  };

  const sorted = useMemo(() => {
    const list = [...rows];
    const dir = sortDir === 'asc' ? 1 : -1;
    list.sort((a, b) => {
      if (sortKey === 'examen') {
        const pa = PRIORITE_ORDER[(a.priorite ?? 'secours') as RecapPriorite];
        const pb = PRIORITE_ORDER[(b.priorite ?? 'secours') as RecapPriorite];
        if (pa !== pb) return (pa - pb) * dir;
        const fasc = a.fascicule.localeCompare(b.fascicule, 'fr');
        if (fasc !== 0) return fasc * dir;
        return stripMdBold(a.infraction).localeCompare(stripMdBold(b.infraction), 'fr') * dir;
      }
      if (sortKey === 'nom') {
        const cmp = stripMdBold(a.infraction).localeCompare(stripMdBold(b.infraction), 'fr');
        return cmp * dir;
      }
      if (sortKey === 'article') {
        return a.legal.localeCompare(b.legal, 'fr') * dir;
      }
      return (peineSortValue(a.legal) - peineSortValue(b.legal)) * dir;
    });
    return list;
  }, [rows, sortDir, sortKey]);

  const exportCsv = useCallback(() => {
    const header = [
      'INFRACTION',
      'FASCICULE',
      'THEME',
      'ARTICLE',
      'ELEMENT_MATERIEL_CONDENSE',
      'ELEMENT_MORAL_TEXTE',
      'PEINE',
    ];
    const lines = sorted.map((r) => {
      const peine = derivePeineFromLegal(r.legal);
      const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
      return [
        esc(stripMdBold(r.infraction)),
        r.fascicule,
        esc(r.groupTitle),
        esc(r.legal),
        esc(condenseMaterielKeys(r.materiel)),
        esc(stripMdBold(r.moral)),
        esc(peine.label),
      ].join(';');
    });
    const bom = '\ufeff';
    const blob = new Blob([bom + header.join(';') + '\n' + lines.join('\n')], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `infractions-opj-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [sorted]);

  const SortInd = ({ k }: { k: SortKey }) =>
    sortKey === k ? (
      <span className='ml-1 text-[10px]' aria-hidden>
        {sortDir === 'asc' ? '↑' : '↓'}
      </span>
    ) : (
      <span className='ml-1 text-[10px] opacity-40' aria-hidden>
        ↕
      </span>
    );

  return (
    <div className='space-y-5'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='min-w-0 space-y-2'>
          <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[#8888A0]'>Tri du référentiel</p>
          <div className='flex flex-wrap gap-2'>
            {(
              [
                ['examen', 'Probabilité examen', '↑ prioritaire d’abord'] as const,
                ['nom', 'Nom', 'A → Z'] as const,
                ['article', 'Article', ''] as const,
                ['peine', 'Peine', ''] as const,
              ] as const
            ).map(([k, label, hint]) => (
              <button
                key={k}
                type='button'
                onClick={() => toggleSort(k)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                  sortKey === k
                    ? 'border-[#4F6EF7]/55 bg-[#4F6EF7]/15 text-white shadow-[0_0_20px_-8px_rgba(79,110,247,0.6)]'
                    : 'border-white/10 bg-white/[0.04] text-gray-400 hover:border-white/20',
                )}
              >
                {label}
                {sortKey === k ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                {hint && sortKey === k && k === 'examen' ? (
                  <span className='ml-1 text-[10px] opacity-80'>({hint})</span>
                ) : null}
              </button>
            ))}
          </div>
          <p className='hidden text-[11px] text-[#8888A0] md:block'>
            Astuce : Ctrl+F pour chercher dans le tableau une fois affiché.
          </p>
        </div>
        <button
          type='button'
          onClick={exportCsv}
          className='inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.1]'
        >
          Exporter CSV
        </button>
      </div>

      {/* Vue cartes — mobile : tout visible sans défilement horizontal */}
      <div className='space-y-3 md:hidden'>
        {sorted.map((item) => (
          <InfractionMobileCard
            key={item.id}
            item={item}
            onOpen={() => setDrawerItem(item)}
            onListe={() => onOpenInListe(item.id)}
          />
        ))}
      </div>

      <div className='relative hidden md:block'>
        <div className='overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0c0c14]/80 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04]'>
          <div className='overflow-x-auto'>
            <table role='grid' className='w-full min-w-[1000px] border-collapse text-left'>
            <thead>
              <tr className='border-b border-white/[0.08] bg-gradient-to-b from-[#1a1a26] to-[#12121a]'>
                <th scope='col' className='w-[118px] min-w-[118px] px-2 py-3 text-xs font-semibold uppercase tracking-wider text-[#8888A0]'>
                  <button
                    type='button'
                    onClick={() => toggleSort('examen')}
                    className='inline-flex flex-col items-start rounded text-left focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#4F6EF7]/60'
                  >
                    <span className='inline-flex items-center'>
                      Examin.
                      <SortInd k='examen' />
                    </span>
                    <span className='mt-1 text-[9px] font-normal normal-case tracking-normal text-[#8888A0]/85'>
                      + → − probable
                    </span>
                  </button>
                </th>
                <th scope='col' className='min-w-[200px] px-3 py-3 text-xs font-semibold uppercase tracking-wider text-[#8888A0]'>
                  <button
                    type='button'
                    onClick={() => toggleSort('nom')}
                    className='inline-flex items-center rounded focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#4F6EF7]/60'
                  >
                    Infraction
                    <SortInd k='nom' />
                  </button>
                </th>
                <th scope='col' className='w-[160px] px-3 py-3 text-xs font-semibold uppercase tracking-wider text-[#8888A0]'>
                  <button
                    type='button'
                    onClick={() => toggleSort('article')}
                    className='inline-flex items-center rounded focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#4F6EF7]/60'
                  >
                    Article
                    <SortInd k='article' />
                  </button>
                </th>
                <th
                  scope='col'
                  className='w-[220px] px-3 py-3 text-xs font-semibold uppercase tracking-wider text-[#8888A0]'
                >
                  Élément matériel
                </th>
                <th
                  scope='col'
                  className='min-w-[260px] max-w-[380px] px-3 py-3 text-xs font-semibold uppercase tracking-wider text-[#8888A0]'
                >
                  <span className='block'>Élément moral</span>
                  <span className='mt-1 block font-normal normal-case tracking-normal text-[10px] text-[#8888A0]/90'>
                    Formulation à réciter (programme)
                  </span>
                </th>
                <th scope='col' className='w-[140px] px-3 py-3 text-xs font-semibold uppercase tracking-wider text-[#8888A0]'>
                  <button
                    type='button'
                    onClick={() => toggleSort('peine')}
                    className='inline-flex items-center rounded focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#4F6EF7]/60'
                  >
                    Peine princ.
                    <SortInd k='peine' />
                  </button>
                </th>
                <th scope='col' className='w-[48px] px-2 py-3 text-xs font-semibold uppercase tracking-wider text-[#8888A0]'>
                  <span className='sr-only'>Ouvrir</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item, ri) => (
                <TableRow
                  key={item.id}
                  rowIndex={ri}
                  item={item}
                  onRowClick={() => setDrawerItem(item)}
                  onArrowListe={() => onOpenInListe(item.id)}
                />
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerItem ? (
          <>
            <motion.button
              type='button'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-[60] bg-black'
              aria-label='Fermer'
              onClick={() => setDrawerItem(null)}
            />
            <motion.aside
              role='dialog'
              aria-modal='true'
              aria-labelledby='infraction-drawer-title'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className='fixed inset-y-0 right-0 z-[70] flex w-full max-w-[min(100vw,560px)] flex-col border-l border-white/[0.08] bg-gradient-to-b from-[#0c0e14] to-[#08090d] shadow-2xl'
            >
              <div className='flex items-center justify-between border-b border-white/[0.08] px-4 py-3'>
                <h2 id='infraction-drawer-title' className='sr-only'>
                  Détail de l’infraction
                </h2>
                <button
                  type='button'
                  onClick={() => setDrawerItem(null)}
                  className='ml-auto rounded-lg p-2 text-gray-400 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#4F6EF7]/50'
                  aria-label='Fermer le panneau'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>
              <div className='flex-1 overflow-y-auto px-4 py-4'>
                {drawerItem ? <InfractionDetailContent item={drawerItem} /> : null}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function InfractionMobileCard({
  item,
  onOpen,
  onListe,
}: {
  item: InfractionCatalogItem;
  onOpen: () => void;
  onListe: () => void;
}) {
  const peine = derivePeineFromLegal(item.legal);
  const pTier = (item.priorite ?? 'secours') as RecapPriorite;
  const pBadge = PRIORITE_EXAMEN_BADGE[pTier];
  return (
    <article className='group rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#12121c] via-[#0e0e16] to-[#0a0a10] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.04] transition hover:border-[#4F6EF7]/35 hover:shadow-[0_20px_50px_-18px_rgba(79,110,247,0.2)]'>
      <button
        type='button'
        onClick={onOpen}
        className='w-full rounded-2xl p-4 text-left transition hover:bg-white/[0.02]'
      >
        <div className='flex items-start justify-between gap-3'>
          <span
            className={cn(
              'shrink-0 rounded-lg border px-2 py-1 text-[9px] font-bold uppercase tracking-wide',
              pBadge.className,
            )}
          >
            {pBadge.label}
          </span>
          <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-[#8888A0]'>
            {item.fascicule}
          </span>
        </div>
        <p className='mt-3 font-display text-base font-bold leading-snug text-white'>
          <FlashcardRichText text={item.infraction} inline />
        </p>
        <p className='mt-2 font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-xs text-[#4F6EF7]/95'>
          {item.legal}
        </p>
        <div className='mt-3 grid grid-cols-2 gap-2 text-left'>
          <div className='rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-2'>
            <p className='text-[9px] font-bold uppercase tracking-wide text-[#8888A0]'>Matériel</p>
            <p className='mt-1 line-clamp-3 text-[11px] leading-snug text-[#E8E8EF]'>{condenseMaterielKeys(item.materiel)}</p>
          </div>
          <div className='rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-2'>
            <p className='text-[9px] font-bold uppercase tracking-wide text-[#8888A0]'>Peine</p>
            <p
              className={cn(
                'mt-1 font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-[11px] font-semibold',
                peineTierTextClass(peine.tier),
              )}
            >
              {peine.label}
            </p>
          </div>
        </div>
        <div className='mt-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] px-2.5 py-2'>
          <p className='text-[9px] font-bold uppercase tracking-wide text-emerald-300/90'>Élément moral</p>
          <div className='mt-1 max-h-[4.5rem] overflow-hidden'>
            <RecapBulletCell text={item.moral} compact density='micro' />
          </div>
        </div>
      </button>
      <div className='border-t border-white/[0.06] px-3 pb-3'>
        <button
          type='button'
          onClick={onListe}
          className='flex w-full items-center justify-center gap-2 rounded-xl border border-[#4F6EF7]/25 bg-[#4F6EF7]/10 py-2.5 text-xs font-semibold text-[#4F6EF7] transition hover:bg-[#4F6EF7]/18'
        >
          <List className='h-3.5 w-3.5' aria-hidden />
          Voir dans la liste
          <ChevronRight className='h-3.5 w-3.5' aria-hidden />
        </button>
      </div>
    </article>
  );
}

function TableRow({
  item,
  rowIndex,
  onRowClick,
  onArrowListe,
}: {
  item: InfractionCatalogItem;
  rowIndex: number;
  onRowClick: () => void;
  onArrowListe: () => void;
}) {
  const peine = derivePeineFromLegal(item.legal);
  const pTier = (item.priorite ?? 'secours') as RecapPriorite;
  const pBadge = PRIORITE_EXAMEN_BADGE[pTier];
  return (
    <tr
      className={cn(
        'cursor-pointer border-b border-white/[0.04] transition-colors',
        rowIndex % 2 === 0 ? 'bg-white/[0.015]' : 'bg-transparent',
        'hover:bg-[#4F6EF7]/[0.06]',
      )}
      onClick={onRowClick}
    >
      <td className='w-[118px] min-w-[118px] px-2 py-3 align-top'>
        <span
          className={cn(
            'inline-flex max-w-[7.5rem] rounded-md border px-1.5 py-0.5 text-[9px] font-bold uppercase leading-tight tracking-wide',
            pBadge.className,
          )}
        >
          {pBadge.label}
        </span>
      </td>
      <td className='min-w-[200px] px-3 py-3 align-top'>
        <p className='font-medium text-white'>
          <FlashcardRichText text={item.infraction} inline />
        </p>
        <div className='mt-2 flex flex-wrap gap-1.5'>
          <span className='rounded-md border border-rose-500/35 bg-rose-500/10 px-2 py-0.5 text-[9px] font-bold uppercase text-rose-200'>
            Épreuve 1 — Qualif.
          </span>
          <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-[#8888A0]'>
            {item.fascicule}
          </span>
          <span className='max-w-full truncate rounded-md border border-[#4F6EF7]/30 bg-[#4F6EF7]/10 px-2 py-0.5 text-[10px] font-semibold text-[#4F6EF7]'>
            {item.groupTitle}
          </span>
        </div>
      </td>
      <td className='w-[160px] px-3 py-3 align-top font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-sm text-[#4F6EF7]'>
        {item.legal}
      </td>
      <td className='w-[220px] px-3 py-3 align-top text-sm leading-snug text-[#F0F0F5]'>
        <span className='line-clamp-2'>{condenseMaterielKeys(item.materiel)}</span>
      </td>
      <td className='min-w-[240px] max-w-[400px] px-3 py-3 align-top'>
        <RecapBulletCell text={item.moral} compact density='compact' />
      </td>
      <td
        className={cn(
          'w-[140px] px-3 py-3 align-top font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-sm',
          peineTierTextClass(peine.tier),
        )}
      >
        {peine.label}
      </td>
      <td className='w-[48px] px-2 py-3 align-middle text-center'>
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onArrowListe();
          }}
          className='inline-flex rounded-lg p-2 text-[#4F6EF7] hover:bg-[#4F6EF7]/15 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#4F6EF7]/50'
          aria-label='Voir dans la liste détaillée'
        >
          <ArrowRight className='h-5 w-5' />
        </button>
      </td>
    </tr>
  );
}
