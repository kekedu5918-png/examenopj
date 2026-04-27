'use client';

export type FicheSchemaArbreProps = {
  titre: string;
  rows?: Array<Record<string, string>>;
};

export function FicheSchemaArbre({ titre, rows }: FicheSchemaArbreProps) {
  return (
    <div className='rounded-xl border border-ij-border/40 bg-ij-surface/50 p-5'>
      <h3 className='font-ij-display text-lg font-semibold text-ij-text'>{titre}</h3>
      {rows?.length ? (
        <ul className='mt-4 space-y-2 border-l-2 border-ij-accent/40 pl-4'>
          {rows.map((row, i) => (
            <li key={i} className='text-sm text-ij-text'>
              {Object.entries(row)
                .map(([k, v]) => `${k}: ${v}`)
                .join(' · ')}
            </li>
          ))}
        </ul>
      ) : (
        <p className='mt-3 text-sm text-ij-text-muted'>Schéma arbre (contenu à intégrer).</p>
      )}
    </div>
  );
}
