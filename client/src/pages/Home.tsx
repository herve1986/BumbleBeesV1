/**
 * Bumblebees Rock — Home Page (v2 — Dark Honeycombs Rock, full asymmetric)
 * Design: Dark Honeycombs Rock
 * Colors: Charcoal #2d2d2d, Gold #e8a820, Cream #f5f0e8, Rock Red #c0392b
 * Fonts: Playfair Display (display), Oswald (body/rock), Special Elite (accent)
 * Layout: Asymmetric, diagonal, hex-structured — NO centered grids
 */
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Hexagon SVG background pattern ───────────────────────────────────────────
function HexPattern({ opacity = 0.06, id = "hex" }: { opacity?: number; id?: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={id} x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <polygon
            points="30,2 58,17 58,47 30,62 2,47 2,17"
            fill="none"
            stroke="#e8a820"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── Hex frame badge ───────────────────────────────────────────────────────────
function HexBadge({ children, size = 80 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size * 1.15 }}
    >
      <svg
        viewBox="0 0 100 115"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,5 95,28 95,87 50,110 5,87 5,28"
          fill="rgba(232,168,32,0.08)"
          stroke="#e8a820"
          strokeWidth="2"
        />
      </svg>
      <span className="relative z-10 text-[#e8a820]">{children}</span>
    </div>
  );
}

// ─── Grunge texture overlay ────────────────────────────────────────────────────
function GrungeOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        opacity,
        mixBlendMode: "overlay",
      }}
    />
  );
}

