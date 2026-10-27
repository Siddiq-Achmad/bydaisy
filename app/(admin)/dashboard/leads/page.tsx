"use client";

import React, { useState, useEffect } from "react";
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
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  DollarSign,
  Users,
} from "lucide-react";

interface LeadItem {
  id: string;
  clientName: string;
  phone: string;
  source: string;
  weddingDate: string;
  venue: string;
  guestCount: string;
  packageInterest: string;
  budgetRange: string;
  status: string;
  createdAt?: string;
  notes?: string;
}

const statusOptions = [
  { label: "Baru Masuk", value: "Baru Masuk", color: "bg-forest-green/10 text-forest-green border-forest-green/30" },
  { label: "Jadwal Konsultasi", value: "Jadwal Konsultasi", color: "bg-blue-100 text-blue-900 border-blue-300" },
  { label: "Proposal Dikirim", value: "Proposal Dikirim", color: "bg-amber-100 text-amber-900 border-amber-300" },
  { label: "Terkonfirmasi DP", value: "Terkonfirmasi DP", color: "bg-emerald-100 text-emerald-900 border-emerald-300" },
  { label: "Selesai", value: "Selesai", color: "bg-gray-100 text-gray-800 border-gray-300" },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<LeadItem>>({
    clientName: "",
    phone: "+62 8",
    source: "Hotline 1 (+62 822-7709-4277)",
    weddingDate: "2027",
    venue: "Sribudaya Resort",
    guestCount: "500 Tamu",
    packageInterest: "All-In Signature Gold Intimate (Rp 115.000.000)",
    budgetRange: "Rp 100 - 150 Juta",
    status: "Baru Masuk",
    notes: "",
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setLeads(json.data);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      clientName: "",
      phone: "+62 8",
      source: "Hotline 1 (+62 822-7709-4277)",
      weddingDate: "2027",
      venue: "Sribudaya Resort",
      guestCount: "500 Tamu",
      packageInterest: "All-In Signature Gold Intimate (Rp 115.000.000)",
      budgetRange: "Rp 100 - 150 Juta",
      status: "Baru Masuk",
      notes: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: LeadItem) => {
    setModalMode("edit");
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        setLeads((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        setFeedback({ type: "success", message: `Status prospek berhasil diubah menjadi "${newStatus}".` });
      } else {
        setFeedback({ type: "error", message: result.error || "Gagal mengubah status." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      if (modalMode === "create") {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setLeads((prev) => [result.data, ...prev]);
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Prospek baru berhasil dicatat." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal menyimpan prospek." });
        }
      } else {
        const res = await fetch("/api/leads", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setLeads((prev) =>
            prev.map((item) => (item.id === formData.id ? { ...item, ...result.data } : item))
          );
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Data prospek berhasil diperbarui." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal memperbarui prospek." });
        }
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Terjadi kesalahan server." });
    } finally {
      setSubmitting(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Hapus prospek "${name}" dari antrean leads?`)) return;

    try {
      const res = await fetch(`/api/leads?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setLeads((prev) => prev.filter((item) => item.id !== id));
        setFeedback({ type: "success", message: "Prospek berhasil dihapus." });
      } else {
        setFeedback({ type: "error", message: result.error || "Gagal menghapus prospek." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const q = search.toLowerCase();
    const matchSearch =
      (lead.clientName && lead.clientName.toLowerCase().includes(q)) ||
      (lead.phone && lead.phone.toLowerCase().includes(q)) ||
      (lead.venue && lead.venue.toLowerCase().includes(q)) ||
      (lead.packageInterest && lead.packageInterest.toLowerCase().includes(q));

    if (filterStatus === "all") return matchSearch;
    return matchSearch && lead.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    const match = statusOptions.find((s) => s.value === status);
    return match ? match.color : "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green animate-pulse"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              CRUD Database • Real-Time Pipeline Konsultasi
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Inquiry & Prospek Klien Masuk
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Data reservasi dari Website Sheet, WhatsApp Direct (+62 822-7709-4277 / +62 821-6222-1468), dan walk-in.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-forest-green text-canvas text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Prospek Manual</span>
          </button>
        </div>
      </div>

      {/* Pipeline Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-taupe/30 shadow-xs">
          <span className="text-[11px] text-warm-taupe block mb-1">Total Prospek Masuk</span>
          <span className="font-serif text-2xl font-bold text-black">{leads.length} Pasangan</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-taupe/30 shadow-xs">
          <span className="text-[11px] text-warm-taupe block mb-1">Baru Masuk</span>
          <span className="font-serif text-2xl font-bold text-forest-green">
            {leads.filter((l) => l.status === "Baru Masuk").length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-taupe/30 shadow-xs">
          <span className="text-[11px] text-warm-taupe block mb-1">Jadwal Temu Studio</span>
          <span className="font-serif text-2xl font-bold text-blue-700">
            {leads.filter((l) => l.status === "Jadwal Konsultasi").length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-taupe/30 shadow-xs">
          <span className="text-[11px] text-warm-taupe block mb-1">Terkonfirmasi DP</span>
          <span className="font-serif text-2xl font-bold text-emerald-700">
            {leads.filter((l) => l.status === "Terkonfirmasi DP").length}
          </span>
        </div>
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

      {/* Controls: Search & Status Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-taupe/30 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama calon mempelai, nomor WhatsApp, atau venue impian..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-canvas rounded-xl border border-taupe/30 text-black focus:outline-none focus:border-forest-green"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-warm-taupe" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-canvas rounded-xl border border-taupe/30 text-black focus:outline-none focus:border-forest-green"
          >
            <option value="all">Semua Tahap Pipeline</option>
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="p-16 text-center text-warm-taupe flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-forest-green" />
          <span className="text-xs">Memuat data prospek dari data/leads.json...</span>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-white border border-taupe/30 text-warm-taupe text-xs">
          Belum ada inquiry yang cocok dengan filter.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white border border-taupe/30 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-taupe/20 bg-[#FBF9F5] text-[11px] font-semibold uppercase tracking-wider text-black">
                  <th className="py-3.5 px-4">Calon Mempelai</th>
                  <th className="py-3.5 px-4">Kontak & Jalur</th>
                  <th className="py-3.5 px-4">Rencana Acara</th>
                  <th className="py-3.5 px-4">Paket Diminati</th>
                  <th className="py-3.5 px-4">Status Pipeline</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-taupe/15">
                {filteredLeads.map((lead) => {
                  const rawPhone = (lead.phone || "").replace(/[^0-9]/g, "");
                  const waUrl = rawPhone
                    ? `https://wa.me/${rawPhone.startsWith("0") ? "62" + rawPhone.slice(1) : rawPhone}`
                    : "#";

                  return (
                    <tr key={lead.id} className="hover:bg-sand/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-black text-sm font-serif">
                          {lead.clientName}
                        </div>
                        <span className="text-[10px] text-warm-taupe font-mono">
                          ID: {lead.id}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-forest-green hover:underline flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{lead.phone}</span>
                        </a>
                        <span className="text-[10px] text-warm-taupe block mt-0.5 truncate max-w-[160px]">
                          {lead.source}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-black font-medium">
                          <Calendar className="w-3.5 h-3.5 text-forest-green flex-shrink-0" />
                          <span>{lead.weddingDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-black/70 mt-0.5">
                          <MapPin className="w-3 h-3 text-warm-taupe flex-shrink-0" />
                          <span className="truncate max-w-[150px]">{lead.venue}</span>
                        </div>
                        <div className="text-[10px] text-warm-taupe mt-0.5">
                          {lead.guestCount}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-medium text-black block line-clamp-1">
                          {lead.packageInterest}
                        </span>
                        {lead.notes && (
                          <span className="text-[10px] text-black/60 italic block line-clamp-1 mt-0.5">
                            "{lead.notes}"
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${getStatusBadge(
                            lead.status
                          )}`}
                        >
                          {statusOptions.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-forest-green/30 text-forest-green hover:bg-forest-green hover:text-white transition-colors"
                            title="Chat WhatsApp Klien"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => openEditModal(lead)}
                            className="p-1.5 rounded-lg border border-taupe/40 text-black hover:bg-sand transition-colors cursor-pointer"
                            title="Edit Data Prospek"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id, lead.clientName)}
                            className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Hapus Prospek"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
                  {modalMode === "create" ? "Tambah Prospek Klien Manual" : "Edit Detail Prospek"}
                </h3>
                <p className="text-xs text-black/60 font-light mt-0.5">
                  Tersimpan di data/leads.json untuk penanganan tim concierge ByDaisy.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Nama Calon Pengantin *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName || ""}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Contoh: Sarah & Zulfikar"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+62 822-xxxx-xxxx"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Target Tanggal
                  </label>
                  <input
                    type="text"
                    value={formData.weddingDate || ""}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    placeholder="14 Feb 2027"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Venue Rencana
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
                    Estimasi Tamu
                  </label>
                  <input
                    type="text"
                    value={formData.guestCount || ""}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    placeholder="1.000 Tamu"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Paket Diminati
                  </label>
                  <input
                    type="text"
                    value={formData.packageInterest || ""}
                    onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                    placeholder="Sribudaya Platinum / All-In Intimate"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Tahap Pipeline
                  </label>
                  <select
                    value={formData.status || "Baru Masuk"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    {statusOptions.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  Sumber Masuk (Source)
                </label>
                <input
                  type="text"
                  value={formData.source || ""}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="Hotline 1 (+62 822-7709-4277) / Walk-in Studio"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  Catatan Khusus Klien
                </label>
                <textarea
                  rows={3}
                  value={formData.notes || ""}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Permintaan khusus mengenai adat, jamuan, atau jadwal temu keluarga..."
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
                  <span>{modalMode === "create" ? "Simpan Prospek" : "Perbarui Prospek"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
