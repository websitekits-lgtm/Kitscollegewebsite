-- v6: contact + feedback submissions (both forms previously went nowhere)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text, email text, phone text, subject text, message text,
  status text not null default 'new' check (status in ('new','replied','closed')),
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
drop policy if exists "public insert contact_messages" on public.contact_messages;
create policy "public insert contact_messages" on public.contact_messages for insert with check (true);
drop policy if exists "admin full access contact_messages" on public.contact_messages;
create policy "admin full access contact_messages" on public.contact_messages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  name text, email text, role text, category text, rating text, message text,
  status text not null default 'new' check (status in ('new','reviewed')),
  created_at timestamptz not null default now()
);
alter table public.feedback_submissions enable row level security;
drop policy if exists "public insert feedback_submissions" on public.feedback_submissions;
create policy "public insert feedback_submissions" on public.feedback_submissions for insert with check (true);
drop policy if exists "admin full access feedback_submissions" on public.feedback_submissions;
create policy "admin full access feedback_submissions" on public.feedback_submissions for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
