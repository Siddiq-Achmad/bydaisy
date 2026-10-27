# Rencana Implementasi Integrasi Enterprise: ByDaisy dengan LUXIMA & AWEDZ

**Kode Dokumen**: IMP-BYDAISY-2026-01  
**Target Rilis**: Q4 2026 / Q1 2027  
**Penanggung Jawab Teknis**: Lead Architect & Fullstack Engineering Team  
**Stakeholder**: Manajemen ByDaisy, Tim Pengembang LUXIMA CRM, Tim Platform AWEDZ  

---

## 1. Tujuan & Ruang Lingkup Proyek

Rencana implementasi ini memetakan langkah-langkah transisi teknis dari arsitektur penyimpanan lokal ByDaisy saat ini (*JSON-based local storage*) menuju integrasi penuh dengan infrastruktur cloud holding **LUXIMA & AWEDZ**.

### Sasaran Utama:
1. **Otonomi Front-End & Domain**: Menjalankan domain mandiri (`bydaisy.com`) dengan homepage kustom tanpa ketergantungan tampilan pada platform induk.
2. **Database Terpadu (*Shared Multi-Tenant with RLS*)**: Menghubungkan ByDaisy ke database cloud utama dengan pemisahan isolasi `tenant_id` dan *Row-Level Security* (RLS).
3. **Automasi Lead Dua Arah (*2-Way Lead Sync*)**: Prospek yang masuk dari ByDaisy otomatis terkirim ke CRM LUXIMA, dan status transaksi yang diperbarui oleh sales di HQ otomatis tercermin di dashboard ByDaisy.
4. **Sinkronisasi Operasional Acara**: Jadwal hari H, gladi resik, dan technical meeting terhubung langsung dengan kalender master dan tim lapangan AWEDZ.

---

## 2. Peta Fase Implementasi (Phase-by-Phase Roadmap)

```
[ FASE 1: DESAIN & FONDASI LOKAL ]  ──>  SELESAI (100%)
  ├── Pemisahan data ke folder data/*.json
  ├── Pembuatan 10 RESTful API endpoints
  ├── Implementasi Next.js Edge Proxy (proxy.ts)
  └── Dashboard CRUD Admin & Developer Hub

               │
               ▼
[ FASE 2: INTEGRASI HEADLESS LUXIMA-API ] ──> SELESAI (100% SDK READY)
  ├── SDK Klien Resmi: lib/luxima-api.ts (https://api.luxima.id)
  ├── Autentikasi Single Sign-On (SSO): /api/auth/*
  ├── Bypassing Database: Zero Direct Database Connection
  └── Offline Resilience: Automatic Fallback to Local Snapshots

               │
               ▼
[ FASE 3: KONFIGURASI DOMAIN & DNS ]  ──> ESTIMASI: 3 HARI
  ├── Penataan CNAME / A-Record DNS bydaisy.com
  ├── Verifikasi SSL Let's Encrypt / Wildcard
  └── Pengujian Edge Proxy Header Resolution

               │
               ▼
[ FASE 4: AKTIVASI 2-WAY SYNC & TESTING ] ──> ESTIMASI: 1 MINGGU
  ├── Pertukaran API Secret & Webhook Handshake
  ├── Pengujian Sandbox Transaksi End-to-End
  └── Implementasi Retry Policy & Dead Letter Queue (DLQ)

               │
               ▼
[ FASE 5: PELUNCURAN PRODUKSI & AUDIT ] ──> ESTIMASI: 3 HARI
  ├── Pengaktifan Rate Limiting & Monitoring Sentry
  ├── Penjadwalan Backup Otomatis Harian
  └── Serah Terima Teknis & Sign-Off Operasional
```

---

## 3. Rincian Teknis per Fase

