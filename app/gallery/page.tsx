"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import { Sparkles, ArrowRight, Heart } from "lucide-react";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const filters = [
    { id: "all", label: "Semua Galeri" },
    { id: "traditional", label: "Tradisi & Adat" },
    { id: "ballroom", label: "Modern Ballroom" },
    { id: "decor", label: "Pelaminan & Lighting" },
    { id: "team", label: "Tim & On-Site Crew" },
  ];

  const galleryItems = [
    {
      title: "Jihad & Nanda",
      category: "traditional",
      label: "Tradisi & Songket Emas",
      venue: "Asrama Haji, Medan",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxUgKi6Q5xQVkwW7jPIpz6qyC9rBNHmXWqc1KHkIDiTomoMO8XkhcNWesdzbqaXqdNl9v1jf2-9nTdTVpgQhKZtlLoVabeIoGJ_rImOS8ifCQ3sc33YKjgDCS9SRd5UdD51P58T2cTfFW-S8stgb7Hl8qn2RCVpQNpVhZfG6afI35G2iz3rGuP1rZPHudFwyFPJRsaO-ULEcHzLMJ_81NGvFti88drFkj1Bh0mFKYwlLkZLamedv1LhtJCthhi9OJOoM",
      aspect: "aspect-[3/4]",
    },
    {
      title: "Nazhira & Naufal",
      category: "traditional",
      label: "Cultural Heritage Ceremony",
      venue: "Sribudaya Convention",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBsQv3i5MtgyYEnPAqCac0AXFtJJlDDIEhkOflDlbG3LF5x_ghU6IzieSymSgS31C5uj9Y4PnqMTyYz85uY1KdIC2oYp6FDnK-agZtdv4P3CuYRvKzXLL0WoJtMMwC1_wqU7XF_yWokXEhUQMqKamBKv408oRPS0QlAbbEtean0WCVLdV06atwN_sdJhYHYPjAMI1nZJQI3R4avfpfw34StMshW6LzUzMNluIkj56dXpDdjh3ZPF-eqPZZ7mW-O-J14HTA",
      aspect: "aspect-[4/5]",
    },
    {
      title: "Jacky & Valerie",
      category: "ballroom",
      label: "International Luxury Ballroom",
      venue: "Hermes Grand Ballroom",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBTMpHvVFbmAYj3iCImbvSgCOGbpydMAbl87rIvWmkplWNW0g1-S_0efMJhIXMsQF3fYJ28B0o1-_1v5bpMY3lg4Eje99qP4rN7gAyJ4UreiSYo2T9zSoQH2n4WOrtLn4bpIxNFpavcHsT-5b-1uHLLSBrf1oP1W2_3Za-rqDC-VDyAyalWwXm-K5k8g_6OVGTIZ692xAtvWT8t_uaC9z8tK0-5kM2NygzECvxO1LrI0BZS4UF1cJ5StmF67Bea2DPkMp8",
      aspect: "aspect-[3/4]",
    },
    {
      title: "Botanical Stage & Gold Arch",
      category: "decor",
      label: "Pelaminan Kustom 18M",
      venue: "Grand City Hall",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBlnGOGodgrVczDXpzM8nYkAzhsldxcRn-FmggBi2HBqKPimzDgUO_z8nuhIho6tjQAQyOJNbqLx-Vd9A8TU7cznk_cAb00LRPLHOyqn6s8Dp-lrMh5kYqnYzZq-FU-EgKceOZAwWfgBNXr9mShC9gG2azbYGnJuJ3Ijn1cJhhX77-vVQvu1h_-m3Fyen21bD-tnwNak-xjY8r4rW7xFojiiDitrE7kt92w9MiZulPcS_blnQXZsYBdKZT03On0LlpnDIo",
      aspect: "aspect-[16/10]",
    },
    {
      title: "ByDaisy Crew Briefing",
      category: "team",
      label: "Gladi Resik & Timekeeping",
      venue: "On-Site Venue Inspection",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBW7Qa7rYhNXqPS-rMSZK4tatUhdYASv0focjP-Uaae3kN4yvJVPFDpqqBnwpvkh4P0PswkaiKAUGyJNLk-sZ_W-RbwvILhqnuihsEFpwD_EnW2HnmDI25Wb_Ad3UjvHzo-52RfUuLvrKpT54fOtx6McsYKcWU26B2CCYjdyagpLMZbHn-jrV7EVDmFxODt3XMt4Gcc1Y400U3OxMCj7w8BtM1c2t5TQHcAzKoG49JCYV8MWbMgHZrilA1S2tLKnyiSHaY",
      aspect: "aspect-[4/3]",
    },
    {
      title: "Sacred Ring Vows & Touch Up",
      category: "ballroom",
      label: "Romantic Editorial Hands",
      venue: "The Glass House",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGR-_Yy3nyolLeAmN8IFk8U2z4kIWWCYIDW57MQV6lnuFWJKPvnw_Wsr_Apa99QZKpN5rqopIsj-zKkX4oHXz63oqT65pOHEgn35oRPSw7OVWaVIdPec18yzYJSIUr_bCwQ1F-GnK6gcsIhI7Sqc_QEIWAeGmBz7Ba1Ke_MFjlHz68pmjSHGdEmu2UpN9e20BmavYtFO1DpXiShH-zshS3_3P7H6hICALldAEE_h2hEJJiCEwCfoipKoi59hxY6ZVBq_A",
      aspect: "aspect-[4/3]",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-canvas text-black">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="pt-8 pb-24 md:pt-14 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-taupe mb-4">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-black font-medium">Galeri & Portofolio</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-warm-taupe" />
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                Arsip Pernikahan Riil ByDaisy
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.08] mb-6 font-editorial">
              Galeri Dokumentasi & <br />
              <span className="italic font-normal text-forest-green">
                Kisah Nyata Pengantin
              </span>
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              Jelajahi momen-momen sakral yang diabadikan dengan keindahan
              sinematik, ragam dekorasi megah, dan kebersamaan hangat tim ByDaisy
              di berbagai ballroom ternama.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-14">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeFilter === f.id
                    ? "bg-forest-green text-canvas shadow-md"
                    : "bg-sand text-black/75 hover:bg-taupe/30"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry / Grid Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col rounded-3xl overflow-hidden bg-sand border border-taupe/40 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`relative ${item.aspect} overflow-hidden bg-sand`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-wider text-canvas font-medium">
                      {item.label}
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-canvas flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-black font-medium mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-warm-taupe tracking-wide">
                      {item.venue}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-taupe/20 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-brown font-semibold">
                      Curated ByDaisy
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsConsultationOpen(true)}
                      className="text-xs uppercase tracking-wider text-forest-green font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Contact Callout */}
          <div className="p-8 sm:p-14 rounded-3xl bg-sand/60 border border-taupe/35 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="font-serif text-3xl md:text-4xl text-black mb-3">
              Ingin Konsep Anda Ditampilkan di Sini?
            </h3>
            <p className="text-sm text-black/70 font-light max-w-xl mx-auto mb-8">
              Setiap kisah pernikahan adalah karya seni yang unik. Mari wujudkan
              perayaan impian Anda bersama ByDaisy Planner.
            </p>
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="px-8 py-3.5 rounded-full bg-forest-green text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-hover transition-all shadow-md"
            >
              Konsultasi Konsep Anda
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <ConsultationSheet
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
