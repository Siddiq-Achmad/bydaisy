"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export function HeroSection({ onOpenConsultation }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const letters = headlineRef.current?.querySelectorAll(".split-char");

      if (prefersReducedMotion) {
        if (badgeRef.current) gsap.set(badgeRef.current, { opacity: 1, y: 0 });
        if (letters && letters.length > 0) gsap.set(letters, { yPercent: 0, opacity: 1 });
        if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
        if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        if (cardRef.current) gsap.set(cardRef.current, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // 1. Text Line & Character Reveal (Snappy & Purposeful)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
        );
      }

      if (letters && letters.length > 0) {
        tl.fromTo(
          letters,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.015,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.5"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.45"
        );
      }

      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { opacity: 0, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );
      }

      // 2. Smooth Background Parallax Scrub with GSAP ScrollTrigger
      if (bgImageRef.current && sectionRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { yPercent: -6, scale: 1.05 },
          {
            yPercent: 8,
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.0,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split text helper to create character spans with overflow-hidden mask
  const renderSplitCharacters = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block overflow-hidden align-top"
      >
        <span className="split-char inline-block will-change-transform">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{ minHeight: "80svh" }}
      className="relative min-h-[80svh] w-full overflow-hidden flex items-center bg-canvas"
    >
      {/* 80 svh Parallax Background Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <div
          ref={bgImageRef}
          className="absolute -top-[15%] left-[25%] w-full h-[130%] will-change-transform"
        >
          <Image
            src="/assets/images/img28.jpg"
            alt="Bride and Groom holding hands with wedding rings, luxury wedding editorial"
            fill
            priority
            quality={92}
            sizes="80vw"
            className="object-cover object-[center_50%] lg:object-[right_center]"
          />
        </div>

        {/* Luxury Editorial Overlay Gradient */}
        {/* Desktop: clean canvas tone on the left, revealing the couple on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/95 via-45% to-canvas/20 lg:via-55% lg:to-transparent" />
        {/* Soft Mobile Tint for crystal-clear readability */}
        <div className="absolute inset-0 bg-canvas/75 md:bg-transparent" />
        {/* Bottom smooth fade into BrandMarquee */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Editorial Copy Column (Left) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-3 mb-6 opacity-0"
            >
              <span className="w-8 h-px bg-warm-taupe"></span>
              <p className="font-serif italic text-base md:text-lg text-brown tracking-wide flex items-center gap-2 font-light">
                <span>You Dream It, We Create It!</span>
                <Sparkles className="w-3.5 h-3.5 text-warm-taupe" />
              </p>
            </div>

            {/* Headline with GSAP SplitText Stagger */}
            <h1
              ref={headlineRef}
              className="font-serif font-light text-3xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.12] text-black mb-8 font-editorial tracking-tight"
            >
              <div className="block">
                {renderSplitCharacters("Turning Your")}
              </div>
              <div className="block font-light text-forest-green">
                {renderSplitCharacters("Special Moments")}
              </div>
              <div className="block">
                {renderSplitCharacters("Into Beautiful Stories")}
              </div>
            </h1>

            {/* Grounded & Authentic Matrimonial Narrative */}
            <p
              ref={subtitleRef}
              className="text-black/80 text-base md:text-lg max-w-xl font-light leading-relaxed mb-10 opacity-0"
            >
              Sejak 2019, ByDaisy mengawal pernikahan di Aceh dan Sumatra, merajut
              kehangatan tradisi keluarga dengan eksekusi panggung detik-ke-detik yang
              tenang dan teratur.
            </p>

            {/* CTA Group */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-5 sm:gap-6 opacity-0"
            >
              <button
                type="button"
                onClick={onOpenConsultation}
                data-cursor="Book"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-black bg-black text-canvas text-xs md:text-sm uppercase tracking-widest font-medium hover:bg-forest-green hover:border-forest-green transition-all duration-300 shadow-sm"
              >
                <span>Book Consultation</span>
              </button>

              <a
                href="#services"
                data-cursor="Explore"
                className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-black hover:text-forest-green transition-colors py-2"
              >
                <span>Explore Our Services</span>
                <ArrowDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-200" />
              </a>
            </div>

            {/* Subtle Signature Emblem Accent */}
            <div className="flex items-center gap-3 mt-12 opacity-70">
              <span className="text-[11px] uppercase tracking-[0.2em] text-warm-taupe">
                Signature Matrimonial Experience
              </span>
              <div className="flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-brown inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-warm-taupe inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-taupe inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-forest-green inline-block"></span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Editorial Card & Visual Staging */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end pt-30">
            {/* Floating Editorial Card linking to Reviews */}
            <Link
              href="/reviews"
              ref={cardRef as unknown as React.Ref<HTMLAnchorElement>}
              className="bg-canvas/92 backdrop-blur-md border border-taupe/45 p-6 rounded-2xl shadow-xl max-w-sm transition-transform duration-300 hover:-translate-y-1 opacity-0 block group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-forest-green"></span>
                <span className="font-serif text-xs tracking-wider text-brown font-light">
                  Curated Romance
                </span>
              </div>
              <p className="font-serif text-sm text-black italic font-light leading-relaxed mb-4">
                &ldquo;Every detail crafted with emotion, precision, and legacy.&rdquo;
              </p>
              <div className="pt-3 border-t border-taupe/25 flex items-center justify-between text-[11px] text-warm-taupe">
                <span>Banda Aceh • Est. 2019</span>
                <span className="font-medium text-forest-green group-hover:underline">4.98 ★★★★★</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
