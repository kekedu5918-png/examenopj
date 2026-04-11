import type { Metadata } from 'next';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { LegalProse, LegalSection } from '@/components/legal/legal-prose';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { APP_NAME } from '@/constants/site';
import { openGraphForPage } from '@/utils/seo-metadata';

const title = 'Mentions légales';
const description = `Éditeur, hébergement et propriété intellectuelle — ${APP_NAME}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/mentions-legales' },
  ...openGraphForPage('/mentions-legales', title, description),
};

export default function MentionsLegalesPage() {
  return (
    <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.legal} pad='default'>
    <LegalProse title='Mentions légales' className='px-0 py-0'>
      <LegalSection title='Éditeur du site'>
        <p>
          <strong>Raison sociale : ExamenOPJ</strong>
          <br />
          Forme juridique : Entrepreneur individuel
          <br />
          Siège social : Paris, France
          <br />
          Directeur de la publication : l&apos;auteur du site (contact disponible via la page{' '}
          <a href='/contact' className='text-cyan-400 underline-offset-2 hover:underline'>
            Contact
          </a>
          ).
          <br />
          Contact :{' '}
          <a href='/contact' className='text-cyan-400 underline-offset-2 hover:underline'>
            formulaire de contact
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title='Hébergement'>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
          —{' '}
          <a
            href='https://vercel.com/legal/privacy-policy'
            className='text-cyan-400 underline-offset-2 hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            vercel.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title='Propriété intellectuelle'>
        <p>
          L&apos;ensemble des éléments du site (structure, textes, logos, interfaces) est la propriété de
          l&apos;Éditeur ou de ses partenaires, sauf mention contraire. Les contenus pédagogiques issus du programme
          officiel restent soumis aux droits des organismes concernés ; {APP_NAME} propose une mise en forme et des
          outils de révision sans se substituer aux supports institutionnels.
        </p>
      </LegalSection>

      <LegalSection title='Limitation de responsabilité'>
        <p>
          L&apos;Éditeur s&apos;efforce d&apos;assurer l&apos;exactitude des informations mais ne garantit pas
          l&apos;exhaustivité ou l&apos;actualisation en temps réel par rapport aux textes législatifs. L&apos;utilisateur
          reste seul responsable de son usage des contenus dans un cadre professionnel ou d&apos;examen.
        </p>
      </LegalSection>

      <LegalSection title='Données personnelles'>
        <p>
          Les traitements de données liés au compte, à la facturation et à l&apos;analytics sont réalisés conformément
          au Règlement (UE) 2016/679 (RGPD). Pour exercer vos droits : contactez-nous via la page Contact en précisant
          votre demande et une pièce d&apos;identité si nécessaire.
        </p>
      </LegalSection>

      <p className='text-xs text-slate-500'>Dernière mise à jour : avril 2026.</p>
    </LegalProse>
    </InteriorPageShell>
  );
}
