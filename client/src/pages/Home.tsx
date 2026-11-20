import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/hero";
import AboutSection from "@/components/about";
import ConcertsSection from "@/components/concert";
import SetlistSection from "@/components/setList";
import GallerySection from "@/components/gallery";
import ContactSection from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#111111" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ConcertsSection />
      <SetlistSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
