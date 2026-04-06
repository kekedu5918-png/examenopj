import { DocumentSheet } from '@/components/enquetes/DocumentSheet';
import { EnqueteRasterPages } from '@/components/enquetes/EnqueteRasterPages';
import type { CartouchePV, EnqueteDocRender } from '@/data/enquetes-types';
import { cn } from '@/utils/cn';

function CartoucheTable({ cartouches }: { cartouches: CartouchePV[] }) {
  return (
    <div className='overflow-x-auto rounded-lg border border-white/20'>
      <table className='w-full min-w-[640px] border-collapse text-left text-sm'>
        <tbody>
          {cartouches.map((c, idx) => (
            <tr key={`${c.cote}-${idx}`} className='border-b border-white/15'>
              <td
                className={cn(
                  'w-[120px] min-w-[100px] border-r border-white/15 px-2 py-3 align-top text-center text-xs md:w-[130px]',
                )}
              >
                <p className='font-bold'>Côte PV : {String(c.cote).padStart(2, '0')}</p>
                <p className='mt-2'>Date : {c.date}</p>
                <p className='mt-1'>Heure : {c.heure}</p>
                <p className='mt-2 whitespace-pre-line text-[11px] leading-tight'>{c.qualite}</p>
              </td>
              <td className='px-3 py-3 align-top'>
                {c.titre && c.titre !== '—' ? (
                  <button
                    type='button'
                    title='Explication pédagogique à compléter ultérieurement.'
                    className='mb-2 w-full cursor-help text-left'
                  >
                    <span className='font-bold uppercase underline'>{c.titre}</span>
                    <span className='ml-1 text-[10px] font-normal text-blue-300'>(?)</span>
                  </button>
                ) : null}
                <ul className='list-disc space-y-1 pl-5'>
                  {c.contenu.map((line, i) => (
                    <li key={i} className='text-gray-200'>
                      {line}
                    </li>
                  ))}
                </ul>
                {c.annotations?.length ? (
                  <div className='mt-3 rounded-md border border-blue-400/30 bg-blue-500/10 px-2 py-1.5'>
                    <p className='text-[10px] font-semibold uppercase tracking-wide text-blue-300'>
                      Note du correcteur (manuscrit)
                    </p>
                    {c.annotations.map((a, i) => (
                      <p key={i} className='mt-1 text-sm italic text-blue-400'>
                        {a}
                      </p>
                    ))}
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type Props = {
  render: EnqueteDocRender;
  code: string;
};

export function EnqueteArticulation({ render, code }: Props) {
  const cartouches = render.cartouches ?? [];
  const useTable = cartouches.length > 0;
  const showScan = !render.hideFacSimile;

  return (
    <DocumentSheet pdfHref={render.pdfUrl} variant='dark'>
      <div className='font-serif text-sm'>
        <p className='mb-4 text-center text-xs text-gray-400'>
          Articulation de procédure — enquête {code}
          {!useTable ? ' (reproduction fidèle du tableau du document source)' : null}
        </p>
        {useTable ? (
          <CartoucheTable cartouches={cartouches} />
        ) : (
          <EnqueteRasterPages urls={render.pageUrls} altPrefix={`Articulation ${code}`} />
        )}
        {useTable && showScan ? (
          <div className='mt-10 border-t border-white/10 pt-6'>
            <p className='mb-3 text-center text-xs text-gray-500'>Fac-similé du document source</p>
            <EnqueteRasterPages urls={render.pageUrls} altPrefix={`Articulation scan ${code}`} />
          </div>
        ) : null}
        {useTable && !showScan ? (
          <p className='mt-6 text-center text-xs text-gray-500'>
            Retranscription structurée — voir le PDF officiel pour le fac-similé.
          </p>
        ) : null}
      </div>
    </DocumentSheet>
  );
}
