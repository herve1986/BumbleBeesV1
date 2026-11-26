import { useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn"; // Ajoute une animation d'apparition
import HexPattern from "@/components/ui/HexPattern"; // Affiche un motif hexagonal en arrière-plan
import GrungeOverlay from "@/components/ui/GrungeOverlay"; // Ajoute une texture vieillie / grunge
import { API_URL } from "@/const";

interface Concert {
  id: number;
  address: string;
  city: string;
  date_concert: string;
  time_concert: string;
}

export default function ConcertsSection() {

  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchConcerts = async () => {
    try {
      const response = await fetch(`${API_URL}/concerts/`);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des concerts");
      }

      const data = await response.json();

      setConcerts(data);

    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }

    } finally {
      setLoading(false);
    }
    };

    fetchConcerts();
  }, []);

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
            <FadeIn key={concert.id} delay={i * 0.07}>
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
                    {new Date(concert.date_concert).toLocaleDateString("fr-BE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>

                  <div
                    className="text-[#f5f0e8]/40 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {concert.time_concert.slice(0, 5)}
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
                    {concert.address}
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
                    background: "rgba(232,168,32,0.12)",
                    color: "#e8a820",
                    border: "1px solid rgba(232,168,32,0.3)",
                  }}
                >
                  Concert
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Social media reminder */}
        <FadeIn delay={0.5} className="text-right mt-10">
          <p
            className="text-[#f5f0e8]/30 text-ms tracking-widest"
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
