"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import initialSettings from "@/data/settings.json";
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
  Loader2,
  X,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings");
      const json = await res.json();
      if (json.success && json.data) {
        setSettings(json.data);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const result = await res.json();
      if (result.success) {
        setFeedback({ type: "success", message: "Pengaturan studio berhasil disimpan ke data/settings.json." });
      } else {
        setFeedback({ type: "error", message: result.error || "Gagal menyimpan pengaturan." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
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

        {feedback && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              feedback.type === "success"
                ? "bg-forest-green text-white"
                : "bg-red-600 text-white"
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{feedback.message}</span>
          </span>
        )}
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSave}
        className="p-6 sm:p-8 rounded-2xl bg-white border border-taupe/30 shadow-xs space-y-6"
      >
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
              Tagline Brand
            </label>
            <input
              type="text"
              value={settings.tagline || ""}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
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
              Jam Operasional Konsultasi
            </label>
            <input
              type="text"
              value={settings.hours}
              onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
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

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-1.5">
              Rekening Resmi Pembayaran DP
            </label>
            <input
              type="text"
              value={settings.bankAccount || ""}
              onChange={(e) => setSettings({ ...settings, bankAccount: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-xl border border-taupe/40 px-3.5 py-2.5 bg-[#F8F6F1] text-black focus:outline-none focus:border-forest-green"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-black mb-1.5">
              Nomor Izin Legalitas Usaha
            </label>
            <input
              type="text"
              value={settings.licenseNumber || ""}
              onChange={(e) => setSettings({ ...settings, licenseNumber: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-xl border border-taupe/40 px-3.5 py-2.5 bg-[#F8F6F1] text-black focus:outline-none focus:border-forest-green"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-taupe/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-warm-taupe">
            Tersinkronisasi otomatis dengan REST API /api/settings dan data/settings.json
          </span>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saving ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
