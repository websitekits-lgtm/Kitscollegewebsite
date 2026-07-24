-- v5: grievance submissions (was localStorage-only)
create table if not exists public.grievance_submissions (
  id             uuid primary key default gen_random_uuid(),
  submitter_type text,
  name           text, email text, phone text,
  category       text, subject text, message text,
  status         text not null default 'new' check (status in ('new', 'in-review', 'resolved', 'closed')),
  created_at     timestamptz not null default now()
);
alter table public.grievance_submissions enable row level security;
drop policy if exists "public insert grievance_submissions" on public.grievance_submissions;
create policy "public insert grievance_submissions" on public.grievance_submissions for insert with check (true);
drop policy if exists "admin full access grievance_submissions" on public.grievance_submissions;
create policy "admin full access grievance_submissions" on public.grievance_submissions for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
