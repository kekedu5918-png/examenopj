import { describe, expect, it } from 'vitest';

import { safeInternalPath } from '@/utils/safe-internal-path';

describe('safeInternalPath', () => {
  it('accepte un chemin relatif interne', () => {
    expect(safeInternalPath('/dashboard/progression')).toBe('/dashboard/progression');
  });

  it('refuse les URLs absolues ouvertes', () => {
    expect(safeInternalPath('//evil.com')).toBe('/account');
    expect(safeInternalPath('https://evil.com')).toBe('/account');
  });

  it('utilise le fallback si vide', () => {
    expect(safeInternalPath('', '/account')).toBe('/account');
    expect(safeInternalPath(null, '/x')).toBe('/x');
  });

  it('retire les espaces en trop', () => {
    expect(safeInternalPath('  /quiz  ', '/account')).toBe('/quiz');
  });
});
