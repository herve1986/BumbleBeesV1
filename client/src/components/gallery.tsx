import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import FadeIn from "@/components/ui/FadeIn";
import HexPattern from "@/components/ui/HexPattern";
import GrungeOverlay from "@/components/ui/GrungeOverlay";

interface GalleryImage {
  id: number;
  title: string;
  url: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

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
          <p className="text-center text-red-400">{error}</p>
        )}

        {/* Empty gallery */}
        {!loading && !error && images.length === 0 && (
          <p className="text-center text-[#f5f0e8]/40">
            Aucune image disponible pour le moment.
          </p>
        )}

        {/* Gallery carousel */}
        {!loading && !error && images.length > 0 && (
          <div className="relative">

            {/* Navigation */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="w-11 h-11 border border-[#e8a820] text-[#e8a820]
                hover:bg-[#e8a820] hover:text-black transition-all"
                aria-label="Images précédentes"
              >
                ←
              </button>

              <button
                onClick={() => emblaApi?.scrollNext()}
                className="w-11 h-11 border border-[#e8a820] text-[#e8a820]
                hover:bg-[#e8a820] hover:text-black transition-all"
                aria-label="Images suivantes"
              >
                →
              </button>
            </div>

            {/* Embla viewport */}
            <div
              className="overflow-hidden pb-6"
              ref={emblaRef}
            >
              {/* Embla container */}
              <div className="flex gap-4">

                {images.map((img, i) => (
                  <div
                    key={img.id}
                    className="group relative flex-none w-[85%]
                    sm:w-[48%] lg:w-[32%] overflow-hidden"
                    style={{
                      aspectRatio: i % 3 === 1 ? "2/3" : "1/1",
                      clipPath:
                        "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                    }}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-contain
                      transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t
                    from-[#111]/80 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div
                      className="absolute bottom-3 left-3 text-[#e8a820]
                      text-xs tracking-widest uppercase opacity-0
                      group-hover:opacity-100 transition-opacity duration-300"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {img.title}
                    </div>

                    <div className="absolute top-0 left-0 w-6 h-6
                    border-t-2 border-l-2 border-[#e8a820] opacity-0
                    group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-0 right-0 w-6 h-6
                    border-b-2 border-r-2 border-[#e8a820] opacity-0
                    group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}

              </div>
            </div>
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
