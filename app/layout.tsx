import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: {
    default: "Learning Polish Grammar",
    template: "%s | Learning Polish Grammar"
  },
  description:
    "Text companion for the Learning Polish Grammar YouTube course, with episode-by-episode notes and examples."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${playfair.variable} font-sans`}>
        <SiteHeader />
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
