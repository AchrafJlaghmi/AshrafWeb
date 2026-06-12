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
  title: "Freelance React & Next.js Web Developer | USA & Morocco",
  description: "Hire a top-tier freelance frontend developer building lightning-fast, premium React and Next.js websites for clients globally, in the US, and Morocco.",
  keywords: ["freelance web developer", "React developer", "Next.js expert", "hire web designer USA", "web design Morocco", "high speed landing pages", "frontend developer morocco", "Next.js developer USA", "freelance web designer", "Ashraf web"],
  authors: [{ name: "Achraf" }],
  metadataBase: new URL("https://ashrafweb.me"),
  alternates: {
    canonical: "https://ashrafweb.me",
  },
  openGraph: {
    title: "Freelance React & Next.js Web Developer | Ashraf Web",
    description: "Build your high-speed digital storefront. Premium landing pages delivered fast for US, Global, and Moroccan clients.",
    url: "https://ashrafweb.me",
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
    title: "Freelance Next.js Developer | Ashraf Web",
    description: "Premium landing pages and portfolios for creators and businesses globally.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LanguageProvider } from "../context/LanguageContext";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Ashraf Web",
  "founder": {
    "@type": "Person",
    "name": "Achraf"
  },
  "description": "High-performance freelance Next.js and React web development, creating premium landing pages and digital portfolios.",
  "url": "https://ashrafweb.me",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MA"
  },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "Morocco" },
    { "@type": "Place", "name": "Worldwide" }
  ],
  "knowsLanguage": ["en", "fr"],
  "sameAs": [
    "https://wa.me/212630625216",
    "mailto:ashrafjlaghmi@gmail.com"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden max-w-[100vw]`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden max-w-[100vw]">
        <LanguageProvider>
          {children}
          <WhatsAppFAB />
        </LanguageProvider>
      </body>
    </html>
  );
}
