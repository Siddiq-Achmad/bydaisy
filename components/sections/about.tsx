"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ShieldCheck, Award, Users } from "lucide-react";

export function AboutSection() {
  const metrics = [
    { value: "500+", label: "Pasangan Bahagia", icon: Users },
    { value: "100%", label: "Curated Vendor", icon: ShieldCheck },
    { value: "7+ Thn", label: "Pengalaman", icon: Award },
    { value: "14+", label: "Crew On-Site", icon: Users },
  ];

  return (
    <section id="about" className="py-24 md:py-36 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-warm-taupe"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-brown">
              About ByDaisy / Est. 2019
            </span>
            <span className="w-8 h-px bg-warm-taupe"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-black tracking-tight font-editorial">
            You Dream It, We Creat It!
          </h2>
        </div>

        {/* Narrative & Photography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visual Staging Collages */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Featured Team Showcase */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-taupe/40 bg-sand">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsQv3i5MtgyYEnPAqCac0AXFtJJlDDIEhkOflDlbG3LF5x_ghU6IzieSymSgS31C5uj9Y4PnqMTyYz85uY1KdIC2oYp6FDnK-agZtdv4P3CuYRvKzXLL0WoJtMMwC1_wqU7XF_yWokXEhUQMqKamBKv408oRPS0QlAbbEtean0WCVLdV06atwN_sdJhYHYPjAMI1nZJQI3R4avfpfw34StMshW6LzUzMNluIkj56dXpDdjh3ZPF-eqPZZ7mW-O-J14HTA"
                  alt="ByDaisy certified wedding organizer team with ceremonial backdrop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-4 bg-canvas flex justify-between items-center text-xs text-warm-taupe border-t border-taupe/20">
                <span className="font-serif italic font-medium text-black">
                  ByDaisy Certified On-Site Crew
                </span>
                <span className="tracking-widest uppercase text-[10px]">
                  Est. 2019 • Banda Aceh
                </span>
              </div>
            </div>

            {/* Secondary Two-Column Sub-Photos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-sm border border-taupe/30 bg-sand">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW7Qa7rYhNXqPS-rMSZK4tatUhdYASv0focjP-Uaae3kN4yvJVPFDpqqBnwpvkh4P0PswkaiKAUGyJNLk-sZ_W-RbwvILhqnuihsEFpwD_EnW2HnmDI25Wb_Ad3UjvHzo-52RfUuLvrKpT54fOtx6McsYKcWU26B2CCYjdyagpLMZbHn-jrV7EVDmFxODt3XMt4Gcc1Y400U3OxMCj7w8BtM1c2t5TQHcAzKoG49JCYV8MWbMgHZrilA1S2tLKnyiSHaY"
                  alt="ByDaisy wedding coordinators in formal suits"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-sm border border-taupe/30 bg-sand">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlnGOGodgrVczDXpzM8nYkAzhsldxcRn-FmggBi2HBqKPimzDgUO_z8nuhIho6tjQAQyOJNbqLx-Vd9A8TU7cznk_cAb00LRPLHOyqn6s8Dp-lrMh5kYqnYzZq-FU-EgKceOZAwWfgBNXr9mShC9gG2azbYGnJuJ3Ijn1cJhhX77-vVQvu1h_-m3Fyen21bD-tnwNak-xjY8r4rW7xFojiiDitrE7kt92w9MiZulPcS_blnQXZsYBdKZT03On0LlpnDIo"
                  alt="Ceremonial stage setup and luxury hall decoration styled by ByDaisy"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story & Key Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-between pt-2">
            <div>
              <h3 className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-forest-green mb-6 font-normal leading-snug">
                Mewujudkan Pernikahan yang Terencana, Indah, dan Berkesan.
              </h3>

              <div className="space-y-5 text-black/80 font-light text-base md:text-lg leading-relaxed">
                <p>
                  Berdiri sejak 2019,{" "}
                  <strong className="font-semibold text-black">
                    ByDaisy Planner
                  </strong>{" "}
                  hadir untuk mendampingi calon pengantin melewati fase persiapan
                  pernikahan tanpa rasa cemas. Dengan tim wedding organizer yang
                  telah melalui pelatihan bersertifikasi serta dukungan ratusan
                  vendor profesional terkurasi, kami memastikan setiap momen
                  mengalir harmonis.
                </p>
                <p>
                  Kami memadukan sensibilitas estetika editorial kontemporer
                  dengan protokol manajemen operasional yang presisi. Mulai dari
                  simulasi teknis, gladi resik keluarga, hingga pengawalan hari-H
                  menit demi menit.
                </p>
              </div>

              {/* Metric Counter Block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 my-8 border-y border-taupe/30 text-center">
                {metrics.map((m, idx) => (
                  <div key={idx} className="p-2">
                    <div className="font-serif text-3xl md:text-4xl font-normal text-black">
                      {m.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-warm-taupe mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Location Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-sand/80 border border-taupe/35 gap-4">
                <div>
                  <h4 className="font-serif text-lg font-medium text-black flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-forest-green" />
                    <span>Studio & Headquarter</span>
                  </h4>
                  <p className="text-xs text-warm-taupe tracking-wide mt-1">
                    Jl. Batee Suasa, Lambhuk, Banda Aceh • Melayani Seluruh Aceh & Nusantara
                  </p>
                </div>
                <a
                  href="/assets/ByDaisy-Company-Profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-forest-green text-white text-[11px] uppercase tracking-wider font-semibold hover:bg-black transition-colors shrink-0 text-center"
                >
                  Company Profile (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
