"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import initialGallery from "@/data/gallery.json";
import {
  FileText,
  FileDown,
  ExternalLink,
  Download,
  CheckCircle2,
  HardDrive,
  Eye,
  Type,
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Filter,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  label: string;
  venue: string;
  image: string;
  aspect?: string;
}

export default function AdminMediaPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    title: "",
    category: "traditional",
    label: "Tradisi & Adat",
    venue: "Banda Aceh",
    image: "/assets/images/portfolio-coordinator-bride.jpg",
    aspect: "aspect-[16/10]",
  });

  const pdfCatalogs = [
    {
      title: "ByDaisy Company Profile",
      filename: "ByDaisy-Company-Profile.pdf",
      size: "35 MB",
      path: "/assets/ByDaisy-Company-Profile.pdf",
      coverage: "27 Halaman Autentik",
      desc: "Profil studio, legalitas, visi misi, rekam jejak Meulaboh 14.000 tamu, panduan alokasi anggaran pernikahan.",
    },
    {
      title: "All-In Package ByDaisy",
      filename: "ALL-IN-PACKAGE-DAISYPLANNER.pdf",
      size: "21 MB",
      path: "/assets/ALL-IN-PACKAGE-DAISYPLANNER.pdf",
      coverage: "8 Halaman Rincian",
      desc: "Paket lengkap All-In 300, 500, 1.000 Pax, paket dekorasi pelaminan 10m-19m, dan itemized add-on.",
    },
    {
      title: "Sribudaya Resort Wedding 2026",
      filename: "SRIBUDAYA-2026.pdf",
      size: "25 MB",
      path: "/assets/SRIBUDAYA-2026.pdf",
      coverage: "10 Halaman Lengkap",
      desc: "Paket eksklusif All-In Sribudaya Resort (300 s/d 2.000 Pax) include biaya sewa venue dan menginap di resort.",
    },
    {
      title: "Vandys Event Package 2026",
      filename: "VANDYS-EVENT-PACKAGE.pdf",
      size: "4 MB",
      path: "/assets/VANDYS-EVENT-PACKAGE.pdf",
      coverage: "1 Halaman Executive",
      desc: "Paket intimate garden 500 pax include sewa tempat @vandysgarden, photobooth @bp.projectbooth, dan hand bouquet @hs_floralstudio.",
    },
  ];

  const typographyAssets = [
    {
      name: "The Seasons Light & Light Italic",
      format: "WOFF2 & TTF",
      weight: "300",
      usage: "Subheadings, accents & italic citations",
    },
    {
      name: "The Seasons Regular & Italic",
      format: "WOFF2 & TTF",
      weight: "400",
      usage: "Primary serif editorial headings & quote cards",
    },
    {
      name: "The Seasons Bold & Bold Italic",
      format: "WOFF2 & TTF",
      weight: "700",
      usage: "Major display titles, hero titles & section anchors",
    },
  ];

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setGallery(json.data);
      }
    } catch (err) {
      console.error("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      title: "",
      category: "traditional",
      label: "Tradisi & Adat",
      venue: "Banda Aceh",
      image: "/assets/images/portfolio-coordinator-bride.jpg",
      aspect: "aspect-[16/10]",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
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
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setGallery((prev) => [result.data, ...prev]);
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Foto baru berhasil ditambahkan ke galeri." });
        } else {
          setFeedback({ type: "error", message: result.error || "Gagal menyimpan foto." });
        }
      } else {
        const res = await fetch("/api/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          setGallery((prev) =>
            prev.map((g) => (g.id === formData.id ? { ...g, ...result.data } : g))
          );
          setIsModalOpen(false);
          setFeedback({ type: "success", message: "Foto galeri berhasil diperbarui." });
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

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus foto "${title}" dari galeri publik?`)) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setGallery((prev) => prev.filter((g) => g.id !== id));
        setFeedback({ type: "success", message: "Foto berhasil dihapus dari galeri." });
      } else {
        setFeedback({ type: "error", message: result.error || "Gagal menghapus foto." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Koneksi terputus." });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const filteredGallery = gallery.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(q) ||
      item.venue.toLowerCase().includes(q) ||
      item.label.toLowerCase().includes(q);

    if (filterCat === "all") return matchSearch;
    return matchSearch && item.category === filterCat;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/30">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-green"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brown">
              Pusat Aset Digital & Galeri Visual
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-black font-semibold">
            Media & E-Catalog Repository
          </h1>
          <p className="text-xs sm:text-sm text-black/70 font-light mt-1">
            Manajemen berkas digital resmi, e-catalog pernikahan, tipografi, serta kurasi foto galeri publik.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/gallery"
            target="_blank"
            className="px-4 py-2 rounded-xl border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-2"
          >
            <span>Live Halaman Galeri</span>
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

      {/* Interactive Photo Gallery CRUD Section */}
      <div className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-taupe/20">
          <div>
            <h3 className="font-serif text-xl text-black font-semibold flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-forest-green" />
              <span>Manajemen Foto Galeri Publik (/gallery)</span>
            </h3>
            <p className="text-xs text-black/60 font-light mt-0.5">
              Terkoneksi langsung ke data/gallery.json dan REST API /api/gallery.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Foto Galeri</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari foto berdasarkan judul, tema, atau venue..."
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
              <option value="traditional">Tradisi & Adat</option>
              <option value="ballroom">Modern Ballroom</option>
              <option value="decor">Pelaminan & Lighting</option>
              <option value="team">Tim & On-Site Crew</option>
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="p-12 text-center text-warm-taupe flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-forest-green" />
            <span className="text-xs">Memuat galeri dari JSON...</span>
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-sand/30 border border-taupe/30 text-warm-taupe text-xs">
            Belum ada foto galeri yang cocok dengan pencarian.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-taupe/30 bg-sand/20 flex flex-col justify-between hover:border-forest-green/50 transition-all group"
              >
                <div>
                  <div className="relative h-36 w-full overflow-hidden bg-sand">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 text-[9px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-3">
                    <h4 className="font-serif text-sm font-semibold text-black truncate mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-warm-taupe truncate">{item.label}</p>
                    <span className="text-[10px] text-black/60 block mt-1 truncate">
                      {item.venue}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 border-t border-taupe/20 flex items-center justify-between bg-white">
                  <span className="text-[9px] font-mono text-warm-taupe">ID: {item.id}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1 rounded-md border border-taupe/40 text-black hover:bg-sand transition-colors cursor-pointer"
                      title="Edit Foto"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Hapus Foto"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official 4 PDFs Section */}
      <div>
        <h3 className="font-serif text-2xl text-black font-medium mb-4">
          4 Berkas E-Catalog Resmi ByDaisy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pdfCatalogs.map((pdf, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs flex flex-col justify-between hover:border-forest-green/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-forest-green bg-forest-green/10 px-2.5 py-0.5 rounded">
                    {pdf.size}
                  </span>
                  <span className="text-xs text-warm-taupe font-medium">
                    {pdf.coverage}
                  </span>
                </div>

                <h4 className="font-serif text-xl font-semibold text-black mb-1">
                  {pdf.title}
                </h4>

                <code className="text-[11px] font-mono text-brown bg-sand px-2 py-0.5 rounded block mb-3 truncate">
                  {pdf.filename}
                </code>

                <p className="text-xs text-black/75 font-light leading-relaxed mb-4">
                  {pdf.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-taupe/20 flex items-center justify-between gap-3">
                <a
                  href={pdf.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-taupe/40 text-black text-xs font-medium hover:bg-sand transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </a>

                <a
                  href={pdf.path}
                  download={pdf.filename}
                  className="px-4 py-1.5 rounded-lg bg-forest-green text-white text-xs font-semibold hover:bg-forest-hover transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Assets Section */}
      <div className="p-6 rounded-2xl bg-white border border-taupe/30 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-forest-green" />
          <h3 className="font-serif text-xl text-black font-semibold">
            Tipografi Lokal: 'The Seasons' (public/assets/fonts/)
          </h3>
        </div>

        <p className="text-xs text-black/70 font-light mb-4">
          Font primer editorial serif berlisensi yang dimuat langsung ke aplikasi melalui Next.js localFont:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {typographyAssets.map((f, fIdx) => (
            <div
              key={fIdx}
              className="p-4 rounded-xl bg-[#F8F6F1] border border-taupe/20 text-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <strong className="text-black font-semibold">{f.name}</strong>
                <span className="text-[10px] text-forest-green font-bold">
                  Weight {f.weight}
                </span>
              </div>
              <span className="text-[11px] text-warm-taupe block mb-2">
                Format: {f.format}
              </span>
              <p className="text-[11px] text-black/70 font-light">
                {f.usage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg bg-canvas border border-taupe/40 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-taupe/30 flex items-center justify-between bg-white">
              <div>
                <h3 className="font-serif text-xl text-black font-semibold">
                  {modalMode === "create" ? "Tambah Foto Galeri Baru" : "Edit Foto Galeri"}
                </h3>
                <p className="text-xs text-black/60 font-light mt-0.5">
                  Tersimpan di data/gallery.json dan tampil di halaman /gallery.
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
                  Judul Foto / Momen *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: The Royal White Pavillion"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Kategori Galeri
                  </label>
                  <select
                    value={formData.category || "traditional"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    <option value="traditional">Tradisi & Adat</option>
                    <option value="ballroom">Modern Ballroom</option>
                    <option value="decor">Pelaminan & Lighting</option>
                    <option value="team">Tim & On-Site Crew</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Label Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.label || ""}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Pelaminan Kustom 18M"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Venue / Lokasi
                  </label>
                  <input
                    type="text"
                    value={formData.venue || ""}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="Sribudaya Resort / Hermes Ballroom"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    value={formData.aspect || "aspect-[16/10]"}
                    onChange={(e) => setFormData({ ...formData, aspect: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green"
                  >
                    <option value="aspect-[16/10]">Landscape (16:10)</option>
                    <option value="aspect-[4/5]">Portrait (4:5)</option>
                    <option value="aspect-square">Square (1:1)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1">
                  URL Path Gambar *
                </label>
                <input
                  type="text"
                  required
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/assets/images/gallery-white-pavillion.jpg"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-taupe/40 bg-white text-black focus:outline-none focus:border-forest-green font-mono"
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
                  <span>{modalMode === "create" ? "Simpan Foto" : "Perbarui Foto"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
