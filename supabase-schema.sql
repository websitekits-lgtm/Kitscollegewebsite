-- ═══════════════════════════════════════════════════════════════════════════
-- KITS Website — Admin Dashboard Database Schema (v2 — full content management)
-- ═══════════════════════════════════════════════════════════════════════════
-- Safe to re-run (uses IF NOT EXISTS / CREATE OR REPLACE throughout).
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. NAV ITEMS (full tree — replaces the old additions-only nav_links) ─────
-- Every header dropdown item lives here: top-level items, group headings, and
-- leaf links. Admin can edit/reorder/hide/delete ANY of them, not just add new.
drop table if exists public.nav_links cascade;

create table if not exists public.nav_items (
  id             uuid primary key default gen_random_uuid(),
  parent_id      uuid references public.nav_items(id) on delete cascade,
  label          text not null,
  url            text,                 -- null for group headings / dropdown-only triggers
  kind           text not null default 'link' check (kind in ('top', 'group', 'link')),
  dropdown_align text check (dropdown_align in ('left', 'right')),
  sort_order     integer not null default 0,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now()
);

-- ── 2. TESTIMONIALS ──────────────────────────────────────────────────────────
create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  category   text not null check (category in ('alumni', 'parents', 'recruiters')),
  quote      text not null,
  name       text not null,
  role       text not null,
  initials   text not null,
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── 3. COMMITTEE MEMBERS (generic — used by any "list of people" page) ──────
create table if not exists public.committee_members (
  id           uuid primary key default gen_random_uuid(),
  page_slug    text not null,     -- e.g. "student-life/anti-ragging", "about/governing-body"
  name         text not null,
  designation  text,
  role_label   text,              -- "Chairperson"/"Convener"/"Member" or a category like "Management"
  department   text,
  email        text,
  phone        text,
  sort_order   integer not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ── 4. PAGE TEXTS (generic editable text/URL fields, keyed per page) ────────
create table if not exists public.page_texts (
  id           uuid primary key default gen_random_uuid(),
  page_slug    text not null,
  field_key    text not null,
  field_label  text not null,      -- shown in admin, e.g. "Intro Paragraph"
  field_value  text not null default '',
  field_type   text not null default 'text' check (field_type in ('text', 'richtext', 'url')),
  sort_order   integer not null default 0,
  unique (page_slug, field_key)
);

-- ── 5. ADMISSION FORM SUBMISSIONS (the full Apply Now form) ──────────────────
create table if not exists public.admission_submissions (
  id                     uuid primary key default gen_random_uuid(),
  first_name             text, last_name text, father_name text, mother_name text,
  dob                    text, gender text, mobile text, alternate_mobile text,
  email                  text, aadhaar text, nationality text, religion text,
  category               text, blood_group text, physically_challenged text,
  address                text, landmark text, city text, district text,
  state                  text, pincode text, country text,
  program_type           text, course text, hostel text, transport text,
  status                 text not null default 'new' check (status in ('new', 'contacted', 'admitted', 'rejected')),
  created_at             timestamptz not null default now()
);

-- ── 6. ADMISSION INQUIRIES (the short "Talk to our admissions team" form) ───
create table if not exists public.admission_inquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text, phone text, email text, program text, city text, message text,
  status      text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at  timestamptz not null default now()
);

