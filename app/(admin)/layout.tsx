"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  CreditCard,
  Heart,
  BookOpen,
  Star,
  Mail,
  Users,
  Store,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  Cpu,
  Menu,
  X,
  Bell,
  Search,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface NavGroup {
  label: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
  }[];
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigationGroups: NavGroup[] = [
    {
      label: "Core Overview",
      items: [
        {
          label: "Overview & Analytics",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Calendar & Pipeline",
          href: "/dashboard/calendar",
          icon: Calendar,
          badge: "6 Acara",
          badgeColor: "bg-forest-green/10 text-forest-green",
        },
      ],
    },
    {
      label: "Content Management",
      items: [
        {
          label: "Pages Architecture",
          href: "/dashboard/pages",
          icon: FileText,
          badge: "17 Rute",
        },
        {
          label: "Pricelist & Paket 2026",
          href: "/dashboard/packages",
          icon: CreditCard,
          badge: "Updated",
          badgeColor: "bg-amber-100 text-amber-900",
        },
        {
          label: "Real Weddings",
          href: "/dashboard/real-weddings",
          icon: Heart,
        },
        {
          label: "Jurnal & Tradisi",
          href: "/dashboard/journal",
          icon: BookOpen,
        },
        {
          label: "Love Letters & Ulasan",
          href: "/dashboard/reviews",
          icon: Star,
          badge: "4.98 ★",
        },
      ],
    },
    {
      label: "Clients & Leads",
      items: [
        {
          label: "Inquiries & VIP Leads",
          href: "/dashboard/leads",
          icon: Mail,
          badge: "8 New",
          badgeColor: "bg-forest-green text-white font-bold",
        },
        {
          label: "Private Consultations",
          href: "/dashboard/consultations",
          icon: Users,
        },
      ],
    },
    {
      label: "Directory & Assets",
      items: [
        {
          label: "Curated Vendors Circle",
          href: "/dashboard/vendors",
          icon: Store,
          badge: "0% Markup",
        },
        {
          label: "Media & E-Catalog PDF",
          href: "/dashboard/media",
          icon: ImageIcon,
          badge: "4 PDF",
        },
      ],
    },
    {
      label: "System & Settings",
      items: [
        {
          label: "Developer & Sync",
          href: "/dashboard/developer",
          icon: Cpu,
        },
        {
          label: "Studio & Hotline Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-black flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Persistent Left Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-[#F3EFEA] border-r border-taupe/40 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand & Studio Status */}
        <div className="p-6 border-b border-taupe/30 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex flex-col">
              <span className="font-serif text-2xl tracking-tight text-black font-semibold">
                ByDaisy
              </span>
              <span className="text-[10px] uppercase font-semibold text-brown tracking-widest">
                Studio CMS & Portal
              </span>
            </Link>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-warm-taupe hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/80 border border-taupe/30 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forest-green animate-pulse"></span>
              <span className="text-xs font-medium text-black">System Online</span>
            </div>
            <span className="text-[9px] uppercase font-bold tracking-wider text-forest-green bg-forest-green/10 px-2 py-0.5 rounded-full">
              Production
            </span>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin">
          {navigationGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <p className="px-3 text-[10px] uppercase tracking-widest font-semibold text-warm-taupe mb-1.5">
                {group.label}
              </p>
              {group.items.map((item, iIdx) => {
                const IconComponent = item.icon;
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={iIdx}
                    href={item.href}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-forest-green text-white shadow-sm font-semibold"
                        : "text-black/75 hover:bg-white hover:text-black hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? "text-white" : "text-brown"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                          item.badgeColor ||
                          (isActive
                            ? "bg-white/20 text-white"
                            : "bg-sand text-brown border border-taupe/30")
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer with Quick Hotline Info */}
        <div className="p-4 border-t border-taupe/30 bg-white/40 text-[11px] text-warm-taupe space-y-1">
          <div className="flex items-center justify-between text-black font-medium">
            <span>Banda Aceh Studio</span>
            <span className="text-[10px] text-forest-green font-semibold">Lambhuk</span>
          </div>
          <p className="text-[10px] text-warm-taupe truncate">
            Hotline 1: +62 822-7709-4277
          </p>
          <p className="text-[10px] text-warm-taupe truncate">
            Hotline 2: +62 821-6222-1468
          </p>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[#F8F6F1]/95 backdrop-blur-md border-b border-taupe/30 h-16 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-taupe/40 text-black hover:bg-sand"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick Breadcrumb info */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-warm-taupe">
              <span>CMS Portal</span>
              <span>/</span>
              <span className="text-black font-semibold capitalize">
                {pathname.replace("/dashboard", "").replace("/", "") || "Overview"}
              </span>
            </div>
          </div>

          {/* Top Actions & Profile */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-taupe/50 text-xs text-black font-medium hover:bg-white hover:border-black transition-colors"
            >
              <span>Lihat Website Live</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-forest-green" />
            </Link>

            <Link
              href="/dashboard/leads"
              className="relative p-2 rounded-xl bg-white border border-taupe/30 text-black hover:bg-sand transition-colors"
              title="8 Inquiries Baru"
            >
              <Bell className="w-4 h-4 text-brown" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-forest-green ring-2 ring-white"></span>
            </Link>

            <div className="flex items-center gap-2.5 pl-2 border-l border-taupe/30">
              <div className="w-8 h-8 rounded-full bg-forest-green text-white font-serif font-bold text-xs flex items-center justify-center">
                BD
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-black leading-tight">
                  Daisy Admin
                </span>
                <span className="text-[10px] text-warm-taupe">Lead Planner</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
