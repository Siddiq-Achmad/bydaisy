"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Building2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Phone,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleQuickFill = () => {
    setEmail("concierge@bydaisy.com");
    setPassword("daisy2026luxury");
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal melakukan autentikasi");
      }

      setSuccessMessage("Autentikasi LUXIMA SSO berhasil. Mengalihkan ke dashboard...");
      setTimeout(() => {
        let target = "/dashboard";
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const fromParam = params.get("from");
          if (fromParam && fromParam.startsWith("/")) {
            target = fromParam;
          }
        }
        router.push(target);
      }, 700);
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kesalahan saat masuk");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col justify-between text-black selection:bg-forest-green selection:text-white">
      {/* Top Bar with Return Link */}
      <header className="px-6 py-6 sm:px-12 flex items-center justify-between border-b border-taupe/20 bg-white/60 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl tracking-tight font-semibold text-black group-hover:text-forest-green transition-colors">
            ByDaisy
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brown px-2 py-0.5 rounded-full bg-sand border border-taupe/30">
            Studio
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs font-medium text-warm-taupe hover:text-black transition-colors flex items-center gap-1.5"
        >
          <span>Kembali ke Website</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          {/* Brand & Ecosystem Heading */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-green/10 border border-forest-green/20 text-forest-green text-[11px] font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LUXIMA - AWEDZ Enterprise SSO</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-black pt-2">
              Studio Portal
            </h1>
            <p className="text-xs sm:text-sm text-warm-taupe font-light max-w-xs mx-auto">
              Akses khusus Enterprise Owner, Lead Planner, dan Tim Pelaksana ByDaisy Luxury Planner.
            </p>
          </div>

          {/* Login Card Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-taupe/30 relative overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sand via-forest-green to-brown" />

            {/* Error & Success Feedback */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Gagal Masuk</p>
                  <p className="text-[11px] mt-0.5 text-red-700">{errorMessage}</p>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3.5 rounded-2xl bg-forest-green/10 border border-forest-green/30 text-forest-green text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Berhasil</p>
                  <p className="text-[11px] mt-0.5">{successMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email / Username */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-black/80 mb-1.5">
                  Email Akun Enterprise
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@bydaisy.com atau concierge@..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-taupe/40 bg-sand/30 text-black text-xs placeholder:text-warm-taupe/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 focus:border-forest-green transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/80">
                    Kata Sandi
                  </label>
                  <span className="text-[10px] text-warm-taupe">
                    Keamanan Terenkripsi
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-taupe/40 bg-sand/30 text-black text-xs placeholder:text-warm-taupe/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-green/30 focus:border-forest-green transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-warm-taupe hover:text-black transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Fill Demo Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-sand/60 hover:bg-sand text-[11px] font-medium text-brown border border-taupe/30 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-forest-green" />
                  <span>Isi Otomatis Kredensial Concierge (Demo)</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-forest-green hover:bg-forest-green/90 text-white text-xs font-semibold tracking-wide shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memverifikasi SSO LUXIMA...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Studio Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Enterprise Security Footnote */}
            <div className="mt-6 pt-5 border-t border-taupe/20 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-warm-taupe">
                <Building2 className="w-3.5 h-3.5 text-brown" />
                <span>Terhubung ke <strong>LUXIMA-API Gateway</strong></span>
              </div>
              <p className="text-[10px] text-warm-taupe/80 mt-1">
                Domain terverifikasi: bydaisy.com (Tenant ID: bydaisy)
              </p>
            </div>
          </div>

          {/* Quick Help & Studio Contacts */}
          <div className="p-4 rounded-2xl bg-white/70 border border-taupe/20 text-center space-y-1.5">
            <p className="text-[11px] font-medium text-black">
              Butuh bantuan akses atau reset akun?
            </p>
            <p className="text-[11px] text-warm-taupe flex items-center justify-center gap-3">
              <a
                href="https://wa.me/6282277094277"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-forest-green underline font-medium"
              >
                WhatsApp Concierge: +62 822-7709-4277
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-[11px] text-warm-taupe border-t border-taupe/20 bg-white/40">
        <p>
          &copy; 2026 ByDaisy Luxury Planner. Bagian dari Ekosistem LUXIMA & AWEDZ. Jl. Batee Suasa, Lambhuk, Banda Aceh.
        </p>
      </footer>
    </div>
  );
}
