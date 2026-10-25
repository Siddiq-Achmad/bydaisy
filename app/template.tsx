"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Primary Warm Taupe Curtain Layer */}
      <motion.div
        className="fixed inset-0 z-[9995] bg-[#8B7A6B] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Secondary Alabaster Canvas Curtain Layer for Luxurious Wipe */}
      <motion.div
        className="fixed inset-0 z-[9996] bg-[#FBF9F5] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.95, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Content Fade & Subtle Rise */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
