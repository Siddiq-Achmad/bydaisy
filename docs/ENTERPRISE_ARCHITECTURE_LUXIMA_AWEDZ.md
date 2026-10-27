# Dokumentasi Arsitektur Enterprise: Integrasi ByDaisy dengan LUXIMA & AWEDZ

**Versi Dokumen**: 1.0 (Oktober 2026)  
**Status**: Disetujui & Siap Implementasi  
**Unit Bisnis**: ByDaisy Luxury Matrimonial Platform  
**Parent Ecosystem**: LUXIMA CRM & AWEDZ Event Platform  

---

## 1. Ringkasan Eksekutif (Executive Summary)

Platform **ByDaisy** dirancang sebagai unit bisnis enterprise mandiri (*Autonomous Enterprise Tenant*) yang diinkubasi dan dikembangkan oleh holding teknologi pernikahan **LUXIMA & AWEDZ**. 

Model bisnis enterprise ini memberikan fleksibilitas penuh bagi ByDaisy untuk:
1. Memiliki **identitas brand visual independen** dengan gaya editorial mewah (tipografi *The Seasons* Display Serif dan Google Fonts *Plus Jakarta Sans*).
2. Mengelola **homepage otonom** dengan katalog pernikahan adat Aceh / Sumatra dan matriks harga paket lokal tersendiri.
3. Menjalankan **custom domain mandiri** (`bydaisy.com`, `bydaisy.id`) maupun subdomain platform (`bydaisy.awedz.id`).
4. Tetap terhubung secara mulus (*seamlessly integrated*) dengan ekosistem induk melalui sinkronisasi dua arah (*2-Way Sync*) dengan mesin **LUXIMA CRM** (manajemen prospek dan sales pipeline) serta platform **AWEDZ** (manajemen jadwal panggung, buku tamu digital, dan penugasan vendor lapangan).

---

## 2. Model Multi-Tenant & Domain Routing (Next.js Edge Proxy)

Untuk mendukung custom domain tanpa perlu menduplikasi kode sumber (*codebase* terpisah per brand), arsitektur ByDaisy mengadopsi mekanisme **Edge Proxy Routing** resmi Next.js 16 melalui file [proxy.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/proxy.ts).

### 2.1 Alur Resolusi Domain & Header Propagation
Setiap permintaan HTTP yang masuk ke server Next.js diinspeksi oleh [proxy.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/proxy.ts):

```
Pengunjung Akses (bydaisy.com / bydaisy.awedz.com / localhost:3000)
                              │
                              ▼
           [ proxy.ts (Next.js 16 Edge Proxy Engine) ]
                              │
  ├── 1. Baca Header 'Host'
  ├── 2. Cocokkan dengan Tenant Registry di lib/enterprise.ts
  ├── 3. Injeksi Header Kontekstual:
  │      ├── x-tenant-id: "bydaisy"
  │      ├── x-enterprise-domain: "bydaisy.com"
  │      ├── x-is-custom-domain: "true"
  │      └── x-ecosystem-parent: "LUXIMA-AWEDZ"
  └── 4. Teruskan Request ke App Router / API Handlers
```

### 2.2 Keuntungan Teknis Edge Proxy
- **Single Deployment**: Cukup melakukan satu kali build dan deployment (misal di Vercel, Coolify, atau Docker Container). Semua domain mengarah ke instance yang sama.
- **Zero Downtime Domain Onboarding**: Penambahan domain baru untuk unit bisnis enterprise lain hanya memerlukan konfigurasi CNAME DNS dan penambahan record di tabel `enterprise_tenants`.
- **Dynamic Theming**: Komponen UI dapat membaca header `x-tenant-id` untuk menerapkan palet warna, logo, atau bahasa yang relevan secara dinamis.

---

## 3. Analisis Komparasi Arsitektur Database Enterprise

Salah satu keputusan terpenting dalam arsitektur enterprise adalah menentukan strategi penyimpanan data: **Apakah data ByDaisy digabung dalam satu database bersama platform LUXIMA & AWEDZ, atau dipisahkan ke dalam database mandiri?**

