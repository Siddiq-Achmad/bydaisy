"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Users,
  Heart,
  Layers,
  Calendar,
  Store,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  FileText,
  Clock,
  Palette
} from "lucide-react";

interface NavbarProps {
  onOpenConsultation?: () => void;
}

interface SubMenuItem {
  title: string;
  href: string;
  description: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavItem {
  label: string;
  href: string;
  isMegaMenu?: boolean;
  subItems?: SubMenuItem[];
  megaColumns?: {
    heading: string;
    items: SubMenuItem[];
  }[];
  featuredCard?: {
    tag: string;
    title: string;
    description: string;
    buttonText: string;
    actionType: "consultation" | "link";
    href?: string;
  };
}

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Click outside and keyboard Escape listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle desktop hover with safety delay to prevent accidental closing
  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileAccordion = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // 5 Primary Editorial Navigation Categories
  const navigationItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
      subItems: [
        {
          title: "Tentang ByDaisy",
          href: "/about",
          description: "Sejarah dedikasi sejak 2019, filosofi editorial, dan profil lead planner.",
          icon: Users,
        },
        {
          title: "Love Letters & Ulasan",
          href: "/reviews",
          description: "140+ surat apresiasi dan ulasan terverifikasi dengan rating 4.98 bintang.",
          badge: "4.98 ★",
          icon: Heart,
        },
        {
          title: "Company Profile (PDF)",
          href: "/assets/ByDaisy-Company-Profile.pdf",
          description: "Berkas profil resmi studio, visi, rekam jejak, dan pedoman pembiayaan pernikahan.",
          badge: "PDF",
          icon: FileText,
        },
      ],
    },
    {
      label: "Services & Pricing",
      href: "/services",
      isMegaMenu: true,
      megaColumns: [
        {
          heading: "Spesialisasi & Peran",
          items: [
            {
              title: "Semua Layanan",
              href: "/services",
              description: "Tiga lini layanan: Wedding Planner, Wedding Organizer, dan Dekorasi.",
              icon: Layers,
            },
            {
              title: "Wedding Planner & 12 Kru",
              href: "/services/wedding-planner",
              description: "Pengawalan 3 fase hulu ke hilir dengan formasi 12 kru berseragam di hari H.",
              badge: "Unggulan",
              icon: Sparkles,
            },
            {
              title: "Wedding Organizer (Hari H)",
              href: "/services/wedding-organizer",
              description: "Orkestrasi panggung & rundown menit per menit dengan formasi 14 kru.",
              icon: Clock,
            },
            {
              title: "Dekorasi & Spatial Art",
              href: "/services/decoration-styling",
              description: "Instalasi pelaminan adat & modern dari 10m s/d Royal 19m Tiffani set.",
              icon: Palette,
            },
          ],
        },
        {
          heading: "Biaya & Direktori",
          items: [
            {
              title: "Pricelist & Paket All-In 2026",
              href: "/pricelist",
              description: "All-In Signature, Sribudaya Resort, Vandys Garden, Planner, & WO.",
              icon: FileText,
            },
            {
              title: "The Curated Circle (Vendors)",
              href: "/vendors",
              description: "Direktori puluhan vendor rekanan berkaliber tinggi dengan 0% markup.",
              badge: "0% Markup",
              icon: Store,
            },
            {
              title: "E-Catalog Resmi (4 PDF)",
              href: "/pricelist",
              description: "Unduh 4 berkas resmi: Daisy All-In, Sribudaya 2026, Vandys, & Profil.",
              badge: "PDF",
              icon: Sparkles,
            },
          ],
        },
      ],
      featuredCard: {
        tag: "Musim Menikah 2026",
        title: "Sesi Konsultasi Privat",
        description: "Diskusikan tanggal, konsep adat, dan anggaran pernikahan Anda bersama lead planner kami.",
        buttonText: "Reservasi Sesi",
        actionType: "consultation",
      },
    },
    {
      label: "Portfolio",
      href: "/portfolio",
      subItems: [
        {
          title: "Kisah Nyata Pasangan",
          href: "/portfolio",
          description: "Arsip pernikahan megah: Jihad & Nanda, Jacky & Valerie, Nazhira & Naufal.",
          badge: "Featured",
          icon: Heart,
        },
        {
          title: "Galeri Dokumentasi",
          href: "/gallery",
          description: "Kurasi visual pelaminan adat, dekorasi modern, dan detail hantaran.",
          icon: Sparkles,
        },
      ],
    },
    {
      label: "Journal & Tradisi",
      href: "/journal",
      subItems: [
        {
          title: "Panduan Ritus Tradisi",
          href: "/tradisi",
          description: "Protokoler pernikahan Adat Aceh, Melayu Deli, dan Minangkabau.",
          badge: "Adat",
          icon: ShieldCheck,
        },
        {
          title: "Jurnal & Wawasan",
          href: "/journal",
          description: "Artikel editorial, kiat alokasi anggaran, dan inspirasi pernikahan 2026.",
          icon: BookOpen,
        },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
        ? "bg-canvas/90 backdrop-blur-md border-b border-taupe/30 py-3.5 shadow-sm"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo with 4-Circle Signature Emblem */}
        <Link
          href="/"
          className="flex flex-col group shrink-0"
          aria-label="ByDaisy Event Planner Homepage"
        >
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-2xl sm:text-3xl tracking-tight text-black group-hover:text-forest-green transition-colors font-semibold">
              ByDaisy
            </span>
            {/* Minimalist 4-circle signature emblem */}
            <div
              className="flex gap-1 items-center opacity-75 group-hover:opacity-100 transition-opacity"
              title="ByDaisy Signature Emblem"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-forest-green inline-block"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-brown inline-block"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-warm-taupe inline-block"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-taupe inline-block"></span>
            </div>
          </div>
          <span className="font-serif text-[10px] tracking-widest text-warm-taupe -mt-0.5 uppercase">
            Wedding & Event Planner
          </span>
        </Link>

        {/* Desktop 5-Item Navigation */}
        <nav
          ref={navRef}
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm tracking-wide font-normal"
        >
          {navigationItems.map((item) => {
            const hasChildren = Boolean(item.subItems || item.isMegaMenu);
            const isOpen = activeDropdown === item.label;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                onMouseLeave={() => hasChildren && handleMouseLeave()}
              >
                {/* Top Level Item */}
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-colors text-xs uppercase tracking-widest font-medium ${isActive
                      ? "text-forest-green font-semibold"
                      : "text-black/85 hover:text-forest-green hover:bg-taupe/15"
                      }`}
                    aria-expanded={isOpen}
                    aria-haspopup={hasChildren ? "true" : undefined}
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-warm-taupe transition-transform duration-200 ${isOpen ? "rotate-180 text-forest-green" : ""
                          }`}
                      />
                    )}
                  </Link>
                </div>

                {/* Submenu Dropdown (Standard Multi-Level) */}
                {item.subItems && (
                  <div
                    className={`absolute top-full left-0 pt-2 w-80 transition-all duration-200 z-50 ${isOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto visible"
                      : "opacity-0 -translate-y-2 pointer-events-none invisible"
                      }`}
                  >
                    <div className="p-3 bg-white/95 backdrop-blur-xl border border-taupe/30 rounded-2xl shadow-xl ring-1 ring-black/5 space-y-1">
                      {item.subItems.map((sub) => {
                        const Icon = sub.icon;
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-all group ${isSubActive
                              ? "bg-forest-green/10 text-forest-green"
                              : "hover:bg-canvas text-black"
                              }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-canvas border border-taupe/20 flex items-center justify-center shrink-0 mt-0.5 text-forest-green group-hover:bg-forest-green group-hover:text-white transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-serif text-sm font-medium leading-snug group-hover:text-forest-green transition-colors">
                                  {sub.title}
                                </span>
                                {sub.badge && (
                                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-forest-green/10 text-forest-green shrink-0">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-brown/80 font-light mt-0.5 line-clamp-2 leading-relaxed">
                                {sub.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Mega Menu Dropdown (Services & Pricing) */}
                {item.isMegaMenu && item.megaColumns && (
                  <div
                    className={`absolute top-full -left-20 xl:-left-12 pt-2 w-[720px] transition-all duration-200 z-50 ${isOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto visible"
                      : "opacity-0 -translate-y-2 pointer-events-none invisible"
                      }`}
                  >
                    <div className="p-6 bg-white/95 backdrop-blur-xl border border-taupe/30 rounded-3xl shadow-2xl ring-1 ring-black/5 grid grid-cols-12 gap-6">
                      {/* Left Two Columns: Nav Categories */}
                      <div className="col-span-8 grid grid-cols-2 gap-6">
                        {item.megaColumns.map((col, colIdx) => (
                          <div key={colIdx} className="space-y-3">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-forest-green border-b border-taupe/20 pb-2">
                              {col.heading}
                            </h4>
                            <div className="space-y-1.5">
                              {col.items.map((sub) => {
                                const Icon = sub.icon;
                                const isSubActive = pathname === sub.href;
                                return (
                                  <Link
                                    key={sub.title}
                                    href={sub.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-all group ${isSubActive
                                      ? "bg-forest-green/10 text-forest-green"
                                      : "hover:bg-canvas text-black"
                                      }`}
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-canvas border border-taupe/20 flex items-center justify-center shrink-0 mt-0.5 text-forest-green group-hover:bg-forest-green group-hover:text-white transition-colors">
                                      <Icon className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="font-serif text-sm font-medium leading-snug group-hover:text-forest-green transition-colors">
                                          {sub.title}
                                        </span>
                                        {sub.badge && (
                                          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-forest-green/10 text-forest-green shrink-0">
                                            {sub.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-brown/80 font-light mt-0.5 line-clamp-2 leading-relaxed">
                                        {sub.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Right Column: Featured Promo Card */}
                      {item.featuredCard && (
                        <div className="col-span-4 bg-sand/40 border border-taupe/30 rounded-2xl p-5 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest font-bold text-forest-green bg-forest-green/10 px-2 py-0.5 rounded-full inline-block mb-3">
                              {item.featuredCard.tag}
                            </span>
                            <h5 className="font-serif text-lg text-black font-medium mb-1.5">
                              {item.featuredCard.title}
                            </h5>
                            <p className="text-xs text-brown font-light leading-relaxed mb-4">
                              {item.featuredCard.description}
                            </p>
                          </div>

                          {item.featuredCard.actionType === "consultation" ? (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveDropdown(null);
                                if (onOpenConsultation) onOpenConsultation();
                              }}
                              className="w-full py-2 px-3 rounded-full bg-forest-green text-white text-[11px] uppercase tracking-wider font-semibold hover:bg-black transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <span>{item.featuredCard.buttonText}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <Link
                              href={item.featuredCard.href || "/contact"}
                              onClick={() => setActiveDropdown(null)}
                              className="w-full py-2 px-3 rounded-full bg-forest-green text-white text-[11px] uppercase tracking-wider font-semibold hover:bg-black transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <span>{item.featuredCard.buttonText}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={onOpenConsultation}
            data-cursor="Book"
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-black text-xs tracking-wider uppercase font-medium text-black hover:bg-forest-green hover:border-forest-green hover:text-white transition-all duration-300 shadow-sm"
          >
            Book Consultation
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-black hover:text-forest-green transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Accordion Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-taupe/30 bg-canvas/98 backdrop-blur-xl px-6 py-6 transition-all duration-300 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col space-y-2 text-sm">
            {navigationItems.map((item) => {
              const hasChildren = Boolean(item.subItems || item.isMegaMenu);
              const isExpanded = Boolean(mobileExpanded[item.label]);
              const childItems =
                item.subItems ||
                (item.megaColumns
                  ? item.megaColumns.flatMap((col) => col.items)
                  : []);

              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl text-base font-serif text-black hover:bg-taupe/20 hover:text-forest-green transition-colors block"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="border-b border-taupe/20 pb-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 px-3 text-base font-serif text-black hover:text-forest-green font-medium"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion(item.label)}
                      className="p-2 text-warm-taupe hover:text-black transition-colors"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-forest-green" : ""
                          }`}
                      />
                    </button>
                  </div>

                  {/* Expanded Submenu on Mobile */}
                  {isExpanded && (
                    <div className="mt-1 pl-3 pr-1 py-1 space-y-1.5 bg-sand/30 rounded-xl">
                      {childItems.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 p-2.5 rounded-lg text-xs text-black/85 hover:bg-white hover:text-forest-green transition-all"
                          >
                            <Icon className="w-3.5 h-3.5 text-forest-green shrink-0" />
                            <span className="font-medium">{sub.title}</span>
                            {sub.badge && (
                              <span className="ml-auto text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-forest-green/10 text-forest-green">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Book Consultation Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenConsultation) onOpenConsultation();
                }}
                className="w-full py-3.5 rounded-full bg-forest-green text-white text-center text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
