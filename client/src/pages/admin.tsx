
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ConcertAdmin from "@/components/concertAdmin";
import GalleryAdmin from "@/components/galleryAdmin";
import SetlistAdmin from "@/components/setListAdmin";

type AdminTab = "concerts" | "setlist" | "gallery";

function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("concerts");

  const tabs = [
    {
      id: "concerts" as AdminTab,
      label: "Concerts",
      description: "Gérer les dates et événements",
      icon: "📅",
    },
    {
      id: "setlist" as AdminTab,
      label: "Répertoire",
      description: "Gérer les groupes et morceaux",
      icon: "🎵",
    },
    {
      id: "gallery" as AdminTab,
      label: "Galerie",
      description: "Gérer les photos",
      icon: "🖼️",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 sm:px-8 pt-28 pb-16 bg-[#171717]">
        <div className="max-w-7xl mx-auto">

          {/* En-tête */}
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[#e8a820] mb-2">
              BumbleBees
            </p>

            <h1 className="text-4xl font-bold text-white">
              Administration
            </h1>

            <p className="text-gray-400 mt-2">
              Gérez le contenu de votre site depuis cet espace.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    text-left p-5 rounded-xl border transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#e8a820]/10 border-[#e8a820] shadow-lg shadow-[#e8a820]/5"
                        : "bg-[#202020] border-white/10 hover:border-[#e8a820]/50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{tab.icon}</span>

                    <span
                      className={`text-lg font-semibold ${
                        isActive ? "text-[#e8a820]" : "text-white"
                      }`}
                    >
                      {tab.label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400">
                    {tab.description}
                  </p>

                  {isActive && (
                    <div className="mt-3 text-xs font-semibold text-[#e8a820]">
                      SECTION ACTIVE
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Contenu de la section sélectionnée */}
          <div className="bg-[#202020] border border-white/10 rounded-2xl p-4 sm:p-8 shadow-xl">
            {activeTab === "concerts" && <ConcertAdmin />}
            {activeTab === "setlist" && <SetlistAdmin />}
            {activeTab === "gallery" && <GalleryAdmin />}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Admin;
