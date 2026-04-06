import type { ModelePV, PVBloc } from '@/types/pv';

function blocToPlain(b: PVBloc): string {
  switch (b.type) {
    case 'paragraphe':
    case 'suite':
    case 'annexe':
    case 'mention':
      return b.texte;
    case 'rubrique-numerotee':
      return `${b.numero}. ${b.texte}`;
    case 'signature':
      return b.signataires.join(' · ');
    default:
      return '';
  }
}

function cartouchePlain(m: ModelePV): string[] {
  const { cartouche } = m;
  return [
    ...cartouche.enteteGauche,
    '',
    '---',
    '',
    ...cartouche.enteteDroit,
    '',
    '--- Marge ---',
    ...cartouche.marginGauche,
    '',
  ];
}

/** Texte brut pour copier / imprimer (approximation de la liasse). */
export function modelePVToPlainText(m: ModelePV): string {
  const head = [...cartouchePlain(m), ...m.corps.map(blocToPlain)];
  if (m.notesPedagogiques?.length) {
    head.push('', '— Notes pédagogiques —', ...m.notesPedagogiques);
  }
  return head.filter(Boolean).join('\n');
}

export function modelePVSearchBlob(m: ModelePV): string {
  const parts = [
    m.titre,
    m.source,
    ...m.cartouche.enteteGauche,
    ...m.cartouche.enteteDroit,
    ...m.cartouche.marginGauche,
    ...m.corps.map(blocToPlain),
  ];
  if (m.notesPedagogiques) parts.push(...m.notesPedagogiques);
  return parts.join(' ').toLowerCase();
}

export function modelePVCardExcerpt(m: ModelePV, maxLen = 120): string {
  const first = m.corps[0];
  let raw = '';
  if (first?.type === 'rubrique-numerotee' || first?.type === 'paragraphe') raw = first.texte;
  else if (first?.type === 'suite') raw = first.texte;
  else raw = m.source;
  const oneLine = raw.replace(/\s+/g, ' ').trim();
  if (oneLine.length <= maxLen) return oneLine;
  return `${oneLine.slice(0, maxLen - 1)}…`;
}