Berikut adalah evaluasi teknis atas 3 pilihan arsitektur:

| Parameter Evaluasi | 1. Kombinasi Database (Shared DB with RLS) *(Rekomendasi)* | 2. Isolasi Skema (Schema-per-Tenant) | 3. Pemisahan Database Mandiri (Dedicated DB) |
| :--- | :--- | :--- | :--- |
| **Penyimpanan Fisik** | 1 Database Engine Terpusat, 1 Skema (`public.*`) | 1 Database Engine, Skema Terpisah (`tenant_bydaisy.*`) | Server / Database Instance Terpisah Fisik |
| **Pemisahan Data** | Logis via `tenant_id` dan Row-Level Security (RLS) | Logis via Namespace / PostgreSQL Schema | Fisik 100% (Isolated Connection String) |
| **Biaya Infrastruktur** | **Sangat Hemat** (1 cluster efisien) | **Hemat** (1 cluster efisien) | **Tinggi** (biaya server berlipat ganda) |
| **Konektivitas Vendor** | **Instan via Relational JOIN** ke vendor LUXIMA | **Dapat dilakukan cross-schema query** | **Harus via REST API Webhook / ETL** |
| **Analitik Holding** | **Real-time instant aggregation** di Dashboard HQ | Perlu kueri multi-schema | Perlu data warehouse / data lake terpisah |
| **Maintenance Migrasi** | **1x Eksekusi Migration Pipeline** | Perlu iterasi migrasi ke setiap schema | Migrasi terpisah ke setiap instance database |
| **Backup & Restore** | Terpusat (backup seluruh holding) | Granular per-schema (`pg_dump -n`) | Granular per-database instance |

### 3.1 Rekomendasi Utama: Pendekatan 1 (Shared Database with Row-Level Security)
Kami **sangat merekomendasikan Pendekatan 1 (Kombinasi Database Terpusat dengan RLS)** karena:
1. **Efisiensi Holding**: ByDaisy bukan klien eksternal asing, melainkan entitas bisnis yang dimiliki/diinkubasi langsung oleh LUXIMA / AWEDZ. Memisahkan database fisik akan menciptakan overhead operasional dan redundansi data tanpa nilai tambah yang sepadan.
2. **Katalog Rekanan Bersama (Shared Curated Circle)**: Master vendor direktori yang telah terverifikasi oleh tim kurasi LUXIMA (MUA, fotografer, videografer, sound system) dapat langsung dihubungkan ke acara pernikahan ByDaisy tanpa duplikasi entri.
3. **Keamanan Terjamin dengan RLS PostgreSQL**: PostgreSQL Row-Level Security memastikan bahwa query dari backend ByDaisy secara matematis tidak dapat membaca atau menulis data milik tenant lain:
   ```sql
   ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
   CREATE POLICY tenant_isolation_leads ON leads
     FOR ALL
     USING (tenant_id = current_setting('app.current_tenant', true));
   ```

### 3.2 Kapan Pemisahan Database Mandiri (Pendekatan 3) Diperlukan?
Pemisahan database fisik hanya disarankan apabila di masa depan:
- ByDaisy dilepas menjadi entitas hukum terpisah (*spin-off / divestment*) yang memiliki investor mandiri.
- ByDaisy melayani klien VVIP dengan perjanjian kerahasiaan (*Non-Disclosure Agreement* / NDA) tingkat institusi militer atau perbankan yang secara eksplisit melarang penyimpanan data pada database bersama.

### 3.3 Optimasi Utama: Arsitektur Headless API-First via LUXIMA-API (https://api.luxima.id)
Sesuai kebutuhan tata kelola enterprise holding, **ByDaisy tidak mengakses database SQL secara langsung**, melainkan beroperasi sebagai **Headless Enterprise Frontend / BFF (Backend-for-Frontend)** yang sepenuhnya mengonsumsi **LUXIMA-API** (`https://api.luxima.id`).

