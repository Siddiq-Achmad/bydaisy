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
  X,
  CheckCircle2,
  ChevronRight,
  Share2,
} from "lucide-react";

interface JournalArticle {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
  sections: {
    heading: string;
    body: string[];
  }[];
  keyTakeaways: string[];
}

import journalData from "@/data/journal.json";

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState("Wedding Planner");
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  const categories = journalData.categories;
  const articles: JournalArticle[] = journalData.articles as JournalArticle[];
  const editorPick: JournalArticle = articles[0];

  const filteredArticles = articles.slice(1).filter((art) => {
    const matchesCategory =
      activeCategory === "all" || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenConsultationForTopic = (topicTitle: string) => {
    setConsultationService(`Diskusi Topik: ${topicTitle}`);
    setIsConsultationOpen(true);
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
            <span className="text-black font-medium">Jurnal & Inspirasi Pernikahan</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-warm-taupe" />
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                Matrimonial Knowledge & Cultural Guide
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.12] mb-6 font-editorial font-light">
              Jurnal, Tradisi & <br />
              <span className="italic font-light text-forest-green">
                Wawasan Pernikahan
              </span>
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              Kumpulan artikel editorial resmi ByDaisy seputar perancangan anggaran,
              bedah prosesi adat Nusantara, panduan teknis hari H, dan inspirasi
              estetika terkini untuk pernikahan impian Anda.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-taupe/20">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeCategory === cat.id
                      ? "bg-forest-green text-canvas shadow-sm"
                      : "bg-sand text-black/75 hover:bg-taupe/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari topik atau kata kunci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-sand/60 border border-taupe/40 text-xs text-black focus:outline-none focus:border-forest-green"
              />
            </div>
          </div>

          {/* Editor's Featured Article */}
          <div className="mb-16 rounded-3xl overflow-hidden bg-sand border border-taupe/40 shadow-sm grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[420px] bg-sand">
              <Image
                src={editorPick.image}
                alt={editorPick.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] uppercase tracking-wider text-canvas font-medium">
                  {editorPick.categoryLabel}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-canvas">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-brown block mb-2">
                  Adat & Modern Harmoni
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-black font-light leading-snug mb-4 font-editorial">
                  {editorPick.title}
                </h2>
                <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed mb-6">
                  {editorPick.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-taupe/20">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center font-serif text-sm font-semibold">
                    BD
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-black">
                      {editorPick.author}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-warm-taupe">
                      {editorPick.authorRole}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(editorPick)}
                  className="px-6 py-2.5 rounded-full bg-forest-green text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-hover transition-all flex items-center gap-2"
                >
                  <span>Baca Artikel Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-sand cursor-pointer"
                  onClick={() => setSelectedArticle(art)}
                >
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

                    <h3
                      onClick={() => setSelectedArticle(art)}
                      className="font-serif text-xl sm:text-2xl text-black font-light leading-snug mb-3 cursor-pointer group-hover:text-forest-green transition-colors font-editorial"
                    >
                      {art.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-6">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-taupe/20 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(art)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-forest-green hover:underline"
                    >
                      <span>Baca Ulasan</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenConsultationForTopic(art.title)}
                      className="text-[11px] text-warm-taupe hover:text-black uppercase tracking-wider"
                    >
                      Inquire Topik
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Consultation Box */}
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

      {/* Interactive Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 md:p-10 animate-fade-in">
          <div className="relative w-full max-w-3xl bg-canvas rounded-3xl overflow-hidden shadow-2xl border border-taupe/40 my-8">
            {/* Header Image */}
            <div className="relative aspect-[16/9] w-full bg-sand">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-black flex items-center justify-center transition-colors"
                aria-label="Tutup Artikel"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-canvas">
                <span className="px-3 py-1 rounded-full bg-forest-green text-[10px] uppercase tracking-wider font-semibold inline-block mb-3">
                  {selectedArticle.categoryLabel}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-light leading-snug font-editorial">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-light-taupe mt-3 font-light">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                  <span>•</span>
                  <span>Oleh {selectedArticle.author}</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8 sm:p-12 space-y-8 bg-canvas">
              {/* Excerpt Lead */}
              <p className="text-base sm:text-lg text-black/80 font-light italic leading-relaxed border-l-2 border-forest-green pl-4">
                {selectedArticle.excerpt}
              </p>

              {/* Body Sections */}
              <div className="space-y-8 text-sm sm:text-base text-black/80 font-light leading-relaxed">
                {selectedArticle.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-black font-medium">
                      {sec.heading}
                    </h3>
                    {sec.body.map((p, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Key Takeaways Box */}
              {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
                <div className="p-6 sm:p-8 rounded-2xl bg-sand/70 border border-taupe/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-forest-green" />
                    <span className="text-xs uppercase font-bold tracking-widest text-brown">
                      Poin Penting & Kunci Sukses
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-black/80 font-light">
                    {selectedArticle.keyTakeaways.map((point, kIdx) => (
                      <li key={kIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="p-6 rounded-2xl bg-canvas border border-taupe/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center font-serif text-base font-semibold">
                    BD
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-black">
                      {selectedArticle.author}
                    </h4>
                    <p className="text-xs text-warm-taupe">
                      {selectedArticle.authorRole} • ByDaisy Planner
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const title = selectedArticle.title;
                    setSelectedArticle(null);
                    handleOpenConsultationForTopic(title);
                  }}
                  className="px-5 py-2.5 rounded-full bg-forest-green text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-hover transition-all"
                >
                  Konsultasikan
                </button>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-6 border-t border-taupe/20 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs uppercase tracking-wider font-semibold text-warm-taupe hover:text-black"
                >
                  ← Kembali ke Indeks Jurnal
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const title = selectedArticle.title;
                    setSelectedArticle(null);
                    handleOpenConsultationForTopic(title);
                  }}
                  className="px-6 py-3 rounded-full bg-black text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-green transition-colors"
                >
                  Jadwalkan Diskusi Topik Ini
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <ConsultationSheet
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultService={consultationService}
      />
    </div>
  );
}
