import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ConcertAdmin from "@/components/concertAdmin";
import GalleryAdmin from "@/components/galleryAdmin";
import SetlistAdmin from "@/components/setListAdmin";

function Admin() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-8 pt-28 bg-[#171717]">
        <h1 className="text-4xl font-bold text-[#e8a820] mb-8">
          Administration
        </h1>

        <div className="space-y-16">

          {/* Gestion des concerts */}
          <section>
            <ConcertAdmin />
          </section>

          {/* Gestion du répertoire */}
          <section className="border-t border-[#e8a820]/20 pt-12">
            <SetlistAdmin />
          </section>

          {/* Gestion des images */}
          <section className="border-t border-[#e8a820]/20 pt-12">
            <GalleryAdmin />
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Admin;