### FASE 1: Desain & Fondasi Lokal (Status: Selesai 100%)
- **Hasil yang Dicapai:**
  - Pemisahan 10 entitas data ke dalam format JSON terstandarisasi di [data/](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/data).
  - 10 Route Handlers Next.js App Router dengan metode HTTP lengkap (`GET`, `POST`, `PUT`, `DELETE`).
  - Next.js Edge Proxy [proxy.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/proxy.ts) untuk mendeteksi custom domain dan menyuntikkan header tenant.
  - Modul adapter integrasi [lib/integrations.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/lib/integrations.ts) dan [lib/enterprise.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/lib/enterprise.ts).
  - Skema database SQL [data/schema.sql](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/data/schema.sql) dan seeding [data/seed.sql](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/data/seed.sql).
  - Endpoint receiver 2-way sync aktif: `/api/integrations/luxima-sync` dan `/api/integrations/awedz-sync`.
  - Verifikasi build: **0 error TypeScript** dan **48 rute terkompilasi sempurna**.

---

### FASE 2: Integrasi Headless LUXIMA-API (Status: Selesai & Teruji 100%)
*Pendekatan Arsitektur: Zero Direct Database Access (Headless Client)*

Sesuai arahan arsitektur enterprise holding, ByDaisy tidak mengakses database SQL secara langsung, melainkan berkomunikasi secara eksklusif melalui **LUXIMA-API** (`https://api.luxima.id`).

1. **Penerapan SDK Klien Resmi ([lib/luxima-api.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/lib/luxima-api.ts)):**
   - Menghubungkan seluruh modul ByDaisy ke `https://api.luxima.id` dengan header `X-Tenant-ID: bydaisy`, `X-Organization-ID: luxima-awedz-ent-01`, dan token otorisasi Bearer.
   - Mengenkapsulasi operasi CRUD untuk Real Weddings, Leads, Vendors, Calendar, Consultations, Reviews, Journal, Settings, Packages, dan Gallery.
2. **Autentikasi & Single Sign-On (SSO):**
   - **Halaman Login Enterprise ([app/login/page.tsx](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/app/login/page.tsx)):** Antarmuka login bertaraf luxury dengan tipografi *The Seasons*, lencana resmi *LUXIMA - AWEDZ Enterprise SSO*, tombol quick-fill kredensial concierge demo, dan alur redirect mulus ke dashboard.
   - **Rute Autentikasi:** Rute login `/api/auth/login`, sesi aktif `/api/auth/me`, dan logout `/api/auth/logout` telah aktif dan terhubung ke LUXIMA ID SSO. Token disimpan secara aman pada cookie HTTP-only (`luxima_auth_token`).
   - **Integrasi Sesi di Admin Layout ([app/(admin)/layout.tsx](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/app/%28admin%29/layout.tsx)):** Header admin otomatis memvalidasi sesi via `/api/auth/me`, menampilkan inisial dan nama pengguna terautentikasi (*Daisy Iskandar*), status aktif *LUXIMA SSO Active*, dan dropdown aksi dengan tombol *Keluar (Logout)* fungsional.
   - **Interactive Developer Hub Tester ([app/(admin)/dashboard/developer/page.tsx](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/app/%28admin%29/dashboard/developer/page.tsx)):** Kartu pengujian sesi SSO langsung dengan simulasi handshake live ke `/api/auth/login` dan `/api/auth/me`.
3. **Peniadaan Akses Database Langsung (Zero Direct DB Coupling):**
   - Seluruh 10 route handlers API serta 2 receiver sinkronisasi (`luxima-sync`, `awedz-sync`) telah dimigrasikan 100% menggunakan `luximaApi.*`. Tidak ada modul aplikasi yang mengakses langsung ke SQL.
   - Seluruh kueri SQL, connection pooling (PgBouncer), dan proteksi Row-Level Security (RLS) dikelola sepenuhnya di sisi server LUXIMA-API.
4. **Resilience & Zero Downtime Fallback:**
   - Jika koneksi ke `https://api.luxima.id` mengalami timeout atau server sedang maintenance, SDK [lib/luxima-api.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/lib/luxima-api.ts) secara otomatis menyajikan data dari snapshot lokal terverifikasi di folder `data/*.json`. Website publik ByDaisy tetap menyala 100%.

---

### FASE 3: Konfigurasi Custom Domain & DNS Edge
*Target Durasi: Minggu 2 (Hari 1-3)*

1. **Pengaturan DNS Registrar (Domain ByDaisy):**
   - Domain Utama: `bydaisy.com`
     - Record `A` -> IP Load Balancer / Ingress Cloudflare.
     - Record `CNAME` (`www`) -> `bydaisy.com`.
   - Domain Cadangan / Lokal: `bydaisy.id`.
   - Subdomain Platform: `bydaisy.awedz.com` -> CNAME platform hosting.
