"use client";

import React, { useEffect, useRef } from "react";

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    // Optimized noise rendering at low resolution scaled up
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = 160;
    patternCanvas.height = 160;
    const patternCtx = patternCanvas.getContext("2d");

    let lastTime = 0;
    const fps = 18; // Cinematic 18-24fps grain flicker
    const interval = 1000 / fps;

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (time - lastTime < interval) return;
      lastTime = time;

      if (!patternCtx) return;
      const imgData = patternCtx.createImageData(160, 160);
      const buffer32 = new Uint32Array(imgData.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        // Subtle monochrome grain noise
        const val = (Math.random() * 255) | 0;
        buffer32[i] = (255 << 24) | (val << 16) | (val << 8) | val;
      }

      patternCtx.putImageData(imgData, 0, 0);

      ctx.clearRect(0, 0, width, height);
      const pattern = ctx.createPattern(patternCanvas, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9990] opacity-[0.038] mix-blend-overlay"
      aria-hidden="true"
    />
  );
}

export default GrainOverlay;
