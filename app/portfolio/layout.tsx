import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio & Kisah Nyata Pasangan Pengantin",
  description:
    "Dokumentasi dan arsip kisah nyata pasangan pengantin yang dipercayakan kepada ByDaisy Planner di Banda Aceh, Aceh Besar, dan Sumatra.",
  alternates: {
    canonical: "https://bydaisy.com/portfolio",
  },
  openGraph: {
    title: "Portofolio Real Weddings ByDaisy",
    description:
      "Kisah cinta, foto prosesi sakral adat Aceh, resepsi ballroom, dan intimate garden wedding.",
    url: "https://bydaisy.com/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
