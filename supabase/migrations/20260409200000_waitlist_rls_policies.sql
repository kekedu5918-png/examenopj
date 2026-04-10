-- Policies RLS manquantes sur examen_blanc_waitlist.
-- Règle : n'importe qui peut s'inscrire (INSERT public),
--         seul le service role peut lire la liste (pas de SELECT policy => deny all anonymous/authenticated).

create policy "waitlist_public_insert"
  on public.examen_blanc_waitlist
  for insert
  to anon, authenticated
  with check (true);
