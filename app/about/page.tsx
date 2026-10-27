"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import {
  Users,
  Award,
  Sparkles,
  MapPin,
  CheckCircle2,
  Clock,
  Heart,
} from "lucide-react";

export default function AboutPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const values = [
    {
      title: "Quiet Luxury & Emotional Poise",
      desc: "Kami percaya kemewahan sejati lahir dari ketenangan, keanggunan tanpa kebisingan, dan penghormatan pada sakralitas janji suci.",
    },
    {
      title: "Pemberdayaan Adat & Modernitas",
      desc: "Menjaga keagungan pakem adat Nusantara (Batak, Melayu, Jawa, Minang, dll.) dalam bingkai eksekusi tata panggung dan pencahayaan kontemporer.",
    },
    {
      title: "Operational Precision",
      desc: "Manajemen waktu menit per menit yang teruji sejak 2019, memastikan seluruh vendor dan keluarga bergerak dalam satu frekuensi harmonis.",
    },
  ];

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
            <span className="text-black font-medium">Tentang ByDaisy</span>
          </nav>

          {/* Intro Section */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-warm-taupe" />
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                Est. 2019 • Jl. Batee Suasa, Lambhuk, Banda Aceh
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.12] mb-6 font-editorial font-light">
              You Dream It, <br />
              <span className="italic font-light text-forest-green">
                We Create It!
              </span>
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              Didirikan pada tahun 2019 di Aceh, ByDaisy Planner adalah penyedia layanan Wedding Planner dan Organizer yang berfokus menciptakan pengalaman pernikahan yang tak terlupakan. Kami berkomitmen memberikan layanan personal dan profesional, tanggap, dan terpercaya sesuai karakter dari masing-masing calon pengantin.
            </p>
          </div>

          {/* Hero Visual Collage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-2xl bg-sand border border-taupe/40">
                <Image
                  src="/assets/images/service-outdoor-ensemble.jpg"
                  alt="ByDaisy certified wedding crew on stage"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-sand/70 border border-taupe/40 shadow-sm">
                <span className="text-[11px] uppercase tracking-widest font-semibold text-brown block mb-2">
                  Visi & Komitmen Kami
                </span>
                <h3 className="font-serif text-2xl text-black mb-3">
                  Profesional, Tanggap, dan Terpercaya
                </h3>
                <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed mb-4">
                  “Menjadi wedding planner dan organizer terbaik yang memberikan pelayanan Profesional, Tanggap, dan Terpercaya di Aceh dan seluruh Nusantara.”
                </p>
                <div className="pt-3 border-t border-taupe/20 flex items-center justify-between">
                  <span className="text-xs text-warm-taupe">Instagram: @bydaisyplanner</span>
                  <a
                    href="/assets/ByDaisy-Company-Profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-forest-green hover:underline"
                  >
                    Unduh Profil (PDF) →
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-canvas border border-taupe/35 text-center">
                  <div className="font-serif text-3xl font-light text-black">
                    14.000+
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-warm-taupe mt-1">
                    Rekor Tamu Acara Akbar
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-canvas border border-taupe/35 text-center">
                  <div className="font-serif text-3xl font-light text-black">
                    100%
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-warm-taupe mt-1">
                    Jaringan Vendor Aceh & Nasional
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-24">
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest font-semibold text-brown block mb-2">
                Prinsip Utama
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-black font-editorial">
                Standar Kualitas ByDaisy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-sand/50 border border-taupe/35 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center mb-6">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl text-black mb-3">
                      {val.title}
                    </h3>
                    <p className="text-sm text-black/70 font-light leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="rounded-3xl bg-forest-green text-canvas p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-xl">
            <span className="font-serif italic text-lg text-light-taupe block mb-2 font-normal">
              Konsultasikan Konsep Anda
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light mb-6">
              Mulai Langkah Pertama Bersama Kami
            </h3>
            <p className="text-xs sm:text-sm text-canvas/80 max-w-xl mx-auto font-light leading-relaxed mb-8">
              Kami siap mendengarkan cerita cinta Anda, mendiskusikan venue
              pilihan, dan merancang timeline yang sempurna.
            </p>
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="px-8 py-3.5 rounded-full bg-canvas text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-md"
            >
              Book Sesi Konsultasi Eksklusif
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
