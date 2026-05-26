-- Tabel peserta Love Language
create table if not exists peserta_love_language (
  id         uuid primary key default gen_random_uuid(),
  nama       text not null,
  nip        text not null,
  jabatan    text,
  created_at timestamptz default now()
);

-- Tabel hasil Love Language
create table if not exists hasil_love_language (
  id           uuid primary key default gen_random_uuid(),
  peserta_id   uuid references peserta_love_language(id) on delete cascade,
  skor_w       int default 0,   -- Words of Affirmation
  skor_q       int default 0,   -- Quality Time
  skor_g       int default 0,   -- Receiving Gifts
  skor_a       int default 0,   -- Acts of Service
  skor_p       int default 0,   -- Physical Touch
  bahasa_utama text,
  bahasa_kedua text,
  created_at   timestamptz default now()
);

-- RLS: buka akses untuk anon key (sesuaikan jika pakai auth)
alter table peserta_love_language enable row level security;
alter table hasil_love_language    enable row level security;

create policy "allow all" on peserta_love_language for all using (true) with check (true);
create policy "allow all" on hasil_love_language    for all using (true) with check (true);
