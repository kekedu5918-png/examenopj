'use client';

import { useEffect, useRef, useState } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { ArticleRef } from '@/components/ui/ArticleTooltip';
import { ArticleTooltip } from '@/components/ui/ArticleTooltip';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/utils/cn';

// ─────────────────────────────────────────────────────────
// Références articles avec textes courts + Légifrance
// ─────────────────────────────────────────────────────────
const REFS: Record<string, ArticleRef> = {
  'art. 111-1 CP': {
    label: 'art. 111-1 CP',
    text: 'Pas de crime ou de délit sans loi. Principe de légalité criminelle.',
    code: 'CP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006417201',
  },
  'art. 53 CPP': {
    label: 'art. 53 CPP',
    text: 'Enquête de flagrance : crime ou délit flagrant. Durée 8 jours, prorogation possible.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006574822',
  },
  'art. 62-2 CPP': {
    label: 'art. 62-2 CPP',
    text: 'Six motifs légaux pour placer une personne en garde à vue.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026268011',
  },
  'art. 63-1 CPP': {
    label: 'art. 63-1 CPP',
    text: 'Droits de la personne gardée à vue : notification de l\'infraction, droits à l\'avocat, au médecin, au silence.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026268023',
  },
  'art. 78-2 al.1 CPP': {
    label: 'art. 78-2 al.1 CPP',
    text: 'Contrôle d\'identité judiciaire : raisons plausibles de soupçonner que la personne a commis ou tenté de commettre une infraction.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037290024',
  },
  'art. 78-2 al.2 CPP': {
    label: 'art. 78-2 al.2 CPP',
    text: 'Contrôle si raisons plausibles de soupçonner que la personne se prépare à commettre un crime ou délit.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037290024',
  },
  'art. 78-2 al.4 CPP': {
    label: 'art. 78-2 al.4 CPP',
    text: 'Contrôle administratif : maintien de l\'ordre public ou prévention des infractions.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037290024',
  },
  'art. 78-2 al.5 CPP': {
    label: 'art. 78-2 al.5 CPP',
    text: 'Contrôle frontalier : zones de 20 km à la frontière et ports/aéroports ouverts au trafic international.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037290024',
  },
  'art. 78-3 CPP': {
    label: 'art. 78-3 CPP',
    text: 'Vérification d\'identité : retenue jusqu\'à 4 heures dans les locaux de police.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006574966',
  },
  'art. 61-1 CPP': {
    label: 'art. 61-1 CPP',
    text: 'Audition libre : droits de la personne soupçonnée entendue sans contrainte.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026267756',
  },
  'art. 802 CPP': {
    label: 'art. 802 CPP',
    text: 'Nullité substantielle : la nullité n\'est prononcée que s\'il est établi que l\'irrégularité a causé un grief.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006575420',
  },
  'art. 385 al.1 CPP': {
    label: 'art. 385 al.1 CPP',
    text: 'Les nullités de procédure doivent être soulevées avant tout débat au fond.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006575049',
  },
  'art. 57 CPP': {
    label: 'art. 57 CPP',
    text: 'Perquisitions : présence obligatoire de la personne concernée ou de son représentant ; à défaut, deux témoins.',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006574868',
  },
  'art. 132-16 CP': {
    label: 'art. 132-16 CP',
    text: 'Infractions assimilées en matière de récidive : liste des délits considérés comme identiques.',
    code: 'CP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044390768',
  },
  'art. 706-73 CPP': {
    label: 'art. 706-73 CPP',
    text: 'Criminalité et délinquance organisée : liste des infractions et régimes procéduraux dérogatoires (GAV 96h).',
    code: 'CPP',
    legifranceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042192413',
  },
};

function Ref({ id, children }: { id: keyof typeof REFS; children?: React.ReactNode }) {
  const article = REFS[id];
  if (!article) return <span className='text-cyan-400/90'>[{id}]</span>;
  return <ArticleTooltip article={article}>{children ?? article.label}</ArticleTooltip>;
}

function Piege() {
  return (
    <span className='ml-2 inline-flex items-center rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-100'>
      Piège examen ⚠️
    </span>
  );
}

