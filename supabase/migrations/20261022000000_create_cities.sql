-- WorldWise: cities table
-- Run in the Supabase SQL editor, or via `supabase db push` with the Supabase CLI.

create table if not exists public.cities (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  city_name   text not null check (char_length(city_name) between 1 and 120),
  country     text not null,
  emoji       text not null,
  date        timestamptz not null,
  notes       text not null default '' check (char_length(notes) <= 2000),
  lat         double precision not null check (lat between -90 and 90),
  lng         double precision not null check (lng between -180 and 180)
);

comment on table public.cities is 'Cities visited by WorldWise users.';

create index if not exists cities_date_idx on public.cities (date);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- The app currently uses a client-side demo login, so requests reach Supabase
-- as the `anon` role. These policies make the table publicly readable and
-- writable, which is appropriate for a demo ONLY.
-- For production, add `user_id uuid references auth.users default auth.uid()`
-- and scope every policy with `using (auth.uid() = user_id)` (see README).
alter table public.cities enable row level security;

grant select, insert, delete on public.cities to anon, authenticated;

drop policy if exists "cities_select_public" on public.cities;
create policy "cities_select_public"
  on public.cities for select
  to anon, authenticated
  using (true);

drop policy if exists "cities_insert_public" on public.cities;
create policy "cities_insert_public"
  on public.cities for insert
  to anon, authenticated
  with check (true);

drop policy if exists "cities_delete_public" on public.cities;
create policy "cities_delete_public"
  on public.cities for delete
  to anon, authenticated
  using (true);