```
[ PENGUNJUNG BYDAISY / ADMIN DASHBOARD ]
                   │
                   ▼
     [ ByDaisy App Router / API Handlers ]
                   │
                   ▼
     [ lib/luxima-api.ts (Enterprise SDK) ]
                   │  ├── X-Tenant-ID: "bydaisy"
                   │  ├── X-Organization-ID: "luxima-awedz-ent-01"
                   │  └── Authorization: Bearer <ORG_KEY>
                   ▼
  [ https://api.luxima.id (LUXIMA Cloud Core) ]
         ├── 1. Enterprise SSO & Auth: /v1/auth/*
         ├── 2. Leads & CRM Pipeline: /v1/enterprise/bydaisy/leads
         ├── 3. Weddings Portfolio: /v1/enterprise/bydaisy/weddings
         ├── 4. Curated Vendors Circle: /v1/enterprise/bydaisy/vendors
         ├── 5. Calendar & Rundown: /v1/enterprise/bydaisy/calendar
         └── 6. Multi-Tenant Database Storage & RLS Security
```

**Keuntungan Pendekatan Headless LUXIMA-API:**
1. **Zero Database Coupling**: ByDaisy tidak memerlukan connection string database, pooler, migrasi skema tabel, atau hak akses langsung ke database server. Seluruh enkripsi data dan proteksi RLS dikelola di sisi LUXIMA-API.
2. **Centralized Business Logic**: Aturan validasi prospek, kalkulasi komisi vendor, dan audit log dikelola secara terpusat oleh tim backend LUXIMA.
3. **Enterprise Single Sign-On (SSO)**: Akun planner dan admin ByDaisy diautentikasi langsung melalui LUXIMA ID tanpa perlu database user lokal terpisah.
4. **Offline Resilience Fallback**: Jika server LUXIMA-API sedang dalam masa maintenance, SDK [lib/luxima-api.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/lib/luxima-api.ts) secara otomatis beralih ke snapshot lokal aman di folder `data/*.json` sehingga website ByDaisy selalu aktif 100% tanpa henti (*zero downtime*).

---

## 4. Lapisan Akses Data (Unified Data Access Layer & LUXIMA-API Client)

Aplikasi ByDaisy menggunakan SDK terpadu [lib/luxima-api.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/lib/luxima-api.ts) yang mengemas seluruh panggilan API ke `https://api.luxima.id`:

### 4.1 Entitas Data yang Didukung via LUXIMA-API
1. **Portfolio Real Weddings**: `luximaApi.weddings` -> `GET/POST/PUT/DELETE /v1/enterprise/bydaisy/weddings`
2. **Artikel Editorial & Tradisi**: `luximaApi.journal` -> `GET/POST/PUT/DELETE /v1/enterprise/bydaisy/journal`
3. **Direktori Rekanan Vendor**: `luximaApi.vendors` -> `GET/POST/PUT/DELETE /v1/enterprise/bydaisy/vendors`
4. **Surat Cinta & Ulasan Klien**: `luximaApi.reviews` -> `GET/POST/PUT/DELETE /v1/enterprise/bydaisy/reviews`
5. **Inquiry Leads Pipeline**: `luximaApi.leads` -> `GET/POST/PUT/DELETE /v1/enterprise/bydaisy/leads`
6. **Kalender Operasional Acara**: `luximaApi.calendar` -> `GET/POST/PUT/DELETE /v1/enterprise/bydaisy/calendar`
7. **Jadwal Konsultasi Tatap Muka / Online**: `luximaApi.consultations` -> `GET/POST/PUT/DELETE /v1/enterprise/bydaisy/consultations`
8. **Katalog Paket & Harga**: `luximaApi.packages` -> `GET/PUT /v1/enterprise/bydaisy/packages`
9. **Konfigurasi Legalitas & Kontak Studio**: `luximaApi.settings` -> `GET/PUT /v1/enterprise/bydaisy/settings`
10. **Autentikasi & Sesi Single Sign-On**: `luximaApi.auth` -> `POST /v1/auth/enterprise/login`, `GET /v1/auth/verify`

