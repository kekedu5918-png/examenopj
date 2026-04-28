import Link from 'next/link';

import type { InfractionCatalogItem } from '@/data/recapitulatif-data';
import { getSiteUrl } from '@/utils/site-url';

function stripInfractionTitle(raw: string): string {
  return raw.replace(/\*\*/g, '').replace(/\*/g, '').trim();
}

type Props = {
  catalog: InfractionCatalogItem[];
};

/** Liste compacte indexable (titres seuls) — complète le bloc accordéon interactif plus haut. */
export function HomeInfractionsSeoIndex({ catalog }: Props) {
  const base = getSiteUrl();
  const sample = catalog.slice(0, 72);

  return (
    <section
      className='border-t border-ij-border/40 bg-ij-bg/80 px-4 py-12 md:py-16'
      aria-labelledby='home-infractions-index-heading'
    >
      <div className='mx-auto max-w-6xl'>
        <h2 id='home-infractions-index-heading' className='font-ij-sans text-lg font-bold text-ij-text'>
          Référentiel infractions ({catalog.length} entrées) — aperçu textuel
        </h2>
        <p className='mt-2 max-w-3xl text-sm text-ij-text-muted'>
          Extraits des qualifications traitées dans le référentiel complet (
          <Link href='/infractions' className='text-ij-accent underline underline-offset-2'>
            voir la page dédiée
          </Link>
          ). Les fiches détaillées (éléments constitutifs, pièges d&apos;examen) sont dans l&apos;espace révision.
        </p>
        <ul className='mt-6 grid list-none gap-x-6 gap-y-1 text-xs leading-snug text-ij-text-muted sm:columns-2 lg:columns-3'>
          {sample.map((row) => (
            <li key={row.id} className='break-inside-avoid py-0.5'>
              <Link
                href={`/infractions/${encodeURIComponent(row.id)}`}
                className='text-ij-text-muted transition hover:text-ij-accent'
              >
                {stripInfractionTitle(row.infraction)}
              </Link>
            </li>
          ))}
        </ul>
        {catalog.length > sample.length ? (
          <p className='mt-4 text-xs text-ij-text-subtle'>
            … et {catalog.length - sample.length} autres entrées —{' '}
            <Link href='/infractions' className='text-ij-accent underline underline-offset-2'>
              parcourir tout le référentiel
            </Link>
            .
          </p>
        ) : null}
        {/* Référence absolue pour crawlers (cohérence canonique) */}
        <p className='sr-only'>
          Liste partielle à titre d&apos;index SEO ; catalogue complet sur {base}/infractions .
        </p>
      </div>
    </section>
  );
}
