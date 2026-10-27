"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  Plus,
  Clock,
  Eye,
  CheckCircle2,
  Edit2,
  Trash2,
  X,
  Search,
  Filter,
  Loader2,
  Sparkles,
} from "lucide-react";

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  views: string;
  status: string;
  date: string;
  summary: string;
  image?: string;
  author?: string;
  keyTakeaways?: string[];
}

export default function AdminJournalPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ArticleItem>>({
    title: "",
    category: "Tradisi & Adat Aceh",
    readTime: "5 menit",
    views: "100 pembaca",
    status: "Published",
    date: "27 Oktober 2026",
    summary: "",
    image: "/assets/images/journal-coordination.jpg",
    author: "ByDaisy Concierge",
  });

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/journal");
      const json = await res.json();
      if (json.success && json.data) {
        setArticles(json.data.articles || []);
        setCategories(json.data.categories || []);
      }
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      title: "",
      category: "Tradisi & Adat Aceh",
      readTime: "5 menit",
      views: "100 pembaca",
      status: "Published",
      date: "27 Oktober 2026",
      summary: "",
      image: "/assets/images/journal-coordination.jpg",
      author: "ByDaisy Concierge",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ArticleItem) => {
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
        const res = await fetch("/api/journal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setArticles((prev) => [result.data, ...prev]);
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Artikel editorial berhasil ditambahkan." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal menyimpan artikel." });
        }
      } else {
        const res = await fetch("/api/journal", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setArticles((prev) =>
            prev.map((item) => (item.id === formData.id ? { ...item, ...result.data } : item))
          );
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Artikel editorial berhasil diperbarui." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal memperbarui artikel." });
        }
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Terjadi kesalahan server." });
    } finally {
      setSubmitting(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus artikel "${title}" dari editorial?`)) return;

    try {
      const res = await fetch(`/api/journal?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setArticles((prev) => prev.filter((item) => item.id !== id));
        setFeedback({ type: "success", message: "Artikel berhasil dihapus." });
      } else {
        setFeedback({ type: "error", message: result.error || "Gagal menghapus artikel." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const filteredArticles = articles.filter((art) => {
    const q = search.toLowerCase();
    const matchSearch =
      art.title.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q);

    if (categoryFilter === "all") return matchSearch;
    return matchSearch && art.category === categoryFilter;
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
            Jurnal & Wawasan Tradisi
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Manajemen artikel editorial, panduan ritus adat, dan tips pernikahan 2026.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-forest-green text-canvas text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>
          <Link
            href="/journal"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2"
          >
            <span>Buka Halaman Jurnal</span>
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
            placeholder="Cari artikel berdasarkan judul, kategori, atau topik bahasan..."
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
            {categories.map((c) => (
              <option key={c.id} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="p-16 text-center text-warm-taupe flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-forest-green" />
          <span className="text-xs">Memuat artikel editorial dari JSON...</span>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-white border border-taupe/30 text-warm-taupe text-xs">
          Tidak ada artikel yang sesuai dengan filter atau kata kunci.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-brown bg-sand px-2.5 py-0.5 rounded">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        art.status === "Published"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {art.status}
                    </span>
                    <span className="text-[10px] text-warm-taupe">{art.date}</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-semibold text-black mb-2 group-hover:text-forest-green transition-colors line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-black/70 font-light leading-relaxed mb-4 line-clamp-3">
                  {art.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-warm-taupe pt-3 border-t border-taupe/20 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-forest-green" />
                    {art.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-forest-green" />
                    {art.views}
                  </span>
                  {art.author && (
                    <span className="text-[11px] text-brown font-medium">
                      Penulis: {art.author}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-warm-taupe truncate max-w-[150px]">
                  /journal#{art.slug}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(art)}
                    className="p-1.5 rounded-lg border border-taupe/40 text-black hover:bg-sand hover:text-forest-green transition-colors cursor-pointer"
                    title="Edit Artikel"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(art.id, art.title)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Hapus Artikel"
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
            <div className="p-6 border-b border-taupe/30 flex items-center justify-between bg-white">
              <div>
                <h3 className="font-serif text-xl text-black font-semibold">
                  {modalMode === "create" ? "Tulis Artikel Baru" : "Edit Artikel Editorial"}
                </h3>
                <p className="text-xs text-black/60 font-light mt-0.5">
                  Tersimpan di data/journal.json dan siap dibaca di halaman Jurnal.
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
                  Judul Artikel *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Filosofi Adat Peusijeuk: Makna Bu Lapeh dan Ranup"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Kategori Editorial
                  </label>
                  <select
                    value={formData.category || "Tradisi & Adat Aceh"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    <option value="Tradisi & Adat Aceh">Tradisi & Adat Aceh</option>
                    <option value="Perencanaan Keuangan">Perencanaan Keuangan</option>
                    <option value="Panduan Venue">Panduan Venue</option>
                    <option value="Behind The Scenes">Behind The Scenes</option>
                    <option value="Inspirasi Dekorasi">Inspirasi Dekorasi</option>
                    <option value="Etiket & Protokoler">Etiket & Protokoler</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Estimasi Waktu Baca
                  </label>
                  <input
                    type="text"
                    value={formData.readTime || ""}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="6 menit"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Tanggal Terbit
                  </label>
                  <input
                    type="text"
                    value={formData.date || ""}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="27 Oktober 2026"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Penulis
                  </label>
                  <input
                    type="text"
                    value={formData.author || ""}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="ByDaisy Concierge"
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
                    <option value="Draft">Draft (Arsip)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  URL Path Gambar Sampul
                </label>
                <input
                  type="text"
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/assets/images/journal-finance.jpg"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  Ringkasan Eksekutif (Summary) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.summary || ""}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Tulis ringkasan singkat artikel yang memikat calon pengantin..."
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
                  <span>{modalMode === "create" ? "Simpan Artikel" : "Perbarui Artikel"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
