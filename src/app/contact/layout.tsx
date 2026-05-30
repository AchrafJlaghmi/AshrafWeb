import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Freelance Web Developer | Start a Project",
  description: "Ready to launch your premium website? Contact Achraf today to build your high-speed, Next.js digital storefront.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
