import type { Metadata } from 'next';
import Link from 'next/link';

import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'Modèles de procès-verbaux — Examen OPJ',
  description:
    'Procès-verbaux types : saisines, GAV, auditions, perquisitions, scellés et transmission — méthodologie alignée sur le Code de procédure pénale en vigueur.',
};

const categories = [
  'Saisines',
  'Garde à vue (placement, notification, prolongation, fin)',
  'Avis obligatoires (parquet, famille, avocat, médecin)',
  'Interpellations',
  'Constatations et transport',
  'Perquisitions et fouilles',
  'Auditions (victime, témoin, suspect libre, GAV, confrontation)',
  'Réquisitions',
  'Scellés',
  'Clôture et transmission',
] as const;

const samples = [
  {
    title: 'PV de saisine / plainte',
    articles: ['Art. 15-3 C.P.P.', 'Art. 10-2 C.P.P.'],
    mentions:
      'Identité du plaignant, date/heure/lieu, circonstances, préjudice (matériel, physique, moral), ITT, N° sécurité sociale, partie civile.',
    erreurs:
      'Omission de mentions obligatoires, notification des droits de la victime incomplète, qualification imprécise des faits.',
  },
  {
    title: 'PV de notification de placement en GAV',
    articles: ['Art. 63-1 C.P.P.', 'Art. 62-2 C.P.P.', 'Art. 63-III C.P.P.'],
    mentions:
      'Huit droits (infraction, durée, prévenir un tiers, médecin, avocat, silence, déclarations/interrogatoire, interprète) ; heure de début ; motifs au sens de l’art. 62-2 (six motifs).',
    erreurs:
      'Notification tardive ou imprécise, méconnaissance du chrono GAV, confusion avec audition libre.',
  },
  {
    title: "PV d'audition de victime",
    articles: ['Art. 10-2 C.P.P.'],
    mentions: 'Identité vérifiée, notification des droits, Q/R détaillées, relecture et signature, ITT et partie civile.',
    erreurs: 'Questions orientées, absence de relecture, oubli des droits de la victime.',
  },
  {
    title: "PV d'audition de témoin",
    articles: ['Art. 62 C.P.P.', 'Art. 78 C.P.P.'],
    mentions:
      'Cadre flagrance ou enquête préliminaire, identité, durée (ex. 4 h hors soupçon), Q/R, relecture, pas de serment sauf cas prévus.',
    erreurs:
      'Confusion de qualité (témoin / suspect), absence de relecture, audition au-delà des durées légales.',
  },
  {
    title: "PV d'audition du suspect en audition libre",
    articles: ['Art. 61-1 C.P.P.'],
    mentions:
      'Qualification des faits, droit de quitter les locaux, avocat, interprète, silence, mention explicite : la personne n’est pas en GAV.',
    erreurs:
      'Ambiguïté sur le régime (libre / GAV), défaut de notification des droits spécifiques à l’audition libre.',
  },
  {
    title: 'PV de perquisition',
    articles: ['Art. 56 C.P.P.', 'Art. 76 C.P.P.'],
    mentions:
      'Heures légales (6 h–21 h sauf cas), présence ou deux témoins, assentiment écrit en préliminaire, état des saisies, scellés.',
    erreurs:
      'Nullité pour horaires non dérogés, carence de témoins, inventaire incomplet des supports numériques.',
  },
  {
    title: 'PV de fin de GAV',
    articles: ['Art. 64 C.P.P.'],
    mentions:
      'Motifs, début et fin avec horodatage, auditions et temps de repos, alimentation, destination (liberté, défèrement, etc.).',
    erreurs: 'Délais dépassés, mentions chronologiques incohérentes, destination omise.',
  },
] as const;

export default function ModelesPVPage() {
  return (
    <div className='container pb-20 pt-10'>
      <SectionTitle
        badge='ÉPREUVE 2'
        badgeClassName='bg-emerald-500/20 text-emerald-200'
        title='Procès-verbaux — Modèles et mentions obligatoires'
        subtitle='Structure par rubrique : cartouche, articles, mentions et erreurs fréquentes (nullités possibles)'
        className='mb-8'
      />

      <GlassCard className='mb-10 p-6' padding=''>
        <h2 className='text-sm font-semibold uppercase tracking-wide text-gray-400'>Filtrer par catégorie</h2>
        <ul className='mt-3 flex flex-wrap gap-2'>
          {categories.map((c) => (
            <li key={c}>
              <span className='inline-block rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300'>
                {c}
              </span>
            </li>
          ))}
        </ul>
        <p className='mt-4 text-sm text-gray-500'>
          Chaque PV comporte un <strong className='text-gray-300'>cartouche</strong> (identification du service, affaire,
          date et lieu) et des <strong className='text-gray-300'>mentions légales</strong> renvoyant au C.P.P.
        </p>
      </GlassCard>

      <div className='space-y-6'>
        {samples.map((s) => (
          <article key={s.title} className='rounded-2xl border border-white/10 bg-navy-950/50 p-6'>
            <h2 className='font-display text-lg font-bold text-white'>{s.title}</h2>
            <p className='mt-2 text-xs text-amber-200/80'>
              {s.articles.join(' · ')}
            </p>
            <h3 className='mt-4 text-xs font-bold uppercase tracking-wide text-emerald-400/90'>Mentions / structure</h3>
            <p className='mt-2 text-sm text-gray-300'>{s.mentions}</p>
            <h3 className='mt-4 text-xs font-bold uppercase tracking-wide text-rose-400/90'>Erreurs fréquentes</h3>
            <p className='mt-2 text-sm text-gray-400'>{s.erreurs}</p>
          </article>
        ))}
      </div>

      <p className='mt-12 text-center text-sm text-gray-500'>
        <Link href='/epreuves/epreuve-2' className='text-emerald-400/90 underline-offset-2 hover:underline'>
          ← Retour à l’épreuve 2 — Procédure
        </Link>
      </p>
    </div>
  );
}
