"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import { Star, Heart, ArrowRight, Quote, CheckCircle2 } from "lucide-react";

import reviewsData from "@/data/reviews.json";

export default function ReviewsPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const reviews = reviewsData;

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
            <span className="text-black font-medium">Love Letters & Reviews</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-warm-taupe" />
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                Unfiltered Stories & Matrimonial Gratitude
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.12] mb-6 font-editorial font-light">
              Kisah Cinta, Ketenangan Hati <br />
              <span className="italic font-light text-forest-green">
                & Pengalaman Nyata Mereka
              </span>
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              Bagi kami, kesuksesan sebuah pernikahan bukan hanya tentang panggung
              yang megah, melainkan senyum tanpa cemas dari kedua mempelai serta
              rasa khidmat yang mendalam bagi seluruh keluarga besar.
            </p>
          </div>

          {/* Metrics Counter Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-sand/70 border border-taupe/35 mb-20 shadow-sm text-center">
            <div className="p-3 border-r-0 sm:border-r border-taupe/30">
              <div className="font-serif text-3xl sm:text-4xl text-black font-normal">
                500+
              </div>
              <div className="text-[11px] uppercase tracking-wider text-warm-taupe mt-1 font-medium">
                Pernikahan Sukses
              </div>
            </div>

            <div className="p-3 border-r-0 md:border-r border-taupe/30">
              <div className="font-serif text-3xl sm:text-4xl text-black font-normal flex items-center justify-center gap-1">
                <span>4.98</span>
                <span className="text-xs text-warm-taupe">/ 5.0</span>
              </div>
              <div className="text-[11px] uppercase tracking-wider text-warm-taupe mt-1 font-medium">
                Rating Kepuasan Pengantin
              </div>
            </div>

            <div className="p-3 border-r-0 sm:border-r border-taupe/30">
              <div className="font-serif text-3xl sm:text-4xl text-black font-normal">
                100%
              </div>
              <div className="text-[11px] uppercase tracking-wider text-warm-taupe mt-1 font-medium">
                On-Time Rundown SLA
              </div>
            </div>

            <div className="p-3">
              <div className="font-serif text-3xl sm:text-4xl text-black font-normal">
                0%
              </div>
              <div className="text-[11px] uppercase tracking-wider text-warm-taupe mt-1 font-medium">
                Krisis Tak Teratasi
              </div>
            </div>
          </div>

          {/* Featured Spotlight: Jihad & Nanda */}
          <div className="rounded-3xl overflow-hidden bg-sand border border-taupe/40 shadow-xl mb-20 grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-[500px]">
              <Image
                src="/assets/images/tradisi-aceh.jpg"
                alt="Pernikahan adat Aceh Jihad & Nanda by ByDaisy Planner"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-canvas">
                <span className="text-[10px] uppercase tracking-widest text-light-taupe">
                  Featured Cover Story
                </span>
                <h3 className="font-serif text-3xl text-canvas mt-1">
                  Jihad & Nanda
                </h3>
                <p className="text-xs text-canvas/80">
                  04 Oktober 2026 • Asrama Haji Ballroom, Banda Aceh
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-canvas">
              <div>
                <div className="w-10 h-10 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center mb-6">
                  <Quote className="w-5 h-5" />
                </div>

                <div className="flex gap-1 text-amber-600 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <p className="font-serif text-xl sm:text-2xl text-black leading-relaxed italic mb-8 font-light">
                  &ldquo;Dari awal konsultasi sampai hari H selesai, ByDaisy
                  bener-bener jadi penenang kami. Acara adat Aceh yang biasanya
                  ribet dan penuh prosesi sakral bisa berjalan begitu tertib,
                  megah, dan tepat waktu. Seluruh keluarga besar sangat terharu
                  dan bangga.&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-taupe/20 flex flex-wrap items-center justify-between gap-4 text-xs text-warm-taupe">
                <span>Layanan: The Royal All-In Package</span>
                <span className="text-black font-semibold">
                  Verified Matrimonial Review
                </span>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {reviews.slice(1).map((rev, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-3xl bg-sand/50 border border-taupe/35 shadow-sm flex flex-col justify-between hover:border-forest-green hover:shadow-md transition-all group"
              >
                {rev.image && (
                  <div className="relative h-48 w-full overflow-hidden bg-sand">
                    <Image
                      src={rev.image}
                      alt={`Dokumentasi pernikahan ${rev.couple}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-wider text-canvas font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {rev.theme}
                    </span>
                  </div>
                )}

                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex gap-1 text-amber-600 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>

                    <p className="font-serif text-base text-black/85 font-light leading-relaxed mb-6 italic">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-taupe/25">
                    <h4 className="font-serif text-lg font-medium text-black">
                      {rev.couple}
                    </h4>
                    <p className="text-[11px] text-warm-taupe mt-0.5">
                      {rev.date} • {rev.venue}
                    </p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-canvas text-[10px] text-forest-green border border-taupe/30">
                      {rev.service}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Booking Box */}
          <div className="p-8 sm:p-14 rounded-3xl bg-forest-green text-canvas text-center max-w-4xl mx-auto shadow-xl">
            <h3 className="font-serif text-3xl md:text-4xl font-light mb-3">
              Jadikan Hari Istimewa Anda Kisah Indah Selanjutnya
            </h3>
            <p className="text-xs sm:text-sm text-canvas/80 max-w-xl mx-auto font-light leading-relaxed mb-8">
              Konsultasikan jadwal tanggal acara Anda bersama ByDaisy Planner.
              Kami siap mewujudkan perayaan yang damai, megah, dan berkesan.
            </p>
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="px-8 py-3.5 rounded-full bg-canvas text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-md"
            >
              Jadwalkan Konsultasi Gratis
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
