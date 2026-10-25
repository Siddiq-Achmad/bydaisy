"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Phone,
  MapPin,
  Mail,
  Check,
  Save,
  Globe,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    studioName: "ByDaisy Planner",
    address: "Jl. Batee Suasa, Lambhuk, Banda Aceh, Aceh",
    hotline1: "+62 822-7709-4277",
    hotline2: "+62 821-6222-1468",
    instagram: "@bydaisyplanner",
    email: "concierge@bydaisy.com",
    hours: "Senin – Minggu: 09.00 – 21.00 WIB",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Konfigurasi Studio & Hotline Kontak
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Studio Settings & Informasi Kontak
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Pengaturan nomor WhatsApp, alamat studio, dan media sosial yang tersinkronisasi ke seluruh halaman.
          </p>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-green text-white text-xs font-semibold">
            <Check className="w-3.5 h-3.5" />
            <span>Pengaturan Berhasil Disimpan</span>
          </span>
        )}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-white border border-taupe/30 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-1.5">
              Nama Brand Studio
            </label>
            <input
              type="text"
              value={settings.studioName}
              onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-xl border border-taupe/40 px-3.5 py-2.5 bg-[#F8F6F1] text-black focus:outline-none focus:border-forest-green"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-1.5">
              Alamat Studio Resmi
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-xl border border-taupe/40 px-3.5 py-2.5 bg-[#F8F6F1] text-black focus:outline-none focus:border-forest-green"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-1.5">
              Hotline 1 (Primary WhatsApp)
            </label>
            <input
              type="text"
              value={settings.hotline1}
              onChange={(e) => setSettings({ ...settings, hotline1: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-xl border border-taupe/40 px-3.5 py-2.5 bg-[#F8F6F1] text-black focus:outline-none focus:border-forest-green"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-1.5">
              Hotline 2 (Secondary WhatsApp)
            </label>
            <input
              type="text"
              value={settings.hotline2}
              onChange={(e) => setSettings({ ...settings, hotline2: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-xl border border-taupe/40 px-3.5 py-2.5 bg-[#F8F6F1] text-black focus:outline-none focus:border-forest-green"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-1.5">
              Instagram Resmi Studio
            </label>
            <input
              type="text"
              value={settings.instagram}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-xl border border-taupe/40 px-3.5 py-2.5 bg-[#F8F6F1] text-black focus:outline-none focus:border-forest-green"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-1.5">
              Email Concierge
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-xl border border-taupe/40 px-3.5 py-2.5 bg-[#F8F6F1] text-black focus:outline-none focus:border-forest-green"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-taupe/20 flex items-center justify-between">
          <span className="text-xs text-warm-taupe">
            Tersinkronisasi otomatis dengan Schema.org JSON-LD dan metadata layout
          </span>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center gap-2 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
}
