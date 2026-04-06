import { DocumentSheet } from '@/components/enquetes/DocumentSheet';
import { EnqueteRasterPages } from '@/components/enquetes/EnqueteRasterPages';
import type { EnqueteDocRender, RapportSection } from '@/data/enquetes-types';
import { cn } from '@/utils/cn';

type Props = {
  render: EnqueteDocRender;
  code: string;
};

const sectionClass: Record<RapportSection['type'], string> = {
  entete: 'text-sm leading-relaxed',
  objet: 'space-y-3 text-sm leading-relaxed',
  faits: 'space-y-3 text-sm leading-relaxed',
  enquete: 'space-y-3 text-sm leading-relaxed',
  conclusion: 'space-y-3 text-sm leading-relaxed',
  'etat-civil': 'space-y-2 text-sm leading-relaxed',
  transmission: 'space-y-3 text-sm leading-relaxed',
};

function RapportTranscription({ sections }: { sections: RapportSection[] }) {
  return (
    <div className='mb-8 space-y-8 border-b border-black/10 pb-8'>
      {sections.map((s, i) => (
        <section
          key={i}
          className={cn(
            sectionClass[s.type],
            s.type === 'faits' || s.type === 'conclusion' ? '[&_h3]:mb-4 [&_h3]:text-center [&_h3]:font-bold [&_h3]:uppercase' : '',
          )}
        >
          <div className='whitespace-pre-wrap'>{s.content}</div>
        </section>
      ))}
    </div>
  );
}

export function EnqueteRapport({ render, code }: Props) {
  const sections = render.sectionsRapport?.filter((x) => x.content.trim());
  const showScan = !render.hideFacSimile;

  return (
    <DocumentSheet pdfHref={render.pdfUrl} variant='paper'>
      <div className='font-serif text-black'>
        <p className='mb-4 text-center text-xs text-black/55'>
          Rapport de synthèse — enquête {code}
        </p>
        {sections?.length ? <RapportTranscription sections={sections} /> : null}
        {showScan ? (
          <EnqueteRasterPages urls={render.pageUrls} altPrefix={`Rapport ${code}`} />
        ) : (
          <p className='text-center text-xs text-black/50'>Fac-similé masqué : transcription ci-dessus — PDF téléchargeable.</p>
        )}
      </div>
    </DocumentSheet>
  );
}
