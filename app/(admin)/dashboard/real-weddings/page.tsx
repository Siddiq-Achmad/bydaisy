"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  ExternalLink,
  MapPin,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminRealWeddingsPage() {
  const stories = [
    {
      title: "Pernikahan Akbar Meulaboh: 14.000 Tamu",
      couple: "T. Teuku & Cut Nyak",
      scale: "14.000 Tamu",
      location: "Meulaboh, Aceh Barat",
      year: "2024",
      highlight: "Rekor Skala Terbesar ByDaisy",
      description: "Manajemen panggung dan logistik katering massal terbesar dengan pengawalan 25+ kru, tenda rouder raksasa, dan protokol keamanan daerah.",
      vendors: "Dekorasi ByDaisy, Catering Tradisi Aceh, Dokumentasi Cinematic.",
    },
    {
      title: "The Royal Acehnese Dream",
      couple: "Jihad & Nanda",
      scale: "3.000 Tamu",
      location: "Auditorium UIN Ar-Raniry Banda Aceh",
      year: "2025",
      highlight: "Adat Aceh Modern",
      description: "Perpaduan ornamen adat Pinto Aceh dengan bunga segar impor, lighting panggung megah, dan jamuan 17 menu adat hidang besan.",
      vendors: "Pelaminan ByDaisy, MUA Aceh Royal, BP Projectbooth.",
    },
    {
      title: "Botanical Riverside Serenity",
      couple: "Jacky & Valerie",
      scale: "1.500 Tamu",
      location: "Lhoknga Riverside, Aceh Besar",
      year: "2025",
      highlight: "Outdoor Botanical",
      description: "Pernikahan tepi sungai dengan kanopi transparan, lampu fairy lights menjuntai, dan alunan live acoustic jazz.",
      vendors: "ByDaisy Event Planner, Acoustic Band, Catering Sribudaya.",
    },
    {
      title: "Intimate Heritage Ballroom",
      couple: "Naufal & Nazhira",
      scale: "500 Tamu",
      location: "Kyriad Muraya Hotel Ballroom",
      year: "2026",
      highlight: "Luxury Intimate",
      description: "Atmosfer syahdu dan hangat dengan sentuhan warm taupe, meja bundar VIP bertabur mawar putih, dan interaksi privat keluarga.",
      vendors: "ByDaisy Wedding Organizer, MUA Flawless, Hand Bouquet HS Floral.",
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
              Kisah Nyata & Portofolio Kurasi
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Real Weddings & Dokumentasi Panggung
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Kisah pernikahan pengantin ByDaisy, dari skala intimate 500 tamu hingga mega wedding 14.000 tamu.
          </p>
        </div>

        <Link
          href="/#portfolio"
          target="_blank"
          className="px-4 py-2 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <span>Lihat Showcase Homepage</span>
          <ExternalLink className="w-3.5 h-3.5 text-forest-green" />
        </Link>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((s, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/50 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-forest-green bg-forest-green/10 px-2 py-0.5 rounded">
                  {s.highlight}
                </span>
                <span className="text-xs text-warm-taupe">{s.year}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-black mb-1">
                {s.title}
              </h3>
              <p className="text-xs font-medium text-brown mb-3">{s.couple}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/75 font-light mb-3">
                <span className="flex items-center gap-1 font-semibold text-black">
                  <Users className="w-3.5 h-3.5 text-forest-green" />
                  {s.scale}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-warm-taupe" />
                  {s.location}
                </span>
              </div>

              <p className="text-xs text-black/75 font-light leading-relaxed mb-4">
                {s.description}
              </p>

              <div className="p-3 rounded-xl bg-[#F8F6F1] text-[11px] text-warm-taupe">
                <strong className="text-black font-medium block mb-0.5">
                  Vendor Terlibat:
                </strong>
                {s.vendors}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-taupe/20 flex items-center justify-between text-xs">
              <span className="text-warm-taupe text-[11px]">Terbit di /gallery & homepage</span>
              <Link
                href="/gallery"
                target="_blank"
                className="text-forest-green font-semibold hover:underline flex items-center gap-1"
              >
                <span>Buka Galeri</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
