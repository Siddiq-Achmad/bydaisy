"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store,
  ExternalLink,
  Plus,
  CheckCircle2,
  MapPin,
  Star,
  Search,
  Filter,
} from "lucide-react";

export default function AdminVendorsPage() {
  const [filterCat, setFilterCat] = useState("all");
  const [search, setSearch] = useState("");

  const vendors = [
    {
      name: "Sribudaya Resort",
      category: "Venue & Resort",
      location: "Lampeuneurut, Aceh Besar",
      instagram: "@sribudaya_resort",
      status: "Official Partner 2026",
      specialty: "Outdoor Intimate hingga 2.000 Pax & Free Menginap Resort",
      rating: "5.0 ★",
    },
    {
      name: "Vandys Garden",
      category: "Venue & Garden",
      location: "Banda Aceh",
      instagram: "@vandysgarden",
      status: "Official Partner 2026",
      specialty: "Intimate Garden Wedding 500 Pax (All-In Rp 85.000.000)",
      rating: "4.9 ★",
    },
    {
      name: "BP Projectbooth",
      category: "Photobooth & Souvenir",
      location: "Banda Aceh",
      instagram: "@bp.projectbooth",
      status: "Exclusive Partner",
      specialty: "Cetak Instan 300 lembar, custom template, backdrop foto",
      rating: "5.0 ★",
    },
    {
      name: "HS Floral Studio",
      category: "Florist & Bouquet",
      location: "Banda Aceh",
      instagram: "@hs_floralstudio",
      status: "Verified Artisan",
      specialty: "Hand bouquet pengantin bunga segar impor & corsage VIP",
      rating: "5.0 ★",
    },
    {
      name: "Hermes Palace Hotel",
      category: "Grand Ballroom",
      location: "Lampineung, Banda Aceh",
      instagram: "@hermespalacehotel",
      status: "Rekanan Hotel Bintang 5",
      specialty: "Grand ballroom kapasitas 1.000+ tamu & fasilitas presidential suite",
      rating: "4.9 ★",
    },
    {
      name: "Jaro Souvenirs",
      category: "Souvenir & Hantaran",
      location: "Banda Aceh",
      instagram: "@jaro.souvenirs",
      status: "Pilar ByDaisy Group",
      specialty: "Hantaran mahar adat, seserahan akrilik, dan gift box eksklusif",
      rating: "5.0 ★",
    },
  ];

  const filteredVendors = vendors.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch =
      v.name.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.location.toLowerCase().includes(q);
    if (filterCat === "all") return matchSearch;
    return matchSearch && v.category.toLowerCase().includes(filterCat.toLowerCase());
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Direktori Vendor Terkurasi • 0% Markup Guarantee
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            The Curated Circle — Rekanan Vendor
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Daftar puluhan mitra vendor berkaliber tinggi yang berkolaborasi bersama ByDaisy.
          </p>
        </div>

        <Link
          href="/vendors"
          target="_blank"
          className="px-4 py-2 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <span>Lihat Halaman Publik</span>
          <ExternalLink className="w-3.5 h-3.5 text-forest-green" />
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-warm-taupe" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama vendor, lokasi, kategori..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-taupe/30 text-xs text-black placeholder:text-warm-taupe focus:outline-none focus:border-forest-green shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {[
            { id: "all", label: "Semua Kategori" },
            { id: "venue", label: "Venue & Gedung" },
            { id: "photobooth", label: "Photobooth" },
            { id: "florist", label: "Florist & Bouquet" },
            { id: "souvenir", label: "Souvenir & Hantaran" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCat(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                filterCat === tab.id
                  ? "bg-black text-white border-black font-semibold"
                  : "bg-white text-black/75 border-taupe/30 hover:bg-sand"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-brown bg-sand px-2 py-0.5 rounded">
                  {vendor.category}
                </span>
                <span className="text-xs font-semibold text-amber-700">
                  {vendor.rating}
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-black mb-1">
                {vendor.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-warm-taupe mb-3">
                <MapPin className="w-3.5 h-3.5 text-forest-green shrink-0" />
                <span>{vendor.location}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F6F1] text-xs text-black/80 font-light mb-4">
                <strong className="text-black font-medium block mb-0.5">
                  Spesialisasi & Inklusi:
                </strong>
                {vendor.specialty}
              </div>
            </div>

            <div className="pt-3 border-t border-taupe/20 flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-forest-green">
                {vendor.status}
              </span>
              <a
                href={`https://instagram.com/${vendor.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-taupe hover:text-black font-medium"
              >
                {vendor.instagram}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
