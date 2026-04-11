import type { Metadata } from 'next';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { LegalProse } from '@/components/legal/legal-prose';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { APP_NAME } from '@/constants/site';
import { openGraphForPage } from '@/utils/seo-metadata';

const title = "À propos d'ExamenOPJ";
const description = `${APP_NAME} — rédigé par un gardien de la paix en formation OPJ à Paris ; contenu issu de la formation en présentiel.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/a-propos' },
  ...openGraphForPage('/a-propos', title, description),
};

export default function AProposPage() {
  return (
    <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.aPropos} pad='default'>
    <LegalProse title={title} className='px-0 py-0'>
      <section className='not-prose space-y-4'>
        <h2 className='font-display text-xl font-bold text-white'>Qui crée ce contenu ?</h2>
        <div className='space-y-4 text-base leading-relaxed text-slate-300'>
          <p>
            {APP_NAME} est rédigé par un gardien de la paix à Paris, actuellement en formation OPJ en présentiel.
          </p>
          <p>L&apos;identité reste volontairement anonyme pour des raisons professionnelles.</p>
          <p>
            La légitimité du contenu repose sur une seule chose : ce site retranscrit la formation réelle, au fil des
            cours.
          </p>
          <p>Ce que tu révises ici, c&apos;est ce qui est enseigné aujourd&apos;hui.</p>
        </div>
      </section>

      <section className='not-prose mt-12 space-y-4'>
        <h2 className='font-display text-xl font-bold text-white'>Pourquoi ce site existe ?</h2>
        <div className='space-y-4 text-base leading-relaxed text-slate-300'>
          <p>
            La préparation à l&apos;examen OPJ manque d&apos;outils précis et calés sur le programme réel. Les ressources
            existantes sont soit trop généralistes, soit déconnectées de ce que l&apos;examen demande concrètement.
          </p>
          <p>
            {APP_NAME} comble ce manque : enquêtes types issues de la formation, modèles de PV conformes aux fascicules,
            méthode d&apos;articulation, infractions exhaustives.
          </p>
        </div>
      </section>

      <section className='not-prose mt-12 space-y-4'>
        <h2 className='font-display text-xl font-bold text-white'>Ce que ce site n&apos;est pas</h2>
        <div className='space-y-4 text-base leading-relaxed text-slate-300'>
          <p>{APP_NAME} est un outil de révision indépendant.</p>
          <p>
            Il ne remplace pas la formation officielle, les fascicules SDCP, ni les consignes de tes formateurs. Il
            n&apos;est pas affilié à la Police nationale ni à aucune administration.
          </p>
        </div>
      </section>

      <p className='not-prose mt-12 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center text-xs leading-relaxed text-slate-400'>
        Gardien de la paix · Formation OPJ 2026 · Paris
        <br />
        Site indépendant · Non affilié à l&apos;administration
      </p>
    </LegalProse>
    </InteriorPageShell>
  );
}
