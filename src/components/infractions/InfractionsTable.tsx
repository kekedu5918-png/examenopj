'use client';

import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

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
        const th = a.groupTitle.localeCompare(b.groupTitle, 'fr');
        if (th !== 0) return th * dir;
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
    <div className='space-y-3'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='min-w-0 space-y-2'>
          <p className='text-xs font-semibold uppercase tracking-wide text-[#8888A0]'>Tri du tableau</p>
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
                  'rounded-lg border px-3 py-1.5 text-xs font-medium transition',
                  sortKey === k
                    ? 'border-[#4F6EF7]/55 bg-[#4F6EF7]/15 text-white'
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
          <p className='text-[11px] text-[#8888A0]'>
            Astuce : Ctrl+F pour chercher dans le tableau une fois affiché.
          </p>
        </div>
        <button
          type='button'
          onClick={exportCsv}
          className='rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.1]'
        >
          📥 Exporter en CSV
        </button>
      </div>

      <div className='relative'>
        <div
          className='pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-[#0a0a12] to-transparent md:hidden'
          aria-hidden
        />
        <div
          className='pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-[#0a0a12] to-transparent md:hidden'
          aria-hidden
        />
        <p className='mb-2 text-center text-[10px] text-[#8888A0] md:hidden'>← faites glisser →</p>
        <div className='overflow-x-auto rounded-xl border border-white/[0.08]'>
          <table role='grid' className='w-full min-w-[1000px] border-collapse text-left'>
            <thead>
              <tr className='border-b border-white/[0.08] bg-[#16161F]'>
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
              {sorted.map((item) => (
                <TableRow
                  key={item.id}
                  item={item}
                  onRowClick={() => setDrawerItem(item)}
                  onArrowListe={() => onOpenInListe(item.id)}
                />
              ))}
            </tbody>
          </table>
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
              className='fixed inset-y-0 right-0 z-[70] flex w-full max-w-[480px] flex-col border-l border-white/[0.08] bg-[#0d0d14] shadow-2xl'
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

function TableRow({
  item,
  onRowClick,
  onArrowListe,
}: {
  item: InfractionCatalogItem;
  onRowClick: () => void;
  onArrowListe: () => void;
}) {
  const peine = derivePeineFromLegal(item.legal);
  const pTier = (item.priorite ?? 'secours') as RecapPriorite;
  const pBadge = PRIORITE_EXAMEN_BADGE[pTier];
  return (
    <tr
      className='cursor-pointer border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]'
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
      <td className='min-w-[260px] max-w-[380px] px-3 py-3 align-top'>
        <RecapBulletCell text={item.moral} compact />
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
