import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import SmoothScrollProvider from "@/components/providers/smooth-scroll";
import CustomCursor from "@/components/cinematic/custom-cursor";
import GrainOverlay from "@/components/cinematic/grain-overlay";
import "./globals.css";

const theSeasons = localFont({
  src: [
    {
      path: "../public/assets/fonts/The_Seasons_Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/The_Seasons_Light_Italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/The_Seasons_Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/The_Seasons_Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/The_Seasons_Regular.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/The_Seasons_Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/The_Seasons_Bold_Italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/9366bd460113d8bf675fd2bdfe1ce764.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/9366bd460113d8bf675fd2bdfe1ce764.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-the-seasons",
  declarations: [
    {
      prop: "font-family",
      value: "'The Seasons'",
    },
  ],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bydaisy.com"),
  title: {
    default: "ByDaisy Planner - Luxury Wedding Planner & Organizer Banda Aceh",
    template: "%s | ByDaisy Planner",
  },
  description:
    "ByDaisy Planner: Layanan luxury wedding planner, wedding organizer, dan dekorasi pelaminan adat Aceh & modern di Banda Aceh. Formasi 14 kru standby. You Dream It, We Create It!",
  keywords: [
    "ByDaisy",
    "ByDaisy Planner",
    "Wedding Planner Banda Aceh",
    "Wedding Organizer Banda Aceh",
    "WO Banda Aceh",
    "Paket Wedding Aceh",
    "Dekorasi Pelaminan Aceh",
    "Luxury Wedding Indonesia",
    "Sribudaya Resort Wedding",
    "Vandys Garden Wedding",
    "Adat Aceh Peusijuek",
    "Adat Melayu",
    "Pernikahan Tradisional Modern",
  ],
  authors: [{ name: "ByDaisy Planner", url: "https://bydaisy.com" }],
  creator: "ByDaisy Planner",
  publisher: "ByDaisy Planner",
  alternates: {
    canonical: "https://bydaisy.com",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bydaisy.com",
    siteName: "ByDaisy Planner",
    title: "ByDaisy Planner - Luxury Wedding Planner & Organizer Banda Aceh",
    description:
      "Perencanaan dan orkestrasi pernikahan mewah terpadu di Banda Aceh dan Sumatra. Tim berpengalaman sejak 2019 dengan kurasi vendor terbaik. You Dream It, We Create It!",
    images: [
      {
        url: "/assets/images/img28.jpg",
        width: 1200,
        height: 630,
        alt: "ByDaisy Luxury Wedding Experience Banda Aceh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ByDaisy Planner - Luxury Wedding Planner & Organizer",
    description:
      "Layanan luxury wedding planner, wedding organizer, dan dekorasi pelaminan di Banda Aceh dan Sumatra.",
    images: ["/assets/images/img28.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "geo.region": "ID-AC",
    "geo.placename": "Banda Aceh, Aceh, Indonesia",
    "geo.position": "5.5564;95.3375",
    ICBM: "5.5564, 95.3375",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WeddingService", "LocalBusiness", "Organization"],
      "@id": "https://bydaisy.com/#organization",
      name: "ByDaisy Planner",
      alternateName: "ByDaisy Wedding Planner & Organizer",
      url: "https://bydaisy.com",
      logo: "https://bydaisy.com/favicon.ico",
      image: "https://bydaisy.com/assets/images/img28.jpg",
      description:
        "Penyedia layanan luxury wedding planner, wedding organizer hari-H, dan dekorasi pelaminan adat Aceh & modern di Banda Aceh sejak 2019.",
      telephone: ["+6282277094277", "+6282162221468"],
      email: "concierge@bydaisy.com",
      priceRange: "Rp 15.000.000 - Rp 235.000.000",
      currenciesAccepted: "IDR",
      paymentAccepted: "Cash, Bank Transfer",
      sameAs: [
        "https://instagram.com/bydaisyplanner",
        "https://wa.me/6282277094277",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Batee Suasa, Lambhuk",
        addressLocality: "Banda Aceh",
        addressRegion: "Aceh",
        postalCode: "23126",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 5.5564,
        longitude: 95.3375,
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Banda Aceh" },
        { "@type": "AdministrativeArea", name: "Aceh Besar" },
        { "@type": "AdministrativeArea", name: "Aceh" },
        { "@type": "AdministrativeArea", name: "Sumatera Utara" },
        { "@type": "Country", name: "Indonesia" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.98",
        reviewCount: "140",
        bestRating: "5",
        worstRating: "1",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan Pernikahan ByDaisy",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Paket All-In ByDaisy Signature",
              description: "Paket pernikahan terpadu include dekorasi, catering, WO, MC, dan tari adat.",
            },
            price: "92500000",
            priceCurrency: "IDR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Paket Kemitraan Sribudaya Resort 2026",
              description: "Paket pernikahan all-in lengkap dengan sewa venue dan menginap di resort.",
            },
            price: "95000000",
            priceCurrency: "IDR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Paket Kemitraan Vandys Garden 2026",
              description: "Paket intimate garden wedding 500 pax di @vandysgarden Banda Aceh.",
            },
            price: "85000000",
            priceCurrency: "IDR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Wedding Organizer Hari-H Only",
              description: "Manajemen panggung dan rundown menit-per-menit dengan 8-14 kru berseragam.",
            },
            price: "15000000",
            priceCurrency: "IDR",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://bydaisy.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Berapa biaya paket pernikahan All-In di ByDaisy Planner?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paket All-In ByDaisy Signature mulai dari Rp 92.500.000 untuk 300 pax, Rp 110.000.000 untuk Platinum Intimate 300 pax, Rp 115.000.000 untuk 500 pax, hingga Rp 155.000.000 untuk 1.000 pax. Tersedia juga paket kolaborasi Sribudaya Resort mulai Rp 95.000.000 dan Vandys Garden Rp 85.000.000.",
          },
        },
        {
          "@type": "Question",
          name: "Di mana alamat studio dan kantor ByDaisy Planner?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Studio resmi ByDaisy Planner beralamat di Jl. Batee Suasa, Lambhuk, Banda Aceh, Aceh. Melayani sesi konsultasi tatap muka maupun online untuk seluruh wilayah Aceh dan kota sekitarnya.",
          },
        },
        {
          "@type": "Question",
          name: "Layanan apa saja yang disediakan oleh ByDaisy Planner?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ByDaisy menyediakan tiga pilar spesialisasi: Wedding Planner (pendampingan konsep, anggaran, dan kurasi vendor 3-9 bulan), Wedding Organizer (manajemen panggung hari H dengan formasi 10-14 kru berseragam), serta Dekorasi Pelaminan & Spatial Art (pelaminan adat Aceh dan modern 10m hingga 19m).",
          },
        },
        {
          "@type": "Question",
          name: "Bagaimana cara melakukan reservasi tanggal dan konsultasi di ByDaisy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Calon pengantin dapat menghubungi Hotline WhatsApp resmi di +62 822-7709-4277 atau +62 821-6222-1468, atau mengajukan formulir pemesanan konsultasi privat di situs web bydaisy.com.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${theSeasons.variable} ${jakarta.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://api.luxima.id" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-canvas text-black font-sans antialiased overflow-x-hidden selection:bg-warm-taupe selection:text-canvas">
        {/* Accessible Skip-to-Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-5 focus:py-2.5 focus:bg-black focus:text-canvas focus:rounded-full focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-forest-green text-xs font-semibold uppercase tracking-wider"
        >
          Lewati ke konten utama
        </a>

        {/* Lenis Smooth Scroll Provider */}
        <SmoothScrollProvider>
          {/* Global Film Grain Overlay */}
          <GrainOverlay />

          {/* Magnetic Custom Cursor */}
          <CustomCursor />

          {/* Page & Navigation Content */}
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
