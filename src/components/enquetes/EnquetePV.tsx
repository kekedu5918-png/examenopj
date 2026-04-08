import { DocumentSheet } from '@/components/enquetes/DocumentSheet';
import { EnqueteRasterPages } from '@/components/enquetes/EnqueteRasterPages';
import type { EnqueteDocRender } from '@/data/enquetes-types';

type Props = {
  render: EnqueteDocRender;
  code: string;
};

export function EnquetePV({ render, code }: Props) {
  const corps = render.corpsPvTexte?.trim();
  const showScan = !render.hideFacSimile;

  return (
    <DocumentSheet pdfHref={render.pdfUrl} variant='paper'>
      <div className='font-serif text-black'>
        <p className='mb-4 text-center text-xs text-black/55'>
          Procès-verbal — enquête {code}
        </p>
        {corps ? (
          <div className='mb-8 whitespace-pre-wrap border-b border-black/10 pb-8 text-sm leading-relaxed'>
            {corps}
          </div>
        ) : null}
        {showScan ? (
          <EnqueteRasterPages urls={render.pageUrls} altPrefix={`PV ${code}`} />
        ) : (
          <p className='text-center text-xs text-black/50'>Fac-similé masqué : transcription ci-dessus — PDF téléchargeable.</p>
        )}
      </div>
    </DocumentSheet>
  );
}
