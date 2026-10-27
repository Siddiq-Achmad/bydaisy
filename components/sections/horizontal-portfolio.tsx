"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";
import realWeddingsData from "@/data/real-weddings.json";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalPortfolioProps {
  onOpenConsultation?: () => void;
}

export function HorizontalPortfolio({
  onOpenConsultation,
}: HorizontalPortfolioProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const weddings = realWeddingsData.slice(0, 4).map((w) => ({
    couple: w.couple,
    theme: w.categoryLabel || w.category,
    date: w.date,
    venue: w.venue,
    description: w.story,
    service: w.service,
    image: w.image,
  }));

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        prefersReduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, prefersReduced } = context.conditions as {
          isDesktop: boolean;
          prefersReduced: boolean;
        };

        if (isDesktop && !prefersReduced) {
          const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

          gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${track.scrollWidth - window.innerWidth}`,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="portfolio"
      className="relative overflow-x-auto md:overflow-hidden bg-canvas min-h-screen flex items-center border-t border-taupe/30"
    >
      <div
        ref={trackRef}
        className="flex flex-nowrap items-center h-auto py-12 md:py-0 md:h-screen px-6 sm:px-8 md:px-16 gap-6 md:gap-14 will-change-transform"
      >
        {/* Intro Card */}
        <div className="w-[320px] md:w-[420px] shrink-0 flex flex-col justify-center pr-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-warm-taupe" />
            <span className="text-xs uppercase tracking-widest text-brown font-medium">
              Real Moments, Real Stories
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black tracking-tight font-editorial mb-6 leading-[1.12] font-light">
            Recent Weddings <br />
            <span className="italic font-light text-forest-green">ByDaisy</span>
          </h2>

          <p className="text-sm md:text-base text-black/75 font-light leading-relaxed mb-6">
            Setiap perayaan memiliki jiwa dan keanggunan tersendiri. Telusuri
            arsip pernikahan nyata yang kami kurasi dengan dedikasi penuh.
          </p>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 mb-8 text-xs uppercase tracking-widest font-semibold text-forest-green hover:text-black transition-colors"
          >
            <span>Buka Arsip Real Weddings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-warm-taupe">
            <span>Scroll Horisontal</span>
            <span className="font-sans text-forest-green">→</span>
          </div>
        </div>

        {/* Wedding Showcase Cards */}
        {weddings.map((item, index) => (
          <article
            key={index}
            className="w-[340px] sm:w-[440px] md:w-[500px] shrink-0 rounded-3xl overflow-hidden bg-sand border border-taupe/40 shadow-xl flex flex-col group transition-all duration-300 hover:shadow-2xl"
          >
            {/* Visual Header */}
            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              <Image
                src={item.image}
                alt={`${item.couple} wedding showcase`}
                fill
                sizes="(max-width: 768px) 340px, 500px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />

              {/* Tag */}
              <div className="absolute top-4 right-4">
                <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-canvas text-[11px] font-medium tracking-widest uppercase border border-white/20">
                  {item.theme}
                </span>
              </div>
            </div>

            {/* Editorial Bottom Container */}
            <div className="p-7 md:p-8 bg-gradient-to-b from-brown to-[#593f2f] text-canvas flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-canvas mb-3 leading-snug">
                  {item.couple}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs tracking-wider uppercase text-light-taupe/90 mb-4 font-light">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-taupe" />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-taupe" />
                    {item.venue}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-canvas/80 font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/20 flex justify-between items-center text-xs">
                <span className="italic font-serif text-sm text-taupe">
                  {item.service}
                </span>
                <Link
                  href="/portfolio"
                  data-cursor="View"
                  className="inline-flex items-center gap-1.5 font-medium tracking-wider uppercase text-canvas hover:text-white transition-colors group/link"
                >
                  <span>Kisah Lengkap & Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {/* Final Outro Card */}
        <div className="w-[300px] md:w-[380px] shrink-0 p-8 rounded-3xl bg-forest-green text-canvas border border-forest-green/50 shadow-xl flex flex-col justify-between h-[480px]">
          <div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6 text-canvas">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase tracking-widest text-taupe font-medium block mb-2">
              Your Story Begins Here
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light mb-4 leading-snug">
              Ingin Hari Bahagia Anda Terekam Sempurna?
            </h3>
            <p className="text-xs md:text-sm text-canvas/80 font-light leading-relaxed">
              Jadwalkan sesi konsultasi eksklusif bersama lead planner ByDaisy
              untuk membedah konsep dan venue impian Anda.
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={onOpenConsultation}
              data-cursor="Connect"
              className="w-full py-3.5 rounded-full bg-canvas text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Reservasi Tanggal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/gallery"
              className="w-full py-3 rounded-full border border-canvas/40 text-canvas text-xs uppercase tracking-widest font-semibold hover:bg-canvas/10 transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Jelajahi Seluruh Galeri</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalPortfolio;
