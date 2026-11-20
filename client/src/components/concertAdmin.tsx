
import { useState } from "react";
import { Plus, Pencil, Trash2, X, Save, ExternalLink, CalendarDays, MapPin } from "lucide-react";

interface Concert {
  id: number;
  date: string;
  address: string;
  link: string;
}

export default function ConcertAdmin() {
  const [concerts, setConcerts] = useState<Concert[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [link, setLink] = useState("");

  // Réinitialiser le formulaire
  const resetForm = () => {
    setDate("");
    setAddress("");
    setLink("");
    setEditingId(null);
    setFormOpen(false);
  };

  // Ajouter ou modifier un concert
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !address.trim()) {
      return;
    }

    if (editingId !== null) {
      setConcerts((prev) =>
        prev.map((concert) =>
          concert.id === editingId
            ? { ...concert, date, address, link }
            : concert
        )
      );
    } else {
      const newConcert: Concert = {
        id: Date.now(),
        date,
        address: address.trim(),
        link: link.trim(),
      };

      setConcerts((prev) => [...prev, newConcert]);
    }

    resetForm();
  };

  // Préparer la modification
  const handleEdit = (concert: Concert) => {
    setEditingId(concert.id);
    setDate(concert.date);
    setAddress(concert.address);
    setLink(concert.link);
    setFormOpen(true);
  };

  // Supprimer un concert
  const handleDelete = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce concert ?")) {
      setConcerts((prev) =>
        prev.filter((concert) => concert.id !== id)
      );
    }
  };

  // Affichage de la date
  const formatDate = (dateString: string) => {
    return new Date(dateString + "T12:00:00").toLocaleDateString(
      "fr-FR",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
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
            Gestion des concerts
          </h2>

          <p className="text-m text-[#f5f0e8]/50 mt-1">
            Gérez les dates et lieux de vos prochains concerts.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setFormOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-[#e8a820] text-[#171717] font-bold uppercase tracking-wider text-sm hover:bg-[#f5c04e] transition-colors"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <Plus size={18} />
          Ajouter un concert
        </button>
      </div>

      {/* Formulaire */}
      {formOpen && (
        <div className="border border-[#e8a820]/30 bg-[#1c1c1c] p-6">

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#e8a820]">
              {editingId !== null
                ? "Modifier le concert"
                : "Nouveau concert"}
            </h3>

            <button
              onClick={resetForm}
              className="text-[#f5f0e8]/50 hover:text-[#e8a820]"
              aria-label="Fermer"
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Date */}
            <div>
              <label className="block text-sm mb-2 text-[#f5f0e8]/70">
                Date du concert *
              </label>

              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#111] border border-[#e8a820]/20 p-3 text-[#f5f0e8] focus:border-[#e8a820] outline-none"
              />
            </div>

            {/* Adresse */}
            <div>
              <label className="block text-sm mb-2 text-[#f5f0e8]/70">
                Adresse du concert *
              </label>

              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ex : Le Café de la Plage, Marseille"
                className="w-full bg-[#111] border border-[#e8a820]/20 p-3 text-[#f5f0e8] placeholder:text-[#f5f0e8]/25 focus:border-[#e8a820] outline-none"
              />
            </div>

            {/* Lien facultatif */}
            <div>
              <label className="block text-sm mb-2 text-[#f5f0e8]/70">
                Lien externe (facultatif)
              </label>

              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#111] border border-[#e8a820]/20 p-3 text-[#f5f0e8] placeholder:text-[#f5f0e8]/25 focus:border-[#e8a820] outline-none"
              />

              <p className="text-xs text-[#f5f0e8]/35 mt-2">
                Billetterie, événement Facebook, site internet...
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-[#e8a820] text-[#171717] font-bold uppercase text-sm hover:bg-[#f5c04e]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <Save size={17} />
                {editingId !== null ? "Enregistrer" : "Ajouter"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-[#f5f0e8]/20 text-[#f5f0e8]/70 hover:border-[#e8a820] hover:text-[#e8a820] uppercase text-sm"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des concerts */}
      <div className="space-y-3">

        <div className="flex justify-between items-center pb-3 border-b border-[#e8a820]/20">
          <h3 className="text-sm uppercase tracking-widest text-[#f5f0e8]/60">
            Liste des concerts
          </h3>

          <span className="text-sm text-[#e8a820]">
            {concerts.length} concert(s)
          </span>
        </div>

        {concerts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#e8a820]/20">
            <CalendarDays
              size={36}
              className="mx-auto text-[#e8a820]/40 mb-4"
            />

            <p className="text-[#f5f0e8]/60">
              Aucun concert enregistré.
            </p>

            <p className="text-sm text-[#f5f0e8]/30 mt-2">
              Cliquez sur "Ajouter un concert" pour commencer.
            </p>
          </div>
        ) : (
          concerts
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((concert, index) => (
              <div
                key={concert.id}
                className="flex flex-wrap items-center gap-4 p-5 bg-[#222] border border-[#e8a820]/10 hover:border-[#e8a820]/40 transition-colors"
              >

                {/* Numéro */}
                <div className="text-2xl font-bold text-[#e8a820]/40 min-w-10">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Informations */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 text-[#e8a820]">
                    <CalendarDays size={16} />
                    <span className="font-bold">
                      {formatDate(concert.date)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#f5f0e8]/60 text-sm">
                    <MapPin size={16} />
                    <span>{concert.address}</span>
                  </div>

                  {concert.link && (
                    <a
                      href={concert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-[#e8a820] hover:underline"
                    >
                      Voir le lien <ExternalLink size={13} />
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(concert)}
                    className="p-3 border border-[#e8a820]/20 text-[#e8a820] hover:bg-[#e8a820] hover:text-[#171717] transition-colors"
                    title="Modifier"
                    aria-label="Modifier le concert"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => handleDelete(concert.id)}
                    className="p-3 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                    title="Supprimer"
                    aria-label="Supprimer le concert"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
