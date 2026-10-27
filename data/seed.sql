-- ==============================================================================
-- ByDaisy Matrimonial Platform — Initial Database Seed Script
-- Execute after data/schema.sql to populate initial production records
-- ==============================================================================

-- 1. Real Weddings Portfolio
INSERT INTO real_weddings (id, title, couple_names, category, date, venue, guest_count, cover_image, photographer, mua, attire, story, highlights, is_published)
VALUES 
(
  'jihad-nanda',
  'The Royal Acehnese Dream: Tradisi Megah & Songket Emas',
  'Jihad & Nanda',
  'adat-aceh',
  '04 Oktober 2026',
  'Gedung Asrama Haji, Banda Aceh',
  '1.200 Tamu Undangan',
  '/assets/images/tradisi-aceh.jpg',
  'BP Projectbooth',
  'MUA Aceh Royal',
  'Songket Aceh Bordir Benang Emas',
  'Harmonisasi tata adat sakral dengan koordinasi 14 kru lapangan berseragam, pelaminan ukiran songket megah, dan manajemen alur pergerakan 1.200 tamu tanpa antrean tersendat.',
  '["Prosesi Peusijeuk sakral diiringi tetua adat", "Tarian Ranup Lampuan penyambutan rombongan besan", "Ruang tunggu VIP terpisah berpendingin udara", "Buffer katering terkontrol dengan backup 20%"]'::jsonb,
  true
),
(
  'nazhira-naufal',
  'Royal Nusantara Matrimony: Kemegahan Adat di Tepi Resort',
  'Nazhira & Naufal',
  'heritage',
  '08 November 2025',
  'Sribudaya Ballroom & Resort',
  '1.500 Tamu Undangan',
  '/assets/images/gallery-gold-pelaminan.jpg',
  'Le Ciel Cinema',
  'Cut Silvi Signature MUA',
  'Busana Pengantin Adat Nusantara',
  'Tata upacara adat terstruktur rapi dengan iringan tarian tradisional Aceh, pengawalan keluarga besar terhormat, serta protokoler meja VIP untuk para pejabat dan tokoh daerah.',
  '["Formasi 14 kru panggung terkoordinasi radio HT", "Meja VIP Tiffani set dengan pramusaji terdedikasi", "Arak-arakan Linto Baro di bawah naungan payung kuning", "Sistem barcode pembagian souvenir tertib & cepat"]'::jsonb,
  true
),
(
  'jacky-valerie',
  'Modern Grandeur: Chandelier & Theatrical First Dance',
  'Jacky & Valerie',
  'modern',
  '03 Oktober 2025',
  'Hermes Palace Grand Ballroom',
  '800 Tamu Undangan',
  '/assets/images/review-ballroom-fog.jpg',
  'Le Ciel Cinema',
  'Banda Aceh Glam MUA',
  'Tuxedo & Custom Bridal Gown',
  'Pementasan panggung teatrikal dengan kabut atmosferik lembut saat first dance, tata pencahayaan moving-beam dramatis, dan transisi resepsi makan malam yang spektakuler.',
  '["First dance dry-ice fog tersinkronasi audio sistem", "Live feed multi-camera & 4K drone cinematography", "Gladi resik teknis H-1 malam tanpa membebani mempelai", "Personal Assistant (PA) siaga mendampingi 14 jam penuh"]'::jsonb,
  true
),
(
  'fajar-alisha',
  'Intimate Botanical Twilight: Romantisme Taman & Fairy Lights',
  'Fajar & Alisha',
  'garden',
  '24 Agustus 2025',
  'Vandys Garden Aceh',
  '500 Tamu Undangan',
  '/assets/images/service-glasshouse.jpg',
  'BP Projectbooth',
  'Lia Natural Glam',
  'Pastel Minimalist Attire',
  'Nuansa pesta taman senja semi-outdoor berhias ribuan fairy lights, photobooth 3D bunga segar, dan alur perjamuan intim penuh kehangatan bersama para sahabat.',
  '["Instalasi gerbang ranting rotan & mawar putih kustom", "Live acoustic duo bilingual untuk latar musik santai", "Weather contingency protocol dengan kanopi tersembunyi", "Menu canapé & mocktail signature sambutan tamu"]'::jsonb,
  true
)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  venue = EXCLUDED.venue,
  updated_at = CURRENT_TIMESTAMP;