// ─────────────────────────────────────────────────────────
// Navigation sidebar — 8 rubriques
// ─────────────────────────────────────────────────────────
// 3 couleurs sémantiques : violet = droit pénal, cyan = procédure, rose = droits des personnes
const SIDEBAR_ITEMS = [
  { id: 'r1', num: 1, label: 'Classification des infractions', color: 'text-violet-300', dot: 'bg-violet-500' },
  { id: 'r2', num: 2, label: "Cadres d'enquête", color: 'text-cyan-300', dot: 'bg-cyan-500' },
  { id: 'r3', num: 3, label: "Contrôle d'identité", color: 'text-cyan-300', dot: 'bg-cyan-500' },
  { id: 'r4', num: 4, label: 'Garde à vue', color: 'text-rose-300', dot: 'bg-rose-500' },
  { id: 'r5', num: 5, label: "L'audition libre", color: 'text-rose-300', dot: 'bg-rose-500' },
  { id: 'r6', num: 6, label: 'Nullités de procédure', color: 'text-cyan-300', dot: 'bg-cyan-500' },
  { id: 'r7', num: 7, label: 'Perquisitions & saisies', color: 'text-cyan-300', dot: 'bg-cyan-500' },
  { id: 'r8', num: 8, label: "Récidive & concours d'infractions", color: 'text-violet-300', dot: 'bg-violet-500' },
];

