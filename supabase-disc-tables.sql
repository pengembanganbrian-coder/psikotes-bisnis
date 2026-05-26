-- Tabel untuk modul Tes DISC

create table if not exists peserta_disc (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  nip text not null,
  jabatan text,
  created_at timestamptz default now()
);

create table if not exists hasil_disc (
  id uuid primary key default gen_random_uuid(),
  peserta_id uuid references peserta_disc(id) on delete cascade,
  profil text,
  skor_d_most int, skor_i_most int, skor_s_most int, skor_c_most int,
  skor_d_least int, skor_i_least int, skor_s_least int, skor_c_least int,
  skor_d_change int, skor_i_change int, skor_s_change int, skor_c_change int,
  created_at timestamptz default now()
);

alter table peserta_disc enable row level security;
alter table hasil_disc enable row level security;
create policy "allow all" on peserta_disc for all using (true) with check (true);
create policy "allow all" on hasil_disc for all using (true) with check (true);
