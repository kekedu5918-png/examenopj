# Fichiers morts — suivi

Les entrées suivantes ont été **traitées** (suppression ou branchement) lors du passage « actions prioritaires » :

- `src/app/navigation.ts` — **branché** : exports `SITE_HEADER_*_LINKS` importés par `SiteHeaderClient.tsx`.
- `src/app/(auth)/auth-ui.tsx` — **supprimé** (aucun import de `AuthUI`).
- `src/components/layout/ExamenOpjLogo.tsx` — **supprimé** (non utilisé ; `BrandWordmark` à la place).
- `src/libs/resend/resend-client.ts` + dépendance `resend` — **supprimés** (aucun appel à `getResendClient`).

Pour un nouveau scan heuristique, préférer `npm run lint` / outils dédiés plutôt qu’une recherche naïve par préfixe `@/` (faux positifs sur imports relatifs).
