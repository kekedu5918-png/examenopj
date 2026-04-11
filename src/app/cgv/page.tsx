import type { Metadata } from 'next';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { LegalProse, LegalSection } from '@/components/legal/legal-prose';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { openGraphForPage } from '@/utils/seo-metadata';

const cgvTitle = 'Conditions générales de vente';
const cgvDescription = "Conditions d'abonnement et d'utilisation du service ExamenOPJ.";

export const metadata: Metadata = {
  title: cgvTitle,
  description: cgvDescription,
  alternates: { canonical: '/cgv' },
  ...openGraphForPage('/cgv', cgvTitle, cgvDescription),
};

export default function CgvPage() {
  return (
    <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.legal} pad='default'>
    <LegalProse title='Conditions générales de vente (CGV)' className='px-0 py-0'>
      <p className='rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100/90'>
        Document type à adapter : remplacez les mentions « [À compléter] » par vos données juridiques (raison sociale,
        SIREN, siège, TVA) avant mise en production.
      </p>

      <LegalSection title='1. Objet'>
        <p>
          Les présentes CGV régissent la vente d&apos;abonnements numériques au service <strong>ExamenOPJ</strong>{' '}
          (ci-après le « Service »), édité par <strong>[À compléter : dénomination sociale]</strong>, [À compléter :
          forme juridique et capital], dont le siège est situé [À compléter : adresse] (ci-après « l&apos;Éditeur »).
        </p>
      </LegalSection>

      <LegalSection title='2. Services'>
        <p>
          Le Service propose des contenus et outils de révision en ligne (fiches de cours, quiz, flashcards, espace
          membre). Les fonctionnalités exactes dépendent de l&apos;offre souscrite au jour de la commande.
        </p>
      </LegalSection>

      <LegalSection title='3. Commande et compte'>
        <p>
          Toute commande implique l&apos;acceptation sans réserve des présentes CGV. L&apos;utilisateur fournit des
          informations exactes lors de la création de compte et en assure la confidentialité de ses identifiants.
        </p>
      </LegalSection>

      <LegalSection title='4. Tarifs et paiement'>
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises le cas échéant. Le paiement est réalisé via le
          prestataire <strong>Stripe</strong>. L&apos;Éditeur ne conserve pas les coordonnées bancaires complètes.
        </p>
      </LegalSection>

      <LegalSection title='5. Durée et résiliation'>
        <p>
          L&apos;abonnement est reconductible selon les modalités affichées sur la page Tarifs (mensuel, annuel, etc.).
          L&apos;utilisateur peut résilier son renouvellement depuis son espace compte ou les liens fournis par Stripe,
          sous réserve des délais techniques du prestataire de paiement.
        </p>
      </LegalSection>

      <LegalSection title='6. Droit de rétractation (consommateurs)'>
        <p>
          Pour un contrat conclu à distance, le consommateur dispose d&apos;un délai de rétractation de 14 jours sauf
          exceptions légales applicables aux contenus numériques fournis immédiatement et avec accord exprès de
          renonciation au délai. Adaptez ce paragraphe avec votre politique réelle et un formulaire de rétractation si
          nécessaire.
        </p>
      </LegalSection>

      <LegalSection title='7. Propriété intellectuelle'>
        <p>
          Les contenus du Service (textes, mise en page, marques, logiciels) sont protégés. Toute reproduction ou
          diffusion hors usage personnel et privé est interdite sans autorisation écrite.
        </p>
      </LegalSection>

      <LegalSection title='8. Responsabilité'>
        <p>
          Le Service est un outil pédagogique d&apos;aide à la préparation d&apos;examens ; il ne constitue ni cours
          officiel ni garantie de réussite. L&apos;Éditeur ne saurait être tenu responsable des dommages indirects ou
          de l&apos;usage fait des contenus par l&apos;utilisateur.
        </p>
      </LegalSection>

      <LegalSection title='9. Données personnelles'>
        <p>
          Le traitement des données est décrit dans les mentions légales et, le cas échéant, dans une politique de
          confidentialité dédiée. Les utilisateurs disposent de droits d&apos;accès, de rectification et de suppression
          conformément au RGPD.
        </p>
      </LegalSection>

      <LegalSection title='10. Droit applicable et litiges'>
        <p>
          Les présentes CGV sont soumises au droit français. À défaut de résolution amiable, compétence attribuée aux
          tribunaux [À compléter : juridiction], sous réserve des règles d&apos;ordre public.
        </p>
      </LegalSection>

      <p className='text-xs text-slate-500'>Dernière mise à jour : avril 2026.</p>
    </LegalProse>
    </InteriorPageShell>
  );
}
