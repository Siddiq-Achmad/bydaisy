"use client";

import React from "react";
import ParallaxImage from "@/components/cinematic/parallax-image";
import { ArrowRight } from "lucide-react";

interface GallerySectionProps {
  onOpenConsultation?: () => void;
}

export function GallerySection({ onOpenConsultation }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-24 md:py-36 bg-sand/40 border-t border-taupe/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brown"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-warm-taupe"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-taupe"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-forest-green"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-black font-editorial tracking-tight">
            Atmosphere & Decor Gallery
          </h2>
          <p className="text-sm md:text-base text-warm-taupe mt-3">
            Dokumentasi panggung pelaminan, pencahayaan ballroom, photobooth, dan
            kekompakan tim on-site ByDaisy di lapangan.
          </p>
        </div>

        {/* Panoramic Parallax Showcase */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-taupe/40 bg-sand">
          <ParallaxImage
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlnGOGodgrVczDXpzM8nYkAzhsldxcRn-FmggBi2HBqKPimzDgUO_z8nuhIho6tjQAQyOJNbqLx-Vd9A8TU7cznk_cAb00LRPLHOyqn6s8Dp-lrMh5kYqnYzZq-FU-EgKceOZAwWfgBNXr9mShC9gG2azbYGnJuJ3Ijn1cJhhX77-vVQvu1h_-m3Fyen21bD-tnwNak-xjY8r4rW7xFojiiDitrE7kt92w9MiZulPcS_blnQXZsYBdKZT03On0LlpnDIo"
            alt="Curated moodboard of wedding decorations, aisles, backdrops and team photos by ByDaisy"
            aspectRatio="aspect-[16/9] md:aspect-[21/9]"
          />
        </div>

        {/* Social Proof Calendar Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-canvas border border-taupe/35 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-forest-green animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider text-black font-medium">
              Kalender Reservasi 2025/2026 Sedang Dibuka (Slot Terbatas)
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="text-xs font-semibold tracking-widest uppercase text-forest-green hover:text-brown transition-colors inline-flex items-center gap-2 underline underline-offset-4"
          >
            <span>Konsultasikan Tanggal Acara Anda</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
