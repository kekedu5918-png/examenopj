import { BRAVO_ARTICULATION_SUITE_CARTOUCHES } from '@/data/enquetes/bravo-articulation-suite-transcription';
import { BRAVO_ARTICULATION_CARTOUCHES } from '@/data/enquetes/bravo-articulation-transcription';
import { BRAVO_RAPPORT_SECTIONS } from '@/data/enquetes/bravo-rapport-transcription';
import { BRAVO_SUJET_PARAGRAPHES } from '@/data/enquetes/bravo-sujet-transcription';
import type { EnqueteDocRender } from '@/data/enquetes-types';

const R = '/enquetes/raster';

export const BRAVO_DOC: Record<string, EnqueteDocRender> = {
  'bravo-sujet': {
    pdfUrl: '/enquetes/bravo-sujet.pdf',
    pageUrls: [`${R}/bravo-sujet-p1.png`, `${R}/bravo-sujet-p2.png`, `${R}/bravo-sujet-p3.png`],
    hideFacSimile: true,
    sujetParagraphes: BRAVO_SUJET_PARAGRAPHES,
  },
  'bravo-articulation': {
    pdfUrl: '/enquetes/bravo-articulation.pdf',
    pageUrls: [
      `${R}/bravo-articulation-p1.png`,
      `${R}/bravo-articulation-p2.png`,
      `${R}/bravo-articulation-p3.png`,
      `${R}/bravo-articulation-p4.png`,
      `${R}/bravo-articulation-p5.png`,
      `${R}/bravo-articulation-p6.png`,
      `${R}/bravo-articulation-p7.png`,
    ],
    hideFacSimile: true,
    cartouches: BRAVO_ARTICULATION_CARTOUCHES,
  },
  'bravo-articulation-suite': {
    pdfUrl: '/enquetes/bravo-articulation-suite.pdf',
    pageUrls: [`${R}/bravo-articulation-suite-p1.png`, `${R}/bravo-articulation-suite-p2.png`],
    hideFacSimile: true,
    cartouches: BRAVO_ARTICULATION_SUITE_CARTOUCHES,
  },
  'bravo-rapport': {
    pdfUrl: '/enquetes/bravo-rapport.pdf',
    pageUrls: [
      `${R}/bravo-rapport-p1.png`,
      `${R}/bravo-rapport-p2.png`,
      `${R}/bravo-rapport-p3.png`,
      `${R}/bravo-rapport-p4.png`,
    ],
    hideFacSimile: true,
    sectionsRapport: BRAVO_RAPPORT_SECTIONS,
  },
};
