"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
  const { t } = useLanguage();
  const [state, handleSubmit] = useForm("xgodjnod");

  return (
    <main className="min-h-screen text-white selection:bg-white selection:text-black relative flex flex-col">
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
            <Link href="/work" className="hover:text-white transition-colors">{t.nav.work}</Link>
            <LanguageSwitcher />
            <span className="bg-white text-black px-6 py-2 rounded-full font-bold opacity-50 cursor-not-allowed">
              {t.nav.contact}
            </span>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* ── Form Section ── */}
      <section className="relative z-10 pt-40 pb-32 px-6 md:px-12 flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-2xl"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm font-medium mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-none">
            {t.contact.title}
          </h1>
          <p className="text-xl text-slate-400 mb-12">
            {t.contact.subtitle}
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            {state.succeeded ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 ml-2" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                <p className="text-slate-400 mb-8">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <Link
                  href="/"
                  className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-slate-200 transition-colors inline-block"
                >
                  Return to Home
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-bold text-slate-300">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      required 
                      className="bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-white/40 transition-colors placeholder:text-slate-600"
                      placeholder="John Doe"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-bold text-slate-300">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      required 
                      className="bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-white/40 transition-colors placeholder:text-slate-600"
                      placeholder="john@example.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-sm font-bold text-slate-300">Project Budget (Optional)</label>
                  <select 
                    id="budget"
                    name="budget"
                    className="bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-white/40 transition-colors text-white appearance-none"
                  >
                    <option className="text-black bg-white" value="Not sure yet">Not sure yet</option>
                    <option className="text-black bg-white" value="Less than $200">Less than $200</option>
                    <option className="text-black bg-white" value="$200 - $500">$200 - $500</option>
                    <option className="text-black bg-white" value="$500 - $1000">$500 - $1000</option>
                    <option className="text-black bg-white" value="$1000+">$1000+</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-slate-300">Message</label>
                  <textarea 
                    id="message"
                    name="message" 
                    required 
                    rows={5}
                    className="bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-white/40 transition-colors placeholder:text-slate-600 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={state.submitting}
                  type="submit"
                  className="bg-white text-black py-5 rounded-xl font-black text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                  {!state.submitting && <Send className="w-5 h-5" />}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </section>

      <footer className="py-12 text-center text-slate-600 text-sm border-t border-white/5 mt-auto">
        <p>&copy; {new Date().getFullYear()} Ashraf Web. {t.footer.rights}</p>
      </footer>
    </main>
  );
}

// Lightweight static starfield
function StarfieldStatic() {
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
