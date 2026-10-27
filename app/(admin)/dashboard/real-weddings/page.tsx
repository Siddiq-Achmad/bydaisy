"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  ExternalLink,
  MapPin,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Search,
  Filter,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

interface WeddingItem {
  id: string;
  title: string;
  couple: string;
  date: string;
  venue: string;
  guests: string;
  category: string;
  categoryLabel?: string;
  service?: string;
  image: string;
  story: string;
  highlights?: string[];
  vendors: string;
  status: string;
}

export default function AdminRealWeddingsPage() {
  const [weddings, setWeddings] = useState<WeddingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<WeddingItem>>({
    title: "",
    couple: "",
    date: "2026",
    venue: "",
    guests: "500 Tamu",
    category: "adat-aceh",
    categoryLabel: "Tradisi Aceh Megah",
    service: "All-In Royal Planner & WO",
    image: "/assets/images/portfolio-coordinator-bride.jpg",
    story: "",
    vendors: "ByDaisy Spatial Studio & Floristry, BP Projectbooth",
    status: "Published",
  });

  // Fetch Weddings
  const fetchWeddings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/weddings");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setWeddings(json.data);
      }
    } catch (err) {
      console.error("Failed to load weddings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeddings();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      title: "",
      couple: "",
      date: "2026",
      venue: "",
      guests: "500 Tamu",
      category: "adat-aceh",
      categoryLabel: "Tradisi Aceh Megah",
      service: "All-In Royal Planner & WO",
      image: "/assets/images/portfolio-coordinator-bride.jpg",
      story: "",
      vendors: "ByDaisy Spatial Studio & Floristry, BP Projectbooth",
      status: "Published",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: WeddingItem) => {
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
        const res = await fetch("/api/weddings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setWeddings((prev) => [result.data, ...prev]);
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Kisah pernikahan berhasil ditambahkan." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal menyimpan data." });
        }
      } else {
        const res = await fetch("/api/weddings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setWeddings((prev) =>
            prev.map((item) => (item.id === formData.id ? { ...item, ...result.data } : item))
          );
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Kisah pernikahan berhasil diperbarui." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal memperbarui data." });
        }
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Terjadi kesalahan koneksi." });
    } finally {
      setSubmitting(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleDelete = async (id: string, coupleName: string) => {
    if (!window.confirm(`Hapus kisah pernikahan "${coupleName}" dari database?`)) return;

    try {
      const res = await fetch(`/api/weddings?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setWeddings((prev) => prev.filter((item) => item.id !== id));
        setFeedback({ type: "success", message: "Kisah pernikahan berhasil dihapus." });
      } else {
        setFeedback({ type: "error", message: result.error || "Gagal menghapus data." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const filteredWeddings = weddings.filter((w) => {
    const q = search.toLowerCase();
    const matchSearch =
      w.title.toLowerCase().includes(q) ||
      w.couple.toLowerCase().includes(q) ||
      w.venue.toLowerCase().includes(q) ||
      (w.vendors && w.vendors.toLowerCase().includes(q));

    if (categoryFilter === "all") return matchSearch;
    return matchSearch && w.category === categoryFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              CRUD Database • Data & Code Separated
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Real Weddings & Portofolio
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Kelola dokumentasi kisah pengantin, vendor rekanan yang terlibat, serta skala undangan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-forest-green text-canvas text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kisah Baru</span>
          </button>
          <Link
            href="/portfolio"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2"
          >
            <span>Live Halaman Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5 text-forest-green" />
          </Link>
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

      {/* Controls: Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-taupe/30 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari berdasarkan judul, nama pasangan, venue, atau vendor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-canvas rounded-xl border border-taupe/30 text-black focus:outline-none focus:border-forest-green"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-warm-taupe" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-canvas rounded-xl border border-taupe/30 text-black focus:outline-none focus:border-forest-green"
          >
            <option value="all">Semua Kategori</option>
            <option value="adat-aceh">Adat Aceh</option>
            <option value="modern-ballroom">Modern Ballroom</option>
            <option value="outdoor-garden">Outdoor & Garden</option>
            <option value="intimate">Intimate Heritage</option>
            <option value="minang">Adat Minangkabau</option>
            <option value="melayu">Adat Melayu</option>
          </select>
        </div>
      </div>

      {/* Grid Cards */}
      {loading ? (
        <div className="p-16 text-center text-warm-taupe flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-forest-green" />
          <span className="text-xs">Memuat katalog real weddings dari JSON...</span>
        </div>
      ) : filteredWeddings.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-white border border-taupe/30 text-warm-taupe text-xs">
          Tidak ada kisah pernikahan yang sesuai dengan kata kunci atau filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWeddings.map((s) => (
            <div
              key={s.id}
              className="overflow-hidden rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/50 transition-all group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-sand">
                  <img
                    src={s.image || "/assets/images/portfolio-coordinator-bride.jpg"}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                      {s.categoryLabel || s.category}
                    </span>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                    {s.date}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-serif text-lg font-semibold text-black line-clamp-1">
                      {s.title}
                    </h3>
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        s.status === "Published"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-brown mb-3">{s.couple}</p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/75 font-light mb-3">
                    <span className="flex items-center gap-1 font-semibold text-black">
                      <Users className="w-3.5 h-3.5 text-forest-green" />
                      {s.guests}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-warm-taupe" />
                      <span className="truncate max-w-[140px]">{s.venue}</span>
                    </span>
                  </div>

                  <p className="text-xs text-black/70 font-light leading-relaxed mb-4 line-clamp-3">
                    {s.story}
                  </p>

                  {s.vendors && (
                    <div className="p-2.5 rounded-xl bg-[#F8F6F1] text-[10px] text-warm-taupe">
                      <strong className="text-black font-medium block mb-0.5">
                        Vendor Terlibat:
                      </strong>
                      <span className="line-clamp-2">{s.vendors}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 border-t border-taupe/20 flex items-center justify-between bg-sand/20">
                <span className="text-[10px] text-warm-taupe">ID: {s.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(s)}
                    className="p-1.5 rounded-lg border border-taupe/40 text-black hover:bg-sand hover:text-forest-green transition-colors cursor-pointer"
                    title="Edit Kisah"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id, s.couple)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Hapus Kisah"
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

          <div className="relative z-10 w-full max-w-2xl bg-canvas border border-taupe/40 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-taupe/30 flex items-center justify-between bg-white">
              <div>
                <h3 className="font-serif text-xl text-black font-semibold">
                  {modalMode === "create" ? "Tambah Kisah Pernikahan" : "Edit Kisah Pernikahan"}
                </h3>
                <p className="text-xs text-black/60 font-light mt-0.5">
                  Tersimpan langsung di data/real-weddings.json dan REST API.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-sand text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Judul Acara *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Contoh: The Royal Acehnese Heritage"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Nama Pasangan *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.couple || ""}
                    onChange={(e) => setFormData({ ...formData, couple: e.target.value })}
                    placeholder="Contoh: T. Teuku & Cut Nyak"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Venue / Lokasi *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.venue || ""}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="Hermes Palace / Sribudaya"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Jumlah Undangan
                  </label>
                  <input
                    type="text"
                    value={formData.guests || ""}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    placeholder="1.000 Tamu"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Tahun / Tanggal
                  </label>
                  <input
                    type="text"
                    value={formData.date || ""}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.category || "adat-aceh"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    <option value="adat-aceh">Adat Aceh</option>
                    <option value="modern-ballroom">Modern Ballroom</option>
                    <option value="outdoor-garden">Outdoor & Garden</option>
                    <option value="intimate">Intimate Heritage</option>
                    <option value="minang">Adat Minangkabau</option>
                    <option value="melayu">Adat Melayu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Label Kategori Tampilan
                  </label>
                  <input
                    type="text"
                    value={formData.categoryLabel || ""}
                    onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                    placeholder="Adat Aceh Tradisional / Grand Ballroom"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  URL Path Gambar
                </label>
                <input
                  type="text"
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/assets/images/portfolio-coordinator-bride.jpg"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  Kisah & Deskripsi Pernikahan
                </label>
                <textarea
                  rows={3}
                  value={formData.story || ""}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Ceritakan prosesi adat, konsep tata ruang, dan keunikan momen pernikahan..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Vendor yang Terlibat
                  </label>
                  <input
                    type="text"
                    value={formData.vendors || ""}
                    onChange={(e) => setFormData({ ...formData, vendors: e.target.value })}
                    placeholder="ByDaisy Decor, BP Projectbooth, HS Floral"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status || "Published"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    <option value="Published">Published (Tayang)</option>
                    <option value="Draft">Draft (Arsip Internal)</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
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
                  <span>{modalMode === "create" ? "Simpan Kisah" : "Perbarui Kisah"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
