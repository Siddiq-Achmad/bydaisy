"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: string;
}

export function ParallaxImage({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
  aspectRatio = "aspect-[4/5]",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Smooth scrub parallax
    const anim = gsap.to(image, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-sand",
        aspectRatio,
        containerClassName
      )}
    >
      <div
        ref={imageRef}
        className="absolute -top-[10%] left-0 w-full h-[125%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn("object-cover object-center", className)}
        />
      </div>
    </div>
  );
}

export default ParallaxImage;
