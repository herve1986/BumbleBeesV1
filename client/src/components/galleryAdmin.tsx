
import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  X,
  Pencil,
  Check,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

interface GroupImage {
  id: number;
  title: string;
  url: string;
}

export default function GalleryAdmin() {
  const [images, setImages] = useState<GroupImage[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);

  // Modification du titre
  const [editingImageId, setEditingImageId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Récupérer les images depuis le backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/images/`);

        if (!response.ok) {
          throw new Error("Impossible de récupérer les images.");
        }

        const data: GroupImage[] = await response.json();

        setImages(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Ajouter des images
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    setError("");
    setSuccess("");

    const uploadErrors: string[] = [];
    let uploadedCount = 0;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    setUploading(true);

    try {
      for (const file of files) {
        if (!allowedTypes.includes(file.type)) {
          uploadErrors.push(
            `${file.name} : format non autorisé.`
          );
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          uploadErrors.push(
            `${file.name} : taille supérieure à 10 Mo.`
          );
          continue;
        }

        try {
          const formData = new FormData();

          formData.append("title", file.name);
          formData.append("file", file);

          const response = await fetch(`${API_URL}/images/`, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const data = await response.json().catch(() => null);

            throw new Error(
              data?.detail || "Impossible d'envoyer cette image."
            );
          }

          const createdImage: GroupImage = await response.json();

          setImages((prev) => [...prev, createdImage]);

          uploadedCount++;
        } catch (err) {
          uploadErrors.push(
            `${file.name} : ${
              err instanceof Error
                ? err.message
                : "Erreur lors de l'envoi."
            }`
          );
        }
      }

      if (uploadErrors.length > 0) {
        setError(uploadErrors.join(" "));
      }

      if (uploadedCount > 0) {
        setSuccess(
          `${uploadedCount} image(s) ajoutée(s) avec succès.`
        );
      }
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Activer la modification du titre
  const handleEdit = (image: GroupImage) => {
    setEditingImageId(image.id);
    setEditingTitle(image.title);
    setError("");
    setSuccess("");
  };

  // Annuler la modification
  const handleCancelEdit = () => {
    setEditingImageId(null);
    setEditingTitle("");
  };

  // Modifier le titre d'une image (PUT)
  const handleUpdate = async (id: number) => {
    const title = editingTitle.trim();

    if (!title) {
      setError("Le titre de l'image ne peut pas être vide.");
      return;
    }

    setError("");
    setSuccess("");
    setSavingId(id);

    try {
      const formData = new FormData();

      formData.append("title", title);

      const response = await fetch(`${API_URL}/images/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.detail || "Impossible de modifier cette image."
        );
      }

      const updatedImage: GroupImage = await response.json();

      setImages((prev) =>
        prev.map((image) =>
          image.id === id ? updatedImage : image
        )
      );

      setEditingImageId(null);
      setEditingTitle("");

      setSuccess("Titre de l'image modifié avec succès.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la modification."
      );
    } finally {
      setSavingId(null);
    }
  };

  // Supprimer une image (DELETE)
  const handleDelete = async (id: number) => {
    if (
      !window.confirm(
        "Voulez-vous vraiment supprimer cette image ?"
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");
    setDeletingId(id);

    try {
      const response = await fetch(`${API_URL}/images/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.detail || "Impossible de supprimer cette image."
        );
      }

      setImages((prev) =>
        prev.filter((image) => image.id !== id)
      );

      if (editingImageId === id) {
        handleCancelEdit();
      }

      setSuccess("Image supprimée avec succès.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la suppression."
      );
    } finally {
      setDeletingId(null);
    }
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
            Gestion des images
          </h2>

          <p className="text-m text-[#f5f0e8]/50 mt-1">
            Gérez les photos de votre groupe et de vos concerts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-5 py-3 bg-[#e8a820] text-[#171717] font-bold uppercase tracking-wider text-sm hover:bg-[#f5c04e] transition-colors disabled:opacity-50"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <Plus size={18} />
          {uploading ? "Envoi en cours..." : "Ajouter des photos"}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Zone de dépôt */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full border-2 border-dashed border-[#e8a820]/30 hover:border-[#e8a820]/70 bg-[#1c1c1c] p-10 flex flex-col items-center justify-center gap-3 transition-colors disabled:opacity-50"
      >
        <Upload size={36} className="text-[#e8a820]" />

        <span className="font-bold text-[#f5f0e8]">
          {uploading
            ? "Envoi des photos en cours..."
            : "Ajouter des photos à la galerie"}
        </span>

        <span className="text-sm text-[#f5f0e8]/40">
          Cliquez pour sélectionner vos images
        </span>

        <span className="text-xs text-[#f5f0e8]/30">
          JPG, PNG ou WEBP — 10 Mo maximum par image
        </span>
      </button>

      {/* Erreur */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <X size={18} />
          {error}
        </div>
      )}

      {/* Succès */}
      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
          <Check size={18} />
          {success}
        </div>
      )}

      {/* Galerie */}
      <div className="space-y-4">

        <div className="flex justify-between items-center pb-3 border-b border-[#e8a820]/20">
          <h3 className="text-sm uppercase tracking-widest text-[#f5f0e8]/60">
            Photos enregistrées
          </h3>

          <span className="text-sm text-[#e8a820]">
            {images.length} photo(s)
          </span>
        </div>

        {loading ? (
          <div className="text-center py-16 text-[#f5f0e8]/50">
            Chargement des images...
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#e8a820]/20">
            <ImageIcon
              size={36}
              className="mx-auto text-[#e8a820]/40 mb-4"
            />

            <p className="text-[#f5f0e8]/60">
              Aucune photo enregistrée.
            </p>

            <p className="text-sm text-[#f5f0e8]/30 mt-2">
              Ajoutez vos premières photos pour commencer.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group bg-[#222] border border-[#e8a820]/20 overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-square">
                  <img
                    src={`${API_URL}${image.url}`}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Informations et modification */}
                <div className="p-3">

                  {editingImageId === image.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) =>
                          setEditingTitle(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUpdate(image.id);
                          }

                          if (e.key === "Escape") {
                            handleCancelEdit();
                          }
                        }}
                        maxLength={255}
                        autoFocus
                        className="w-full bg-[#171717] border border-[#e8a820]/50 px-2 py-2 text-sm text-[#f5f0e8] outline-none focus:border-[#e8a820]"
                        placeholder="Titre de l'image"
                      />

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdate(image.id)}
                          disabled={savingId === image.id}
                          className="flex-1 flex items-center justify-center gap-1 bg-[#e8a820] text-[#171717] py-2 text-xs font-bold hover:bg-[#f5c04e] disabled:opacity-50"
                        >
                          <Check size={14} />
                          {savingId === image.id
                            ? "..."
                            : "Enregistrer"}
                        </button>

                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          disabled={savingId === image.id}
                          className="px-3 py-2 bg-[#333] text-[#f5f0e8] hover:bg-[#444] disabled:opacity-50"
                          title="Annuler"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-[#f5f0e8]/60 truncate">
                        {image.title}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleEdit(image)}
                        disabled={savingId !== null}
                        className="shrink-0 p-1.5 text-[#e8a820] hover:bg-[#e8a820]/20 transition-colors disabled:opacity-50"
                        title="Modifier le titre"
                        aria-label="Modifier le titre"
                      >
                        <Pencil size={15} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Supprimer */}
                <button
                  type="button"
                  onClick={() => handleDelete(image.id)}
                  disabled={deletingId === image.id}
                  className="absolute top-2 right-2 p-2 bg-black/80 text-red-400 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                  title="Supprimer cette photo"
                  aria-label="Supprimer cette photo"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
