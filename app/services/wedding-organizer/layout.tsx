import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Organizer Hari-H Formasi 14 Kru",
  description:
    "Layanan Wedding Organizer (WO) hari-H ByDaisy di Banda Aceh: Rundown detik-ke-detik, pengawalan tamu VIP, gladi resik on-site, dan koordinasi panggung.",
  alternates: {
    canonical: "https://bydaisy.com/services/wedding-organizer",
  },
  openGraph: {
    title: "Wedding Organizer Hari-H ByDaisy Banda Aceh",
    description:
      "Formasi 8-14 kru berseragam resmi dengan walkie-talkie mengawal akad dan resepsi dengan tenang dan tertib.",
    url: "https://bydaisy.com/services/wedding-organizer",
  },
};

export default function WeddingOrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
