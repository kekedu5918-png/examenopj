'use client';

import type { FicheSchemaMemo as SchemaMemoData } from '@/lib/fondamentaux/fiche-frontmatter-v3';

import { FicheSchemaAcronyme } from './FicheSchemaAcronyme';
import { FicheSchemaArbre } from './FicheSchemaArbre';
import { FicheSchemaComparatif } from './FicheSchemaComparatif';
import { FicheSchemaTableau } from './FicheSchemaTableau';

export type FicheSchemaMemoProps = {
  schema: SchemaMemoData;
};

export function FicheSchemaMemo({ schema }: FicheSchemaMemoProps) {
  return (
    <section className='mt-10' data-testid='fiche-schema-memo'>
      {schema.type === 'acronyme' ? (
        <FicheSchemaAcronyme
          titre={schema.titre}
          acronyme={schema.acronyme}
          cards={schema.cards}
        />
      ) : null}
      {schema.type === 'comparatif' ? (
        <FicheSchemaComparatif titre={schema.titre} rows={schema.rows} />
      ) : null}
      {schema.type === 'tableau' ? <FicheSchemaTableau titre={schema.titre} rows={schema.rows} /> : null}
      {schema.type === 'arbre' ? <FicheSchemaArbre titre={schema.titre} rows={schema.rows} /> : null}
    </section>
  );
}
