import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direktori Rekanan Vendor Terkurasi 0% Markup",
  description:
    "Kemitraan transparan bersama fotografer, katering, MUA, dan venue terbaik di Aceh. Transaksi langsung ke vendor tanpa biaya tersembunyi.",
  alternates: {
    canonical: "https://bydaisy.com/vendors",
  },
  openGraph: {
    title: "Vendor Pilihan & Ekosistem Mitra - ByDaisy Planner",
    description:
      "Daftar vendor pernikahan terverifikasi di Banda Aceh dengan transparansi harga dan garansi kualitas pelayanan.",
    url: "https://bydaisy.com/vendors",
  },
};

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
