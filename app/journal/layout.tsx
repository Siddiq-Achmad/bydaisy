import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jurnal Pernikahan & Panduan Tradisi Aceh",
  description:
    "Panduan komprehensif persiapan pernikahan adat Aceh, tips alokasi anggaran, susunan rundown resepsi, dan inspirasi dekorasi dari perencana profesional.",
  alternates: {
    canonical: "https://bydaisy.com/journal",
  },
  openGraph: {
    title: "Jurnal & Wawasan Pernikahan - ByDaisy Planner",
    description:
      "Artikel editorial seputar prosesi adat, tips teknis vendor, dan panduan lengkap menyusun pesta pernikahan impian di Banda Aceh.",
    url: "https://bydaisy.com/journal",
  },
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
