import { DocumentSheet } from '@/components/enquetes/DocumentSheet';
import { EnqueteRasterPages } from '@/components/enquetes/EnqueteRasterPages';
import type { EnqueteDocRender } from '@/data/enquetes-types';

type Props = {
  code: string;
  render: EnqueteDocRender;
};

export function EnqueteSujet({ code, render }: Props) {
  const hasTexte = render.sujetParagraphes && render.sujetParagraphes.length > 0;
  const showScan = !render.hideFacSimile;

  return (
    <DocumentSheet pdfHref={render.pdfUrl} variant='cream'>
      <div className='font-serif'>
        <h2 className='mb-8 text-center text-lg font-bold tracking-wide text-black'>
          Thème enquête « {code} »
        </h2>
        {hasTexte ? (
          <div className='space-y-4 text-justify text-sm leading-relaxed text-black md:text-base'>
            {render.sujetParagraphes!.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : null}
        {showScan ? (
          <div className={hasTexte ? 'mt-10' : ''}>
            <p className='mb-4 text-center text-xs text-black/60'>
              Document officiel reproduit (scan). Les annotations manuscrites du correcteur apparaissent en bleu sur
              l&apos;original.
            </p>
            <EnqueteRasterPages urls={render.pageUrls} altPrefix={`Sujet enquête ${code}`} />
          </div>
        ) : (
          <p className='mt-6 text-center text-xs text-black/50'>Fac-similé masqué : transcription intégrale ci-dessus — PDF officiel téléchargeable.</p>
        )}
      </div>
    </DocumentSheet>
  );
}
