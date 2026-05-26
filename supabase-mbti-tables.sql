-- Tabel untuk modul Tes MBTI

create table if not exists peserta (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  email text not null,
  jabatan text,
  created_at timestamptz default now()
);

create table if not exists hasil_tes (
  id uuid primary key default gen_random_uuid(),
  peserta_id uuid references peserta(id) on delete cascade,
  tipe_mbti text,
  skor_e int, skor_i int,
  skor_s int, skor_n int,
  skor_t int, skor_f int,
  skor_j int, skor_p int,
  created_at timestamptz default now()
);

alter table peserta enable row level security;
alter table hasil_tes enable row level security;
create policy "allow all" on peserta for all using (true) with check (true);
create policy "allow all" on hasil_tes for all using (true) with check (true);
