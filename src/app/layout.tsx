import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

import AuthListener from "@/components/AuthListener";
import "./globals.css";

export const metadata: Metadata = {
  title: "SPS Iskra",
  description: "SPS ISKRA jest dedykowane propagowaniu strzelectwa, realizujemy swoje cele poprzez szkolenia, edukację młodzieży i dorosłych oraz działania na rzecz obronności państwa i bezpieczeństwa publicznego oraz działania wspomagające rozwój społeczności lokalnych.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/sps-iskra-logo.png" />
      <body className="w-screen max-w-screen min-h-screen m-0 overflow-x-hidden montserrat">
        <AuthListener />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
