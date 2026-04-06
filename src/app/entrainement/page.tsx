import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, ClipboardList, FileText, Layers2, PenLine, Sparkles, Target } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';
import { openGraphForPage } from '@/utils/seo-metadata';

const entTitle = 'Entraînement — Examen OPJ';
const entDescription =
  'Hub Quiz, flashcards, tableau récapitulatif, ateliers PV et rapports : choisissez votre mode de révision pour le concours OPJ.';

export const metadata: Metadata = {
  title: entTitle,
  description: entDescription,
  alternates: { canonical: '/entrainement' },
  ...openGraphForPage('/entrainement', entTitle, entDescription),
};

const iconClass = 'size-8 shrink-0 text-cyan-300';
const stroke = 1.75;

const cards = [
  {
    href: '/parcours-candidat',
    Icon: ClipboardList,
    title: 'Parcours candidat',
    desc: 'Enchaînement guidé : fondamentaux, récap prioritaire, flashcards, enquêtes, épreuve 2, articulation.',
    badge: 'Recommandé',
    badgeClass: 'bg-amber-500/20 text-amber-200',
  },
  {
    href: '/entrainement/articulation',
    Icon: ClipboardList,
    title: 'Articulation de procédure',
    desc: 'Construisez votre articulation cartouche par cartouche — Épreuve 2',
    badge: 'Épreuve 2',
    badgeClass: 'bg-amber-500/20 text-amber-200',
  },
  {
    href: '/quiz',
    Icon: Target,
    title: 'Quiz',
    desc: 'Testez vos connaissances avec des QCM par thème (F01–F15), domaine ou en mode global.',
    badge: '400+ questions',
    badgeClass: 'bg-amber-500/20 text-amber-200',
  },
  {
    href: '/flashcards',
    Icon: Layers2,
    title: 'Flashcards',
    desc: 'Révisez les éléments constitutifs en retournant les cartes — filtre par module et catégorie.',
    badge: '55+ infractions',
    badgeClass: 'bg-amber-500/20 text-amber-200',
  },
  {
    href: '/entrainement/recapitulatif',
    Icon: BarChart3,
    title: 'Tableau récapitulatif',
    desc: 'Vue synthétique des éléments légal, matériel et moral de chaque infraction.',
    badge: null,
  },
  {
    href: '/entrainement/redaction-pv',
    Icon: PenLine,
    title: 'Atelier rédaction PV',
    desc: 'Gabarit ME1 deux colonnes, modèles et liens vers correction IA (Premium).',
    badge: 'IA',
    badgeClass: 'bg-violet-500/20 text-violet-200',
  },
  {
    href: '/entrainement/rapport-synthese',
    Icon: FileText,
    title: 'Rapport de synthèse',
    desc: 'Dossiers complets type parquet, chrono, onglets dossier / rédaction / correction IA.',
    badge: 'IA',
    badgeClass: 'bg-violet-500/20 text-violet-200',
  },
  {
    href: '/sujets-blancs',
    Icon: Sparkles,
    title: 'Sujets blancs complets',
    desc: 'Trois sessions fictives : les 3 épreuves d’un même examen — contenu Premium.',
    badge: 'Nouveau',
    badgeClass: 'bg-emerald-500/20 text-emerald-200',
  },
] as const;

export default function EntrainementHubPage() {
  return (
    <div className='container pb-20 pt-10 md:pt-14'>
      <SectionTitle
        badge='RÉVISION'
        badgeClassName='bg-cyan-500/20 text-cyan-200'
        title='Entraînement'
        subtitle='Choisissez votre mode de révision'
        className='mb-10'
      />

      <div className='grid gap-6 md:grid-cols-2'>
        {cards.map((c) => {
          const { Icon } = c;
          return (
            <Link
              key={c.href}
              href={c.href}
              className='group block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50'
            >
              <GlassCard padding='p-6' className='h-full transition hover:border-cyan-500/25'>
                <div className='flex items-start justify-between gap-3'>
                  <Icon className={iconClass} strokeWidth={stroke} aria-hidden />
                  {c.badge ? (
                    <span className={cn('shrink-0 rounded-full px-3 py-1 text-xs font-semibold', c.badgeClass)}>
                      {c.badge}
                    </span>
                  ) : null}
                </div>
                <h2 className='mt-4 font-display text-xl font-bold text-white'>{c.title}</h2>
                <p className='mt-2 text-sm leading-relaxed text-gray-400'>{c.desc}</p>
                <p className='mt-4 text-sm font-medium text-cyan-400'>Ouvrir</p>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
