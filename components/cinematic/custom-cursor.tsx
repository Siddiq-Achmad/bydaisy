"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate custom cursor on fine pointer devices and when reduced motion is not requested
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!pointerQuery.matches || motionQuery.matches) return;
    setIsPointerDevice(true);

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // High performance quickTo setters to prevent tween recreation on every mousemove
    const quickCursorX = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power2.out" });
    const quickCursorY = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power2.out" });
    const quickFollowerX = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power3.out" });
    const quickFollowerY = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      quickCursorX(e.clientX);
      quickCursorY(e.clientY);
      quickFollowerX(e.clientX);
      quickFollowerY(e.clientY);
    };

    const onDocumentMouseLeave = () => {
      setIsVisible(false);
    };

    const onDocumentMouseEnter = () => {
      setIsVisible(true);
    };

    const onMouseEnterInteractive = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute("data-cursor");
        setHoverLabel(customText || null);
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
    document.addEventListener("mouseleave", onDocumentMouseLeave);
    document.addEventListener("mouseenter", onDocumentMouseEnter);
    document.addEventListener("mouseover", onMouseEnterInteractive);
    document.addEventListener("mouseout", onMouseLeaveInteractive);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onDocumentMouseLeave);
      document.removeEventListener("mouseenter", onDocumentMouseEnter);
      document.removeEventListener("mouseover", onMouseEnterInteractive);
      document.removeEventListener("mouseout", onMouseLeaveInteractive);
    };
  }, [isVisible]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-forest-green transition-opacity duration-200"
        style={{
          opacity: !isVisible ? 0 : isHovered ? 0 : 0.85,
        }}
      />

      {/* Outer follower ring / bubble */}
      <div
        ref={followerRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border transition-all duration-300 ease-out ${
          !isVisible
            ? "opacity-0"
            : isHovered
            ? "opacity-100 w-14 h-14 bg-warm-taupe/20 border-warm-taupe scale-100 backdrop-blur-[2px]"
            : "opacity-100 w-8 h-8 bg-transparent border-forest-green/40 scale-100"
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
