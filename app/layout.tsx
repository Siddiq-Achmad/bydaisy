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
    default: "ByDaisy Planner - Luxury Wedding Planner & Organizer",
    template: "%s | ByDaisy Planner",
  },
  description:
    "ByDaisy Planner: Curated luxury wedding planning, minute-by-minute coordination, and bespoke event styling across Indonesia. You Dream It, We Creat It!",
  keywords: [
    "ByDaisy",
    "Wedding Planner Medan",
    "Wedding Organizer",
    "Luxury Wedding Indonesia",
    "Bespoke Event Styling",
    "Adat Aceh",
    "Adat Melayu",
    "Pernikahan Tradisional Modern",
  ],
  authors: [{ name: "ByDaisy Planner", url: "https://bydaisy.com" }],
  creator: "ByDaisy Planner",
  publisher: "ByDaisy Planner",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bydaisy.com",
    siteName: "ByDaisy Planner",
    title: "ByDaisy Planner - Luxury Wedding Planner & Organizer",
    description:
      "Curated luxury wedding planning, minute-by-minute coordination, and bespoke event styling across Indonesia. You Dream It, We Creat It!",
    images: [
      {
        url: "/assets/images/img28.jpg",
        width: 1200,
        height: 630,
        alt: "ByDaisy Luxury Wedding Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ByDaisy Planner - Luxury Wedding Planner & Organizer",
    description:
      "Curated luxury wedding planning, minute-by-minute coordination, and bespoke event styling across Indonesia.",
    images: [
      "/assets/images/img28.jpg",
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WeddingService",
  name: "ByDaisy Planner",
  url: "https://bydaisy.com",
  logo: "https://bydaisy.com/favicon.ico",
  description:
    "Bespoke luxury wedding planner, organizer, and event stylist in Banda Aceh and across Indonesia.",
  telephone: ["+6282277094277", "+6282162221468"],
  priceRange: "$$$$",
  sameAs: ["https://instagram.com/bydaisyplanner"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Batee Suasa, Lambhuk",
    addressLocality: "Banda Aceh",
    addressRegion: "Aceh",
    addressCountry: "ID",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.98",
    reviewCount: "140",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-canvas text-black font-sans antialiased overflow-x-hidden selection:bg-warm-taupe selection:text-canvas">
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
