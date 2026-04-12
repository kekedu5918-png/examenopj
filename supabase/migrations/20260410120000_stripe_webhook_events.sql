-- Idempotence des webhooks Stripe : un event.id ne doit traiter la logique métier qu'une fois.
create table if not exists public.stripe_webhook_events (
  id text primary key,
  created_at timestamptz not null default now()
);

comment on table public.stripe_webhook_events is 'Stripe webhook event ids — remplie uniquement via service role (API route).';

alter table public.stripe_webhook_events enable row level security;
