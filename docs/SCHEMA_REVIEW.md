# SCHEMA_REVIEW — Supabase (migrations repo vs runtime)

## Méthode

1. **Repo** : fichiers dans `supabase/migrations/*.sql` — source de vérité **versionnée**.
2. **Runtime** : sur le projet Supabase déployé, exporter les politiques réelles, par exemple :
   - SQL Editor : `select * from pg_policies where schemaname = 'public';`
   - ou CLI : `supabase db dump` / lien avec l’instance de prod.

Toute table avec données utilisateur sans `ENABLE ROW LEVEL SECURITY` ou sans policy adaptée doit être traitée comme **critique**.

## Écart migrations / prod

| Sujet | Fichiers / tables concernés | Action |
|-------|----------------------------|--------|
| Learning path | `20260410130000_learning_path.sql` + `20260411150000_learning_path_client_key_seed.sql` (`client_key`, graines 35 nœuds) | Appliquer les migrations ; l’app lit/écrit `user_node_progress` via `client_key` (ex. `gav-1`) |
| Webhooks Stripe | `20260410120000_stripe_webhook_events.sql` — `stripe_webhook_events` | Service role uniquement pour écriture ; pas d’accès client direct |
| Gamification | `20260409110000_gamification.sql` | Confirmer policies sur `user_streaks`, `user_badges` |
| Clients Stripe | `20240115041359_init.sql` — table `customers` | Accès réservé au **service role** côté app ; pas d’exposition anon |
| Flashcards SM-2 | `20260409210000_flashcard_reviews_sm2.sql` | Vérifier RLS sur `flashcard_reviews` + usage applicatif |

## Checklist rapide

- [ ] `pg_policies` exporté depuis la prod et comparé aux migrations récentes.
- [ ] Aucune table publique sans RLS sur données personnelles.
- [ ] Les clés `service_role` ne sont jamais exposées au navigateur.

## Performance / observabilité (CWV)

Voir **[docs/PERF_CWV.md](./PERF_CWV.md)** : Speed Insights, Lighthouse local, workflow GitHub manuel, bundle analyze.
