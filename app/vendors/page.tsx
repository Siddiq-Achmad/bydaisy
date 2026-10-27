"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Star,
  CheckCircle2,
  Building2,
  Camera,
  Palette,
  Utensils,
  Music,
} from "lucide-react";

import vendorsData from "@/data/vendors.json";

export default function VendorsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState("");

  const { categories, vendors } = vendorsData;

  const filteredVendors =
    activeCategory === "all"
      ? vendors
      : vendors.filter((v) => v.category === activeCategory);

  const handleInquireVendor = (vendorName: string) => {
    setSelectedVendor(vendorName);
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-canvas text-black">
      <Navbar onOpenConsultation={() => handleInquireVendor("Umum")} />

      <main className="pt-8 pb-24 md:pt-14 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-taupe mb-4">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-black font-medium">Vendor Rekanan Terkurasi</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-warm-taupe" />
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                The Curated Circle • Handpicked Excellence
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.08] mb-6 font-editorial">
              Jaringan Vendor Terbaik, <br />
              <span className="italic font-normal text-forest-green">
                Terpercaya & Teruji
              </span>
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              Setiap vendor dalam ekosistem ByDaisy telah melalui kurasi ketat
              dalam hal profesionalisme, ketepatan waktu, legalitas kontrak, serta
              standar estetika kelas atas untuk menghadirkan kenyamanan mutlak di
              hari bahagia Anda.
            </p>
          </div>

          {/* Trust Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            <div className="p-8 rounded-3xl bg-sand/60 border border-taupe/35 shadow-sm">
              <div className="font-serif text-4xl text-black mb-1">50+</div>
              <h3 className="font-serif text-lg font-medium text-black mb-1">
                Vendor Terverifikasi
              </h3>
              <p className="text-xs text-black/70 font-light">
                Melalui seleksi rekam jejak, portofolio riil, dan komitmen etika
                kerja profesional di puluhan helatan bergengsi.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-forest-green text-canvas shadow-lg">
              <div className="font-serif text-4xl mb-1">0%</div>
              <h3 className="font-serif text-lg font-medium mb-1">
                Hidden Markup Fee
              </h3>
              <p className="text-xs text-canvas/80 font-light">
                Transparan total. Penawaran harga resmi langsung dari pihak
                vendor bersangkutan tanpa markup sepihak.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-sand/60 border border-taupe/35 shadow-sm">
              <div className="font-serif text-4xl text-black mb-1">100%</div>
              <h3 className="font-serif text-lg font-medium text-black mb-1">
                On-Time Delivery SLA
              </h3>
              <p className="text-xs text-black/70 font-light">
                Jaminan ketepatan waktu instalasi venue, waktu siap tata rias
                pengantin, hingga penyerahan hasil dokumentasi.
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-14">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-forest-green text-canvas shadow-md"
                    : "bg-sand text-black/75 hover:bg-taupe/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="group flex flex-col rounded-3xl overflow-hidden bg-sand border border-taupe/40 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Visual */}
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  <Image
                    src={vendor.image}
                    alt={vendor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] uppercase tracking-wider text-canvas font-medium">
                      {vendor.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-canvas/90 backdrop-blur-md text-xs font-semibold text-black">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{vendor.rating}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-7 bg-canvas flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-black font-medium mb-1">
                      {vendor.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-warm-taupe mb-3">
                      <span>{vendor.location}</span>
                      <span>•</span>
                      <span className="text-forest-green font-medium">
                        {vendor.priceRange}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed mb-6">
                      {vendor.description}
                    </p>

                    <div className="space-y-1.5 mb-6 text-xs text-black/80 font-light">
                      {vendor.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest-green shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-taupe/20">
                    <button
                      type="button"
                      onClick={() => handleInquireVendor(vendor.name)}
                      className="w-full py-3 rounded-full border border-black text-xs uppercase tracking-widest font-semibold text-black hover:bg-forest-green hover:border-forest-green hover:text-canvas transition-all flex items-center justify-center gap-2"
                    >
                      <span>Hubungi via ByDaisy Planner</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership Callout */}
          <div className="p-8 sm:p-14 rounded-3xl bg-sand/60 border border-taupe/35 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="font-serif text-3xl md:text-4xl text-black mb-3 font-editorial">
              Ingin Menjadi Rekanan Terkurasi ByDaisy?
            </h3>
            <p className="text-sm text-black/70 font-light max-w-xl mx-auto mb-8 leading-relaxed">
              Kami selalu terbuka untuk berkolaborasi dengan vendor pernikahan
              yang memiliki dedikasi tinggi pada kesempurnaan teknis dan
              keindahan visual.
            </p>
            <a
              href="https://wa.me/6282277094277?text=Halo%20ByDaisy%20Planner,%20kami%20tertarik%20untuk%20mendaftarkan%20diri%20sebagai%20rekanan%20vendor."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-black text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-green transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Ajukan Kemitraan Vendor</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />

      <ConsultationSheet
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultService={`Konsultasi Rekanan: ${selectedVendor}`}
      />
    </div>
  );
}
