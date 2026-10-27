import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri Dokumentasi Dekorasi & Panggung Pelaminan",
  description:
    "Koleksi foto visual atmosfer panggung pelaminan, pencahayaan ballroom, instalasi bunga, dan kekompakan kru ByDaisy Planner di lapangan.",
  alternates: {
    canonical: "https://bydaisy.com/gallery",
  },
  openGraph: {
    title: "Galeri Foto Pernikahan & Dekorasi ByDaisy",
    description:
      "Dokumentasi sinematik pelaminan tradisi adat Aceh, modern ballroom, dan photobooth.",
    url: "https://bydaisy.com/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
