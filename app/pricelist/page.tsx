"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import weddingData from "@/data/wedding-prices.json";
import {
  CheckCircle2,
  FileDown,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  HeartHandshake,
  MapPin,
  Users,
  Utensils,
  ChevronDown,
  Layers,
  Palette,
  PartyPopper,
  Building,
  Check,
  ExternalLink,
} from "lucide-react";

export default function PricelistPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Wedding Planner");
  const [activeTab, setActiveTab] = useState<string>("all-in-daisy");
  const [showFullMenu, setShowFullMenu] = useState(false);

  const tabs = [
    {
      id: "all-in-daisy",
      label: "All-In Signature",
      icon: Sparkles,
      count: "300 - 1000 Pax",
    },
    {
      id: "sribudaya-resort",
      label: "Sribudaya Resort 2026",
      icon: Building,
      badge: "Include Venue",
      count: "300 - 2000 Pax",
    },
    {
      id: "vandys-garden",
      label: "Vandys Garden 2026",
      icon: MapPin,
      badge: "85 Juta",
      count: "500 Pax",
    },
    {
      id: "planner-organizer-only",
      label: "Planner & WO Only",
      icon: Layers,
      count: "15 - 25 Juta",
    },
    {
      id: "decoration-only",
      label: "Dekorasi Saja",
      icon: Palette,
      count: "10m - 19m",
    },
    {
      id: "add-ons",
      label: "Itemized Add-On",
      icon: Utensils,
      count: "27 Item",
    },
  ];

  const currentCategory = weddingData.categories.find(
    (c) => c.id === activeTab
  );

  const handleOpenConsultation = (serviceName = "Wedding Planner") => {
    setSelectedService(serviceName);
    setIsConsultationOpen(true);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="relative min-h-screen bg-canvas text-black">
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      <main className="pt-8 pb-24 md:pt-14 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Breadcrumb & Intro */}
          <div className="max-w-4xl mb-10">
            <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-taupe mb-4">
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-black font-medium">Pricelist & Paket</span>
            </nav>

            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3.5 py-1 rounded-full bg-sand border border-taupe/40 text-brown text-xs font-semibold uppercase tracking-widest">
                Transparan, Autentik & Terkurasi
              </span>
              <div className="flex gap-1 items-center opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-brown inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-warm-taupe inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-taupe inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-forest-green inline-block"></span>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.08] mb-6 font-editorial">
              Investasi & Paket Resmi ByDaisy 2026
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              Pilihan lengkap dari paket terpadu All-In ByDaisy, kemitraan eksklusif
              bersama <strong>Sribudaya Resort</strong> dan <strong>Vandys Garden</strong>,
              layanan perencanaan murni (Planner/WO), hingga dekorasi pelaminan megah
              arsitektur tradisi dan modern.
            </p>
          </div>

          {/* E-Catalog Download Center (4 Official PDFs) */}
          <div className="mb-14 rounded-3xl bg-sand/70 border border-taupe/40 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-taupe/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-green/10 text-forest-green flex items-center justify-center shrink-0">
                  <FileDown className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brown font-semibold block">
                    Pusat Berkas Resmi 2026
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-black font-medium">
                    Unduh Dokumen & E-Catalog Lengkap (PDF)
                  </h3>
                </div>
              </div>
              <p className="text-xs text-warm-taupe max-w-md font-light">
                Seluruh rincian teknis, spesifikasi dekorasi, denah layout pelaminan,
                dan ketentuan resmi dapat diunduh langsung ke perangkat Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {weddingData.catalogs.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 rounded-2xl bg-canvas border border-taupe/30 flex flex-col justify-between hover:border-forest-green/60 hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold text-forest-green uppercase tracking-wider bg-forest-green/10 px-2 py-0.5 rounded">
                        {cat.size}
                      </span>
                      <FileDown className="w-4 h-4 text-warm-taupe group-hover:text-forest-green transition-colors" />
                    </div>
                    <h4 className="font-serif text-base font-semibold text-black mb-1 group-hover:text-forest-green transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-[11px] text-black/70 font-light line-clamp-2 leading-relaxed mb-3">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-taupe/20">
                    <a
                      href={cat.url}
                      download={cat.filename}
                      className="flex-1 py-2 px-3 rounded-lg bg-black text-canvas text-[11px] font-medium text-center hover:bg-forest-green transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FileDown className="w-3 h-3" />
                      <span>Unduh PDF</span>
                    </a>
                    <a
                      href={cat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-taupe/40 text-black hover:bg-sand transition-colors"
                      title="Lihat di Browser"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="mb-10">
            <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all shrink-0 flex items-center gap-2.5 relative border ${
                      isActive
                        ? "bg-forest-green text-canvas border-forest-green shadow-md"
                        : "bg-canvas text-black/80 border-taupe/40 hover:bg-sand hover:text-black"
                    }`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-sand text-brown border border-taupe/30"
                      }`}
                    >
                      {tab.count}
                    </span>
                    {tab.badge && (
                      <span className="hidden sm:inline-block text-[9px] uppercase tracking-wider font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Banner & Intro */}
          {currentCategory && (
            <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-sand/40 border border-taupe/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-brown font-semibold block mb-1">
                  Kategori Terpilih
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-black">
                  {currentCategory.title}
                </h2>
                <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
                  {currentCategory.subtitle}
                </p>
              </div>
              <p className="text-xs text-warm-taupe max-w-md font-light leading-relaxed">
                {currentCategory.description}
              </p>
            </div>
          )}

          {/* TAB 1, 2, 3, 4, 5: Package Cards View */}
          {activeTab !== "add-ons" && currentCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-16">
              {currentCategory.packages.map((pkg, idx) => {
                const isHighlight = (pkg as any).highlight;
                return (
                  <div
                    key={pkg.id || idx}
                    className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                      isHighlight
                        ? "bg-forest-green text-canvas shadow-2xl scale-100 lg:-translate-y-2 border-2 border-forest-green"
                        : "bg-canvas text-black border border-taupe/40 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isHighlight && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-canvas text-forest-green text-[10px] font-semibold uppercase tracking-widest shadow-md">
                        {pkg.tag}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-xs uppercase tracking-wider font-semibold ${
                            isHighlight ? "text-light-taupe" : "text-brown"
                          }`}
                        >
                          {pkg.tag}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Users
                            className={`w-3.5 h-3.5 ${
                              isHighlight ? "text-taupe" : "text-forest-green"
                            }`}
                          />
                          <span
                            className={`text-xs font-medium ${
                              isHighlight ? "text-canvas" : "text-black"
                            }`}
                          >
                            {(pkg as any).capacity}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide mb-3">
                        {pkg.name}
                      </h3>

                      <div
                        className={`p-5 rounded-2xl mb-6 ${
                          isHighlight ? "bg-white/10" : "bg-sand"
                        }`}
                      >
                        <span
                          className={`text-[10px] uppercase tracking-widest block ${
                            isHighlight ? "text-light-taupe" : "text-warm-taupe"
                          }`}
                        >
                          Investasi Paket
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="font-serif text-2xl sm:text-3xl font-semibold">
                            {formatRupiah(pkg.price)}
                          </span>
                          <span
                            className={`text-xs ${
                              isHighlight ? "text-light-taupe" : "text-warm-taupe"
                            }`}
                          >
                            / paket
                          </span>
                        </div>
                      </div>

                      <div className="mb-8">
                        <span
                          className={`text-[11px] uppercase tracking-wider font-semibold block mb-3 ${
                            isHighlight ? "text-light-taupe" : "text-brown"
                          }`}
                        >
                          Inklusi Layanan & Fasilitas:
                        </span>
                        <ul className="space-y-2.5 text-xs sm:text-[13px] font-light">
                          {pkg.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5">
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isHighlight
                                    ? "text-canvas"
                                    : "text-forest-green"
                                }`}
                              />
                              <span
                                className={
                                  isHighlight
                                    ? "text-canvas/90"
                                    : "text-black/80"
                                }
                              >
                                {feat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-taupe/20">
                      <a
                        href={`https://wa.me/6282277094277?text=${encodeURIComponent(
                          pkg.whatsappMsg
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                          isHighlight
                            ? "bg-canvas text-forest-green hover:bg-sand"
                            : "bg-black text-canvas hover:bg-forest-green"
                        }`}
                      >
                        <span>Reservasi Paket via Hotline 1</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>

                      <a
                        href={`https://wa.me/6282162221468?text=${encodeURIComponent(
                          pkg.whatsappMsg
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2.5 rounded-full text-[11px] uppercase tracking-wider font-medium text-center flex items-center justify-center gap-1.5 transition-colors border ${
                          isHighlight
                            ? "border-canvas/40 text-canvas hover:bg-white/10"
                            : "border-taupe/40 text-black hover:bg-sand"
                        }`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat via Hotline 2 (+62 821-6222-1468)</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 6: Itemized Add-Ons & Rentals */}
          {activeTab === "add-ons" && (
            <div className="mb-16">
              <div className="p-6 sm:p-8 rounded-3xl bg-sand/60 border border-taupe/30 mb-8">
                <h3 className="font-serif text-2xl sm:text-3xl text-black mb-2">
                  Daftar Sewa Perlengkapan & Layanan Tambahan (Add-On)
                </h3>
                <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed max-w-2xl">
                  Transparansi harga satuan untuk penambahan tenda, kursi VIP, pendingin,
                  upgrade tim kerja, hingga prosesi adat Aceh terpisah.
                </p>
              </div>

              {/* Grouped by category */}
              {Array.from(
                new Set(weddingData.addOns.map((a) => a.category))
              ).map((catName) => {
                const items = weddingData.addOns.filter(
                  (a) => a.category === catName
                );
                return (
                  <div key={catName} className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-forest-green inline-block"></span>
                      <h4 className="font-serif text-xl sm:text-2xl text-black font-medium">
                        {catName}
                      </h4>
                      <span className="text-xs text-warm-taupe">
                        ({items.length} item)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="p-5 rounded-2xl bg-canvas border border-taupe/30 hover:border-forest-green/50 transition-colors shadow-sm flex items-center justify-between gap-4"
                        >
                          <div>
                            <h5 className="font-serif text-base font-medium text-black">
                              {item.name}
                            </h5>
                            <span className="text-[11px] text-warm-taupe">
                              Satuan: per {item.unit}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-serif text-lg font-semibold text-forest-green block">
                              {formatRupiah(item.price)}
                            </span>
                            <span className="text-[10px] text-brown uppercase tracking-wider font-semibold">
                              /{item.unit}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Authentic Authentic Traditional Aceh F&B Showcase */}
          <div className="rounded-3xl bg-sand/60 border border-taupe/40 p-8 sm:p-12 mb-16 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-brown block mb-2">
                  Standar Jamuan Kuliner Otentik ByDaisy
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-black">
                  Menu Prasmanan & Jamuan Adat Besan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFullMenu(!showFullMenu)}
                className="px-6 py-2.5 rounded-full bg-black text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-green transition-colors flex items-center gap-2 self-start md:self-auto"
              >
                <span>{showFullMenu ? "Ringkas Rincian Menu" : "Lihat 17 Menu Besan & Prasmanan"}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showFullMenu ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Prasmanan Tamu */}
              <div className="p-6 rounded-2xl bg-canvas border border-taupe/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-green/10 text-forest-green flex items-center justify-center">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-medium text-black">
                      Prasmanan Tamu Reguler
                    </h4>
                    <span className="text-[11px] text-warm-taupe">
                      300 - 2000 Kuota Tamu
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-black/80 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Nasi Putih Harum</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <strong className="font-medium text-black">Kuah Beulangong Khas Aceh</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Daging Sie Reboh (30%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Ayam Masak Rempah Gurih</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Sup Kimlo Segar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Keumamah Ikan Kayu Tradisional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Sambal Goreng Kentang Balado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Tahu Goreng / Salad Sayur / Gado-Gado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Kerupuk Renyah & Air Mineral</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Makan Besan Hidang */}
              <div className="p-6 rounded-2xl bg-canvas border border-taupe/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-green/10 text-forest-green flex items-center justify-center">
                    <PartyPopper className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-medium text-black">
                      Makan Besan Hidang (30 Pax)
                    </h4>
                    <span className="text-[11px] text-warm-taupe">
                      Penghormatan Keluarga Inti
                    </span>
                  </div>
                </div>
                <p className="text-xs text-black/75 font-light mb-3 leading-relaxed">
                  Disajikan khusus dalam tradisi hidang tertutup untuk menjamu keluarga
                  pengantin pria secara sakral:
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {[
                    "Kuah Beulangong",
                    "Rendang Daging",
                    "Daging Masak Aceh",
                    "Ikan Asam Manis",
                    "Ayam Masak Aceh",
                    "Keumamah",
                    "Ayam Goreng",
                    "Sambal Hati Ayam",
                    "Udang Masak Aceh",
                    "Udang Goreng Tepung",
                    "Telur Asin",
                    "Pergedel",
                    "Sate Daging",
                    "Tahu Goreng",
                    "Buah-buahan",
                    "Kerupuk & Mineral",
                  ].map((menuItem, mIdx) => (
                    <span
                      key={mIdx}
                      className="px-2.5 py-1 rounded-md bg-sand text-brown font-medium"
                    >
                      {menuItem}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: Bonus Stall Pondokan */}
              <div className="p-6 rounded-2xl bg-canvas border border-taupe/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-green/10 text-forest-green flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-medium text-black">
                      Bonus Stall & Kue Tradisi
                    </h4>
                    <span className="text-[11px] text-warm-taupe">
                      Termasuk Seluruh Paket All-In
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-black/80 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Aneka Jus Buah Segar Pilihan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <strong className="font-medium text-black">Rujak Aceh Otentik Bumbu Khas</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Semangka, Melon & Pepaya Potong</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Stall Mie Bakso Hangat / Mie Kocok Aceh</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Kue Basah: Timphan Asoe Kaya, Cenil, Serabi, Tape</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>Pie Buah, Puding Santan, & Risol Gurih</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Authentic Budget Planning Breakdown from Company Profile */}
          <div className="rounded-3xl bg-white border border-taupe/30 p-8 sm:p-12 mb-16 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-forest-green block mb-2">
                  Riset & Panduan Anggaran • ByDaisy Company Profile
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-black">
                  Proporsi Ideal Anggaran Resepsi Pernikahan
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-brown max-w-md font-light leading-relaxed">
                Berdasarkan rekam jejak puluhan pernikahan di Aceh, berikut rasio alokasi anggaran ideal untuk mencegah pembengkakan pembiayaan tak terduga.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-canvas border border-taupe/20">
                <span className="font-serif text-3xl text-forest-green font-semibold block">29.4%</span>
                <strong className="text-xs font-semibold text-black block mt-1">Catering & Jamuan</strong>
                <span className="text-[11px] text-warm-taupe mt-0.5 block">Menu utama & pondokan</span>
              </div>
              <div className="p-5 rounded-2xl bg-canvas border border-taupe/20">
                <span className="font-serif text-3xl text-forest-green font-semibold block">17.6%</span>
                <strong className="text-xs font-semibold text-black block mt-1">Adat Istiadat</strong>
                <span className="text-[11px] text-warm-taupe mt-0.5 block">Prosesi sakral & sesepuh</span>
              </div>
              <div className="p-5 rounded-2xl bg-canvas border border-taupe/20">
                <span className="font-serif text-3xl text-forest-green font-semibold block">11.8%</span>
                <strong className="text-xs font-semibold text-black block mt-1">Dekorasi & Pelaminan</strong>
                <span className="text-[11px] text-warm-taupe mt-0.5 block">Fresh flowers & lighting</span>
              </div>
              <div className="p-5 rounded-2xl bg-canvas border border-taupe/20">
                <span className="font-serif text-3xl text-forest-green font-semibold block">11.8%</span>
                <strong className="text-xs font-semibold text-black block mt-1">Attire & Makeup (MUA)</strong>
                <span className="text-[11px] text-warm-taupe mt-0.5 block">Busana adat & resepsi</span>
              </div>
              <div className="p-5 rounded-2xl bg-canvas border border-taupe/20">
                <span className="font-serif text-3xl text-black font-semibold block">5.9%</span>
                <strong className="text-xs font-semibold text-black block mt-1">Undangan & Souvenir</strong>
                <span className="text-[11px] text-warm-taupe mt-0.5 block">Cetak fisik & digital</span>
              </div>
              <div className="p-5 rounded-2xl bg-canvas border border-taupe/20">
                <span className="font-serif text-3xl text-black font-semibold block">5.9%</span>
                <strong className="text-xs font-semibold text-black block mt-1">Entertainment & MC</strong>
                <span className="text-[11px] text-warm-taupe mt-0.5 block">Musik akustik & MC adat</span>
              </div>
              <div className="p-5 rounded-2xl bg-canvas border border-taupe/20">
                <span className="font-serif text-3xl text-black font-semibold block">5.9%</span>
                <strong className="text-xs font-semibold text-black block mt-1">Dokumentasi</strong>
                <span className="text-[11px] text-warm-taupe mt-0.5 block">Foto & cinematic video</span>
              </div>
              <div className="p-5 rounded-2xl bg-canvas border border-taupe/20">
                <span className="font-serif text-3xl text-black font-semibold block">5.9%</span>
                <strong className="text-xs font-semibold text-black block mt-1">Pemilihan Venue</strong>
                <span className="text-[11px] text-warm-taupe mt-0.5 block">Sewa gedung & perizinan</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-taupe/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <span className="text-warm-taupe">
                Format spreadsheet kalkulator anggaran lengkap tersedia di berkas Company Profile ByDaisy.
              </span>
              <a
                href="/assets/ByDaisy-Company-Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-green hover:underline font-semibold uppercase tracking-wider shrink-0"
              >
                Unduh Company Profile Selengkapnya (PDF) →
              </a>
            </div>
          </div>

          {/* Value Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-t border-taupe/30 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-medium text-black mb-1">
                Zero Hidden Costs
              </h4>
              <p className="text-xs text-black/70 max-w-xs font-light">
                Kontrak transparan dengan rincian biaya yang disepakati sejak
                awal tanpa biaya tak terduga.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-medium text-black mb-1">
                Strict Timekeeping
              </h4>
              <p className="text-xs text-black/70 max-w-xs font-light">
                Manajemen rundown ketat per menit memastikan seluruh rangkaian
                berjalan tepat waktu dan tenang.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-medium text-black mb-1">
                VIP Family Hospitality
              </h4>
              <p className="text-xs text-black/70 max-w-xs font-light">
                Perhatian penuh pada kenyamanan orang tua, sesepuh adat, dan tamu
                kehormatan selama acara berlangsung.
              </p>
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
