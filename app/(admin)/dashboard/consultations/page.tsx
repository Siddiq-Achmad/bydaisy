"use client";

import React, { useState, useEffect } from "react";
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
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  Search,
} from "lucide-react";

interface ConsultationItem {
  id: string;
  coupleNames: string;
  scheduledDate: string;
  time: string;
  type: string;
  venueInterest: string;
  leadPlanner: string;
  status: string;
  statusColor?: string;
  hotline: string;
  notes?: string;
}

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ConsultationItem>>({
    coupleNames: "",
    scheduledDate: "Selasa, 3 November 2026",
    time: "14.00 - 15.30 WIB",
    type: "Tatap Muka di Studio Lambhuk",
    venueInterest: "Sribudaya Resort (1.000 Pax)",
    leadPlanner: "Daisy Iskandar",
    status: "Terkonfirmasi",
    hotline: "+62 822-7709-4277",
    notes: "",
  });

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/consultations");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setConsultations(json.data);
      }
    } catch (err) {
      console.error("Failed to load consultations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      coupleNames: "",
      scheduledDate: "Selasa, 3 November 2026",
      time: "14.00 - 15.30 WIB",
      type: "Tatap Muka di Studio Lambhuk",
      venueInterest: "Sribudaya Resort (1.000 Pax)",
      leadPlanner: "Daisy Iskandar",
      status: "Terkonfirmasi",
      hotline: "+62 822-7709-4277",
      notes: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ConsultationItem) => {
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
        const res = await fetch("/api/consultations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setConsultations((prev) => [result.data, ...prev]);
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Jadwal temu konsultasi berhasil dibuat." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal menyimpan jadwal." });
        }
      } else {
        const res = await fetch("/api/consultations", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setConsultations((prev) =>
            prev.map((c) => (c.id === formData.id ? { ...c, ...result.data } : c))
          );
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Jadwal temu berhasil diperbarui." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal memperbarui data." });
        }
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setSubmitting(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleDelete = async (id: string, couple: string) => {
    if (!window.confirm(`Hapus jadwal konsultasi "${couple}"?`)) return;

    try {
      const res = await fetch(`/api/consultations?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setConsultations((prev) => prev.filter((c) => c.id !== id));
        setFeedback({ type: "success", message: "Jadwal konsultasi berhasil dihapus." });
      } else {
        setFeedback({ type: "error", message: result.error || "Gagal menghapus jadwal." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const filtered = consultations.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.coupleNames.toLowerCase().includes(q) ||
      c.venueInterest.toLowerCase().includes(q) ||
      c.leadPlanner.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              CRUD Database • Sesi Temu Privat & Konsultasi Anggaran
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
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Jadwalkan Temu Baru</span>
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

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari berdasarkan nama calon mempelai, venue, atau perencana..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-taupe/30 text-black focus:outline-none focus:border-forest-green shadow-xs"
        />
      </div>

      {/* Consultations List */}
      {loading ? (
        <div className="p-16 text-center text-warm-taupe flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-forest-green" />
          <span className="text-xs">Memuat sesi konsultasi dari JSON...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-white border border-taupe/30 text-warm-taupe text-xs">
          Belum ada jadwal konsultasi yang sesuai dengan pencarian.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cs) => {
            const rawPhone = cs.hotline ? cs.hotline.replace(/[^0-9]/g, "") : "";
            const waUrl = rawPhone
              ? `https://wa.me/${rawPhone.startsWith("0") ? "62" + rawPhone.slice(1) : rawPhone}`
              : "#";

            return (
              <div
                key={cs.id}
                className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold text-forest-green bg-forest-green/10 px-2.5 py-0.5 rounded-full">
                      {cs.status}
                    </span>
                    <span className="text-[10px] font-mono text-warm-taupe">ID: {cs.id}</span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-black mb-1 group-hover:text-forest-green transition-colors">
                    {cs.coupleNames}
                  </h3>

                  <div className="space-y-1.5 text-xs text-black/75 font-light my-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-forest-green shrink-0" />
                      <span className="font-medium text-black">{cs.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-warm-taupe shrink-0" />
                      <span>{cs.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-warm-taupe shrink-0" />
                      <span>{cs.type}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8F6F1] text-[11px] space-y-1 mb-4">
                    <div className="text-black font-medium">
                      Peminatan: <span className="font-light text-warm-taupe">{cs.venueInterest}</span>
                    </div>
                    <div className="text-black font-medium">
                      Lead Planner: <span className="font-light text-forest-green">{cs.leadPlanner}</span>
                    </div>
                    {cs.notes && (
                      <p className="text-black/60 italic text-[10px] pt-1 border-t border-taupe/20 mt-1">
                        "{cs.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-taupe/20 flex items-center justify-between">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-forest-green font-semibold hover:underline flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(cs)}
                      className="p-1.5 rounded-lg border border-taupe/40 text-black hover:bg-sand transition-colors cursor-pointer"
                      title="Edit Sesi"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cs.id, cs.coupleNames)}
                      className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Hapus Sesi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
                  {modalMode === "create" ? "Jadwalkan Konsultasi Baru" : "Edit Sesi Konsultasi"}
                </h3>
                <p className="text-xs text-black/60 font-light mt-0.5">
                  Tersimpan di data/consultations.json dan sinkron dengan tim perencana.
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
                  Nama Pasangan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.coupleNames || ""}
                  onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                  placeholder="Contoh: Cut Sarah & Zulfikar"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Hari & Tanggal
                  </label>
                  <input
                    type="text"
                    value={formData.scheduledDate || ""}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    placeholder="Selasa, 28 Oktober 2026"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Jam Sesi
                  </label>
                  <input
                    type="text"
                    value={formData.time || ""}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="14.00 - 15.30 WIB"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Format Temu
                  </label>
                  <select
                    value={formData.type || "Tatap Muka di Studio Lambhuk"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    <option value="Tatap Muka di Studio Lambhuk">Tatap Muka di Studio Lambhuk</option>
                    <option value="Google Meet / Virtual Sesi">Google Meet / Virtual Sesi</option>
                    <option value="On-Site Venue Survey">On-Site Venue Survey</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Lead Wedding Planner
                  </label>
                  <input
                    type="text"
                    value={formData.leadPlanner || "Daisy Iskandar"}
                    onChange={(e) => setFormData({ ...formData, leadPlanner: e.target.value })}
                    placeholder="Daisy Iskandar / Sarah Amelia"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Minat Venue / Paket
                  </label>
                  <input
                    type="text"
                    value={formData.venueInterest || ""}
                    onChange={(e) => setFormData({ ...formData, venueInterest: e.target.value })}
                    placeholder="Sribudaya Resort (1.000 Pax)"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Hotline Kontak
                  </label>
                  <input
                    type="text"
                    value={formData.hotline || "+62 822-7709-4277"}
                    onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  Catatan Bahasan
                </label>
                <textarea
                  rows={3}
                  value={formData.notes || ""}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Agenda khusus, permintaan keluarga, atau kebutuhan adat..."
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
                  <span>{modalMode === "create" ? "Simpan Jadwal" : "Perbarui Jadwal"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
