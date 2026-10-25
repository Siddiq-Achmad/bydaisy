"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  useEffect(() => {
    // Only activate custom cursor on fine pointer devices (desktop/mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;
    setIsPointerDevice(true);

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = -100;
    let mouseY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    const onMouseEnterInteractive = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute("data-cursor");
        if (customText) {
          setHoverLabel(customText);
        } else {
          setHoverLabel(null);
        }
      }
    };

    const onMouseLeaveInteractive = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      if (target) {
        setIsHovered(false);
        setHoverLabel(null);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseEnterInteractive);
    document.addEventListener("mouseout", onMouseLeaveInteractive);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseEnterInteractive);
      document.removeEventListener("mouseout", onMouseLeaveInteractive);
    };
  }, []);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-forest-green transition-opacity duration-200"
        style={{
          opacity: isHovered ? 0 : 0.85,
        }}
      />

      {/* Outer follower ring / bubble */}
      <div
        ref={followerRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? "w-14 h-14 bg-warm-taupe/20 border-warm-taupe scale-100 backdrop-blur-[2px]"
            : "w-8 h-8 bg-transparent border-forest-green/40 scale-100"
        }`}
      >
        {hoverLabel && (
          <span className="font-serif italic text-[10px] text-black tracking-widest uppercase select-none animate-fade-in">
            {hoverLabel}
          </span>
        )}
      </div>
    </>
  );
}

export default CustomCursor;
