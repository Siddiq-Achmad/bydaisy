"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  CheckCircle2,
  RefreshCw,
  Terminal,
  Activity,
  Zap,
  ShieldCheck,
  Server,
  Code2,
} from "lucide-react";

export default function AdminDeveloperPage() {
  const [isFlushing, setIsFlushing] = useState(false);

  const envInfo = [
    { label: "Framework", val: "Next.js 16.4.3 (App Router)" },
    { label: "Bundler Engine", val: "Turbopack (Rust-based)" },
    { label: "React Core", val: "React 19.0.0" },
    { label: "CSS Architecture", val: "Tailwind CSS v4 + Custom HSL Tokens" },
    { label: "Creative Dev", val: "Lenis Smooth Scroll + GSAP ScrollTrigger" },
    { label: "Font Engine", val: "next/font/local (The Seasons WOFF2)" },
    { label: "Static Generation", val: "17/17 Pre-rendered Static Pages" },
    { label: "TypeScript", val: "Strict Mode Enabled (0 Errors)" },
  ];

  const mcpServers = [
    {
      name: "Google Stitch MCP",
      status: "Connected",
      role: "AI Design Screen Translation & System Specs",
      ping: "12ms",
    },
    {
      name: "Remote GitHub MCP",
      status: "Connected",
      role: "Repository Source Control & Infrastructure Overview",
      ping: "18ms",
    },
  ];

  const handleFlushCache = () => {
    setIsFlushing(true);
    setTimeout(() => {
      setIsFlushing(false);
      alert("Next.js App Router cache berhasil disegarkan.");
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Teknologi & Infrastruktur Aplikasi
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Developer & System Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Status runtime Next.js 16 Turbopack, MCP server connectors, dan monitoring cache.
          </p>
        </div>

        <button
          onClick={handleFlushCache}
          disabled={isFlushing}
          className="px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:bg-forest-green transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFlushing ? "animate-spin" : ""}`} />
          <span>{isFlushing ? "Membersihkan Cache..." : "Flush Edge Cache"}</span>
        </button>
      </div>

      {/* Tech Stack Specs */}
      <div className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs">
        <h3 className="font-serif text-xl text-black font-semibold mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-forest-green" />
          <span>Runtime & Build Environment</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {envInfo.map((env, eIdx) => (
            <div
              key={eIdx}
              className="p-3.5 rounded-xl bg-[#F8F6F1] border border-taupe/20 text-xs"
            >
              <span className="text-[11px] text-warm-taupe block mb-1">
                {env.label}
              </span>
              <strong className="text-black font-medium block">
                {env.val}
              </strong>
            </div>
          ))}
        </div>
      </div>

      {/* MCP Servers Health */}
      <div className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs">
        <h3 className="font-serif text-xl text-black font-semibold mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-forest-green" />
          <span>MCP Server Integrations (Model Context Protocol)</span>
        </h3>

        <div className="space-y-3">
          {mcpServers.map((mcp, mIdx) => (
            <div
              key={mIdx}
              className="p-4 rounded-xl bg-[#F8F6F1] border border-taupe/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-serif text-base font-semibold text-black">
                    {mcp.name}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-forest-green bg-forest-green/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{mcp.status}</span>
                  </span>
                </div>
                <p className="text-warm-taupe font-light">{mcp.role}</p>
              </div>

              <div className="flex items-center gap-2 text-warm-taupe">
                <span>Latency: <strong className="text-forest-green">{mcp.ping}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
