import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Eksklusif Wedding Planner, WO & Dekorasi",
  description:
    "Eksplorasi tiga pilar layanan terpadu ByDaisy: Wedding Planner hulu-ke-hilir, Wedding Organizer hari-H dengan formasi 14 kru, serta Dekorasi Spatial Art pelaminan megah.",
  alternates: {
    canonical: "https://bydaisy.com/services",
  },
  openGraph: {
    title: "Layanan Eksklusif ByDaisy Planner",
    description:
      "Tiga pilar spesialisasi pernikahan mewah di Banda Aceh dan Sumatra dengan kurasi vendor profesional.",
    url: "https://bydaisy.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
