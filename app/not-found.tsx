import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-black flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-forest-green/5 blur-3xl pointer-events-none" />

      {/* Top Header Logo */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between z-10">
        <Link href="/" className="flex flex-col group">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl sm:text-3xl tracking-tight text-black group-hover:text-forest-green transition-colors font-semibold">
              ByDaisy
            </span>
            <div className="flex gap-1 items-center opacity-75">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-green inline-block"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-brown inline-block"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-warm-taupe inline-block"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-taupe inline-block"></span>
            </div>
          </div>
          <span className="font-serif text-[10px] tracking-widest text-warm-taupe -mt-0.5 uppercase">
            Wedding & Event Planner
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-warm-taupe hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </Link>
      </header>

      {/* Main 404 Hero */}
      <main className="max-w-3xl mx-auto text-center my-auto py-16 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-green/10 text-forest-green text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404 • Lost in Romance</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-black tracking-tight leading-none mb-6 font-light font-editorial">
          404
        </h1>

        <h2 className="font-serif text-2xl sm:text-3xl text-brown font-light mb-6">
          Halaman yang Anda Tuju Belum Terdaftar di Agenda
        </h2>

        <p className="text-sm sm:text-base text-black/70 max-w-lg mx-auto font-light leading-relaxed mb-10">
          Seperti perayaan sakral yang membutuhkan koordinasi matang, mungkin tautan yang Anda tuju telah dipindahkan atau mengalami perubahan rute.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full bg-forest-green text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-all shadow-md inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/services/wedding-planner"
            className="px-8 py-3.5 rounded-full border border-black/30 text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all inline-flex items-center gap-2"
          >
            <span>Detail Layanan</span>
          </Link>

          <a
            href="https://wa.me/6282277094277?text=Halo%20ByDaisy,%20saya%20membutuhkan%20bantuan%20navigasi%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full text-warm-taupe hover:text-forest-green text-xs uppercase tracking-widest font-semibold transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Bantuan Concierge</span>
          </a>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-warm-taupe pt-8 border-t border-taupe/20 z-10">
        <span className="mt-2 sm:mt-0">
          Hotline: +62 822-7709-4277 / +62 821-6222-1468 • Jl. Batee Suasa, Lambhuk, Banda Aceh
        </span>
      </footer>
    </div>
  );
}