-- 2. Journal & Tradisi Articles
INSERT INTO journal_articles (id, slug, title, category, author, date, read_time, image, excerpt, views, key_takeaways)
VALUES
(
  'art-1',
  'alur-birokrasi-dan-administrasi-kua-banda-aceh',
  'Panduan Birokrasi & Administrasi KUA di Banda Aceh Tanpa Kendala',
  'Legalities & KUA',
  'Daisy Iskandar',
  '12 Oktober 2026',
  '6 Menit Baca',
  '/assets/images/journal-checklist.jpg',
  'Langkah demi langkah melengkapi berkas N1-N4, tes kesehatan pranikah di Puskesmas, hingga pendaftaran online Simkah Kemenag.',
  1420,
  '["Mulai urus berkas minimal H-60 sebelum tanggal akad", "Tes kesehatan Puskesmas meliputi TT dan screening pranikah", "Pastikan e-KTP dan Kartu Keluarga sudah sinkron di Disdukcapil", "Konsultasikan penghulu KUA untuk akad di luar balai nikah"]'::jsonb
),
(
  'art-2',
  'mengapa-wedding-planner-menghemat-budget',
  'Realita Anggaran: Mengapa Menggunakan Wedding Planner Justru Lebih Hemat?',
  'Budgeting & Finance',
  'Daisy Iskandar',
  '28 September 2026',
  '8 Menit Baca',
  '/assets/images/journal-finance.jpg',
  'Membedah mitos biaya perencana pernikahan. Bagaimana negosiasi vendor dan pencegahan pembengkakan tak terduga menyelamatkan puluhan juta rupiah.',
  2180,
  '["Pencegahan double-booking dan hidden fee vendor", "Akses harga rekanan institusional yang tidak didapat publik", "Alokasi buffer darurat 10% yang terdisiplin ketat", "Audit spesifikasi kontrak katering dan sound engineering"]'::jsonb
),
(
  'art-3',
  'menjaga-keheningan-sakral-prosesi-peusijeuk',
  'Menjaga Keheningan Sakral: Esensi Tata Cara Peusijeuk Modern',
  'Heritage & Adat',
  'Sarah Amelia',
  '15 September 2026',
  '5 Menit Baca',
  '/assets/images/tradisi-aceh.jpg',
  'Memahami filosofi beras padi, on teupuk, dan air mawar dalam tradisi Peusijeuk agar prosesi adat tetap agung di tengah resepsi kontemporer.',
  1890,
  '["Peusijeuk adalah doa restu, ketenangan, dan tolak bala", "Urutan tetua adat dan keluarga dituakan harus tersusun runtut", "Penyediaan dulang kuningan berukir menambah wibawa tradisi", "Pengaturan sound system hening khidmat saat doa dilantunkan"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  views = EXCLUDED.views,
  updated_at = CURRENT_TIMESTAMP;

-- 3. Curated Circle Vendors
INSERT INTO vendors (id, name, category, instagram, phone, location, rating, featured, price_range, deliverables)
VALUES
(
  'vnd-1',
  'BP Projectbooth',
  'Photobooth & Visual',
  '@bp.projectbooth',
  '+62 812-6900-1122',
  'Banda Aceh',
  5.0,
  true,
  'Rp 3.500.000 - Rp 7.500.000',
  '["Unlimited 4R Prints 3 Jam", "Custom Frame Foil Emas", "Instant QR Code Download", "Studio Lighting Softbox", "2 Kru Operator On-Site"]'::jsonb
),
(
  'vnd-2',
  'HS Floral Studio',
  'Floristry & Bouquet',
  '@hs_floralstudio',
  '+62 822-9011-3344',
  'Banda Aceh & Aceh Besar',
  4.9,
  true,
  'Rp 1.500.000 - Rp 5.000.000',
  '["Hand Bouquet Fresh Rose & Peony", "Corsage Jas Groom & Orang Tua", "Bunga Meja Akad Sakral", "Boutonniere Keluarga Besar"]'::jsonb
),
(
  'vnd-3',
  'Sribudaya Resort Lampeuneurut',
  'Venue & Hospitality',
  '@sribudayaresort',
  '+62 811-6800-4455',
  'Jl. Soekarno-Hatta, Lampeuneurut, Aceh Besar',
  5.0,
  true,
  'Termasuk dalam Paket All-In 2026',
  '["Kapasitas Hingga 2.000 Tamu", "Ruang Rias Pengantin Full AC", "Area Parkir 300+ Kendaraan", "Free 1 Malam Stay Villa", "Genset Backup Otomatis"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

-- 4. Client Reviews
INSERT INTO reviews (id, couple_names, wedding_date, venue, package_name, rating, quote, review, image)
VALUES
(
  'rev-1',
  'Jihad & Nanda',
  '04 Oktober 2026',
  'Gedung Asrama Haji, Banda Aceh',
  'All-In Signature ByDaisy (1.000 Pax)',
  5,
  '1.200 tamu kami terlayani tanpa antrean berdesakan.',
  'Keluarga besar kami sangat kagum pada ketenangan dan ketegasan tim ByDaisy. Acara adat Aceh berjalan khidmat, tamu kehormatan terlayani dengan protokoler istana, dan kami sebagai pengantin bisa menikmati setiap detik tanpa rasa panik.',
  '/assets/images/review-peusijeuk.jpg'
),
(
  'rev-2',
  'Jacky & Valerie',
  '03 Oktober 2025',
  'Hermes Palace Grand Ballroom',
  'Wedding Organizer & Stage Production',
  5,
  'Eksekusi ballroom lighting dan panggung spektakuler.',
  'Show director ByDaisy luar biasa. Transisi musik, kabut dry-ice saat first dance, dan pengawalan waktu sangat presisi. Kami hanya fokus pada kebahagiaan kami.',
  '/assets/images/review-ballroom-fog.jpg'
),
(
  'rev-3',
  'Fajar & Alisha',
  '24 Agustus 2025',
  'Vandys Garden Aceh',
  'Vandys All-In Garden Package',
  5,
  'Pernikahan taman impian kami terwujud nyata.',
  'Dekorasi fairy lights dan floral arrangement dari ByDaisy dan rekanan melampaui ekspektasi moodboard kami. Suasana malam begitu magis dan hangat.',
  '/assets/images/review-garden-twilight.jpg'
)
ON CONFLICT (id) DO UPDATE SET 
  quote = EXCLUDED.quote,
  review = EXCLUDED.review;

-- 5. Operational Calendar Events
INSERT INTO calendar_events (id, title, event_type, event_date, event_time, venue, package_tier, crew_count, lead_planner, notes)
VALUES
(
  'ev-1',
  'Resepsi Royal: Jihad & Nanda',
  'hari-h',
  '14 November 2026',
  '09.00 - 17.00 WIB',
  'Sribudaya Resort, Lampeuneurut',
  'Royal Sribudaya (2.000 Pax)',
  '15 Personil',
  'Daisy Iskandar',
  'Acoustic Band live standby 10.30 WIB. Kuah Beulangong disajikan jam 11.00.'
),
(
  'ev-2',
  'Gladi Bersih & Loading: Jihad & Nanda',
  'gladi',
  '13 November 2026',
  '14.00 - 18.00 WIB',
  'Sribudaya Resort',
  'Persiapan Panggung & Sound',
  '8 Kru Lapangan',
  'Rizki Pratama',
  'Cek generator 50.000 KVA dan kelistrikan tenda semi-outdoor.'
),
(
  'ev-3',
  'Final Technical Meeting: Valerie & Jacky',
  'tm',
  '14 November 2026',
  '19.30 WIB',
  'Studio ByDaisy, Lambhuk',
  'All-In Signature (300 Pax)',
  '10 Personil',
  'Sarah Amelia',
  'Briefing keluarga besar pria & wanita, MC, MUA, dan fotografer.'
)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  venue = EXCLUDED.venue,
  updated_at = CURRENT_TIMESTAMP;

-- 6. Studio Settings
INSERT INTO studio_settings (key, value)
VALUES
('general', '{
  "studioName": "ByDaisy Planner",
  "address": "Jl. Batee Suasa, Lambhuk, Banda Aceh, Aceh",
  "hotline1": "+62 822-7709-4277",
  "hotline2": "+62 821-6222-1468",
  "instagram": "@bydaisyplanner",
  "email": "concierge@bydaisy.com",
  "hours": "Senin - Minggu: 09.00 - 21.00 WIB",
  "bankAccount": "BSI (Bank Syariah Indonesia) 7182-9900-11 a.n. ByDaisy Studio",
  "licenseNumber": "NIB 9120-4011-8821 Kemkumham RI"
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = CURRENT_TIMESTAMP;
