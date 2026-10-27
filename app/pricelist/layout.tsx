import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricelist & Paket Wedding 2026 Resmi",
  description:
    "Katalog harga paket All-In ByDaisy Signature, paket Sribudaya Resort, paket Vandys Garden, Planner/WO Only, dan Dekorasi Pelaminan 2026. Unduh 4 berkas resmi PDF.",
  alternates: {
    canonical: "https://bydaisy.com/pricelist",
  },
  openGraph: {
    title: "Pricelist & Paket Pernikahan 2026 ByDaisy Planner",
    description:
      "Rincian biaya paket pernikahan lengkap transparan tanpa biaya tersembunyi di Banda Aceh.",
    url: "https://bydaisy.com/pricelist",
  },
};

export default function PricelistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
