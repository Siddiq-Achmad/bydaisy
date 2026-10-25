"use client";

import React from "react";
import { MessageCircle, FileText } from "lucide-react";

interface PricelistBannerProps {
  onOpenConsultation?: () => void;
}

export function PricelistBanner({ onOpenConsultation }: PricelistBannerProps) {
  return (
    <section
      id="pricelist"
      className="py-24 md:py-32 bg-forest-green text-canvas relative overflow-hidden"
    >
      {/* Background Subtle Luxury Rings Ornament */}
      <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <span className="font-serif italic text-lg md:text-xl text-light-taupe block mb-3 font-normal">
          Transparan & Fleksibel
        </span>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight tracking-tight">
          Pricelist & Customized Investment Package
        </h2>

        <p className="text-canvas/80 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed mb-10">
          Setiap konsep pernikahan memiliki keunikan tersendiri. Dapatkan
          katalog pricelist lengkap untuk paket Wedding Planner, Wedding
          Organizer, maupun All-In Decor yang disesuaikan secara proporsional
          dengan venue dan jumlah tamu Anda.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <button
            type="button"
            onClick={onOpenConsultation}
            data-cursor="Pricelist"
            className="px-8 py-3.5 rounded-full bg-canvas text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-md flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Minta Katalog Pricelist PDF</span>
          </button>

          <a
            href="https://wa.me/6282277094277?text=Halo%20ByDaisy%20Planner,%20saya%20ingin%20berkonsultasi%20mengenai%20paket%20wedding."
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="WhatsApp"
            className="px-8 py-3.5 rounded-full border border-white/40 text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hubungi via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default PricelistBanner;
