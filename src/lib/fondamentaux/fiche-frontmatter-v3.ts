import { z } from 'zod';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date ISO attendue (YYYY-MM-DD)');

const statEntrySchema = z.object({
  num: z.string(),
  label: z.string(),
});

const planEntrySchema = z.object({
  num: z.string(),
  titre: z.string(),
  duree: z.string(),
});

const timelineEntrySchema = z.object({
  temps: z.string(),
  event: z.string(),
  detail: z.string(),
});

const schemaMemoRowSchema = z.record(z.string());

const schemaMemoSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('acronyme'),
    titre: z.string(),
    acronyme: z.string().optional(),
    cards: z
      .array(
        z.object({
          lettre: z.string(),
          mot: z.string(),
          desc: z.string(),
        }),
      )
      .optional(),
  }),
  z.object({
    type: z.literal('comparatif'),
    titre: z.string(),
    rows: z.array(schemaMemoRowSchema),
  }),
  z.object({
    type: z.literal('tableau'),
    titre: z.string(),
    rows: z.array(schemaMemoRowSchema),
  }),
  z.object({
    type: z.literal('arbre'),
    titre: z.string(),
    rows: z.array(schemaMemoRowSchema).optional(),
  }),
]);

const blocsSchema = z.object({
  definition: z.string(),
  piege: z.string(),
  pointCle: z.string(),
  memo: z.string(),
});

export const ficheFrontmatterV3Schema = z.object({
  title: z.string().min(1),
  chapitre: z.number().int().min(1).max(46),
  partie: z.number().int().min(1).max(6),
  description: z.string().min(1).max(200),
  tags: z.array(z.string()),
  loi2025: z.boolean(),
  derniereMiseAJour: isoDate,
  articlesCles: z.array(z.string()).length(5),
  stats: z.array(statEntrySchema).length(4),
  schemaMemo: schemaMemoSchema,
  blocs: blocsSchema,
  timeline: z.array(timelineEntrySchema).optional(),
  plan: z.array(planEntrySchema).min(1),
});

export type FicheFrontmatterV3 = z.infer<typeof ficheFrontmatterV3Schema>;
export type FicheSchemaMemo = z.infer<typeof schemaMemoSchema>;
export type FicheStatEntry = z.infer<typeof statEntrySchema>;
export type FichePlanEntry = z.infer<typeof planEntrySchema>;
export type FicheTimelineEntry = z.infer<typeof timelineEntrySchema>;

export function parseFicheFrontmatterV3(data: unknown) {
  return ficheFrontmatterV3Schema.safeParse(data);
}
