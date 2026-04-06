import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { LegalProse } from '@/components/legal/legal-prose';
import { APP_NAME } from '@/constants/site';
import { cn } from '@/utils/cn';
import { openGraphForPage } from '@/utils/seo-metadata';

const title = 'À propos';
const description = `${APP_NAME} : mission, alignement sur le programme officiel et outils pensés pour l’examen OPJ juin 2026.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/a-propos' },
  ...openGraphForPage('/a-propos', title, description),
};

const cards = [
  {
    icon: '🎯',
    title: 'Aligné sur le programme officiel',
    body: 'Chaque contenu est structuré sur les 15 fascicules SDCP et les textes du Code pénal et du Code de procédure pénale en vigueur.',
  },
  {
    icon: '🔄',
    title: 'Mis à jour en continu',
    body: 'Les évolutions législatives sont intégrées dès leur publication. En cas de doute, vérifiez toujours les sources officielles sur Légifrance.',
  },
  {
    icon: '📐',
    title: 'Conçu pour l’examen',
    body: "Chaque outil (quiz, flashcards, articulation) reproduit la logique réelle des épreuves — pas de la théorie déconnectée du terrain.",
  },
] as const;

export default function AProposPage() {
  return (
    <LegalProse title={`À propos — ${APP_NAME}`}>
      <section className='not-prose mb-12 flex flex-col gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:flex-row md:items-center md:gap-10 md:p-8'>
        <div className='relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-examen-accent/40 bg-examen-accent/15 md:mx-0'>
          {/* Avatar générique — TODO: remplacer par une photo d’équipe ou du fondateur (droit à l’image / charte). */}
          <Image
            src='/a-propos-avatar.svg'
            alt='Illustration profil — ExamenOPJ'
            width={112}
            height={112}
            className='object-cover'
            priority
          />
        </div>
        <div>
          <h2 className='font-display text-xl font-bold text-white'>Qui sommes-nous ?</h2>
          <p className='mt-3 text-sm leading-relaxed text-slate-300'>
            {/* TODO: remplacer le pseudo et l’intitulé par l’identité réelle publiable. */}
            <strong>ExamenOPJ</strong> est développé par un candidat{' '}
            <strong>reçu à l’examen OPJ</strong>, en s’appuyant sur l’expérience de préparation (écrits, procédure, oral)
            et sur le suivi des sessions récentes. L’objectif est simple : concentrer méthode, répétition et contenus à
            jour — sans remplacer votre formation institutionnelle ni les textes officiels.
          </p>
        </div>
      </section>

      <p className='text-base text-slate-200'>
        {APP_NAME} est une plateforme de révision pour la préparation au concours d&apos;
        <strong>officier de police judiciaire</strong>, avec un accent sur les <strong>épreuves écrites</strong>, l&apos;
        <strong>oral</strong> et la <strong>procédure pénale</strong>.
      </p>

      <section aria-labelledby='engagement-title' className='not-prose mt-12'>
        <h2 id='engagement-title' className='font-display text-2xl font-bold tracking-tight text-white'>
          Notre engagement
        </h2>
        <div className='mt-8 grid gap-6 md:grid-cols-3'>
          {cards.map((c) => (
            <article
              key={c.title}
              className={cn(
                'rounded-[12px] border border-white/[0.06] bg-white/[0.03] p-6',
                'shadow-ex-card transition hover:border-white/[0.1] hover:shadow-ex-card-hover',
              )}
            >
              <p className='text-2xl' aria-hidden>
                {c.icon}
              </p>
              <h3 className='mt-3 font-display text-lg font-bold text-white'>{c.title}</h3>
              <p className='mt-3 text-sm leading-relaxed text-slate-400'>{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='mt-12'>
        <h2 className='font-display text-xl font-bold text-white'>Indépendance</h2>
        <p className='mt-3 text-slate-300'>
          {APP_NAME} est un <strong>outil éditorial et pédagogique indépendant</strong>. Il ne remplace ni les enseignements
          institutionnels ni les textes en vigueur. Les pages{' '}
          <Link href='/mentions-legales' className='text-cyan-400 hover:underline'>
            Mentions légales
          </Link>{' '}
          et{' '}
          <Link href='/cgv' className='text-cyan-400 hover:underline'>
            CGV
          </Link>{' '}
          décrivent l&apos;édition et les conditions d&apos;abonnement.{' '}
          <Link href='/contact' className='text-cyan-400 hover:underline'>
            Contact
          </Link>
        </p>
      </section>
    </LegalProse>
  );
}
