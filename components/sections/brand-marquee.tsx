"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BrandMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);

  const items = [
    "Perencanaan Pernikahan Personal",
    "Minute-By-Minute Coordination",
    "Luxury Floral & Scenic Decor",
    "Curated Vendor Network",
    "Banda Aceh & Beyond",
    "Tata Artistik Pelaminan Tradisi & Modern",
  ];

  // Repeat items 4 times to ensure an unbroken horizontal strip across all screen widths
  const marqueeItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      if (!containerRef.current || !scrollTrackRef.current || !tickerTrackRef.current) return;

      // 1. Continuous luxury ambient glide
      const loopTween = gsap.to(tickerTrackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 35,
        repeat: -1,
      });

      // 2. Scroll-motion scrub via GSAP ScrollTrigger
      gsap.fromTo(
        scrollTrackRef.current,
        { x: 100 },
        {
          x: -250,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // 3. Dynamic velocity boost: accelerate when scrolling actively
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const speedMultiplier = Math.min(1 + velocity / 300, 3.5);
          gsap.to(loopTween, {
            timeScale: self.direction === 1 ? speedMultiplier : -speedMultiplier,
            duration: 0.2,
            overwrite: "auto",
            onComplete: () => {
              gsap.to(loopTween, {
                timeScale: 1,
                duration: 0.8,
                ease: "power2.out",
              });
            },
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="border-y border-taupe/30 bg-sand/70 py-4.5 overflow-hidden select-none relative backdrop-blur-xs"
    >
      {/* Outer track: scrubbed by scroll motion */}
      <div ref={scrollTrackRef} className="will-change-transform">
        {/* Inner track: continuous luxury infinite roll */}
        <div
          ref={tickerTrackRef}
          className="flex items-center gap-10 whitespace-nowrap will-change-transform text-xs uppercase tracking-[0.22em] text-warm-taupe font-serif font-light"
        >
          {marqueeItems.map((item, index) => (
            <React.Fragment key={index}>
              <span className="hover:text-forest-green transition-colors cursor-default">
                {item}
              </span>
              <span className="text-forest-green/70 text-[9px]">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrandMarquee;

