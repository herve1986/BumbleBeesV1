import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import HexPattern from "@/components/ui/HexPattern";
import GrungeOverlay from "@/components/ui/GrungeOverlay";

const bands = [
  "AC/DC",
  "Alannah Myles",
  "BB King",
  "The Beatles",
  "Blondie",
  "Booker T",
  "Bryan Adams",
  "Chris Rea",
  "Chuck Berry",
  "The Cranberries",
  "Cream",
  "Creedence Clearwater Revival",
  "Dire Straits",
  "Dolly Parton / De Palmas",
  "The Doobie Brothers",
  "The Doors",
  "The Eagles",
  "Elvis Presley",
  "Eric Clapton",
  "George Harrison",
  "Greenday",
  "Jefferson Airplane",
  "Jethro Tull",
  "John Mayall",
  "Johnny Rivers",
  "Jon Bon Jovi",
  "Kansas",
  "Krokus",
  "Lynyrd Skynyrd",
  "Otis Rush",
  "Patti Smith",
  "Procol Harum",
  "REM",
  "Rolling Stones",
  "Santana",
  "Shocking Blue",
  "Steppenwolf",
  "Stevie Ray Vaughan",
  "Texas",
  "Toto",
  "Vaya Con Dios",
];

export default function SetlistSection() {
  return (
    <section
      id="setlist"
      className="relative py-24 overflow-hidden"
      style={{ background: "#2d2d2d", marginTop: "-1px" }}
    >
      <HexPattern opacity={0.06} id="hex-setlist" />
      <GrungeOverlay opacity={0.025} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeIn direction="left" className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#e8a820]" />

            <p
              className="text-[#e8a820] tracking-[0.4em] text-xl uppercase"
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
            Les{" "}
            <span style={{ color: "#e8a820", fontStyle: "italic" }}>
              Légendes
            </span>
          </h2>

          <p
            className="text-[#f5f0e8]/40 mt-3 text-sm tracking-widest"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 300,
            }}
          >
            Un voyage à travers l'histoire du rock
          </p>
        </FadeIn>

        {/* Bands */}
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
                  clipPath:
                    "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(232,168,32,0.2)";
                  e.currentTarget.style.color = "#e8a820";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(232,168,32,0.07)";
                  e.currentTarget.style.color = "#f5f0e8";
                  e.currentTarget.style.transform = "translateY(0)";
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
        style={{
          background: "#111111",
          clipPath: "polygon(0 100%, 100% 0%, 100% 100%)",
        }}
      />
    </section>
  );
}
