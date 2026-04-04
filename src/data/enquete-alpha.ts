import { ALPHA_ARTICULATION_CARTOUCHES } from '@/data/enquetes/alpha-articulation-transcription';
import { ALPHA_PV_CORPS } from '@/data/enquetes/alpha-pv-transcription';
import { ALPHA_RAPPORT_SECTIONS } from '@/data/enquetes/alpha-rapport-transcription';
import { ALPHA_SUJET_PARAGRAPHES } from '@/data/enquetes/alpha-sujet-transcription';
import type { EnqueteDocRender } from '@/data/enquetes-types';

const R = '/enquetes/raster';

export const ALPHA_DOC: Record<string, EnqueteDocRender> = {
  'alpha-sujet': {
    pdfUrl: '/enquetes/alpha-sujet.pdf',
    pageUrls: [`${R}/alpha-sujet-p1.png`, `${R}/alpha-sujet-p2.png`, `${R}/alpha-sujet-p3.png`, `${R}/alpha-sujet-p4.png`],
    hideFacSimile: true,
    sujetParagraphes: ALPHA_SUJET_PARAGRAPHES,
  },
  'alpha-articulation': {
    pdfUrl: '/enquetes/alpha-articulation.pdf',
    pageUrls: [
      `${R}/alpha-articulation-p1.png`,
      `${R}/alpha-articulation-p2.png`,
      `${R}/alpha-articulation-p3.png`,
      `${R}/alpha-articulation-p4.png`,
      `${R}/alpha-articulation-p5.png`,
    ],
    hideFacSimile: true,
    cartouches: ALPHA_ARTICULATION_CARTOUCHES,
  },
  'alpha-pv': {
    pdfUrl: '/enquetes/alpha-pv-plainte.pdf',
    pageUrls: [`${R}/alpha-pv-plainte-p1.png`, `${R}/alpha-pv-plainte-p2.png`],
    hideFacSimile: true,
    corpsPvTexte: ALPHA_PV_CORPS,
  },
  'alpha-rapport': {
    pdfUrl: '/enquetes/alpha-rapport.pdf',
    pageUrls: [`${R}/alpha-rapport-p1.png`, `${R}/alpha-rapport-p2.png`, `${R}/alpha-rapport-p3.png`],
    hideFacSimile: true,
    sectionsRapport: ALPHA_RAPPORT_SECTIONS,
  },
};
