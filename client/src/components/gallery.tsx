
import { useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import HexPattern from "@/components/ui/HexPattern";
import GrungeOverlay from "@/components/ui/GrungeOverlay";

interface GalleryImage {
  id: number;
  title: string;
  url: string;
}

const API_URL = "http://127.0.0.1:8000";

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/images/`);

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des images");
        }

        const data: GalleryImage[] = await response.json();
        setImages(data);

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

    fetchImages();
  }, []);

  return (
    <section
      id="gallery"
      className="relative py-24 overflow-hidden"
      style={{ background: "#111111", marginTop: "-1px" }}
    >
      <HexPattern opacity={0.04} id="hex-gallery" />
      <GrungeOverlay opacity={0.03} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <FadeIn className="mb-16 text-center">
          <p
            className="text-[#e8a820] tracking-[0.4em] text-xl uppercase mb-4"
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
            L'
            <span style={{ color: "#e8a820", fontStyle: "italic" }}>
              énergie
            </span>{" "}
            en images
          </h2>
        </FadeIn>

        {/* Loading */}
        {loading && (
          <p className="text-center text-[#e8a820] tracking-widest">
            Chargement de la galerie...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-400">
            {error}
          </p>
        )}

        {/* Empty gallery */}
        {!loading && !error && images.length === 0 && (
          <p className="text-center text-[#f5f0e8]/40">
            Aucune image disponible pour le moment.
          </p>
        )}

        {/* Gallery grid */}
        {!loading && !error && images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-start">

            {images.map((img, i) => (
              <FadeIn key={img.id} delay={i * 0.1}>
                <div
                  className="group relative overflow-hidden"
                  style={{
                    aspectRatio:
                      i % 4 === 1 ? "2/3" :
                      i % 4 === 2 ? "1/1.4" : "1/1",

                    clipPath:
                      "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",

                    marginTop:
                      i % 4 === 1 ? "2rem" :
                      i % 4 === 3 ? "-2rem" : "0",
                  }}
                >
                  <img
                    src={`${API_URL}${img.url}`}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hex overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='h' x='0' y='0' width='30' height='26' patternUnits='userSpaceOnUse'%3E%3Cpolygon points='15,1 29,8.5 29,23.5 15,31 1,23.5 1,8.5' fill='none' stroke='%23e8a820' strokeWidth='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23h)'/%3E%3C/svg%3E")`,
                      opacity: 0.15,
                    }}
                  />

                  {/* Image caption */}
                  <div
                    className="absolute bottom-3 left-3 text-[#e8a820] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {img.title}
                  </div>

                  {/* Gold corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#e8a820] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#e8a820] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </FadeIn>
            ))}

          </div>
        )}
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
