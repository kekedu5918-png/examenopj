'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, XCircle } from 'lucide-react';

import { BaremeBars } from '@/components/epreuves/epreuve-1/bareme-bars';
import { EPREUVE1_PHRASES } from '@/components/epreuves/epreuve-1/phrases-data';
import { LANDING_EASE } from '@/components/home/motion';
import { MethodoRappel } from '@/components/methodo/MethodoRappel';
import { Button } from '@/components/ui/button';
import { CopyBox } from '@/components/ui/CopyBox';
import { GlassCard } from '@/components/ui/GlassCard';
import type { SectionAccordionItem } from '@/components/ui/section-accordion';
import { SectionAccordion } from '@/components/ui/section-accordion';
import { cn } from '@/utils/cn';

const ease = [...LANDING_EASE] as [number, number, number, number];

const caItems = [
  { nom: 'Bande organisée', art: 'art. 132-71' },
  { nom: 'Guet-apens', art: 'art. 132-71-1' },
  { nom: 'Préméditation', art: 'art. 132-72' },
  { nom: 'Effraction', art: 'art. 132-73' },
  { nom: 'Escalade', art: 'art. 132-74' },
  { nom: "Usage d'arme", art: 'art. 132-75' },
  { nom: 'Racisme / religion / ethnie', art: 'art. 132-76' },
  { nom: 'Orientation sexuelle', art: 'art. 132-77' },
  { nom: 'Repenti', art: 'art. 132-78' },
  { nom: 'Cybercriminalité', art: 'art. 132-79' },
  { nom: 'Conjoint ou ex-conjoint / PACS', art: 'art. 132-80' },
] as const;

const CONCLUSION_PLAN_TYPE = `« X pourrait être poursuivi comme :
- auteur / coauteur / complice de [I°] aggravée
Y pourrait être poursuivi comme :
- auteur / coauteur / complice de [I°]
Il y a concours d'infractions pour X au sens de l'article 132-2 du CP, ce qui entraîne l'application des articles 132-3 et 132-4 de ce même code. »`;

function StepCircle({ n, className }: { n: number; className: string }) {
  return (
    <div
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg',
        className
      )}
    >
      {n}
    </div>
  );
}

function PhraseGroup({ indices }: { indices: number[] }) {
  return (
    <div className='space-y-4'>
      {indices.map((i) => {
        const p = EPREUVE1_PHRASES[i];
        return <CopyBox key={i} tag={p.badge} label={p.title} text={p.text} note={p.note} />;
      })}
    </div>
  );
}

function IrresponsabiliteCausesPanel() {
  return (
    <div className='grid gap-6 md:grid-cols-2'>
      <div className='rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4'>
        <p className='text-sm font-bold text-emerald-300'>Responsabilité pleine</p>
        <p className='mt-2 text-sm italic text-gray-300'>« Sa responsabilité est pleine et entière »</p>
        <p className='mt-2 text-xs text-gray-500'>
          Phrase par défaut quand aucune cause d&apos;irresponsabilité ne s&apos;applique
        </p>
      </div>
      <div className='rounded-xl border border-amber-500/15 bg-amber-500/5 p-4'>
        <p className='text-sm font-bold text-amber-300'>Causes d&apos;irresponsabilité</p>
        <p className='mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500'>Faits justificatifs</p>
        <ol className='mt-2 list-decimal space-y-1 pl-4 text-xs text-gray-400'>
          <li>Ordre de la loi / commandement de l&apos;autorité légitime — art. 122-4</li>
          <li>Légitime défense — art. 122-5</li>
          <li>État de nécessité — art. 122-7</li>
          <li>Lanceur d&apos;alerte — art. 122-9</li>
        </ol>
        <p className='mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500'>Causes de non-imputabilité</p>
        <ol className='mt-2 list-decimal space-y-1 pl-4 text-xs text-gray-400'>
          <li>Trouble psychique ou neuropsychique — art. 122-1</li>
          <li>Contrainte — art. 122-2</li>
          <li>Erreur de droit ou de fait — art. 122-3</li>
          <li>Minorité — art. 122-8</li>
        </ol>
        <p className='mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500'>Autres</p>
        <ul className='mt-2 list-disc space-y-1 pl-4 text-xs text-gray-400'>
          <li>Usage légitime de l&apos;arme — art. L.435-1 CSI</li>
          <li>Immunité familiale</li>
        </ul>
      </div>
    </div>
  );
}

