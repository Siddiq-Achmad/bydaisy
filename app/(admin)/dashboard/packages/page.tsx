"use client";

import React, { useState } from "react";
import Link from "next/link";
import weddingData from "@/data/wedding-prices.json";
import {
  CreditCard,
  ExternalLink,
  Plus,
  Sparkles,
  Building,
  MapPin,
  Layers,
  Palette,
  CheckCircle2,
  FileDown,
  Edit2,
  ArrowRight,
} from "lucide-react";

export default function AdminPackagesManager() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all-in-daisy");

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const categoryIcons: Record<string, React.ElementType> = {
    "all-in-daisy": Sparkles,
    "sribudaya-resort": Building,
    "vandys-garden": MapPin,
    "planner-organizer-only": Layers,
    "decoration-only": Palette,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Katalog Investasi 2026 • Single Source of Truth
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Pricelist & Paket Pernikahan
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Pengelolaan paket All-In Signature, kemitraan Sribudaya Resort, Vandys Garden, dan dekorasi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/pricelist"
            target="_blank"
            className="px-4 py-2 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2"
          >
            <span>Lihat Halaman Pricelist</span>
            <ExternalLink className="w-3.5 h-3.5 text-forest-green" />
          </Link>
        </div>
      </div>

      {/* 4 E-Catalog PDF Stats */}
      <div className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileDown className="w-4 h-4 text-forest-green" />
            <h3 className="font-serif text-lg text-black font-semibold">
              Katalog E-Booklet Resmi yang Terhubung
            </h3>
          </div>
          <span className="text-xs text-warm-taupe">Tersimpan di public/assets/</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weddingData.catalogs.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-xl bg-[#F8F6F1] border border-taupe/20 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-forest-green bg-forest-green/10 px-2 py-0.5 rounded">
                  {cat.size}
                </span>
                <h4 className="font-serif text-sm font-semibold text-black mt-2 mb-1">
                  {cat.title}
                </h4>
                <code className="text-[10px] font-mono text-warm-taupe block truncate">
                  {cat.filename}
                </code>
              </div>
              <div className="pt-3 mt-3 border-t border-taupe/20 flex items-center justify-between">
                <span className="text-[10px] text-warm-taupe">Aktif Download</span>
                <a
                  href={cat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-forest-green font-semibold hover:underline"
                >
                  Buka File →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter Switcher */}
      <div className="flex flex-wrap items-center gap-2">
        {weddingData.categories.map((cat) => {
          const IconC = categoryIcons[cat.id] || Sparkles;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-forest-green text-white border-forest-green shadow-xs font-semibold"
                  : "bg-white text-black/75 border-taupe/30 hover:bg-sand"
              }`}
            >
              <IconC className="w-3.5 h-3.5" />
              <span>{cat.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-sand text-brown"
                }`}
              >
                {cat.packages.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Package Cards in Selected Category */}
      {weddingData.categories
        .filter((c) => c.id === selectedCategory)
        .map((cat) => (
          <div key={cat.id} className="space-y-6">
            <div className="p-4 rounded-xl bg-sand/60 border border-taupe/30 text-xs text-black/80">
              <strong className="text-black block mb-0.5 font-semibold">
                {cat.subtitle}
              </strong>
              <p className="font-light text-warm-taupe">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.packages.map((pkg, pIdx) => (
                <div
                  key={pkg.id || pIdx}
                  className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/50 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brown bg-sand px-2 py-0.5 rounded">
                        {pkg.tag}
                      </span>
                      <span className="text-xs font-medium text-black">
                        {(pkg as any).capacity}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-black mb-2">
                      {pkg.name}
                    </h3>

                    <div className="p-3.5 rounded-xl bg-[#F8F6F1] mb-4">
                      <span className="text-[10px] uppercase tracking-wider text-warm-taupe block font-medium">
                        Harga Publik
                      </span>
                      <span className="font-serif text-2xl font-bold text-forest-green block mt-0.5">
                        {formatRupiah(pkg.price)}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-black/75 font-light mb-6">
                      <strong className="text-[11px] font-semibold text-black block mb-1">
                        Inklusi Layanan:
                      </strong>
                      {pkg.features.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest-green shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{feat}</span>
                        </div>
                      ))}
                      {pkg.features.length > 4 && (
                        <span className="text-[11px] text-warm-taupe italic block pt-1">
                          + {pkg.features.length - 4} fasilitas lainnya
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-taupe/20 flex items-center justify-between text-xs">
                    <span className="text-warm-taupe text-[11px]">Terhubung ke data/</span>
                    <Link
                      href="/pricelist"
                      target="_blank"
                      className="text-forest-green font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Lihat di Web</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
