"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Heart,
  Star,
  CheckCircle2,
  ChevronRight,
  Radio,
  FileCheck,
  Search,
} from "lucide-react";

interface RealWedding {
  id: string;
  couple: string;
  date: string;
  venue: string;
  guests: string;
  category: "adat-aceh" | "heritage" | "modern" | "garden";
  categoryLabel: string;
  service: string;
  image: string;
  story: string;
  highlights: string[];
}

import initialWeddings from "@/data/real-weddings.json";

export default function PortfolioPage() {
  const [weddings, setWeddings] = useState<RealWedding[]>(initialWeddings as RealWedding[]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedCouple, setSelectedCouple] = useState<RealWedding | null>(null);

  // Live Date Checker State
  const [checkDate, setCheckDate] = useState("");
  const [checkLocation, setCheckLocation] = useState("Banda Aceh & Sekitarnya");
  const [checkResult, setCheckResult] = useState<{
    status: "available" | "limited" | "none";
    message: string;
  } | null>(null);

  const categories = [
    { id: "all", label: "Semua Kisah" },
    { id: "adat-aceh", label: "Tradisi Aceh Megah" },
    { id: "heritage", label: "Royal Nusantara" },
    { id: "modern", label: "Modern Ballroom" },
    { id: "garden", label: "Intimate Garden" },
  ];

  const filteredWeddings =
    activeCategory === "all"
      ? weddings
      : weddings.filter((w) => w.category === activeCategory);

  const handleCheckDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkDate) {
      setCheckResult({
        status: "none",
        message: "Silakan pilih tanggal perkiraan pernikahan Anda terlebih dahulu.",
      });
      return;
    }

    // Mock realistic logic based on month
    const selectedMonth = new Date(checkDate).getMonth() + 1;
    if ([6, 7, 8, 11, 12].includes(selectedMonth)) {
      setCheckResult({
        status: "limited",
        message: `Musim favorit di ${checkLocation}! Slot akhir pekan tersisa 2 tim kru. Segera jadwalkan konsultasi privat untuk mengunci tanggal.`,
      });
    } else {
      setCheckResult({
        status: "available",
        message: `Kabar baik! Slot tanggal pernikahan untuk ${checkLocation} masih tersedia untuk pengawalan eksklusif ByDaisy.`,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-canvas text-black">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="pt-8 pb-24 md:pt-14 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-taupe mb-4">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-black font-medium">Portfolio & Real Weddings</span>
          </nav>

          {/* Editorial Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-warm-taupe" />
                <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                  Real Moments, Real Stories
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.12] mb-6 font-editorial font-light">
                Kisah Bahagia <br />
                <span className="italic font-light text-forest-green">
                  Pasangan ByDaisy
                </span>
              </h1>

              <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-2xl">
                Setiap pernikahan memiliki jiwa dan keanggunan tersendiri. Telusuri
                rekam jejak nyata dari pasangan yang mempercayakan orkestrasi hari
                sakral mereka kepada sentuhan tenang ByDaisy.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="bg-sand/70 border border-taupe/40 p-6 rounded-3xl space-y-3 w-full lg:max-w-xs shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-warm-taupe">
                    Kapasitas Musim
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-forest-green bg-forest-green/10 px-2 py-0.5 rounded-full">
                    Terbatas
                  </span>
                </div>
                <div className="font-serif text-2xl text-black font-light">
                  Musim 2025 - 2026
                </div>
                <p className="text-xs text-black/70 font-light leading-relaxed">
                  Maksimal 2 pernikahan per akhir pekan demi dedikasi, fokus, dan
                  ketenangan mutlak mempelai serta keluarga besar.
                </p>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-forest-green text-canvas shadow-md"
                    : "bg-sand text-black/75 hover:bg-taupe/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Real Wedding Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {filteredWeddings.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col rounded-3xl overflow-hidden bg-sand border border-taupe/40 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Visual Header */}
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={item.image}
                    alt={`${item.couple} wedding showcase`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-wider text-canvas font-medium">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Bottom Meta Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-canvas">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-light-taupe block">
                        Kapasitas Acara
                      </span>
                      <span className="font-serif text-sm italic font-light">
                        {item.guests}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Content Container */}
                <div className="p-7 bg-[#5c4331] text-canvas flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-canvas mb-2 font-editorial">
                      {item.couple}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase text-light-taupe/90 mb-4 font-light">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-taupe" />
                        {item.date}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-taupe" />
                        {item.venue}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-canvas/85 font-light leading-relaxed mb-6">
                      {item.story}
                    </p>

                    {/* Highlight Bullets */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-white/15">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-canvas/90 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-light-taupe shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 flex justify-between items-center text-xs">
                    <span className="italic font-serif text-xs text-taupe font-light">
                      {item.service}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsConsultationOpen(true)}
                      className="inline-flex items-center gap-1.5 font-medium tracking-wider uppercase text-canvas hover:text-white transition-colors group/link"
                    >
                      <span>Inquire Konsep</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Operational Excellence Feature Section */}
          <div className="bg-sand/60 border border-taupe/35 rounded-3xl p-8 sm:p-14 mb-24 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Asymmetric Visual Collage */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-sand border border-taupe/40">
                  <Image
                    src="/assets/images/portfolio-table-setting.jpg"
                    alt="Detail penataan meja perjamuan ByDaisy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>

                <div className="hidden sm:block absolute -bottom-8 -right-6 w-3/5 aspect-square rounded-3xl overflow-hidden shadow-2xl bg-canvas border-2 border-canvas">
                  <Image
                    src="/assets/images/portfolio-coordinator-bride.jpg"
                    alt="Koordinator ByDaisy mendampingi mempelai wanita"
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Stamp Badge */}
                <div className="absolute -top-4 -left-4 bg-forest-green text-canvas p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
                  <span className="font-serif text-3xl font-light leading-none">
                    100%
                  </span>
                  <span className="text-[9px] uppercase tracking-widest mt-1 text-light-taupe font-semibold">
                    On-Time Rundown
                  </span>
                </div>
              </div>

              {/* Operational Narrative */}
              <div className="lg:col-span-6 space-y-6 lg:pl-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-brown block mb-2">
                    Manajemen Tanpa Kekhawatiran
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-black font-editorial font-light leading-snug">
                    Bagaimana Kami Menjaga Setiap Detik Tetap Sempurna
                  </h2>
                </div>

                <p className="text-sm text-black/75 font-light leading-relaxed">
                  Pernikahan di ByDaisy bukan sekadar daftar vendor yang
                  terhubung. Kami membangun atmosfer tenang di mana pengantin, orang
                  tua, dan tamu hanya perlu merayakan cinta, sementara tim kami
                  mengeksekusi puluhan detail tak terlihat di balik layar.
                </p>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-canvas border border-taupe/35 text-center">
                    <div className="font-serif text-2xl text-black font-light">
                      14 Kru
                    </div>
                    <p className="text-[11px] text-warm-taupe mt-1">
                      Tim berseragam HT tertutup
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-canvas border border-taupe/35 text-center">
                    <div className="font-serif text-2xl text-black font-light">
                      45 Menit
                    </div>
                    <p className="text-[11px] text-warm-taupe mt-1">
                      Buffer darurat setiap sesi
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-canvas border border-taupe/35 text-center">
                    <div className="font-serif text-2xl text-black font-light">
                      1 Dedicated PA
                    </div>
                    <p className="text-[11px] text-warm-taupe mt-1">
                      Khusus mempelai seharian
                    </p>
                  </div>
                </div>

                {/* Feature Bullets */}
                <div className="space-y-3 pt-2 text-xs sm:text-sm text-black/80 font-light">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                    <span>
                      <strong>Pengawalan Adat Presisi:</strong> Pemahaman mendalam
                      pakem Peusijeuk, Tueng Dara Baro, adat Melayu Deli, Minangkabau,
                      hingga Modern Gala.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                    <span>
                      <strong>Manajemen Konsumsi & Tamu:</strong> Pencatatan
                      real-time kuota hidangan buffet, meja VIP, dan alur distribusi
                      souvenir tertib.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Date Availability Checker */}
          <div className="bg-sand/70 border border-taupe/40 rounded-3xl p-8 sm:p-14 mb-24 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-green/10 text-forest-green text-[10px] uppercase font-bold tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-forest-green animate-pulse"></span>
                  Status Reservasi Terkini
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-black font-editorial font-light leading-snug">
                  Kalender Reservasi Musim Pernikahan 2025 / 2026 Dibuka
                </h2>

                <p className="text-sm text-black/75 font-light leading-relaxed max-w-xl">
                  Untuk menjamin standar personalisasi dan perhatian penuh, ByDaisy
                  membatasi jumlah pasangan per pekan. Cek ketersediaan tanggal
                  impian Anda sebelum kuota terisi penuh.
                </p>

                {/* Form */}
                <form
                  onSubmit={handleCheckDate}
                  className="bg-canvas p-5 rounded-2xl border border-taupe/35 shadow-sm space-y-4 pt-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="eventDate"
                        className="block text-[11px] uppercase tracking-wider font-semibold text-black mb-1.5"
                      >
                        Pilih Perkiraan Tanggal *
                      </label>
                      <input
                        id="eventDate"
                        type="date"
                        value={checkDate}
                        onChange={(e) => setCheckDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand/40 border border-taupe/40 text-xs text-black focus:outline-none focus:border-forest-green"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="eventLocation"
                        className="block text-[11px] uppercase tracking-wider font-semibold text-black mb-1.5"
                      >
                        Kota / Venue Rencana
                      </label>
                      <select
                        id="eventLocation"
                        value={checkLocation}
                        onChange={(e) => setCheckLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand/40 border border-taupe/40 text-xs text-black focus:outline-none focus:border-forest-green"
                      >
                        <option value="Banda Aceh & Sekitarnya">Banda Aceh & Sekitarnya</option>
                        <option value="Medan & Sumatera Utara">Medan & Sumatera Utara</option>
                        <option value="Kota Lainnya (Luar Daerah)">Kota Lainnya (Luar Daerah)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 rounded-xl bg-forest-green text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-hover transition-all"
                    >
                      Periksa Ketersediaan Slot
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsConsultationOpen(true)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl border border-taupe/40 text-xs uppercase tracking-widest font-semibold text-black hover:bg-sand transition-all text-center"
                    >
                      Konsultasi Langsung via WA
                    </button>
                  </div>

                  {checkResult && (
                    <div
                      className={`p-4 rounded-xl text-xs leading-relaxed ${
                        checkResult.status === "available"
                          ? "bg-forest-green/10 text-forest-green border border-forest-green/30"
                          : checkResult.status === "limited"
                          ? "bg-brown/10 text-brown border border-brown/30"
                          : "bg-sand text-black/75 border border-taupe/40"
                      }`}
                    >
                      {checkResult.message}
                    </div>
                  )}
                </form>
              </div>

              {/* Slot Summary */}
              <div className="lg:col-span-5 bg-canvas p-6 rounded-2xl border border-taupe/35 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-taupe/20">
                  <span className="font-serif text-xl text-black font-medium">
                    Overview Slot 2025 / 2026
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-forest-green">
                    Live Status
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-sand/50 border border-taupe/25 flex items-center justify-between">
                    <div>
                      <strong className="text-black block font-semibold">
                        Q3 2026 (Juli - September)
                      </strong>
                      <span className="text-warm-taupe text-[11px]">
                        Musim Resepsi Utama
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-brown/15 text-brown font-semibold text-[10px] uppercase tracking-wider">
                      Sisa 3 Slot
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sand/50 border border-taupe/25 flex items-center justify-between">
                    <div>
                      <strong className="text-black block font-semibold">
                        Q4 2026 (Oktober - Desember)
                      </strong>
                      <span className="text-warm-taupe text-[11px]">
                        Musim Liburan & Balai
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-forest-green/15 text-forest-green font-semibold text-[10px] uppercase tracking-wider">
                      Tersedia 5 Slot
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sand/50 border border-taupe/25 flex items-center justify-between">
                    <div>
                      <strong className="text-black block font-semibold">
                        Musim Awal 2027
                      </strong>
                      <span className="text-warm-taupe text-[11px]">
                        Early Bird Consultation
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-canvas text-warm-taupe border border-taupe/35 font-semibold text-[10px] uppercase tracking-wider">
                      Buka Reservasi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-brown block">
                Ulasan Keluarga & Pengantin
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-black font-editorial font-light">
                Ketenangan yang Mereka Rasakan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-sand/60 border border-taupe/35 p-8 rounded-3xl flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="flex text-brown">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif italic text-black/85 leading-relaxed text-sm font-light">
                    “Kak Daisy dan tim membuat saya bisa menikmati hari pernikahan
                    tanpa memikirkan katering atau urutan acara. Mama saya yang tadinya
                    cemas jadi sangat tenang karena semua tertangani rapi.”
                  </p>
                </div>
                <div className="pt-6 border-t border-taupe/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brown/15 text-brown flex items-center justify-center font-serif text-sm font-semibold">
                    NJ
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-black">
                      Nanda & Jihad
                    </h4>
                    <span className="text-[11px] text-warm-taupe">
                      Asrama Haji, Banda Aceh
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-sand/60 border border-taupe/35 p-8 rounded-3xl flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="flex text-brown">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif italic text-black/85 leading-relaxed text-sm font-light">
                    “Susunan acara adat Aceh itu sangat sakral dan detail. ByDaisy
                    paham betul tata krama menyambut keluarga linto baro dan dara
                    baro. Sungguh profesional, cekatan, dan sangat ramah.”
                  </p>
                </div>
                <div className="pt-6 border-t border-taupe/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-green/15 text-forest-green flex items-center justify-center font-serif text-sm font-semibold">
                    NN
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-black">
                      Nazhira & Naufal
                    </h4>
                    <span className="text-[11px] text-warm-taupe">
                      Sribudaya Ballroom 2025
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-sand/60 border border-taupe/35 p-8 rounded-3xl flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="flex text-brown">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif italic text-black/85 leading-relaxed text-sm font-light">
                    “Lighting, kabut panggung first dance, dan tata musik sinkron
                    sempurna. Kami merasa seperti ratu dan raja semalam tanpa ada
                    beban kepanikan sedikit pun.”
                  </p>
                </div>
                <div className="pt-6 border-t border-taupe/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-warm-taupe/20 text-black flex items-center justify-center font-serif text-sm font-semibold">
                    JV
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-black">
                      Jacky & Valerie
                    </h4>
                    <span className="text-[11px] text-warm-taupe">
                      Hermes Grand Ballroom
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Consultation Box */}
          <div className="rounded-3xl bg-forest-green text-canvas p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-xl">
            <span className="font-serif italic text-lg text-light-taupe block mb-2 font-normal">
              Mulai Merancang Hari Bahagia Anda
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light mb-6">
              Ingin Kisah Pernikahan Anda Tereksekusi Sempurna?
            </h3>
            <p className="text-xs sm:text-sm text-canvas/80 max-w-xl mx-auto font-light leading-relaxed mb-8">
              Jadwalkan sesi konsultasi eksklusif bersama tim ByDaisy Planner.
              Kami siap membedah venue impian, timeline protokoler, dan simulasi
              anggaran pernikahan Anda.
            </p>
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="px-8 py-3.5 rounded-full bg-canvas text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-md"
            >
              Jadwalkan Konsultasi Eksklusif
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <ConsultationSheet
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
