import { authFetch } from "@/lib/api";
import { useEffect, useState, type FormEvent } from "react";
import {Plus,Pencil,Trash2,X,Save,CalendarDays,MapPin,Clock,} from "lucide-react";

interface Concert {
  id: number;
  address: string | null;
  city: string;
  date_concert: string | null;
  time_concert: string | null;
}

export default function ConcertAdmin() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  // Récupérer les concerts depuis FastAPI
  const fetchConcerts = async () => {
    try {
      setError(null);

      const response = await authFetch("/concerts/");

      if (!response.ok) {
        throw new Error("Impossible de récupérer les concerts.");
      }

      const data: Concert[] = await response.json();
      setConcerts(data);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  // Réinitialiser le formulaire
  const resetForm = () => {
    setDate("");
    setTime("");
    setAddress("");
    setCity("");
    setEditingId(null);
    setFormOpen(false);
  };

  // Ajouter ou modifier un concert
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("La ville est obligatoire.");
      return;
    }

    const concertData = {
      address: address.trim() || null,
      city: city.trim(),
      date_concert: date || null,
      time_concert: time || null,
    };

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const isEditing = editingId !== null;

      const response = await authFetch(
        isEditing ? `/concerts/${editingId}` : "/concerts/",
        {
          method: isEditing ? "PUT" : "POST",
          body: JSON.stringify(concertData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || "Erreur lors de l'enregistrement."
        );
      }

      setSuccess(
        isEditing
          ? "Concert modifié avec succès !"
          : "Concert ajouté avec succès !"
      );

      resetForm();
      await fetchConcerts();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue."
      );
    } finally {
      setSaving(false);
    }
  };

  // Préparer la modification
  const handleEdit = (concert: Concert) => {
    setEditingId(concert.id);
    setDate(concert.date_concert || "");
    setTime(concert.time_concert?.slice(0, 5) || "");
    setAddress(concert.address || "");
    setCity(concert.city);
    setError(null);
    setSuccess(null);
    setFormOpen(true);
  };

  // Supprimer un concert
  const handleDelete = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce concert ?")) {
      return;
    }

    try {
      setError(null);
      setSuccess(null);

      const response = await authFetch(`/concerts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || "Erreur lors de la suppression."
        );
      }

      setSuccess("Concert supprimé avec succès !");

      await fetchConcerts();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue."
      );
    }
  };

  // Formater la date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Date à définir";

    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString(
      "fr-FR",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // Formater l'heure
  const formatTime = (timeString: string | null) => {
    if (!timeString) return "Heure à définir";
    return timeString.slice(0, 5);
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

          <p className="text-sm text-[#f5f0e8]/50 mt-1">
            Gérez les dates et lieux de vos prochains concerts.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setError(null);
            setSuccess(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-[#e8a820] text-[#171717] font-bold uppercase tracking-wider text-sm hover:bg-[#f5c04e] transition-colors"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <Plus size={18} />
          Ajouter un concert
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 border border-green-500/30 bg-green-500/10 text-green-400">
          {success}
        </div>
      )}

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
                Date du concert
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#111] border border-[#e8a820]/20 p-3 text-[#f5f0e8] focus:border-[#e8a820] outline-none"
              />
            </div>

            {/* Heure */}
            <div>
              <label className="block text-sm mb-2 text-[#f5f0e8]/70">
                Heure du concert
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#111] border border-[#e8a820]/20 p-3 text-[#f5f0e8] focus:border-[#e8a820] outline-none"
              />
            </div>

            {/* Adresse */}
            <div>
              <label className="block text-sm mb-2 text-[#f5f0e8]/70">
                Adresse du concert
              </label>

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ex : Place de la Gare, 1"
                className="w-full bg-[#111] border border-[#e8a820]/20 p-3 text-[#f5f0e8] placeholder:text-[#f5f0e8]/25 focus:border-[#e8a820] outline-none"
              />
            </div>

            {/* Ville */}
            <div>
              <label className="block text-sm mb-2 text-[#f5f0e8]/70">
                Ville *
              </label>

              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex : Namur"
                className="w-full bg-[#111] border border-[#e8a820]/20 p-3 text-[#f5f0e8] placeholder:text-[#f5f0e8]/25 focus:border-[#e8a820] outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-3">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-[#e8a820] text-[#171717] font-bold uppercase text-sm hover:bg-[#f5c04e] disabled:opacity-50"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <Save size={17} />
                {saving
                  ? "Enregistrement..."
                  : editingId !== null
                    ? "Enregistrer"
                    : "Ajouter"}
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

        {loading ? (
          <p className="text-center py-10 text-[#e8a820]">
            Chargement des concerts...
          </p>
        ) : concerts.length === 0 ? (
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
            .sort((a, b) =>
              (a.date_concert || "9999-12-31").localeCompare(
                b.date_concert || "9999-12-31"
              )
            )
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
                      {formatDate(concert.date_concert)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#f5f0e8]/60 text-sm">
                    <Clock size={16} />
                    <span>{formatTime(concert.time_concert)}</span>
                  </div>

                  {concert.address && (
                    <div className="flex items-center gap-2 text-[#f5f0e8]/60 text-sm">
                      <MapPin size={16} />
                      <span>{concert.address}</span>
                    </div>
                  )}

                  <div className="text-sm text-[#f5f0e8]/80">
                    {concert.city}
                  </div>
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
