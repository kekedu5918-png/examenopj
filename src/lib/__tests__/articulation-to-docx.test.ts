import JSZip from 'jszip';
import { describe, expect, it } from 'vitest';

import type { CartoucheData } from '@/components/entrainement/articulation-types';
import { buildArticulationDocx } from '@/lib/articulation-to-docx';

/**
 * Bug 0.2 — non-régression : la lib doit produire un .docx valide
 * (zip OOXML) contenant le numéro de procédure, le titre standard
 * « ARTICULATION DE PROCÉDURE », chaque cartouche validée et son
 * contenu.
 */
describe('buildArticulationDocx', () => {
  const cartouches: CartoucheData[] = [
    {
      id: 1,
      date: '19/04/26',
      heure: '10h00',
      qualite: 'OPJ',
      titre: 'SAISINE — PLAINTE',
      contenu: '- Réception plainte de Mme X\nQualification : vol simple',
      valide: true,
    },
    {
      id: 2,
      date: '19/04/26',
      heure: '10h45',
      qualite: 'OPJ',
      titre: 'TRANSPORT SUR LES LIEUX',
      contenu: '- Constatations\n- Photos prises',
      valide: true,
    },
    {
      id: 3,
      date: '19/04/26',
      heure: '11h00',
      qualite: 'OPJ',
      titre: 'CARTOUCHE NON VALIDÉE',
      contenu: 'ne doit pas apparaître',
      valide: false,
    },
  ];

  async function unzipDocument(blob: Blob): Promise<string> {
    const buffer = await blob.arrayBuffer();
    const zip = await JSZip.loadAsync(buffer);
    const xml = await zip.file('word/document.xml')?.async('string');
    if (!xml) throw new Error('word/document.xml introuvable dans le .docx');
    return xml;
  }

  it('produit un .docx valide avec le numéro de procédure renseigné', async () => {
    const blob = await buildArticulationDocx(
      cartouches,
      'PV-2026-0042',
      'Vol simple par M. Dupont',
    );

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBeGreaterThan(1000);

    const xml = await unzipDocument(blob);

    /** En-tête. */
    expect(xml).toContain('Numéro de procédure');
    expect(xml).toContain('PV-2026-0042');
    expect(xml).toContain('ARTICULATION DE PROCÉDURE');
    expect(xml).toContain('Vol simple par M. Dupont');

    /** Titres et contenu des deux cartouches valides. */
    expect(xml).toContain('Côte 01');
    expect(xml).toContain('SAISINE');
    expect(xml).toContain('Côte 02');
    expect(xml).toContain('TRANSPORT SUR LES LIEUX');
    expect(xml).toContain('Réception plainte de Mme X');
    expect(xml).toContain('Constatations');
    expect(xml).toContain('Photos prises');

    /** La cartouche non validée n'apparaît pas. */
    expect(xml).not.toContain('CARTOUCHE NON VALIDÉE');
    expect(xml).not.toContain('ne doit pas apparaître');

    /** Pied de page : décompte cohérent (2 valides, pluriel). */
    expect(xml).toContain('2 côtes PV');
  });

  it('affiche le placeholder quand le numéro de procédure est vide', async () => {
    const blob = await buildArticulationDocx(cartouches.slice(0, 1), '   ', '');
    const xml = await unzipDocument(blob);

    expect(xml).toContain('(à compléter par le candidat)');
    /** Singulier quand 1 seule côte valide. */
    expect(xml).toContain('1 côte PV');
  });
});
