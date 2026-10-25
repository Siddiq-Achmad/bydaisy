"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, ArrowLeft, Send } from "lucide-react";

interface ConsultationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function ConsultationSheet({
  isOpen,
  onClose,
  defaultService = "Wedding Planner",
}: ConsultationSheetProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    coupleNames: "",
    eventDate: "",
    venueLocation: "",
    guestCount: "300 - 500 Tamu",
    services: [defaultService],
    waNumber: "",
    notes: "",
  });

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const text = `Halo ByDaisy Planner, saya ingin booking konsultasi pernikahan:
• Pasangan: ${formData.coupleNames || "-"}
• Perkiraan Tanggal: ${formData.eventDate || "-"}
• Lokasi / Venue: ${formData.venueLocation || "-"}
• Estimasi Tamu: ${formData.guestCount}
• Layanan Dipilih: ${formData.services.join(", ") || "-"}
• No. WhatsApp: ${formData.waNumber || "-"}
${formData.notes ? `• Catatan: ${formData.notes}` : ""}`;

    const url = `https://wa.me/6282277094277?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Sheet Drawer with Spring Physics */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 240,
              mass: 0.9,
            }}
            className="relative z-10 w-full max-w-md bg-canvas border-l border-taupe/40 h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-taupe/30">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-forest-green"></span>
                    <span className="text-[11px] uppercase tracking-widest text-warm-taupe font-semibold">
                      Step {step} of 3
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-black font-editorial">
                    Book Consultation
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close consultation modal"
                  className="w-9 h-9 rounded-full border border-taupe/60 flex items-center justify-center text-black hover:bg-black hover:text-canvas transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-sand h-1 mt-4 rounded-full overflow-hidden">
                <div
                  className="bg-forest-green h-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>

              {/* Multi-step Form */}
              <form onSubmit={handleNext} className="mt-6 space-y-5">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-black font-semibold mb-1.5">
                        Nama Pasangan (Bride & Groom) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.coupleNames}
                        onChange={(e) =>
                          setFormData({ ...formData, coupleNames: e.target.value })
                        }
                        placeholder="cth: Jacky & Valerie"
                        className="w-full text-sm rounded-xl border border-taupe/60 bg-white px-3.5 py-3 text-black placeholder:text-taupe focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-black font-semibold mb-1.5">
                        Perkiraan Tanggal Pernikahan *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) =>
                          setFormData({ ...formData, eventDate: e.target.value })
                        }
                        className="w-full text-sm rounded-xl border border-taupe/60 bg-white px-3.5 py-3 text-black focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-black font-semibold mb-1.5">
                        Lokasi / Venue Acara
                      </label>
                      <input
                        type="text"
                        value={formData.venueLocation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            venueLocation: e.target.value,
                          })
                        }
                        placeholder="cth: Hermes Ballroom / Asrama Haji / Medan"
                        className="w-full text-sm rounded-xl border border-taupe/60 bg-white px-3.5 py-3 text-black placeholder:text-taupe focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-black font-semibold mb-1.5">
                        Estimasi Jumlah Undangan
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) =>
                          setFormData({ ...formData, guestCount: e.target.value })
                        }
                        className="w-full text-sm rounded-xl border border-taupe/60 bg-white px-3.5 py-3 text-black focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                      >
                        <option value="Di bawah 300 Tamu">
                          &lt; 300 Tamu (Intimate Wedding)
                        </option>
                        <option value="300 - 500 Tamu">
                          300 – 500 Tamu (Medium Ballroom)
                        </option>
                        <option value="500 - 1000 Tamu">
                          500 – 1.000 Tamu (Grand Ballroom)
                        </option>
                        <option value="1000+ Tamu">
                          &gt; 1.000 Tamu (Megah / Multi-Sesi)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-black font-semibold mb-2">
                        Pilihan Layanan
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          "All-In ByDaisy",
                          "Sribudaya Resort 2026",
                          "Vandys Garden 2026",
                          "Wedding Planner",
                          "Wedding Organizer",
                          "Dekorasi Pelaminan",
                        ].map((srv) => {
                          const isSelected = formData.services.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => toggleService(srv)}
                              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                                isSelected
                                  ? "border-forest-green bg-forest-green/10 text-forest-green font-medium"
                                  : "border-taupe/40 bg-white text-black/80 hover:border-taupe"
                              }`}
                            >
                              <span>{srv}</span>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-black font-semibold mb-1.5">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.waNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, waNumber: e.target.value })
                        }
                        placeholder="cth: 0822-7709-4277"
                        className="w-full text-sm rounded-xl border border-taupe/60 bg-white px-3.5 py-3 text-black placeholder:text-taupe focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-black font-semibold mb-1.5">
                        Pesan atau Preferensi Khusus (Opsional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder="Ceritakan gambaran konsep pernikahan yang Anda idamkan..."
                        className="w-full text-sm rounded-xl border border-taupe/60 bg-white px-3.5 py-2.5 text-black placeholder:text-taupe focus:border-forest-green focus:outline-none focus:ring-1 focus:ring-forest-green"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Form Action Controls */}
                <div className="pt-4 flex items-center gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((prev) => prev - 1)}
                      className="px-4 py-3.5 rounded-full border border-taupe/60 text-black hover:bg-sand transition-colors flex items-center justify-center text-xs uppercase tracking-widest"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </button>
                  )}

                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-full bg-forest-green hover:bg-forest-hover text-canvas text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {step === 3 ? (
                      <>
                        <span>Kirim ke WhatsApp</span>
                        <Send className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Lanjut</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer Direct WhatsApp Callout */}
            <div className="mt-6 pt-3 border-t border-taupe/30 text-center space-y-1">
              <p className="text-[11px] text-warm-taupe">
                Official Concierge:{" "}
                <a href="https://wa.me/6282277094277" target="_blank" rel="noopener noreferrer" className="font-semibold text-black hover:text-forest-green underline">
                  +62 822-7709-4277
                </a>
                {" • "}
                <a href="https://wa.me/6282162221468" target="_blank" rel="noopener noreferrer" className="font-semibold text-black hover:text-forest-green underline">
                  +62 821-6222-1468
                </a>
              </p>
              <p className="text-[10px] text-brown">
                Jl. Batee Suasa, Lambhuk, Banda Aceh • @bydaisyplanner
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ConsultationSheet;
