import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Navigation ──────────────────────────────────────────────────────────────
export default function Navbar() {
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
        borderBottom: scrolled
          ? "1px solid rgba(232,168,32,0.25)"
          : "none",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e8a820, #c0392b, #e8a820, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/images/logo.jpg"
              alt="Bumblebees"
              className="h-11 w-11 rounded-full object-cover transition-all duration-300 group-hover:scale-110"
              style={{
                border: "2px solid #e8a820",
                boxShadow: "0 0 12px rgba(232,168,32,0.3)",
              }}
            />
          </div>

          <div className="hidden sm:block">
            <div
              className="text-[#e8a820] font-bold leading-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.15rem",
              }}
            >
              Bumblebees
            </div>

            <div
              className="text-[#f5f0e8]/40 leading-none mt-0.5"
              style={{
                fontFamily: "'Special Elite', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
              }}
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
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 500,
              }}
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
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-[#e8a820] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />

          <span
            className={`block w-6 h-0.5 bg-[#e8a820] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />

          <span
            className={`block w-6 h-0.5 bg-[#e8a820] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
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
            style={{
              background: "rgba(17,17,17,0.98)",
              borderTop: "1px solid rgba(232,168,32,0.2)",
            }}
          >
            <nav className="flex flex-col py-4 px-6 gap-0">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#f5f0e8] hover:text-[#e8a820] hover:pl-4 transition-all text-lg tracking-widest uppercase py-3 border-b border-[#e8a820]/10"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    transitionDelay: `${i * 30}ms`,
                  }}
                >
                  <span className="text-[#e8a820]/40 mr-2 text-sm">
                    0{i + 1}
                  </span>
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