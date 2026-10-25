"use client";

import React from "react";
import Link from "next/link";
import {
  Star,
  ExternalLink,
  Heart,
  CheckCircle2,
  Calendar,
  MessageSquare,
} from "lucide-react";

export default function AdminReviewsPage() {
  const reviews = [
    {
      id: "REV-01",
      couple: "Jihad & Nanda",
      weddingDate: "Agustus 2025",
      venue: "UIN Ar-Raniry Banda Aceh",
      rating: 5,
      source: "Bridestory Verified",
      comment:
        "Tim ByDaisy luar biasa tenang dan taktis. Mengatur 3.000 tamu tanpa ada kendala di antrean catering sama sekali. Keluarga besar sangat terkesan dengan perhatian khusus ke sesepuh adat saat Peusijuek.",
      featured: true,
    },
    {
      id: "REV-02",
      couple: "Jacky & Valerie",
      weddingDate: "September 2025",
      venue: "Lhoknga Riverside",
      rating: 5,
      source: "Google Reviews",
      comment:
        "Dekorasi outdoor riverside kami melebihi ekspektasi 3D visual awal. Tata letak pencahayaan warm ambient saat senja sangat magis. Kak Daisy dan 12 kru sangat sigap!",
      featured: true,
    },
    {
      id: "REV-03",
      couple: "Naufal & Nazhira",
      weddingDate: "Januari 2026",
      venue: "Kyriad Muraya Hotel",
      rating: 5,
      source: "WhatsApp Direct",
      comment:
        "Terima kasih ByDaisy, proses perencanaan 6 bulan sangat terstruktur tanpa bikin kami stres. Anggaran pernikahan tidak meleset dari RAB yang disusun.",
      featured: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Reputasi & Surat Apresiasi Pasangan
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Love Letters & Ulasan Pengantin
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Skor rata-rata 4.98 / 5.0 dari 140+ pasangan bahagia yang menggunakan jasa ByDaisy.
          </p>
        </div>

        <Link
          href="/reviews"
          target="_blank"
          className="px-4 py-2 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <span>Lihat Halaman Ulasan</span>
          <ExternalLink className="w-3.5 h-3.5 text-forest-green" />
        </Link>
      </div>

      {/* Metric Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-taupe/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-serif text-2xl font-bold">
            4.98
          </div>
          <div>
            <div className="flex gap-1 text-amber-500 text-sm">
              {"★".repeat(5)}
            </div>
            <span className="text-xs text-warm-taupe mt-0.5 block">
              140+ Ulasan Terverifikasi
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-taupe/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-forest-green/10 text-forest-green flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-black block">100%</span>
            <span className="text-xs text-warm-taupe">
              Rekomendasi Keluarga & Pasangan
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-taupe/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sand text-brown flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-black block">Zero Overbudget</span>
            <span className="text-xs text-warm-taupe">
              Sesuai RAB yang Disepakati
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Cards */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-semibold text-black">
                    {rev.couple}
                  </h3>
                  <span className="text-xs text-warm-taupe">•</span>
                  <span className="text-xs text-warm-taupe">{rev.weddingDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500 text-xs">
                    {"★".repeat(rev.rating)}
                  </div>
                  <span className="text-[10px] font-semibold text-brown bg-sand px-2 py-0.5 rounded">
                    {rev.source}
                  </span>
                </div>
              </div>

              <span className="text-xs text-forest-green font-medium block mb-2">
                Venue: {rev.venue}
              </span>

              <p className="text-xs sm:text-sm text-black/80 font-light leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-taupe/20 flex items-center justify-between text-xs">
              <span className="text-[11px] text-forest-green font-medium">
                ✓ Ditampilkan di Halaman Utama (Featured)
              </span>
              <span className="text-warm-taupe text-[10px]">ID: {rev.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
