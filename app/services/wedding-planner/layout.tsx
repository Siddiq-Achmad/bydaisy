import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Planner & Pendampingan 12 Kru",
  description:
    "Layanan Wedding Planner ByDaisy: Perancangan konsep visual, alokasi anggaran, kurasi vendor 0% markup, hingga simulasi teknis dan pengawalan 12 kru di hari H.",
  alternates: {
    canonical: "https://bydaisy.com/services/wedding-planner",
  },
  openGraph: {
    title: "Wedding Planner Terpadu ByDaisy Banda Aceh",
    description:
      "Pendampingan 3-9 bulan penuh bebas cemas dengan formasi kru terlatih dan negosiasi vendor terpercaya.",
    url: "https://bydaisy.com/services/wedding-planner",
  },
};

export default function WeddingPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