-- ── 7. HOMEPAGE POPUP (single settings row) ──────────────────────────────────
create table if not exists public.homepage_popup (
  id          int primary key default 1,
  enabled     boolean not null default true,
  eyebrow     text not null default 'Admissions Open',
  title       text not null default 'Join KITS for the Academic Year',
  year_label  text not null default '2026 – 27',
  description text not null default 'Secure your seat at Krishna Chaitanya Institute of Technology & Sciences. Limited seats available across B.Tech programmes. Apply online now — it only takes a few minutes.',
  points      jsonb not null default '["B.Tech in CSE, AI&ML, ECE, EEE, Mechanical, Civil","AICTE approved · NAAC accredited","Scholarships available for eligible students"]',
  apply_url   text not null default '/admissions/apply',
  updated_at  timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into public.homepage_popup (id) values (1) on conflict (id) do nothing;

-- ── 8. SOCIAL / FLOATING BAR LINKS ────────────────────────────────────────────
create table if not exists public.social_links (
  id         uuid primary key default gen_random_uuid(),
  platform   text not null,
  url        text not null,
  enabled    boolean not null default true,
  sort_order integer not null default 0
);

-- ── 9. SITE SETTINGS (single settings row — contact info) ────────────────────
create table if not exists public.site_settings (
  id            int primary key default 1,
  phones        jsonb not null default '["+91-9153019999","+91-9666301309"]',
  email         text not null default 'principal@kits-anna.com',
  admissions_email text not null default 'admissions@kits-anna.com',
  address_line1 text not null default 'Devarajugattu Village, Peddaaraveedu Mandal',
  address_line2 text not null default 'Markapur - 523316, Prakasam District, AP, INDIA',
  whatsapp_number text,
  maps_url        text,
  updated_at    timestamptz not null default now(),
  constraint single_row_settings check (id = 1)
);
insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════════════
alter table public.nav_items             enable row level security;
alter table public.testimonials          enable row level security;
alter table public.committee_members     enable row level security;
alter table public.page_texts            enable row level security;
alter table public.admission_submissions enable row level security;
alter table public.admission_inquiries   enable row level security;
alter table public.homepage_popup        enable row level security;
alter table public.social_links          enable row level security;
alter table public.site_settings         enable row level security;

drop policy if exists "public read active nav_items" on public.nav_items;
create policy "public read active nav_items" on public.nav_items for select using (is_active = true);
drop policy if exists "admin full access nav_items" on public.nav_items;
create policy "admin full access nav_items" on public.nav_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read active testimonials" on public.testimonials;
create policy "public read active testimonials" on public.testimonials for select using (is_active = true);
drop policy if exists "admin full access testimonials" on public.testimonials;
create policy "admin full access testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read active committee_members" on public.committee_members;
create policy "public read active committee_members" on public.committee_members for select using (is_active = true);
drop policy if exists "admin full access committee_members" on public.committee_members;
create policy "admin full access committee_members" on public.committee_members for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read page_texts" on public.page_texts;
create policy "public read page_texts" on public.page_texts for select using (true);
drop policy if exists "admin full access page_texts" on public.page_texts;
create policy "admin full access page_texts" on public.page_texts for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public insert admission_submissions" on public.admission_submissions;
create policy "public insert admission_submissions" on public.admission_submissions for insert with check (true);
drop policy if exists "admin full access admission_submissions" on public.admission_submissions;
create policy "admin full access admission_submissions" on public.admission_submissions for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public insert admission_inquiries" on public.admission_inquiries;
create policy "public insert admission_inquiries" on public.admission_inquiries for insert with check (true);
drop policy if exists "admin full access admission_inquiries" on public.admission_inquiries;
create policy "admin full access admission_inquiries" on public.admission_inquiries for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read homepage_popup" on public.homepage_popup;
create policy "public read homepage_popup" on public.homepage_popup for select using (true);
drop policy if exists "admin full access homepage_popup" on public.homepage_popup;
create policy "admin full access homepage_popup" on public.homepage_popup for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read enabled social_links" on public.social_links;
create policy "public read enabled social_links" on public.social_links for select using (enabled = true);
drop policy if exists "admin full access social_links" on public.social_links;
create policy "admin full access social_links" on public.social_links for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read site_settings" on public.site_settings;
create policy "public read site_settings" on public.site_settings for select using (true);
drop policy if exists "admin full access site_settings" on public.site_settings;
create policy "admin full access site_settings" on public.site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════════════════════════
-- HOW TO CREATE YOUR ADMIN LOGIN
-- Supabase Dashboard → Authentication → Users → "Add User" → email + password.
-- That account signs in at yourwebsite.com/admin/login. No public sign-up exists.
-- ═══════════════════════════════════════════════════════════════════════════
