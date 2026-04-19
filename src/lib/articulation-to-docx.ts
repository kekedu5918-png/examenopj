/**
 * Bug 0.2 — génération `.docx` éditable d'une articulation de procédure.
 *
 * Module **client-safe** : aucun import serveur (Supabase / Stripe / fs).
 * À importer *dynamiquement* depuis le composant qui en a besoin afin
 * d'exclure `docx` (~100 KB gzip) du bundle initial.
 */
import {
  AlignmentType,
  Document,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';

import {
  type CartoucheData,
  coteLabel,
  formatContenuLignes,
} from '@/components/entrainement/articulation-types';

const NUMBERING_REF = 'articulation-bullets';

function headerParagraph(numeroProcedure: string): Paragraph {
  const numero = numeroProcedure.trim();
  const label = numero ? `n° ${numero}` : 'n° (à compléter par le candidat)';
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: `Numéro de procédure ${label}`,
        bold: true,
        allCaps: true,
      }),
    ],
  });
}

function titreArticulationParagraphs(titreArticulation: string): Paragraph[] {
  const paragraphs: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'ARTICULATION DE PROCÉDURE', bold: true }),
      ],
    }),
  ];
  const t = titreArticulation.trim();
  if (t) {
    paragraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: t, italics: true })],
      }),
    );
  }
  return paragraphs;
}

function cartoucheParagraphs(c: CartoucheData): Paragraph[] {
  const titre = c.titre.trim() || 'Sans titre';
  const lines = formatContenuLignes(c.contenu);

  const blocs: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      children: [
        new TextRun({ text: `Côte ${coteLabel(c.id)} — `, bold: true }),
        new TextRun({ text: titre, bold: true }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Date : ', bold: true }),
        new TextRun({ text: c.date.trim() || '—' }),
        new TextRun({ text: '   ' }),
        new TextRun({ text: 'Heure : ', bold: true }),
        new TextRun({ text: c.heure.trim() || '—' }),
        new TextRun({ text: '   ' }),
        new TextRun({ text: 'Qualité : ', bold: true }),
        new TextRun({ text: c.qualite.trim() || '—' }),
      ],
    }),
  ];

  for (const line of lines) {
    /** `formatContenuLignes` préfixe déjà chaque ligne par "- ". On retire pour n'en garder que le texte. */
    const text = line.replace(/^-\s?/, '');
    blocs.push(
      new Paragraph({
        text,
        numbering: { reference: NUMBERING_REF, level: 0 },
      }),
    );
  }

  /** Espace inter-cartouche pour rester lisible une fois imprimé. */
  blocs.push(new Paragraph({ children: [new TextRun('')] }));

  return blocs;
}

function footerParagraph(nbValides: number): Paragraph {
  const dateStr = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
  }).format(new Date());
  const plural = nbValides > 1 ? 's' : '';
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: `${nbValides} côte${plural} PV — Articulé le ${dateStr}`,
        italics: true,
      }),
    ],
  });
}

/**
 * Construit un `Blob` MIME `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
 * prêt à être enregistré côté navigateur via `file-saver`.
 *
 * Seules les cartouches `valide === true` sont incluses (cohérent avec `ArticulationRecap`).
 */
export async function buildArticulationDocx(
  cartouches: CartoucheData[],
  numeroProcedure: string,
  titreArticulation: string,
): Promise<Blob> {
  const valides = cartouches.filter((c) => c.valide);

  const children: Paragraph[] = [
    headerParagraph(numeroProcedure),
    ...titreArticulationParagraphs(titreArticulation),
    new Paragraph({ children: [new TextRun('')] }),
    ...valides.flatMap(cartoucheParagraphs),
    footerParagraph(valides.length),
  ];

  const doc = new Document({
    creator: 'examenopj.fr',
    title: 'Articulation de procédure',
    description: 'Articulation de procédure générée depuis examenopj.fr',
    numbering: {
      config: [
        {
          reference: NUMBERING_REF,
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: 720, hanging: 360 } },
              },
            },
          ],
        },
      ],
    },
    sections: [{ children }],
  });

  return Packer.toBlob(doc);
}
