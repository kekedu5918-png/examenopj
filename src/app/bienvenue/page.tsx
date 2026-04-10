import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { openGraphForPage } from '@/utils/seo-metadata';

import { BienvenueStepper } from './bienvenue-stepper';

const title = 'Bienvenue — ExamenOPJ';
const description = 'Parcours de démarrage : épreuves, quiz, enquête Alpha, guide de révision.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/bienvenue' },
  ...openGraphForPage('/bienvenue', title, description),
};

const STEPS = [
  {
    n: 1,
    title: 'Découvre les épreuves (5 min)',
    desc: "Comprends ce qu'on va te demander le jour J.",
    href: '/epreuves',
    cta: 'Lire la présentation des épreuves',
  },
  {
    n: 2,
    title: 'Fais ton premier quiz (5 min)',
    desc: 'Teste-toi sur une infraction. Vois où tu en es.',
    href: '/quiz',
    cta: 'Lancer le quiz',
  },
  {
    n: 3,
    title: "Ouvre une enquête (15 min)",
    desc: "Plonge dans un cadre d'enquête complet.",
    href: '/cours/enquetes/alpha',
    cta: 'Commencer par Alpha (vol simple)',
  },
  {
    n: 4,
    title: 'Consulte le guide de révision',
    desc: "Planifie tes révisions jusqu'au 11 juin.",
    href: '/guide-revision-opj',
    cta: 'Lire le guide',
  },
] as const;

export default async function BienvenuePage() {
  const session = await getSession();
  if (!session) {
    redirect('/inscription');
  }

  return (
    <main className='mx-auto max-w-2xl px-4 py-14 md:py-20'>
      <h1 className='font-display text-3xl font-bold text-white'>Bienvenue. Voici comment commencer.</h1>
      <p className='mt-3 text-slate-400'>
        Quatre étapes pour ne jamais te demander quoi faire en premier.
      </p>

      <BienvenueStepper steps={STEPS} />

      <p className='mt-8 text-center text-sm text-slate-500'>
        <Link href='/accueil' className='text-examen-accent hover:underline'>
          Aller à l&apos;accueil →
        </Link>
      </p>
    </main>
  );
}
