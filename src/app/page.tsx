"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Zap, 
  Layout, 
  Monitor, 
  Mail, 
  Phone, 
  ExternalLink, 
  Code, 
  Cpu, 
  Rocket,
  Languages,
  ChevronDown
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

// --- Local Components ---

const StarryBackground = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    const starCount = 100;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${((i * 137) % 100).toFixed(2)}%`,
      left: `${((i * 153) % 100).toFixed(2)}%`,
      size: `${1 + (i % 2)}px`,
      duration: `${2 + (i % 4)}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="star-field">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-twinkle"
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: "0 0 5px white",
            // @ts-ignore
            "--duration": star.duration,
          }}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          ASHRAF <span className="text-white/50">WEB</span>
        </motion.div>
        
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-400">
          <a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a>
          <a href="#work" className="hover:text-white transition-colors">{t.nav.work}</a>
          <LanguageSwitcher />
          <motion.a 
            href="/contact"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-6 py-2 rounded-full font-bold"
          >
            {t.nav.contact}
          </motion.a>
        </div>
        
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <a href="/contact" className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold">{t.nav.contact}</a>
        </div>
      </div>
    </nav>
  );
};

const Hero3D = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = React.useState(15);
  const [rotY, setRotY] = React.useState(-20);
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setRotX(-dy * 28);
    setRotY(dx * 28);
  };

  const faceStyle = (transform: string, bright = false): React.CSSProperties => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    transform,
    border: `1px solid rgba(255,255,255,${bright ? 0.35 : 0.12})`,
    background: bright
      ? "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)"
      : "rgba(255,255,255,0.02)",
    backdropFilter: "blur(2px)",
    boxShadow: bright ? "inset 0 0 40px rgba(255,255,255,0.07), 0 0 20px rgba(255,255,255,0.05)" : "none",
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[440px] flex items-center justify-center cursor-grab"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setRotX(15);
        setRotY(-20);
      }}
      style={{ perspective: "1000px" }}
    >
      {/* Large ambient glow */}
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* 3D Cube wrapper */}
      <motion.div
        animate={
          isHovering
            ? { rotateX: rotX, rotateY: rotY }
            : { rotateX: 15, rotateY: [0, 360] }
        }
        transition={
          isHovering
            ? { type: "spring", stiffness: 130, damping: 20 }
            : { rotateY: { duration: 16, repeat: Infinity, ease: "linear" }, rotateX: { duration: 0 } }
        }
        style={{
          transformStyle: "preserve-3d",
          width: 220,
          height: 220,
          filter: "drop-shadow(0 0 25px rgba(255,255,255,0.2))",
        }}
      >
        {/* FRONT */}
        <div style={{ ...faceStyle("translateZ(110px)", true), display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.05em", textShadow: "0 0 20px rgba(255,255,255,0.8)" }}>AW</span>
        </div>
        {/* BACK */}
        <div style={faceStyle("rotateY(180deg) translateZ(110px)")} />
        {/* LEFT */}
        <div style={{ ...faceStyle("rotateY(-90deg) translateZ(110px)"), background: "linear-gradient(to right, rgba(255,255,255,0.06), transparent)" }} />
        {/* RIGHT */}
        <div style={{ ...faceStyle("rotateY(90deg) translateZ(110px)"), background: "linear-gradient(to left, rgba(255,255,255,0.06), transparent)" }} />
        {/* TOP */}
        <div style={{ ...faceStyle("rotateX(90deg) translateZ(110px)"), background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)" }} />
        {/* BOTTOM */}
        <div style={faceStyle("rotateX(-90deg) translateZ(110px)")} />
      </motion.div>

      {/* Orbiting ring 1 — horizontal */}
      <motion.div
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 10px rgba(255,255,255,0.03)",
        }}
      />

      {/* Orbiting ring 2 — tilted 60deg */}
      <motion.div
        animate={{ rotateZ: [0, -360] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          borderRadius: "50%",
          border: "1px dashed rgba(255,255,255,0.07)",
          transform: "rotateX(70deg)",
        }}
      />

      {/* Orbiting ring 3 — tilted 30deg the other way */}
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
          transform: "rotateX(20deg) rotateZ(45deg)",
        }}
      />

      {/* Glowing orbiting dots */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [deg, deg + 360] }}
          transition={{ duration: 10 + i * 1.5, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", width: 310, height: 310 }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: i % 2 === 0 ? 5 : 3,
              height: i % 2 === 0 ? 5 : 3,
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow: `0 0 ${i % 2 === 0 ? 12 : 6}px white`,
              opacity: 0.5 + i * 0.08,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};


const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {t.hero.badge}
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-none">
            {t.hero.title1}<br />
            {t.hero.title2}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-500">
              {t.hero.title3}
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.35)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-full font-black text-base flex items-center justify-center gap-2"
            >
              {t.hero.cta}
            </motion.a>
            <motion.a
              href="#work"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.3)" }}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold text-base flex items-center justify-center"
            >
              {t.hero.secondaryCta}
            </motion.a>
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-10">
            <div>
              <p className="text-2xl font-black mb-1">{t.hero.stats.fast}</p>
              <p className="text-sm text-slate-500">{t.hero.stats.delivery}</p>
            </div>
            <div>
              <p className="text-2xl font-black mb-1">{t.hero.stats.premium}</p>
              <p className="text-sm text-slate-500">{t.hero.stats.uiux}</p>
            </div>
            <div>
              <p className="text-2xl font-black mb-1">100%</p>
              <p className="text-sm text-slate-500">{t.hero.stats.mobile}</p>
            </div>
          </div>
        </motion.div>

        {/* Right: 3D Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
          className="order-1 lg:order-2 flex items-center justify-center"
        >
          <Hero3D />
        </motion.div>
      </div>
    </section>
  );
};


const About = () => {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square bg-white/5 rounded-3xl overflow-hidden flex items-center justify-center p-12 border border-white/10"
        >
          {/* Abstract Glowing Graphic */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent blur-3xl opacity-30" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[1px] border-white/10 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border-[1px] border-white/20 rounded-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="w-24 h-24 text-white opacity-50" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.about.title}</h2>
          <p className="text-xl text-slate-400 mb-6 leading-relaxed">
            {t.about.p1}
          </p>
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            {t.about.p2}
          </p>
          <div className="flex items-center gap-4 text-white font-bold italic">
            <div className="w-12 h-[1px] bg-white/30" />
            {t.about.signature}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t } = useLanguage();
  const icons = [<Layout className="w-8 h-8" />, <Zap className="w-8 h-8" />, <Code className="w-8 h-8" />];

  return (
    <section id="services" className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t.services.title}</h2>
        <p className="text-slate-400">{t.services.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.services.items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, borderColor: "rgba(255, 255, 255, 0.3)", backgroundColor: "rgba(255, 255, 255, 0.03)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 rounded-3xl border border-white/10 bg-white/[0.01] transition-all"
          >
            <div className="mb-6 text-white">{icons[idx]}</div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Work = () => {
  const { t } = useLanguage();
  const projects = [
    {
      key: "barber",
      title: "Barber Chehban",
      img: "/projects/barber.png"
    },
    {
      key: "cafe",
      title: "Noir Cafe",
      img: "/projects/cafe.png"
    },
    {
      key: "terra",
      title: "Terra Mia",
      img: "/projects/terra.png"
    }
  ];

  return (
    <section id="work" className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.work.title}</h2>
          <p className="text-slate-400">{t.work.subtitle}</p>
        </div>
        <a href="/work" className="flex items-center gap-2 text-sm font-bold border-b border-white pb-1 hover:text-slate-300 transition-colors">
          {t.work.viewAll} <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project, idx) => {
          // @ts-ignore
          const pT = t.projects[project.key];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/5 bg-white/5 mb-6">
                <Image 
                  src={project.img} 
                  alt={`${project.title} - Premium ${pT.type} Web Design Morocco`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">{pT.type}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative z-10 py-32 px-6 text-center border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-8">{t.contact.title}</h2>
        <p className="text-xl text-slate-400 mb-16">
          {t.contact.subtitle}
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
            className="text-2xl md:text-4xl font-bold flex items-center gap-4 hover:text-slate-400 transition-colors"
          >
            <Mail className="w-8 h-8 md:w-12 md:h-12" /> ashrafjlaghmi@gmail.com
          </motion.a>
          
          <motion.a 
            href="https://wa.me/212630625216"
            whileHover={{ scale: 1.05 }}
            className="text-2xl md:text-4xl font-bold flex items-center gap-4 hover:text-slate-400 transition-colors"
          >
            <Phone className="w-8 h-8 md:w-12 md:h-12" /> +212 630-625216
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen text-white selection:bg-white selection:text-black relative">
      <StarryBackground />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Work />
      <Contact />
      
      <footer className="py-12 text-center text-slate-600 text-sm border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Ashraf Web. {t.footer.rights}</p>
        <p className="mt-2">{t.footer.built}</p>
      </footer>
    </main>
  );
}
