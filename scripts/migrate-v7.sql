-- ═══════════════════════════════════════════════════════════════════════════
-- KITS v7 — WordPress-style CMS: Media Library, Posts (News & Events),
-- Gallery, wider storage buckets, realtime on all content tables.
-- Safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── STORAGE BUCKETS ──────────────────────────────────────────────────────────
-- media: the general-purpose library. Any file type, 50 MB per file.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 52428800, null)
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = null;

-- documents: widened from PDF/Word/Excel to any type (PPT, ZIP, images of scanned letters…), 50 MB.
update storage.buckets set file_size_limit = 52428800, allowed_mime_types = null where id = 'documents';

-- images: 10 MB, adds SVG and AVIF.
update storage.buckets
set file_size_limit = 10485760,
    allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml','image/avif']
where id = 'images';

-- storage policies now cover all three buckets: public read, signed-in admin write
drop policy if exists "public read kits buckets" on storage.objects;
create policy "public read kits buckets" on storage.objects
  for select using (bucket_id in ('documents', 'images', 'media'));
drop policy if exists "admin insert kits buckets" on storage.objects;
create policy "admin insert kits buckets" on storage.objects
  for insert with check (bucket_id in ('documents', 'images', 'media') and auth.role() = 'authenticated');
drop policy if exists "admin update kits buckets" on storage.objects;
create policy "admin update kits buckets" on storage.objects
  for update using (bucket_id in ('documents', 'images', 'media') and auth.role() = 'authenticated');
drop policy if exists "admin delete kits buckets" on storage.objects;
create policy "admin delete kits buckets" on storage.objects
  for delete using (bucket_id in ('documents', 'images', 'media') and auth.role() = 'authenticated');

-- ── MEDIA LIBRARY (one row per uploaded file, any bucket) ────────────────────
create table if not exists public.media_library (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  alt_text     text,
  file_name    text not null,
  file_url     text not null,
  bucket       text not null default 'media',
  storage_path text not null,
  mime_type    text,
  size_bytes   bigint,
  folder       text not null default 'general',
  created_at   timestamptz not null default now()
);
create index if not exists idx_media_library_created on public.media_library (created_at desc);
alter table public.media_library enable row level security;
drop policy if exists "public read media_library" on public.media_library;
create policy "public read media_library" on public.media_library for select using (true);
drop policy if exists "admin full access media_library" on public.media_library;
create policy "admin full access media_library" on public.media_library for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── POSTS (News, Events & Achievements) ──────────────────────────────────────
create table if not exists public.posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  category        text not null default 'News',
  excerpt         text,
  body            text not null default '',     -- paragraphs separated by blank lines
  cover_image_url text,
  attachment_url  text,                         -- optional PDF / brochure / circular
  attachment_name text,
  event_date      date not null default current_date,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists idx_posts_date on public.posts (event_date desc);
alter table public.posts enable row level security;
drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts" on public.posts for select using (is_published = true);
drop policy if exists "admin full access posts" on public.posts;
create policy "admin full access posts" on public.posts for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── GALLERY ──────────────────────────────────────────────────────────────────
create table if not exists public.gallery_items (
  id         uuid primary key default gen_random_uuid(),
  image_url  text not null,
  caption    text,
  category   text not null default 'Campus',
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.gallery_items enable row level security;
drop policy if exists "public read active gallery_items" on public.gallery_items;
create policy "public read active gallery_items" on public.gallery_items for select using (is_active = true);
drop policy if exists "admin full access gallery_items" on public.gallery_items;
create policy "admin full access gallery_items" on public.gallery_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── REALTIME: the public site refetches when any of these change ─────────────
do $$
declare t text;
begin
  foreach t in array array[
    'page_texts','site_documents','data_table_rows','custom_pages','nav_items',
    'posts','gallery_items','clubs','patents','testimonials','committee_members',
    'fee_items','homepage_popup','site_settings','social_links','media_library'
  ] loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;

-- ── PAGE TEXTS: allow image / file fields (edited with the media picker) ─────
alter table public.page_texts drop constraint if exists page_texts_field_type_check;
alter table public.page_texts add constraint page_texts_field_type_check
  check (field_type in ('text', 'richtext', 'url', 'image', 'file'));

-- ── HOMEPAGE HERO fields (Admin → Page Content → Homepage Hero) ──────────────
insert into public.page_texts (page_slug, field_key, field_label, field_value, field_type, sort_order) values
  ('home', 'tagline',      'Small line above the college name', 'Established 2008 · Markapur',            'text',  0),
  ('home', 'title_line1',  'Title, line 1',                     'Krishna Chaitanya',                       'text',  1),
  ('home', 'title_line2',  'Title, line 2',                     'Institute of Technology & Sciences',      'text',  2),
  ('home', 'motto',        'Motto under the title',             'Engineering Tomorrow''s Leaders',         'text',  3),
  ('home', 'eapcet_code',  'EAPCET code badge',                 'KCIT',                                    'text',  4),
  ('home', 'hero_image',   'Hero image (campus photo)',         '',                                        'image', 5),
  ('home', 'partner_logo', 'Top-right logo',                    '',                                        'image', 6)
on conflict (page_slug, field_key) do nothing;

-- ── CHANGE SIGNALS for realtime ──────────────────────────────────────────────
-- Realtime only delivers rows the visitor may read, so hiding a post/photo
-- (is_active/is_published = false) never reached the public site. Instead,
-- every content table bumps a public "site_changes" row via trigger, and the
-- site listens to that.
create table if not exists public.site_changes (
  table_name text primary key,
  changed_at timestamptz not null default now()
);
alter table public.site_changes enable row level security;
drop policy if exists "public read site_changes" on public.site_changes;
create policy "public read site_changes" on public.site_changes for select using (true);

create or replace function public.bump_site_change() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.site_changes (table_name, changed_at) values (TG_TABLE_NAME, now())
  on conflict (table_name) do update set changed_at = excluded.changed_at;
  return null;
end $$;

do $$
declare t text;
begin
  foreach t in array array[
    'page_texts','site_documents','data_table_rows','custom_pages','nav_items',
    'posts','gallery_items','clubs','patents','testimonials','committee_members',
    'fee_items','homepage_popup','site_settings','social_links','media_library','notifications'
  ] loop
    execute format('drop trigger if exists trg_site_change on public.%I', t);
    execute format('create trigger trg_site_change after insert or update or delete on public.%I for each statement execute function public.bump_site_change()', t);
  end loop;
  begin
    alter publication supabase_realtime add table public.site_changes;
  exception when duplicate_object then null;
  end;
end $$;
