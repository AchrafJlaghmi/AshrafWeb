import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashraf Web | High-Speed Web Design & Development in Morocco",
  description: "Premium, high-performance landing pages and portfolios for businesses and creators globally and in Morocco. Zero complications, fast delivery.",
  keywords: ["web design morocco", "landing pages morocco", "freelance developer morocco", "high speed websites", "premium portfolio", "ashraf web"],
  authors: [{ name: "Ashraf" }],
  metadataBase: new URL("https://ashrafweb.tech"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ashraf Web | Premium Web Design",
    description: "Build your high-speed digital storefront. Professional landing pages delivered fast.",
    url: "https://ashrafweb.tech",
    siteName: "Ashraf Web",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // User will need to add this image later
        width: 1200,
        height: 630,
        alt: "Ashraf Web Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashraf Web | High-Speed Web Design",
    description: "Premium landing pages and portfolios for creators and businesses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LanguageProvider } from "../context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
