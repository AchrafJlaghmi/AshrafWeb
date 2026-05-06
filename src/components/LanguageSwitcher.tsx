"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold uppercase tracking-wider transition-all"
      >
        <Languages className="w-3.5 h-3.5" />
        {lang}
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 p-1.5 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl min-w-[100px] z-50 shadow-2xl"
          >
            <button
              onClick={() => { setLang("en"); setIsOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${lang === "en" ? "bg-white text-black" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
            >
              ENGLISH
            </button>
            <button
              onClick={() => { setLang("fr"); setIsOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors mt-1 ${lang === "fr" ? "bg-white text-black" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
            >
              FRANÇAIS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
