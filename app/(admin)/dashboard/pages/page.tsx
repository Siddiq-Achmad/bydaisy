"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ExternalLink,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Eye,
  Edit3,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AdminPagesArchitecture() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const routes = [
    {
      route: "/",
      name: "Sinematik Landing Page",
      category: "Core Landing",
      status: "Live (SSG)",
      lastModified: "Hari ini, 18.45 WIB",
      description: "Hero SplitText, Bento 3D Tilt Services, Pinned Horizontal Scroll, Parallax Gallery & Lead Drawer.",
      seoTitle: "ByDaisy Planner | Luxury Wedding Planner & Organizer",
    },
    {
      route: "/about",
      name: "Tentang Studio ByDaisy",
      category: "Editorial",
      status: "Live (SSG)",
      lastModified: "Hari ini, 17.30 WIB",
      description: "Sejarah dedikasi sejak 2019, 3 Pilar Filosofi, rekam jejak 14.000 tamu Meulaboh, visi misi studio.",
      seoTitle: "Tentang Kami | ByDaisy Planner",
    },
    {
      route: "/services",
      name: "Layanan Eksklusif",
      category: "Services",
      status: "Live (SSG)",
      lastModified: "Hari ini, 18.00 WIB",
      description: "Tiga pilar spesialisasi: Wedding Planner, Wedding Organizer, dan Dekorasi Spatial.",
      seoTitle: "Layanan & Spesialisasi | ByDaisy Planner",
    },
    {
      route: "/services/wedding-planner",
      name: "Detail Wedding Planner (12 Kru)",
      category: "Services Detail",
      status: "Live (SSG)",
      lastModified: "Hari ini, 16.20 WIB",
      description: "Cakupan kerja 3 fase hulu-ke-hilir, Formasi 12 Kru Lapangan, dan Matriks Transparansi Mandat.",
      seoTitle: "Wedding Planner & 12 Kru Formasi | ByDaisy",
    },
    {
      route: "/services/wedding-organizer",
      name: "Detail Wedding Organizer (14 Kru)",
      category: "Services Detail",
      status: "Live (SSG)",
      lastModified: "Baru saja",
      description: "Orkestrasi Hari H, Formasi 14 Kru Lapangan, 4 Milestone Timeline, Investasi Rp 15.000.000.",
      seoTitle: "Wedding Organizer & 14 Kru Formasi | ByDaisy",
    },
    {
      route: "/services/decoration-styling",
      name: "Detail Dekorasi & Spatial Art",
      category: "Services Detail",
      status: "Live (SSG)",
      lastModified: "Baru saja",
      description: "4 Tier Pelaminan Saja (10m s/d Royal 19m Tiffani), 3D Spatial Rendering, Floristry & Lighting.",
      seoTitle: "Dekorasi Pelaminan & Spatial Art | ByDaisy",
    },
    {
      route: "/pricelist",
      name: "Pricelist & Paket 2026",
      category: "Pricing & Commerce",
      status: "Live (SSG)",
      lastModified: "Hari ini, 18.52 WIB",
      description: "Tab interaktif All-In Signature, Sribudaya 2026, Vandys Garden, WP/WO, Dekorasi, dan 4 E-Catalog PDF.",
      seoTitle: "Investasi & Paket Resmi 2026 | ByDaisy",
    },
    {
      route: "/gallery",
      name: "Galeri Dokumentasi Visual",
      category: "Portfolio",
      status: "Live (SSG)",
      lastModified: "Kemarin",
      description: "Kurasi visual berfilter: Pelaminan Tradisi, Resepsi Modern, Busana Adat, dan Detail Hantaran.",
      seoTitle: "Galeri Dokumentasi Pernikahan | ByDaisy",
    },
    {
      route: "/portfolio",
      name: "Portfolio & Real Weddings",
      category: "Portfolio",
      status: "Live (SSG)",
      lastModified: "Baru saja",
      description: "Showcase pernikahan riil: Jihad & Nanda, Nazhira & Naufal, Jacky & Valerie, kalender slot 2025/2026, dan 14 kru breakdown.",
      seoTitle: "Portfolio & Real Weddings Showcase | ByDaisy",
    },
    {
      route: "/vendors",
      name: "The Curated Circle (Vendors)",
      category: "Directory",
      status: "Live (SSG)",
      lastModified: "2 hari lalu",
      description: "Direktori vendor terverifikasi lintas Aceh dan Sumatera dengan komitmen 0% markup.",
      seoTitle: "The Curated Circle - Vendor Rekanan | ByDaisy",
    },
    {
      route: "/tradisi",
      name: "Panduan Tradisi & Ritus Adat",
      category: "Cultural Journal",
      status: "Live (SSG)",
      lastModified: "3 hari lalu",
      description: "Protokoler sakral Adat Aceh (Peusijuek, Ranup Lampuan, Seumapa), Melayu Deli, dan Minangkabau.",
      seoTitle: "Panduan Ritus Tradisi Adat Aceh | ByDaisy",
    },
    {
      route: "/reviews",
      name: "Love Letters & Ulasan",
      category: "Social Proof",
      status: "Live (SSG)",
      lastModified: "1 hari lalu",
      description: "140+ ulasan terverifikasi pengantin, rating 4.98 bintang, video testimonial, dan cover story.",
      seoTitle: "Love Letters & Surat Apresiasi | ByDaisy",
    },
    {
      route: "/journal",
      name: "Jurnal & Wawasan Pernikahan",
      category: "Editorial",
      status: "Live (SSG)",
      lastModified: "Hari ini, 11.00 WIB",
      description: "Artikel wawasan perencanaan, proporsi ideal anggaran resepsi, dan tren dekorasi 2026.",
      seoTitle: "Jurnal & Inspirasi Pernikahan | ByDaisy",
    },
    {
      route: "/contact",
      name: "Kontak & Lokasi Studio",
      category: "Contact",
      status: "Live (SSG)",
      lastModified: "Hari ini, 18.40 WIB",
      description: "Hotline 1 & 2, studio Lambhuk Banda Aceh, akun Instagram @bydaisyplanner, form pesan.",
      seoTitle: "Hubungi Concierge & Lokasi Studio | ByDaisy",
    },
    {
      route: "/sitemap.xml",
      name: "Dynamic XML Sitemap",
      category: "SEO Automation",
      status: "Live (Dynamic)",
      lastModified: "Automated",
      description: "Peta situs otomatis untuk crawler Google, indeksasi 100% rute produksi.",
      seoTitle: "XML Sitemap Index",
    },
    {
      route: "/robots.txt",
      name: "Robots Configuration",
      category: "SEO Automation",
      status: "Live (Static)",
      lastModified: "Automated",
      description: "Aturan perayapan mesin pencari dan proteksi rute administrasi internal.",
      seoTitle: "Robots Protocol",
    },
  ];

  const filteredRoutes = routes.filter((r) => {
    const q = search.toLowerCase();
    const matchesSearch =
      r.route.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q);
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Arsitektur Web • Next.js 16 App Router
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Pages Architecture & CMS Monitor
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Status penerbitan, indeksasi SEO, dan pembaruan 17 rute publik ByDaisy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2"
          >
            <span>Buka Homepage Live</span>
            <ExternalLink className="w-3.5 h-3.5 text-forest-green" />
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-warm-taupe" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari rute, halaman, atau kategori..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-taupe/30 text-xs text-black placeholder:text-warm-taupe focus:outline-none focus:border-forest-green shadow-xs"
          />
        </div>

        <div className="text-xs text-warm-taupe">
          Menampilkan <strong className="text-black">{filteredRoutes.length}</strong> dari 17 rute sistem
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-2xl border border-taupe/30 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F6F1] border-b border-taupe/20 text-[11px] uppercase tracking-wider text-warm-taupe font-semibold">
                <th className="py-3.5 px-5">Rute & Halaman</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Status Rilis</th>
                <th className="py-3.5 px-4">Terakhir Diperbarui</th>
                <th className="py-3.5 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe/15">
              {filteredRoutes.map((item, idx) => (
                <tr key={idx} className="hover:bg-sand/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <code className="text-[11px] font-mono px-2 py-0.5 rounded bg-sand text-brown font-semibold">
                          {item.route}
                        </code>
                        <span className="font-serif text-sm font-semibold text-black">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-black/70 font-light mt-1 line-clamp-1 max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-warm-taupe font-medium">
                    {item.category}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-forest-green bg-forest-green/10 border border-forest-green/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-warm-taupe text-[11px]">
                    {item.lastModified}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <Link
                      href={item.route}
                      target="_blank"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F8F6F1] text-black hover:bg-forest-green hover:text-white transition-colors text-[11px] font-semibold border border-taupe/30"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Lihat Live</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
