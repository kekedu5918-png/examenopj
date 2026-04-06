-- Synchronise les métadonnées `products.metadata` avec les variants Stripe (free | mensuel | examen).
-- À exécuter une fois si des lignes datent d’anciens libellés basic/pro/enterprise ou si le webhook
-- n’a pas encore réécrit les métadonnées depuis le Dashboard Stripe.
--
-- Vérification manuelle (SQL éditeur Supabase) :
--   SELECT id, name, metadata FROM products ORDER BY name;

-- Fusion jsonb : les clés à droite écrasent celles à gauche. COALESCE gère metadata NULL.

-- Offres « mensuel » (nom ou ancien variant Stripe basic/pro)
UPDATE products
SET metadata = COALESCE(metadata, '{}'::jsonb)
  || '{"price_card_variant": "mensuel", "support_level": "email"}'::jsonb
WHERE name ILIKE '%mensuel%'
   OR (metadata->>'price_card_variant') IN ('basic', 'pro');

-- Offres « examen » (nom ou ancien enterprise)
UPDATE products
SET metadata = COALESCE(metadata, '{}'::jsonb)
  || '{"price_card_variant": "examen", "support_level": "email"}'::jsonb
WHERE name ILIKE '%examen%'
   OR (metadata->>'price_card_variant') = 'enterprise';
