/**
 * Bumblebees Rock — Home Page (v2 — Dark Honeycombs Rock, full asymmetric)
 * Design: Dark Honeycombs Rock
 * Colors: Charcoal #2d2d2d, Gold #e8a820, Cream #f5f0e8, Rock Red #c0392b
 * Fonts: Playfair Display (display), Oswald (body/rock), Special Elite (accent)
 * Layout: Asymmetric, diagonal, hex-structured — NO centered grids
 */
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
