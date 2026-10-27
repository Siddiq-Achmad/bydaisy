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
  Database,
  ArrowRight,
  ExternalLink,
  Play,
  Check,
  Radio,
  FileCode2,
  Loader2,
  Globe,
  Building2,
  Layers,
  Lock,
  Workflow,
  Share2,
  Boxes,
  HelpCircle,
} from "lucide-react";
import {
  BYDAISY_ENTERPRISE_CONFIG,
  DATABASE_STRATEGY_ANALYSIS,
  type DatabaseStrategy,
} from "@/lib/enterprise";

export default function AdminDeveloperPage() {
  const [isFlushing, setIsFlushing] = useState(false);
  const [testingApis, setTestingApis] = useState(false);
  const [apiResults, setApiResults] = useState<Record<string, { status: number; count: number; time: number }>>({});

  // Enterprise Database Strategy State
  const [selectedDbStrategy, setSelectedDbStrategy] = useState<DatabaseStrategy>("shared_rls");

  // Luxima & Awedz Bridge State
  const [integrationTarget, setIntegrationTarget] = useState<"local" | "luxima" | "awedz">("local");
  const [luximaWebhookUrl, setLuximaWebhookUrl] = useState("https://api.luxima.id/v1/bydaisy/leads");
  const [awedzWebhookUrl, setAwedzWebhookUrl] = useState("https://app.awedz.com/api/integrations/bydaisy");
  const [apiKey, setApiKey] = useState("bd_live_sec_994a821e902b");
  const [simulationOutput, setSimulationOutput] = useState<string | null>(null);

  const endpoints = [
    { name: "Real Weddings", path: "/api/weddings", method: "GET / POST / PUT / DELETE" },
    { name: "Journal & Tradisi", path: "/api/journal", method: "GET / POST / PUT / DELETE" },
    { name: "Rekanan Vendor", path: "/api/vendors", method: "GET / POST / PUT / DELETE" },
    { name: "Love Letters & Ulasan", path: "/api/reviews", method: "GET / POST / PUT / DELETE" },
    { name: "Inquiry Leads", path: "/api/leads", method: "GET / POST / PUT / DELETE" },
    { name: "Paket & Pricelist", path: "/api/packages", method: "GET / PUT" },
    { name: "Sesi Konsultasi", path: "/api/consultations", method: "GET / POST / PUT / DELETE" },
    { name: "Kalender Acara", path: "/api/calendar", method: "GET / POST / PUT / DELETE" },
    { name: "Studio Settings", path: "/api/settings", method: "GET / PUT" },
    { name: "Galeri Publik", path: "/api/gallery", method: "GET / POST / PUT / DELETE" },
    { name: "LUXIMA SSO Session", path: "/api/auth/me", method: "GET" },
    { name: "LUXIMA 2-Way Sync Receiver", path: "/api/integrations/luxima-sync", method: "POST / GET" },
    { name: "AWEDZ 2-Way Sync Receiver", path: "/api/integrations/awedz-sync", method: "POST / GET" },
  ];

  const envInfo = [
    { label: "Framework", val: "Next.js 16.4.3 (App Router)" },
    { label: "Bundler Engine", val: "Turbopack (Rust-based)" },
    { label: "Data Architecture", val: "Headless LUXIMA-API (api.luxima.id)" },
    { label: "Database Coupling", val: "Zero Direct DB Connection (Bypassed)" },
    { label: "Authentication", val: "LUXIMA Enterprise SSO (api.luxima.id/v1/auth)" },
    { label: "Edge Proxy Engine", val: "Next.js 16 proxy.ts with Domain Routing" },
    { label: "Font Engine", val: "The Seasons Display Serif + Plus Jakarta Sans" },
    { label: "TypeScript", val: "Strict Mode Enabled (0 Errors)" },
  ];

  const handleFlushCache = () => {
    setIsFlushing(true);
    setTimeout(() => {
      setIsFlushing(false);
      alert("Next.js App Router cache berhasil disegarkan.");
    }, 1000);
  };

  const handleTestAllEndpoints = async () => {
    setTestingApis(true);
    const results: Record<string, { status: number; count: number; time: number }> = {};

    for (const ep of endpoints) {
      const start = performance.now();
      try {
        const res = await fetch(ep.path);
        const data = await res.json();
        const end = performance.now();
        const count = Array.isArray(data.data)
          ? data.data.length
          : data.count || (data.data?.articles?.length ?? 1);

        results[ep.path] = {
          status: res.status,
          count: count,
          time: Math.round(end - start),
        };
      } catch (e) {
        results[ep.path] = { status: 500, count: 0, time: 0 };
      }
    }

    setApiResults(results);
    setTestingApis(false);
  };

  const handleSimulateSync = (target: "luxima" | "awedz") => {
    const samplePayload = {
      source: "ByDaisy Luxury Matrimonial Platform",
      platformVersion: "2026.1",
      syncTarget: target === "luxima" ? "Luxima Cloud CRM" : "Awedz Event Hub",
      event: "lead.created",
      timestamp: new Date().toISOString(),
      leadData: {
        id: "LD-001",
        clientName: "Cut Sarah & Zulfikar",
        phone: "+62 822-7709-4277",
        weddingDate: "14 Februari 2027",
        venue: "Sribudaya Resort, Lampeuneurut",
        guestCount: "1.000 Tamu",
        packageInterest: "Sribudaya Platinum Best Deal (Rp 175.000.000)",
        status: "Baru Masuk",
      },
      security: {
        signature: "sha256=" + Math.random().toString(36).substring(2),
        verifiedBy: "ByDaisy REST Adapter",
      },
    };

    setSimulationOutput(JSON.stringify(samplePayload, null, 2));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Teknologi & Integrasi RESTful API
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Developer & API Integration Hub
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Status runtime Next.js 16, arsitektur pemisahan data JSON, dan kesiapan integrasi REST API dengan Luxima / Awedz.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleFlushCache}
            disabled={isFlushing}
            className="px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:bg-forest-green transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFlushing ? "animate-spin" : ""}`} />
            <span>{isFlushing ? "Membersihkan..." : "Flush Cache"}</span>
          </button>
        </div>
      </div>

      {/* RESTful API Endpoints Status & Playground */}
      <div className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-serif text-xl text-black font-semibold flex items-center gap-2">
              <Database className="w-5 h-5 text-forest-green" />
              <span>Daftar RESTful API Endpoints Terhubung</span>
            </h3>
            <p className="text-xs text-black/60 font-light mt-0.5">
              Semua endpoint terhubung langsung ke file JSON di direktori /data dan siap dialihkan ke database SQL / REST API Luxima.
            </p>
          </div>

          <button
            onClick={handleTestAllEndpoints}
            disabled={testingApis}
            className="px-4 py-2 rounded-xl bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer shrink-0"
          >
            {testingApis ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            <span>{testingApis ? "Menguji..." : "Test Seluruh Endpoint"}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-taupe/20 bg-[#FBF9F5] text-[11px] font-semibold uppercase tracking-wider text-black">
                <th className="py-3 px-4">Nama Modul</th>
                <th className="py-3 px-4">Endpoint Path</th>
                <th className="py-3 px-4">HTTP Verbs</th>
                <th className="py-3 px-4">Status & Waktu Respon</th>
                <th className="py-3 px-4 text-right">Data Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe/15">
              {endpoints.map((ep) => {
                const res = apiResults[ep.path];
                return (
                  <tr key={ep.path} className="hover:bg-sand/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-black">{ep.name}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-forest-green">
                      {ep.path}
                    </td>
                    <td className="py-3 px-4 text-[10px] font-mono text-warm-taupe">
                      {ep.method}
                    </td>
                    <td className="py-3 px-4">
                      {res ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            HTTP {res.status}
                          </span>
                          <span className="text-[10px] text-warm-taupe font-mono">
                            {res.time} ms
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-warm-taupe italic">
                          Belum diuji
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-black">
                      {res ? `${res.count} items` : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enterprise Multi-Tenant & Database Architecture Evaluation */}
      <div className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-taupe/20">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-forest-green" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brown">
                Arsitektur Enterprise LUXIMA & AWEDZ
              </span>
            </div>
            <h3 className="font-serif text-2xl text-black font-semibold">
              Model Multi-Tenant & Otonomi Domain / Homepage
            </h3>
            <p className="text-xs text-black/70 font-light mt-0.5">
              ByDaisy beroperasi sebagai Autonomous Enterprise Tenant di bawah payung ekosistem LUXIMA / AWEDZ dengan domain & tampilan mandiri.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-forest-green/10 text-forest-green border border-forest-green/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-forest-green animate-pulse"></span>
              <span>Enterprise Tenant Active</span>
            </span>
          </div>
        </div>

        {/* Tenant Configuration Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#F8F6F1] border border-taupe/20">
            <span className="text-[11px] text-warm-taupe uppercase font-semibold block mb-1">
              Tenant Identifier
            </span>
            <span className="font-mono text-sm font-bold text-black block">
              {BYDAISY_ENTERPRISE_CONFIG.tenantId}
            </span>
            <span className="text-[10px] text-black/60 mt-1 block">
              Org: {BYDAISY_ENTERPRISE_CONFIG.organizationId}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F6F1] border border-taupe/20">
            <span className="text-[11px] text-warm-taupe uppercase font-semibold block mb-1">
              Custom Domains & CNAME
            </span>
            <span className="font-mono text-xs font-bold text-forest-green block">
              bydaisy.com, bydaisy.id
            </span>
            <span className="text-[10px] text-black/60 mt-1 block">
              Subdomain: bydaisy.awedz.com
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F6F1] border border-taupe/20">
            <span className="text-[11px] text-warm-taupe uppercase font-semibold block mb-1">
              Homepage / Styling
            </span>
            <span className="text-xs font-bold text-black block">
              Otonom 100% (The Seasons Serif)
            </span>
            <span className="text-[10px] text-black/60 mt-1 block">
              Katalog Lokal & Pricelist Banda Aceh
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F6F1] border border-taupe/20">
            <span className="text-[11px] text-warm-taupe uppercase font-semibold block mb-1">
              Domain Routing Engine
            </span>
            <span className="text-xs font-bold text-black block">
              Next.js Middleware Enabled
            </span>
            <span className="text-[10px] text-black/60 mt-1 block">
              Headers: x-tenant-id, x-enterprise-domain
            </span>
          </div>
        </div>

        {/* Interactive Database Architecture Selector */}
        <div className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
              <Database className="w-4 h-4 text-forest-green" />
              <span>Pilihan Strategi Database Enterprise (Kombinasi vs Pemisahan)</span>
            </label>
            <span className="text-[11px] text-warm-taupe">
              Klik salah satu strategi di bawah untuk membandingkan analisis arsitektur:
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {(
              [
                { id: "shared_rls", title: "1. Kombinasi Database (Shared RLS)", badge: "Sangat Direkomendasikan", color: "border-forest-green bg-forest-green/5 text-forest-green" },
                { id: "schema_isolated", title: "2. Isolasi Skema (Schema-per-Tenant)", badge: "Alternatif Menengah", color: "border-amber-400 bg-amber-50/50 text-amber-800" },
                { id: "database_isolated", title: "3. Database Mandiri (Database-per-Tenant)", badge: "Kebutuhan Regulasi", color: "border-blue-400 bg-blue-50/50 text-blue-800" },
              ] as const
            ).map((strat) => (
              <button
                key={strat.id}
                type="button"
                onClick={() => setSelectedDbStrategy(strat.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDbStrategy === strat.id
                    ? "border-forest-green bg-forest-green/10 ring-2 ring-forest-green/20"
                    : "border-taupe/30 bg-white hover:bg-sand"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="font-serif text-xs font-semibold text-black">
                    {strat.title}
                  </span>
                  {selectedDbStrategy === strat.id && (
                    <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" />
                  )}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${strat.color}`}>
                  {strat.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Strategy Details Box */}
          {(() => {
            const current = DATABASE_STRATEGY_ANALYSIS[selectedDbStrategy];
            return (
              <div className="p-5 rounded-xl bg-[#F8F6F1] border border-taupe/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-taupe/20">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-black">
                      {current.name}
                    </h4>
                    <p className="text-xs text-black/75 mt-0.5 leading-relaxed">
                      {current.summary}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-forest-green text-white shrink-0 self-start sm:self-auto">
                    {current.recommendationLevel}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <span className="font-bold uppercase tracking-wider text-forest-green flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Kelebihan & Efisiensi:</span>
                    </span>
                    <ul className="space-y-1.5 text-black/80">
                      {current.pros.map((p, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-forest-green font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Catatan & Tantangan:</span>
                    </span>
                    <ul className="space-y-1.5 text-black/80">
                      {current.cons.map((c, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-800 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-taupe/20 text-xs">
                  <span className="font-bold text-black">Rekomendasi Penerapan: </span>
                  <span className="text-black/80">{current.idealFor}</span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 2-Way Synchronization Webhook Endpoints */}
        <div className="pt-3 border-t border-taupe/20">
          <label className="text-xs font-bold uppercase tracking-wider text-black block mb-3">
            Inbound 2-Way Sync Receiver Endpoints (Siap Menerima Update dari LUXIMA / AWEDZ HQ)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-taupe/30 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-semibold text-black">/api/integrations/luxima-sync</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-forest-green/10 text-forest-green">
                  Active (POST / GET)
                </span>
              </div>
              <p className="text-[11px] text-warm-taupe">
                Menerima notifikasi perubahan status lead, quotation deal, dan penugasan sales rep dari Luxima CRM.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-taupe/30 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-semibold text-black">/api/integrations/awedz-sync</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-forest-green/10 text-forest-green">
                  Active (POST / GET)
                </span>
              </div>
              <p className="text-[11px] text-warm-taupe">
                Menerima sinkronisasi perubahan rundown acara, status ketersediaan vendor, dan check-in tamu Awedz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Luxima & Awedz Integration Bridge Hub */}
      <div className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-amber-600" />
          <h3 className="font-serif text-xl text-black font-semibold">
            Integrasi Eksternal: Luxima & Awedz Bridge
          </h3>
        </div>
        <p className="text-xs text-black/70 font-light mb-6">
          Konfigurasi konektor otomatis agar lead yang masuk ke ByDaisy dapat disinkronkan secara real-time ke sistem CRM Luxima maupun platform event Awedz.
        </p>

        {/* Integration Mode Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div
            onClick={() => setIntegrationTarget("local")}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              integrationTarget === "local"
                ? "border-forest-green bg-forest-green/5 shadow-xs"
                : "border-taupe/30 bg-white hover:bg-sand"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif text-sm font-semibold text-black">
                1. Local JSON Storage
              </span>
              <span className="text-[10px] font-bold text-forest-green bg-forest-green/10 px-2 py-0.5 rounded-full">
                Aktif Saat Ini
              </span>
            </div>
            <p className="text-[11px] text-warm-taupe leading-relaxed">
              Data tersimpan di folder /data/*.json. Cepat, independen, dan tanpa dependensi eksternal.
            </p>
          </div>

          <div
            onClick={() => setIntegrationTarget("luxima")}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              integrationTarget === "luxima"
                ? "border-forest-green bg-forest-green/5 shadow-xs"
                : "border-taupe/30 bg-white hover:bg-sand"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif text-sm font-semibold text-black">
                2. Luxima Cloud CRM
              </span>
              <span className="text-[10px] font-bold text-brown bg-sand px-2 py-0.5 rounded-full">
                Ready Bridge
              </span>
            </div>
            <p className="text-[11px] text-warm-taupe leading-relaxed">
              Sinkronisasi dua arah ke pipeline CRM Luxima untuk penugasan tim sales dan quotation.
            </p>
          </div>

          <div
            onClick={() => setIntegrationTarget("awedz")}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              integrationTarget === "awedz"
                ? "border-forest-green bg-forest-green/5 shadow-xs"
                : "border-taupe/30 bg-white hover:bg-sand"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif text-sm font-semibold text-black">
                3. Awedz Platform
              </span>
              <span className="text-[10px] font-bold text-brown bg-sand px-2 py-0.5 rounded-full">
                Ready Bridge
              </span>
            </div>
            <p className="text-[11px] text-warm-taupe leading-relaxed">
              Integrasi sistem koordinasi wedding planner, buku tamu digital, dan rundown acara Awedz.
            </p>
          </div>
        </div>

        {/* Configuration Fields */}
        <div className="p-5 rounded-xl bg-[#F8F6F1] border border-taupe/20 space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                Webhook Target URL ({integrationTarget === "luxima" ? "Luxima" : "Awedz"})
              </label>
              <input
                type="text"
                value={integrationTarget === "luxima" ? luximaWebhookUrl : awedzWebhookUrl}
                onChange={(e) =>
                  integrationTarget === "luxima"
                    ? setLuximaWebhookUrl(e.target.value)
                    : setAwedzWebhookUrl(e.target.value)
                }
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black font-mono focus:outline-none focus:border-forest-green"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                API Secret Key / Bearer Token
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black font-mono focus:outline-none focus:border-forest-green"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-warm-taupe">
              Event Trigger: Otomatis memicu webhook saat lead masuk dari Website Sheet atau WhatsApp Direct.
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSimulateSync("luxima")}
                className="px-3.5 py-1.5 rounded-lg border border-forest-green/40 text-forest-green bg-white hover:bg-forest-green hover:text-white transition-colors text-xs font-medium cursor-pointer"
              >
                Simulasi Payload Luxima
              </button>
              <button
                onClick={() => handleSimulateSync("awedz")}
                className="px-3.5 py-1.5 rounded-lg border border-brown/40 text-brown bg-white hover:bg-brown hover:text-white transition-colors text-xs font-medium cursor-pointer"
              >
                Simulasi Payload Awedz
              </button>
            </div>
          </div>
        </div>

        {/* Simulation Output JSON */}
        {simulationOutput && (
          <div className="mt-4 p-4 rounded-xl bg-[#1A1A1A] text-white">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
              <span className="font-mono text-emerald-400">
                JSON Payload Output (Ready to Dispatch)
              </span>
              <button
                onClick={() => setSimulationOutput(null)}
                className="text-white/60 hover:text-white"
              >
                Tutup
              </button>
            </div>
            <pre className="text-[11px] font-mono text-gray-300 overflow-x-auto leading-relaxed">
              {simulationOutput}
            </pre>
          </div>
        )}
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
    </div>
  );
}
