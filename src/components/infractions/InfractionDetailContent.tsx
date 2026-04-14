import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { BookMarked, ExternalLink, Gavel, Layers, Scale, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { InfractionAudioCoach } from '@/components/infractions/InfractionAudioCoach';
import { RecapBulletCell } from '@/components/recapitulatif/RecapBulletCell';
import { Button } from '@/components/ui/button';
import { fasciculeToFamily, INFRACTION_FAMILY_OPTIONS } from '@/data/infractions-family-filter';
import {
  type InfractionCatalogItem,
  infractionToRecapFilter,
  PRIORITE_EXAMEN_BADGE,
  type RecapPriorite,
} from '@/data/recapitulatif-data';
import { cn } from '@/utils/cn';
import { derivePeineFromLegal, peineTierTextClass } from '@/utils/infraction-display-derive';

function legifranceSearchUrl(legalLine: string): string {
  const q = legalLine
    .replace(/C\.P\./g, 'code pénal')
    .replace(/C\.R\./g, 'code de la route')
    .replace(/C\.S\.P\./g, 'code de la santé publique')
    .trim();
  return `https://www.legifrance.gouv.fr/search/all?tab_selection=all&searchField=ALL&query=${encodeURIComponent(q)}`;
}

type Props = { item: InfractionCatalogItem; className?: string };

function familleBadgeLabel(item: InfractionCatalogItem): string {
  const fam = fasciculeToFamily(item.fascicule);
  return INFRACTION_FAMILY_OPTIONS.find((o) => o.id === fam)?.label ?? item.groupTitle;
}

function SectionShell({
  icon: Icon,
  title,
  subtitle,
  accent,
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  accent: 'emerald' | 'sky' | 'slate';
  children: ReactNode;
}) {
  const border =
    accent === 'emerald'
      ? 'border-emerald-500/35 bg-gradient-to-br from-emerald-950/50 to-emerald-950/20'
      : accent === 'sky'
        ? 'border-sky-500/35 bg-gradient-to-br from-sky-950/45 to-sky-950/15'
        : 'border-white/10 bg-white/[0.03]';
  const iconBg =
    accent === 'emerald'
      ? 'bg-emerald-500/15 text-emerald-200'
      : accent === 'sky'
        ? 'bg-sky-500/15 text-sky-200'
        : 'bg-white/10 text-slate-200';

  return (
    <div className={cn('rounded-2xl border p-4 sm:p-5', border)}>
      <div className='mb-3 flex items-start gap-3'>
        <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', iconBg)} aria-hidden>
          <Icon className='h-5 w-5' />
        </span>
        <div className='min-w-0'>
          <h3 className='text-xs font-bold uppercase tracking-[0.14em] text-slate-300'>{title}</h3>
          {subtitle ? <p className='mt-1 text-[11px] leading-snug text-slate-500'>{subtitle}</p> : null}
        </div>
      </div>
      <div className='pl-0 sm:pl-[52px]'>{children}</div>
    </div>
  );
}

/**
 * Corps de fiche express (réutilisable : modale bulle, drawer tableau).
 */
export function InfractionDetailContent({ item, className }: Props) {
  const pTier = (item.priorite ?? 'secours') as RecapPriorite;
  const badge = PRIORITE_EXAMEN_BADGE[pTier];
  const peine = derivePeineFromLegal(item.legal);

  return (
    <div className={cn('space-y-5', className)}>
      <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#141a24] via-[#0f1218] to-[#0a0c10] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6'>
        <div
          className='pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl'
          aria-hidden
        />
        <div className='relative flex flex-wrap items-center gap-2'>
          <span className='inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-100'>
            <Sparkles className='h-3.5 w-3.5' aria-hidden />
            Fiche express
          </span>
          <span
            className={cn(
              'rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
              badge.className,
            )}
          >
            {badge.label}
          </span>
          <span className='rounded-lg border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold text-slate-400'>
            {familleBadgeLabel(item)}
            {item.fasciculePart ? ` · ${item.fasciculePart}` : ''}
          </span>
        </div>

        <h2 className='font-display mt-4 text-xl font-bold leading-snug text-white sm:text-2xl'>
          <FlashcardRichText text={item.infraction} inline />
        </h2>

        <p className='mt-2 text-xs font-medium text-slate-500'>{item.groupTitle}</p>

        <div className='mt-4 flex flex-wrap items-center gap-2'>
          <span className='inline-flex items-center gap-2 rounded-xl border border-cyan-500/25 bg-cyan-950/30 px-3 py-2 font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-xs text-cyan-100'>
            <Scale className='h-3.5 w-3.5 shrink-0 text-cyan-400/80' aria-hidden />
            {item.legal}
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-xs font-semibold',
              peineTierTextClass(peine.tier),
            )}
          >
            <Gavel className='h-3.5 w-3.5 shrink-0 opacity-80' aria-hidden />
            {peine.label}
          </span>
        </div>
      </div>

      {(item.tentative || item.complicite) && (
        <div className='flex flex-wrap gap-2'>
          {item.tentative ? (
            <span className='rounded-xl border border-violet-500/35 bg-violet-500/12 px-3 py-1.5 text-xs font-semibold text-violet-100'>
              Tentative : {item.tentative}
            </span>
          ) : null}
          {item.complicite ? (
            <span className='rounded-xl border border-cyan-500/35 bg-cyan-500/12 px-3 py-1.5 text-xs font-semibold text-cyan-100'>
              Complicité : {item.complicite}
            </span>
          ) : null}
        </div>
      )}

      {item.elementsSource === 'fascicule_audit' ? (
        <details className='group rounded-xl border border-cyan-500/20 bg-cyan-950/20'>
          <summary className='cursor-pointer list-none px-3 py-2 text-[11px] font-medium text-cyan-200/90 [&::-webkit-details-marker]:hidden'>
            <span className='inline-flex items-center gap-2'>
              Source audit programme
              <span className='text-cyan-500/70 transition group-open:rotate-180'>▼</span>
            </span>
          </summary>
          <p className='border-t border-cyan-500/15 px-3 py-2 text-[11px] leading-relaxed text-cyan-100/85'>
            Éléments matériel / moral issus du référentiel d’audit interne (
            <code className='rounded bg-black/30 px-1 text-[10px]'>reference/audit/infractions_officielles.json</code>
            ). En cas d’écart, le support officiel SDCP et la base d’audit font foi.
          </p>
        </details>
      ) : null}

      <div className='grid gap-4 lg:grid-cols-2 lg:items-start'>
        <SectionShell
          icon={Layers}
          title='Élément matériel'
          subtitle='Faits constitutifs — structure ta réponse à l’oral ou à l’écrit.'
          accent='emerald'
        >
          <RecapBulletCell text={item.materiel} density='compact' />
        </SectionShell>

        <SectionShell
          icon={BookMarked}
          title='Élément moral'
          subtitle='Formulation complète attendue (programme officiel).'
          accent='sky'
        >
          <RecapBulletCell text={item.moral} density='compact' />
        </SectionShell>
      </div>

      <div className='overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-r from-slate-900/40 to-slate-950/40 p-4'>
        <InfractionAudioCoach legal={item.legal} materiel={item.materiel} moral={item.moral} />
      </div>

      {item.noteExamen ? (
        <div className='rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-amber-950/10 px-4 py-3'>
          <p className='text-[11px] font-semibold uppercase tracking-wide text-amber-200/90'>Repère examen</p>
          <p className='mt-1.5 text-sm leading-relaxed text-amber-50/95'>{item.noteExamen}</p>
        </div>
      ) : null}

      <div className='rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-slate-500'>
        <p className='font-semibold text-slate-400'>Contrôle qualité</p>
        <p className='mt-1.5'>
          Valider avec votre <strong className='text-slate-300'>support officiel de formation</strong> et{' '}
          <strong className='text-slate-300'>Légifrance</strong> (textes en vigueur).
        </p>
        <a
          href={legifranceSearchUrl(item.legal)}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-2 inline-flex items-center gap-2 font-medium text-cyan-400 hover:text-cyan-300'
        >
          Recherche Légifrance
          <ExternalLink className='h-3.5 w-3.5' aria-hidden />
        </a>
      </div>

      <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap'>
        {item.flashcardsCat ? (
          <Button
            asChild
            className='h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 font-semibold text-white shadow-lg shadow-amber-900/20 hover:opacity-95'
          >
            <Link href={`/flashcards?cat=${item.flashcardsCat}`}>Réviser en flashcards</Link>
          </Button>
        ) : null}
        <Button
          asChild
          variant='outline'
          className='h-11 rounded-xl border-emerald-500/40 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/20'
        >
          <Link href={`/entrainement/recapitulatif?f=${infractionToRecapFilter(item)}`}>Tableau récapitulatif</Link>
        </Button>
      </div>
    </div>
  );
}
