import type { InfractionOfficielleRecord } from '@/types/infractions-officielles';

/** Comparaison tolérante titre catalogue (markdown) ↔ titre JSON fascicule. */
export function normalizeInfractionTitleKey(s: string): string {
  return s
    .replace(/\*\*/g, '')
    .replace(/[’']/g, "'")
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '');
}

function formatMaterielPoints(record: InfractionOfficielleRecord): string {
  const pts = record.element_materiel?.points ?? [];
  if (pts.length === 0) return '';
  const blocks: string[] = [];
  for (const p of pts) {
    const titre = p.titre?.trim();
    const sous = (p.sous_points ?? []).map((x) => x.trim()).filter(Boolean);
    if (titre) blocks.push(`**${titre}**`);
    for (const line of sous) {
      blocks.push(`- ${line}`);
    }
    if (titre || sous.length) blocks.push('');
  }
  return blocks.join('\n').trim();
}

function formatMoralBlock(record: InfractionOfficielleRecord): string {
  const titre = record.element_moral?.titre?.trim() ?? '';
  const texte = record.element_moral?.texte?.trim() ?? '';
  if (!texte) return '';
  const head = titre && titre !== 'TODO' ? `**${titre}**` : '';
  return [head, texte].filter(Boolean).join('\n\n');
}

/** Texte affichable pour l’élément matériel depuis l’audit JSON (aligné fascicule SDCP). */
export function formatMaterielFromOfficialRecord(record: InfractionOfficielleRecord): string {
  return formatMaterielPoints(record);
}

/** Texte affichable pour l’élément moral depuis l’audit JSON. */
export function formatMoralFromOfficialRecord(record: InfractionOfficielleRecord): string {
  return formatMoralBlock(record);
}

export function shouldUseOfficialElements(record: InfractionOfficielleRecord): boolean {
  return record.verification === 'complete';
}
