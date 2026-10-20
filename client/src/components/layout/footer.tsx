import HexPattern from "../ui/HexPattern";
import GrungeOverlay from "../ui/GrungeOverlay";

export default function Footer() {
  const links = [
    { label: "Accueil", href: "#hero" },
    { label: "Le Groupe", href: "#about" },
    { label: "Concerts", href: "#concerts" },
    { label: "Galerie", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      className="relative py-12 overflow-hidden"
      style={{
        background: "#0d0d0d",
        borderTop: "1px solid rgba(232,168,32,0.15)",
      }}
    >
      {/* Ligne décorative supérieure */}
      <div
        className="absolute top-0 left-0 h-0.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e8a820, #c0392b, #e8a820, transparent)",
        }}
      />

      <HexPattern opacity={0.03} id="hex-footer" />
      <GrungeOverlay opacity={0.02} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo et nom du groupe */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="/images/logo.jpg"
                alt="Logo Bumblebees"
                className="w-14 h-14 rounded-full object-cover"
                style={{
                  border: "2px solid rgba(232,168,32,0.4)",
                  boxShadow: "0 0 20px rgba(232,168,32,0.15)",
                }}
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

          {/* Liens de navigation */}
          <nav
            aria-label="Navigation de pied de page"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#f5f0e8]/30 hover:text-[#e8a820] transition-colors text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div
            className="text-[#f5f0e8]/25 text-xs tracking-widest text-center md:text-right"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 300,
            }}
          >
            © {new Date().getFullYear()} Bumblebees
            <br />
            <span className="text-[#e8a820]/30">
              Since 2023 — Rock never dies.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}