2. **Penyediaan Sertifikat SSL / TLS:**
   - Otomatisasi sertifikat SSL menggunakan Let's Encrypt atau Cloudflare Universal SSL dengan enkripsi end-to-end (Strict Full SSL).
3. **Pengujian Resolusi Header pada Edge Proxy:**
   - Verifikasi bahwa request ke `https://bydaisy.com` menghasilkan response header:
     - `x-tenant-id: bydaisy`
     - `x-enterprise-powered-by: LUXIMA-AWEDZ-ENTERPRISE`

---

### FASE 4: Aktivasi Sinkronisasi Dua Arah & Pengujian Sandbox
*Target Durasi: Minggu 2 (Hari 4-7)*

1. **Pertukaran Kredensial Keamanan (API Keys & Secrets):**
   - Tambahkan variabel lingkungan pada file `.env.production`:
     ```env
     LUXIMA_CRM_ENDPOINT="https://api.luxima.id/v1/enterprise/bydaisy"
     LUXIMA_ORG_KEY="lux_org_992014_daisy"
     LUXIMA_WEBHOOK_SECRET="sec_luxima_bydaisy_2026_prod"
     
     AWEDZ_HUB_ENDPOINT="https://hub.awedz.com/api/v2/tenants/bydaisy"
     AWEDZ_EVENT_HUB_ID="hub_ent_bydaisy_sumatra"
     AWEDZ_API_KEY="awz_live_sec_bd881a7b"
     ```
2. **Skenario Pengujian Sandbox (End-to-End Simulation):**
   - **Skenario A (Outbound Lead):**
     1. Klien mengisi form konsultasi pada website ByDaisy.
     2. Verifikasi lead tersimpan di database ByDaisy.
     3. Verifikasi payload terkirim ke webhook endpoint LUXIMA CRM.
     4. Verifikasi notifikasi WhatsApp otomatis terpicu ke nomor sales concierge ByDaisy.
   - **Skenario B (Inbound Lead Status Update):**
     1. Tim sales LUXIMA HQ mengubah status prospek menjadi "Deal / Won" pada antarmuka CRM LUXIMA.
     2. LUXIMA mengirimkan webhook ke `POST https://bydaisy.com/api/integrations/luxima-sync`.
     3. Verifikasi status pada [Dashboard Leads ByDaisy](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/app/(admin)/dashboard/leads/page.tsx) otomatis berubah menjadi "Won / Deal".
   - **Skenario C (Event Rundown Update dari AWEDZ):**
     1. Tim panggung AWEDZ memperbarui PIC gladi bersih.
     2. AWEDZ mengirim webhook ke `POST https://bydaisy.com/api/integrations/awedz-sync`.
     3. Verifikasi catatan operasional di [Kalender ByDaisy](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/app/(admin)/dashboard/calendar/page.tsx) tersinkronisasi.
3. **Mekanisme Retry & Dead Letter Queue (DLQ):**
   - Jika endpoint webhook LUXIMA/AWEDZ mengalami gangguan koneksi sementara (*network timeout*), sistem akan melakukan retry otomatis sebanyak 3x dengan *exponential backoff* (jeda 5 detik, 30 detik, 2 menit).
   - Payload yang gagal setelah 3x percobaan akan dicatat dalam tabel `failed_webhooks_queue` untuk dapat di-resend secara manual dari Dashboard Developer.

---

### FASE 5: Peluncuran Produksi, Monitoring, & SLA
*Target Durasi: Minggu 3*

1. **Security Hardening:**
   - Aktifkan proteksi Rate Limiting (maksimal 60 request/menit untuk API publik) menggunakan Cloudflare WAF atau Upstash Redis.
   - Validasi HMAC SHA-256 signature pada seluruh incoming webhook untuk mencegah serangan injeksi data palsu.
2. **Observability & Error Tracking:**
   - Hubungkan monitoring error aplikasi ke Sentry untuk penanganan bug real-time.
   - Pantau metrik latensi query dan API response time di bawah 200ms.
