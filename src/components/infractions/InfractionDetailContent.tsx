import Link from 'next/link';
import { ExternalLink, Sparkles } from 'lucide-react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { InfractionAudioCoach } from '@/components/infractions/InfractionAudioCoach';
import { RecapBulletCell } from '@/components/recapitulatif/RecapBulletCell';
import { Button } from '@/components/ui/button';
import {
  type InfractionCatalogItem,
  infractionToRecapFilter,
  PRIORITE_EXAMEN_BADGE,
  type RecapPriorite,
} from '@/data/recapitulatif-data';
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
 * Corps de fiche express (réutilisable : modale bulle, drawer tableau).
 */
export function InfractionDetailContent({ item, className }: Props) {
  const pTier = (item.priorite ?? 'secours') as RecapPriorite;
  const badge = PRIORITE_EXAMEN_BADGE[pTier];

  return (
    <div className={cn('space-y-5', className)}>
      <div className='flex flex-wrap items-center gap-2 border-b border-white/10 pb-4'>
        <span className='inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-200'>
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
      </div>

      <div>
        <h2 className='font-display text-xl font-bold leading-snug text-white sm:text-2xl'>
          <FlashcardRichText text={item.infraction} inline />
        </h2>
        <p className='mt-2 text-sm text-slate-400'>
          <span className='text-slate-500'>Réf. : </span>
          {item.fascicule}
          {item.fasciculePart ? ` · ${item.fasciculePart}` : ''} · {item.groupTitle}
        </p>
        {item.accrocheFascicule ? (
          <div className='mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-slate-200'>
            <p className='text-xs font-bold uppercase tracking-wide text-amber-200/90'>Accroche (fascicule)</p>
            <p className='mt-2 whitespace-pre-wrap'>{item.accrocheFascicule}</p>
          </div>
        ) : null}
        <p className='mt-2 text-sm font-medium text-cyan-200/90'>Élément légal — {item.legal}</p>
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

      <div className='rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4'>
        <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-emerald-300'>Élément matériel</h3>
        <RecapBulletCell text={item.materiel} />
      </div>
      <div className='rounded-2xl border border-sky-500/20 bg-sky-500/[0.06] p-4'>
        <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-sky-300'>Élément moral</h3>
        <p className='mb-3 text-[11px] leading-relaxed text-sky-200/80'>
          Libellé à maîtriser comme dans le programme — l’examen attend la formulation complète, pas un simple qualificatif
          « intentionnel » ou « non intentionnel ».
        </p>
        <RecapBulletCell text={item.moral} />
      </div>

      {item.circonstancesAggravantesComplet ? (
        <div className='rounded-2xl border border-amber-500/25 bg-amber-500/[0.08] p-4'>
          <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-amber-200'>
            Circonstances aggravantes
            {item.circonstancesAucune ? ' — AUCUNE' : ''}
          </h3>
          <pre className='whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-amber-50/95'>
            {item.circonstancesAggravantesComplet}
          </pre>
        </div>
      ) : null}

      {item.repressionTableau && item.repressionTableau.length > 0 ? (
        <div className='rounded-2xl border border-violet-500/25 bg-violet-500/[0.08] p-4'>
          <h3 className='mb-3 text-xs font-bold uppercase tracking-wide text-violet-200'>Répression</h3>
          <div className='space-y-3 text-sm'>
            {item.repressionTableau.map((row, i) => (
              <div key={i} className='rounded-lg border border-white/10 bg-black/20 p-3'>
                <p className='font-semibold text-violet-100'>{row.qualification}</p>
                <p className='mt-1 text-slate-300'>Article : {row.article}</p>
                {row.circonstances ? <p className='mt-1 text-slate-400'>{row.circonstances}</p> : null}
                <pre className='mt-2 whitespace-pre-wrap text-[12px] leading-relaxed text-slate-200'>{row.peines}</pre>
              </div>
            ))}
          </div>
          {item.repressionImmunite ? (
            <p className='mt-3 text-xs text-slate-400'>Immunité : {item.repressionImmunite}</p>
          ) : null}
          {item.repressionNota ? (
            <p className='mt-2 text-xs text-slate-400'>Nota : {item.repressionNota}</p>
          ) : null}
        </div>
      ) : null}

      {item.piegeExamenOfficiel ? (
        <p className='rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-100'>
          <strong className='text-rose-200'>Piège examen :</strong> {item.piegeExamenOfficiel}
        </p>
      ) : null}

      {item.maj2025 || item.badgeMaj ? (
        <p className='text-xs font-semibold text-amber-200'>
          {item.badgeMaj ?? 'MAJ 2025'}
          {item.maj2025 ? ' — texte à jour loi 2025 (vérifier cahier MAJ).' : ''}
        </p>
      ) : null}

      <InfractionAudioCoach legal={item.legal} materiel={item.materiel} moral={item.moral} />

      {item.noteExamen ? (
        <p className='rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/90'>
          <strong className='text-amber-200'>Repère examen :</strong> {item.noteExamen}
        </p>
      ) : null}

      <div className='rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-slate-400'>
        <p className='font-semibold text-slate-300'>Contrôle qualité juridique</p>
        <p className='mt-2'>
          Contenu pédagogique à valider avec <strong className='text-slate-200'>votre fascicule officiel</strong> et{' '}
          <strong className='text-slate-200'>Légifrance</strong> (textes et peines en vigueur). En cas de doute,
          toujours suivre la source institutionnelle la plus récente.
        </p>
        <a
          href={legifranceSearchUrl(item.legal)}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-3 inline-flex items-center gap-2 font-medium text-cyan-400 hover:underline'
        >
          Ouvrir une recherche Légifrance
          <ExternalLink className='h-3.5 w-3.5' aria-hidden />
        </a>
      </div>

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
