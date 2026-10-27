"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Users,
  Calendar,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Radio,
  HeartHandshake,
  Layers,
  FileSpreadsheet
} from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ConsultationSheet } from "@/components/modals/consultation-sheet";

export default function WeddingPlannerDetailPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const crewRoles = [
    { title: "Show Director", count: "1 Person", icon: Sparkles, desc: "Pengawas utama alur acara, tata cahaya panggung, cue musik, dan sinkronisasi panggung." },
    { title: "Timekeeper & Rundown Controller", count: "1 Person", icon: Clock, desc: "Presisi waktu mikro setiap sesi acara dari morning call, temu adat, hingga kirab pengantin." },
    { title: "LO Bride & Groom", count: "2 Persons", icon: HeartHandshake, desc: "Pendamping pribadi kebutuhan fisik kedua mempelai, bridal touch-up, gaun, dan asupan energi." },
    { title: "LO Parents & VIP Family", count: "2 Persons", icon: Users, desc: "Pengawalan khusus orang tua kedua belah pihak, sesi sungkeman, dan pendampingan tamu VVIP." },
    { title: "F&B & Catering Controller", count: "2 Persons", icon: Layers, desc: "Monitoring rotasi buffet, pengisian ulang stall pondokan, dan reservasi hidangan meja VIP." },
    { title: "Angpao & Souvenir Security", count: "2 Persons", icon: ShieldCheck, desc: "Pengawasan gembok kotak tanda kasih, pencatatan serah terima, dan distribusi souvenir." },
    { title: "Stage, Mic & Audio Coordinator", count: "2 Persons", icon: Radio, desc: "Pengaturan mikrofon nirkabel, standby HT teknisi sound system, dan alur panggung pelaminan." }
  ];

  return (
    <>
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="min-h-screen bg-canvas text-black">
        {/* Breadcrumb & Top Editorial Identifier */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-taupe/30 pb-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-xs uppercase tracking-[0.15em] text-warm-taupe">
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-black transition-colors">Services</Link>
              <span>/</span>
              <span className="text-black font-semibold">Wedding Planner & Organizer</span>
            </nav>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-taupe">
              <span className="w-2 h-2 rounded-full bg-forest-green"></span>
              <span className="w-2 h-2 rounded-full bg-brown"></span>
              <span className="w-2 h-2 rounded-full bg-taupe"></span>
              <span className="font-semibold text-black ml-1">Curation No. 01</span>
            </div>
          </div>
        </div>

        {/* Hero & Editorial Photo Mosaic */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Typography & Concept */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-2 h-2 rounded-full bg-forest-green"></span>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-forest-green">
                    Layanan Terpadu • Pendampingan Penuh
                  </span>
                </div>
                <h1 className="font-serif font-light text-3xl sm:text-5xl lg:text-6xl text-black leading-[1.12] tracking-tight mb-6 font-editorial">
                  Wedding Planner <span className="italic font-light block text-warm-taupe mt-1">& Organizer Terpadu</span>
                </h1>
                <p className="text-base sm:text-lg text-brown font-light leading-relaxed mb-8">
                  Perjalanan menuju pernikahan impian tanpa beban pikiran. Pendampingan menyeluruh dari gagasan visual pertama, kurasi vendor bereputasi tinggi, simulasi teknis gladi resik, hingga pengawalan hari H secara tertib oleh 12 kru berseragam.
                </p>

                {/* Quick Navigation Pills */}
                <div className="flex flex-wrap gap-2.5 mb-10">
                  <a href="#jobdesk" className="px-4 py-2 rounded-full bg-taupe/20 text-black text-xs uppercase tracking-wider hover:bg-forest-green hover:text-white transition-all">
                    Scope Kerja
                  </a>
                  <a href="#crew" className="px-4 py-2 rounded-full bg-taupe/20 text-black text-xs uppercase tracking-wider hover:bg-forest-green hover:text-white transition-all">
                    Formasi 12 Kru
                  </a>
                  <a href="#comparison" className="px-4 py-2 rounded-full bg-taupe/20 text-black text-xs uppercase tracking-wider hover:bg-forest-green hover:text-white transition-all">
                    Batasan Mandat
                  </a>
                  <a href="#pricelist" className="px-4 py-2 rounded-full bg-taupe/20 text-black text-xs uppercase tracking-wider hover:bg-forest-green hover:text-white transition-all">
                    Paket Investasi
                  </a>
                </div>
              </div>

              {/* Metric Indicator Strip */}
              <div className="grid grid-cols-3 gap-3 p-6 rounded-2xl bg-white/70 border border-taupe/30 shadow-sm">
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl text-black">3–9</span>
                  <span className="text-[11px] uppercase tracking-wider text-warm-taupe block mt-1">Bulan Waktu Persiapan</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl text-forest-green">12</span>
                  <span className="text-[11px] uppercase tracking-wider text-warm-taupe block mt-1">Kru Eksekusi Hari-H</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl text-black">8+</span>
                  <span className="text-[11px] uppercase tracking-wider text-warm-taupe block mt-1">Sesi Konsultasi & TM</span>
                </div>
              </div>
            </div>

            {/* Right Column: Asymmetric Editorial Gallery Grid */}
            <div className="lg:col-span-7 grid grid-cols-12 gap-4">
              <div className="col-span-8 overflow-hidden rounded-2xl relative shadow-md group">
                <Image
                  src="/assets/images/img41.jpg"
                  alt="ByDaisy wedding planner crew team posing gracefully in front of an Acehnese dome courtyard"
                  width={900}
                  height={600}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-4 bg-canvas/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-widest text-black font-medium">
                  Main Stage Coordination
                </div>
              </div>
              <div className="col-span-4 overflow-hidden rounded-2xl relative shadow-md group">
                <Image
                  src="/assets/images/portfolio-coordinator-bride.jpg"
                  alt="Professional Indonesian female wedding organizer in navy blazer and hijab briefing an elegant bride"
                  width={500}
                  height={600}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-white/90"></span>
                  <span className="w-2 h-2 rounded-full bg-white/90"></span>
                  <span className="w-2 h-2 rounded-full bg-white/90"></span>
                </div>
              </div>
              <div className="col-span-4 overflow-hidden rounded-2xl relative shadow-md group">
                <Image
                  src="/assets/images/gallery-navy-crew.jpg"
                  alt="ByDaisy female coordinator attentively monitoring guest entrance and aisle decor"
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="col-span-8 overflow-hidden rounded-2xl relative shadow-md group">
                <Image
                  src="/assets/images/img34.jpg"
                  alt="Full ensemble portrait of ByDaisy wedding team in coordinated uniforms"
                  width={900}
                  height={500}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 right-4 bg-black text-white px-3.5 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-semibold">
                  12-Person Certified Core Crew
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Phase In-Depth Jobdesk Section */}
        <section className="bg-sand/30 border-y border-taupe/30 py-20 md:py-28" id="jobdesk">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.2em] font-semibold text-forest-green">
                  <span>01</span>
                  <span className="w-6 h-px bg-forest-green"></span>
                  <span>Comprehensive Scope of Work</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-black">
                  Tiga Fase Pengawalan Terstruktur
                </h2>
              </div>
              <p className="text-base text-brown max-w-md font-light leading-relaxed">
                Dari rancangan awal hingga detik terakhir resepsi, kami memetakan setiap probabilitas dengan presisi mutlak agar kedua mempelai dan keluarga menikmati hari bahagia.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Phase 01 */}
              <div className="p-8 rounded-3xl bg-white border border-taupe/30 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3.5 py-1.5 rounded-full bg-taupe/20 text-black text-xs uppercase tracking-wider font-medium">
                      Fase 01 • Bulan 1–6
                    </span>
                    <Sparkles className="w-5 h-5 text-forest-green" />
                  </div>
                  <h3 className="font-serif text-2xl text-black mb-3">
                    Concept & Budget Engineering
                  </h3>
                  <p className="text-sm text-brown mb-6 font-light leading-relaxed">
                    Membangun fondasi estetika, pengendalian alokasi anggaran, dan seleksi vendor yang selaras dengan visi pernikahan.
                  </p>
                  <ul className="space-y-4 text-sm text-black">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                      <span><strong>Concept Book & Moodboard:</strong> Kurasi palet warna, stilistika busana pengantin, dan visual instalasi dekor.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                      <span><strong>Budget Engineering:</strong> Spreadsheet pembiayaan transparan untuk mencegah pembengkakan dana tak terduga.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                      <span><strong>Kurasi & Negosiasi Vendor:</strong> Venue, MUA, Busana Adat, Catering, Dokumentasi, Musik, dan Lighting.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                      <span><strong>Master Preparation Timeline:</strong> Kalender kontrol target berkala dari D-180 hingga D-30.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-taupe/20 flex items-center justify-between text-warm-taupe text-xs uppercase tracking-wider">
                  <span>Sesi Tatap Muka</span>
                  <strong className="text-black">Min. 5 Pertemuan</strong>
                </div>
              </div>

              {/* Phase 02 */}
              <div className="p-8 rounded-3xl bg-white border border-forest-green/30 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative">
                <div className="absolute top-4 right-4">
                  <span className="w-2 h-2 rounded-full bg-forest-green animate-ping"></span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3.5 py-1.5 rounded-full bg-forest-green/10 text-forest-green text-xs uppercase tracking-wider font-semibold">
                      Fase 02 • H-30 s/d H-3
                    </span>
                    <Calendar className="w-5 h-5 text-forest-green" />
                  </div>
                  <h3 className="font-serif text-2xl text-black mb-3">
                    Technical Sync & Rundown
                  </h3>
                  <p className="text-sm text-brown mb-6 font-light leading-relaxed">
                    Sinkronisasi teknis seluruh vendor rekanan dan briefing intensif keluarga besar untuk mengeliminasi kebingungan di hari H.
                  </p>
                  <ul className="space-y-4 text-sm text-black">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                      <span><strong>Minute-by-Minute Rundown:</strong> Panduan waktu mikro dari persiapan subuh, prosesi sakral, hingga grand entrance.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                      <span><strong>Technical Meeting (TM) Akbar:</strong> Pertemuan komprehensif bersama seluruh vendor dan perwakilan keluarga inti.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                      <span><strong>Gladi Resik (Rehearsal):</strong> Simulasi prosesi adat, alur kirab pengantin, dan penempatan saksi di venue.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                      <span><strong>Guest List & Seating Plan:</strong> Manajemen reservasi meja VIP dan sistem penyerahan souvenir.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-taupe/20 flex items-center justify-between text-warm-taupe text-xs uppercase tracking-wider">
                  <span>Koordinasi Akhir</span>
                  <strong className="text-forest-green font-semibold">Full Vendor Alignment</strong>
                </div>
              </div>

              {/* Phase 03 */}
              <div className="p-8 rounded-3xl bg-black text-white shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs uppercase tracking-wider font-medium">
                      Fase 03 • Hari Pelaksanaan
                    </span>
                    <ShieldCheck className="w-5 h-5 text-sand" />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-3">
                    D-Day Master Execution
                  </h3>
                  <p className="text-sm text-taupe mb-6 font-light leading-relaxed">
                    Pengawalan 12 kru berseragam dan terhubung radio HT multi-channel memastikan tiap detik berjalan lancar tanpa celah.
                  </p>
                  <ul className="space-y-4 text-sm text-white/90">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sand shrink-0 mt-0.5" />
                      <span><strong>Show Director & Timekeeper:</strong> Pengawas utama tempo acara, tata lampu panggung, dan musik.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sand shrink-0 mt-0.5" />
                      <span><strong>Dedicated LO Bride & Groom:</strong> Asisten pribadi yang mendampingi kebutuhan fisik, gaun, dan asupan mempelai.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sand shrink-0 mt-0.5" />
                      <span><strong>LO Orang Tua & VIP Family:</strong> Pengawalan prosesi sungkeman, penyambutan tamu kehormatan, dan meja makan VIP.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sand shrink-0 mt-0.5" />
                      <span><strong>Catering & Gift Security:</strong> Monitoring perputaran hidangan dan pengamanan ketat kotak tanda kasih.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between text-taupe text-xs uppercase tracking-wider">
                  <span>Standby Coverage</span>
                  <strong className="text-sand font-semibold">12–16 Jam Penuh</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Crew Formation & Organogram */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28" id="crew">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Operational Structure Grid */}
            <div className="lg:col-span-6 bg-sand/30 p-8 md:p-10 rounded-3xl border border-taupe/30">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-forest-green block mb-1">
                    Struktur Operasional Lapangan
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-black">Formasi 12 Kru ByDaisy</h3>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-forest-green"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-brown"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-taupe"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {crewRoles.map((role, idx) => {
                  const Icon = role.icon;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-taupe/20 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Icon className="w-5 h-5 text-forest-green" />
                          <span className="px-2 py-0.5 rounded bg-forest-green/10 text-forest-green text-[10px] font-bold uppercase tracking-wider">
                            {role.count}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm text-black mb-1">{role.title}</h4>
                        <p className="text-xs text-brown leading-relaxed">{role.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-warm-taupe mt-6 italic">
                *Seluruh kru mengenakan seragam resmi ByDaisy beridentitas jelas, radio HT berfrekuensi tertutup, dan perlengkapan bridal emergency kit lengkap.
              </p>
            </div>

            {/* Right: Narrative Assurance */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-[0.2em] font-semibold text-forest-green">
                <span>02</span>
                <span className="w-6 h-px bg-forest-green"></span>
                <span>Bebas Khawatir di Hari Istimewa</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-black leading-tight mb-6">
                Keluarga Adalah Tamu Terhormat, Bukan Panitia Acara.
              </h2>
              <p className="text-lg text-brown font-light leading-relaxed mb-6">
                Seringkali pada hari pernikahan, orang tua dan kerabat terdekat justru kelelahan karena harus mengurus konsumsi, mengarahkan fotografer, atau mencari pembawa acara.
              </p>
              <p className="text-base text-brown/90 leading-relaxed mb-8">
                Dengan menyerahkan mandat kepada tim ByDaisy Planner, seluruh keluarga inti dapat fokus memberikan restu, menyapa kerabat jauh, dan menikmati hidangan dengan khidmat tanpa terbebani urusan logistik teknis.
              </p>

              <div className="space-y-3.5 border-t border-taupe/30 pt-6">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-forest-green"></span>
                  <span className="text-sm font-medium text-black">Sistem Radio HT Ear-Piece Tanpa Suara Bising di Area Tamu</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-forest-green"></span>
                  <span className="text-sm font-medium text-black">Bridal Emergency Kit Lengkap (Jarum, Benang, Make-up Touch-up, Obat Pribadi)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-forest-green"></span>
                  <span className="text-sm font-medium text-black">Rekapitulasi Fisik Souvenir dan Tanda Kasih Tertutup Bersegel</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table: Included vs Client Responsibility */}
        <section className="bg-sand/30 border-y border-taupe/30 py-20 md:py-28" id="comparison">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-forest-green block mb-3">
                Transparansi Mandat
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-black">
                Cakupan Kerja & Batasan Tanggung Jawab
              </h2>
              <p className="text-base text-brown mt-4 font-light">
                Kami menjunjung tinggi kejelasan peran agar kolaborasi antara pasangan pengantin dan tim perencana berjalan harmonis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* ByDaisy Responsibility */}
              <div className="p-8 md:p-10 rounded-3xl bg-white border border-forest-green/20 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center font-bold text-sm">
                    ✓
                  </span>
                  <h3 className="font-serif text-2xl text-black">Ditangani Penuh Oleh ByDaisy</h3>
                </div>
                <ul className="space-y-4 text-sm text-black">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-forest-green mt-1 shrink-0" />
                    <span>Penyusunan konsep visual, color swatch, dan tema resepsi.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-forest-green mt-1 shrink-0" />
                    <span>Pencarian, pembandingan harga, dan negosiasi kontrak vendor.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-forest-green mt-1 shrink-0" />
                    <span>Penyusunan booklet rundown acara dan distribusi ke seluruh tim.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-forest-green mt-1 shrink-0" />
                    <span>Penyelenggaraan Technical Meeting & Gladi Resik di venue.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-forest-green mt-1 shrink-0" />
                    <span>Pengawalan penuh 12 kru pada akad / pemberkatan & resepsi.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-forest-green mt-1 shrink-0" />
                    <span>Serah terima barang hantaran, mahar, dan rekapitulasi kotak angpao.</span>
                  </li>
                </ul>
              </div>

              {/* Client Responsibility */}
              <div className="p-8 md:p-10 rounded-3xl bg-white/60 border border-taupe/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-taupe/20 text-warm-taupe flex items-center justify-center font-bold text-sm">
                    ✦
                  </span>
                  <h3 className="font-serif text-2xl text-black">Peran Pengantin & Keluarga</h3>
                </div>
                <ul className="space-y-4 text-sm text-brown">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-warm-taupe mt-1 shrink-0" />
                    <span>Penyelesaian pembayaran langsung (termin invoice) ke rekening vendor terkait.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-warm-taupe mt-1 shrink-0" />
                    <span>Keputusan final persetujuan vendor dan pemilihan busana pengantin.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-warm-taupe mt-1 shrink-0" />
                    <span>Penyusunan daftar nama tamu undangan dan penomoran meja VIP.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-warm-taupe mt-1 shrink-0" />
                    <span>Penyediaan perhiasan mahar dan dokumen legal pernikahan ke KUA/Catatan Sipil.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-warm-taupe mt-1 shrink-0" />
                    <span>Penunjukan saksi pernikahan resmi dan juru bicara keluarga.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real Weddings Showcase */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-forest-green block mb-2">
                Portfolio Curation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-black">
                Kisah Nyata Pasangan ByDaisy
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-forest-green transition-colors"
            >
              <span>Lihat Seluruh Galeri Pernikahan</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wedding 1 */}
            <div className="group overflow-hidden rounded-3xl bg-sand/30 border border-taupe/30 hover:shadow-xl transition-all duration-500">
              <div className="relative h-96 overflow-hidden">
                <Image
                  src="/assets/images/tradisi-aceh.jpg"
                  alt="Indonesian bride and groom in majestic traditional Acehnese and modern attire"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-canvas/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider text-black font-medium">
                  Full Wedding Planner • 8 Bulan Persiapan
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-serif text-2xl text-black">Jihad & Nanda</h3>
                  <span className="text-xs uppercase tracking-wider text-warm-taupe">Hermes Palace Ballroom</span>
                </div>
                <p className="text-sm text-brown mb-6 font-light leading-relaxed">
                  "ByDaisy berhasil meramu adat Aceh yang sakral dengan resepsi internasional yang begitu dinamis. Kami sama sekali tidak panik dari pagi hingga pesta berakhir."
                </p>
                <div className="flex items-center gap-4 text-xs uppercase tracking-wider text-warm-taupe">
                  <span>1,200 Undangan</span>
                  <span>•</span>
                  <span>14 Kru Lapangan</span>
                  <span>•</span>
                  <span>18 Vendor Rekanan</span>
                </div>
              </div>
            </div>

            {/* Wedding 2 */}
            <div className="group overflow-hidden rounded-3xl bg-sand/30 border border-taupe/30 hover:shadow-xl transition-all duration-500">
              <div className="relative h-96 overflow-hidden">
                <Image
                  src="/assets/images/service-glasshouse.jpg"
                  alt="Intimate outdoor glasshouse wedding couple holding hands during golden hour sunset"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-canvas/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider text-black font-medium">
                  Full Wedding Planner • 6 Bulan Persiapan
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-serif text-2xl text-black">Jacky & Valerie</h3>
                  <span className="text-xs uppercase tracking-wider text-warm-taupe">Taman Ratu Safiatuddin</span>
                </div>
                <p className="text-sm text-brown mb-6 font-light leading-relaxed">
                  "Detail rundown menit demi menit dari ByDaisy luar biasa akurat. Koordinasi sound system dan transisi pencahayaan saat prosesi dansa sangat magis."
                </p>
                <div className="flex items-center gap-4 text-xs uppercase tracking-wider text-warm-taupe">
                  <span>650 Undangan</span>
                  <span>•</span>
                  <span>12 Kru Lapangan</span>
                  <span>•</span>
                  <span>12 Vendor Rekanan</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricelist Matrix & Investment */}
        <section className="bg-sand/30 border-y border-taupe/30 py-20 md:py-28" id="pricelist">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-forest-green block mb-3">
                Estimasi Investasi
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-black">
                Pilihan Paket Perencanaan
              </h2>
              <p className="text-base text-brown mt-4 font-light">
                Transparan, bernilai tinggi, dan dapat disesuaikan dengan skala serta kompleksitas adat acara Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Package 1 */}
              <div className="p-8 rounded-3xl bg-white border border-taupe/30 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <span className="text-xs uppercase tracking-wider text-warm-taupe block mb-2 font-medium">H-30 Take Over</span>
                  <h3 className="font-serif text-2xl text-black mb-1">Wedding Organizer</h3>
                  <p className="text-sm text-brown mb-6 font-light">Untuk pasangan yang telah mengontrak vendor sendiri dan membutuhkan eksekusi profesional di Hari-H.</p>
                  <div className="mb-6 pb-6 border-b border-taupe/20">
                    <span className="text-[10px] uppercase text-warm-taupe tracking-wider block">Mulai Dari</span>
                    <span className="font-serif text-3xl text-black">IDR 12.500.000</span>
                  </div>
                  <ul className="space-y-3 text-sm text-brown mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-forest-green" />
                      <span>Pendampingan H-30 hari</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-forest-green" />
                      <span>1x Technical Meeting Akbar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-forest-green" />
                      <span>8 Kru Lapangan Hari-H</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-forest-green" />
                      <span>Penyusunan Rundown Detail</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/6282277094277?text=Halo%20ByDaisy,%20saya%20tertarik%20dengan%20Paket%20Wedding%20Organizer%20(Day-Of)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full text-center border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
                >
                  Pilih Paket WO
                </a>
              </div>

              {/* Package 2 (Featured) */}
              <div className="p-8 rounded-3xl bg-white relative flex flex-col justify-between shadow-xl ring-2 ring-forest-green">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-forest-green text-white text-[10px] uppercase tracking-widest font-semibold shadow-sm">
                  Paling Diminati • Full Service
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-forest-green block mb-2 mt-2 font-semibold">Bulan 1 s/d Hari-H</span>
                  <h3 className="font-serif text-2xl text-black mb-1">Full Wedding Planner</h3>
                  <p className="text-sm text-brown mb-6 font-light">Pendampingan hulu-ke-hilir: perancangan konsep, kurasi vendor, negosiasi kontrak, dan pengawalan hari-H.</p>
                  <div className="mb-6 pb-6 border-b border-taupe/20">
                    <span className="text-[10px] uppercase text-warm-taupe tracking-wider block">Mulai Dari</span>
                    <span className="font-serif text-3xl text-forest-green">IDR 24.500.000</span>
                  </div>
                  <ul className="space-y-3 text-sm text-black mb-8">
                    <li className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-forest-green" />
                      <span>Pendampingan 6-9 Bulan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest-green" />
                      <span>Concept Book & Moodboard Estetika</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest-green" />
                      <span>Budget Engineering & Vendor Match</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest-green" />
                      <span>12 Kru Eksekusi Berseragam Hari-H</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest-green" />
                      <span>VIP Family & Bridal LO Khusus</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="w-full py-3.5 rounded-full text-center bg-forest-green text-white text-sm font-medium hover:bg-black transition-colors shadow-sm"
                >
                  Konsultasi Sekarang
                </button>
              </div>

              {/* Package 3 */}
              <div className="p-8 rounded-3xl bg-white border border-taupe/30 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <span className="text-xs uppercase tracking-wider text-warm-taupe block mb-2 font-medium">Multiday / Royal</span>
                  <h3 className="font-serif text-2xl text-black mb-1">Custom Grand Royal</h3>
                  <p className="text-sm text-brown mb-6 font-light">Dirancang khusus untuk pernikahan bertingkat adat, multi-day celebrations, atau berskala &gt;1.500 tamu.</p>
                  <div className="mb-6 pb-6 border-b border-taupe/20">
                    <span className="text-[10px] uppercase text-warm-taupe tracking-wider block">Investasi Fleksibel</span>
                    <span className="font-serif text-3xl text-black">Custom Proposal</span>
                  </div>
                  <ul className="space-y-3 text-sm text-brown mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-forest-green" />
                      <span>Multi-Day Rangkaian Acara Adat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-forest-green" />
                      <span>14-18 Kru Senior Berseragam</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-forest-green" />
                      <span>Hospitality & Guest Concierge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-forest-green" />
                      <span>Dedicated Production Stage Manager</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/6282277094277?text=Halo%20ByDaisy,%20saya%20ingin%20request%20Custom%20Proposal%20Grand%20Royal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full text-center border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
                >
                  Request Proposal
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Private Consultation Call to Action */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="bg-black text-white rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-forest-green/20 blur-3xl pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-forest-green"></span>
                  <span className="text-xs uppercase tracking-[0.2em] text-sand font-semibold">Jadwalkan Sesi Privat</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
                  Mari Bicara Tentang Pernikahan yang Selama Ini Anda Bayangkan.
                </h2>
                <p className="text-base text-taupe font-light leading-relaxed mb-8 max-w-xl">
                  Konsultasikan tanggal, konsep adat atau modern, serta estimasi kuota tamu Anda. Kami menyambut kehadiran Anda secara tatap muka di Banda Aceh maupun melalui panggilan Zoom interaktif untuk luar kota.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://wa.me/6282277094277?text=Halo%20ByDaisy%20Planner,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20Wedding%20Planner%20&%20Organizer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-medium hover:bg-forest-green hover:text-white transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hubungi via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsConsultationOpen(true)}
                    className="px-8 py-3.5 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    Buka Form Reservasi
                  </button>
                </div>
              </div>
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-2">
                  <span className="font-serif text-2xl text-sand block mb-1">Hotline Resmi Studio</span>
                  <div className="space-y-1">
                    <a href="https://wa.me/6282277094277" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-white block hover:text-sand transition-colors">
                      +62 822-7709-4277 (Hotline 1)
                    </a>
                    <a href="https://wa.me/6282162221468" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-white block hover:text-sand transition-colors">
                      +62 821-6222-1468 (Hotline 2)
                    </a>
                  </div>
                  <p className="text-xs text-taupe pt-1 border-t border-white/10">
                    Jl. Batee Suasa, Lambhuk, Banda Aceh
                  </p>
                  <a
                    href="/assets/ByDaisy-Company-Profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] uppercase tracking-wider text-sand hover:underline font-semibold pt-1"
                  >
                    Unduh Company Profile (PDF) ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ConsultationSheet isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </>
  );
}
