import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { Button } from '@/components/ui/button';
import { type InfractionCatalogItem, infractionToRecapFilter } from '@/data/recapitulatif-data';
import { cn } from '@/utils/cn';

function legifranceSearchUrl(legalLine: string): string {
  const q = legalLine
    .replace(/C\.P\./g, 'code pénal')
    .replace(/C\.R\./g, 'code de la route')
    .replace(/C\.S\.P\./g, 'code de la santé publique')
    .trim();
  return `https://www.legifrance.gouv.fr/search/all?tab_selection=all&searchField=ALL&query=${encodeURIComponent(q)}`;
}

type Props = { item: InfractionCatalogItem; className?: string };

/**
 * Fiche minimale : élément légal (référence), matériel et moral essentiels, lien Légifrance.
 */
export function InfractionDetailContent({ item, className }: Props) {
  return (
    <div className={cn('space-y-5', className)}>
      <div>
        <h2 className='font-display text-xl font-bold leading-snug text-white sm:text-2xl'>
          <FlashcardRichText text={item.infraction} inline />
        </h2>
        <p className='mt-1 text-xs text-slate-500'>{item.groupTitle}</p>
      </div>

      <div className='rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.06] p-4'>
        <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-cyan-200'>Élément légal</h3>
        <p className='whitespace-pre-wrap text-sm font-medium leading-relaxed text-cyan-50/95'>{item.legal}</p>
      </div>

      <div className='rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4'>
        <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-emerald-300'>Élément matériel</h3>
        <p className='whitespace-pre-wrap text-sm leading-relaxed text-emerald-50/95'>{item.materiel}</p>
      </div>

      <div className='rounded-2xl border border-sky-500/20 bg-sky-500/[0.06] p-4'>
        <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-sky-300'>Élément moral</h3>
        <p className='whitespace-pre-wrap text-sm leading-relaxed text-sky-50/95'>{item.moral}</p>
      </div>

      <a
        href={legifranceSearchUrl(item.legal)}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:underline'
      >
        Vérifier le texte sur Légifrance
        <ExternalLink className='h-4 w-4' aria-hidden />
      </a>

      <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap'>
        {item.flashcardsCat ? (
          <Button
            asChild
            className='rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 font-semibold text-white hover:opacity-95'
          >
            <Link href={`/flashcards?cat=${item.flashcardsCat}`}>Réviser en flashcards</Link>
          </Button>
        ) : null}
        <Button
          asChild
          variant='outline'
          className='rounded-xl border-emerald-500/40 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/20'
        >
          <Link href={`/entrainement/recapitulatif?f=${infractionToRecapFilter(item)}`}>Tableau récapitulatif</Link>
        </Button>
      </div>
    </div>
  );
}
