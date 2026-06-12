import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Web Design Portfolio | React & Next.js Projects",
  description: "Explore the portfolio of Ashraf Web. High-performance, premium web design projects built with React, Next.js, and Tailwind CSS.",
  alternates: {
    canonical: "https://ashrafweb.me/work",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
