
import { useState, type FormEvent } from "react";
import {Plus,Pencil,Trash2,X,Save,Music,Disc3,ChevronDown,ChevronUp,} from "lucide-react";

interface Song {
  id: number;
  title: string;
}

interface Artist {
  id: number;
  name: string;
  songs: Song[];
}

export default function SetlistAdmin() {
  const [artists, setArtists] = useState<Artist[]>([]);

  // Formulaire groupe / artiste
  const [groupFormOpen, setGroupFormOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [groupName, setGroupName] = useState("");

  // Formulaire morceau
  const [songFormGroupId, setSongFormGroupId] = useState<number | null>(null);
  const [editingSongId, setEditingSongId] = useState<number | null>(null);
  const [songTitle, setSongTitle] = useState("");

  // Groupes ouverts / fermés
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);

  // Tri alphabétique
  const sortedArtists = [...artists].sort((a, b) =>
    a.name.localeCompare(b.name, "fr", { sensitivity: "base" })
  );

  const sortSongs = (songs: Song[]) =>
    [...songs].sort((a, b) =>
      a.title.localeCompare(b.title, "fr", { sensitivity: "base" })
    );

  // Réinitialiser le formulaire groupe
  const resetGroupForm = () => {
    setGroupName("");
    setEditingGroupId(null);
    setGroupFormOpen(false);
  };

  // Ajouter ou modifier un groupe
  const handleGroupSubmit = (e: FormEvent) => {
    e.preventDefault();

    const name = groupName.trim();
    if (!name) return;

    if (editingGroupId !== null) {
      setArtists((prev) =>
        prev.map((artist) =>
          artist.id === editingGroupId
            ? { ...artist, name }
            : artist
        )
      );
    } else {
      const newArtist: Artist = {
        id: Date.now(),
        name,
        songs: [],
      };

      setArtists((prev) => [...prev, newArtist]);
      setExpandedGroups((prev) => [...prev, newArtist.id]);
    }

    resetGroupForm();
  };

  // Préparer la modification d'un groupe
  const handleEditGroup = (artist: Artist) => {
    setGroupName(artist.name);
    setEditingGroupId(artist.id);
    setGroupFormOpen(true);
  };

  // Supprimer un groupe
  const handleDeleteGroup = (id: number) => {
    const artist = artists.find((a) => a.id === id);
    if (!artist) return;

    const message =
      artist.songs.length > 0
        ? `Supprimer "${artist.name}" et ses ${artist.songs.length} morceau(x) ?`
        : `Supprimer "${artist.name}" ?`;

    if (window.confirm(message)) {
      setArtists((prev) => prev.filter((a) => a.id !== id));
      setExpandedGroups((prev) => prev.filter((groupId) => groupId !== id));

      if (editingGroupId === id) resetGroupForm();
      if (songFormGroupId === id) resetSongForm();
    }
  };

  // Réinitialiser le formulaire morceau
  function resetSongForm() {
    setSongTitle("");
    setSongFormGroupId(null);
    setEditingSongId(null);
  }

  // Ajouter ou modifier un morceau
  const handleSongSubmit = (e: FormEvent) => {
    e.preventDefault();

    const title = songTitle.trim();
    if (!title || songFormGroupId === null) return;

    setArtists((prev) =>
      prev.map((artist) => {
        if (artist.id !== songFormGroupId) return artist;

        if (editingSongId !== null) {
          return {
            ...artist,
            songs: artist.songs.map((song) =>
              song.id === editingSongId
                ? { ...song, title }
                : song
            ),
          };
        }

        return {
          ...artist,
          songs: [...artist.songs, { id: Date.now(), title }],
        };
      })
    );

    resetSongForm();
  };

  // Préparer la modification d'un morceau
  const handleEditSong = (artist: Artist, song: Song) => {
    setSongFormGroupId(artist.id);
    setEditingSongId(song.id);
    setSongTitle(song.title);
  };

  // Supprimer un morceau
  const handleDeleteSong = (artistId: number, songId: number) => {
    if (window.confirm("Supprimer ce morceau ?")) {
      setArtists((prev) =>
        prev.map((artist) =>
          artist.id === artistId
            ? {
                ...artist,
                songs: artist.songs.filter(
                  (song) => song.id !== songId
                ),
              }
            : artist
        )
      );
    }
  };

  // Ouvrir / fermer un groupe
  const toggleGroup = (id: number) => {
    setExpandedGroups((prev) =>
      prev.includes(id)
        ? prev.filter((groupId) => groupId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="text-[#f5f0e8] space-y-8">

      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2
            className="text-3xl font-bold text-[#e8a820]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gestion du répertoire
          </h2>

          <p className="text-m text-[#f5f0e8]/50 mt-1">
            Gérez vos artistes et les morceaux de votre répertoire.
          </p>
        </div>

        <button
          onClick={() => {
            resetGroupForm();
            setGroupFormOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-[#e8a820] text-[#171717] font-bold uppercase tracking-wider text-sm hover:bg-[#f5c04e] transition-colors"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <Plus size={18} />
          Ajouter un groupe
        </button>
      </div>

      {/* Formulaire groupe */}
      {groupFormOpen && (
        <div className="border border-[#e8a820]/30 bg-[#1c1c1c] p-6">

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#e8a820]">
              {editingGroupId !== null
                ? "Modifier le groupe / artiste"
                : "Nouveau groupe / artiste"}
            </h3>

            <button
              onClick={resetGroupForm}
              className="text-[#f5f0e8]/50 hover:text-[#e8a820]"
              aria-label="Fermer"
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleGroupSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-[#f5f0e8]/70">
                Nom du groupe ou de l'artiste *
              </label>

              <input
                type="text"
                required
                autoFocus
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Ex : AC/DC, Queen, The Rolling Stones..."
                className="w-full bg-[#111] border border-[#e8a820]/20 p-3 text-[#f5f0e8] placeholder:text-[#f5f0e8]/25 focus:border-[#e8a820] outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-[#e8a820] text-[#171717] font-bold uppercase text-sm hover:bg-[#f5c04e]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <Save size={17} />
                {editingGroupId !== null ? "Enregistrer" : "Ajouter"}
              </button>

              <button
                type="button"
                onClick={resetGroupForm}
                className="px-6 py-3 border border-[#f5f0e8]/20 text-[#f5f0e8]/70 hover:border-[#e8a820] hover:text-[#e8a820] uppercase text-sm"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des groupes */}
      <div className="space-y-4">

        <div className="flex justify-between items-center pb-3 border-b border-[#e8a820]/20">
          <h3 className="text-sm uppercase tracking-widest text-[#f5f0e8]/60">
            Groupes et artistes
          </h3>

          <span className="text-sm text-[#e8a820]">
            {artists.length} artiste(s)
          </span>
        </div>

        {artists.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#e8a820]/20">
            <Disc3
              size={36}
              className="mx-auto text-[#e8a820]/40 mb-4"
            />

            <p className="text-[#f5f0e8]/60">
              Aucun groupe ou artiste enregistré.
            </p>

            <p className="text-sm text-[#f5f0e8]/30 mt-2">
              Cliquez sur "Ajouter un groupe" pour commencer.
            </p>
          </div>
        ) : (
          sortedArtists.map((artist, index) => {
            const isExpanded = expandedGroups.includes(artist.id);

            return (
              <div
                key={artist.id}
                className="border border-[#e8a820]/20 bg-[#222] overflow-hidden"
              >

                {/* En-tête du groupe */}
                <div className="flex flex-wrap items-center gap-4 p-5">

                  <div className="text-2xl font-bold text-[#e8a820]/40 min-w-10">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <button
                    onClick={() => toggleGroup(artist.id)}
                    className="flex-1 flex items-center gap-3 text-left min-w-0"
                  >
                    <Disc3 className="text-[#e8a820] shrink-0" size={22} />

                    <div className="min-w-0">
                      <h3 className="font-bold text-lg text-[#f5f0e8]">
                        {artist.name}
                      </h3>

                      <p className="text-xs text-[#f5f0e8]/40">
                        {artist.songs.length} morceau(x)
                      </p>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="ml-auto text-[#e8a820]" size={20} />
                    ) : (
                      <ChevronDown className="ml-auto text-[#e8a820]" size={20} />
                    )}
                  </button>

                  {/* Actions groupe */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditGroup(artist)}
                      className="p-3 border border-[#e8a820]/20 text-[#e8a820] hover:bg-[#e8a820] hover:text-[#171717] transition-colors"
                      title="Modifier le groupe"
                      aria-label="Modifier le groupe"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={() => handleDeleteGroup(artist.id)}
                      className="p-3 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Supprimer le groupe"
                      aria-label="Supprimer le groupe"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                {/* Contenu du groupe */}
                {isExpanded && (
                  <div className="border-t border-[#e8a820]/15 p-5 bg-[#191919]">

                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs uppercase tracking-widest text-[#f5f0e8]/50">
                        Répertoire de {artist.name}
                      </h4>

                      <button
                        onClick={() => {
                          resetSongForm();
                          setSongFormGroupId(artist.id);
                        }}
                        className="flex items-center gap-2 text-xs text-[#e8a820] hover:text-[#f5c04e] uppercase tracking-wider"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        <Plus size={16} />
                        Ajouter un morceau
                      </button>
                    </div>

                    {/* Formulaire morceau */}
                    {songFormGroupId === artist.id && (
                      <form
                        onSubmit={handleSongSubmit}
                        className="flex flex-wrap gap-3 mb-5 p-4 bg-[#222] border border-[#e8a820]/20"
                      >
                        <input
                          type="text"
                          required
                          autoFocus
                          value={songTitle}
                          onChange={(e) => setSongTitle(e.target.value)}
                          placeholder="Titre du morceau..."
                          className="flex-1 min-w-0 bg-[#111] border border-[#e8a820]/20 p-3 text-[#f5f0e8] placeholder:text-[#f5f0e8]/25 focus:border-[#e8a820] outline-none"
                        />

                        <button
                          type="submit"
                          className="flex items-center gap-2 px-5 py-3 bg-[#e8a820] text-[#171717] font-bold text-sm hover:bg-[#f5c04e]"
                        >
                          <Save size={16} />
                          {editingSongId !== null ? "Enregistrer" : "Ajouter"}
                        </button>

                        <button
                          type="button"
                          onClick={resetSongForm}
                          className="p-3 border border-[#f5f0e8]/20 text-[#f5f0e8]/60 hover:text-[#e8a820]"
                          aria-label="Annuler"
                        >
                          <X size={18} />
                        </button>
                      </form>
                    )}

                    {/* Liste des morceaux */}
                    {artist.songs.length === 0 ? (
                      <p className="text-sm text-[#f5f0e8]/35 py-4 text-center">
                        Aucun morceau dans ce répertoire.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {sortSongs(artist.songs).map((song, songIndex) => (
                          <div
                            key={song.id}
                            className="flex items-center gap-3 p-3 bg-[#222] border border-[#e8a820]/10 hover:border-[#e8a820]/30 transition-colors"
                          >
                            <Music
                              size={16}
                              className="text-[#e8a820]/60 shrink-0"
                            />

                            <span className="text-xs text-[#e8a820]/50 w-6">
                              {String(songIndex + 1).padStart(2, "0")}
                            </span>

                            <span className="flex-1 text-sm min-w-0">
                              {song.title}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditSong(artist, song)}
                                className="p-2 text-[#e8a820]/70 hover:text-[#e8a820]"
                                title="Modifier le morceau"
                                aria-label="Modifier le morceau"
                              >
                                <Pencil size={15} />
                              </button>

                              <button
                                onClick={() =>
                                  handleDeleteSong(artist.id, song.id)
                                }
                                className="p-2 text-red-400/70 hover:text-red-400"
                                title="Supprimer le morceau"
                                aria-label="Supprimer le morceau"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Résumé */}
      <div className="flex flex-wrap gap-6 p-5 border border-[#e8a820]/20 bg-[#1c1c1c]">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#f5f0e8]/40">
            Groupes / Artistes
          </p>
          <p className="text-2xl font-bold text-[#e8a820]">
            {artists.length}
          </p>
        </div>

        <div className="w-px bg-[#e8a820]/20" />

        <div>
          <p className="text-xs uppercase tracking-widest text-[#f5f0e8]/40">
            Morceaux au total
          </p>
          <p className="text-2xl font-bold text-[#e8a820]">
            {artists.reduce((total, artist) => total + artist.songs.length, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
