import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jalan Pengajian | UNITAR",
  description:
    "Kenali jalan pengajian yang sesuai dengan kelayakan dan matlamat kerjaya anda di UNITAR.",
  keywords: [
    "pendidikan Malaysia",
    "SPM",
    "sijil",
    "diploma",
    "ijazah",
    "UNITAR",
    "pengajian tinggi",
    "foundation",
    "bachelor",
    "masters",
    "doctorate"
  ],
  authors: [{ name: "UNITAR" }],
  creator: "UNITAR",
  publisher: "UNITAR",
  openGraph: {
    title: "Jalan Pengajian | UNITAR",
    description:
      "Kenali jalan pengajian yang sesuai dengan kelayakan dan matlamat kerjaya anda di UNITAR.",
    url: "https://www.unitar.my/pathway",
    siteName: "UNITAR",
    locale: "ms_MY",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Jalan Pengajian | UNITAR",
    description:
      "Kenali jalan pengajian yang sesuai dengan kelayakan dan matlamat kerjaya anda di UNITAR.",
    creator: "@UNITAR"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function PathwayLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
