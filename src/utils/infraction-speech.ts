/**
 * Préparation texte et sélection de voix pour la révision vocale des infractions (Web Speech API).
 * Qualité : dépend du navigateur — Edge / Chrome proposent souvent des voix françaises plus naturelles.
 */

export function textForSpeech(raw: string): string {
  return raw
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .replace(/\s*\/\s*/g, '. ')
    .trim();
}

/** Découpe un long texte pour éviter certains plafonds moteurs TTS. */
export function chunkForSpeech(text: string, maxLen = 280): string[] {
  const t = textForSpeech(text);
  if (t.length <= maxLen) return t ? [t] : [];
  const parts: string[] = [];
  let rest = t;
  while (rest.length > 0) {
    if (rest.length <= maxLen) {
      parts.push(rest);
      break;
    }
    let cut = rest.lastIndexOf('. ', maxLen);
    if (cut < maxLen * 0.4) cut = rest.indexOf(' ', maxLen);
    if (cut <= 0) cut = maxLen;
    parts.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  return parts.filter(Boolean);
}

export function scoreFrenchVoice(v: SpeechSynthesisVoice): number {
  const n = `${v.name} ${v.voiceURI}`.toLowerCase();
  let s = 0;
  if (!/^fr/i.test(v.lang.trim())) return -1;
  if (n.includes('google')) s += 120;
  if (n.includes('neural') || n.includes('natural') || n.includes('premium')) s += 90;
  if (n.includes('microsoft')) s += 50;
  if (/(hortense|denise|sylvie|aude|celeste|virginie|thomas)/i.test(n)) s += 35;
  if (n.includes('fr-fr')) s += 10;
  return s;
}

export function listFrenchVoicesRanked(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  return [...window.speechSynthesis.getVoices()]
    .map((v) => ({ v, s: scoreFrenchVoice(v) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.v);
}
