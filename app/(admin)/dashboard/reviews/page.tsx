"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  ExternalLink,
  Heart,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Loader2,
  MapPin,
  Quote,
} from "lucide-react";

interface ReviewItem {
  id: string;
  couple: string;
  date: string;
  venue: string;
  theme: string;
  rating: number;
  image?: string;
  quote: string;
  service: string;
  status: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ReviewItem>>({
    couple: "",
    date: "Oktober 2026",
    venue: "Hermes Palace Hotel",
    theme: "Royal Acehnese Heritage",
    rating: 5,
    image: "/assets/images/review-lounge-relax.jpg",
    quote: "",
    service: "All-In Royal Planner & WO",
    status: "Featured",
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setReviews(json.data);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      couple: "",
      date: "Oktober 2026",
      venue: "Hermes Palace Hotel",
      theme: "Royal Acehnese Heritage",
      rating: 5,
      image: "/assets/images/review-lounge-relax.jpg",
      quote: "",
      service: "All-In Royal Planner & WO",
      status: "Featured",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ReviewItem) => {
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
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setReviews((prev) => [result.data, ...prev]);
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Ulasan pengantin berhasil ditambahkan." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal menyimpan ulasan." });
        }
      } else {
        const res = await fetch("/api/reviews", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setReviews((prev) =>
            prev.map((item) => (item.id === formData.id ? { ...item, ...result.data } : item))
          );
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Ulasan pengantin berhasil diperbarui." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal memperbarui ulasan." });
        }
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Terjadi kesalahan server." });
    } finally {
      setSubmitting(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleDelete = async (id: string, couple: string) => {
    if (!window.confirm(`Hapus ulasan dari "${couple}"?`)) return;

    try {
      const res = await fetch(`/api/reviews?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setReviews((prev) => prev.filter((item) => item.id !== id));
        setFeedback({ type: "success", message: "Ulasan berhasil dihapus." });
      } else {
        setFeedback({ type: "error", message: result.error || "Gagal menghapus ulasan." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.couple.toLowerCase().includes(q) ||
      (r.venue && r.venue.toLowerCase().includes(q)) ||
      (r.quote && r.quote.toLowerCase().includes(q)) ||
      (r.service && r.service.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              CRUD Database • Love Letters & Testimonials
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Love Letters & Ulasan Pengantin
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Kelola testimoni, kutipan apresiasi, dan bintang ulasan pengantin ByDaisy.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-forest-green text-canvas text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Ulasan Baru</span>
          </button>
          <Link
            href="/reviews"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2"
          >
            <span>Live Halaman Ulasan</span>
            <ExternalLink className="w-3.5 h-3.5 text-forest-green" />
          </Link>
        </div>
      </div>

      {/* Metric Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-taupe/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-serif text-2xl font-bold">
            5.0
          </div>
          <div>
            <div className="flex gap-1 text-amber-500 text-sm">
              {"★".repeat(5)}
            </div>
            <span className="text-xs text-warm-taupe mt-0.5 block">
              {reviews.length} Ulasan Terkelola di Database
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-taupe/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-forest-green/10 text-forest-green flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold text-black block">100% Puas</span>
            <span className="text-xs text-warm-taupe">Rekomendasi Keluarga & Besan</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-taupe/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sand text-brown flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-forest-green" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold text-black block">Terverifikasi</span>
            <span className="text-xs text-warm-taupe">Pernikahan Nyata di Aceh</span>
          </div>
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

      {/* Controls: Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari berdasarkan nama pasangan, venue, atau isi testimoni..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-taupe/30 text-black focus:outline-none focus:border-forest-green shadow-xs"
        />
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="p-16 text-center text-warm-taupe flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-forest-green" />
          <span className="text-xs">Memuat ulasan pengantin dari JSON...</span>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-white border border-taupe/30 text-warm-taupe text-xs">
          Tidak ada ulasan yang sesuai dengan pencarian Anda.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/40 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-black group-hover:text-forest-green transition-colors">
                      {r.couple}
                    </h3>
                    <p className="text-[11px] text-warm-taupe flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {r.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="flex text-amber-500 text-xs">
                      {"★".repeat(r.rating || 5)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-black/70 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-forest-green flex-shrink-0" />
                  <span className="truncate">{r.venue}</span>
                </div>

                <blockquote className="text-xs text-black/80 font-light leading-relaxed italic bg-sand/30 p-3.5 rounded-xl border border-taupe/20 mb-4 line-clamp-4">
                  "{r.quote}"
                </blockquote>

                <div className="flex items-center justify-between text-[11px] text-warm-taupe">
                  <span className="font-medium text-forest-green bg-forest-green/10 px-2 py-0.5 rounded">
                    {r.service}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-brown">
                    {r.status}
                  </span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 mt-4 border-t border-taupe/20 flex items-center justify-between">
                <span className="text-[10px] text-warm-taupe font-mono">ID: {r.id}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(r)}
                    className="p-1.5 rounded-lg border border-taupe/40 text-black hover:bg-sand hover:text-forest-green transition-colors cursor-pointer"
                    title="Edit Ulasan"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id, r.couple)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Hapus Ulasan"
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
                  {modalMode === "create" ? "Tambah Ulasan Pengantin" : "Edit Ulasan"}
                </h3>
                <p className="text-xs text-black/60 font-light mt-0.5">
                  Tersimpan di data/reviews.json dan muncul di halaman /reviews.
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
                    Nama Pasangan *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.couple || ""}
                    onChange={(e) => setFormData({ ...formData, couple: e.target.value })}
                    placeholder="Contoh: Jihad & Nanda"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Tanggal Pernikahan
                  </label>
                  <input
                    type="text"
                    value={formData.date || ""}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="04 Oktober 2026"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Venue / Gedung *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.venue || ""}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="Asrama Haji Ballroom, Banda Aceh"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Layanan Paket
                  </label>
                  <input
                    type="text"
                    value={formData.service || ""}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder="All-In Royal Planner & WO"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Rating Bintang (1 - 5)
                  </label>
                  <select
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    <option value={5}>5 Bintang (Sempurna)</option>
                    <option value={4}>4 Bintang (Sangat Baik)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status || "Featured"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    <option value="Featured">Featured (Sorotan Utama)</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  Kutipan Testimoni (Quote) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.quote || ""}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Kesan dan pesan dari pengantin tentang pelayanan ByDaisy..."
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
                  <span>{modalMode === "create" ? "Simpan Ulasan" : "Perbarui Ulasan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
