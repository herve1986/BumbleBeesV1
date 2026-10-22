
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import HexPattern from "@/components/ui/HexPattern";
import GrungeOverlay from "@/components/ui/GrungeOverlay";

export default function HeroSection() {
  const [charIndex, setCharIndex] = useState(0);
  const title = "BUMBLEBEES";

  useEffect(() => {
    if (charIndex < title.length) {
      const timer = setTimeout(() => {
        setCharIndex((current) => current + 1);
      }, 110);

      return () => clearTimeout(timer);
    }
  }, [charIndex, title.length]);

  return (
    <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ background: "#111111" }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/manus-storage/hero-bg_42cf8845.jpg')",
              opacity: 0.5,
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111]/70 via-[#111]/20 to-[#111]" />
          {/* Hex pattern */}
          <HexPattern opacity={0.05} id="hex-hero" />
          {/* Grunge */}
          <GrungeOverlay opacity={0.04} />
    
          {/* Diagonal red slash accent */}
          <div
            className="absolute top-0 right-0 w-64 h-full pointer-events-none"
            style={{
              background: "linear-gradient(135deg, transparent 60%, rgba(192,57,43,0.08) 100%)",
            }}
          />
    
          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            {/* Since 2023 badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
            <span
              className="text-[#e8a820]/80 tracking-[0.4em] text-xs uppercase"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              <span className="text-base">★</span> Since 2023 <span className="text-base">★</span>
            </span>
            </motion.div>
    
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="flex justify-center mb-8"
            >
              <div className="mt-5 relative flex items-center justify-center w-40 h-40 md:w-56 md:h-56">
                <img
                  src="/public/images/logo.jpg"
                  alt="Bumblebees Logo"
                  className="w-full h-full rounded-full object-cover"
                  style={{
                    boxShadow: "0 0 60px rgba(232,168,32,0.45), 0 0 120px rgba(232,168,32,0.15)",
                    border: "2px solid rgba(232,168,32,0.6)",
                  }}
                />
                {/* Hex frame around logo */}
                <svg
                  className="absolute top-1/2 left-1/2 w-[130%] h-[130%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="100,5 195,52.5 195,147.5 100,195 5,147.5 5,52.5"
                    fill="none"
                    stroke="rgba(232,168,32,0.35)"
                    strokeWidth="1.5"
                    strokeDasharray="8 4"
                  />
                </svg>
              </div>
            </motion.div>
    
            {/* Animated title */}
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 leading-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#e8a820",
                textShadow: "0 0 40px rgba(232,168,32,0.5), 0 4px 20px rgba(0,0,0,0.8)",
                letterSpacing: "-0.02em",
              }}
            >
              {title.slice(0, charIndex)}
              <span className="animate-pulse text-[#c0392b] relative -top-1">|</span>
            </h1>
    
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: charIndex >= title.length ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#f5f0e8]/70 tracking-[0.5em] text-sm md:text-base uppercase mb-10"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              Play Rock Legends
            </motion.p>
    
            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: charIndex >= title.length ? 1 : 0, y: charIndex >= title.length ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#concerts"
                className="px-8 py-4 text-center"
                style={{
                  background: "#e8a820",
                  color: "#111",
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                  clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#f5c842";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#e8a820";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                }}
              >
                ★ Voir les concerts
              </a>
              <a
                href="#about"
                className="px-8 py-4 text-center"
                style={{
                  border: "2px solid #e8a820",
                  color: "#e8a820",
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                  clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(232,168,32,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                }}
              >
                Notre histoire
              </a>
            </motion.div>
          </div>
    
          {/* Bottom diagonal cut */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background: "#2d2d2d",
              clipPath: "polygon(0 100%, 100% 0%, 100% 100%)",
            }}
          />
    </section>
  );
}
