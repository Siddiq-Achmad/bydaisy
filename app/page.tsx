"use client";

import React, { useState } from "react";
import Navbar from "@/components/navigation/navbar";
import HeroSection from "@/components/sections/hero";
import BrandMarquee from "@/components/sections/brand-marquee";
import AboutSection from "@/components/sections/about";
import BentoServices from "@/components/sections/bento-services";
import HorizontalPortfolio from "@/components/sections/horizontal-portfolio";
import GallerySection from "@/components/sections/gallery";
import PricelistBanner from "@/components/sections/pricelist-banner";
import Footer from "@/components/navigation/footer";
import ConsultationSheet from "@/components/modals/consultation-sheet";

export default function HomePage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Wedding Planner");

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-canvas text-black selection:bg-warm-taupe selection:text-canvas">
      {/* Editorial Header / Navbar */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      <main>
        {/* Hero Section with SplitText Reveal & Parallax Image Scrub */}
        <HeroSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* Divider Marquee */}
        <BrandMarquee />

        {/* About Section: Story, Verified Crew & Key Trust Metrics */}
        <AboutSection />

        {/* 3-Card Bento Services Grid with Mouse Spotlight & 3D Tilt */}
        <BentoServices
          onOpenConsultation={(service) => handleOpenConsultation(service)}
        />

        {/* Horizontal Pinned Portfolio Scrub (Jihad & Nanda, Nazhira & Naufal, Jacky & Valerie) */}
        <HorizontalPortfolio
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* Decor & Venue Atmosphere Panoramic Gallery */}
        <GallerySection
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* Pricelist & Investment CTA Banner */}
        <PricelistBanner
          onOpenConsultation={() => handleOpenConsultation()}
        />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Framer Motion Spring Consultation Sheet with Direct WhatsApp Formatter */}
      <ConsultationSheet
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
        defaultService={selectedService}
      />
    </div>
  );
}
