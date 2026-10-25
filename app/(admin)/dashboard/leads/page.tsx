"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowUpRight,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  UserCheck,
} from "lucide-react";

export default function AdminLeadsPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const leads = [
    {
      id: "LD-001",
      coupleNames: "Cut Sarah & Zulfikar",
      phone: "+62 812-6901-2345",
      hotlineSource: "Hotline 1 (+62 822-7709-4277)",
      targetDate: "14 Februari 2027",
      venue: "Sribudaya Resort, Lampeuneurut",
      guestCount: "1.000 Tamu",
      packageInterest: "Sribudaya Platinum Best Deal (Rp 175.000.000)",
      budgetRange: "Rp 150 - 200 Juta",
      status: "Baru Masuk",
      statusColor: "bg-forest-green/10 text-forest-green border-forest-green/30",
      receivedAt: "10 menit lalu",
      notes: "Minta info include 1 night stay dan ketersediaan tanggal 14 Feb.",
    },
    {
      id: "LD-002",
      coupleNames: "dr. Amanda & Reza, S.T.",
      phone: "+62 821-7788-9900",
      hotlineSource: "Hotline 2 (+62 821-6222-1468)",
      targetDate: "20 Maret 2027",
      venue: "Hermes Palace Hotel",
      guestCount: "500 Tamu",
      packageInterest: "All-In Signature Gold Intimate (Rp 115.000.000)",
      budgetRange: "Rp 100 - 150 Juta",
      status: "Jadwal Konsultasi",
      statusColor: "bg-blue-100 text-blue-900 border-blue-300",
      receivedAt: "2 jam lalu",
      notes: "Sudah dijadwalkan temu privat di Studio Lambhuk hari Selasa jam 14.00.",
    },
    {
      id: "LD-003",
      coupleNames: "Nabila & Fikri",
      phone: "+62 852-3344-5566",
      hotlineSource: "Hotline 1 (+62 822-7709-4277)",
      targetDate: "18 April 2027",
      venue: "@vandysgarden, Banda Aceh",
      guestCount: "500 Tamu",
      packageInterest: "Vandys Event Package (Rp 85.000.000)",
      budgetRange: "Rp 85 - 100 Juta",
      status: "Proposal Dikirim",
      statusColor: "bg-amber-100 text-amber-900 border-amber-300",
      receivedAt: "Kemarin, 16.40",
      notes: "Tertarik konsep garden party sore hari, sedang menunggu persetujuan orang tua.",
    },
    {
      id: "LD-004",
      coupleNames: "T. Iskandar & Putri Melati",
      phone: "+62 813-8899-0011",
      hotlineSource: "Website Sheet (Online)",
      targetDate: "2 Mei 2027",
      venue: "Auditorium UIN Ar-Raniry",
      guestCount: "1.500 Tamu",
      packageInterest: "Wedding Planner Platinum + Dekorasi 18m",
      budgetRange: "Rp 120 - 150 Juta",
      status: "Proposal Dikirim",
      statusColor: "bg-amber-100 text-amber-900 border-amber-300",
      receivedAt: "Kemarin, 11.20",
      notes: "Membutuhkan 12 kru hari H dan pelaminan adat Aceh modern fresh flowers.",
    },
    {
      id: "LD-005",
      coupleNames: "Farhan & Shania",
      phone: "+62 822-4455-6677",
      hotlineSource: "Hotline 2 (+62 821-6222-1468)",
      targetDate: "6 Juni 2027",
      venue: "Lhoknga Riverside Outdoor",
      guestCount: "800 Tamu",
      packageInterest: "Wedding Organizer + Custom Decor",
      budgetRange: "Rp 80 - 100 Juta",
      status: "Terkonfirmasi DP",
      statusColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      receivedAt: "3 hari lalu",
      notes: "DP tahap 1 diterima 30%. Kontrak kerjasama telah ditandatangani.",
    },
  ];

  const filteredLeads = leads.filter((ld) => {
    const q = search.toLowerCase();
    const matchSearch =
      ld.coupleNames.toLowerCase().includes(q) ||
      ld.venue.toLowerCase().includes(q) ||
      ld.packageInterest.toLowerCase().includes(q);
    if (filterStatus === "all") return matchSearch;
    return matchSearch && ld.status === filterStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Manajemen Prospek Calon Pengantin
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Inquiries & VIP Leads (Hotline 1 & 2)
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Data masuk langsung dari tombol WhatsApp concierge dan formulir konsultasi website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-forest-green/10 text-forest-green text-xs font-semibold">
            ● 8 Leads Baru Minggu Ini
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-warm-taupe" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama pasangan, venue, paket..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-taupe/30 text-xs text-black placeholder:text-warm-taupe focus:outline-none focus:border-forest-green shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {[
            { id: "all", label: "Semua Leads" },
            { id: "Baru Masuk", label: "Baru Masuk" },
            { id: "Jadwal Konsultasi", label: "Jadwal Temu" },
            { id: "Proposal Dikirim", label: "Proposal Dikirim" },
            { id: "Terkonfirmasi DP", label: "Terkonfirmasi DP" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                filterStatus === tab.id
                  ? "bg-black text-white border-black font-semibold"
                  : "bg-white text-black/75 border-taupe/30 hover:bg-sand"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Cards Grid */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-forest-green/40 transition-colors"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-[10px] font-bold text-brown bg-sand px-2 py-0.5 rounded">
                  {lead.id}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-black">
                  {lead.coupleNames}
                </h3>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${lead.statusColor}`}
                >
                  {lead.status}
                </span>
                <span className="text-[11px] text-warm-taupe">
                  ({lead.receivedAt})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-black/75 font-light">
                <span className="flex items-center gap-1 font-medium text-brown">
                  <Calendar className="w-3.5 h-3.5 text-forest-green" />
                  Target: {lead.targetDate}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-warm-taupe" />
                  {lead.venue}
                </span>
                <span>•</span>
                <span>Kapasitas: {lead.guestCount}</span>
                <span>•</span>
                <span className="text-forest-green font-semibold">
                  Budget: {lead.budgetRange}
                </span>
              </div>

              <p className="text-xs text-black/80 font-medium">
                Minat Paket: <span className="text-forest-green">{lead.packageInterest}</span>
              </p>

              <p className="text-xs text-warm-taupe font-light italic">
                "{lead.notes}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-taupe/20">
              <span className="text-[11px] text-warm-taupe">
                Sumber: {lead.hotlineSource}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Halo ${lead.coupleNames}, terima kasih telah menghubungi ByDaisy Planner mengenai rencana pernikahan di ${lead.venue}. Ada yang bisa kami bantu jelaskan lebih lanjut?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center justify-center gap-1.5 shadow-xs w-full sm:w-auto"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
