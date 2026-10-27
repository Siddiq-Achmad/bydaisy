"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import { Sparkles, ArrowRight, BookOpen, ShieldCheck, Heart } from "lucide-react";

import traditionsData from "@/data/tradisi.json";

export default function TradisiPage() {
  const [activeTab, setActiveTab] = useState("aceh");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const traditions = traditionsData;

  const current = traditions[activeTab as keyof typeof traditions];

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
            <span className="text-black font-medium">Panduan Tradisi & Budaya Adat</span>
          </nav>

          {/* Intro */}
          <div className="max-w-4xl mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-warm-taupe" />
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                Heritage, Sacred Rituals & Matrimonial Protocol
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.08] mb-6 font-editorial">
              Menjaga Kemuliaan Adat Leluhur <br />
              <span className="italic font-normal text-forest-green">
                dalam Balutan Keanggunan Masa Kini
              </span>
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              ByDaisy memahami bahwa pernikahan adat bukan sekadar seremonial
              visual, melainkan doa, restu orang tua, dan filosofi sakral yang
              diwariskan turun-temurun. Kami mengawal setiap detail tata krama
              prosesi tanpa mengurangi esensi luhur dan kenyamanan modern.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            {[
              { id: "aceh", label: "Adat Aceh Darussalam" },
              { id: "melayu", label: "Adat Melayu Deli & Riau" },
              { id: "minang", label: "Adat Minangkabau" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow-sm ${activeTab === tab.id
                    ? "bg-forest-green text-canvas"
                    : "bg-sand text-black/80 hover:bg-taupe/40"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tradition Detail Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
            {/* Visual Frame */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[440px] shadow-2xl bg-sand border border-taupe/40">
              <Image
                src={current.image}
                alt={current.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-canvas">
                <span className="text-[10px] uppercase tracking-widest text-light-taupe">
                  {current.subtitle}
                </span>
                <h3 className="font-serif text-3xl text-canvas mt-1">
                  {current.name}
                </h3>
              </div>
            </div>

            {/* Content & Rituals Grid */}
            <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-sand/60 border border-taupe/35 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-forest-green" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-brown">
                    Filosofi & Nilai Luhur
                  </span>
                </div>

                <p className="text-sm md:text-base text-black/80 font-light leading-relaxed mb-8">
                  {current.philosophy}
                </p>

                <h4 className="text-xs uppercase tracking-wider font-semibold text-black mb-4">
                  Tahapan Prosesi Sakral yang Dampingi ByDaisy:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {current.rituals.map((r, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-5 rounded-2xl bg-canvas border border-taupe/30 shadow-sm"
                    >
                      <h5 className="font-serif text-lg font-medium text-black mb-1.5">
                        {r.name}
                      </h5>
                      <p className="text-xs text-black/70 font-light leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-taupe/30 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-warm-taupe">
                  Didampingi Master Adat Bersertifikasi ByDaisy
                </span>

                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-black text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-green transition-colors flex items-center gap-2"
                >
                  <span>Konsultasi Adat Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Protocol Box */}
          <div className="p-8 sm:p-14 rounded-3xl bg-forest-green text-canvas text-center max-w-4xl mx-auto shadow-xl">
            <h3 className="font-serif text-3xl md:text-4xl font-light mb-3">
              Perpaduan Tradisi & Modernitas yang Sempurna
            </h3>
            <p className="text-xs sm:text-sm text-canvas/80 max-w-xl mx-auto font-light leading-relaxed mb-8">
              Punya konsep adat campuran (misal: Akad Adat Aceh & Resepsi
              International Ballroom)? Tim show director ByDaisy ahli dalam
              merajut alur acara tanpa tumpang tindih.
            </p>
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="px-8 py-3.5 rounded-full bg-canvas text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-md"
            >
              Diskusikan Konsep Perkawinan Campuran
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <ConsultationSheet
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultService="Koordinator Adat Khusus"
      />
    </div>
  );
}
