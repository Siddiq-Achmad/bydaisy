# Standar Creative Dev: Motion, Aksesibilitas, dan Copywriting Anti-Slop

**Platform**: ByDaisy Luxury Matrimonial Platform  
**Versi**: 1.0 (Oktober 2026)  
**Status**: Standar Resmi Arsitektur Antarmuka & Konten  
**Unit Bisnis**: ByDaisy Planner (Banda Aceh & Sumatra)  

---

## 1. Filosofi & Latar Belakang

Situs web ByDaisy dirancang dengan standar kualitas tinggi yang memadukan estetika editorial (*quiet luxury*) dengan kenyamanan operasional tingkat tinggi. 

Untuk memastikan antarmuka terasa dirancang secara cermat oleh perancang berpengalaman dan bukan luaran generator AI generik (*anti-slop standard*), seluruh elemen transisi, efek gerak, dan gaya penulisan mengikuti protokol ketat:
1. **Motion with Purpose (C-1 & R-19)**: Setiap animasi harus memiliki fungsi UX yang jelas (mengarahkan atensi, memberi umpan balik spasial) dan dilarang menjalankan animasi berulang tanpa henti (*infinite loops*) yang mengganggu ketenangan visual.
2. **Vestibular Accessibility (WCAG 2.2 AAA & antislop-human)**: Menghormati preferensi pengguna yang mengaktifkan `prefers-reduced-motion: reduce` pada seluruh lapisan interaksi (scroll, kursor, tirai halaman, dan partikel kanvas).
3. **No-AI-Slop Copywriting (R-02 & R-16)**: Menghilangkan seluruh kosakata abstrak generik AI, melarang penggunaan *em dash* (`—`), serta menggunakan kalimat bahasa Indonesia yang hangat, otentik, membumi, dan merefleksikan tradisi pernikahan riil di Aceh dan Sumatra.

---

## 2. Arsitektur Motion, Transisi & Efek Visual

### 2.1 Smooth Scroll & Ticker Sync (`components/providers/smooth-scroll.tsx`)
- **Engine**: Lenis Smooth Scroll tersinkronisasi langsung dengan `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- **Lag Smoothing**: `gsap.ticker.lagSmoothing(0)` menjaga sinkronisasi posisi tepat waktu tanpa perlambatan terakumulasi.
- **Optimasi Mobile**: Menggunakan `syncTouch: false` dan multiplier proporsional (`touchMultiplier: 1.2`) agar pengalaman menggulir di perangkat layar sentuh tetap alami tanpa *scroll hijacking*.
- **Aksesibilitas Gerak**: Jika terdeteksi `prefers-reduced-motion: reduce`, inisialisasi Lenis dilewati dan browser menggunakan scroll natif standar tanpa interpolasi buatan.

### 2.2 Magnetic Custom Cursor (`components/cinematic/custom-cursor.tsx`)
- **High-Performance Quick Setters**: Mengganti alokasi tween berulang dengan `gsap.quickTo(target, property, { duration, ease })`. Pendekatan ini menghilangkan lonjakan pembersihan memori (*garbage collection spikes*) saat mouse bergerak cepat, menjaga performa tetap mulus di 60-120 FPS.
- **Window Boundary Detection**: Event `mouseleave` dan `mouseenter` pada `document` disematkan untuk memudarkan (*fade-out*) kursor secara halus saat mouse meninggalkan jendela browser.
- **Pengecualian Perangkat Sentuh**: Otomatis dinonaktifkan pada perangkat layar sentuh (`(pointer: coarse)`) dan pada preferensi *reduced motion*.

### 2.3 Procedural Grain Overlay Canvas (`components/cinematic/grain-overlay.tsx`)
- **Page Visibility API (`document.hidden`)**: Loop animasi `requestAnimationFrame` otomatis dijeda saat tab berada di latar belakang atau jendela browser diminimalkan. Hal ini menghemat konsumsi daya CPU dan baterai perangkat pengguna secara signifikan.
- **Reduced Motion Fallback**: Jika pengguna memilih *reduced motion*, canvas hanya menghasilkan satu lembar tekstur noise statis beresolusi optimal (160x160px diulang sebagai pattern) tanpa perulangan rendering berkelanjutan.

### 2.4 Transisi Halaman (Page Curtain Transition) (`app/template.tsx`)
- **Pacing**: Durasi wipe tirai kain ganda (*Warm Taupe* `#8B7A6B` dan *Canvas* `#FBF9F5`) dioptimalkan menjadi 0,45s-0,52s (dari sebelumnya 0,95s) dengan delay kemunculan konten hanya 0,12s (dari sebelumnya 0,35s).
- **Efek**: Menghilangkan rasa jeda lambat antarhalaman sembari tetap mempertahankan sentuhan sinematik.
- **Bypass Instan**: Pada mode *reduced motion*, tirai dilewati secara langsung dan halaman segera tampil utuh.

