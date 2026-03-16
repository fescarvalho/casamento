import type { Metadata } from "next";
import { Playfair_Display, Public_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casamento Fernando & Vittorya",
  description: "Confirmação de presença e lista de presentes",
};

import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${playfair.variable} ${publicSans.variable} antialiased`}
      >
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
