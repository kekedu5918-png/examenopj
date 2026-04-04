import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalProse, LegalSection } from '@/components/legal/legal-prose';
import { APP_NAME, APP_TAGLINE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'À propos',
  description: `${APP_NAME} : mission, méthode de révision et contenus pédagogiques indépendants pour préparer le concours OPJ.`,
  alternates: { canonical: '/a-propos' },
};

export default function AProposPage() {
  return (
    <LegalProse title={`À propos — ${APP_NAME}`}>
      <p className='text-base text-slate-200'>
        {APP_NAME} est une plateforme de révision dédiée à la préparation du concours d’<strong>officier de police judiciaire</strong>, avec un
        focus sur les <strong>épreuves écrites et l’oral</strong>, la <strong>méthodologie</strong> et la <strong>mémorisation</strong> des
        référentiels pénal et de procédure.
      </p>

      <LegalSection title='Notre approche'>
        <p>
          Nous structurons le programme autour de <strong>fiches de cours synthétiques</strong> (titres de modules F01–F15), complétées par des{' '}
          <strong>quiz</strong>, des <strong>flashcards</strong> et des <strong>outils de révision</strong>. Les textes juridiques à valeur
          normative restent ceux publiés sur Légifrance et vos supports de formation.
        </p>
      </LegalSection>

      <LegalSection title='Indépendance et exactitude'>
        <p>
          {APP_NAME} est un <strong>outil éditorial et pédagogique indépendant</strong>. Il ne remplace ni les enseignements institutionnels ni les
          textes en vigueur. En cas de doute, vérifiez toujours les <strong>sources officielles</strong> (Légifrance, Journal officiel,
          circulaires).
        </p>
      </LegalSection>

      <LegalSection title='Confiance et transparence'>
        <p>
          Les pages <Link href='/mentions-legales'>Mentions légales</Link> et <Link href='/cgv'>CGV</Link> décrivent l’édition du service, les
          conditions d’abonnement et le traitement des données. Pour nous écrire : <Link href='/contact'>Contact</Link>.
        </p>
      </LegalSection>

      <p className='text-xs text-slate-500'>
        {APP_TAGLINE} — plateforme éditoriale. Les marques et sigles cités le sont à titre d’information ; {APP_NAME} n’est pas un service de
        l’administration.
      </p>
    </LegalProse>
  );
}
