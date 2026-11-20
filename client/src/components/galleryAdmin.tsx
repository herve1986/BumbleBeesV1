
import { useEffect, useRef, useState } from "react";
import {Plus,Trash2,Image as ImageIcon, Upload,X,} from "lucide-react";

interface GroupImage {
  id: number;
  file: File;
  preview: string;
}

export default function GalleryAdmin() {
  const [images, setImages] = useState<GroupImage[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrls = useRef<string[]>([]);

  // Nettoyage des URL temporaires
  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Ajouter des images
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: GroupImage[] = [];

    setError("");

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Certains fichiers ne sont pas des images.");
        return;
      }

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setError("Formats acceptés : JPG, PNG et WEBP.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("Une image ne peut pas dépasser 10 Mo.");
        return;
      }

      const preview = URL.createObjectURL(file);
      objectUrls.current.push(preview);

      newImages.push({
        id: Date.now() + Math.random(),
        file,
        preview,
      });
    });

    setImages((prev) => [...prev, ...newImages]);

    // Permet de sélectionner à nouveau le même fichier
    e.target.value = "";
  };

  // Supprimer une image
  const handleDelete = (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette image ?")) {
      return;
    }

    const image = images.find((img) => img.id === id);

    if (image) {
      URL.revokeObjectURL(image.preview);
      objectUrls.current = objectUrls.current.filter(
        (url) => url !== image.preview
      );
    }

    setImages((prev) => prev.filter((img) => img.id !== id));
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
          className="flex items-center gap-2 px-5 py-3 bg-[#e8a820] text-[#171717] font-bold uppercase tracking-wider text-sm hover:bg-[#f5c04e] transition-colors"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <Plus size={18} />
          Ajouter des photos
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
        className="w-full border-2 border-dashed border-[#e8a820]/30 hover:border-[#e8a820]/70 bg-[#1c1c1c] p-10 flex flex-col items-center justify-center gap-3 transition-colors"
      >
        <Upload size={36} className="text-[#e8a820]" />

        <span className="font-bold text-[#f5f0e8]">
          Ajouter des photos à la galerie
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

        {images.length === 0 ? (
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group bg-[#222] border border-[#e8a820]/20 overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-square">
                  <img
                    src={image.preview}
                    alt={image.file.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Nom du fichier */}
                <div className="p-3">
                  <p className="text-xs text-[#f5f0e8]/60 truncate">
                    {image.file.name}
                  </p>

                  <p className="text-xs text-[#f5f0e8]/30 mt-1">
                    {(image.file.size / (1024 * 1024)).toFixed(2)} Mo
                  </p>
                </div>

                {/* Supprimer */}
                <button
                  type="button"
                  onClick={() => handleDelete(image.id)}
                  className="absolute top-2 right-2 p-2 bg-black/80 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
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