// ─── Gold divider line ─────────────────────────────────────────────────────────
function GoldDivider({ align = "center" }: { align?: "left" | "center" | "right" }) {
  return (
    <div className={`flex items-center gap-3 my-6 ${align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center"}`}>
      {align !== "left" && <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#e8a820]" />}
      <span className="text-[#e8a820] text-lg">★</span>
      {align !== "right" && <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#e8a820]" />}
    </div>
  );
}

// ─── Section fade-in wrapper ───────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const initial = direction === "left" ? { opacity: 0, x: -60 } : direction === "right" ? { opacity: 0, x: 60 } : { opacity: 0, y: 40 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Accueil", href: "#hero" },
    { label: "Le Groupe", href: "#about" },
    { label: "Concerts", href: "#concerts" },
    { label: "Répertoire", href: "#setlist" },
    { label: "Galerie", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(17,17,17,0.97)"
          : "linear-gradient(to bottom, rgba(17,17,17,0.9), transparent)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(232,168,32,0.25)" : "none",
      }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, #e8a820, #c0392b, #e8a820, transparent)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo — backstage pass style */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/public/images/logo.jpg"
              alt="Bumblebees"
              className="h-11 w-11 rounded-full object-cover transition-all duration-300 group-hover:scale-110"
              style={{ border: "2px solid #e8a820", boxShadow: "0 0 12px rgba(232,168,32,0.3)" }}
            />
          </div>
          <div className="hidden sm:block">
            <div
              className="text-[#e8a820] font-bold leading-none"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem" }}
            >
              Bumblebees
            </div>
            <div
              className="text-[#f5f0e8]/40 leading-none mt-0.5"
              style={{ fontFamily: "'Special Elite', monospace", fontSize: "0.6rem", letterSpacing: "0.25em" }}
            >
              PLAY ROCK LEGENDS
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[#f5f0e8]/70 hover:text-[#e8a820] transition-colors duration-200 text-xs tracking-widest uppercase group"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#e8a820] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-[#e8a820] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#e8a820] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#e8a820] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(17,17,17,0.98)", borderTop: "1px solid rgba(232,168,32,0.2)" }}
          >
            <nav className="flex flex-col py-4 px-6 gap-0">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#f5f0e8] hover:text-[#e8a820] hover:pl-4 transition-all text-lg tracking-widest uppercase py-3 border-b border-[#e8a820]/10"
                  style={{ fontFamily: "'Oswald', sans-serif", transitionDelay: `${i * 30}ms` }}
                >
                  <span className="text-[#e8a820]/40 mr-2 text-sm">0{i + 1}</span>
                  {l.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  const [charIndex, setCharIndex] = useState(0);
  const title = "BUMBLEBEES";

  useEffect(() => {
    if (charIndex < title.length) {
      const t = setTimeout(() => setCharIndex(charIndex + 1), 110);
      return () => clearTimeout(t);
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

// ─── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#2d2d2d", marginTop: "-1px" }}
    >
      <HexPattern opacity={0.05} id="hex-about" />
      <GrungeOverlay opacity={0.025} />

      {/* Oversized background text */}
      <div
        className="absolute -right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(8rem, 20vw, 18rem)",
          fontWeight: 900,
          color: "rgba(232,168,32,0.04)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        ROCK
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Offset section header — left-aligned */}
        <FadeIn direction="left" className="mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-[#e8a820]" />
            <p
              className="text-[#e8a820] tracking-[0.4em] text-xs uppercase"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              ★ Le Groupe ★
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image side — offset with hex frame */}
          <FadeIn direction="left">
            <div className="relative">
              {/* Large hex frame behind image */}
              <svg
                className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] pointer-events-none"
                viewBox="0 0 400 300"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="20,0 380,0 400,20 400,280 380,300 20,300 0,280 0,20"
                  fill="none"
                  stroke="rgba(232,168,32,0.15)"
                  strokeWidth="1"
                />
              </svg>
              <img
                src="/manus-storage/guitar-smoke_214b3f3a.jpg"
                alt="Bumblebees en concert"
                className="w-full object-cover relative z-10"
                style={{
                  aspectRatio: "3/2",
                  clipPath: "polygon(0 0, 94% 0, 100% 6%, 100% 100%, 6% 100%, 0 94%)",
                  border: "1px solid rgba(232,168,32,0.25)",
                }}
              />
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#e8a820] z-20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#e8a820] z-20" />
              {/* Red accent mark */}
              <div
                className="absolute -bottom-3 left-8 px-3 py-1 text-xs tracking-widest uppercase z-20"
                style={{
                  background: "#c0392b",
                  color: "#f5f0e8",
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 600,
                }}
              >
                Live
              </div>
            </div>
          </FadeIn>

          {/* Text side */}
          <FadeIn delay={0.2} direction="right">
            <div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#f5f0e8",
                  textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
                }}
              >
                Pas de compromis.
                <br />
                <span style={{ color: "#e8a820", fontStyle: "italic" }}>Que du rock.</span>
              </h2>
              <div className="w-16 h-1 mb-6" style={{ background: "linear-gradient(90deg, #e8a820, #c0392b)" }} />
              <p
                className="text-[#f5f0e8]/75 leading-relaxed mb-5"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: "1.05rem" }}
              >
                Nés en 2023, les Bumblebees sont un groupe de rock qui fait revivre les légendes. 
                De Led Zeppelin à AC/DC, de Queen à The Rolling Stones — on joue les classiques 
                qui ont forgé l'histoire du rock avec l'énergie brute d'une scène qui vibre.
              </p>
              <p
                className="text-[#f5f0e8]/75 leading-relaxed mb-10"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: "1.05rem" }}
              >
                Comme l'abeille qui bourdonne sans jamais s'arrêter, les Bumblebees jouent fort, 
                jouent vrai, et laissent une trace dans chaque salle où ils passent.
              </p>

              {/* Stats with hex badges */}
              <div className="flex gap-8">
                {[
                  { num: "2023", label: "Fondé" },
                  { num: "50+", label: "Concerts" },
                  { num: "100%", label: "Rock" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center">
                    <HexBadge size={70}>
                      <span
                        className="text-xl font-black"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {s.num}
                      </span>
                    </HexBadge>
                    <div
                      className="text-[#f5f0e8]/50 text-xs tracking-widest uppercase mt-2"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Diagonal bottom cut to concerts section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "#111111",
          clipPath: "polygon(0 100%, 100% 0%, 100% 100%)",
        }}
      />
    </section>
  );
}

// ─── Concerts Section ──────────────────────────────────────────────────────────
const concerts = [
  { date: "15 Août 2026", venue: "Le Café de la Plage", city: "Marseille", time: "21h00", type: "Concert" },
  { date: "22 Août 2026", venue: "Rock en Scène", city: "Lyon", time: "20h30", type: "Festival" },
  { date: "5 Septembre 2026", venue: "La Cigale", city: "Paris", time: "21h30", type: "Concert" },
  { date: "19 Septembre 2026", venue: "Le Bikini", city: "Toulouse", time: "20h00", type: "Concert" },
  { date: "3 Octobre 2026", venue: "Stereolux", city: "Nantes", time: "21h00", type: "Concert" },
];

