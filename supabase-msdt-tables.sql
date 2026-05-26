-- Tabel untuk modul Tes MSDT (Management Style Diagnostic Test)

create table if not exists peserta_msdt (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  nip text not null,
  jabatan text,
  created_at timestamptz default now()
);

create table if not exists hasil_msdt (
  id uuid primary key default gen_random_uuid(),
  peserta_id uuid references peserta_msdt(id) on delete cascade,
  skor_to int,
  skor_ro int,
  e_score numeric(3,1),
  grand_total int,
  gaya text,
  created_at timestamptz default now()
);

alter table peserta_msdt enable row level security;
alter table hasil_msdt enable row level security;
create policy "allow all" on peserta_msdt for all using (true) with check (true);
create policy "allow all" on hasil_msdt for all using (true) with check (true);
