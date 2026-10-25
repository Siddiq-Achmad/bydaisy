"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import {
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
  Calendar,
  User,
} from "lucide-react";

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const categories = [
    { id: "all", label: "Semua Artikel" },
    { id: "adat", label: "Panduan Adat" },
    { id: "budget", label: "Budgeting & Finansial" },
    { id: "venue", label: "Vendor & Venue" },
    { id: "rundown", label: "Checklist & Rundown" },
    { id: "decor", label: "Inspirasi Dekorasi" },
  ];

  const articles = [
    {
      id: "art-1",
      title: "Master Checklist Pernikahan H-180: Menghindari Kepanikan di Menit Terakhir",
      category: "rundown",
      categoryLabel: "Checklist & Timeline",
      readTime: "5 menit baca",
      date: "14 Oktober 2026",
      excerpt:
        "Panduan kronologis langkah demi langkah dari penetapan tanggal, booking venue primadona, hingga gladi resik teknis tanpa stres.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZIM3otXSDz8elPripnWpQnq8v5hCU-7xkQAXcMhgNsSf3jadgVXAYO2PvbQ3WzZbmbkfdqBwRsrpOg_dgTfp7KfQ5hlUxEDhGho4ELyRlLMVAlgdTsFWMe3vDuhXRwGFYLkDRW_OlsLDaciZhIcdv1YzMe0NQ9qVQoFI0uNr2n49PnadK6CJiOL-6hOaa-jlyb-jnJX5mTI867jyvRRTYAjo7n0uEj2xFVaoeVDooeP4S6FdyyJBIiw",
    },
    {
      id: "art-2",
      title: "Strategi Alokasi Budget Pernikahan 500 Tamu: Mana yang Wajib, Mana yang Opsional",
      category: "budget",
      categoryLabel: "Budgeting & Finansial",
      readTime: "6 menit baca",
      date: "02 Oktober 2026",
      excerpt:
        "Bedah rasio alokasi biaya: katering, busana & MUA, dekorasi panggung, hingga dana darurat tak terduga agar keuangan pasca-menikah tetap sehat.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ_RLn6qQwrDH3qBrnIsV6ZLuWfKm43bQYZf5asGW0smagZwpR2axr55VPgBky02CYKHpMWNFGJtWrSaZ3UWp_3xDqa-aqYGumlA7mPF9fyh2Cu7c8LU7v9r6a0Caw9pUoIDSzHPPFDv0QCyvUWmOl8CZP_qtys1w41kzQUJzWta0Lic8F9Fdaypb4G9QPESt_mANzmAApkTBF24Dz8TspdCmrI-ET_VOcj-vwTxrsFSQKgkWGGOXXBQ",
    },
    {
      id: "art-3",
      title: "Memahami Sakralnya Upacara Tepung Tawar & Filosofi Daun Dingin",
      category: "adat",
      categoryLabel: "Panduan Adat",
      readTime: "4 menit baca",
      date: "19 September 2026",
      excerpt:
        "Makna mendalam di balik butiran beras kuning, air wangi mawar, dan urutan penghormatan kepada sesepuh istana adat Melayu.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCDHreFUqke_cfkeHmVpPzp4ZDB2KI9pnZPscOjBaL9obZxDm6_PYtWLOIpYS4bxqDvXFf8xGftIZWGS0cg2mEa8qlZtIcGb0unDA7P-uvb01FnCrLot5tSu69ZyOjRwUAu40mQmYXOk2MqCkyAeOjAkSdXhQZE6tcAg7kD1W6CV3VrQjImZQCMoUSUcYGSLmCkvhFxnKH7XD0iNO2CqqUrhVjaNCvtFX0uHUbxIFHkLXE-mzfNb1xrbg",
    },
    {
      id: "art-4",
      title: "Panduan Memilih Ballroom vs Glasshouse: Akustik, Cahaya & Sirkulasi Tamu",
      category: "venue",
      categoryLabel: "Vendor & Venue",
      readTime: "5 menit baca",
      date: "08 September 2026",
      excerpt:
        "Menimbang kelebihan grand ballroom hotel berbintang dengan venue semi-outdoor kaca transparan untuk konsep perayaan yang intim.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBTMpHvVFbmAYj3iCImbvSgCOGbpydMAbl87rIvWmkplWNW0g1-S_0efMJhIXMsQF3fYJ28B0o1-_1v5bpMY3lg4Eje99qP4rN7gAyJ4UreiSYo2T9zSoQH2n4WOrtLn4bpIxNFpavcHsT-5b-1uHLLSBrf1oP1W2_3Za-rqDC-VDyAyalWwXm-K5k8g_6OVGTIZ692xAtvWT8t_uaC9z8tK0-5kM2NygzECvxO1LrI0BZS4UF1cJ5StmF67Bea2DPkMp8",
    },
    {
      id: "art-5",
      title: "Tren Dekorasi 2026: Mengapa Sage Olive, Warm Taupe & Earth Brown Jadi Primadona",
      category: "decor",
      categoryLabel: "Inspirasi Dekorasi",
      readTime: "7 menit baca",
      date: "22 Agustus 2026",
      excerpt:
        "Evolusi estetika dari all-white steril beralih ke tekstur organik bernuansa earth-tone hangat yang abadi saat dilihat 20 tahun mendatang.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBlnGOGodgrVczDXpzM8nYkAzhsldxcRn-FmggBi2HBqKPimzDgUO_z8nuhIho6tjQAQyOJNbqLx-Vd9A8TU7cznk_cAb00LRPLHOyqn6s8Dp-lrMh5kYqnYzZq-FU-EgKceOZAwWfgBNXr9mShC9gG2azbYGnJuJ3Ijn1cJhhX77-vVQvu1h_-m3Fyen21bD-tnwNak-xjY8r4rW7xFojiiDitrE7kt92w9MiZulPcS_blnQXZsYBdKZT03On0LlpnDIo",
    },
    {
      id: "art-6",
      title: "Etiket Menyusun Meja VIP & Penanganan Tamu Pejabat di Hari H",
      category: "rundown",
      categoryLabel: "Checklist & Rundown",
      readTime: "5 menit baca",
      date: "11 Agustus 2026",
      excerpt:
        "SOP protokoler kepengawalan, escorting pejabat negara, hingga tata letak photobooth khusus keluarga inti agar tidak terjadi penumpukan antrean.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBW7Qa7rYhNXqPS-rMSZK4tatUhdYASv0focjP-Uaae3kN4yvJVPFDpqqBnwpvkh4P0PswkaiKAUGyJNLk-sZ_W-RbwvILhqnuihsEFpwD_EnW2HnmDI25Wb_Ad3UjvHzo-52RfUuLvrKpT54fOtx6McsYKcWU26B2CCYjdyagpLMZbHn-jrV7EVDmFxODt3XMt4Gcc1Y400U3OxMCj7w8BtM1c2t5TQHcAzKoG49JCYV8MWbMgHZrilA1S2tLKnyiSHaY",
    },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      activeCategory === "all" || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <span className="text-black font-medium">Jurnal & Inspirasi Pernikahan</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-warm-taupe" />
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                Volume IV • Kurasi Musim 2025/2026
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.08] mb-6 font-editorial">
              Catatan, Panduan & <br />
              <span className="italic font-normal text-forest-green">
                Inspirasi Pernikahan Impian
              </span>
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              Kumpulan artikel terkurasi dari tim lead planner ByDaisy: tips
              budgeting, etiket adat Nusantara, panduan memilih venue, hingga
              inspirasi tren dekorasi terkini.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-sand/70 rounded-3xl p-6 sm:p-8 mb-16 border border-taupe/35 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCategory(c.id)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                      activeCategory === c.id
                        ? "bg-forest-green text-canvas shadow-md"
                        : "bg-canvas text-black/75 hover:bg-taupe/30"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[260px] shrink-0">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-taupe" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari topik panduan..."
                  className="w-full pl-10 pr-4 py-2.5 bg-canvas text-black rounded-full text-xs font-light focus:outline-none focus:ring-1 focus:ring-forest-green border border-taupe/40"
                />
              </div>
            </div>
          </div>

          {/* Featured Editorial Cover Story */}
          <div className="rounded-3xl overflow-hidden bg-sand border border-taupe/40 shadow-xl mb-20 grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[500px]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEX4BM4-I9-qQdRzeU9je6n3zRKJBcmc2W-JY22lTZ7-EOJMqJWYv-dBSDPKOe2QLSHEy4EsfOR4dM-1zZTnSGABDQSZZNOHRVmP9YO3TQsVUJ1xL0eH96AnTk2YD7IzlrjUPsTmieG5587LEmDzwtEciqf2Hd6bNmE9RVhc14_P4XRcBeHM3-NCWvqzfNkahfcMqiE-XTbwVtebfdzhhv6KHZeaFo8utLgG_uTy3sr52b8O-ArCfDVSjOjJZ9W2m0L3I"
                alt="ByDaisy Wedding Planner tim and stage decoration display"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] uppercase tracking-wider text-canvas font-medium">
                  Pilihan Editor • 7 Menit Baca
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-canvas">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-brown block mb-2">
                  Adat & Modern Harmoni
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-black font-light leading-snug mb-4">
                  Menyulam Harmoni Tradisi Adat Aceh & Gaya Modern dalam Satu
                  Panggung Megah
                </h2>
                <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed mb-6">
                  Bagaimana memadukan sakralnya prosesi Peusijeuk dan keagungan
                  pelaminan songket marun dengan flow perjamuan internasional
                  yang dinamis tanpa mengurangi kehormatan adat leluhur.
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-taupe/20">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center font-serif text-sm font-semibold">
                    BD
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-black">
                      Daisy & Tim Kreatif ByDaisy
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-warm-taupe">
                      Executive Matrimonial Directors
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(true)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-forest-green hover:underline"
                >
                  <span>Konsultasikan Konsep Acara Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col rounded-3xl overflow-hidden bg-sand/60 border border-taupe/35 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-canvas/90 backdrop-blur-md text-[10px] uppercase tracking-wider text-forest-green font-semibold">
                      {art.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="p-7 bg-canvas flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-warm-taupe mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                      <span>•</span>
                      <span>{art.date}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-black font-light leading-snug mb-3">
                      {art.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-6">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-taupe/20">
                    <button
                      type="button"
                      onClick={() => setIsConsultationOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-forest-green hover:text-black transition-colors"
                    >
                      <span>Inquire Topic</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter / Consultation Box */}
          <div className="p-8 sm:p-14 rounded-3xl bg-sand/60 border border-taupe/35 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="font-serif text-3xl md:text-4xl text-black mb-3 font-editorial">
              Ingin Berdiskusi Langsung dengan Penulis Jurnal Kami?
            </h3>
            <p className="text-sm text-black/70 font-light max-w-xl mx-auto mb-8 leading-relaxed">
              Tim kami senang berbagi wawasan seputar perancangan anggaran,
              urutan prosesi adat, dan pemilihan konsep terbaik untuk hari
              istimewa Anda.
            </p>
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="px-8 py-3.5 rounded-full bg-forest-green text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-hover transition-all shadow-md"
            >
              Jadwalkan Diskusi Konsep Gratis
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
