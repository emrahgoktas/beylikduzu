-- Supabase setup for Masaj Beylikduzu
-- SQL Editor uzerinden calistirin.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  slot text not null unique,
  image_url text not null,
  alt_text text,
  width int,
  height int,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = uid and p.role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.gallery_items enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "profiles own read" on public.profiles;
create policy "profiles own read"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles own update" on public.profiles;
create policy "profiles own update"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "public read gallery" on public.gallery_items;
create policy "public read gallery"
on public.gallery_items
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "admin manage gallery" on public.gallery_items;
create policy "admin manage gallery"
on public.gallery_items
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "admin manage settings" on public.site_settings;
create policy "admin manage settings"
on public.site_settings
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "public read site images" on storage.objects;
create policy "public read site images"
on storage.objects
for select
to public
using (bucket_id = 'site-images');

drop policy if exists "admin write site images" on storage.objects;
create policy "admin write site images"
on storage.objects
for all
to authenticated
using (
  bucket_id = 'site-images' and public.is_admin(auth.uid())
)
with check (
  bucket_id = 'site-images' and public.is_admin(auth.uid())
);
