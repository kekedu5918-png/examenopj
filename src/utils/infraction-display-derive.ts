/** Dérivations purement UI pour le tableau / flashcards — sans modifier les données source. */

export type MoralKind = 'intentionnel' | 'non-intentionnel' | 'les-deux';

export type PeineTier = 'contravention' | 'delit-le3' | 'delit-gt3' | 'crime';

export function stripMdBold(s: string): string {
  return s.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');
}

export function classifyMoral(moral: string): MoralKind {
  const m = stripMdBold(moral);
  const hasNon = /NON\s+INTENTIONNEL|IMPRUDENCE|NÉGLIGENCE|NEGLIGENCE|ABSENCE.*INTENTION|FAUTE\s+NON/i.test(m);
  const hasInt =
    /INTENTIONNEL(?:\s|$)|\bDOLO\b|DOL\s*:|VOLONTÉ\s+DE|CONSCIENCE.*VOLONTÉ|VOLONTÉ\s+MANIFESTE/i.test(m);
  if (hasNon && hasInt) return 'les-deux';
  if (hasNon) return 'non-intentionnel';
  return 'intentionnel';
}

export function condenseMaterielKeys(materiel: string): string {
  const raw = stripMdBold(materiel);
  const parts = raw
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);
  const words = parts
    .slice(0, 3)
    .map((p) => (p.length > 42 ? `${p.slice(0, 40)}…` : p));
  return words.length > 0 ? words.join(' · ') : '—';
}

const EURO_RE = /(\d[\d\s\u00a0]{0,12})\s*€/i;
const YEAR_RE = /(\d{1,2})\s*ans/i;

export function derivePeineFromLegal(legal: string): { label: string; tier: PeineTier } {
  const t = legal.toLowerCase();
  if (/contravention|classe\s*[1-5]\b/i.test(legal)) {
    return { label: 'Contravention', tier: 'contravention' };
  }
  if (/\bréclusion\b|crime\b|criminelle\b|sans\s+circonstance.*réclusion/i.test(t)) {
    return { label: 'Crime', tier: 'crime' };
  }
  const yb = legal.match(YEAR_RE);
  const years = yb ? parseInt(yb[1]!, 10) : null;
  const euroM = legal.match(EURO_RE);
  const euro = euroM ? euroM[1]!.replace(/[\s\u00a0]/g, '') : null;

  if (years != null) {
    const label = euro ? `${years} ans / ${euro} €` : `${years} ans`;
    return { label, tier: years > 3 ? 'delit-gt3' : 'delit-le3' };
  }
  if (euro) {
    return { label: `${euro.replace(/\s/g, '')} €`, tier: 'delit-le3' };
  }
  if (/amende\s+de/i.test(t)) {
    return { label: 'Amende', tier: 'delit-le3' };
  }
  return { label: '—', tier: 'delit-le3' };
}

export function moralKindLabel(k: MoralKind): string {
  switch (k) {
    case 'intentionnel':
      return 'Intentionnel';
    case 'non-intentionnel':
      return 'Non intentionnel';
    default:
      return 'Les deux';
  }
}

export function moralKindBadgeClass(k: MoralKind): string {
  switch (k) {
    case 'intentionnel':
      return 'bg-[#4F6EF7]/20 text-[#4F6EF7]';
    case 'non-intentionnel':
      return 'bg-[#F59E0B]/20 text-[#F59E0B]';
    default:
      return 'bg-[#7C3AED]/20 text-[#7C3AED]';
  }
}

export function peineTierTextClass(tier: PeineTier): string {
  switch (tier) {
    case 'contravention':
      return 'text-[#8888A0]';
    case 'crime':
      return 'text-[#EF4444] font-bold';
    case 'delit-gt3':
      return 'text-[#EF4444]';
    default:
      return 'text-[#F59E0B]';
  }
}
