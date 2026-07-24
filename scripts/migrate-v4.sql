-- v4: generic admin-editable table rows (FDPs, publications, intake, stats, …)
create table if not exists public.data_table_rows (
  id         uuid primary key default gen_random_uuid(),
  table_key  text not null,
  cells      jsonb not null default '{}',
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_data_table_rows_key on public.data_table_rows (table_key);
alter table public.data_table_rows enable row level security;
drop policy if exists "public read active data_table_rows" on public.data_table_rows;
create policy "public read active data_table_rows" on public.data_table_rows for select using (is_active = true);
drop policy if exists "admin full access data_table_rows" on public.data_table_rows;
create policy "admin full access data_table_rows" on public.data_table_rows for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
