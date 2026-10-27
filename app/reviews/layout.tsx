import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ulasan Klien & Kisah Pengantin Nyata",
  description:
    "Testimoni jujur dan dokumentasi kepuasan keluarga pengantin bersama ByDaisy Planner. Rating 4.9 dari 180+ gelaran pesta pernikahan di Aceh.",
  alternates: {
    canonical: "https://bydaisy.com/reviews",
  },
  openGraph: {
    title: "Ulasan Klien & Kisah Pengantin - ByDaisy Planner",
    description:
      "Pengalaman nyata para pengantin mempercayakan hari bahagia mereka bersama tim planner dan organizer ByDaisy di Banda Aceh.",
    url: "https://bydaisy.com/reviews",
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
