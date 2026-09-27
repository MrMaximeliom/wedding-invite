-- Run this once in the Supabase SQL editor for your project.

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.wishes enable row level security;

-- Anyone (anon key) can submit a wish...
create policy "Anyone can insert a wish"
  on public.wishes for insert
  to anon
  with check (true);

-- ...but only the service role (used server-side by the admin dashboard) can read them.
-- No select policy is created for `anon`, so the public site cannot list wishes.