### 2.5 Portofolio Horizontal Pinned Scroll (`components/sections/horizontal-portfolio.tsx`)
- **Responsif via `gsap.matchMedia`**:
  - **Desktop (`min-width: 768px`)**: ScrollTrigger menyematkan (*pinning*) section dan mengonversi gulir vertikal menjadi geseran horizontal kartu pernikahan secara halus.
  - **Ponsel & Tablet (`max-width: 767px`)**: Pinning dinonaktifkan sepenuhnya. Bagian portofolio reflow menjadi kontainer gulir horizontal natif (*native horizontal scroll/swipe*) sehingga layar pengguna tidak terkunci secara paksa saat menelusuri halaman di ponsel.

### 2.6 Penghapusan Infinite Pulsing Loop (R-19 & R-31)
- Titik status dekoratif yang sebelumnya memakai class `animate-pulse` tak berujung telah diubah menjadi titik status solid yang tenang dan elegan di seluruh halaman publik dan portal admin.

---

## 3. Standar Copywriting Humanized & Anti-Slop (No AI Slop)

### 3.1 Larangan Em Dash (Hard Rule R-02)
Penggunaan karakter *em dash* (`—` atau `&mdash;` atau `\u2014`) dilarang di seluruh teks antarmuka maupun dokumentasi pengguna. Sebagai gantinya, gunakan:
- Koma (`,`) atau titik dua (`:`)
- Tanda hubung standar (`-`)
- Titik (`.`)

### 3.2 Kamus Kata Terlarang (Banned AI Vocabulary)
Kata-kata berikut dikategorikan sebagai klise model AI yang tidak memiliki makna fungsional nyata dan telah dibersihkan dari platform:

| Kata Terlarang | Mengapa Terlarang | Pengganti Riil ByDaisy |
| :--- | :--- | :--- |
| **Seamless** | Kosakata klise AI paling sering muncul; mengklaim kesempurnaan tanpa bukti. | *"Eksekusi Hari-H Presisi"*, *"Rapi dan Tertib"*, *"Tanpa Kendala"*. |
| **Bespoke** | Kosakata klise AI; terkesan elitis tanpa detail rancangan nyata. | *"Perencanaan Personal"*, *"Tata Artistik Ruang"*, *"Custom Proposal"*. |
| **Paripurna** | Kata formal klise yang berlebihan (*significance inflation*). | *"Menyeluruh"*, *"Terpadu"*, *"Hulu ke Hilir"*. |
| **Tanpa Kompromi** | Slogan klise hiperbolis tanpa tolok ukur teknis. | *"Rapi & Tepat Waktu"*, *"Sesuai Standar Operasional"*. |
| **Pengalaman Tak Terlupakan** | Klise standar brosur yang tidak menceritakan apa pun. | Deskripsi spesifik: *"pernikahan yang tertib, hangat, dan berkesan"*. |
| **Elevate / Unleash / Delve / Tapestry** | Pola kalimat buatan mesin yang tidak natural. | Kalimat aktif langsung yang menjelaskan hasil kerja tim. |

### 3.3 Otentisitas Budaya & Detail Operasional Nyata
Narasi ByDaisy mencerminkan realitas persiapan pernikahan di Banda Aceh dan Sumatra:
- **Formasi Kru**: Menyebutkan jumlah kru nyata (8, 10, 12, hingga 14 kru berseragam dengan walkie-talkie).
- **Kuliner Khas**: Menyebutkan menu adat otentik (Kuah Beulangong, Daging Sie Reboh, Keumamah Ikan Kayu, 17 menu hidang besan).
- **Prosesi Adat**: Menguraikan tahapan sakral (Peusijuek, Tari Ranup Lampuan, kirab pengantin).
- **Ikonografi Kontekstual**: Mengganti ikon seragam `Sparkles` dengan simbol fungsional yang relevan (`Heart` untuk kenyamanan emosional, `Award` untuk pakem adat, `Clock` untuk ketepatan waktu, dan `Users` untuk pendampingan keluarga/protokol VIP).
- **Bukti dan Data Nyata (C-5 & R-17)**: Mengganti metrik fiktif (*"0% Krisis Tak Teratasi"*) dengan metrik operasional nyata (*"14+ Kru On-Site Resmi"*).

---

## 4. Matriks Checklist Verifikasi Sebelum Rilis

Setiap penambahan atau revisi kode di masa depan wajib memverifikasi checklist berikut:

- [x] **Zero Em Dashes**: Tidak ada karakter `—` pada file `.tsx`, `.ts`, maupun konten teks.
- [x] **Zero AI Buzzwords**: Tidak ada kata *seamless*, *bespoke*, *paripurna*, atau *tanpa kompromi*.
- [x] **Reduced Motion Compliance**: Komponen animasi memeriksa `(prefers-reduced-motion: reduce)`.
- [x] **No Endless Loops**: Tidak ada `animate-pulse` pada dot status dekoratif.
- [x] **Mobile Responsive Flow**: Portofolio horizontal tidak mengunci scroll vertikal ponsel.
- [x] **TypeScript Clean**: `npx tsc --noEmit` lolos dengan kode keluar 0.
- [x] **Next.js Production Build**: `npm run build` sukses mengompilasi 50/50 rute.
