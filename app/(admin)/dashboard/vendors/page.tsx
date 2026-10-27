"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  ExternalLink,
  Plus,
  CheckCircle2,
  MapPin,
  Star,
  Search,
  Filter,
  Edit2,
  Trash2,
  X,
  Loader2,
  Globe,
} from "lucide-react";

interface VendorItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  rating: string;
  priceRange: string;
  location: string;
  instagram: string;
  description: string;
  deliverables?: string[];
  image?: string;
  status: string;
}

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<VendorItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState("all");
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<VendorItem> & { deliverablesInput?: string }>({
    name: "",
    category: "photo",
    categoryLabel: "Fotografi & Sinematografi",
    rating: "5.0",
    priceRange: "Eksklusif & High-End",
    location: "Banda Aceh",
    instagram: "@bydaisyplanner",
    description: "",
    deliverablesInput: "Konsultasi Konsep, Full Crew Standby, Garansi Kualitas",
    image: "/assets/images/vendor-photography.jpg",
    status: "Official Partner",
  });

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/vendors");
      const json = await res.json();
      if (json.success && json.data) {
        setVendors(json.data.vendors || []);
        setCategories(json.data.categories || []);
      }
    } catch (err) {
      console.error("Failed to load vendors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      name: "",
      category: "photo",
      categoryLabel: "Fotografi & Sinematografi",
      rating: "5.0",
      priceRange: "Eksklusif & High-End",
      location: "Banda Aceh",
      instagram: "@",
      description: "",
      deliverablesInput: "Konsultasi Konsep, Full Crew Standby, Garansi Kualitas",
      image: "/assets/images/vendor-photography.jpg",
      status: "Official Partner",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: VendorItem) => {
    setModalMode("edit");
    setFormData({
      ...item,
      deliverablesInput: Array.isArray(item.deliverables) ? item.deliverables.join(", ") : "",
    });
    setIsModalOpen(true);
  };

  const handleCategoryChange = (catId: string) => {
    const found = categories.find((c) => c.id === catId);
    setFormData((prev) => ({
      ...prev,
      category: catId,
      categoryLabel: found ? found.label : catId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const deliverables = formData.deliverablesInput
      ? formData.deliverablesInput.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const payload = {
      ...formData,
      deliverables,
    };

    try {
      if (modalMode === "create") {
        const res = await fetch("/api/vendors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success) {
          setVendors((prev) => [result.data, ...prev]);
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Vendor rekanan berhasil ditambahkan." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal menyimpan vendor." });
        }
      } else {
        const res = await fetch("/api/vendors", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success) {
          setVendors((prev) =>
            prev.map((item) => (item.id === formData.id ? { ...item, ...result.data } : item))
          );
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Vendor rekanan berhasil diperbarui." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal memperbarui vendor." });
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
    if (!window.confirm(`Hapus rekanan "${name}" dari direktori vendor?`)) return;

    try {
      const res = await fetch(`/api/vendors?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setVendors((prev) => prev.filter((item) => item.id !== id));
        setFeedback({ type: "success", message: "Vendor berhasil dihapus." });
      } else {
        setFeedback({ type: "error", message: result.error || "Gagal menghapus vendor." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const filteredVendors = vendors.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch =
      v.name.toLowerCase().includes(q) ||
      (v.categoryLabel && v.categoryLabel.toLowerCase().includes(q)) ||
      (v.location && v.location.toLowerCase().includes(q)) ||
      (v.instagram && v.instagram.toLowerCase().includes(q));

    if (filterCat === "all") return matchSearch;
    return matchSearch && v.category === filterCat;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              CRUD Database • Curated Circle & 0% Markup
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Direktori Rekanan Vendor
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Kelola mitra kurasi fotografer, tata rias adat, katering, ballroom, dan dekorasi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-forest-green text-canvas text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Rekanan Baru</span>
          </button>
          <Link
            href="/vendors"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2"
          >
            <span>Live Halaman Rekanan</span>
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
            placeholder="Cari berdasarkan nama vendor, kategori, kota, atau akun Instagram..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-canvas rounded-xl border border-taupe/30 text-black focus:outline-none focus:border-forest-green"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-warm-taupe" />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="px-3 py-2 text-xs bg-canvas rounded-xl border border-taupe/30 text-black focus:outline-none focus:border-forest-green"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vendors List */}
      {loading ? (
        <div className="p-16 text-center text-warm-taupe flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-forest-green" />
          <span className="text-xs">Memuat direktori vendor dari JSON...</span>
        </div>
      ) : filteredVendors.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-white border border-taupe/30 text-warm-taupe text-xs">
          Tidak ada vendor yang cocok dengan kriteria pencarian Anda.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((v) => (
            <div
              key={v.id}
              className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/40 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-brown bg-sand px-2.5 py-0.5 rounded">
                      {v.categoryLabel || v.category}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-black mt-2 group-hover:text-forest-green transition-colors">
                      {v.name}
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {v.rating}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/70 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-forest-green" />
                    {v.location}
                  </span>
                  {v.instagram && (
                    <span className="flex items-center gap-1 text-brown font-medium">
                      <Globe className="w-3.5 h-3.5" />
                      {v.instagram}
                    </span>
                  )}
                </div>

                <p className="text-xs text-black/75 font-light leading-relaxed mb-4 line-clamp-3">
                  {v.description}
                </p>

                {v.deliverables && v.deliverables.length > 0 && (
                  <div className="p-3 rounded-xl bg-[#F8F6F1] text-[11px] text-warm-taupe mb-4">
                    <strong className="text-black font-medium block mb-1">
                      Fasilitas & Layanan:
                    </strong>
                    <div className="flex flex-wrap gap-1.5">
                      {v.deliverables.map((d, idx) => (
                        <span
                          key={idx}
                          className="bg-white border border-taupe/20 px-2 py-0.5 rounded text-[10px] text-black/80"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-taupe/20 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-forest-green">
                  {v.priceRange}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(v)}
                    className="p-1.5 rounded-lg border border-taupe/40 text-black hover:bg-sand hover:text-forest-green transition-colors cursor-pointer"
                    title="Edit Vendor"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(v.id, v.name)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Hapus Vendor"
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
                  {modalMode === "create" ? "Tambah Rekanan Vendor Baru" : "Edit Profil Vendor"}
                </h3>
                <p className="text-xs text-black/60 font-light mt-0.5">
                  Tersimpan di data/vendors.json dan tampil di direktori vendor kurasi.
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
                    Nama Vendor *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Sribudaya Resort"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Kategori Layanan
                  </label>
                  <select
                    value={formData.category || "photo"}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    {categories.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Lokasi / Alamat
                  </label>
                  <input
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Banda Aceh / Aceh Besar"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Akun Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.instagram || ""}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@vendor.official"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Rating (Skala 5.0)
                  </label>
                  <input
                    type="text"
                    value={formData.rating || "5.0"}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    placeholder="5.0"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Rentang Harga / Paket
                  </label>
                  <input
                    type="text"
                    value={formData.priceRange || ""}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    placeholder="Eksklusif & High-End / Rp 15 - 50 Juta"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Status Kemitraan
                  </label>
                  <select
                    value={formData.status || "Official Partner"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    <option value="Official Partner">Official Partner (Prioritas)</option>
                    <option value="Exclusive Partner">Exclusive Partner</option>
                    <option value="Verified Artisan">Verified Artisan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  Deliverables / Layanan Termasuk (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formData.deliverablesInput || ""}
                  onChange={(e) => setFormData({ ...formData, deliverablesInput: e.target.value })}
                  placeholder="2 Lead Photographer, 4K Drone Aerial, Teaser 1 Menit H+2"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  Deskripsi Keunggulan & Portofolio *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan spesialisasi, standar kerja, dan keunggulan artistik rekanan ini..."
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
                  <span>{modalMode === "create" ? "Simpan Rekanan" : "Perbarui Rekanan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
