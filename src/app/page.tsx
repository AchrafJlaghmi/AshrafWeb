"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
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
          <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
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
        <div style={{ ...faceStyle("translateZ(110px)", true), display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <Image src="/ashraf.jpg" alt="Ashraf" fill className="object-cover opacity-90 hover:opacity-100 transition-opacity" />
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


const AboutStackedCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveIndex((prev) => (prev === 0 ? 1 : 0));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    x.set(mX / width - 0.5);
    y.set(mY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const frontAnimate = { rotateZ: 0, x: 0, y: 0, scale: 1, zIndex: 20, z: 30 };
  const frontHover = { rotateZ: -6, x: -60, y: 0, scale: 1.05, zIndex: 20, z: 50 };

  const backAnimate = { rotateZ: 4, x: 15, y: 5, scale: 0.95, zIndex: 10, z: -20 };
  const backHover = { rotateZ: 14, x: 140, y: -20, scale: 0.95, zIndex: 10, z: -30 };

  const card0State = activeIndex === 0 ? (isHovered ? frontHover : frontAnimate) : (isHovered ? backHover : backAnimate);
  const card1State = activeIndex === 1 ? (isHovered ? frontHover : frontAnimate) : (isHovered ? backHover : backAnimate);

  const springTransition = { type: "spring" as const, stiffness: 200, damping: 25 };

  return (
    <div className="relative w-full max-w-sm perspective-[1200px] flex items-center justify-center" style={{ aspectRatio: "4/5" }}>
      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -left-10 z-20 w-20 h-20 bg-blue-500/10 backdrop-blur-md rounded-2xl border border-blue-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        style={{ transform: "translateZ(80px)" }}
      >
        <Monitor className="w-10 h-10 text-blue-400" />
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-8 -right-8 z-20 w-24 h-24 bg-teal-500/10 backdrop-blur-md rounded-full border border-teal-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.3)]"
        style={{ transform: "translateZ(100px)" }}
      >
        <Layout className="w-12 h-12 text-teal-400" />
      </motion.div>
      
      <motion.div 
        animate={{ x: [0, 15, 0], y: [0, 10, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 -right-12 z-20 w-16 h-16 bg-purple-500/10 backdrop-blur-md rounded-xl border border-purple-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        style={{ transform: "translateZ(60px)" }}
      >
        <Zap className="w-8 h-8 text-purple-400" />
      </motion.div>

      {/* Main 3D Card Container (Mouse Tracking) */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full cursor-pointer perspective-[1200px]"
      >
        {/* CARD 1 (Cool Image) */}
        <motion.div 
          animate={card1State}
          transition={springTransition}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-4 shadow-2xl origin-bottom-right"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 blur-xl rounded-2xl" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
            <Image 
              src="/ashraf-cool.jpg" 
              alt="Achraf Cool" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 right-6 text-right">
              <p className="text-white font-black text-3xl mb-1 drop-shadow-lg italic">"Stay Cool."</p>
            </div>
          </div>
        </motion.div>

        {/* CARD 0 (Professional Image) */}
        <motion.div 
          animate={card0State}
          transition={springTransition}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-4 shadow-2xl origin-bottom-left"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 blur-xl rounded-2xl" />
          <motion.div 
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner group"
          >
            <Image 
              src="/ashraf.jpg" 
              alt="Achraf Front" 
              fill 
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
            {/* Badge overlay on image */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Creative Developer
              </div>
              <p className="text-white font-bold text-3xl mb-1 drop-shadow-lg">Achraf</p>
              <p className="text-white/80 text-sm font-medium flex items-center gap-2">
                <span className="w-4 h-[1px] bg-white/50" /> Morocco • Global
              </p>
            </div>
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
};


const About = () => {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  return (
    <section id="about" className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-visible">
      {/* Background Decorative Grid */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
        className="absolute inset-0 pointer-events-none -z-10" 
        style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '4rem 4rem', maskImage: 'radial-gradient(circle at center, black, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 70%)' }}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left: 3D Picture */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, amount: 0.3 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="flex justify-center w-full relative"
        >
          <AboutStackedCards />
        </motion.div>
        
        {/* Right: Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="order-first lg:order-last relative"
        >
          {/* Animated Glow Behind Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent blur-[80px] rounded-full pointer-events-none"
          />
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium mb-6 text-blue-300">
            <Cpu className="w-4 h-4" /> About Me
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight tracking-tight">
            {t.about.title}
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-slate-300 mb-6 leading-relaxed font-light">
            {t.about.p1}
          </motion.p>
          
          <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-10 leading-relaxed">
            {t.about.p2}
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-10">
             <motion.div 
               whileHover={{ y: -5, scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
               className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] transition-colors relative overflow-hidden group cursor-default"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl font-black text-white mb-2 tracking-tighter relative z-10">100</div>
                <div className="text-sm text-slate-400 font-medium relative z-10">Google Performance</div>
             </motion.div>
             <motion.div 
               whileHover={{ y: -5, scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
               className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] transition-colors relative overflow-hidden group cursor-default"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl font-black text-white mb-2 tracking-tighter flex items-end gap-1 relative z-10">
                  React <Code className="w-6 h-6 text-blue-400 mb-1.5 opacity-50" />
                </div>
                <div className="text-sm text-slate-400 font-medium relative z-10">+ Tailwind Stack</div>
             </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-center gap-6 text-white font-bold italic text-lg">
            <div className="w-16 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {t.about.signature}
            </span>
          </motion.div>
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
    },
    {
      key: "lumina",
      title: "Lumina Estates",
      img: "/projects/lumina.png"
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
