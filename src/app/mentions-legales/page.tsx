import type { Metadata } from 'next';

import { LegalProse, LegalSection } from '@/components/legal/legal-prose';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Informations sur l’éditeur, l’hébergement et la propriété intellectuelle — ExamenOPJ.',
};

export default function MentionsLegalesPage() {
  return (
    <LegalProse title='Mentions légales'>
      <p className='rounded-lg border border-slate-600/50 bg-slate-900/80 p-4 text-slate-400'>
        Complétez les champs <strong>[À compléter]</strong> avec les informations de votre structure avant diffusion
        publique.
      </p>

      <LegalSection title='Éditeur du site'>
        <p>
          <strong>[À compléter : raison sociale]</strong>
          <br />
          [À compléter : forme juridique — adresse du siège]
          <br />
          SIREN / SIRET : [À compléter]
          <br />
          TVA intracommunautaire : [À compléter si applicable]
          <br />
          Directeur de la publication : [À compléter]
          <br />
          Contact : voir la page{' '}
          <a href='/contact' className='text-cyan-400 underline-offset-2 hover:underline'>
            Contact
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
          officiel restent soumis aux droits des organismes concernés ; ExamenOPJ propose une mise en forme et des outils
          de révision sans se substituer aux supports institutionnels.
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
  );
}