function ConcertsSection() {
  return (
    <section
      id="concerts"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#111111", marginTop: "-1px" }}
    >
      {/* Background concert image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/manus-storage/concert-crowd_5f8ad508.jpg')",
          opacity: 0.1,
        }}
      />
      <HexPattern opacity={0.04} id="hex-concerts" />
      <GrungeOverlay opacity={0.03} />

      {/* Oversized "LIVE" background text */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(8rem, 22vw, 20rem)",
          fontWeight: 900,
          color: "rgba(192,57,43,0.05)",
          lineHeight: 1,
        }}
      >
        LIVE
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Offset header — right-aligned */}
        <FadeIn direction="right" className="mb-16 text-right">
          <div className="flex items-center justify-end gap-4 mb-4">
            <p
              className="text-[#e8a820] tracking-[0.4em] text-xs uppercase"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              ★ Prochaines dates ★
            </p>
            <div className="w-12 h-px bg-[#e8a820]" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-black"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#f5f0e8",
              textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
            }}
          >
            On joue <span style={{ color: "#e8a820", fontStyle: "italic" }}>ce soir</span>
          </h2>
        </FadeIn>

        <div className="space-y-2">
          {concerts.map((c, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div
                className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 relative overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(45,45,45,0.7)",
                  border: "1px solid rgba(232,168,32,0.12)",
                  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  borderLeft: i % 2 === 0 ? "3px solid rgba(232,168,32,0.4)" : "3px solid rgba(192,57,43,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(232,168,32,0.07)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(232,168,32,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(45,45,45,0.7)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(232,168,32,0.12)";
                }}
              >
                {/* Number */}
                <div
                  className="hidden sm:block text-3xl font-black opacity-20 flex-shrink-0 w-10"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#e8a820" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Date */}
                <div className="sm:w-40 flex-shrink-0">
                  <div
                    className="text-[#e8a820] font-bold text-base"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {c.date}
                  </div>
                  <div
                    className="text-[#f5f0e8]/40 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {c.time}
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-[#e8a820]/15 flex-shrink-0" />

                {/* Venue */}
                <div className="flex-1">
                  <div
                    className="text-[#f5f0e8] font-semibold text-base"
                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
                  >
                    {c.venue}
                  </div>
                  <div
                    className="text-[#f5f0e8]/45 text-sm"
                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300 }}
                  >
                    {c.city}
                  </div>
                </div>

                {/* Type badge */}
                <div
                  className="flex-shrink-0 px-3 py-1 text-xs tracking-widest uppercase"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    background: c.type === "Festival" ? "rgba(192,57,43,0.25)" : "rgba(232,168,32,0.12)",
                    color: c.type === "Festival" ? "#e8756a" : "#e8a820",
                    border: `1px solid ${c.type === "Festival" ? "rgba(192,57,43,0.5)" : "rgba(232,168,32,0.3)"}`,
                  }}
                >
                  {c.type}
                </div>

                <div className="flex-shrink-0 text-[#e8a820]/30 group-hover:text-[#e8a820] transition-colors text-xl">
                  →
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} className="text-right mt-10">
          <p
            className="text-[#f5f0e8]/30 text-xs tracking-widest"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            ★ Toutes les dates sur nos réseaux sociaux ★
          </p>
        </FadeIn>
      </div>

      {/* Diagonal cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "#2d2d2d", clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
      />
    </section>
  );
}

// ─── Setlist / Répertoire ──────────────────────────────────────────────────────
const bands = [
  "AC/DC", "Led Zeppelin", "Queen", "The Rolling Stones", "Guns N' Roses",
  "Deep Purple", "Black Sabbath", "Aerosmith", "Bon Jovi", "The Who",
  "Metallica", "Nirvana", "Foo Fighters", "KISS", "Van Halen",
  "Lynyrd Skynyrd", "ZZ Top", "Creedence Clearwater Revival", "The Doors", "Jimi Hendrix",
];

function SetlistSection() {
  return (
    <section
      id="setlist"
      className="relative py-24 overflow-hidden"
      style={{ background: "#2d2d2d", marginTop: "-1px" }}
    >
      <HexPattern opacity={0.06} id="hex-setlist" />
      <GrungeOverlay opacity={0.025} />

      {/* Oversized background text */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(6rem, 18vw, 16rem)",
          fontWeight: 900,
          color: "rgba(232,168,32,0.03)",
          lineHeight: 1,
        }}
      >
        LEGENDS
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Offset header */}
        <FadeIn direction="left" className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#e8a820]" />
            <p
              className="text-[#e8a820] tracking-[0.4em] text-xs uppercase"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              ★ Répertoire ★
            </p>
          </div>
          <h2
            className="text-4xl md:text-6xl font-black"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#f5f0e8",
            }}
          >
            Les <span style={{ color: "#e8a820", fontStyle: "italic" }}>Légendes</span>
          </h2>
          <p
            className="text-[#f5f0e8]/40 mt-3 text-sm tracking-widest"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300 }}
          >
            Un voyage à travers l'histoire du rock
          </p>
        </FadeIn>

        <FadeIn>
          <div className="flex flex-wrap gap-3">
            {bands.map((band, i) => (
              <motion.span
                key={band}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="px-4 py-2 text-sm tracking-wider cursor-default"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 500,
                  color: "#f5f0e8",
                  background: "rgba(232,168,32,0.07)",
                  border: "1px solid rgba(232,168,32,0.18)",
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.background = "rgba(232,168,32,0.2)";
                  (e.currentTarget as HTMLSpanElement).style.color = "#e8a820";
                  (e.currentTarget as HTMLSpanElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.background = "rgba(232,168,32,0.07)";
                  (e.currentTarget as HTMLSpanElement).style.color = "#f5f0e8";
                  (e.currentTarget as HTMLSpanElement).style.transform = "translateY(0)";
                }}
              >
                {band}
              </motion.span>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Diagonal cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "#111111", clipPath: "polygon(0 100%, 100% 0%, 100% 100%)" }}
      />
    </section>
  );
}

