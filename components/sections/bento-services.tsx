"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";

interface BentoCardProps {
  title: string;
  badge: string;
  badgeColor?: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
  onSelectService?: (title: string) => void;
}

function BentoCard({
  title,
  badge,
  badgeColor = "text-forest-green",
  href,
  description,
  imageSrc,
  imageAlt,
  features,
  onSelectService,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });

    // Subtle 3D Tilt calculation (clamped to +/- 7 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 5.5;
    const rotateX = -((y - centerY) / centerY) * 5.5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1.015)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-canvas border border-taupe/40 shadow-lg will-change-transform"
    >
      {/* Dynamic Mouse Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, rgba(46, 74, 59, 0.14), transparent 80%)`,
        }}
      />

      {/* Card Image Container */}
      <div className="relative h-64 overflow-hidden bg-sand">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Floating Pill Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-canvas/90 backdrop-blur-md shadow-sm border border-taupe/30 ${badgeColor}`}
          >
            {badge}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col justify-between bg-gradient-to-b from-canvas to-sand/60 relative z-20">
        <div>
          <h3 className="font-serif text-2xl md:text-3xl text-black mb-3 font-light leading-snug">
            {title}
          </h3>
          <p className="text-sm text-black/75 font-light leading-relaxed mb-6">
            {description}
          </p>

          <ul className="space-y-2.5 text-xs text-warm-taupe mb-8">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span className="text-black/80 font-normal">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          <Link
            href={href}
            data-cursor="Detail"
            className="flex-1 w-full py-3 px-4 rounded-full bg-forest-green text-canvas hover:bg-black text-[11px] uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm text-center group/btn"
          >
            <span>Detail Layanan</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          <button
            type="button"
            onClick={() => onSelectService && onSelectService(title)}
            className="w-full sm:w-auto px-4 py-3 rounded-full border border-taupe/60 text-[11px] uppercase tracking-widest font-semibold text-black hover:bg-sand transition-all text-center shrink-0"
          >
            <span>Konsultasi</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface BentoServicesProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

export function BentoServices({ onOpenConsultation }: BentoServicesProps) {
  const services = [
    {
      title: "Wedding Planner",
      badge: "3-9 Months Full Journey",
      badgeColor: "text-forest-green",
      href: "/services/wedding-planner",
      description:
        "Realisasikan konsep pernikahan impian Anda bersama kami. Pendampingan menyeluruh dari konsep awal, budgeting, moodboard tema, kurasi vendor, hingga simulasi teknis.",
      imageSrc:
        "/assets/images/img41.jpg",
      imageAlt: "ByDaisy Wedding Planner & Organizer Team in Blue Uniforms",
      features: [
        "Budget Optimization & Timeline Roadmap",
        "Curated Vendor Matching & Direct Negotiations",
        "Dedicated Lead Planner & 24/7 Advisory",
      ],
    },
    {
      title: "Wedding Organizer",
      badge: "D-Day Seamless Flow",
      badgeColor: "text-brown",
      href: "/services/wedding-organizer",
      description:
        "Memastikan setiap detail hari-H tersusun rapi dari gladi resik, rundown ketat menit per menit, hingga koordinasi tim keluarga dan seluruh vendor on-site.",
      imageSrc:
        "/assets/images/img42.jpg",
      imageAlt: "ByDaisy Event Organizer Team Ready in Formal Attire",
      features: [
        "8 - 14 Certified On-Site Crew with HTs",
        "Minute-by-minute Production Rundown",
        "VIP & Family Hospitality Protocol",
      ],
    },
    {
      title: "Decoration & Styling",
      badge: "Visual & Spatial Art",
      badgeColor: "text-forest-green",
      href: "/services/decoration-styling",
      description:
        "Dekorasi yang merefleksikan cerita cinta dan karakter Anda. Dari pelaminan songket adat berukir emas megah hingga modern botanical ballroom lighting.",
      imageSrc:
        "/assets/images/img43.jpg",
      imageAlt: "ByDaisy Luxury Wedding Stage and Lighting Decoration",
      features: [
        "3D Conceptual Spatial Rendering",
        "Custom Pelaminan, Foyer & Photobooth",
        "Heritage Adat & Modern Ambient Light",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="py-24 md:py-36 bg-sand/50 border-t border-taupe/30 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-warm-taupe" />
            <p className="font-serif italic text-base md:text-lg text-brown font-light">
              What We Offer
            </p>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-[1.12] mb-4 font-editorial font-light">
            Our Services
          </h2>
          <p className="text-black/75 text-base md:text-lg font-light leading-relaxed">
            Dari konsepsi awal hingga hari H berkesan, kami siap mendampingi
            setiap langkah perjalanan istimewa Anda.
          </p>
        </div>

        {/* 3-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <BentoCard
              key={index}
              {...service}
              onSelectService={onOpenConsultation}
            />
          ))}
        </div>

        {/* Section Action Button to All Services */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-black bg-black text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-forest-green hover:border-forest-green transition-all shadow-md group"
          >
            <span>Eksplorasi Seluruh Layanan & Perbandingan Paket</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BentoServices;
