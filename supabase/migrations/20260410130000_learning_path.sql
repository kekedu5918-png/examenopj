-- Parcours type « learning path » : modules OPJ, nœuds, progression utilisateur.
create table if not exists public.learning_modules (
  id text primary key,
  title text not null,
  sort_order int not null,
  color text,
  icon text,
  created_at timestamptz not null default now()
);

create table if not exists public.learning_nodes (
  id uuid primary key default gen_random_uuid(),
  module_id text not null references public.learning_modules (id) on delete cascade,
  sort_order int not null,
  kind text not null,
  title text not null,
  description text,
  href text,
  min_score_pct int not null default 80,
  created_at timestamptz not null default now()
);

create index if not exists idx_learning_nodes_module on public.learning_nodes (module_id, sort_order);

create table if not exists public.user_node_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  node_id uuid not null references public.learning_nodes (id) on delete cascade,
  best_score_pct int,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, node_id)
);

create index if not exists idx_user_node_progress_user on public.user_node_progress (user_id);

alter table public.learning_modules enable row level security;
alter table public.learning_nodes enable row level security;
alter table public.user_node_progress enable row level security;

create policy "learning_modules_select_authenticated"
  on public.learning_modules for select
  to authenticated
  using (true);

create policy "learning_nodes_select_authenticated"
  on public.learning_nodes for select
  to authenticated
  using (true);

create policy "user_node_progress_select_own"
  on public.user_node_progress for select
  using (auth.uid() = user_id);

create policy "user_node_progress_insert_own"
  on public.user_node_progress for insert
  with check (auth.uid() = user_id);

create policy "user_node_progress_update_own"
  on public.user_node_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
