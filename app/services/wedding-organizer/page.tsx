"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import {
  Check,
  Clock,
  Users,
  ShieldCheck,
  ArrowRight,
  Radio,
  Sparkles,
  Layers,
  Heart,
  Calendar,
  MessageCircle,
} from "lucide-react";

export default function WeddingOrganizerDetailPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const crewRoles = [
    {
      role: "Show Director (1 Orang)",
      tag: "Pimpinan Acara",
      desc: "Memimpin eksekusi rundown menit per menit, memandu alur panggung, sinkronisasi band/musik, lighting beam, dan pemandu acara (MC).",
      icon: Radio,
    },
    {
      role: "Stage Manager (1 Orang)",
      tag: "Pengatur Panggung",
      desc: "Mengatur sirkulasi naik-turun pelaminan, memandu giliran foto bersama keluarga besar, dan menjaga etiket panggung kehormatan.",
      icon: Layers,
    },
    {
      role: "Personal Assistant Mempelai (2 Orang)",
      tag: "Pendamping Intim",
      desc: "Standby 1-on-1 mendampingi dara baro dan linto baro untuk kerapian busana, sentuhan touch-up, hidrasi, dan kenyamanan tanpa cemas.",
      icon: Heart,
    },
    {
      role: "LO Keluarga Inti (2 Orang)",
      tag: "Protokoler Orang Tua",
      desc: "Mendampingi kedua pasang orang tua pengantin, memastikan konsumsi VIP tersaji, dan mengawal ke area pelaminan tepat waktu.",
      icon: Users,
    },
    {
      role: "Catering & F&B Inspector (2 Orang)",
      tag: "Kualitas Jamuan",
      desc: "Memantau kelancaran buffet, pengisian ulang pondokan live cooking, ketersediaan piring bersih, dan higienitas pramusaji.",
      icon: ShieldCheck,
    },
    {
      role: "Meja Tamu & Kotak Angpao (2 Orang)",
      tag: "Keamanan Tamu",
      desc: "Mengawal alur registrasi digital/manual, distribusi souvenir eksklusif, serta pengawasan ketat kotak amplop hingga penyegelan resmi.",
      icon: ShieldCheck,
    },
    {
      role: "VIP Protocol Escort (2 Orang)",
      tag: "Pengawalan Pejabat",
      desc: "Menyambut kedatangan tamu kehormatan, pejabat pemerintahan, tokoh adat, dan mengarahkan langsung ke meja jamuan VIP.",
      icon: Sparkles,
    },
    {
      role: "Runner & Handover Logistik (2 Orang)",
      tag: "Penyelesaian Tuntas",
      desc: "Mengelola arus logistik hantaran seserahan, serah terima kado pengantin, dan inventarisasi barang keluarga pasca-resepsi.",
      icon: Clock,
    },
  ];

  const milestones = [
    {
      timing: "H-14 Sebelum Acara",
      title: "Technical Meeting (TM) Akbar",
      desc: "Mempertemukan seluruh vendor (dekorasi, katering, foto/video, MUA, venue, sound) dan panitia keluarga inti untuk membedah rundown teknis, denah tata letak, dan emergency backup plan.",
    },
    {
      timing: "H-7 Sebelum Acara",
      title: "Finalisasi Buku Panduan & Waktu",
      desc: "Penerbitan Buku Panduan Pernikahan resmi ByDaisy berisi jadwal per menit, kontak darurat seluruh vendor, matriks peran kru, dan daftar rombongan foto keluarga.",
    },
    {
      timing: "H-1 Sebelum Acara",
      title: "Gladi Resik (Rehearsal) On-Site",
      desc: "Simulasi alur kirab pengantin, uji coba sound system & lighting, pengecekan panggung pelaminan, serta koordinasi teknis bersama pihak gedung/venue.",
    },
    {
      timing: "Hari H (D-Day)",
      title: "Eksekusi Menit per Menit & Handover",
      desc: "Kru standby 4 jam sebelum acara dimulai hingga tuntas, mengawal akad nikah dan resepsi pesta dengan ketenangan penuh sampai serah terima kado.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-canvas text-black">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="pt-8 pb-24 md:pt-14 md:pb-32">
        {/* Top Breadcrumb & Hero */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-taupe mb-4">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-black transition-colors">
              Layanan
            </Link>
            <span>/</span>
            <span className="text-black font-medium">Wedding Organizer (WO)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-warm-taupe" />
                <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                  D-Day Execution & Minute-by-Minute Timekeeping
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.12] mb-6 font-editorial font-light">
                Orkestrasi Hari H <br />
                <span className="italic font-light text-forest-green">
                  Tanpa Beban & Penuh Ketenangan
                </span>
              </h1>

              <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-2xl mb-8">
                Bagi calon pengantin yang telah memilih vendor secara mandiri namun
                menginginkan hari bahagia dieksekusi dengan presisi tinggi. Tim Wedding
                Organizer ByDaisy memastikan setiap detik prosesi berjalan tertib,
                elegan, dan selaras dengan harapan kedua keluarga besar.
              </p>

              {/* Pricing & Key Highlights Badge */}
              <div className="p-6 rounded-2xl bg-sand/70 border border-taupe/40 max-w-xl mb-8">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-taupe/25">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-warm-taupe block font-medium">
                      Investasi Layanan Resmi
                    </span>
                    <span className="font-serif text-3xl font-semibold text-black">
                      Rp 15.000.000
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-forest-green/10 text-forest-green text-xs font-semibold uppercase tracking-wider">
                      Standby Hari H Tuntas
                    </span>
                    <span className="text-[11px] text-warm-taupe block mt-1">
                      Include 8 - 14 Kru Lapangan
                    </span>
                  </div>
                </div>

                <div className="pt-4 grid grid-cols-2 gap-3 text-xs text-black/80 font-light">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-forest-green" />
                    <span>Technical Meeting Akbar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-forest-green" />
                    <span>Gladi Resik H-1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-forest-green" />
                    <span>Kru Berseragam & HT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-forest-green" />
                    <span>Handover Logistik Selesai</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-forest-green text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-hover transition-all shadow-md flex items-center gap-2"
                >
                  <span>Booking Tanggal Acara</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/6282277094277?text=Halo%20ByDaisy%20Planner,%20saya%20tertarik%20dengan%20Layanan%20Wedding%20Organizer%20Rp15jt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full border border-taupe/60 text-black text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-forest-green" />
                  <span>Chat WhatsApp Hotlline</span>
                </a>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl bg-sand border border-taupe/40 group">
                <Image
                  src="/assets/images/service-outdoor-ensemble.jpg"
                  alt="Tim profesional Wedding Organizer ByDaisy berseragam rapi"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-2xl text-canvas">
                  <span className="text-[10px] uppercase tracking-wider text-light-taupe block">
                    Formasi Kru Lapangan
                  </span>
                  <strong className="font-serif text-lg font-light block">
                    Eksekusi Tanpa Kompromi
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-sm border border-taupe/30 bg-sand">
                  <Image
                    src="/assets/images/service-briefing.jpg"
                    alt="Briefing pengantin wanita oleh koordinator ByDaisy"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-sm border border-taupe/30 bg-sand">
                  <Image
                    src="/assets/images/journal-coordination.jpg"
                    alt="Koordinasi walkie-talkie tim WO di balik panggung"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 14 Crew Formation Breakdown */}
        <section className="bg-sand/40 border-y border-taupe/30 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest font-semibold text-brown block mb-2">
                Struktur Komando Hari H
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-black font-editorial font-light mb-4">
                Formasi 14 Kru Lapangan
              </h2>
              <p className="text-sm md:text-base text-black/70 font-light leading-relaxed">
                Setiap kru ByDaisy memegang peran spesifik dengan walkie-talkie terenkripsi
                sehingga tidak ada tugas yang terlewat atau bertumpuk saat momen sakral berlangsung.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {crewRoles.map((c, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-canvas border border-taupe/35 shadow-xs flex flex-col justify-between hover:border-forest-green hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-forest-green/10 text-forest-green flex items-center justify-center">
                        <c.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-brown bg-sand px-2.5 py-0.5 rounded-full">
                        {c.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-black mb-2">
                      {c.role}
                    </h3>

                    <p className="text-xs text-black/75 font-light leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Milestones Journey */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-brown block mb-2">
              Timeline Kerja Menjelang Hari H
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-black font-editorial font-light mb-4">
              Tahapan Koordinasi Terstruktur
            </h2>
            <p className="text-sm md:text-base text-black/70 font-light leading-relaxed">
              Meskipun berfokus pada hari H, pendampingan teknis kami dimulai sejak dua
              pekan sebelumnya untuk memastikan kesiapan seluruh elemen pernikahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-sand/60 border border-taupe/35 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-forest-green uppercase tracking-wider block mb-2">
                    {m.timing}
                  </span>
                  <h3 className="font-serif text-2xl font-light text-black mb-3">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-taupe/20 text-xs text-warm-taupe flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5 text-forest-green" />
                  <span>SOP ByDaisy Planner</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="p-8 sm:p-14 rounded-3xl bg-forest-green text-canvas text-center shadow-xl">
            <span className="text-xs uppercase tracking-widest text-light-taupe block mb-3 font-semibold">
              Ketenangan Penuh di Hari Bahagia
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light mb-4">
              Percayakan Eksekusi Hari H Anda Pada Ahlinya
            </h3>
            <p className="text-xs sm:text-sm text-canvas/80 max-w-xl mx-auto font-light leading-relaxed mb-8">
              Pernikahan Anda hanya berlangsung sekali seumur hidup. Biarkan keluarga besar
              menikmati setiap detik jamuan tanpa beban kepanikan teknis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-canvas text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-md"
              >
                Reservasi Wedding Organizer
              </button>
              <Link
                href="/pricelist"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-canvas/60 text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-canvas hover:text-forest-green transition-all"
              >
                Bandingkan Paket Lainnya →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ConsultationSheet
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
