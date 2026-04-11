import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ClipboardCheck, Mic, Scale } from 'lucide-react';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { MethodoRappel } from '@/components/methodo/MethodoRappel';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { openGraphForPage } from '@/utils/seo-metadata';

const epTitle = 'Les 3 épreuves — Vue d’ensemble | Examen OPJ';
const epDescription =
  'Durées, compétences évaluées et attentes des correcteurs pour les trois épreuves de l’examen OPJ : qualification juridique, procédure rédigée, oral.';

export const metadata: Metadata = {
  title: epTitle,
  description: epDescription,
  alternates: { canonical: '/epreuves' },
  ...openGraphForPage('/epreuves', epTitle, epDescription),
};

const epreuves = [
  {
    href: '/epreuves/epreuve-1',
    num: '1',
    titre: 'Qualification juridique',
    duree: '3 h',
    focus: 'DPG / DPS — éléments légal, matériel, moral',
    icon: Scale,
    attendus: [
      'Qualification exhaustive et verbatim des textes (articles + incriminations).',
      'PRQC : Problème → Règle → Qualification → Conclusion pour chaque qualification.',
      'Distinction qualification / procédure : ici seulement le droit substantif.',
    ],
    accent: 'from-rose-500/20 to-transparent border-rose-500/20',
  },
  {
    href: '/epreuves/epreuve-2',
    num: '2',
    titre: 'Procédure (articulation, PV, rapport)',
    duree: '4 h',
    focus: 'Enchaînement des actes, forme des PV, synthèse parquet',
    icon: ClipboardCheck,
    attendus: [
      'Articulation : une cartouche = date, heure, qualité OPJ/APJ, titre clair, faits télégraphiques.',
      'Respect des consignes de mise en forme (gras, italique, renvois) — une erreur de format peut coûter cher.',
      'Cohérence du cadre (flagrance, préliminaire, saisine) tout au long du dossier.',
    ],
    accent: 'from-blue-500/20 to-transparent border-blue-500/20',
  },
  {
    href: '/epreuves/epreuve-3',
    num: '3',
    titre: 'Oral — mise en situation',
    duree: '40 min de préparation + jury',
    focus: 'Sujet type enquête, déroulé, questions magistrat & commissaire',
    icon: Mic,
    attendus: [
      'Préparation sur une situation tirée au sort (esprit dossiers Alpha / Bravo) : faits, cadre procédural, actes et suites.',
      'Oral devant 1 magistrat et 1 commissaire : présenter l’enquête de manière structurée et répondre aux questions.',
      'Équilibre entre autonomie OPJ et rapport aux autorités ; ton factuel et références juridiques justes.',
    ],
    accent: 'from-violet-500/20 to-transparent border-violet-500/20',
  },
] as const;

export default function EpreuvesHubPage() {
  return (
    <InteriorPageShell maxWidth='7xl' glow={SHELL_GLOW.epreuvesHub} pad='default' innerClassName='md:pt-16'>
        <nav className='mb-8 text-sm text-gray-500'>
          <Link href='/' className='text-violet-400 hover:text-violet-300'>
            Accueil
          </Link>
          <span className='mx-2' aria-hidden>
            /
          </span>
          <span className='text-gray-400'>Épreuves</span>
        </nav>

        <SectionTitle
          badge='EXAMEN OPJ'
          badgeClassName='bg-gold-500/20 text-gold-200'
          title='Les trois épreuves'
          subtitle='Ce que les correcteurs attendent — méthode commune et liens vers chaque épreuve détaillée'
          size='display'
          titleGradient
          titleAs='h1'
          className='mb-10 max-w-3xl'
        />

        <div className='mb-10 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start'>
          <MethodoRappel title='Norme de restitution (toutes épreuves)' variant='accent'>
            <p>
              <strong>PRQC</strong> pour la partie « droit pur » ; articulation <strong>chronologique</strong> et{' '}
              <strong>propre à l’épreuve 2</strong> pour la partie procédurale.
            </p>
            <p>
              La <strong>qualification</strong> doit reprendre les éléments matériel et moral <strong>tels que dans le programme</strong>
              (titres EXACTS), pas une paraphrase approximative.
            </p>
          </MethodoRappel>
          <MethodoRappel title='Piège fréquent' variant='warn'>
            <p>
              Mélanger sur la copie d’épreuve 1 des développements procéduraux longs, ou inversement : développer du DPG dans l’articulation au lieu
              d’enchaîner les actes. <strong>Une épreuve = un registre.</strong>
            </p>
          </MethodoRappel>
        </div>

        <ul className='grid gap-8 lg:grid-cols-3'>
          {epreuves.map((e) => {
            const Icon = e.icon;
            return (
              <li key={e.href}>
                <GlassCard
                  padding='p-0'
                  className={`flex h-full flex-col overflow-hidden border bg-gradient-to-br ${e.accent}`}
                >
                  <div className='border-b border-white/10 p-6'>
                    <div className='flex items-start justify-between gap-3'>
                      <span className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white'>
                        <Icon className='size-6' aria-hidden />
                      </span>
                      <span className='rounded-full bg-black/30 px-2.5 py-1 text-xs font-bold text-gray-300'>
                        Épreuve {e.num}
                      </span>
                    </div>
                    <h2 className='mt-4 font-display text-xl font-bold text-white'>{e.titre}</h2>
                    <p className='mt-1 text-sm text-gray-400'>
                      Durée indicative : <strong className='text-gray-200'>{e.duree}</strong>
                    </p>
                    <p className='mt-2 text-sm text-gray-300'>{e.focus}</p>
                  </div>
                  <div className='flex flex-1 flex-col gap-3 p-6 pt-4'>
                    <p className='text-xs font-bold uppercase tracking-wide text-gray-500'>Attendus correcteurs</p>
                    <ul className='flex-1 space-y-2 text-sm text-gray-300'>
                      {e.attendus.map((a) => (
                        <li key={a} className='flex gap-2'>
                          <span className='mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400/80' aria-hidden />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={e.href}
                      className='mt-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15'
                    >
                      Voir la méthode détaillée
                      <ArrowRight className='size-4' aria-hidden />
                    </Link>
                  </div>
                </GlassCard>
              </li>
            );
          })}
        </ul>

        <div className='mt-12 flex flex-wrap gap-4 text-sm'>
          <Link href='/guide-revision-opj' className='text-violet-300 underline-offset-4 hover:underline'>
            Guide de révision OPJ
          </Link>
          <span className='text-gray-600'>·</span>
          <Link href='/cours/enquetes' className='text-violet-300 underline-offset-4 hover:underline'>
            Enquêtes planches
          </Link>
          <span className='text-gray-600'>·</span>
          <Link href='/entrainement/articulation' className='text-violet-300 underline-offset-4 hover:underline'>
            Articulation interactive
          </Link>
          <span className='text-gray-600'>·</span>
          <Link href='/entrainement/recapitulatif' className='text-violet-300 underline-offset-4 hover:underline'>
            Récap infractions
          </Link>
        </div>
    </InteriorPageShell>
  );
}
