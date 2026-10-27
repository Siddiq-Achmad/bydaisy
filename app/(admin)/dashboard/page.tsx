"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Calendar,
  Users,
  CreditCard,
  Star,
  Mail,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  RefreshCw,
  FileDown,
  Building,
  Heart,
  ChevronRight,
  ShieldCheck,
  Eye,
} from "lucide-react";

import leadsData from "@/data/leads.json";
import reviewsData from "@/data/reviews.json";
import weddingsData from "@/data/real-weddings.json";
import calendarData from "@/data/calendar.json";
import weddingPrices from "@/data/wedding-prices.json";

export default function AdminDashboardOverview() {
  const [isSyncing, setIsSyncing] = useState(false);

  const kpis = [
    {
      title: "Total Estimasi Revenue 2026",
      value: "Rp 1.485.000.000",
      change: "+24.5%",
      subtext: "vs periode 2025",
      icon: TrendingUp,
      color: "text-forest-green",
      bgColor: "bg-forest-green/10",
    },
    {
      title: "Agenda & Resepsi Terjadwal",
      value: `${calendarData.length} Acara`,
      change: "Kalender Kru 2026",
      subtext: "Banda Aceh, Sribudaya & Hermes",
      icon: Calendar,
      color: "text-brown",
      bgColor: "bg-brown/10",
    },
    {
      title: "VIP Leads & Inquiries",
      value: `${leadsData.length} Pasangan`,
      change: "+8 Minggu Ini",
      subtext: "Hotline WhatsApp & Web Sheet",
      icon: Mail,
      color: "text-forest-green",
      bgColor: "bg-forest-green/10",
    },
    {
      title: "Kepuasan Pasangan",
      value: "5.0 / 5.0",
      change: `${reviewsData.length} Ulasan Terverifikasi`,
      subtext: "Bridestory & Google Reviews",
      icon: Star,
      color: "text-amber-700",
      bgColor: "bg-amber-100",
    },
  ];

  const upcomingWeddings = calendarData.map((ev) => ({
    couples: ev.title,
    date: ev.date,
    package: ev.package,
    venue: ev.venue,
    status: ev.badge || ev.type,
    statusColor: ev.badgeColor || "bg-forest-green/10 text-forest-green border-forest-green/30",
    leadPlanner: ev.lead,
    amount: "Rp 115.000.000 - Rp 235.000.000",
  }));

  const recentLeads = leadsData.slice(0, 3).map((lead) => ({
    name: lead.coupleNames,
    hotline: lead.hotline,
    interest: lead.service,
    estimatedGuests: lead.guestCount,
    targetDate: lead.eventDate,
    status: lead.status,
    waHref: `https://wa.me/${(lead.waNumber || "").replace(/[^0-9]/g, "")}`,
  }));

  const quickActions = [
    {
      title: "Kelola Paket & Harga 2026",
      desc: "All-In Signature, Sribudaya 2026, Vandys Garden, WP/WO & Dekorasi",
      href: "/dashboard/packages",
      icon: CreditCard,
      badge: "6 Paket Utama",
    },
    {
      title: "Kalender Acara & Timeline",
      desc: "Jadwal H-14 Technical Meeting, gladi bersih H-1 & formasi kru",
      href: "/dashboard/calendar",
      icon: Calendar,
      badge: "Pipeline Aktif",
    },
    {
      title: "VIP Inquiries & Leads",
      desc: "Follow-up calon pengantin dari Hotline 1 & Hotline 2",
      href: "/dashboard/leads",
      icon: Mail,
      badge: "8 Baru",
    },
    {
      title: "Pusat Media & 4 E-Catalog",
      desc: "Monitor unduhan PDF Company Profile, All-In, Sribudaya, Vandys",
      href: "/dashboard/media",
      icon: FileDown,
      badge: "4 PDF",
    },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1000);
  };

  return (
    <div className="space-y-10">
      {/* Top Banner & Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Studio Command Center • Jl. Batee Suasa, Lambhuk
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Ikhtisar Operasional & Pipeline 2026
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Monitoring calon pengantin, jadwal koordinasi vendor, serta metrik portofolio ByDaisy.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="px-4 py-2 rounded-xl bg-white border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-all flex items-center gap-2 shadow-xs disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-forest-green ${
                isSyncing ? "animate-spin" : ""
              }`}
            />
            <span>{isSyncing ? "Sinkronisasi..." : "Refresh Data"}</span>
          </button>

          <Link
            href="/dashboard/leads"
            className="px-5 py-2 rounded-xl bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Buka Leads (+8 Baru)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const IconComp = kpi.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs hover:border-forest-green/50 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-warm-taupe">
                  {kpi.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl ${kpi.bgColor} ${kpi.color} flex items-center justify-center shrink-0`}
                >
                  <IconComp className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-black block tracking-tight">
                  {kpi.value}
                </span>
                <div className="flex items-center gap-2 mt-1.5 text-xs">
                  <span className="font-semibold text-forest-green">
                    {kpi.change}
                  </span>
                  <span className="text-warm-taupe text-[11px]">
                    {kpi.subtext}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Access Action Hub */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl sm:text-2xl text-black font-medium">
            Pintasan Cepat Manajemen Studio
          </h3>
          <span className="text-xs text-warm-taupe">
            Akses langsung ke modul inti CMS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((qa, qIdx) => {
            const QIcon = qa.icon;
            return (
              <Link
                key={qIdx}
                href={qa.href}
                className="p-5 rounded-2xl bg-white border border-taupe/30 hover:border-forest-green hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-sand text-forest-green flex items-center justify-center group-hover:bg-forest-green group-hover:text-white transition-colors">
                      <QIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brown bg-sand px-2 py-0.5 rounded-full">
                      {qa.badge}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-semibold text-black mb-1 group-hover:text-forest-green transition-colors">
                    {qa.title}
                  </h4>
                  <p className="text-xs text-black/70 font-light leading-relaxed">
                    {qa.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-forest-green mt-4 pt-3 border-t border-taupe/20">
                  <span>Buka Modul</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Upcoming Weddings & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upcoming Weddings Pipeline */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-taupe/30 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-taupe/20">
            <div>
              <h3 className="font-serif text-xl text-black font-semibold">
                Jadwal Eksekusi Pernikahan Terdekat
              </h3>
              <p className="text-xs text-warm-taupe mt-0.5">
                Timeline koordinasi hulu-ke-hilir bersama tim planner
              </p>
            </div>
            <Link
              href="/dashboard/calendar"
              className="text-xs text-forest-green font-semibold hover:underline"
            >
              Lihat Kalender →
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingWeddings.map((wed, wIdx) => (
              <div
                key={wIdx}
                className="p-4 rounded-xl bg-[#FBF9F5] border border-taupe/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-forest-green/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-serif text-base font-semibold text-black">
                      {wed.couples}
                    </h4>
                    <span
                      className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${wed.statusColor}`}
                    >
                      {wed.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-black/70 font-light">
                    <span className="flex items-center gap-1 text-brown font-medium">
                      <Calendar className="w-3 h-3 text-forest-green" />
                      {wed.date}
                    </span>
                    <span className="flex items-center gap-1 text-warm-taupe">
                      <MapPin className="w-3 h-3" />
                      {wed.venue}
                    </span>
                  </div>
                  <p className="text-[11px] text-warm-taupe mt-1">
                    {wed.package} • PIC: {wed.leadPlanner}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-taupe/20">
                  <span className="font-serif text-base font-bold text-forest-green block">
                    {wed.amount}
                  </span>
                  <Link
                    href="/dashboard/calendar"
                    className="text-[11px] text-warm-taupe hover:text-black font-medium underline"
                  >
                    Detail Rundown
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Inquiries Realtime Inbox */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-taupe/30 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-taupe/20">
            <div>
              <h3 className="font-serif text-xl text-black font-semibold">
                Inquiries Masuk Hari Ini
              </h3>
              <p className="text-xs text-warm-taupe mt-0.5">
                Konsultasi WhatsApp Hotline 1 & 2
              </p>
            </div>
            <Link
              href="/dashboard/leads"
              className="text-xs text-forest-green font-semibold hover:underline"
            >
              Semua Leads (42) →
            </Link>
          </div>

          <div className="space-y-3.5">
            {recentLeads.map((lead, lIdx) => (
              <div
                key={lIdx}
                className="p-4 rounded-xl bg-[#FBF9F5] border border-taupe/20 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-serif text-sm font-semibold text-black">
                      {lead.name}
                    </h5>
                    <span className="text-[10px] font-bold text-forest-green bg-forest-green/10 px-2 py-0.5 rounded-full">
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-brown font-medium">
                    {lead.interest}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-warm-taupe mt-1">
                    <span>{lead.estimatedGuests}</span>
                    <span>•</span>
                    <span>Target: {lead.targetDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-taupe/20 flex items-center justify-between">
                  <span className="text-[10px] text-warm-taupe font-light truncate max-w-[170px]">
                    {lead.hotline}
                  </span>
                  <a
                    href={lead.waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-lg bg-black text-white text-[11px] font-medium hover:bg-forest-green transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Follow-up WA</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
