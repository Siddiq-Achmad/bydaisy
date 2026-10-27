import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami & Rekam Jejak Sejak 2019",
  description:
    "Profil resmi ByDaisy Planner: Visi, nilai budaya, tim tersertifikasi, dan rekam jejak pengawalan ratusan pernikahan mewah di Banda Aceh dan Sumatra.",
  alternates: {
    canonical: "https://bydaisy.com/about",
  },
  openGraph: {
    title: "Tentang ByDaisy Planner - Est. 2019 Banda Aceh",
    description:
      "Profil resmi studio, filosofi quiet luxury, dan dedikasi tim wedding planner berpengalaman di Aceh.",
    url: "https://bydaisy.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
