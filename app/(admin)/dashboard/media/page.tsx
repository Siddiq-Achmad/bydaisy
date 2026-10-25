"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  FileDown,
  ExternalLink,
  Download,
  CheckCircle2,
  HardDrive,
  Eye,
  Type,
} from "lucide-react";

export default function AdminMediaPage() {
  const pdfCatalogs = [
    {
      title: "ByDaisy Company Profile",
      filename: "ByDaisy-Company-Profile.pdf",
      size: "35 MB",
      path: "/assets/ByDaisy-Company-Profile.pdf",
      coverage: "27 Halaman Autentik",
      desc: "Profil studio, legalitas, visi misi, rekam jejak Meulaboh 14.000 tamu, panduan alokasi anggaran pernikahan.",
    },
    {
      title: "All-In Package ByDaisy",
      filename: "ALL-IN-PACKAGE-DAISYPLANNER.pdf",
      size: "21 MB",
      path: "/assets/ALL-IN-PACKAGE-DAISYPLANNER.pdf",
      coverage: "8 Halaman Rincian",
      desc: "Paket lengkap All-In 300, 500, 1.000 Pax, paket dekorasi pelaminan 10m-19m, dan itemized add-on.",
    },
    {
      title: "Sribudaya Resort Wedding 2026",
      filename: "SRIBUDAYA-2026.pdf",
      size: "25 MB",
      path: "/assets/SRIBUDAYA-2026.pdf",
      coverage: "10 Halaman Lengkap",
      desc: "Paket eksklusif All-In Sribudaya Resort (300 s/d 2.000 Pax) include biaya sewa venue dan menginap di resort.",
    },
    {
      title: "Vandys Event Package 2026",
      filename: "VANDYS-EVENT-PACKAGE.pdf",
      size: "4 MB",
      path: "/assets/VANDYS-EVENT-PACKAGE.pdf",
      coverage: "1 Halaman Executive",
      desc: "Paket intimate garden 500 pax include sewa tempat @vandysgarden, photobooth @bp.projectbooth, dan hand bouquet @hs_floralstudio.",
    },
  ];

  const typographyAssets = [
    {
      name: "The Seasons Light & Light Italic",
      format: "WOFF2 & TTF",
      weight: "300",
      usage: "Subheadings, accents & italic citations",
    },
    {
      name: "The Seasons Regular & Italic",
      format: "WOFF2 & TTF",
      weight: "400",
      usage: "Primary serif editorial headings & quote cards",
    },
    {
      name: "The Seasons Bold & Bold Italic",
      format: "WOFF2 & TTF",
      weight: "700",
      usage: "Major display titles, hero titles & section anchors",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Pusat Aset Digital & Dokumen Unduhan
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Media & E-Catalog PDF Repository
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Manajemen berkas digital resmi, e-catalog pernikahan, dan tipografi lokal 'The Seasons'.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-taupe/30 text-xs font-medium text-warm-taupe">
          <HardDrive className="w-3.5 h-3.5 text-forest-green" />
          <span>Local Storage: public/assets/</span>
        </div>
      </div>

      {/* Official 4 PDFs Section */}
      <div>
        <h3 className="font-serif text-2xl text-black font-medium mb-4">
          4 Berkas E-Catalog Resmi ByDaisy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pdfCatalogs.map((pdf, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-forest-green bg-forest-green/10 px-2.5 py-0.5 rounded">
                    {pdf.size}
                  </span>
                  <span className="text-xs text-warm-taupe font-medium">
                    {pdf.coverage}
                  </span>
                </div>

                <h4 className="font-serif text-xl font-semibold text-black mb-1">
                  {pdf.title}
                </h4>

                <code className="text-[11px] font-mono text-brown bg-sand px-2 py-0.5 rounded block mb-3 truncate">
                  {pdf.filename}
                </code>

                <p className="text-xs text-black/75 font-light leading-relaxed mb-4">
                  {pdf.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-taupe/20 flex items-center justify-between gap-3">
                <a
                  href={pdf.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </a>

                <a
                  href={pdf.path}
                  download={pdf.filename}
                  className="px-4 py-1.5 rounded-lg bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Assets Section */}
      <div className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-forest-green" />
          <h3 className="font-serif text-xl text-black font-semibold">
            Tipografi Lokal: 'The Seasons' (public/assets/fonts/)
          </h3>
        </div>

        <p className="text-xs text-black/70 font-light mb-4">
          Font primer editorial serif berlisensi yang dimuat langsung ke aplikasi melalui Next.js localFont:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {typographyAssets.map((f, fIdx) => (
            <div
              key={fIdx}
              className="p-4 rounded-xl bg-[#F8F6F1] border border-taupe/20 text-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <strong className="text-black font-semibold">{f.name}</strong>
                <span className="text-[10px] text-forest-green font-bold">
                  Weight {f.weight}
                </span>
              </div>
              <span className="text-[11px] text-warm-taupe block mb-2">
                Format: {f.format}
              </span>
              <p className="text-[11px] text-black/70 font-light">
                {f.usage}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
