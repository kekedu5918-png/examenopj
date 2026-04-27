'use client';

/** Même rendu tabulaire que le comparatif ; séparé pour évolution 2H.3. */
export type FicheSchemaTableauProps = {
  titre: string;
  rows: Array<Record<string, string>>;
};

export function FicheSchemaTableau({ titre, rows }: FicheSchemaTableauProps) {
  const keys = rows[0] ? Object.keys(rows[0]) : [];

  return (
    <div className='overflow-x-auto rounded-xl border border-ij-border/40 bg-ij-surface/50'>
      <h3 className='border-b border-ij-border/40 px-5 py-4 font-ij-display text-lg font-semibold text-ij-text'>
        {titre}
      </h3>
      <table className='w-full min-w-[280px] text-left text-sm'>
        <thead>
          <tr className='border-b border-ij-border/35 bg-ij-surface-2/50'>
            {keys.map((k) => (
              <th key={k} scope='col' className='px-4 py-3 font-semibold text-ij-text-muted'>
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className='border-b border-ij-border/25 last:border-0'>
              {keys.map((k) => (
                <td key={k} className='px-4 py-3 text-ij-text'>
                  {row[k] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
