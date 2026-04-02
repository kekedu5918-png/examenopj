'use client';

function Block({
  borderClass,
  title,
  items,
}: {
  borderClass: string;
  title: string;
  items: readonly string[];
}) {
  return (
    <div className={`mb-4 rounded-r-xl border border-white/[0.08] bg-white/[0.02] p-6 pl-5 ${borderClass}`}>
      <h3 className='mb-4 font-display text-lg font-bold text-gray-100'>{title}</h3>
      <ul className='space-y-2.5 text-sm text-gray-400'>
        {items.map((line) => (
          <li key={line} className='flex gap-2'>
            <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/60' aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const bloc1 = [
  'Service / Unité',
  'Numéro de procédure',
  'Objet : Rapport de synthèse relatif à…',
  'Qualification des faits',
  'Destinataire : Monsieur / Madame le Procureur de la République',
] as const;

const bloc2 = [
  'Circonstances de la saisine',
  'Nature des faits',
  'Qualifications retenues avec circonstances aggravantes',
  'Cadre juridique (flagrance, préliminaire, etc.)',
] as const;

const bloc3 = [
  "Chronologie des actes d'enquête effectués",
  'Résultats des investigations',
  'Éléments à charge et à décharge',
  'Scellés constitués (liste)',
] as const;

const bloc4 = [
  'Mis en cause : identité complète, statut procédural (GAV, libre), antécédents, déclarations résumées',
  'Victimes : identité, préjudice (matériel, physique, moral), ITT, constitution partie civile',
  'Témoins : identité, déclarations résumées',
] as const;

const bloc5 = [
  'Synthèse des charges retenues contre chaque mis en cause',
  'Suites judiciaires proposées ou sollicitées',
  "Date et signature de l'OPJ",
] as const;

export function RapportSyntheseSchema() {
  return (
    <div className='rounded-2xl border border-white/10 bg-navy-950/40 p-4 md:p-6'>
      <Block borderClass='border-l-4 border-l-blue-400' title='Bloc 1 — En-tête' items={bloc1} />
      <Block borderClass='border-l-4 border-l-amber-400' title='Bloc 2 — Rappel des faits' items={bloc2} />
      <Block
        borderClass='border-l-4 border-l-emerald-400'
        title="Bloc 3 — Déroulement de l'enquête"
        items={bloc3}
      />
      <Block
        borderClass='border-l-4 border-l-violet-400'
        title='Bloc 4 — Situation des personnes'
        items={bloc4}
      />
      <div className='rounded-r-xl border border-white/[0.08] border-l-4 border-l-gold-400 bg-white/[0.02] p-6 pl-5'>
        <h3 className='mb-4 font-display text-lg font-bold text-gray-100'>Bloc 5 — Conclusion</h3>
        <ul className='space-y-2.5 text-sm text-gray-400'>
          {bloc5.map((line) => (
            <li key={line} className='flex gap-2'>
              <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/60' aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
