import { describe, expect, it } from 'vitest';

import {
  ficheFrontmatterV3Schema,
  parseFicheFrontmatterV3,
} from '@/lib/fondamentaux/fiche-frontmatter-v3';

const validMinimal = {
  title: 'Enquête de flagrance',
  chapitre: 1,
  partie: 1,
  description: 'Cadre juridique et durées clés pour la flagrance (sous-titre hero).',
  tags: ['flagrance', 'CPP'],
  loi2025: false,
  derniereMiseAJour: '2025-12-01',
  articlesCles: [
    'Art. 53 CPP — Définition flagrance',
    'Art. 67 CPP — Peine requise',
    'Art. 56 CPP — Perquisitions',
    'Art. 53 al. 1 CPP — Durée initiale',
    'Art. 75 CPP — Bascule préliminaire',
  ],
  stats: [
    { num: '4', label: 'Cas F.R.C.I.' },
    { num: '8j', label: 'Durée initiale' },
    { num: '16j', label: 'Maximum' },
    { num: '100%', label: 'Contrôle parquet' },
  ],
  schemaMemo: {
    type: 'acronyme' as const,
    titre: 'Mémo flagrance',
    acronyme: 'F.R.C.I.',
    cards: [
      { lettre: 'F', mot: 'Flagrant', desc: 'Infraction en cours' },
      { lettre: 'R', mot: 'Récent', desc: 'Temps très voisin' },
    ],
  },
  blocs: {
    definition: 'Définition de la flagrance.',
    piege: 'Piège fréquent.',
    pointCle: 'Point clé oral.',
    memo: 'Mémo express.',
  },
  plan: [{ num: '1', titre: 'Section 1', duree: '5 min' }],
};

describe('ficheFrontmatterV3Schema', () => {
  it('accepte un objet conforme minimal', () => {
    const r = ficheFrontmatterV3Schema.safeParse(validMinimal);
    expect(r.success).toBe(true);
  });

  it('rejette articlesCles !== 5', () => {
    const r = parseFicheFrontmatterV3({
      ...validMinimal,
      articlesCles: validMinimal.articlesCles.slice(0, 4),
    });
    expect(r.success).toBe(false);
  });

  it('rejette stats !== 4', () => {
    const r = parseFicheFrontmatterV3({
      ...validMinimal,
      stats: validMinimal.stats.slice(0, 3),
    });
    expect(r.success).toBe(false);
  });

  it('rejette date non ISO YYYY-MM-DD', () => {
    const r = parseFicheFrontmatterV3({
      ...validMinimal,
      derniereMiseAJour: '01/12/2025',
    });
    expect(r.success).toBe(false);
  });

  it('rejette description > 200 caractères', () => {
    const r = parseFicheFrontmatterV3({
      ...validMinimal,
      description: 'x'.repeat(201),
    });
    expect(r.success).toBe(false);
  });

  it('accepte timeline optionnelle', () => {
    const r = parseFicheFrontmatterV3({
      ...validMinimal,
      timeline: [{ temps: 'J0', event: 'Ouverture', detail: '1er acte' }],
    });
    expect(r.success).toBe(true);
  });
});
