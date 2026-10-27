import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal Masuk Internal - ByDaisy Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
