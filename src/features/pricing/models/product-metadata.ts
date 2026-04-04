import { z } from 'zod';

export const priceCardVariantSchema = z.enum(['free', 'mensuel', 'examen']);

/** Clés alignées sur les métadonnées Stripe (snake_case). */
export const productMetadataSchema = z.object({
  price_card_variant: priceCardVariantSchema,
  support_level: z.enum(['email', 'live']).default('email'),
});

export type ProductMetadata = z.infer<typeof productMetadataSchema>;
export type PriceCardVariant = z.infer<typeof priceCardVariantSchema>;

export function parseProductMetadata(raw: Record<string, string>): ProductMetadata {
  const support = raw['support_level'];
  return productMetadataSchema.parse({
    price_card_variant: raw['price_card_variant'],
    ...(support !== undefined && support !== '' ? { support_level: support } : {}),
  });
}

/** Normalise les métadonnées Stripe (souvent des chaînes) pour parsing. */
export function stripeMetadataToStringRecord(raw: unknown): Record<string, string> | null {
  if (raw == null || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (v == null) continue;
    out[k] = typeof v === 'string' ? v : String(v);
  }
  return out;
}

/** Accroches affichées sur la carte prix, dérivées du variant. */
export function variantHighlightLabel(variant: PriceCardVariant): string {
  if (variant === 'examen') return 'Pack examen : préparation ciblée jusqu’au jour J';
  if (variant === 'mensuel') return 'Abonnement : accès complet au catalogue';
  return 'Freemium : contenus et quotas d’essai';
}
