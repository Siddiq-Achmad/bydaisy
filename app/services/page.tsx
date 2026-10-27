"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import { Check, ArrowRight, Sparkles, Layers, Clock, Palette } from "lucide-react";

export default function ServicesPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Wedding Planner");

  const services = [
    {
      id: "wedding-planner",
      title: "Wedding Planner",
      subhead: "Comprehensive 3-9 Months Full Journey",
      icon: Clock,
      description:
        "Pendampingan menyeluruh dari konsepsi awal hingga acara selesai. Kami menyusun estimasi anggaran, mengkurasi vendor terbaik sesuai selera Anda, merancang moodboard tematik, hingga technical meeting akbar.",
      image:
        "/assets/images/service-briefing.jpg",
      deliverables: [
        "Financial Planning & Budget Optimization Sheet",
        "Creative Direction: Palet Warna, Moodboard, & Guideline Busana",
        "Pencocokan & Negosiasi Vendor (MUA, Foto, Video, Catering, Venue)",
        "Penyusunan Timeline Kerja H-180 hingga H-1",
        "Pendampingan Gladi Resik & Rapat Koordinasi Keluarga Besar",
        "Lead Planner Standby 24/7 Selama Masa Persiapan",
      ],
    },
    {
      id: "wedding-organizer",
      title: "Wedding Organizer (WO)",
      subhead: "D-Day Execution & Minute-by-Minute Timekeeping",
      icon: Layers,
      description:
        "Bagi pasangan yang telah memilih vendor secara mandiri namun menginginkan orkestrasi panggung dan operasional yang rapi di hari bahagia. Kami memastikan seluruh pihak keluarga dan vendor bekerja serasi tanpa hambatan.",
      image:
        "/assets/images/img41.jpg",
      deliverables: [
        "8 hingga 16 Kru On-site Bersertifikasi & Berseragam Resmi",
        "Show Director berpengalaman untuk alur panggung, band, dan MC",
        "Minute-by-minute Rundown terperinci untuk akad dan resepsi",
        "Pengawalan protokol VIP, pejabat kehormatan, dan keluarga inti",
        "Personal Assistant Pengantin untuk touch up, snack, & busana",
        "Handover logistik dan kado pengantin tuntas pasca-acara",
      ],
    },
    {
      id: "decoration-styling",
      title: "Decoration & Styling",
      subhead: "Tata Artistik Ruang & Seni Bunga",
      icon: Palette,
      description:
        "Mewujudkan atmosfer visual yang memukau dan bercerita. Dari keagungan ornamen songket dan ukiran adat khas Nusantara hingga modern botanical chandelier ballroom bertaraf internasional.",
      image:
        "/assets/images/gallery-white-pavillion.jpg",
      deliverables: [
        "Visual 3D Spatial Rendering & Layout Floorplan",
        "Instalasi Pelaminan Kustom (Lebar 10M hingga 20M+)",
        "Premium Fresh Flower Arrangements & Aisle Styling",
        "Atmosfer Pencahayaan Dramatis (Spotlight, Par-LED, Moving Beam)",
        "Entrance Foyer, Reception Desk, & Photobooth Eksklusif",
        "Penataan Meja VIP & Table Centerpieces",
      ],
    },
  ];

  const handleOpenConsultation = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-canvas text-black">
      <Navbar onOpenConsultation={() => handleOpenConsultation("Wedding Planner")} />

      <main className="pt-8 pb-24 md:pt-14 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-taupe mb-4">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-black font-medium">Layanan Eksklusif</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-warm-taupe" />
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                Perencanaan & Pengorganisasian Pernikahan ByDaisy
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.12] mb-6 font-editorial font-light">
              Tiga Pilar Layanan <br />
              <span className="italic font-light text-forest-green">
                Pernikahan Idaman
              </span>
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              Kami membagi keahlian kami ke dalam tiga lini spesialisasi yang
              dapat Anda pilih secara modular maupun digabungkan dalam paket
              all-in yang harmonis.
            </p>
          </div>

          {/* Detailed Service Cards */}
          <div className="space-y-24 mb-24">
            {services.map((srv, idx) => (
              <div
                key={srv.id}
                id={srv.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}
                >
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl bg-sand border border-taupe/40 group">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-full bg-canvas/90 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-forest-green shadow-sm border border-taupe/30">
                        {srv.subhead}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${idx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-forest-green/10 text-forest-green flex items-center justify-center mb-6">
                    <srv.icon className="w-6 h-6" />
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-black mb-4 font-editorial">
                    {srv.title}
                  </h2>

                  <p className="text-sm md:text-base text-black/75 font-light leading-relaxed mb-8">
                    {srv.description}
                  </p>

                  <div className="space-y-3 mb-10">
                    <span className="text-xs uppercase tracking-wider font-semibold text-brown block mb-2">
                      Ruang Lingkup Pekerjaan:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-black/80 font-light">
                      {srv.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleOpenConsultation(srv.title)}
                      className="px-8 py-3.5 rounded-full bg-black text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-green transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Konsultasi Paket Ini</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {srv.id === "wedding-planner" && (
                      <Link
                        href="/services/wedding-planner"
                        className="px-6 py-3.5 rounded-full bg-forest-green text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
                      >
                        Detail Jobdesk & Kru 12
                      </Link>
                    )}

                    {srv.id === "wedding-organizer" && (
                      <Link
                        href="/services/wedding-organizer"
                        className="px-6 py-3.5 rounded-full bg-forest-green text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
                      >
                        Detail Kru 14 & Hari H
                      </Link>
                    )}

                    {srv.id === "decoration-styling" && (
                      <Link
                        href="/services/decoration-styling"
                        className="px-6 py-3.5 rounded-full bg-forest-green text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
                      >
                        Detail 4 Tier Pelaminan
                      </Link>
                    )}

                    <Link
                      href="/pricelist"
                      className="px-6 py-3.5 rounded-full border border-taupe/60 text-black text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-colors"
                    >
                      Lihat Biaya Investasi
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="p-8 sm:p-14 rounded-3xl bg-sand/70 border border-taupe/40 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="font-serif text-3xl md:text-4xl text-black mb-4 font-editorial">
              Butuh Paket Gabungan (All-In Custom)?
            </h3>
            <p className="text-sm text-black/70 font-light max-w-xl mx-auto mb-8 leading-relaxed">
              Kami dapat memadukan Planner, Organizer, dan Dekorasi ke dalam satu
              penawaran khusus yang disesuaikan dengan kuota tamu dan gedung
              resepsi Anda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenConsultation("All-In Custom Package")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-forest-green text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-hover transition-all shadow-md"
              >
                Rancang Paket Kustom
              </button>
              <Link
                href="/pricelist"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-black text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all shadow-sm"
              >
                Lihat Paket All-In & Resort 2026 →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ConsultationSheet
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
}
