"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Mail, Phone, Languages, ChevronDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const allProjects = [
  {
    key: "barber",
    title: "Barber Chehban",
    img: "/projects/barber.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    key: "lumina",
    title: "Lumina Estates",
    img: "/projects/lumina.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    key: "terra",
    title: "Terra Mia",
    img: "/projects/terra.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    key: "atlas",
    title: "Atlas Fire",
    img: "/projects/atlas.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    key: "apex",
    title: "Apex Athletics",
    img: "/projects/apex.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    key: "cafe",
    title: "Noir Cafe",
    img: "/projects/cafe.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    key: "nestly",
    title: "Nestly",
    img: "/projects/nestly.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
];

const categories = ["All", "Landing Page", "Corporate Website", "Restaurant Website", "Brand Website", "Cafe Shop", "Real Estate App"];

export default function WorkPage() {
  const { lang, t } = useLanguage();
  const [active, setActive] = React.useState("All");

  const filtered =
    active === "All"
      ? allProjects
      : allProjects.filter((p) => {
          // @ts-ignore
          const pT = t.projects[p.key];
          return pT.type === active;
        });

  return (
    <main className="min-h-screen text-white selection:bg-white selection:text-black relative">
      {/* Starry background dots */}
      <StarfieldStatic />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tighter hover:text-white/70 transition-colors">
            ASHRAF <span className="text-white/50">WEB</span>
          </Link>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-400">
            <Link href="/#services" className="hover:text-white transition-colors">{t.nav.services}</Link>
            <Link href="/" className="hover:text-white transition-colors">{t.nav.work}</Link>
            <LanguageSwitcher />
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-2 rounded-full font-bold"
            >
              {t.nav.contact}
            </motion.a>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <motion.a
              href="/contact"
              className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold"
            >
              {t.nav.contact}
            </motion.a>
          </div>
        </div>
      </nav>

      {/* ── Page Header ── */}
      <section className="relative z-10 pt-40 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm font-medium mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t.allProjects.back}
          </Link>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-none">
            {t.allProjects.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            {t.allProjects.subtitle}
          </p>
        </motion.div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {categories.map((cat) => {
            // @ts-ignore
            const label = lang === 'fr' && cat === 'All' ? 'Tous' : cat;
            return (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${
                  active === cat
                    ? "bg-white text-black border-white"
                    : "border-white/15 text-slate-400 hover:border-white/40 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
        >
          {filtered.map((project, idx) => {
            // @ts-ignore
            const pT = t.projects[project.key];
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                className="group flex flex-col rounded-3xl border border-white/8 bg-white/[0.01] overflow-hidden hover:border-white/20 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  <Image
                    src={project.img}
                    alt={`${project.title} - ${pT.category} Premium Web Design Morocco`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest">
                    {pT.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-7 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-2">
                      {pT.type}
                    </p>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-3">
                      {project.title}
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {pT.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-white/10 text-xs text-slate-500 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-32 text-slate-600 text-lg">No projects in this category yet.</div>
        )}
      </section>

      {/* ── CTA Footer ── */}
      <section className="relative z-10 py-32 px-6 text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">{t.allProjects.ctaTitle}</h2>
          <p className="text-xl text-slate-400 mb-16">
            {t.allProjects.ctaSubtitle}
          </p>
          <div className="flex flex-col gap-8 items-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-10 py-4 rounded-full font-black text-lg mb-8"
            >
              {t.allProjects.ctaButton}
            </motion.a>
            <motion.a
              href="mailto:ashrafjlaghmi@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-3xl font-bold flex items-center gap-4 hover:text-slate-400 transition-colors"
            >
              <Mail className="w-7 h-7 md:w-10 md:h-10" /> ashrafjlaghmi@gmail.com
            </motion.a>
            <motion.a
              href="https://wa.me/212630625216"
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-3xl font-bold flex items-center gap-4 hover:text-slate-400 transition-colors"
            >
              <Phone className="w-7 h-7 md:w-10 md:h-10" /> +212 630-625216
            </motion.a>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 text-center text-slate-600 text-sm border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Ashraf Web. {t.footer.rights}</p>
      </footer>
    </main>
  );
}

// Lightweight static starfield (no hydration mismatch)
function StarfieldStatic() {
  // Fixed seed positions so SSR matches client
  const stars = React.useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        top: `${((i * 37 + 13) % 100).toFixed(2)}%`,
        left: `${((i * 53 + 7) % 100).toFixed(2)}%`,
        size: `${1 + (i % 3)}px`,
        delay: `${(i % 5) * 0.6}s`,
        duration: `${2.5 + (i % 4)}s`,
      })),
    []
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: "#000000",
        backgroundImage: "radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)",
      }}
    >
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 0 4px white",
            animation: `twinkle ${s.duration} ${s.delay} infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
