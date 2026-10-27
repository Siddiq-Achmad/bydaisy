import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan Tradisi & Budaya Adat Aceh Darussalam, Melayu & Minang",
  description:
    "Eksplorasi filosofi dan tata krama sakral prosesi pernikahan adat Aceh (Peusijuek, Tueng Dara Baro), Melayu Deli, dan Minangkabau.",
  alternates: {
    canonical: "https://bydaisy.com/tradisi",
  },
  openGraph: {
    title: "Panduan Tradisi & Ritual Sakral Pernikahan Adat",
    description:
      "Merawat kemuliaan adat istiadat leluhur dalam balutan keanggunan manajemen pernikahan kontemporer.",
    url: "https://bydaisy.com/tradisi",
  },
};

export default function TradisiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
