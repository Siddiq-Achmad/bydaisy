"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalPortfolioProps {
  onOpenConsultation?: () => void;
}

export function HorizontalPortfolio({
  onOpenConsultation,
}: HorizontalPortfolioProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const weddings = [
    {
      couple: "Jihad & Nanda",
      theme: "Tradisi & Songket",
      date: "04 Oktober 2026",
      venue: "Asrama Haji, Medan",
      description:
        "Nuansa pelaminan tradisional dengan sentuhan floral pekat, tenunan songket berpadu ukiran emas nan megah.",
      service: "Planner & WO All-In",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxUgKi6Q5xQVkwW7jPIpz6qyC9rBNHmXWqc1KHkIDiTomoMO8XkhcNWesdzbqaXqdNl9v1jf2-9nTdTVpgQhKZtlLoVabeIoGJ_rImOS8ifCQ3sc33YKjgDCS9SRd5UdD51P58T2cTfFW-S8stgb7Hl8qn2RCVpQNpVhZfG6afI35G2iz3rGuP1rZPHudFwyFPJRsaO-ULEcHzLMJ_81NGvFti88drFkj1Bh0mFKYwlLkZLamedv1LhtJCthhi9OJOoM",
    },
    {
      couple: "Nazhira & Naufal",
      theme: "Cultural Heritage",
      date: "08 November 2025",
      venue: "Sribudaya Convention",
      description:
        "Keanggunan busana adat dipadukan susunan tata upacara sakral dan perayaan hangat bersama ribuan kerabat keluarga.",
      service: "Complete Royal Coordinator",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBsQv3i5MtgyYEnPAqCac0AXFtJJlDDIEhkOflDlbG3LF5x_ghU6IzieSymSgS31C5uj9Y4PnqMTyYz85uY1KdIC2oYp6FDnK-agZtdv4P3CuYRvKzXLL0WoJtMMwC1_wqU7XF_yWokXEhUQMqKamBKv408oRPS0QlAbbEtean0WCVLdV06atwN_sdJhYHYPjAMI1nZJQI3R4avfpfw34StMshW6LzUzMNluIkj56dXpDdjh3ZPF-eqPZZ7mW-O-J14HTA",
    },
    {
      couple: "Jacky & Valerie",
      theme: "Modern Ballroom",
      date: "03 Oktober 2025",
      venue: "Hermes Grand Ballroom",
      description:
        "Konsep international wedding megah berhias ribuan kristal chandelier, kabut atmosferik dan pencahayaan dramatis.",
      service: "On-Day Production & WO",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBTMpHvVFbmAYj3iCImbvSgCOGbpydMAbl87rIvWmkplWNW0g1-S_0efMJhIXMsQF3fYJ28B0o1-_1v5bpMY3lg4Eje99qP4rN7gAyJ4UreiSYo2T9zSoQH2n4WOrtLn4bpIxNFpavcHsT-5b-1uHLLSBrf1oP1W2_3Za-rqDC-VDyAyalWwXm-K5k8g_6OVGTIZ692xAtvWT8t_uaC9z8tK0-5kM2NygzECvxO1LrI0BZS4UF1cJ5StmF67Bea2DPkMp8",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Pinning & Horizontal translation scrub via GSAP ScrollTrigger
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
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

    return () => {
      tween.kill();
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="events"
      className="relative overflow-hidden bg-canvas min-h-screen flex items-center border-t border-taupe/30"
    >
      <div
        ref={trackRef}
        className="flex flex-nowrap items-center h-screen px-8 md:px-16 gap-8 md:gap-14 will-change-transform"
      >
        {/* Intro Card */}
        <div className="w-[320px] md:w-[420px] shrink-0 flex flex-col justify-center pr-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-warm-taupe" />
            <span className="text-xs uppercase tracking-widest text-brown font-medium">
              Real Moments, Real Stories
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl text-black tracking-tight font-editorial mb-6 leading-tight">
            Recent Weddings <br />
            <span className="italic font-normal text-forest-green">ByDaisy</span>
          </h2>

          <p className="text-sm md:text-base text-black/75 font-light leading-relaxed mb-8">
            Setiap perayaan memiliki jiwa dan keanggunan tersendiri. Telusuri
            arsip pernikahan nyata yang kami kurasi dengan dedikasi penuh.
          </p>

          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-warm-taupe">
            <span>Scroll Horisontal</span>
            <span className="animate-pulse">→</span>
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
                <h3 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-canvas mb-3">
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
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  data-cursor="View"
                  className="inline-flex items-center gap-1.5 font-medium tracking-wider uppercase text-canvas hover:text-white transition-colors"
                >
                  <span>Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
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
            <h3 className="font-serif text-3xl md:text-4xl font-light mb-4 leading-snug">
              Ingin Hari Bahagia Anda Terekam Sempurna?
            </h3>
            <p className="text-xs md:text-sm text-canvas/80 font-light leading-relaxed">
              Jadwalkan sesi konsultasi eksklusif bersama lead planner ByDaisy
              untuk membedah konsep dan venue impian Anda.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenConsultation}
            data-cursor="Connect"
            className="w-full py-3.5 rounded-full bg-canvas text-forest-green text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Reservasi Tanggal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HorizontalPortfolio;
