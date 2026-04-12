import type { Metadata } from 'next';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FileText,
  Layers2,
  Mic,
  PenLine,
  Sparkles,
  Target,
} from 'lucide-react';
import type { ReactNode } from 'react';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { EXAM_SHORT_LABEL, type ExamNumber } from '@/data/exam-competency-map';
import { cn } from '@/utils/cn';
import { openGraphForPage } from '@/utils/seo-metadata';

type CardExamFocus = ExamNumber | 'transversal';

const entTitle = 'Entraînement — Examen OPJ';
const entDescription =
  'Outils classés par épreuve : DPS (écrit 1), procédure et dossier (écrit 2), oral — plus le transversal (parcours, sujets blancs).';

export const metadata: Metadata = {
  title: entTitle,
  description: entDescription,
  alternates: { canonical: '/entrainement' },
  ...openGraphForPage('/entrainement', entTitle, entDescription),
};

const iconClass = 'size-8 shrink-0 text-cyan-300';
const stroke = 1.75;

type HubCard = {
  href: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
  badge: string | null;
  badgeClass?: string;
  exam: CardExamFocus;
};

function ExamTag({ n }: { n: CardExamFocus }) {
  if (n === 'transversal') {
    return (
      <span className='rounded-full border border-cyan-500/35 bg-cyan-500/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-100'>
        E1–E3
      </span>
    );
  }
  const cls =
    n === 1 ? 'border-rose-500/35 bg-rose-500/12 text-rose-100' : n === 2 ? 'border-amber-500/35 bg-amber-500/12 text-amber-100' : 'border-violet-500/35 bg-violet-500/12 text-violet-100';
  return (
    <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', cls)}>E{n}</span>
  );
}

const cardsE1: HubCard[] = [
  {
    href: '/entrainement/quiz',
    Icon: Target,
    title: 'Quiz',
    desc: 'QCM par thème F01–F15, domaine DPS/DPG/procédure ou mode global — socle Épreuve 1.',
    badge: '400+ questions',
    badgeClass: 'bg-rose-500/15 text-rose-200',
    exam: 1,
  },
  {
    href: '/entrainement/flashcards',
    Icon: Layers2,
    title: 'Flashcards',
    desc: 'Éléments constitutifs et titres du programme : mémorisation active pour l’écrit.',
    badge: '55+ infractions',
    badgeClass: 'bg-rose-500/15 text-rose-200',
    exam: 1,
  },
  {
    href: '/entrainement/recapitulatif',
    Icon: BarChart3,
    title: 'Tableau récapitulatif',
    desc: 'Vue synthétique légal / matériel / moral — utile dissertation et cas pratiques.',
    badge: null,
    exam: 1,
  },
];

const cardsE2: HubCard[] = [
  {
    href: '/entrainement/articulation',
    Icon: ClipboardList,
    title: 'Articulation de procédure',
    desc: 'Cartouches qualification / actes — cœur de l’épreuve dossier.',
    badge: 'Cartouches',
    badgeClass: 'bg-amber-500/15 text-amber-200',
    exam: 2,
  },
  {
    href: '/entrainement/redaction-pv',
    Icon: PenLine,
    title: 'Atelier rédaction PV',
    desc: 'Gabarit ME1, mentions légales et correction IA (Premium).',
    badge: 'IA',
    badgeClass: 'bg-violet-500/20 text-violet-200',
    exam: 2,
  },
  {
    href: '/entrainement/enquetes',
    Icon: FileText,
    title: 'Enquêtes type examen OPJ',
    desc: 'Planches complètes : sujet, PV, articulation — pont vers épreuve 2.',
    badge: null,
    exam: 2,
  },
  {
    href: '/entrainement/rapport-synthese',
    Icon: FileText,
    title: 'Rapport de synthèse',
    desc: 'Dossiers type parquet, onglets et chronologie pour la rédaction sous contrainte.',
    badge: 'IA',
    badgeClass: 'bg-violet-500/20 text-violet-200',
    exam: 2,
  },
];

const cardsE3: HubCard[] = [
  {
    href: '/epreuves/epreuve-3',
    Icon: Mic,
    title: 'Méthode Épreuve 3',
    desc: 'Structure du compte-rendu, axes et pièges fréquents devant le jury.',
    badge: null,
    exam: 3,
  },
  {
    href: '/infractions',
    Icon: BookOpen,
    title: 'Référentiel infractions',
    desc: 'Répondre avec précision sur qualification et éléments — utile aux questions orales.',
    badge: null,
    exam: 3,
  },
];

