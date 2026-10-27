import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak & Konsultasi Studio Lambhuk, Banda Aceh",
  description:
    "Hubungi tim perencana ByDaisy Planner. Jadwalkan temu konsultasi di studio Jl. Batee Suasa, Lambhuk, Banda Aceh atau reservasi tanggal via WhatsApp resmi.",
  alternates: {
    canonical: "https://bydaisy.com/contact",
  },
  openGraph: {
    title: "Kontak & Konsultasi Resmi - ByDaisy Planner",
    description:
      "Informasi alamat studio, nomor hotline WhatsApp resmi, dan formulir reservasi tanggal pernikahan di Banda Aceh.",
    url: "https://bydaisy.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
