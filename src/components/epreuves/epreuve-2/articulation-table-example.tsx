'use client';

const rows = [
  {
    cote: '01',
    pv: '001',
    date: '01/09/25 14h',
    opj: 'A. MARTIN',
    contenu: 'Saisine / Plainte de Prénom NOM, contre X',
  },
  {
    cote: '02',
    pv: '002',
    date: '01/09/25 15h',
    opj: 'A. MARTIN',
    contenu: 'Notification de placement en GAV — Majeur',
  },
  {
    cote: '03',
    pv: '003',
    date: '01/09/25 18h',
    opj: 'A. MARTIN',
    contenu: 'Audition de la victime',
  },
  {
    cote: '04',
    pv: '004',
    date: '02/09/25 09h',
    opj: 'A. MARTIN',
    contenu: 'Perquisition et saisies',
  },
  {
    cote: '…',
    pv: '…',
    date: '…',
    opj: '…',
    contenu: '… (suite de la procédure)',
  },
] as const;

export function ArticulationTableExample() {
  return (
    <div className='overflow-hidden rounded-xl border border-white/20 bg-navy-900'>
      <div className='border-b border-white/15 bg-white/[0.06] px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-white md:px-4 md:text-sm'>
        Procédure N°20**/***
      </div>
      <div className='divide-y divide-white/10'>
        {rows.map((r, i) => (
          <div
            key={i}
            className='grid grid-cols-1 gap-0 md:grid-cols-[minmax(0,180px)_1fr]'
          >
            <div className='space-y-1.5 border-white/10 bg-white/[0.02] p-3 text-[11px] leading-snug text-gray-300 md:border-r md:text-xs'>
              <div>
                <span className='font-semibold uppercase tracking-wide text-gray-500'>Côte PV</span>{' '}
                <span translate='no'>{r.cote}</span>
              </div>
              <div>
                <span className='font-semibold uppercase tracking-wide text-gray-500'>P.V. N°</span>{' '}
                <span translate='no' className='font-mono'>
                  {r.pv}
                </span>
              </div>
              <div>
                <span className='font-semibold uppercase tracking-wide text-gray-500'>JJ/MM/AA …h</span>{' '}
                {r.date}
              </div>
              <div>
                <span className='font-semibold uppercase tracking-wide text-gray-500'>OPJ</span> {r.opj}
              </div>
            </div>
            <div className='border-t border-white/10 p-3 text-sm text-gray-100 md:border-t-0 md:p-4'>
              <span className='text-[10px] font-semibold uppercase tracking-wide text-gray-500 md:text-xs'>
                Contenu P.V.
              </span>
              <p className='mt-1'>{r.contenu}</p>
            </div>
          </div>
        ))}
      </div>
      <p className='border-t border-white/10 bg-white/[0.02] px-3 py-2 text-[10px] text-gray-500 md:text-xs'>
        Exemple illustratif — chaque bloc = un PV ; séparer les procès-verbaux par un trait horizontal.
      </p>
    </div>
  );
}
