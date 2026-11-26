
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import HexPattern from "@/components/ui/HexPattern";
import GrungeOverlay from "@/components/ui/GrungeOverlay";
import { API_URL } from "@/const";

interface Group {
  id: number;
  name: string;
}

interface Music {
  id: number;
  title: string;
  group_id: number;
}

export default function SetlistSection() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Groupe sélectionné
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  // Morceaux du groupe sélectionné
  const [musics, setMusics] = useState<Music[]>([]);
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicError, setMusicError] = useState<string | null>(null);

  // Récupération des groupes
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`${API_URL}/groups/`);

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des groupes");
        }

        const data: Group[] = await response.json();
        setGroups(data);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Une erreur inconnue est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Récupération des morceaux du groupe sélectionné
  useEffect(() => {
    if (selectedGroupId === null) {
      setMusics([]);
      setMusicError(null);
      return;
    }

    const controller = new AbortController();

    const fetchMusics = async () => {
      try {
        setMusicLoading(true);
        setMusicError(null);
        setMusics([]);

        const response = await fetch(
          `${API_URL}/musics/group/${selectedGroupId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Impossible de récupérer les morceaux");
        }

        const data: Music[] = await response.json();
        setMusics(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error(err);

        setMusicError(
          err instanceof Error
            ? err.message
            : "Une erreur inconnue est survenue"
        );
      } finally {
        if (!controller.signal.aborted) {
          setMusicLoading(false);
        }
      }
    };

    fetchMusics();

    return () => controller.abort();
  }, [selectedGroupId]);

  // Ouvrir ou fermer un groupe
  const handleGroupClick = (groupId: number) => {
    setSelectedGroupId((currentId) =>
      currentId === groupId ? null : groupId
    );
  };

  return (
    <section
      id="setlist"
      className="relative py-24 overflow-hidden"
      style={{ background: "#2d2d2d", marginTop: "-1px" }}
    >
      <HexPattern opacity={0.06} id="hex-setlist" />
      <GrungeOverlay opacity={0.025} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
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

        {/* Liste des groupes */}
        <FadeIn>
          {loading && (
            <p className="text-[#e8a820] text-sm tracking-widest">
              Chargement du répertoire...
            </p>
          )}

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {!loading && !error && groups.length === 0 && (
            <p className="text-[#f5f0e8]/40 text-sm">
              Aucun groupe disponible pour le moment.
            </p>
          )}

          {!loading && !error && groups.length > 0 && (
            <>
              <p className="text-[#f5f0e8]/40 text-xs tracking-widest uppercase mb-5">
                Cliquez sur un groupe pour découvrir nos morceaux
              </p>

              <div className="flex flex-wrap gap-3">
                {groups.map((group, i) => {
                  const isSelected = selectedGroupId === group.id;

                  return (
                    <motion.button
                      key={group.id}
                      type="button"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      onClick={() => handleGroupClick(group.id)}
                      aria-expanded={isSelected}
                      className="px-4 py-2 text-sm tracking-wider cursor-pointer flex items-center gap-2"
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontWeight: 500,
                        color: isSelected ? "#e8a820" : "#f5f0e8",
                        background: isSelected
                          ? "rgba(232,168,32,0.2)"
                          : "rgba(232,168,32,0.07)",
                        border: `1px solid ${
                          isSelected
                            ? "rgba(232,168,32,0.7)"
                            : "rgba(232,168,32,0.18)"
                        }`,
                        clipPath:
                          "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background =
                            "rgba(232,168,32,0.2)";
                          e.currentTarget.style.color = "#e8a820";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background =
                            "rgba(232,168,32,0.07)";
                          e.currentTarget.style.color = "#f5f0e8";
                          e.currentTarget.style.transform = "translateY(0)";
                        }
                      }}
                    >
                      {group.name}

                      <span className="text-xs">
                        {isSelected ? "−" : "+"}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Liste des morceaux */}
              {selectedGroupId !== null && (
                <motion.div
                  key={selectedGroupId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-10 p-6 sm:p-8 border border-[#e8a820]/25 bg-[#171717]/70"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-[#e8a820]" />

                    <div>
                      <p className="text-[#e8a820] text-xs tracking-[0.3em] uppercase">
                        Notre répertoire
                      </p>

                      <h3
                        className="text-2xl sm:text-3xl text-[#f5f0e8] font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {groups.find(
                          (group) => group.id === selectedGroupId
                        )?.name}
                      </h3>
                    </div>
                  </div>

                  {musicLoading && (
                    <p className="text-[#e8a820] text-sm">
                      Chargement des morceaux...
                    </p>
                  )}

                  {musicError && (
                    <p className="text-red-400 text-sm">
                      {musicError}
                    </p>
                  )}

                  {!musicLoading && !musicError && musics.length === 0 && (
                    <p className="text-[#f5f0e8]/40 text-sm">
                      Aucun morceau enregistré pour ce groupe pour le moment.
                    </p>
                  )}

                  {!musicLoading && !musicError && musics.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {musics.map((music, index) => (
                        <motion.div
                          key={music.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.04,
                            duration: 0.3,
                          }}
                          className="flex items-center gap-3 p-3 border border-white/5 bg-white/[0.03] hover:border-[#e8a820]/30 transition-colors"
                        >
                          <span className="text-[#e8a820] text-sm font-bold">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className="text-[#f5f0e8] text-sm tracking-wide"
                            style={{ fontFamily: "'Oswald', sans-serif" }}
                          >
                            {music.title}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </>
          )}
        </FadeIn>
      </div>

      {/* Découpe diagonale */}
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
