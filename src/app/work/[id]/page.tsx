"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

const projectGalleries: Record<string, string[]> = {
  barberchehban: [
    "/projects/barberchehban/barberchehban.png",
    "/projects/barberchehban/barberchehban2.png",
    "/projects/barberchehban/barberchehban3.png",
    "/projects/barberchehban/barberchehban4.png",
    "/projects/barberchehban/barberchehban5.png",
    "/projects/barberchehban/barberchehban6.png",
    "/projects/barberchehban/barberchehban7.png",
    "/projects/barberchehban/barberchehban8.png",
  ],
  standardpool: [
    "/projects/standardpool/standardpool1.png",
    "/projects/standardpool/standardpool2.png",
    "/projects/standardpool/standardpool3.png",
    "/projects/standardpool/standardpool4.png",
    "/projects/standardpool/standardpool5.png",
    "/projects/standardpool/standardpool6.png",
    "/projects/standardpool/standardpool7.png",
  ],
  port: [
    "/projects/port/port.png",
    "/projects/port/port2.png",
    "/projects/port/port3.png",
    "/projects/port/port4.png",
    "/projects/port/port5.png",
  ],
};

const projectTitles: Record<string, string> = {
  barberchehban: "Barber Chehban",
  standardpool: "Standard Pool",
  port: "Portfolio",
};

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useLanguage();
  const images = projectGalleries[id] || [];
  
  // @ts-ignore
  const pT = t.projects[id];
  const title = projectTitles[id] || id;

  if (!pT) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/work" className="text-blue-400 hover:underline">Return to Work</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white selection:bg-white selection:text-black relative bg-[#050505]">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tighter hover:text-white/70 transition-colors">
            ASHRAF <span className="text-white/50">WEB</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/work"
              className="bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Project Header ── */}
      <section className="pt-32 pb-12 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider mb-6 text-slate-300">
            {pT.category}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-none">
            {title}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mb-8 leading-relaxed">
            {pT.desc}
          </p>

          <div className="flex flex-wrap gap-3">
            {["Next.js", "Tailwind CSS", "Framer Motion"].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium flex items-center gap-2 bg-white/5">
                <Code className="w-4 h-4 text-slate-400" /> {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Gallery ── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <div className="flex flex-col gap-12">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
              className="w-full relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <Image
                src={img}
                alt={`${title} screenshot ${idx + 1}`}
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                quality={90}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