3. **Jadwal Backup Otomatis Database:**
   - Backup harian otomatis (*daily automated snapshots*) dengan retensi 30 hari.
   - Point-in-Time Recovery (PITR) aktif untuk pemulihan instan jika terjadi kesalahan manusia (*human error*).

---

## 4. Matriks Peran & Tanggung Jawab (RACI Matrix)

| Aktivitas / Deliverable | Tim Engineering ByDaisy | Tim Backend LUXIMA CRM | Tim Platform AWEDZ | Manajemen ByDaisy |
| :--- | :---: | :---: | :---: | :---: |
| **Pengembangan UI & Custom Domain** | **Accountable (A)** | Informed (I) | Informed (I) | Consulted (C) |
| **Penyediaan Database PostgreSQL & RLS** | Responsible (R) | **Accountable (A)** | Responsible (R) | Informed (I) |
| **Konfigurasi Webhook Outbound & Inbound** | Responsible (R) | Responsible (R) | Responsible (R) | Informed (I) |
| **Uji Coba Sandbox Lead Pipeline** | Responsible (R) | **Accountable (A)** | Informed (I) | Consulted (C) |
| **Uji Coba Sinkronisasi Kalender Acara** | Responsible (R) | Informed (I) | **Accountable (A)** | Consulted (C) |
| **Persetujuan Peluncuran Produksi (Go-Live)** | Consulted (C) | Consulted (C) | Consulted (C) | **Accountable (A)** |

*Keterangan: (R)esponsible: Pelaksana teknis, (A)ccountable: Pemilik tanggung jawab akhir, (C)onsulted: Pihak yang dimintai masukan, (I)nformed: Pihak yang menerima informasi status.*

---

## 5. Rencana Mitigasi Risiko & Rollback

| Potensi Risiko | Tingkat Dampak | Rencana Mitigasi Pencegahan | Rencana Pemulihan (Rollback Plan) |
| :--- | :---: | :--- | :--- |
| **Server CRM LUXIMA Sedang Maintenance saat Ada Lead Baru Masuk** | Sedang | Lead tetap disimpan secara aman di database lokal ByDaisy terlebih dahulu sebelum webhook dikirim. | Background worker akan mengirim ulang lead yang tertunda saat koneksi LUXIMA kembali pulih (tanpa kehilangan data klien). |
| **Kesalahan Propagasi DNS pada Custom Domain `bydaisy.com`** | Tinggi | TTL DNS diset ke 300 detik (5 menit) sebelum proses migrasi dilakukan. | Lalu lintas sementara dialihkan ke subdomain platform `bydaisy.awedz.com` yang sudah memiliki sertifikat aktif. |
| **Kebocoran Data Antar-Tenant pada Shared Database** | Kritis | Kebijakan Row-Level Security (RLS) PostgreSQL diuji ketat dengan unit test khusus tenant isolation. | Jika terjadi kegagalan RLS, role koneksi database dibatasi ke mode kueri view bersyarat `WHERE tenant_id = 'bydaisy'`. |

---

## 6. Daftar Periksa Kesiapan Peluncuran (Go-Live Checklist)

- [x] Arsitektur pemisahan data JSON dan 10 RESTful API handlers selesai dan teruji.
- [x] Edge Proxy Next.js ([proxy.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/proxy.ts)) aktif menginjeksi header tenant dan domain.
- [x] Skema database [data/schema.sql](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/data/schema.sql) dan seeding [data/seed.sql](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/data/seed.sql) siap dieksekusi.
- [x] Adapter integrasi [lib/integrations.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/lib/integrations.ts) dan receiver webhook siap beroperasi.
- [x] Evaluasi arsitektur database interaktif aktif pada [Developer Hub Admin](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/app/(admin)/dashboard/developer/page.tsx).
- [ ] Database PostgreSQL / Supabase cloud di-provisioning oleh tim infrastruktur holding.
- [ ] Record DNS domain `bydaisy.com` diarahkan ke server produksi.
- [ ] Pertukaran API Secret Key produksi dengan tim LUXIMA dan AWEDZ.
- [ ] Uji coba pengiriman 1 lead dummy dan 1 event dummy di lingkungan live.
- [ ] Penandatanganan serah terima operasional (Sign-off Go-Live).
