import FadeIn from "@/components/ui/FadeIn";
import HexPattern from "@/components/ui/HexPattern";
import GrungeOverlay from "@/components/ui/GrungeOverlay";

const concerts = [
  {
    date: "15 Août 2026",
    venue: "Le Café de la Plage",
    city: "Marseille",
    time: "21h00",
    type: "Concert",
  },
  {
    date: "22 Août 2026",
    venue: "Rock en Scène",
    city: "Lyon",
    time: "20h30",
    type: "Festival",
  },
  {
    date: "5 Septembre 2026",
    venue: "La Cigale",
    city: "Paris",
    time: "21h30",
    type: "Concert",
  },
  {
    date: "19 Septembre 2026",
    venue: "Le Bikini",
    city: "Toulouse",
    time: "20h00",
    type: "Concert",
  },
  {
    date: "3 Octobre 2026",
    venue: "Stereolux",
    city: "Nantes",
    time: "21h00",
    type: "Concert",
  },
];

export default function ConcertsSection() {
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
          backgroundImage:
            "url('/manus-storage/concert-crowd_5f8ad508.jpg')",
          opacity: 0.1,
        }}
      />

      <HexPattern opacity={0.04} id="hex-concerts" />
      <GrungeOverlay opacity={0.03} />

      {/* Oversized LIVE background text */}
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
        {/* Section header */}
        <FadeIn direction="right" className="mb-16 text-right">
          <div className="flex items-center justify-end gap-4 mb-4">
            <p
              className="text-[#e8a820] tracking-[0.4em] text-xl uppercase"
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
            On joue{" "}
            <span style={{ color: "#e8a820", fontStyle: "italic" }}>
              ce soir
            </span>
          </h2>
        </FadeIn>

        {/* Concert list */}
        <div className="space-y-2">
          {concerts.map((concert, i) => (
            <FadeIn key={`${concert.date}-${concert.venue}`} delay={i * 0.07}>
              <div
                className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 relative overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(45,45,45,0.7)",
                  border: "1px solid rgba(232,168,32,0.12)",
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  borderLeft:
                    i % 2 === 0
                      ? "3px solid rgba(232,168,32,0.4)"
                      : "3px solid rgba(192,57,43,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(232,168,32,0.07)";
                  e.currentTarget.style.borderColor =
                    "rgba(232,168,32,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(45,45,45,0.7)";
                  e.currentTarget.style.borderColor =
                    "rgba(232,168,32,0.12)";
                }}
              >
                {/* Number */}
                <div
                  className="hidden sm:block text-3xl font-black opacity-20 flex-shrink-0 w-10"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#e8a820",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Date and time */}
                <div className="sm:w-40 flex-shrink-0">
                  <div
                    className="text-[#e8a820] font-bold text-base"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {concert.date}
                  </div>

                  <div
                    className="text-[#f5f0e8]/40 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {concert.time}
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-[#e8a820]/15 flex-shrink-0" />

                {/* Venue and city */}
                <div className="flex-1">
                  <div
                    className="text-[#f5f0e8] font-semibold text-base"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {concert.venue}
                  </div>

                  <div
                    className="text-[#f5f0e8]/45 text-sm"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {concert.city}
                  </div>
                </div>

                {/* Type badge */}
                <div
                  className="flex-shrink-0 px-3 py-1 text-xs tracking-widest uppercase"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    background:
                      concert.type === "Festival"
                        ? "rgba(192,57,43,0.25)"
                        : "rgba(232,168,32,0.12)",
                    color:
                      concert.type === "Festival" ? "#e8756a" : "#e8a820",
                    border: `1px solid ${
                      concert.type === "Festival"
                        ? "rgba(192,57,43,0.5)"
                        : "rgba(232,168,32,0.3)"
                    }`,
                  }}
                >
                  {concert.type}
                </div>

                <div className="flex-shrink-0 text-[#e8a820]/30 group-hover:text-[#e8a820] transition-colors text-xl">
                  →
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Social media reminder */}
        <FadeIn delay={0.5} className="text-right mt-10">
          <p
            className="text-[#f5f0e8]/30 text-xs tracking-widest"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            ★ Toutes les dates sur nos réseaux sociaux ★
          </p>
        </FadeIn>
      </div>

      {/* Diagonal bottom cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "#2d2d2d",
          clipPath: "polygon(0 0, 100% 100%, 0 100%)",
        }}
      />
    </section>
  );
}
