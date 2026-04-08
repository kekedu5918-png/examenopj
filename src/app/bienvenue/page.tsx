import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

import { getSession } from '@/features/account/controllers/get-session';
import { openGraphForPage } from '@/utils/seo-metadata';

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
    desc: 'Comprends ce qu’on va te demander le jour J.',
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
    title: 'Ouvre une enquête (15 min)',
    desc: 'Plonge dans un cadre d’enquête complet.',
    href: '/cours/enquetes/alpha',
    cta: 'Commencer par Alpha (vol simple)',
  },
  {
    n: 4,
    title: 'Consulte le guide de révision',
    desc: 'Planifie tes révisions jusqu’au 11 juin.',
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

      <ol className='mt-10 space-y-6'>
        {STEPS.map((s) => (
          <li
            key={s.n}
            className='rounded-2xl border border-white/10 bg-white/[0.03] p-6'
          >
            <div className='flex items-start gap-4'>
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-examen-accent/20 text-sm font-bold text-examen-accent'>
                {s.n}
              </span>
              <div className='min-w-0 flex-1'>
                <h2 className='font-display text-lg font-semibold text-white'>{s.title}</h2>
                <p className='mt-1 text-sm text-slate-400'>{s.desc}</p>
                <Link
                  href={s.href}
                  className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-examen-accent hover:underline'
                >
                  {s.cta} →
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className='mt-10 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100'>
        <CheckCircle2 className='h-5 w-5 shrink-0' aria-hidden />
        <span>
          Progression : coche mentalement chaque étape — <strong>0/4</strong> (local, dans ta tête ou ton carnet).
        </span>
      </div>

      <p className='mt-8 text-center text-sm text-slate-500'>
        <Link href='/accueil' className='text-examen-accent hover:underline'>
          Aller à l&apos;accueil →
        </Link>
      </p>
    </main>
  );
}
