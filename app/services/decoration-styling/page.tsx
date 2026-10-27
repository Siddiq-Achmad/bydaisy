"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import {
  Palette,
  Sparkles,
  Check,
  ArrowRight,
  Maximize2,
  Layers,
  Lightbulb,
  Flower2,
  Compass,
  MessageCircle,
} from "lucide-react";

export default function DecorationStylingDetailPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("Pelaminan 15-18m");

  const decorTiers = [
    {
      name: "Pelaminan 10 Meter",
      price: "Rp 40.000.000",
      target: "Ballroom Menengah & Gedung Pertemuan",
      highlight: "Compact & Elegant",
      features: [
        "Lebar panggung pelaminan 10 meter",
        "Struktur ornamen kayu & backdrop kain drape premium",
        "Set kursi pengantin & kursi orang tua berukir",
        "Rangkaian bunga artifisial premium dengan aksen mawar segar",
        "Tata cahaya panggung dasar: Par-LED & Warm White Spotlight",
        "Karpet panggung pelaminan bersih & rapi",
      ],
    },
    {
      name: "Pelaminan 15m (Custom 4m)",
      price: "Rp 60.000.000",
      target: "Grand Ballroom & Convention Hall",
      highlight: "Popular Choice",
      features: [
        "Lebar panggung pelaminan 15 meter dengan custom structure 4 meter",
        "Gate masuk lorong pengantin (Entrance Floral Arch)",
        "Mini garden di sepanjang kaki pelaminan",
        "Aksen bunga segar melimpah pada titik vokal utama",
        "Moving beam lighting & ambience warm studio lighting",
        "Photobooth foto 2D elegan untuk sesi foto tamu",
      ],
    },
    {
      name: "Pelaminan 15-18m (Custom 6m + Fresh Flowers)",
      price: "Rp 70.000.000",
      target: "Luxury Ballroom & Gedung Bersejarah",
      highlight: "Signature Best Deal",
      features: [
        "Lebar panggung pelaminan 15-18 meter dengan custom structure 6 meter",
        "Full fresh flowers premium: mawar impor, sedap malam, anggrek, ruscus",
        "Lorong karpet jalan pengantin berhias standing flower & fairy lights",
        "Pencahayaan panggung dramatis terprogram dengan moving heads",
        "Photobooth 3D spatial interaktif berlatar ukiran monogram",
        "Foyer resepsi & meja penerima tamu berkonsep selaras",
      ],
    },
    {
      name: "Pelaminan Royal 16-19m (Full Custom + Tiffani Table)",
      price: "Rp 100.000.000",
      target: "State Banquet, Gedung Megah & Istana",
      highlight: "The Ultimate Royal Luxury",
      features: [
        "Lebar panggung 16-19 meter rancangan full custom arsitektur 3D",
        "Desain schematic & 3D Spatial Rendering sebelum produksi",
        "Instalasi ceiling hanging floristry & chandelier gantung raksasa",
        "Set meja bundar VIP lengkap dengan kursi Tiffani eksklusif",
        "Grand entrance tunnel dengan ribuan tangkai bunga segar",
        "Tata cahaya panggung kelas konser dengan operator pencahayaan khusus",
      ],
    },
  ];

  const designPillars = [
    {
      title: "3D Spatial Visualization",
      desc: "Sebelum paku pertama dipasang, Anda dapat melihat visualisasi 3D tata letak panggung dan pencahayaan secara presisi.",
      icon: Compass,
    },
    {
      title: "Curated Floristry",
      desc: "Kombinasi bunga potong segar lokal dan impor yang dirangkai segar di pagi hari H untuk aroma harum alami.",
      icon: Flower2,
    },
    {
      title: "Atmospheric Lighting",
      desc: "Tata cahaya lembut yang dirancang khusus agar foto dan video pernikahan tampak bercahaya tanpa silau di kamera.",
      icon: Lightbulb,
    },
    {
      title: "Heritage & Modern Fusion",
      desc: "Kemampuan memadukan tenunan songket Aceh atau ukiran adat dengan garis estetika kontemporer yang abadi.",
      icon: Layers,
    },
  ];

  return (
    <div className="relative min-h-screen bg-canvas text-black">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="pt-8 pb-24 md:pt-14 md:pb-32">
        {/* Breadcrumb & Hero */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-taupe mb-4">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-black transition-colors">
              Layanan
            </Link>
            <span>/</span>
            <span className="text-black font-medium">Decoration & Styling</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-warm-taupe" />
                <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                  Tata Ruang & Seni Bunga Pelaminan
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.12] mb-6 font-editorial font-light">
                Dekorasi Pelaminan & <br />
                <span className="italic font-light text-forest-green">
                  Karya Ruang yang Bernyawa
                </span>
              </h1>

              <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-2xl mb-8">
                Kami mengubah gedung kosong dan area terbuka menjadi mahligai
                pernikahan yang memukau. Setiap lekuk ukiran panggung, kesegaran
                kelopak bunga, dan sorot lampu panggung dirancang selaras dengan
                karakter cinta Anda.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-forest-green text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-hover transition-all shadow-md flex items-center gap-2"
                >
                  <span>Konsultasi Sketsa Dekorasi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/gallery"
                  className="px-6 py-3.5 rounded-full border border-taupe/60 text-black text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-colors"
                >
                  Buka Galeri Foto Pelaminan
                </Link>
              </div>
            </div>

            {/* Visual Frame */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl bg-sand border border-taupe/40 group">
                <Image
                  src="/assets/images/gallery-white-pavillion.jpg"
                  alt="Instalasi pelaminan megah The Royal White Pavillion by ByDaisy"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-2xl text-canvas">
                  <span className="text-[10px] uppercase tracking-wider text-light-taupe block">
                    Karya Panggung Pelaminan
                  </span>
                  <strong className="font-serif text-lg font-light block">
                    The Royal White Pavillion
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-sm border border-taupe/30 bg-sand">
                  <Image
                    src="/assets/images/gallery-gold-pelaminan.jpg"
                    alt="Pelaminan tradisi mahligai emas ByDaisy"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-sm border border-taupe/30 bg-sand">
                  <Image
                    src="/assets/images/journal-backdrop.jpg"
                    alt="Backdrop floral organik earth-tone"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars of Styling */}
        <section className="bg-sand/40 border-y border-taupe/30 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest font-semibold text-brown block mb-2">
                Filosofi Perancangan Ruang
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-black font-editorial font-light mb-4">
                Empat Pilar Estetika ByDaisy
              </h2>
              <p className="text-sm md:text-base text-black/70 font-light leading-relaxed">
                Kami tidak sekadar memasang dekorasi, melainkan membangun atmosfer
                emosional yang memikat indra penglihatan dan penciuman para tamu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {designPillars.map((p, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-canvas border border-taupe/35 shadow-xs flex flex-col justify-between hover:border-forest-green hover:shadow-md transition-all"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-forest-green/10 text-forest-green flex items-center justify-center mb-4">
                      <p.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-black mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-black/75 font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tiers Table */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-brown block mb-2">
              Katalog Investasi Resmi
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-black font-editorial font-light mb-4">
              Pilihan Skala Pelaminan Saja
            </h2>
            <p className="text-sm md:text-base text-black/70 font-light leading-relaxed">
              Biaya transparan tanpa biaya tersembunyi sesuai rincian pada data resmi
              wedding-prices.json ByDaisy Planner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decorTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-sand/60 border border-taupe/35 shadow-xs flex flex-col justify-between hover:border-forest-green hover:shadow-lg transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold text-forest-green uppercase tracking-wider bg-forest-green/10 px-2.5 py-1 rounded-full block w-fit mb-3">
                    {tier.highlight}
                  </span>

                  <h3 className="font-serif text-xl font-semibold text-black mb-1">
                    {tier.name}
                  </h3>

                  <div className="font-serif text-2xl font-semibold text-brown mb-1">
                    {tier.price}
                  </div>

                  <span className="text-[11px] text-warm-taupe block mb-6 font-medium">
                    {tier.target}
                  </span>

                  <ul className="space-y-2.5 text-xs text-black/80 font-light mb-8">
                    {tier.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-forest-green shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedTier(tier.name);
                    setIsConsultationOpen(true);
                  }}
                  className="w-full py-3 rounded-full bg-black text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-green transition-colors text-center shadow-xs"
                >
                  Konsultasi Tier Ini
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="p-8 sm:p-14 rounded-3xl bg-forest-green text-canvas text-center shadow-xl">
            <span className="text-xs uppercase tracking-widest text-light-taupe block mb-3 font-semibold">
              Desain Kustom Penuh
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light mb-4">
              Punya Konsep Sketsa Sendiri?
            </h3>
            <p className="text-xs sm:text-sm text-canvas/80 max-w-xl mx-auto font-light leading-relaxed mb-8">
              Kirimkan moodboard impian Anda atau diskusikan denah gedung bersama tim artistik
              ByDaisy untuk mendapatkan proposal 3D visual secara personal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-canvas text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-md"
              >
                Rancang Desain Kustom
              </button>
              <a
                href="https://wa.me/6282277094277?text=Halo%20ByDaisy%20Planner,%20saya%20ingin%20berkonsultasi%20mengenai%20Dekorasi%20Pelaminan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-canvas/60 text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-canvas hover:text-forest-green transition-all"
              >
                Hubungi Hotline WhatsApp →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ConsultationSheet
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
