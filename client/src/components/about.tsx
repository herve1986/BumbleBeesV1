import FadeIn from "@/components/ui/FadeIn";
import HexBadge from "@/components/ui/HexBadge";
import HexPattern from "@/components/ui/HexPattern";
import GrungeOverlay from "@/components/ui/GrungeOverlay";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#2d2d2d", marginTop: "-1px" }}
    >
      <HexPattern opacity={0.05} id="hex-about" />
      <GrungeOverlay opacity={0.025} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeIn direction="left" className="mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-[#e8a820]" />
            <p
              className="text-[#e8a820] tracking-[0.4em] text-xl uppercase"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              ★ Le Groupe ★
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative">
              <svg
                className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] pointer-events-none"
                viewBox="0 0 400 300"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <polygon
                  points="20,0 380,0 400,20 400,280 380,300 20,300 0,280 0,20"
                  fill="none"
                  stroke="rgba(232,168,32,0.15)"
                  strokeWidth="1"
                />
              </svg>

              <img
                src="/public/images/img1.jpg"
                alt="Bumblebees en concert"
                className="w-full object-cover relative z-10"
                style={{
                  aspectRatio: "3/2",
                  clipPath:
                    "polygon(0 0, 94% 0, 100% 6%, 100% 100%, 6% 100%, 0 94%)",
                  border: "1px solid rgba(232,168,32,0.25)",
                }}
              />

              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#e8a820] z-20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#e8a820] z-20" />

              {/* Red accent */}
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

          {/* Text */}
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
                <span style={{ color: "#e8a820", fontStyle: "italic" }}>
                  Que du rock.
                </span>
              </h2>

              <div
                className="w-16 h-1 mb-6"
                style={{
                  background: "linear-gradient(90deg, #e8a820, #c0392b)",
                }}
              />

              <p
                className="text-[#f5f0e8]/75 leading-relaxed mb-5"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 300,
                  fontSize: "1.05rem",
                }}
              >
                Nés en 2023, les Bumblebees sont un groupe de rock qui fait
                revivre les légendes. De Led Zeppelin à AC/DC, de Queen à The
                Rolling Stones — on joue les classiques qui ont forgé l'histoire
                du rock avec l'énergie brute d'une scène qui vibre.
              </p>

              <p
                className="text-[#f5f0e8]/75 leading-relaxed mb-10"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 300,
                  fontSize: "1.05rem",
                }}
              >
                Comme l'abeille qui bourdonne sans jamais s'arrêter, les
                Bumblebees jouent fort, jouent vrai, et laissent une trace dans
                chaque salle où ils passent.
              </p>

              {/* Stats */}
              <div className="flex gap-8">
                {[
                  { num: "2023", label: "Fondé" },
                  { num: "50+", label: "Concerts" },
                  { num: "100%", label: "Rock" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center"
                  >
                    <HexBadge size={70}>
                      <span
                        className="text-xl font-black"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {stat.num}
                      </span>
                    </HexBadge>

                    <div
                      className="text-[#f5f0e8]/50 text-xs tracking-widest uppercase mt-2"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Diagonal bottom cut */}
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