const SECTION_COLORS: Record<string, { border: string; header: string; badge: string }> = {
  r1: { border: 'border-l-violet-500', header: 'from-violet-500/10 to-transparent', badge: 'bg-violet-500/15 text-violet-200 border-violet-500/30' },
  r2: { border: 'border-l-cyan-500', header: 'from-cyan-500/10 to-transparent', badge: 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30' },
  r3: { border: 'border-l-cyan-500', header: 'from-cyan-500/10 to-transparent', badge: 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30' },
  r4: { border: 'border-l-rose-500', header: 'from-rose-500/10 to-transparent', badge: 'bg-rose-500/15 text-rose-200 border-rose-500/30' },
  r5: { border: 'border-l-rose-500', header: 'from-rose-500/10 to-transparent', badge: 'bg-rose-500/15 text-rose-200 border-rose-500/30' },
  r6: { border: 'border-l-cyan-500', header: 'from-cyan-500/10 to-transparent', badge: 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30' },
  r7: { border: 'border-l-cyan-500', header: 'from-cyan-500/10 to-transparent', badge: 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30' },
  r8: { border: 'border-l-violet-500', header: 'from-violet-500/10 to-transparent', badge: 'bg-violet-500/15 text-violet-200 border-violet-500/30' },
};

function SidebarNav({ activeId }: { activeId: string }) {
  return (
    <nav aria-label='Navigation rubriques' className='space-y-1'>
      <p className='mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600'>
        Rubriques
      </p>
      {SIDEBAR_ITEMS.map((item) => {
        const active = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#fond-rubrique-${item.id}`}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150',
              active
                ? cn('bg-white/[0.06] text-white', item.color)
                : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300',
            )}
          >
            <span
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-black transition-all',
                active ? cn(item.dot, 'text-white') : 'bg-white/[0.06] text-slate-500',
              )}
            >
              {item.num}
            </span>
            <span className='leading-snug'>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────
// Hook IntersectionObserver — section active
// ─────────────────────────────────────────────────────────
function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id.replace('fond-rubrique-', ''));
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    for (const id of ids) {
      const el = document.getElementById(`fond-rubrique-${id}`);
      if (el) observerRef.current.observe(el);
    }
    return () => observerRef.current?.disconnect();
  }, [ids]);

  return activeId;
}

// ─────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────
function RubriqueSection({
  id,
  num,
  titre,
  fascicule,
  children,
}: {
  id: string;
  num: number;
  titre: string;
  fascicule: string;
  children: React.ReactNode;
}) {
  const colors = SECTION_COLORS[id] ?? SECTION_COLORS['r1']!;
  return (
    <section
      id={`fond-rubrique-${id}`}
      className={cn(
        'scroll-mt-24 rounded-2xl border border-white/[0.08] border-l-4 bg-white/[0.015] overflow-hidden',
        colors.border,
      )}
    >
      {/* En-tête coloré */}
      <div className={cn('bg-gradient-to-r px-5 py-4 md:px-6', colors.header)}>
        <div className='flex flex-wrap items-center gap-3'>
          <span className='flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.08] text-xs font-black text-white'>
            {num}
          </span>
          <h2 className='font-sans text-base font-bold text-white md:text-lg'>{titre}</h2>
          <span
            className={cn(
              'ml-auto rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
              colors.badge,
            )}
          >
            {fascicule}
          </span>
        </div>
      </div>
      {/* Contenu */}
      <div className='px-5 py-5 text-sm text-slate-300 md:px-6'>{children}</div>
    </section>
  );
}

/** Architecture 8 rubriques — sources F09, F10, F11, F15. */
export function FondamentauxEightRubrics() {
  const sectionIds = SIDEBAR_ITEMS.map((s) => s.id);
  const activeId = useActiveSection(sectionIds);

  return (
    <section className='border-b border-white/10 bg-navy-950 px-4 py-12 md:px-8' aria-labelledby='fond-structure-title'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8'>
          <h2 id='fond-structure-title' className='font-sans text-2xl font-extrabold tracking-tight text-white md:text-3xl'>
            Les fondamentaux de l&apos;OPJ
          </h2>
          <p className='mt-3 max-w-3xl text-slate-400'>
            Synthèse procédurale et pénale — à recaler sur les fascicules SDCP (F09 à F15). Les tableaux reprennent la structure
            imposée ; toute ligne doit être vérifiée sur le fascicule indiqué.
            Les badges <span className='rounded border border-blue-500/40 bg-blue-500/15 px-1.5 py-0.5 text-[10px] font-bold text-blue-200'>CPP</span> et{' '}
            <span className='rounded border border-violet-500/40 bg-violet-500/15 px-1.5 py-0.5 text-[10px] font-bold text-violet-200'>CP</span>{' '}
            sont cliquables — ouvre la définition courte et le lien Légifrance.
          </p>
        </div>

        {/* Layout 2 colonnes sur desktop */}
        <div className='flex gap-8 lg:items-start'>
          {/* Sidebar sticky — desktop seulement */}
          <aside className='hidden w-52 shrink-0 lg:block'>
            <div className='sticky top-24 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4'>
              <SidebarNav activeId={activeId} />
            </div>
          </aside>

          {/* Contenu principal — rubriques */}
          <div className='min-w-0 flex-1 space-y-5'>

            {/* RUBRIQUE 1 */}
            <RubriqueSection id='r1' num={1} titre='La classification des infractions' fascicule='F09'>
              <p className='mb-4'>
                <strong className='text-white'>Éléments constitutifs</strong> — Élément légal :{' '}
                <Ref id='art. 111-1 CP' /> principe légal d&apos;une infraction. Élément matériel : acte positif
                ou négatif. Élément moral : dol général (intentionnel) / faute non intentionnelle / faute contraventionnelle.
              </p>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <p className='mb-2 font-semibold text-white'>Tableau tripartite des infractions</p>
                <table className='w-full min-w-[640px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-slate-400'>
                      <th className='py-2 pr-3' />
                      <th className='py-2 pr-3'>Contravention</th>
                      <th className='py-2 pr-3'>Délit</th>
                      <th className='py-2'>Crime</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    {[
                      ['Juridiction', 'Tribunal de police', 'Tribunal correctionnel', 'Cour d\'assises / CCD'],
                      ['Flagrance', 'Non applicable', 'Possible si peine d\'emprisonnement', 'Possible'],
                      ['Prescription action publique', '1 an', '6 ans', '20 ans'],
                      ['Prescription peine', '3 ans', '6 ans', '20 ans'],
                      ['Tentative', 'Non punissable', 'Si texte le prévoit', 'Toujours punissable'],
                      ['Complicité', 'Si texte expresst.', 'Punissable', 'Punissable'],
                    ].map(([label, ...vals]) => (
                      <tr key={label} className='border-b border-white/5 last:border-0'>
                        <td className='py-2 font-medium text-slate-300'>{label}</td>
                        {vals.map((v, i) => <td key={i} className='py-2 pr-3'>{v}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
              <div className='mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4'>
                <p className='text-xs font-semibold uppercase tracking-wide text-amber-300'>Éléments moraux — schéma</p>
                <div className='mt-2 grid grid-cols-3 gap-2 text-xs text-slate-400'>
                  <div className='rounded-lg bg-white/[0.03] p-3'>
                    <p className='font-semibold text-white'>Intentionnel</p>
                    <p className='mt-1'>Volonté d&apos;accomplir l&apos;acte en sachant qu&apos;il est illicite</p>
                  </div>
                  <div className='rounded-lg bg-white/[0.03] p-3'>
                    <p className='font-semibold text-white'>Non intentionnel</p>
                    <p className='mt-1'>Imprudence, négligence, maladresse</p>
                  </div>
                  <div className='rounded-lg bg-white/[0.03] p-3'>
                    <p className='font-semibold text-white'>Contraventionnel</p>
                    <p className='mt-1'>Violation de la prescription légale</p>
                  </div>
                </div>
              </div>
            </RubriqueSection>

            {/* RUBRIQUE 2 */}
            <RubriqueSection id='r2' num={2} titre="Les cadres d'enquête" fascicule='F11'>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <table className='w-full min-w-[800px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-slate-400'>
                      <th className='py-2 pr-3' />
                      <th className='py-2 pr-3'>Flagrance</th>
                      <th className='py-2 pr-3'>Préliminaire</th>
                      <th className='py-2 pr-3'>CR</th>
                      <th className='py-2'>Instruction</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Déclenchement</td>
                      <td>Crime ou délit flagrant <Ref id='art. 53 CPP' /></td>
                      <td>Initiative OPJ ou plainte</td>
                      <td>Ordonnance JI</td>
                      <td>Réquisitoire introductif</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Durée initiale</td>
                      <td>8 jours <Ref id='art. 53 CPP' /></td>
                      <td>Pas de délai fixe</td>
                      <td>Durée de la CR</td>
                      <td>Pas de limite fixe</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>GAV</td>
                      <td>OPJ compétence exclusive</td>
                      <td>OPJ compétence exclusive</td>
                      <td colSpan={2}>OPJ sur instruction JI</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='py-2 font-medium text-slate-300'>Perquisition</td>
                      <td>De droit, nuit possible si flagrant</td>
                      <td>Assentiment écrit ou JLD</td>
                      <td colSpan={2}>Selon ordonnance JI</td>
                    </tr>
                    <tr>
                      <td className='py-2 font-medium text-slate-300'>Direction</td>
                      <td>Procureur de la République</td>
                      <td>Procureur de la République</td>
                      <td colSpan={2}>Juge d&apos;instruction</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
              <div className='mt-4 rounded-xl border border-rose-500/20 bg-rose-500/[0.05] p-3'>
                <p className='text-xs font-semibold text-rose-300'>
                  Piège — validité de la flagrance <Piege />
                </p>
                <p className='mt-1 text-xs text-slate-400'>
                  Continuité des actes ; une interruption dans la rédaction des actes ne marque pas l&apos;abandon de l&apos;enquête.
                </p>
              </div>
            </RubriqueSection>

            {/* RUBRIQUE 3 */}
            <RubriqueSection id='r3' num={3} titre="Le contrôle d'identité" fascicule='F11 — art. 78-1 à 78-6 CPP'>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <table className='w-full min-w-[640px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-slate-400'>
                      <th className='py-2 pr-3'>Régime</th>
                      <th className='py-2 pr-3'>Base légale</th>
                      <th className='py-2 pr-3'>Conditions</th>
                      <th className='py-2'>Durée max</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Judiciaire (crime/délit)</td>
                      <td><Ref id='art. 78-2 al.1 CPP' /></td>
                      <td>Raisons plausibles de soupçonner</td>
                      <td>4 h</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Judiciaire (préparation)</td>
                      <td><Ref id='art. 78-2 al.2 CPP' /></td>
                      <td>Préparation à une infraction</td>
                      <td>4 h</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Administratif</td>
                      <td><Ref id='art. 78-2 al.4 CPP' /></td>
                      <td>Maintien ordre public</td>
                      <td>4 h</td>
                    </tr>
                    <tr>
                      <td className='font-medium text-slate-300'>Frontalier</td>
                      <td><Ref id='art. 78-2 al.5 CPP' /></td>
                      <td>Zone 20 km frontière</td>
                      <td>4 h</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
              <p className='mt-4'>
                Suites : vérification d&apos;identité <Ref id='art. 78-3 CPP' />, retenue pour vérification (max 4 h).
              </p>
              <div className='mt-3 rounded-xl border border-rose-500/20 bg-rose-500/[0.05] p-3'>
                <p className='text-xs font-semibold text-rose-300'>Piège ⚠️</p>
                <p className='mt-1 text-xs text-slate-400'>Le contrôle administratif ne peut PAS conduire directement à une GAV.</p>
              </div>
            </RubriqueSection>

            {/* RUBRIQUE 4 */}
            <RubriqueSection id='r4' num={4} titre='La garde à vue' fascicule='F11'>
              <p className='mb-4'>
                <strong className='text-white'>Six motifs</strong> <Ref id='art. 62-2 CPP' /> : 1° investigations — 2° présentation
                procureur — 3° preuves/indices — 4° témoins/victimes — 5° coauteurs/complices — 6° faire cesser le crime.
              </p>
              <div className='grid gap-3 sm:grid-cols-3 text-xs'>
                {[
                  { label: 'Droit commun', val: '24h + 24h (PR)', color: 'border-cyan-500/25 bg-cyan-500/[0.06]' },
                  { label: 'CDO (art. 706-73)', val: 'Jusqu\'à 96h', color: 'border-amber-500/25 bg-amber-500/[0.06]' },
                  { label: 'Terrorisme', val: 'Jusqu\'à 144h', color: 'border-rose-500/25 bg-rose-500/[0.06]' },
                ].map((row) => (
                  <div key={row.label} className={cn('rounded-xl border p-3', row.color)}>
                    <p className='font-semibold text-white'>{row.label}</p>
                    <p className='mt-1 text-slate-400'>{row.val}</p>
                  </div>
                ))}
              </div>
              <div className='mt-4'>
                <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400'>
                  Droits notifiés <Ref id='art. 63-1 CPP' />
                </p>
                <ul className='grid grid-cols-2 gap-1 text-xs text-slate-400 sm:grid-cols-3'>
                  {[
                    'Infraction reprochée', 'Durée max + prolongation', 'Avis proche / employeur',
                    'Avocat (30 min)', 'Médecin', 'Droit au silence',
                    'Interprète', 'Consultation pièces', 'Observations magistrat',
                  ].map((d) => (
                    <li key={d} className='flex items-center gap-1.5'>
                      <span className='h-1.5 w-1.5 rounded-full bg-rose-400/60' aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </RubriqueSection>

            {/* RUBRIQUE 5 */}
            <RubriqueSection id='r5' num={5} titre="L'audition libre" fascicule='F11'>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <table className='w-full min-w-[500px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-slate-400'>
                      <th className='py-2 pr-3' />
                      <th className='py-2 pr-3'>GAV</th>
                      <th className='py-2'>Audition libre <Ref id='art. 61-1 CPP' /></th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    {[
                      ['Contrainte', 'OUI — rétention possible', 'NON — libre de partir'],
                      ['Conditions', '6 motifs art. 62-2', 'Simple convocation'],
                      ['Droits', 'Notification complète', 'Droits allégés (art. 61-1)'],
                      ['Avocat', 'De droit (mineur)', 'Si demande'],
                    ].map(([label, gav, libre]) => (
                      <tr key={label} className='border-b border-white/5 last:border-0'>
                        <td className='py-2 font-medium text-slate-300'>{label}</td>
                        <td className='py-2 pr-3'>{gav}</td>
                        <td className='py-2'>{libre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
            </RubriqueSection>

            {/* RUBRIQUE 6 */}
            <RubriqueSection id='r6' num={6} titre='Les nullités de procédure' fascicule='F15 + F11'>
              <div className='grid gap-3 sm:grid-cols-2 text-sm'>
                <div className='rounded-xl border border-white/10 bg-white/[0.02] p-4'>
                  <p className='font-semibold text-white'>Nullités textuelles</p>
                  <p className='mt-2 text-xs text-slate-400'>
                    Prévues expressément par un texte — ex. <Ref id='art. 63-1 CPP' /> non-notification des droits GAV.
                    Prouvées par le simple constat du manquement.
                  </p>
                </div>
                <div className='rounded-xl border border-white/10 bg-white/[0.02] p-4'>
                  <p className='font-semibold text-white'>Nullités substantielles</p>
                  <p className='mt-2 text-xs text-slate-400'>
                    Violation d&apos;une formalité substantielle portant atteinte aux intérêts de la partie. <Ref id='art. 802 CPP' />
                  </p>
                </div>
              </div>
              <p className='mt-4 text-sm'>
                Invocation : avant tout débat au fond <Ref id='art. 385 al.1 CPP' />. Purge si non soulevée à temps.
              </p>
              <div className='mt-3 rounded-xl border border-rose-500/20 bg-rose-500/[0.05] p-3 text-xs text-rose-200'>
                <Piege /> Irrégularité de perquisition ≠ nullité automatique de la GAV — purge possible.
              </div>
            </RubriqueSection>

            {/* RUBRIQUE 7 */}
            <RubriqueSection id='r7' num={7} titre='Perquisitions, saisies, réquisitions' fascicule='F11'>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <table className='w-full min-w-[640px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-slate-400'>
                      <th className='py-2 pr-3'>Cadre</th>
                      <th className='py-2 pr-3'>Heure légale</th>
                      <th className='py-2 pr-3'>Assentiment</th>
                      <th className='py-2'>Magistrat</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Flagrance</td>
                      <td>Toute heure si flagrant / 6h–21h sinon</td>
                      <td>Non requis</td>
                      <td>Avis PR si domicile</td>
                    </tr>
                    <tr className='border-b border-white/5'>
                      <td className='font-medium text-slate-300'>Préliminaire</td>
                      <td>6h–21h sauf dérogation</td>
                      <td className='font-medium text-amber-200'>Écrit manuscrit OBLIGATOIRE ou JLD</td>
                      <td>PR ou JLD</td>
                    </tr>
                    <tr>
                      <td className='font-medium text-slate-300'>CR / Instruction</td>
                      <td>6h–21h sauf ordonnance</td>
                      <td>Selon ordonnance</td>
                      <td>JI</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCard>
              <p className='mt-4'>
                Présence <Ref id='art. 57 CPP' /> — personne concernée ou représentant ou deux témoins. Scellés numérotés, inventaire contradictoire.
              </p>
            </RubriqueSection>

            {/* RUBRIQUE 8 */}
            <RubriqueSection id='r8' num={8} titre="La récidive et le concours d'infractions" fascicule='F10'>
              <GlassCard padding='p-4' className='overflow-x-auto text-xs'>
                <p className='mb-2 font-semibold text-white'>Récidive — tableau des effets</p>
                <table className='w-full min-w-[720px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-white/10 text-slate-400'>
                      <th className='py-2 pr-3'>1ère infraction</th>
                      <th className='py-2 pr-3'>2e infraction</th>
                      <th className='py-2 pr-3'>Délai</th>
                      <th className='py-2'>Effet</th>
                    </tr>
                  </thead>
                  <tbody className='text-slate-400'>
                    {[
                      ['Crime ou délit puni 10 ans', 'Crime', 'Perpétuel', 'Réclusion perpétuité ou +10 ans'],
                      ['Crime ou délit puni 10 ans', 'Délit puni 10 ans', '10 ans', 'Doublement'],
                      ['Crime ou délit puni 10 ans', 'Délit < 10 ans > 1 an', '5 ans', 'Doublement'],
                      ['Délit < 10 ans', 'Délit identique ou assimilé', '5 ans', 'Doublement'],
                      ['Contravention 5e cl.', 'Même contravention', '1 an', 'Amende → 3 000 €'],
                    ].map((row) => (
                      <tr key={row[0] + row[1]} className='border-b border-white/5 last:border-0'>
                        {row.map((cell, i) => (
                          <td key={i} className={cn('py-2 pr-3', i === 0 && 'font-medium text-slate-300')}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
              <p className='mt-4'>
                Infractions assimilées <Ref id='art. 132-16 CP' /> — liste au fascicule F10.{' '}
                <strong className='text-white'>Non bis in idem</strong> : un même fait ne reçoit pas deux qualifications sauf
                distinctions (faits distincts, qualifications incompatibles ou absorbantes).
              </p>
            </RubriqueSection>

          </div>
        </div>
      </div>
    </section>
  );
}