// ─── Gallery Section ───────────────────────────────────────────────────────────
function GallerySection() {
  const images = [
    { src: "/manus-storage/hero-bg_42cf8845.jpg", alt: "Concert Bumblebees" },
    { src: "/manus-storage/guitar-smoke_214b3f3a.jpg", alt: "Guitare en action" },
    { src: "/manus-storage/concert-crowd_5f8ad508.jpg", alt: "Le public en feu" },
    { src: "/manus-storage/band-texture_97e6cfce.jpg", alt: "Ambiance rock" },
  ];

  return (
    <section
      id="gallery"
      className="relative py-24 overflow-hidden"
      style={{ background: "#111111", marginTop: "-1px" }}
    >
      <HexPattern opacity={0.04} id="hex-gallery" />
      <GrungeOverlay opacity={0.03} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered header with oversized accent */}
        <FadeIn className="mb-16 text-center">
          <p
            className="text-[#e8a820] tracking-[0.4em] text-xs uppercase mb-4"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            ★ Galerie ★
          </p>
          <h2
            className="text-4xl md:text-6xl font-black"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#f5f0e8",
            }}
          >
            L'<span style={{ color: "#e8a820", fontStyle: "italic" }}>énergie</span> en images
          </h2>
        </FadeIn>

        {/* Asymmetric gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-start">
          {images.map((img, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="group relative overflow-hidden"
                style={{
                  aspectRatio: i === 1 ? "2/3" : i === 2 ? "1/1.4" : "1/1",
                  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  marginTop: i === 1 ? "2rem" : i === 3 ? "-2rem" : "0",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Hex overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='h' x='0' y='0' width='30' height='26' patternUnits='userSpaceOnUse'%3E%3Cpolygon points='15,1 29,8.5 29,23.5 15,31 1,23.5 1,8.5' fill='none' stroke='%23e8a820' strokeWidth='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23h)'/%3E%3C/svg%3E")`,
                    opacity: 0.15,
                  }}
                />
                <div
                  className="absolute bottom-3 left-3 text-[#e8a820] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {img.alt}
                </div>
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#e8a820] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#e8a820] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Diagonal cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "#2d2d2d", clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
      />
    </section>
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#2d2d2d", marginTop: "-1px" }}
    >
      <HexPattern opacity={0.06} id="hex-contact" />
      <GrungeOverlay opacity={0.025} />

      {/* Oversized background text */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(6rem, 18vw, 16rem)",
          fontWeight: 900,
          color: "rgba(232,168,32,0.03)",
          lineHeight: 1,
        }}
      >
        CONTACT
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Offset header */}
        <FadeIn direction="right" className="mb-16 text-right">
          <div className="flex items-center justify-end gap-4 mb-4">
            <p
              className="text-[#e8a820] tracking-[0.4em] text-xs uppercase"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              ★ Nous contacter ★
            </p>
            <div className="w-12 h-px bg-[#e8a820]" />
          </div>
          <h2
            className="text-4xl md:text-6xl font-black"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#f5f0e8",
            }}
          >
            Prêt à <span style={{ color: "#e8a820", fontStyle: "italic" }}>vibrer ?</span>
          </h2>
          <p
            className="text-[#f5f0e8]/40 mt-3 text-sm"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300 }}
          >
            Pour les réservations, collaborations ou juste pour dire que vous nous aimez
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact info */}
          <FadeIn direction="left">
            <div className="space-y-6">
              {[
                { icon: "✉", label: "Email", value: "contact@bumblebees-rock.fr" },
                { icon: "📱", label: "Réseaux", value: "@BumblebeesRock" },
                { icon: "🎸", label: "Booking", value: "booking@bumblebees-rock.fr" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <HexBadge size={52}>
                    <span className="text-lg">{item.icon}</span>
                  </HexBadge>
                  <div className="pt-2">
                    <div
                      className="text-[#e8a820] text-xs tracking-widest uppercase mb-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-[#f5f0e8]/70 text-sm"
                      style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300 }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div className="pt-6">
                <div className="w-16 h-px bg-gradient-to-r from-[#e8a820] to-[#c0392b] mb-6" />
                <div className="flex flex-wrap gap-3">
                  {["Facebook", "Instagram", "YouTube", "Spotify"].map((s) => (
                    <button
                      key={s}
                      className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        color: "#e8a820",
                        border: "1px solid rgba(232,168,32,0.25)",
                        background: "transparent",
                        clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,168,32,0.15)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact form */}
          <FadeIn delay={0.2} direction="right">
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name", label: "Nom", type: "text", placeholder: "Votre nom" },
                { id: "email", label: "Email", type: "email", placeholder: "votre@email.fr" },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-[#e8a820] text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(17,17,17,0.8)",
                      border: "1px solid rgba(232,168,32,0.18)",
                      borderLeft: "3px solid rgba(232,168,32,0.4)",
                      color: "#f5f0e8",
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 300,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(232,168,32,0.6)";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(232,168,32,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(232,168,32,0.18)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="block text-[#e8a820] text-xs tracking-widest uppercase mb-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Votre message..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: "rgba(17,17,17,0.8)",
                    border: "1px solid rgba(232,168,32,0.18)",
                    borderLeft: "3px solid rgba(232,168,32,0.4)",
                    color: "#f5f0e8",
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 300,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(232,168,32,0.6)";
                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(232,168,32,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(232,168,32,0.18)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 font-bold tracking-widest uppercase text-sm transition-all duration-200"
                style={{
                  background: sent ? "#c0392b" : "#e8a820",
                  color: "#111",
                  fontFamily: "'Oswald', sans-serif",
                  clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                }}
                onMouseEnter={(e) => {
                  if (!sent) {
                    (e.currentTarget as HTMLButtonElement).style.background = "#f5c842";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!sent) {
                    (e.currentTarget as HTMLButtonElement).style.background = "#e8a820";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  }
                }}
              >
                {sent ? "★ Message envoyé ! ★" : "Envoyer le message →"}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="relative py-12 overflow-hidden"
      style={{ background: "#0d0d0d", borderTop: "1px solid rgba(232,168,32,0.15)" }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full absolute top-0 left-0" style={{ background: "linear-gradient(90deg, transparent, #e8a820, #c0392b, #e8a820, transparent)" }} />
      <HexPattern opacity={0.03} id="hex-footer" />
      <GrungeOverlay opacity={0.02} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + name — tour poster style */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="/public/images/logo.jpg"
                alt="Bumblebees"
                className="w-14 h-14 rounded-full object-cover"
                style={{ border: "2px solid rgba(232,168,32,0.4)", boxShadow: "0 0 20px rgba(232,168,32,0.15)" }}
              />
            </div>
            <div>
              <div
                className="text-[#e8a820] font-bold text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Bumblebees
              </div>
              <div
                className="text-[#f5f0e8]/30 text-xs tracking-[0.35em] uppercase mt-0.5"
                style={{ fontFamily: "'Special Elite', monospace" }}
              >
                Play Rock Legends
              </div>
              <div className="flex gap-1 mt-2">
                <span className="text-[#e8a820] text-xs">★</span>
                <span className="text-[#c0392b] text-xs">★</span>
                <span className="text-[#e8a820] text-xs">★</span>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Accueil", "Le Groupe", "Concerts", "Galerie", "Contact"].map((l, i) => (
              <a
                key={l}
                href={`#${["hero", "about", "concerts", "gallery", "contact"][i]}`}
                className="text-[#f5f0e8]/30 hover:text-[#e8a820] transition-colors text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {l}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div
            className="text-[#f5f0e8]/25 text-xs tracking-widest text-center md:text-right"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300 }}
          >
            © 2026 Bumblebees
            <br />
            <span className="text-[#e8a820]/30">Since 2023 — Rock never dies.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Home component ───────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#111111" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ConcertsSection />
      <SetlistSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
