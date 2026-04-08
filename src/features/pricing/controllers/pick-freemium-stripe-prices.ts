import { stripeMetadataToStringRecord } from '@/features/pricing/models/product-metadata';
import type { Price, ProductWithPrices } from '@/features/pricing/types';

/**
 * Sélectionne les prix Stripe à utiliser depuis la page tarifs (métadonnée `price_card_variant`).
 */
export function pickFreemiumStripePrices(products: ProductWithPrices[]): {
  monthly: Price | null;
  exam: Price | null;
  yearly: Price | null;
} {
  let monthly: Price | null = null;
  let exam: Price | null = null;
  let yearly: Price | null = null;

  for (const product of products) {
    const meta = stripeMetadataToStringRecord(product.metadata);
    const variant = meta?.price_card_variant;
    const prices = product.prices ?? [];

    if (variant === 'mensuel') {
      monthly =
        prices.find((p) => p.type === 'recurring' && p.interval === 'month') ??
        prices.find((p) => p.type === 'recurring') ??
        prices[0] ??
        null;
    }
    if (variant === 'examen') {
      exam =
        prices.find((p) => p.type === 'one_time') ??
        prices.find((p) => p.type === 'recurring') ??
        prices[0] ??
        null;
    }
    if (variant === 'annuel') {
      yearly =
        prices.find((p) => p.type === 'recurring' && p.interval === 'year') ??
        prices.find((p) => p.type === 'recurring') ??
        prices[0] ??
        null;
    }
  }

  return { monthly, exam, yearly };
}
