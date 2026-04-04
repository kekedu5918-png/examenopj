import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalProse, LegalSection } from '@/components/legal/legal-prose';
import { APP_NAME, APP_TAGLINE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'À propos',
  description: `${APP_NAME} : mission, sources pédagogiques (SDCP), méthode de révision et indépendance vis-à-vis de l’administration.`,
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
          Nous structurons le programme autour des <strong>fascicules et documents de référence</strong> utilisés dans le cursus (dont les
          supports SDCP / Académie de Police lorsque intégrés dans l’outil), complétés par des <strong>quiz</strong>, des{' '}
          <strong>flashcards</strong> et des <strong>fiches de synthèse</strong> pour ancrer les notions et les infractions clés.
        </p>
      </LegalSection>

      <LegalSection title='Indépendance et exactitude'>
        <p>
          {APP_NAME} est un <strong>outil éditorial et pédagogique indépendant</strong>. Il ne remplace ni les enseignements officiels ni les
          textes en vigueur. Les contenus peuvent évoluer après mise à jour législative ou réglementaire : en cas de doute, vérifiez toujours
          les <strong>sources officielles</strong> (Légifrance, BO, circulaires, fascicules à jour).
        </p>
      </LegalSection>

      <LegalSection title='Confiance et transparence'>
        <p>
          Les pages <Link href='/mentions-legales'>Mentions légales</Link> et <Link href='/cgv'>CGV</Link> décrivent l’édition du service, les
          conditions d’abonnement et le traitement des données. Pour nous écrire : <Link href='/contact'>Contact</Link>.
        </p>
      </LegalSection>

      <p className='text-xs text-slate-500'>
        {APP_TAGLINE} — Objectif : vous donner un cadre clair, exigeant et réutilisable jusqu’à l’examen.
      </p>
    </LegalProse>
  );
}
