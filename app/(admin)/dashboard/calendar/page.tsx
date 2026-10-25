"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function AdminCalendarPage() {
  const [filterType, setFilterType] = useState<string>("all");

  const events = [
    {
      id: "ev-1",
      title: "Resepsi Royal: Jihad & Nanda",
      type: "hari-h",
      date: "14 November 2026",
      time: "09.00 - 17.00 WIB",
      venue: "Sribudaya Resort, Lampeuneurut",
      package: "Royal Sribudaya (2.000 Pax)",
      crewCount: "15 Personil",
      lead: "Daisy Iskandar",
      notes: "Acoustic Band live standby 10.30 WIB. Kuah Beulangong disajikan jam 11.00.",
      color: "border-forest-green bg-forest-green/5",
      badge: "Hari H Resepsi",
      badgeColor: "bg-forest-green text-white",
    },
    {
      id: "ev-2",
      title: "Gladi Bersih & Loading: Jihad & Nanda",
      type: "gladi",
      date: "13 November 2026",
      time: "14.00 - 18.00 WIB",
      venue: "Sribudaya Resort",
      package: "Persiapan Panggung & Sound",
      crewCount: "8 Kru Lapangan",
      lead: "Rizki Pratama",
      notes: "Cek generator 50.000 KVA dan kelistrikan tenda semi-outdoor.",
      color: "border-amber-400 bg-amber-50/50",
      badge: "Gladi Bersih H-1",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    },
    {
      id: "ev-3",
      title: "Final Technical Meeting: Valerie & Jacky",
      type: "tm",
      date: "14 November 2026",
      time: "19.30 WIB",
      venue: "Studio ByDaisy, Lambhuk",
      package: "All-In Signature (300 Pax)",
      crewCount: "10 Personil",
      lead: "Sarah Amelia",
      notes: "Briefing keluarga besar pria & wanita, MC, MUA, dan fotografer.",
      color: "border-blue-400 bg-blue-50/50",
      badge: "Final TM H-14",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    },
    {
      id: "ev-4",
      title: "Resepsi Platinum: Valerie & Jacky",
      type: "hari-h",
      date: "28 November 2026",
      time: "10.00 - 16.00 WIB",
      venue: "Hermes Palace Hotel Ballroom",
      package: "Platinum Intimate (300 Pax)",
      crewCount: "10 Personil",
      lead: "Sarah Amelia",
      notes: "Tradisi Peusijuek jam 10.30 dilanjutkan tari Ranup Lampuan.",
      color: "border-forest-green bg-forest-green/5",
      badge: "Hari H Resepsi",
      badgeColor: "bg-forest-green text-white",
    },
    {
      id: "ev-5",
      title: "Resepsi Garden: Naufal & Nazhira",
      type: "hari-h",
      date: "12 Desember 2026",
      time: "10.00 - 17.00 WIB",
      venue: "@vandysgarden, Banda Aceh",
      package: "Garden All-In (500 Pax)",
      crewCount: "8 Personil",
      lead: "Daisy Iskandar",
      notes: "Photobooth @bp.projectbooth standby pintu utama. Hand bouquet @hs_floralstudio diantar jam 08.00.",
      color: "border-forest-green bg-forest-green/5",
      badge: "Hari H Resepsi",
      badgeColor: "bg-forest-green text-white",
    },
    {
      id: "ev-6",
      title: "Akad & Resepsi: Cut Farah & Teuku Rian",
      type: "hari-h",
      date: "10 Januari 2027",
      time: "08.00 - 16.00 WIB",
      venue: "Auditorium UIN Ar-Raniry Banda Aceh",
      package: "Wedding Planner Platinum",
      crewCount: "12 Personil",
      lead: "Rizki Pratama",
      notes: "Prosesi adat Aceh Seumapa di pintu gerbang penyambutan besan.",
      color: "border-forest-green bg-forest-green/5",
      badge: "Hari H Resepsi",
      badgeColor: "bg-forest-green text-white",
    },
  ];

  const filteredEvents = events.filter((e) => {
    if (filterType === "all") return true;
    return e.type === filterType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Kalender Operasional Musim 2026/2027
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Jadwal Eksekusi & Timeline Lapangan
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Penjadwalan hari H, H-1 gladi resik, technical meeting H-14, dan penugasan kru.
          </p>
        </div>

        <button
          onClick={() => alert("Form tambah acara baru dibuka")}
          className="px-5 py-2.5 rounded-xl bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal Acara</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "Semua Agenda (6)" },
          { id: "hari-h", label: "Hari-H Resepsi (4)" },
          { id: "gladi", label: "Gladi Resik H-1 (1)" },
          { id: "tm", label: "Technical Meeting (1)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
              filterType === tab.id
                ? "bg-black text-white border-black shadow-xs font-semibold"
                : "bg-white text-black/75 border-taupe/30 hover:bg-sand"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className={`p-6 rounded-2xl bg-white border ${evt.color} shadow-xs flex flex-col justify-between hover:shadow-sm transition-all`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${evt.badgeColor}`}
                >
                  {evt.badge}
                </span>
                <span className="text-xs font-semibold text-brown">
                  {evt.package}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-black mb-2">
                {evt.title}
              </h3>

              <div className="space-y-1.5 text-xs text-black/80 font-light mb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-3.5 h-3.5 text-forest-green shrink-0" />
                  <strong className="font-medium text-black">{evt.date}</strong>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-warm-taupe">
                    <Clock className="w-3 h-3" />
                    {evt.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brown shrink-0" />
                  <span>{evt.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-forest-green shrink-0" />
                  <span>Formasi Tim: {evt.crewCount} • Lead PIC: <strong>{evt.lead}</strong></span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-taupe/20 text-xs text-black/75 font-light">
                <strong className="font-semibold text-brown block mb-0.5">
                  Catatan Teknis Lapangan:
                </strong>
                {evt.notes}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-taupe/20 flex items-center justify-between text-xs">
              <span className="text-warm-taupe">Status: Terverifikasi Vendor</span>
              <button
                type="button"
                onClick={() => alert(`Membuka lembar kerja untuk ${evt.title}`)}
                className="text-forest-green font-semibold hover:underline flex items-center gap-1"
              >
                <span>Lembar Kerja Kru</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
