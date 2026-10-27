"use client";

import React from "react";
import Link from "next/link";
import ParallaxImage from "@/components/cinematic/parallax-image";
import { ArrowRight, Images } from "lucide-react";

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
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black font-editorial tracking-tight leading-[1.15] font-light">
            Atmosphere & Decor Gallery
          </h2>
          <p className="text-sm md:text-base text-warm-taupe mt-3">
            Dokumentasi panggung pelaminan, pencahayaan ballroom, photobooth, dan
            kekompakan tim on-site ByDaisy di lapangan.
          </p>
        </div>

        {/* Panoramic Parallax Showcase */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-taupe/40 bg-sand relative group">
          <ParallaxImage
            src="/assets/images/img105.jpg"
            alt="Curated moodboard of wedding decorations, aisles, backdrops and team photos by ByDaisy"
            aspectRatio="aspect-[16/9] md:aspect-[21/9]"
          />
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link
              href="/gallery"
              className="px-6 py-3 rounded-full bg-canvas/95 backdrop-blur-md text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-forest-green hover:text-white transition-all shadow-xl flex items-center gap-2"
            >
              <Images className="w-4 h-4" />
              <span>Buka Galeri Foto Lengkap</span>
            </Link>
          </div>
        </div>

        {/* Action Button & Social Proof Calendar Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-canvas border border-taupe/35 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-forest-green animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider text-black font-medium">
              Kalender Reservasi 2025/2026 Sedang Dibuka (Slot Terbatas)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-green transition-all shadow-sm group"
            >
              <span>Jelajahi Semua Foto</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

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
      </div>
    </section>
  );
}

export default GallerySection;

