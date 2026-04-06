'use client';

import { Fragment, useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronRight, X } from 'lucide-react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { InfractionDetailContent } from '@/components/infractions/InfractionDetailContent';
import { fasciculesList } from '@/data/fascicules-list';
import type { InfractionCatalogItem, RecapFasciculeId } from '@/data/recapitulatif-data';
import { cn } from '@/utils/cn';
import {
  classifyMoral,
  condenseMaterielKeys,
  derivePeineFromLegal,
  type MoralKind,
  moralKindBadgeClass,
  moralKindLabel,
  peineTierTextClass,
  stripMdBold,
} from '@/utils/infraction-display-derive';

type SortKey = 'nom' | 'article' | 'peine';
type SortDir = 'asc' | 'desc';

function fasciculeHeaderTitle(code: RecapFasciculeId, count: number): string {
  const num = parseInt(code.replace('F', ''), 10);
  const meta = fasciculesList.find((f) => f.numero === num);
  const title = meta?.titre ?? code;
  return `${code} — ${title} (${count} infraction${count > 1 ? 's' : ''})`;
}

function peineSortValue(legal: string): number {
  const { label, tier } = derivePeineFromLegal(legal);
  if (tier === 'crime') return 1000;
  if (tier === 'contravention') return -1;
  const m = label.match(/(\d+)\s*ans/);
  return m ? parseInt(m[1]!, 10) : 0;
}

type Grouped = { fascicule: RecapFasciculeId; items: InfractionCatalogItem[] };

type Props = {
  rows: InfractionCatalogItem[];
  onOpenInListe: (id: string) => void;
};

export function InfractionsTable({ rows, onOpenInListe }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('nom');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
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

  const grouped = useMemo(() => {
    const map = new Map<RecapFasciculeId, InfractionCatalogItem[]>();
    for (const item of sorted) {
      const arr = map.get(item.fascicule) ?? [];
      arr.push(item);
      map.set(item.fascicule, arr);
    }
    const order: RecapFasciculeId[] = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07'];
    const out: Grouped[] = [];
    for (const f of order) {
      const items = map.get(f);
      if (items?.length) out.push({ fascicule: f, items });
    }
    return out;
  }, [sorted]);

  const toggleGroup = (f: string) => {
    setCollapsed((c) => ({ ...c, [f]: !c[f] }));
  };

  const exportCsv = useCallback(() => {
    const header = [
      'INFRACTION',
      'FASCICULE',
      'THEME',
      'ARTICLE',
      'ELEMENT_MATERIEL_CONDENSE',
      'ELEMENT_MORAL_TYPE',
      'PEINE',
    ];
    const lines = rows.map((r) => {
      const mk = moralKindLabel(classifyMoral(r.moral));
      const peine = derivePeineFromLegal(r.legal);
      const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
      return [
        esc(stripMdBold(r.infraction)),
        r.fascicule,
        esc(r.groupTitle),
        esc(r.legal),
        esc(condenseMaterielKeys(r.materiel)),
        mk,
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
  }, [rows]);

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
        <p className='text-xs text-[#8888A0]'>
          Astuce : utilisez Ctrl+F pour rechercher dans la page une fois le tableau affiché.
        </p>
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
          <table role='grid' className='w-full min-w-[900px] border-collapse text-left'>
            <thead>
              <tr className='border-b border-white/[0.08] bg-[#16161F]'>
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
                  className='w-[140px] px-3 py-3 text-xs font-semibold uppercase tracking-wider text-[#8888A0]'
                >
                  Élément moral
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
              {grouped.map(({ fascicule, items }) => {
                const isOpen = !collapsed[fascicule];
                return (
                  <Fragment key={fascicule}>
                    <tr className='bg-[#4F6EF7]/10'>
                      <td colSpan={6} className='border-l-4 border-[#4F6EF7] px-0 py-0'>
                        <button
                          type='button'
                          onClick={() => toggleGroup(fascicule)}
                          className='flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-semibold text-white'
                          aria-expanded={isOpen}
                        >
                          {isOpen ? (
                            <ChevronDown className='h-4 w-4 shrink-0' aria-hidden />
                          ) : (
                            <ChevronRight className='h-4 w-4 shrink-0' aria-hidden />
                          )}
                          {fasciculeHeaderTitle(fascicule, items.length)}
                        </button>
                      </td>
                    </tr>
                    {isOpen
                      ? items.map((item) => (
                          <TableRow
                            key={item.id}
                            item={item}
                            onRowClick={() => setDrawerItem(item)}
                            onArrowListe={() => onOpenInListe(item.id)}
                          />
                        ))
                      : null}
                  </Fragment>
                );
              })}
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
  const moralK = classifyMoral(item.moral);
  const peine = derivePeineFromLegal(item.legal);
  return (
    <tr
      className='cursor-pointer border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]'
      onClick={onRowClick}
    >
      <td className='min-w-[200px] px-3 py-3 align-top'>
        <p className='font-medium text-white'>
          <FlashcardRichText text={item.infraction} inline />
        </p>
        <div className='mt-2 flex flex-wrap gap-1.5'>
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
      <td className='w-[140px] px-3 py-3 align-top'>
        <MoralBadge kind={moralK} />
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

function MoralBadge({ kind }: { kind: MoralKind }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold',
        moralKindBadgeClass(kind),
      )}
    >
      {moralKindLabel(kind)}
    </span>
  );
}
