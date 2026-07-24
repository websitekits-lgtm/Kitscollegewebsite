-- ═══════════════════════════════════════════════════════════════════════════
-- KITS v3 — documents/storage, notifications (realtime), custom pages,
-- clubs, patents. Safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── SITE DOCUMENTS (PDFs & files, backed by the "documents" storage bucket) ──
create table if not exists public.site_documents (
  id           uuid primary key default gen_random_uuid(),
  doc_key      text unique,            -- for single-doc slots, e.g. "brochure", "committee:c12"
  category     text,                   -- for list pages, e.g. "question-papers"
  title        text not null,
  label        text,                   -- secondary display column (year, branch, etc.)
  file_url     text not null,
  file_name    text not null,
  file_size    text,
  storage_path text,                   -- path inside the bucket (for cleanup on delete)
  sort_order   integer not null default 0,
  is_active    boolean not null default true,
  updated_at   timestamptz not null default now()
);
alter table public.site_documents enable row level security;
drop policy if exists "public read active site_documents" on public.site_documents;
create policy "public read active site_documents" on public.site_documents for select using (is_active = true);
drop policy if exists "admin full access site_documents" on public.site_documents;
create policy "admin full access site_documents" on public.site_documents for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── NOTIFICATIONS (header bell, realtime) ────────────────────────────────────
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text,
  link_url   text,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.notifications enable row level security;
drop policy if exists "public read active notifications" on public.notifications;
create policy "public read active notifications" on public.notifications for select using (is_active = true);
drop policy if exists "admin full access notifications" on public.notifications;
create policy "admin full access notifications" on public.notifications for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- realtime broadcast for the bell (ignore if already added)
do $$
begin
  alter publication supabase_realtime add table public.notifications;
exception when duplicate_object then null;
end $$;

-- ── CUSTOM TEMPLATE PAGES (admin-created pages served at /p/:slug) ───────────
create table if not exists public.custom_pages (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  title      text not null,
  eyebrow    text,
  subtitle   text,
  sections   jsonb not null default '[]',  -- [{heading, body, button_label, button_url}]
  is_active  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.custom_pages enable row level security;
drop policy if exists "public read active custom_pages" on public.custom_pages;
create policy "public read active custom_pages" on public.custom_pages for select using (is_active = true);
drop policy if exists "admin full access custom_pages" on public.custom_pages;
create policy "admin full access custom_pages" on public.custom_pages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── CLUBS (Student Life → Clubs) ─────────────────────────────────────────────
create table if not exists public.clubs (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  category     text not null default 'General',
  description  text,
  coordinator  text,
  image_url    text,
  sort_order   integer not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);
alter table public.clubs enable row level security;
drop policy if exists "public read active clubs" on public.clubs;
create policy "public read active clubs" on public.clubs for select using (is_active = true);
drop policy if exists "admin full access clubs" on public.clubs;
create policy "admin full access clubs" on public.clubs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── PATENTS (R&D) ────────────────────────────────────────────────────────────
create table if not exists public.patents (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  inventor   text,
  filing_no  text,
  year       text,
  status     text not null default 'Filed' check (status in ('Filed', 'Published', 'Granted')),
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.patents enable row level security;
drop policy if exists "public read active patents" on public.patents;
create policy "public read active patents" on public.patents for select using (is_active = true);
drop policy if exists "admin full access patents" on public.patents;
create policy "admin full access patents" on public.patents for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── STORAGE BUCKETS ──────────────────────────────────────────────────────────
-- documents: PDFs & office docs, 20MB cap. images: 5MB cap, images only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documents', 'documents', true, 20971520,
        array['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('images', 'images', true, 5242880, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- storage policies: public read, authenticated write
drop policy if exists "public read kits buckets" on storage.objects;
create policy "public read kits buckets" on storage.objects
  for select using (bucket_id in ('documents', 'images'));
drop policy if exists "admin insert kits buckets" on storage.objects;
create policy "admin insert kits buckets" on storage.objects
  for insert with check (bucket_id in ('documents', 'images') and auth.role() = 'authenticated');
drop policy if exists "admin update kits buckets" on storage.objects;
create policy "admin update kits buckets" on storage.objects
  for update using (bucket_id in ('documents', 'images') and auth.role() = 'authenticated');
drop policy if exists "admin delete kits buckets" on storage.objects;
create policy "admin delete kits buckets" on storage.objects
  for delete using (bucket_id in ('documents', 'images') and auth.role() = 'authenticated');
