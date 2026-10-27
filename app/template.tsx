"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
    );
  }

  return (
    <>
      {/* Primary Warm Taupe Curtain Layer (Snappy & Graceful) */}
      <motion.div
        className="fixed inset-0 z-[9995] bg-[#8B7A6B] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Secondary Alabaster Canvas Curtain Layer */}
      <motion.div
        className="fixed inset-0 z-[9996] bg-[#FBF9F5] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.52, delay: 0.04, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Content Fade & Immediate Graceful Reveal */}
      <motion.div
        id="main-content"
        tabIndex={-1}
        className="outline-none"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12, ease: [0.25, 1, 0.5, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
