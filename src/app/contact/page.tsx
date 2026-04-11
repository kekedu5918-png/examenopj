import type { Metadata } from 'next';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { openGraphForPage } from '@/utils/seo-metadata';

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact@examenopj.fr';

const contactTitle = 'Contact';
const contactDescription = 'Contacter l’équipe ExamenOPJ.';

export const metadata: Metadata = {
  title: contactTitle,
  description: contactDescription,
  alternates: { canonical: '/contact' },
  ...openGraphForPage('/contact', contactTitle, contactDescription),
};

export default function ContactPage() {
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent('Contact ExamenOPJ')}`;

  return (
    <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.contact} pad='default'>
    <article className='mx-auto max-w-2xl text-slate-300'>
      <h1 className='mb-4 font-display text-3xl font-bold text-white'>Contact</h1>
      <p className='mb-8 text-sm leading-relaxed text-slate-400'>
        Pour toute question sur l&apos;abonnement, un problème technique ou une demande liée aux données personnelles,
        écrivez-nous à l&apos;adresse ci-dessous. Nous répondons en général sous quelques jours ouvrés.
      </p>
      <a
        href={mailto}
        className='inline-flex rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-6 py-4 text-base font-semibold text-cyan-200 transition-colors hover:border-cyan-400/60 hover:bg-cyan-500/15'
      >
        {contactEmail}
      </a>
      <p className='mt-8 text-xs text-slate-500'>
        Adresse configurable via la variable d&apos;environnement{' '}
        <code className='rounded bg-slate-800 px-1.5 py-0.5 text-slate-300'>NEXT_PUBLIC_CONTACT_EMAIL</code>.
      </p>
    </article>
    </InteriorPageShell>
  );
}
