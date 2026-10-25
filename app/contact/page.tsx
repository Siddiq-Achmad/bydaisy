"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { MessageCircle, MapPin, Mail, Phone, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    coupleNames: "",
    eventDate: "",
    venueLocation: "",
    guestCount: "300 - 500 Tamu",
    services: ["Wedding Planner"],
    waNumber: "",
    notes: "",
  });

  const toggleService = (srv: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(srv);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== srv)
          : [...prev.services, srv],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo ByDaisy Planner, saya ingin booking konsultasi pernikahan melalui website:
• Pasangan: ${formData.coupleNames || "-"}
• Perkiraan Tanggal: ${formData.eventDate || "-"}
• Lokasi / Venue: ${formData.venueLocation || "-"}
• Estimasi Tamu: ${formData.guestCount}
• Pilihan Layanan: ${formData.services.join(", ") || "-"}
• No. WhatsApp: ${formData.waNumber || "-"}
${formData.notes ? `• Catatan: ${formData.notes}` : ""}`;

    const url = `https://wa.me/6282277094277?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative min-h-screen bg-canvas text-black">
      <Navbar onOpenConsultation={() => {}} />

      <main className="pt-8 pb-24 md:pt-14 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-taupe mb-4">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-black font-medium">Kontak & Reservasi</span>
          </nav>

          {/* Header */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-warm-taupe" />
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                Private Consultation Concierge
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.08] mb-6 font-editorial">
              Hubungi ByDaisy & <br />
              <span className="italic font-normal text-forest-green">
                Jadwalkan Konsultasi
              </span>
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              Kami siap mendengarkan visi Anda, menjawab seluruh pertanyaan
              seputar ketersediaan tanggal, dan merumuskan konsep acara yang
              elegan.
            </p>
          </div>

          {/* Grid: Form (Left) & Studio Details (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-sand/70 border border-taupe/40 rounded-3xl p-8 sm:p-12 shadow-sm">
              <h2 className="font-serif text-2xl sm:text-3xl text-black mb-2 font-editorial">
                Formulir Reservasi Tanggal
              </h2>
              <p className="text-xs sm:text-sm text-black/70 font-light mb-8">
                Isi data di bawah ini, tim kami akan langsung mengarahkan Anda ke
                percakapan WhatsApp resmi ByDaisy Planner.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-2">
                    Nama Pasangan (Bride & Groom) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.coupleNames}
                    onChange={(e) =>
                      setFormData({ ...formData, coupleNames: e.target.value })
                    }
                    placeholder="cth: Jacky & Valerie"
                    className="w-full text-sm rounded-xl border border-taupe/60 bg-canvas px-4 py-3.5 text-black placeholder:text-taupe focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-2">
                      Perkiraan Tanggal Pernikahan *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) =>
                        setFormData({ ...formData, eventDate: e.target.value })
                      }
                      className="w-full text-sm rounded-xl border border-taupe/60 bg-canvas px-4 py-3.5 text-black focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-2">
                      Estimasi Jumlah Tamu
                    </label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) =>
                        setFormData({ ...formData, guestCount: e.target.value })
                      }
                      className="w-full text-sm rounded-xl border border-taupe/60 bg-canvas px-4 py-3.5 text-black focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                    >
                      <option value="Di bawah 300 Tamu">
                        &lt; 300 Tamu (Intimate)
                      </option>
                      <option value="300 - 500 Tamu">
                        300 – 500 Tamu (Medium)
                      </option>
                      <option value="500 - 1000 Tamu">
                        500 – 1.000 Tamu (Grand)
                      </option>
                      <option value="1000+ Tamu">
                        &gt; 1.000 Tamu (Megah / Multi-Sesi)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-2">
                    Lokasi / Venue Acara
                  </label>
                  <input
                    type="text"
                    value={formData.venueLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, venueLocation: e.target.value })
                    }
                    placeholder="cth: Hermes Ballroom / Asrama Haji / Luar Kota"
                    className="w-full text-sm rounded-xl border border-taupe/60 bg-canvas px-4 py-3.5 text-black placeholder:text-taupe focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-2">
                    Pilihan Layanan
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    {[
                      "Wedding Planner",
                      "Wedding Organizer",
                      "Decoration & Styling",
                      "All-In Package",
                    ].map((srv) => {
                      const isSelected = formData.services.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                            isSelected
                              ? "border-forest-green bg-forest-green/10 text-forest-green font-medium"
                              : "border-taupe/40 bg-canvas text-black/80 hover:border-taupe"
                          }`}
                        >
                          <span>{srv}</span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-2">
                    Nomor WhatsApp Anda *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.waNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, waNumber: e.target.value })
                    }
                    placeholder="cth: 0812-3456-7890"
                    className="w-full text-sm rounded-xl border border-taupe/60 bg-canvas px-4 py-3.5 text-black placeholder:text-taupe focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-2">
                    Catatan Konsep (Opsional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Ceritakan gambaran dekorasi, tradisi adat yang akan diangkat, atau preferensi khusus lainnya..."
                    className="w-full text-sm rounded-xl border border-taupe/60 bg-canvas px-4 py-3 text-black placeholder:text-taupe focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-forest-green hover:bg-forest-hover text-canvas text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Kirim Pesan Reservasi via WhatsApp</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Concierge Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-canvas border border-taupe/35 shadow-sm space-y-6">
                <div>
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-brown block mb-1">
                    Direct Contact
                  </span>
                  <h3 className="font-serif text-2xl text-black">
                    Official Concierge
                  </h3>
                </div>

                <div className="space-y-4 text-sm text-black/80 font-light">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="block font-medium text-black">
                        WhatsApp Hotlines:
                      </strong>
                      <div className="flex flex-col gap-1">
                        <a
                          href="https://wa.me/6282277094277"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-forest-green hover:underline flex items-center gap-1.5"
                        >
                          <span className="font-semibold text-black text-xs uppercase tracking-wider">Hotline 1:</span>
                          <span>+62 822-7709-4277</span>
                        </a>
                        <a
                          href="https://wa.me/6282162221468"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-forest-green hover:underline flex items-center gap-1.5"
                        >
                          <span className="font-semibold text-black text-xs uppercase tracking-wider">Hotline 2:</span>
                          <span>+62 821-6222-1468</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-medium text-black">
                        Studio & Headquarter:
                      </strong>
                      <span>
                        Jl. Batee Suasa, Lambhuk, Banda Aceh, Aceh • Melayani seluruh wilayah Aceh, Sumatera, dan Destinasi Nusantara
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-forest-green shrink-0 mt-0.5"
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
                    <div>
                      <strong className="block font-medium text-black">
                        Instagram Resmi:
                      </strong>
                      <a
                        href="https://instagram.com/bydaisyplanner"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-green hover:underline font-medium"
                      >
                        @bydaisyplanner
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-forest-green shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-medium text-black">
                        Email Inquiry:
                      </strong>
                      <span>concierge@bydaisy.com</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-taupe/20 space-y-2">
                    <a
                      href="/assets/ByDaisy-Company-Profile.pdf"
                      download="ByDaisy-Company-Profile.pdf"
                      className="w-full py-2.5 px-4 rounded-xl bg-forest-green/10 text-forest-green hover:bg-forest-green hover:text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-between shadow-sm"
                    >
                      <span>📄 Unduh Company Profile (PDF)</span>
                      <span>35 MB ↓</span>
                    </a>
                    <Link
                      href="/pricelist"
                      className="w-full py-2.5 px-4 rounded-xl bg-sand text-brown hover:bg-black hover:text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-between border border-taupe/30"
                    >
                      <span>✨ Lihat Paket All-In & Sribudaya</span>
                      <span>Lihat →</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Consultation Hours */}
              <div className="p-8 rounded-3xl bg-sand/60 border border-taupe/35 shadow-sm">
                <h4 className="font-serif text-xl font-medium text-black mb-3">
                  Jadwal Konsultasi & Layanan
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-black/75 font-light">
                  <p className="flex justify-between">
                    <span>Senin – Jumat:</span>
                    <span className="font-medium text-black">
                      09.00 – 18.00 WIB
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sabtu – Minggu:</span>
                    <span className="font-medium text-black">
                      Khusus On-Site Event & Appointment
                    </span>
                  </p>
                  <p className="pt-2 text-[11px] text-warm-taupe italic">
                    *Pertemuan tatap muka / survey venue dapat dijadwalkan
                    sebelumnya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
