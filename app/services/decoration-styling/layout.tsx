import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dekorasi Pelaminan & Spatial Art Adat Aceh Modern",
  description:
    "Desain dan instalasi panggung pelaminan adat Aceh dan modern 10m hingga 19m. 3D spatial rendering, fresh flower imports, dan tata pencahayaan konser dramatis.",
  alternates: {
    canonical: "https://bydaisy.com/services/decoration-styling",
  },
  openGraph: {
    title: "Dekorasi Pelaminan & Spatial Art ByDaisy",
    description:
      "Tata artistik ruang pelaminan megah di ballroom dan resort ternama di Banda Aceh dan Sumatra.",
    url: "https://bydaisy.com/services/decoration-styling",
  },
};

export default function DecorationStylingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