const cardsTransversal: HubCard[] = [
  {
    href: '/epreuves',
    Icon: Sparkles,
    title: 'Les 3 épreuves',
    desc: 'Vue d’ensemble des attendus et accès direct à chaque épreuve.',
    badge: null,
    exam: 'transversal',
  },
  {
    href: '/cours',
    Icon: BookOpen,
    title: 'Fiches cours',
    desc: 'Contenu central (/content/cours) — filtrable sur la page Cours.',
    badge: null,
    exam: 'transversal',
  },
];

function CardGrid({ items }: { items: HubCard[] }) {
  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {items.map((c) => {
        const { Icon } = c;
        return (
          <Link
            key={c.href}
            href={c.href}
            className='group block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50'
          >
            <GlassCard padding='p-6' radius='3xl' topGlow className='h-full transition hover:border-cyan-500/25'>
              <div className='flex items-start justify-between gap-3'>
                <Icon className={iconClass} strokeWidth={stroke} aria-hidden />
                <div className='flex shrink-0 flex-wrap items-center justify-end gap-1'>
                  <ExamTag n={c.exam} />
                  {c.badge ? (
                    <span className={cn('rounded-full px-2.5 py-0.5 text-[10px] font-semibold', c.badgeClass)}>{c.badge}</span>
                  ) : null}
                </div>
              </div>
              <h3 className='mt-4 font-sans text-xl font-extrabold tracking-tight text-white'>{c.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-slate-400'>{c.desc}</p>
              <p className='mt-4 text-sm font-semibold text-cyan-400'>Ouvrir →</p>
            </GlassCard>
          </Link>
        );
      })}
    </div>
  );
}

function SectionBlock({
  examNum,
  title,
  subtitle,
  children,
}: {
  examNum: ExamNumber;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className='scroll-mt-24' aria-labelledby={`ent-${examNum}`}>
      <div className='mb-6 flex flex-wrap items-baseline gap-3'>
        <ExamTag n={examNum} />
        <h2 id={`ent-${examNum}`} className='font-sans text-xl font-extrabold tracking-tight text-white md:text-2xl'>
          {title}
        </h2>
      </div>
      <p className='mb-6 max-w-3xl text-sm text-slate-400'>{subtitle}</p>
      {children}
    </section>
  );
}

export default function EntrainementHubPage() {
  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.entrainement} pad='default'>
      <SectionTitle
        badge='RÉVISION'
        badgeClassName='text-cyan-200'
        title='Entraînement'
        titleGradient
        size='display'
        subtitle='Chaque outil est étiqueté E1 / E2 / E3 selon l’épreuve qu’il sert le plus. Enchaînez d’abord les fiches cours, puis le mode d’entraînement correspondant.'
        className='mb-12'
      />

      <div className='space-y-16'>
        <SectionBlock
          examNum={1}
          title={EXAM_SHORT_LABEL[1]}
          subtitle='Dissertation ou cas pratique sans documents : qualifications du programme, structure PRQC, peines et compétence lorsque le sujet l’exige.'
        >
          <CardGrid items={cardsE1} />
        </SectionBlock>

        <SectionBlock
          examNum={2}
          title={EXAM_SHORT_LABEL[2]}
          subtitle='Dossier avec codes : articulation, PV, questions ciblées — calé sur la même logique que les sujets blancs et les enquêtes type examen OPJ.'
        >
          <CardGrid items={cardsE2} />
        </SectionBlock>

        <SectionBlock
          examNum={3}
          title={EXAM_SHORT_LABEL[3]}
          subtitle='Synthèse orale et réponses jury : précision technique + posture professionnelle.'
        >
          <CardGrid items={cardsE3} />
        </SectionBlock>

        <section className='border-t border-white/[0.08] pt-12' aria-labelledby='ent-transversal'>
          <h2 id='ent-transversal' className='font-sans text-xl font-extrabold tracking-tight text-white md:text-2xl'>
            Transversal
          </h2>
          <p className='mt-2 mb-6 max-w-3xl text-sm text-slate-400'>
            Parcours complet, simulations trois épreuves et guide : à combiner avec les sections ci-dessus.
          </p>
          <CardGrid items={cardsTransversal} />
        </section>

        <p className='text-center text-sm text-slate-500'>
          <Link href='/cours' className='font-medium text-cyan-400/90 underline-offset-2 hover:text-cyan-300 hover:underline'>
            Fiches cours (content/cours)
          </Link>
          {' · '}
          <Link href='/epreuves' className='font-medium text-cyan-400/90 underline-offset-2 hover:text-cyan-300 hover:underline'>
            Détail des trois épreuves
          </Link>
        </p>
      </div>
    </InteriorPageShell>
  );
}
