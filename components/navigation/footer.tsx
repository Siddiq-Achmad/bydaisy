"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-taupe/30 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-taupe/30">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-3xl md:text-4xl tracking-tight text-black font-semibold">
                ByDaisy
              </span>
              <div className="flex gap-1 items-center opacity-80">
                <span className="w-1.5 h-1.5 rounded-full bg-brown inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-warm-taupe inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-taupe inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-forest-green inline-block"></span>
              </div>
            </div>
            <p className="font-serif text-xs tracking-widest text-warm-taupe -mt-0.5 uppercase">
              Wedding & Event Planner
            </p>
            <p className="text-sm text-black/70 font-light leading-relaxed max-w-sm pt-2">
              Mewujudkan momen pernikahan paling sakral dan monumental dalam
              hidup Anda dengan ketelitian editorial dan kehangatan dedikasi.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-black mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm text-black/75 font-light">
              <li>
                <Link href="/" className="hover:text-forest-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-forest-green transition-colors">
                  Tentang ByDaisy
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-forest-green transition-colors">
                  Layanan & Paket
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="hover:text-forest-green transition-colors">
                  Rekanan Vendor Terkurasi
                </Link>
              </li>
              <li>
                <Link href="/tradisi" className="hover:text-forest-green transition-colors">
                  Panduan Tradisi & Adat
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-forest-green transition-colors">
                  Love Letters & Ulasan
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-forest-green transition-colors">
                  Galeri & Portofolio
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-forest-green transition-colors">
                  Jurnal & Inspirasi
                </Link>
              </li>
              <li>
                <Link href="/pricelist" className="hover:text-forest-green transition-colors">
                  Pricelist Investasi
                </Link>
              </li>
              <li>
                <Link href="/services/wedding-planner" className="hover:text-forest-green transition-colors text-forest-green font-medium">
                  Detail Layanan (12 Kru)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-forest-green transition-colors opacity-60 hover:opacity-100">
                  Studio Portal CMS (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Studio */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-black mb-4">
              Concierge & Studio
            </h4>
            <div className="space-y-3 text-sm text-black/75 font-light">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                <span>
                  Jl. Batee Suasa, Lambhuk, Banda Aceh • Melayani Seluruh Aceh & Destination Weddings
                </span>
              </p>
              <div className="space-y-1.5 pl-6">
                <p className="text-xs">
                  <span className="text-warm-taupe">Hotline 1: </span>
                  <a
                    href="https://wa.me/6282277094277"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-forest-green underline underline-offset-2 font-medium"
                  >
                    +62 822-7709-4277
                  </a>
                </p>
                <p className="text-xs">
                  <span className="text-warm-taupe">Hotline 2: </span>
                  <a
                    href="https://wa.me/6282162221468"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-forest-green underline underline-offset-2 font-medium"
                  >
                    +62 821-6222-1468
                  </a>
                </p>
              </div>
              <p className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-forest-green shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <a
                  href="https://instagram.com/bydaisyplanner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/80 hover:text-forest-green underline underline-offset-2"
                >
                  @bydaisyplanner
                </a>
              </p>
              <div className="pt-2 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-warm-taupe font-semibold block">
                  E-Catalog Resmi (PDF):
                </span>
                <div className="flex flex-col gap-1 text-xs">
                  <a
                    href="/assets/ALL-IN-PACKAGE-DAISYPLANNER.pdf"
                    download="ALL-IN-PACKAGE-DAISYPLANNER.pdf"
                    className="text-forest-green hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>↓ All-In ByDaisy (300-1000 Pax)</span>
                  </a>
                  <a
                    href="/assets/SRIBUDAYA-2026.pdf"
                    download="SRIBUDAYA-2026.pdf"
                    className="text-forest-green hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>↓ Sribudaya Resort 2026 (300-2000 Pax)</span>
                  </a>
                  <a
                    href="/assets/VANDYS-EVENT-PACKAGE.pdf"
                    download="VANDYS-EVENT-PACKAGE.pdf"
                    className="text-forest-green hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>↓ Vandys Garden 2026 (500 Pax)</span>
                  </a>
                  <a
                    href="/assets/ByDaisy-Company-Profile.pdf"
                    download="ByDaisy-Company-Profile.pdf"
                    className="text-forest-green hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>↓ Company Profile Resmi ByDaisy</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with 4-Circle Stamp Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-taupe gap-4">
          <p>© 2026 ByDaisy Planner. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-widest text-[10px]">
              Curated Matrimonial Artistry by <a href="https://luxima.id" target="_blank" rel="noopener noreferrer" className="hover:text-forest-green underline underline-offset-2">Luxima.id</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
