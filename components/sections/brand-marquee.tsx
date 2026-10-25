"use client";

import React from "react";

export function BrandMarquee() {
  const items = [
    "Bespoke Wedding Planning",
    "Minute-By-Minute Coordination",
    "Luxury Floral & Scenic Decor",
    "Curated Vendor Network",
    "Banda Aceh & Beyond",
    "Haute Couture Matrimonial Staging",
  ];

  return (
    <div className="border-y border-taupe/30 bg-sand/60 py-4 overflow-hidden select-none">
      <div className="flex items-center justify-around gap-8 text-[11px] uppercase tracking-[0.22em] text-warm-taupe font-medium whitespace-nowrap overflow-x-hidden">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <span>{item}</span>
            <span className="text-taupe text-[8px]">●</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default BrandMarquee;
