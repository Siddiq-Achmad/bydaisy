"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
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
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Line & Character Reveal (Split Animation)
      const letters = headlineRef.current?.querySelectorAll(".split-char");
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.2 }
        );
      }

      if (letters && letters.length > 0) {
        tl.fromTo(
          letters,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.02,
            ease: "power3.out",
          },
          "-=0.6"
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "-=0.7"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      }

      // 2. Smooth scale-down parallax on hero image scrub
      if (imageWrapperRef.current && imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.25, yPercent: 0 },
          {
            scale: 1.0,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
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
      className="relative pt-6 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-canvas"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Editorial Copy Column (Left) */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 z-10">
            {/* Tagline Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-3 mb-6 opacity-0"
            >
              <span className="w-8 h-px bg-warm-taupe"></span>
              <p className="font-serif italic text-base md:text-lg text-brown tracking-wide flex items-center gap-2">
                <span>You Dream It, We Creat It!</span>
                <Sparkles className="w-3.5 h-3.5 text-warm-taupe" />
              </p>
            </div>

            {/* Headline with GSAP SplitText Stagger */}
            <h1
              ref={headlineRef}
              className="font-serif font-light text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.08] text-black mb-8 font-editorial tracking-tight"
            >
              <div className="block">
                {renderSplitCharacters("Turning Your")}
              </div>
              <div className="block italic font-normal text-forest-green">
                {renderSplitCharacters("Special Moments")}
              </div>
              <div className="block">
                {renderSplitCharacters("Into Beautiful Stories")}
              </div>
            </h1>

            {/* Indonesian Luxury Narrative */}
            <p
              ref={subtitleRef}
              className="text-black/75 text-base md:text-lg max-w-xl font-light leading-relaxed mb-10 opacity-0"
            >
              Kami hadir untuk mewujudkan hari istimewa Anda dengan perencanaan
              yang matang, detail yang sempurna, dan tim kurasi wedding yang
              berpengalaman sejak 2019.
            </p>

            {/* CTA Group */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-6 opacity-0"
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
            <div className="flex items-center gap-3 mt-14 opacity-60">
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

          {/* Hero Image Column (Right) with Scale-down Parallax */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Delicate Wireframe Accent */}
              <div className="absolute -inset-3 md:-inset-4 rounded-3xl border border-taupe/35 -rotate-1 pointer-events-none transition-transform duration-700 hover:rotate-0"></div>

              {/* Main Image Frame Container */}
              <div
                ref={imageWrapperRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-sand aspect-[16/10] lg:aspect-[4/3]"
              >
                <div
                  ref={imageInnerRef}
                  className="relative w-full h-full will-change-transform"
                >
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGR-_Yy3nyolLeAmN8IFk8U2z4kIWWCYIDW57MQV6lnuFWJKPvnw_Wsr_Apa99QZKpN5rqopIsj-zKkX4oHXz63oqT65pOHEgn35oRPSw7OVWaVIdPec18yzYJSIUr_bCwQ1F-GnK6gcsIhI7Sqc_QEIWAeGmBz7Ba1Ke_MFjlHz68pmjSHGdEmu2UpN9e20BmavYtFO1DpXiShH-zshS3_3P7H6hICALldAEE_h2hEJJiCEwCfoipKoi59hxY6ZVBq_A"
                    alt="Bride and Groom holding hands with wedding rings, luxury wedding editorial"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Floating Editorial Card */}
              <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-6 bg-canvas/95 backdrop-blur-md border border-taupe/50 p-4 md:p-5 rounded-xl shadow-lg hidden sm:block max-w-xs transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-forest-green"></span>
                  <span className="font-serif italic text-xs tracking-wider text-brown">
                    Curated Romance
                  </span>
                </div>
                <p className="font-serif text-sm text-black italic">
                  &ldquo;Every detail crafted with emotion, precision, and legacy.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
