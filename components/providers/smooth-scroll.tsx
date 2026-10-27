"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion (vestibular accessibility)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Keep standard native scroll behavior without wheel hijacking
      ScrollTrigger.update();
      return;
    }

    // Initialize Lenis smooth scroll with optimized frame pacing
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // 1. Bind Lenis scroll to ScrollTrigger.update()
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // 2. Synchronize with gsap.ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // 3. Disable lag smoothing for instant responsiveness
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export default SmoothScrollProvider;