export function Epreuve1Sections() {
  const scrollToStructure = () => {
    document.getElementById('epreuve1-structure-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const methodologyBlock = (
    <div className='relative'>
      <div
        className='absolute bottom-0 left-[21px] top-3 w-0.5 bg-gradient-to-b from-blue-500 via-gold-400 to-emerald-500'
        aria-hidden
      />
      <div className='space-y-14'>
        <div className='relative flex gap-5'>
          <div className='relative z-10 flex w-11 shrink-0 justify-center'>
            <StepCircle n={1} className='bg-blue-600' />
          </div>
          <GlassCard className='min-w-0 flex-1' padding='p-6'>
            <h3 className='text-lg font-bold text-gray-100'>LE BROUILLON</h3>
            <ul className='mt-4 space-y-2'>
              {[
                'Pas de recto-verso, numéroter les pages',
                'Deux lectures attentives du thème',
                'Relever les éléments essentiels',
                'Identifier toutes les infractions présentes dans le thème',
              ].map((line) => (
                <li key={line} className='flex gap-2 text-sm text-gray-400'>
                  <Check className='mt-0.5 h-4 w-4 shrink-0 text-blue-400' />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        <div className='relative flex gap-5'>
          <div className='relative z-10 flex w-11 shrink-0 justify-center'>
            <StepCircle n={2} className='bg-indigo-600' />
          </div>
          <GlassCard className='min-w-0 flex-1' padding='p-6'>
            <h3 className='text-lg font-bold text-gray-100'>LE TABLEAU AU BROUILLON</h3>
            <p className='mt-3 text-sm text-gray-400'>
              Pour chaque infraction identifiée, construire un tableau à 2 colonnes :
            </p>
            <div className='mt-4 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02] text-sm'>
              <table className='w-full min-w-[280px] border-collapse text-left'>
                <thead>
                  <tr className='border-b border-white/10 bg-white/[0.05]'>
                    <th className='p-3 font-semibold text-gold-400'>CONTEXTUALISATION</th>
                    <th className='p-3 font-semibold text-gold-400'>CONCEPTUALISATION</th>
                  </tr>
                </thead>
                <tbody className='text-gray-400'>
                  <tr className='border-b border-white/5'>
                    <td className='p-3'>(éléments du thème)</td>
                    <td className='p-3'>(éléments constitutifs réels)</td>
                  </tr>
                  <tr className='border-b border-white/5'>
                    <td className='p-3'>1. élément du thème</td>
                    <td className='p-3'>1. élément matériel</td>
                  </tr>
                  <tr className='border-b border-white/5'>
                    <td className='p-3'>2. ...</td>
                    <td className='p-3'>2. ...</td>
                  </tr>
                  <tr>
                    <td className='p-3'>3. ...</td>
                    <td className='p-3'>3. ...</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className='mt-4 text-sm italic text-gray-500'>
              Relier chaque élément du texte à un vrai élément constitutif de l&apos;infraction
            </p>
          </GlassCard>
        </div>

        <div className='relative flex gap-5'>
          <div className='relative z-10 flex w-11 shrink-0 justify-center'>
            <StepCircle n={3} className='bg-orange-600' />
          </div>
          <GlassCard className='min-w-0 flex-1' padding='p-6'>
            <h3 className='text-lg font-bold text-gray-100'>LES CIRCONSTANCES AGGRAVANTES</h3>
            <p className='mt-3 text-sm text-gray-400'>
              Identifier les CA dans le thème — Articles 132-71 à 132-80 du code pénal
            </p>
            <div className='mt-6 grid gap-3 sm:grid-cols-2'>
              {caItems.map((ca) => (
                <div
                  key={`${ca.nom}-${ca.art}`}
                  className='rounded-lg border border-orange-500/10 bg-orange-500/5 p-3'
                >
                  <p className='text-sm font-bold text-gray-100'>{ca.nom}</p>
                  <p className='text-xs text-gray-400'>— {ca.art}</p>
                </div>
              ))}
            </div>
            <div className='mt-6 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 text-sm text-gray-300'>
              <p className='flex gap-2'>
                <AlertTriangle className='mt-0.5 size-4 shrink-0 text-amber-300' aria-hidden />
                <span>
                <span className='font-semibold text-amber-200'>Règle d&apos;ordre :</span> Si la CA de racisme
                (132-76) ou d&apos;homophobie (132-77) est présente, elle doit être démontrée en{' '}
                <span className='font-bold text-amber-100'>DERNIÈRE</span> circonstance aggravante.
                </span>
              </p>
            </div>
            <p className='mt-4 text-sm text-gray-500'>
              Ne pas oublier les CA spécifiques à chaque infraction (ex : art. 311-4 pour le vol)
            </p>
          </GlassCard>
        </div>

        <div className='relative flex gap-5'>
          <div className='relative z-10 flex w-11 shrink-0 justify-center'>
            <StepCircle n={4} className='bg-violet-600' />
          </div>
          <GlassCard className='min-w-0 flex-1 space-y-4' padding='p-6'>
            <h3 className='text-lg font-bold text-gray-100'>LE DEGRÉ DE PARTICIPATION</h3>
            <div className='space-y-4 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4'>
              <span className='inline-block rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300'>
                AUTEUR
              </span>
              <p className='text-sm font-medium text-gray-300'>Art. 121-4 du CP</p>
              <p className='text-sm text-gray-400'>
                Réalise personnellement tous les éléments constitutifs de l&apos;infraction
              </p>
            </div>
            <div className='space-y-4 rounded-xl border border-blue-500/15 bg-blue-500/5 p-4'>
              <span className='inline-block rounded-md bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-300'>
                COAUTEUR
              </span>
              <p className='text-sm font-medium text-gray-300'>Art. 121-4 du CP</p>
              <p className='text-sm text-gray-400'>
                Réalise également personnellement tous les éléments constitutifs
              </p>
            </div>
            <div className='space-y-4 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4'>
              <span className='inline-block rounded-md bg-orange-500/20 px-2 py-0.5 text-xs font-bold text-orange-300'>
                COMPLICE
              </span>
              <p className='text-sm font-medium text-gray-300'>Art. 121-7 CP (prévoit) — Art. 121-6 CP (réprime)</p>
              <p className='text-sm font-semibold text-gray-300'>Méthodes de complicité :</p>
              <ul className='list-inside list-disc space-y-1 text-sm text-gray-400'>
                <li>Par aide ou assistance</li>
                <li>Par provocation</li>
                <li>Par instructions</li>
                <li>Par fourniture de moyens</li>
              </ul>
              <p className='text-sm text-gray-400'>
                Conditions : un fait principal punissable + un acte matériel de complicité + connaissance de cause +
                volonté de s&apos;associer
              </p>
            </div>
          </GlassCard>
        </div>

        <div className='relative flex gap-5'>
          <div className='relative z-10 flex w-11 shrink-0 justify-center'>
            <StepCircle n={5} className='bg-emerald-600' />
          </div>
          <GlassCard className='min-w-0 flex-1' padding='p-6'>
            <h3 className='text-lg font-bold text-gray-100'>LA RESPONSABILITÉ PÉNALE</h3>
            <div className='mt-6'>
              <IrresponsabiliteCausesPanel />
            </div>
          </GlassCard>
        </div>

        <div className='relative flex gap-5'>
          <div className='relative z-10 flex w-11 shrink-0 justify-center'>
            <StepCircle n={6} className='bg-gold-500 text-navy-950' />
          </div>
          <GlassCard className='min-w-0 flex-1' padding='p-6'>
            <h3 className='text-lg font-bold text-gray-100'>LA RÉDACTION</h3>
            <p className='mt-3 text-sm text-gray-400'>
              Assembler le tout en suivant la structure du devoir (voir section suivante)
            </p>
            <Button
              type='button'
              variant='outline'
              className='mt-6 border-gold-400/30 text-gold-300 hover:bg-gold-400/10'
              onClick={scrollToStructure}
            >
              ↓ Voir la structure complète
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );

  const structureBlock = (
    <div id='epreuve1-structure-anchor' className='scroll-mt-24 space-y-4'>
      <div className='rounded-3xl border border-white/10 bg-navy-900/50 p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)]'>
        <div className='mb-4 rounded-lg border-l-4 border-gold-400 bg-gold-400/5 p-6'>
          <h3 className='font-bold text-gold-400'>INTRODUCTION</h3>
          <div className='mt-4 rounded-lg bg-navy-950/80 p-4 text-sm italic text-gray-400'>
            « Dans le thème proposé, il est possible de relever les faits suivants :
            <br />
            1 - [I° contextualisée n°1] (I° simple ou I° simple tentée, pas d&apos;aggravation, contextualisation)
            <br />
            2 - [I° contextualisée n°2]
            <br />
            3 - [I° contextualisée n°3]... »
          </div>
        </div>

        <div className='mb-4 rounded-lg border-l-4 border-blue-500 bg-blue-500/5 p-6'>
          <h3 className='font-bold text-blue-400'>DÉVELOPPEMENT — Un développement par infraction</h3>

          <div className='mt-6 space-y-4 border-l border-white/10 pl-4'>
            <p className='font-semibold text-gray-200'>&quot;TITRE&quot; — Même titre que dans l&apos;introduction</p>

            <div className='ml-2 border-l border-red-500/30 pl-4'>
              <span className='rounded bg-red-500/15 px-2 py-0.5 text-xs font-bold text-red-300'>
                ÉLÉMENT MATÉRIEL
              </span>
              <p className='mt-2 text-sm text-gray-400'>
                Contextualiser : les éléments du thème = les éléments constitutifs
              </p>
              <p className='mt-1 text-xs text-gray-500'>
                NOTE : La tentative se démontre ici (commencement d&apos;exécution + absence de désistement volontaire)
              </p>
            </div>

            <div className='ml-2 border-l border-orange-500/30 pl-4'>
              <span className='rounded bg-orange-500/15 px-2 py-0.5 text-xs font-bold text-orange-300'>
                ÉLÉMENT MORAL
              </span>
              <p className='mt-2 text-sm text-gray-400'>Contextualiser : conscience + volonté</p>
            </div>

            <div className='ml-2 border-l border-blue-500/30 pl-4'>
              <span className='rounded bg-blue-500/15 px-2 py-0.5 text-xs font-bold text-blue-300'>ÉLÉMENT LÉGAL</span>
              <p className='mt-2 text-sm text-gray-400'>
                « Ces faits prévus par l&apos;art. — et réprimés par l&apos;art. —, constituent [qualification] qui est
                [classification] »
              </p>
              <div className='mt-3 rounded-lg border border-gold-400/30 bg-gold-400/5 p-3 text-xs text-gold-200'>
                PRQC → Prévu – Réprimé – Qualification – Classification
              </div>
            </div>

            <div className='ml-2 border-l border-orange-500/30 pl-4'>
              <span className='rounded bg-orange-500/15 px-2 py-0.5 text-xs font-bold text-orange-300'>
                CIRCONSTANCES AGGRAVANTES
              </span>
              <p className='mt-2 text-sm text-gray-400'>si applicable</p>
              <p className='mt-2 text-sm text-gray-400'>§ 1 : Démontrer la matérialité + article définition (132-71...)</p>
              <p className='mt-1 text-sm text-gray-400'>
                § 2 : « Ces faits prévus par l&apos;art. — et réprimés par l&apos;art. —, constituent [I°] aggravée »
              </p>
              <div className='mt-3 rounded-lg border border-blue-500/20 bg-blue-500/[0.05] p-3 text-sm text-gray-300'>
                Si changement de classification (ex. : DÉLIT → CRIME), le préciser dans le 2ᵉ paragraphe. Sinon, pas
                nécessaire.
              </div>
              <p className='mt-3 text-sm italic text-amber-400'>
                Note : Si CA de l&apos;homophobie (132-77) ou du racisme (132-76), à démontrer en DERNIÈRE circonstance
                aggravante.
              </p>
            </div>

            <div className='ml-2 border-l border-violet-500/30 pl-4'>
              <span className='rounded bg-violet-500/15 px-2 py-0.5 text-xs font-bold text-violet-300'>
                DEGRÉ DE PARTICIPATION
              </span>
              <p className='mt-2 text-sm text-gray-400'>Auteur / Coauteur / Complice (voir phrases types)</p>
            </div>

            <div className='ml-2 border-l border-emerald-500/30 pl-4'>
              <span className='rounded bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-300'>
                RESPONSABILITÉ
              </span>
              <p className='mt-2 text-sm text-gray-400'>
                « Sa responsabilité est pleine et entière » OU cause d&apos;irresponsabilité
              </p>
            </div>
          </div>

          <p className='mt-6 flex items-center gap-2 text-sm text-gray-500'>
            <span className='text-lg' aria-hidden>
              ↻
            </span>
            Répéter ce développement pour CHAQUE infraction identifiée
          </p>
        </div>

        <div className='rounded-lg border-l-4 border-emerald-500 bg-emerald-500/5 p-6'>
          <h3 className='font-bold text-emerald-400'>CONCLUSION</h3>
          <div className='mt-4 rounded-lg bg-navy-950/80 p-4 text-sm italic text-gray-400'>
            « X pourrait être poursuivi comme :
            <br />
            - auteur / coauteur / complice de [I°] aggravée
            <br />
            Y pourrait être poursuivi comme :
            <br />
            - auteur / coauteur / complice de [I°]
            <br />
            Il y a concours d&apos;infractions pour X au sens de l&apos;article 132-2 du CP, ce qui entraîne
            l&apos;application des articles 132-3 et 132-4 de ce même code. »
          </div>
        </div>
      </div>

      <motion.div
        className='mx-auto max-w-3xl rounded-3xl border border-gold-400/20 bg-gradient-to-r from-gold-400/10 to-gold-400/5 p-10 text-center shadow-[0_0_80px_-20px_rgba(212,168,67,0.35)] md:p-12'
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
      >
        <p className='font-display text-6xl font-bold tracking-[0.2em] text-gold-400 md:text-8xl'>PRQC</p>
        <div className='mt-10 flex flex-wrap items-center justify-center gap-2 text-sm md:gap-3'>
          {(['Prévu', 'Réprimé', 'Qualification', 'Classification'] as const).map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease, delay: 0.1 + i * 0.08 }}
              className='inline-flex items-center gap-2'
            >
              {i > 0 ? <span className='text-gold-400'>→</span> : null}
              <span className='rounded-lg bg-white/5 px-4 py-2 font-medium text-gray-200'>{word}</span>
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const caGeneralesBlock = (
    <div className='space-y-6'>
      <p className='text-sm text-gray-400'>
        Liste des onze circonstances aggravantes générales (ordre des articles 132-71 à 132-80). En rédaction, démontrer
        dans un ordre cohérent ; si les faits impliquent les infractions prévues aux articles 132-76 ou 132-77, les
        traiter systématiquement en <span className='font-semibold text-amber-200'>dernière</span> position.
      </p>
      <div className='grid gap-3 sm:grid-cols-2'>
        {caItems.map((ca) => (
          <div key={`ca2-${ca.nom}`} className='rounded-lg border border-orange-500/10 bg-orange-500/5 p-3'>
            <p className='text-sm font-bold text-gray-100'>{ca.nom}</p>
            <p className='text-xs text-gray-400'>— {ca.art}</p>
          </div>
        ))}
      </div>
      <div className='rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 text-sm text-gray-300'>
        <p className='flex gap-2'>
          <AlertTriangle className='mt-0.5 size-4 shrink-0 text-amber-300' aria-hidden />
          <span>
          <span className='font-semibold text-amber-200'>Règle d&apos;ordre :</span> racisme / religion / ethnie
          (132-76) et orientation sexuelle (132-77) en <span className='font-bold text-amber-100'>DERNIER</span>.
          </span>
        </p>
      </div>
      <p className='text-sm text-gray-500'>
        Ne pas oublier les CA spécifiques à chaque infraction (ex. : art. 311-4 pour le vol).
      </p>

      <GlassCard padding='p-6'>
        <h3 className='text-base font-semibold text-gray-200'>
          Exemple : CA de discrimination (art. 132-76 ou 132-77 CP)
        </h3>
        <div className='mt-4 rounded-xl bg-navy-900 p-4 text-sm leading-relaxed text-gray-300'>
          <p>
            « Il s&apos;agit d&apos;une circonstance aggravante générale qui précède l&apos;infraction de{' '}
            <span className='italic text-blue-400'>[infraction]</span> commise par X.
          </p>
          <p className='mt-3'>
            Elle est prévue à l&apos;alinéa <span className='italic text-blue-400'>[n°]</span> de l&apos;article
            132-76 (ou 132-77) du code pénal, et a pour effet de relever le maximum de la peine privative de liberté
            encourue par le ou les auteurs.
          </p>
          <p className='mt-3'>
            Le délit commis par X est passible de <span className='italic text-blue-400'>[durée]</span> ans.
            L&apos;article 132-76 <span className='italic text-blue-400'>[n°]</span> du code pénal dispose que le maximum
            de la peine encourue est alors porté à <span className='italic text-blue-400'>[durée supérieure]</span> ans.
          </p>
          <p className='mt-3 font-medium text-gray-200'>→ DÉLIT si changement de classification, ne pas oublier → CRIME</p>
        </div>
        <div className='mt-4 rounded-lg border border-red-500/20 bg-red-500/[0.05] p-3 text-xs text-gray-300'>
          Pour deux CA d&apos;une même infraction : on peut faire un SEUL paragraphe avec les 2 CA. Les articles prévu (P)
          et réprimé (R) doivent référencer la CA la plus grave.
        </div>
      </GlassCard>
    </div>
  );

  const items: SectionAccordionItem[] = [
    {
      id: 'bareme',
      trigger: 'Barème de notation',
      badge: 'Méthode',
      badgeColor: 'blue',
      defaultOpen: true,
      content: (
        <div className='space-y-6'>
          <BaremeBars />
          <div className='grid gap-4 md:grid-cols-1'>
            <div className='flex gap-4 rounded-xl border border-red-500/20 bg-red-500/10 p-5'>
              <AlertTriangle className='h-6 w-6 shrink-0 text-red-400' />
              <p className='text-sm font-medium text-red-200'>−5 points par mauvaise infraction identifiée</p>
            </div>
            <div className='flex gap-4 rounded-xl border border-red-500/20 bg-red-500/10 p-5'>
              <XCircle className='h-6 w-6 shrink-0 text-red-400' />
              <p className='text-sm font-medium text-red-200'>Note inférieure à 5/20 = ÉLIMINATOIRE</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'etapes',
      trigger: 'Les 6 étapes de la méthodologie',
      badge: '6 étapes',
      badgeColor: 'green',
      defaultOpen: true,
      content: methodologyBlock,
    },
    {
      id: 'structure',
      trigger: 'Structure du devoir — Plan type',
      badge: 'Structure',
      badgeColor: 'blue',
      content: structureBlock,
    },
    {
      id: 'phrases-intro',
      trigger: 'Phrases types — Introduction & structure',
      badge: '3 formules',
      badgeColor: 'amber',
      content: <PhraseGroup indices={[0, 1, 4]} />,
    },
    {
      id: 'phrases-element-legal',
      trigger: 'Phrases types — Élément légal (PRQC)',
      badge: '2 formules',
      badgeColor: 'amber',
      content: <PhraseGroup indices={[2, 3]} />,
    },
    {
      id: 'phrases-ca',
      trigger: 'Phrases types — Circonstances aggravantes',
      badge: '2 formules',
      badgeColor: 'amber',
      content: <PhraseGroup indices={[5, 6]} />,
    },
    {
      id: 'phrases-participation',
      trigger: 'Phrases types — Auteur, coauteur, complice',
      badge: '3 formules',
      badgeColor: 'amber',
      content: <PhraseGroup indices={[7, 8, 9]} />,
    },
    {
      id: 'phrases-irresponsabilite',
      trigger: "Causes d'irresponsabilité pénale",
      badge: 'Tableau + 4 formules',
      badgeColor: 'red',
      content: (
        <div className='space-y-6'>
          <IrresponsabiliteCausesPanel />
          <PhraseGroup indices={[10, 11, 12, 13]} />
        </div>
      ),
    },
    {
      id: 'ca-generales',
      trigger: 'Toutes les circonstances aggravantes générales (art. 132-71 à 132-80)',
      badge: '11 CA',
      badgeColor: 'red',
      content: caGeneralesBlock,
    },
    {
      id: 'conclusion',
      trigger: "Phrases types — Conclusion & concours d'infractions",
      badge: '2 formules',
      badgeColor: 'amber',
      content: (
        <div className='space-y-4'>
          <CopyBox
            tag='CONCLUSION'
            label='Conclusion — Plan type (extrait)'
            text={CONCLUSION_PLAN_TYPE}
          />
          <CopyBox
            tag={EPREUVE1_PHRASES[14].badge}
            label={EPREUVE1_PHRASES[14].title}
            text={EPREUVE1_PHRASES[14].text}
            note={EPREUVE1_PHRASES[14].note}
          />
        </div>
      ),
    },
  ];

  return (
    <div className='mx-auto max-w-4xl space-y-10 px-6 pb-24'>
      <MethodoRappel title='Attendu épreuve 1 — qualification' variant='accent'>
        <p>
          Chaque infraction doit être traitée en <strong>PRQC</strong> avec des éléments légal, matériel et moral{' '}
          <strong>reproduits tels que dans le référentiel</strong> (titres EXACTS), pas approximés.
        </p>
        <p>
          <Link href='/guide-revision-opj' className='font-semibold text-emerald-200 underline'>
            Guide de révision
          </Link>
          {' · '}
          <Link href='/entrainement/recapitulatif' className='font-semibold text-emerald-200 underline'>
            Récap éléments constitutifs
          </Link>
        </p>
      </MethodoRappel>

      <SectionAccordion allowMultiple className='pb-4' items={items} />

      <section className='py-8' aria-labelledby='autres-epreuves'>
        <h2 id='autres-epreuves' className='text-xl font-bold text-white'>
          Les autres épreuves
        </h2>
        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          <Link
            href='/epreuves/epreuve-2'
            className='group rounded-2xl border border-blue-500/25 bg-white/[0.02] p-6 transition-all hover:border-blue-500/40 hover:bg-white/[0.04]'
          >
            <p className='font-sans text-lg font-semibold text-blue-300'>Épreuve 2 — Procédure pénale</p>
            <p className='mt-2 text-sm text-gray-500'>PV, articulation, synthèse</p>
          </Link>
          <Link
            href='/epreuves/epreuve-3'
            className='group rounded-2xl border border-emerald-500/25 bg-white/[0.02] p-6 transition-all hover:border-emerald-500/40 hover:bg-white/[0.04]'
          >
            <p className='font-sans text-lg font-semibold text-emerald-300'>Épreuve 3 — Oral (CR Parquet)</p>
            <p className='mt-2 text-sm text-gray-500'>Compte rendu téléphonique</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