### 4.2 Skema DDL SQL & Script Seeding (Referensi untuk Tim Backend LUXIMA)
Meskipun ByDaisy tidak mengakses database SQL secara langsung, file DDL dan seeding berikut disediakan sebagai referensi resmi bagi tim database LUXIMA:
- [data/schema.sql](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/data/schema.sql): Struktur tabel DDL lengkap dengan kolom `tenant_id`, `organization_id`, dan RLS policies.
- [data/seed.sql](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/data/seed.sql): Script data awal yang memuat seluruh rekaman aktif ByDaisy.

---

## 5. Protokol Integrasi Dua Arah (2-Way Synchronization Protocols)

Integrasi antara ByDaisy dengan LUXIMA CRM dan AWEDZ Platform bekerja secara dua arah:

```
[ PENGUNJUNG BYDAISY ]                     [ LUXIMA CRM HQ ]              [ AWEDZ EVENT HUB ]
       │                                           │                              │
       ▼ (Submit Form Konsultasi)                  │                              │
[ ByDaisy Web Engine ]                             │                              │
       │                                           │                              │
       ├── 1. Simpan Lokal (leads.json / SQL)      │                              │
       └── 2. Outbound Dispatch ──────────────────>│ (Menerima Lead Baru via Webhook)
                                                   │                              │
                                                   ├── Follow-up Sales & Quotation
                                                   └── Deal Closed & Contract Signed
                                                           │
                                                           ▼ (Inbound Webhook Push)
       [ POST /api/integrations/luxima-sync ] <────┘
       └── Status Lead Otomatis Berubah ke "Won / Deal"
                                                           │
       [ POST /api/calendar (Input Jadwal Hari H) ]        │
       └── Outbound Dispatch ────────────────────────────────────────────────────>│ (Sync Event & Kru)
                                                                                  │
                                                                                  ├── Vendor Check-in
                                                                                  └── Live Rundown Update
                                                                                          │
       [ POST /api/integrations/awedz-sync ] <────────────────────────────────────┘
       └── Update Catatan Operasional Kru On-Site
```

### 5.1 Outbound Dispatches
- **Lead Sync ke LUXIMA CRM**: Fungsi `syncLeadToLuxima()` pada [lib/integrations.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/lib/integrations.ts) mengirim payload JSON berstandar enterprise yang memuat `tenantId: "bydaisy"`, `organizationId`, nama klien, nomor WhatsApp, preferensi venue, dan estimasi anggaran.
- **Event Sync ke AWEDZ**: Fungsi `syncEventToAwedz()` menyinkronkan data hari H resepsi, gladi bersih, dan technical meeting ke kalender master AWEDZ.

### 5.2 Inbound Webhook Receivers
- **LUXIMA Receiver**: Endpoint [app/api/integrations/luxima-sync/route.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/app/api/integrations/luxima-sync/route.ts) menerima pembaruan status deal atau catatan dari tim CRM LUXIMA dan langsung memperbarui database ByDaisy.
- **AWEDZ Receiver**: Endpoint [app/api/integrations/awedz-sync/route.ts](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/app/api/integrations/awedz-sync/route.ts) menerima perubahan rundown panggung, pergantian personil kru, atau konfirmasi vendor dari sistem lapangan AWEDZ.

---

## 6. Pengaturan & Monitoring pada Admin Dashboard

Seluruh status konektor dan strategi database dapat dipantau langsung oleh tim manajemen dan teknis melalui [Developer & API Integration Hub](file:///Users/siddiq/Desktop/WEB%20Project/bydaisy/app/(admin)/dashboard/developer/page.tsx).

Fitur yang tersedia pada Developer Hub:
1. **Interactive Database Architecture Selector**: Panel visual perbandingan antara Shared Database, Schema Isolation, dan Dedicated Database.
2. **API Endpoint Health Check**: Pengujian otomatis status 10 endpoint RESTful platform.
3. **Webhook Payload Simulator**: Generator payload pengujian format LUXIMA dan AWEDZ dengan verifikasi signature.
4. **Cache Invalidation**: Tombol flush cache Next.js App Router secara instan.
