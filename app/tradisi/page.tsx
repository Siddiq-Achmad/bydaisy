"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";
import { Sparkles, ArrowRight, BookOpen, ShieldCheck, Heart } from "lucide-react";

export default function TradisiPage() {
  const [activeTab, setActiveTab] = useState("aceh");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const traditions = {
    aceh: {
      name: "Adat Aceh Darussalam",
      subtitle: "Tanah Rencong Heritage",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAd0UonsKIK4GfW15TLghzmCZum-RKwcMbDtk3VUp_uNn3arEmERRzLRH2YC5KKVfUpaaJm9kvHa6pPFrM04SaEtEPwWZNr9tT0BQfaNMB55s-9UZWIXBUgGwITzL9RLiQaw_KLHrLpKOWiOttgOflGZ74-rPgE8FkY63uuEGYCrlbYg7c95c0Qr8N3_r000qDp8iznSf4vm14OkehR6i0g4ARRSeIgP-QRFjDR0nJJTdiHWw_nsnHPcA",
      philosophy:
        "Adat perkawinan Aceh menggabungkan hukum syariat Islam dengan kearifan lokal Reusam Adat. Setiap simpul upacara—dari ketukan sirih hingga butiran beras kuning peusijeuk—adalah perwujudan doa keselamatan batin, martabat keluarga, dan pengukuhan ikatan persaudaraan dua kubu besar.",
      rituals: [
        {
          name: "Peusijeuk (Tepung Tawar)",
          desc: "Ritual sakral percikan air sejuk berdaun dingin dan beras kuning sebagai permohonan keselamatan batin dan tolak bala.",
        },
        {
          name: "Ba Ranub (Hantaran Sirih)",
          desc: "Pemberian sirih tersusun rapi berbalut sulaman kasab benang emas sebagai perintis tali silaturahmi dua keluarga.",
        },
        {
          name: "Seumano Pucok",
          desc: "Penyucian lahir batin calon dara baro (pengantin wanita) diiringi lantunan zikir dan munajat doa restu orang tua.",
        },
        {
          name: "Tueng Linto (Penyambutan Mempelai Pria)",
          desc: "Perarakan resmi mempelai pria ke pelaminan adat dengan naungan payung kuning kebesaran dan taburan beras kunyit.",
        },
      ],
    },
    melayu: {
      name: "Adat Melayu Deli & Riau",
      subtitle: "Kesultanan Melayu Bertuah",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCDHreFUqke_cfkeHmVpPzp4ZDB2KI9pnZPscOjBaL9obZxDm6_PYtWLOIpYS4bxqDvXFf8xGftIZWGS0cg2mEa8qlZtIcGb0unDA7P-uvb01FnCrLot5tSu69ZyOjRwUAu40mQmYXOk2MqCkyAeOjAkSdXhQZE6tcAg7kD1W6CV3VrQjImZQCMoUSUcYGSLmCkvhFxnKH7XD0iNO2CqqUrhVjaNCvtFX0uHUbxIFHkLXE-mzfNb1xrbg",
      philosophy:
        "Masyarakat Melayu memuliakan adab dalam setiap tutur kata dan langkah. ByDaisy mengorganisir kehadiran penari tepak sirih, sastrawan pembalas pantun berbobot, hingga piranti Tepuk Tepung Tawar yang tersusun rapi sesuai urutan kekerabatan keluarga istana.",
      rituals: [
        {
          name: "Tepuk Tepung Tawar",
          desc: "Menepuk telapak tangan mempelai dengan air mawar dan dedaunan dingin sebagai simbol doa berkah kebahagiaan.",
        },
        {
          name: "Malam Berinai Lebat",
          desc: "Pewarnaan daun inai merah pekat pada kuku pengantin sebagai simbol mahligai rumah tangga yang bersinar terang.",
        },
        {
          name: "Mandi Taman",
          desc: "Pembersihan raga dan aura calon permaisuri di bawah rimbun dedaunan harum dan wewangian melati alami.",
        },
        {
          name: "Buka Pintu & Balas Pantun",
          desc: "Dialog puitis sastra Melayu berbalut canda santun antara rombongan pengantin pria dan penjaga pintu pengantin wanita.",
        },
      ],
    },
    minang: {
      name: "Adat Minangkabau",
      subtitle: "Gadang Basasok Matrilineal",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxUgKi6Q5xQVkwW7jPIpz6qyC9rBNHmXWqc1KHkIDiTomoMO8XkhcNWesdzbqaXqdNl9v1jf2-9nTdTVpgQhKZtlLoVabeIoGJ_rImOS8ifCQ3sc33YKjgDCS9SRd5UdD51P58T2cTfFW-S8stgb7Hl8qn2RCVpQNpVhZfG6afI35G2iz3rGuP1rZPHudFwyFPJRsaO-ULEcHzLMJ_81NGvFti88drFkj1Bh0mFKYwlLkZLamedv1LhtJCthhi9OJOoM",
      philosophy:
        "Garis keturunan ibu (matrilineal) yang luhur melahirkan upacara adat yang kaya akan simbol penghormatan dan kemandirian. Dari sunting emas bertingkat sebelas hingga jamba lauk pauk adat, ByDaisy memastikan seluruh urutan tetua adat terpenuhi.",
      rituals: [
        {
          name: "Maresek & Batimbang Tando",
          desc: "Penjajakan resmi pihak keluarga wanita diikuti pertukaran tanda pusaka keris atau kain songket berharga.",
        },
        {
          name: "Malam Bainai",
          desc: "Malam terakhir masa lajang sang anak daro, diwarnai tumpahan kasih sayang air perasan inai oleh para sesepuh.",
        },
        {
          name: "Manjapuik Marapulai",
          desc: "Penjemputan terhormat mempelai pria oleh mamak keluarga wanita dengan arak-arakan payung kuning kebesaran.",
        },
        {
          name: "Suntiang & Kirab Bansi",
          desc: "Pemasangan hiasan kepala mahkota suntiang megah berpadu iringan tiupan bansi dan talempong sakral.",
        },
      ],
    },
  };

  const current = traditions[activeTab as keyof typeof traditions];

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
            <span className="text-black font-medium">Panduan Tradisi & Budaya Adat</span>
          </nav>

          {/* Intro */}
          <div className="max-w-4xl mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-warm-taupe" />
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">
                Heritage, Sacred Rituals & Matrimonial Protocol
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.08] mb-6 font-editorial">
              Menjaga Kemuliaan Adat Leluhur <br />
              <span className="italic font-normal text-forest-green">
                dalam Balutan Keanggunan Masa Kini
              </span>
            </h1>

            <p className="text-base md:text-lg text-black/75 font-light leading-relaxed max-w-3xl">
              ByDaisy memahami bahwa pernikahan adat bukan sekadar seremonial
              visual, melainkan doa, restu orang tua, dan filosofi sakral yang
              diwariskan turun-temurun. Kami mengawal setiap detail tata krama
              prosesi tanpa mengurangi esensi luhur dan kenyamanan modern.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            {[
              { id: "aceh", label: "Adat Aceh Darussalam" },
              { id: "melayu", label: "Adat Melayu Deli & Riau" },
              { id: "minang", label: "Adat Minangkabau" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow-sm ${
                  activeTab === tab.id
                    ? "bg-forest-green text-canvas"
                    : "bg-sand text-black/80 hover:bg-taupe/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tradition Detail Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
            {/* Visual Frame */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[440px] shadow-2xl bg-sand border border-taupe/40">
              <Image
                src={current.image}
                alt={current.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-canvas">
                <span className="text-[10px] uppercase tracking-widest text-light-taupe">
                  {current.subtitle}
                </span>
                <h3 className="font-serif text-3xl text-canvas mt-1">
                  {current.name}
                </h3>
              </div>
            </div>

            {/* Content & Rituals Grid */}
            <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-sand/60 border border-taupe/35 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-forest-green" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-brown">
                    Filosofi & Nilai Luhur
                  </span>
                </div>

                <p className="text-sm md:text-base text-black/80 font-light leading-relaxed mb-8">
                  {current.philosophy}
                </p>

                <h4 className="text-xs uppercase tracking-wider font-semibold text-black mb-4">
                  Tahapan Prosesi Sakral yang Dampingi ByDaisy:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {current.rituals.map((r, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-5 rounded-2xl bg-canvas border border-taupe/30 shadow-sm"
                    >
                      <h5 className="font-serif text-lg font-medium text-black mb-1.5">
                        {r.name}
                      </h5>
                      <p className="text-xs text-black/70 font-light leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-taupe/30 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-warm-taupe">
                  Didampingi Master Adat Bersertifikasi ByDaisy
                </span>

                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-black text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-green transition-colors flex items-center gap-2"
                >
                  <span>Konsultasi Adat Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Protocol Box */}
          <div className="p-8 sm:p-14 rounded-3xl bg-forest-green text-canvas text-center max-w-4xl mx-auto shadow-xl">
            <h3 className="font-serif text-3xl md:text-4xl font-light mb-3">
              Perpaduan Tradisi & Modernitas yang Sempurna
            </h3>
            <p className="text-xs sm:text-sm text-canvas/80 max-w-xl mx-auto font-light leading-relaxed mb-8">
              Punya konsep adat campuran (misal: Akad Adat Aceh & Resepsi
              International Ballroom)? Tim show director ByDaisy ahli dalam
              merajut alur acara tanpa tumpang tindih.
            </p>
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="px-8 py-3.5 rounded-full bg-canvas text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-md"
            >
              Diskusikan Konsep Perkawinan Campuran
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <ConsultationSheet
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultService="Koordinator Adat Khusus"
      />
    </div>
  );
}
