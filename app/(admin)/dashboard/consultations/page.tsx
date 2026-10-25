"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function AdminConsultationsPage() {
  const consultations = [
    {
      id: "CS-101",
      coupleNames: "Cut Sarah & Zulfikar",
      scheduledDate: "Selasa, 28 Oktober 2026",
      time: "14.00 - 15.30 WIB",
      type: "Tatap Muka di Studio Lambhuk",
      venueInterest: "Sribudaya Resort (1.000 Pax)",
      leadPlanner: "Daisy Iskandar",
      status: "Terkonfirmasi",
      statusColor: "bg-forest-green/10 text-forest-green",
      hotline: "+62 822-7709-4277",
    },
    {
      id: "CS-102",
      coupleNames: "dr. Amanda & Reza, S.T.",
      scheduledDate: "Rabu, 29 Oktober 2026",
      time: "16.00 - 17.30 WIB",
      type: "Tatap Muka di Studio Lambhuk",
      venueInterest: "Hermes Palace Hotel (500 Pax)",
      leadPlanner: "Sarah Amelia",
      status: "Terkonfirmasi",
      statusColor: "bg-forest-green/10 text-forest-green",
      hotline: "+62 821-6222-1468",
    },
    {
      id: "CS-103",
      coupleNames: "Farhan & Shania",
      scheduledDate: "Jumat, 31 Oktober 2026",
      time: "19.30 - 21.00 WIB",
      type: "Google Meet / Virtual Sesi",
      venueInterest: "Lhoknga Riverside (800 Pax)",
      leadPlanner: "Rizki Pratama",
      status: "Menunggu Konfirmasi Link",
      statusColor: "bg-amber-100 text-amber-900",
      hotline: "+62 821-6222-1468",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Sesi Temu Privat & Konsultasi Anggaran
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Jadwal Sesi Konsultasi Eksklusif
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Penjadwalan tatap muka di Studio Lambhuk, Banda Aceh dan sesi konsultasi virtual.
          </p>
        </div>

        <button
          onClick={() => alert("Form reservasi konsultasi baru")}
          className="px-4 py-2.5 rounded-xl bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors shadow-xs shrink-0 self-start sm:self-auto"
        >
          + Jadwalkan Temu Baru
        </button>
      </div>

      {/* Consultations List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {consultations.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-brown bg-sand px-2 py-0.5 rounded">
                  {c.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${c.statusColor}`}
                >
                  {c.status}
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-black mb-2">
                {c.coupleNames}
              </h3>

              <div className="space-y-2 text-xs text-black/75 font-light mb-4">
                <div className="flex items-center gap-2 text-brown font-medium">
                  <Calendar className="w-3.5 h-3.5 text-forest-green shrink-0" />
                  <span>{c.scheduledDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-warm-taupe shrink-0" />
                  <span>{c.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-warm-taupe shrink-0" />
                  <span>{c.type}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F6F1] text-xs space-y-1 mb-4">
                <p className="text-black/70">
                  Minat: <strong className="text-forest-green">{c.venueInterest}</strong>
                </p>
                <p className="text-warm-taupe text-[11px]">
                  Lead Planner: <strong>{c.leadPlanner}</strong>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-taupe/20 flex items-center justify-between text-xs">
              <span className="text-warm-taupe text-[10px]">{c.hotline}</span>
              <a
                href={`https://wa.me/${c.hotline.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-green font-semibold hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Pengingat WA</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
