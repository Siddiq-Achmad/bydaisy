"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Filter,
  Plus,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  X,
  Loader2,
  Search,
} from "lucide-react";

interface CalendarEventItem {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  venue: string;
  package: string;
  crewCount: string;
  lead: string;
  notes?: string;
  color?: string;
  badge?: string;
  badgeColor?: string;
}

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<CalendarEventItem>>({
    title: "",
    type: "hari-h",
    date: "14 November 2026",
    time: "09.00 - 17.00 WIB",
    venue: "Sribudaya Resort, Lampeuneurut",
    package: "Royal Sribudaya (2.000 Pax)",
    crewCount: "15 Personil",
    lead: "Daisy Iskandar",
    notes: "",
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/calendar");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEvents(json.data);
      }
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      title: "",
      type: "hari-h",
      date: "14 November 2026",
      time: "09.00 - 17.00 WIB",
      venue: "Sribudaya Resort, Lampeuneurut",
      package: "Royal Sribudaya (2.000 Pax)",
      crewCount: "15 Personil",
      lead: "Daisy Iskandar",
      notes: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: CalendarEventItem) => {
    setModalMode("edit");
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      if (modalMode === "create") {
        const res = await fetch("/api/calendar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setEvents((prev) => [result.data, ...prev]);
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Agenda acara berhasil ditambahkan." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal menyimpan agenda." });
        }
      } else {
        const res = await fetch("/api/calendar", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setEvents((prev) =>
            prev.map((ev) => (ev.id === formData.id ? { ...ev, ...result.data } : ev))
          );
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Agenda acara berhasil diperbarui." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal memperbarui agenda." });
        }
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setSubmitting(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus agenda "${title}" dari kalender operasional?`)) return;

    try {
      const res = await fetch(`/api/calendar?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setEvents((prev) => prev.filter((ev) => ev.id !== id));
        setFeedback({ type: "success", message: "Agenda berhasil dihapus." });
      } else {
        setFeedback({ type: "error", message: result.error || "Gagal menghapus agenda." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const filteredEvents = events.filter((ev) => {
    const q = search.toLowerCase();
    const matchSearch =
      ev.title.toLowerCase().includes(q) ||
      ev.venue.toLowerCase().includes(q) ||
      ev.lead.toLowerCase().includes(q) ||
      ev.package.toLowerCase().includes(q);

    if (filterType === "all") return matchSearch;
    return matchSearch && ev.type === filterType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              CRUD Database • Kalender Jadwal & Manajemen Kru
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Kalender Acara & Technical Meeting
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Penjadwalan hari H resepsi, gladi bersih H-1, briefing TM, serta penugasan kru lapangan ByDaisy.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Agenda Jadwal</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-medium border flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="text-black/50 hover:text-black">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Controls: Search & Type Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-taupe/30 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari agenda, nama pasangan, venue, atau lead planner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-canvas rounded-xl border border-taupe/30 text-black focus:outline-none focus:border-forest-green"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-warm-taupe" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-xs bg-canvas rounded-xl border border-taupe/30 text-black focus:outline-none focus:border-forest-green"
          >
            <option value="all">Semua Jenis Agenda</option>
            <option value="hari-h">Hari H Resepsi</option>
            <option value="gladi">Gladi Bersih H-1</option>
            <option value="tm">Technical Meeting (TM)</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="p-16 text-center text-warm-taupe flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-forest-green" />
          <span className="text-xs">Memuat kalender operasional dari JSON...</span>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-white border border-taupe/30 text-warm-taupe text-xs">
          Belum ada agenda yang sesuai dengan pencarian atau filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className={`p-6 rounded-2xl bg-white border shadow-xs flex flex-col justify-between hover:border-forest-green/50 transition-all ${
                ev.color || "border-taupe/30"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                      ev.badgeColor || "bg-forest-green text-white"
                    }`}
                  >
                    {ev.badge || ev.type}
                  </span>
                  <span className="text-[10px] font-mono text-warm-taupe">ID: {ev.id}</span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-black mb-1">
                  {ev.title}
                </h3>
                <p className="text-xs font-medium text-forest-green mb-3">{ev.package}</p>

                <div className="space-y-1.5 text-xs text-black/75 font-light my-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span className="font-medium text-black">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-warm-taupe shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-warm-taupe shrink-0" />
                    <span>{ev.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-forest-green shrink-0" />
                    <span>
                      Alokasi: <strong className="font-medium text-black">{ev.crewCount}</strong> • Lead:{" "}
                      <strong className="font-medium text-forest-green">{ev.lead}</strong>
                    </span>
                  </div>
                </div>

                {ev.notes && (
                  <div className="p-3 rounded-xl bg-sand/40 text-[11px] text-black/70 italic border border-taupe/20 mb-4">
                    "{ev.notes}"
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-taupe/20 flex items-center justify-between">
                <span className="text-[10px] text-warm-taupe">Terkoneksi ke data/calendar.json</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(ev)}
                    className="p-1.5 rounded-lg border border-taupe/40 text-black hover:bg-sand transition-colors cursor-pointer"
                    title="Edit Agenda"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id, ev.title)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Hapus Agenda"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-xl bg-canvas border border-taupe/40 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-taupe/30 flex items-center justify-between bg-white">
              <div>
                <h3 className="font-serif text-xl text-black font-semibold">
                  {modalMode === "create" ? "Tambah Agenda Jadwal Baru" : "Edit Agenda Acara"}
                </h3>
                <p className="text-xs text-black/60 font-light mt-0.5">
                  Tersimpan di data/calendar.json dan kalender kru ByDaisy.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-sand text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  Judul Acara / Agenda *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Resepsi Royal: Jihad & Nanda"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Jenis Agenda
                  </label>
                  <select
                    value={formData.type || "hari-h"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    <option value="hari-h">Hari H Resepsi</option>
                    <option value="gladi">Gladi Bersih H-1</option>
                    <option value="tm">Technical Meeting (TM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Paket / Layanan
                  </label>
                  <input
                    type="text"
                    value={formData.package || ""}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    placeholder="Royal Sribudaya (2.000 Pax)"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Tanggal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date || ""}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="14 November 2026"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Waktu / Jam
                  </label>
                  <input
                    type="text"
                    value={formData.time || ""}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="09.00 - 17.00 WIB"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Venue / Gedung
                  </label>
                  <input
                    type="text"
                    value={formData.venue || ""}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="Sribudaya / Hermes"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Alokasi Kru
                  </label>
                  <input
                    type="text"
                    value={formData.crewCount || "10 Personil"}
                    onChange={(e) => setFormData({ ...formData, crewCount: e.target.value })}
                    placeholder="12 Personil"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Lead Planner
                  </label>
                  <input
                    type="text"
                    value={formData.lead || "Daisy Iskandar"}
                    onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                    placeholder="Daisy Iskandar"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  Catatan Briefing Kru & Eksekusi
                </label>
                <textarea
                  rows={3}
                  value={formData.notes || ""}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Instruksi sound, alur kirab adat pengantin, atau persiapan genset..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green resize-none"
                />
              </div>

              <div className="pt-4 border-t border-taupe/30 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-black hover:bg-sand rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold text-canvas bg-forest-green hover:bg-forest-hover rounded-xl transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{modalMode === "create" ? "Simpan Agenda" : "Perbarui Agenda"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
