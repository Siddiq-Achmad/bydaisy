"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  Plus,
  Clock,
  Eye,
  CheckCircle2,
  Edit3,
} from "lucide-react";

export default function AdminJournalPage() {
  const articles = [
    {
      title: "Riset & Proporsi Anggaran Pernikahan: Rasio Ideal Menghindari Overbudget",
      category: "Perencanaan Keuangan",
      readTime: "6 menit",
      views: "1.240 pembaca",
      status: "Published",
      date: "25 Oktober 2026",
      route: "/journal",
      summary: "Mengupas rasio 29.4% catering, 17.6% adat, 11.8% dekorasi, dan 11.8% attire dari dokumen Company Profile ByDaisy.",
    },
    {
      title: "Filosofi Sakral Adat Peusijuek: Makna Bu Lapeh, Breueh Pade, dan Ranup",
      category: "Tradisi & Adat Aceh",
      readTime: "8 menit",
      views: "2.890 pembaca",
      status: "Published",
      date: "20 Oktober 2026",
      route: "/tradisi",
      summary: "Pedoman mendalam tata urutan prosesi adat Peusijuek, fungsi batee ranup, serta sirih hias penghormatan besan.",
    },
    {
      title: "Panduan Memilih Venue di Banda Aceh & Aceh Besar: Resort vs Ballroom Gedung",
      category: "Panduan Venue",
      readTime: "5 menit",
      views: "980 pembaca",
      status: "Published",
      date: "15 Oktober 2026",
      route: "/journal",
      summary: "Perbandingan fasilitas Sribudaya Resort, Vandys Garden, dan Hermes Palace untuk kapasitas 300 hingga 2.000 tamu.",
    },
    {
      title: "12 Formasi Kru Lapangan: Peran Vital Tim Wedding Planner di Hari-H",
      category: "Behind The Scenes",
      readTime: "7 menit",
      views: "1.520 pembaca",
      status: "Published",
      date: "10 Oktober 2026",
      route: "/services/wedding-planner",
      summary: "Membedah tugas Stage Manager, Stopper, Usher VIP, hingga Bride Assistant dengan radio HT tertutup.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Editorial & Pusat Edukasi Adat
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Jurnal & Wawasan Tradisi
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Manajemen artikel editorial, panduan ritus adat, dan tips pernikahan 2026.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/journal"
            target="_blank"
            className="px-4 py-2 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2"
          >
            <span>Lihat Halaman Jurnal</span>
            <ExternalLink className="w-3.5 h-3.5 text-forest-green" />
          </Link>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-brown bg-sand px-2.5 py-0.5 rounded">
                  {art.category}
                </span>
                <span className="text-[10px] font-bold text-forest-green bg-forest-green/10 px-2 py-0.5 rounded">
                  {art.status}
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-black mb-2 leading-snug">
                {art.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-warm-taupe mb-3">
                <span>{art.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {art.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {art.views}
                </span>
              </div>

              <p className="text-xs text-black/75 font-light leading-relaxed mb-4">
                {art.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-taupe/20 flex items-center justify-between text-xs">
              <span className="text-[11px] text-warm-taupe font-mono">
                Rute: {art.route}
              </span>
              <Link
                href={art.route}
                target="_blank"
                className="text-forest-green font-semibold hover:underline flex items-center gap-1"
              >
                <span>Lihat Live</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
