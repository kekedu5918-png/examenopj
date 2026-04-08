import { ALPHA_DOC } from '@/data/enquete-alpha';
import { BRAVO_DOC } from '@/data/enquete-bravo';
import type { EnqueteDocRender } from '@/data/enquetes-types';

const BY_ENQUETE: Record<string, Record<string, EnqueteDocRender>> = {
  alpha: ALPHA_DOC,
  bravo: BRAVO_DOC,
};

export function getEnqueteDocRender(enqueteId: string, documentId: string): EnqueteDocRender | null {
  const pack = BY_ENQUETE[enqueteId];
  if (!pack) return null;
  return pack[documentId] ?? null;
}
