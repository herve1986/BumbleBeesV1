import { useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import FadeIn from "@/components/ui/FadeIn";
import HexBadge from "@/components/ui/HexBadge";
import HexPattern from "@/components/ui/HexPattern";
import GrungeOverlay from "@/components/ui/GrungeOverlay";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError(false);

    try {
      await emailjs.send(
        "service_u2sk467",
        "template_l9z8pnz",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "QH7Z8VkOizuiuZY1r"
      );

      setSent(true);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (err) {
      console.error("Erreur envoi mail :", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#2d2d2d", marginTop: "-1px" }}
    >
      <HexPattern opacity={0.06} id="hex-contact" />
      <GrungeOverlay opacity={0.025} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <FadeIn direction="right" className="mb-16 text-right">
          <div className="flex items-center justify-end gap-4 mb-4">
            <p
              className="text-[#e8a820] tracking-[0.4em] text-xl uppercase"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              ★ Nous contacter ★
            </p>

            <div className="w-12 h-px bg-[#e8a820]" />
          </div>

          <h2
            className="text-4xl md:text-6xl font-black"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#f5f0e8",
            }}
          >
            Prêt à{" "}
            <span style={{ color: "#e8a820", fontStyle: "italic" }}>
              vibrer ?
            </span>
          </h2>

          <p
            className="text-[#f5f0e8]/40 mt-3 text-sm"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 300,
            }}
          >
            Pour les réservations, collaborations ou juste pour dire que vous
            nous aimez
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16">

          {/* Contact information */}
          <FadeIn direction="left">
            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <HexBadge size={52}>
                  <span className="text-lg">✉</span>
                </HexBadge>

                <div className="pt-2">
                  <div
                    className="text-[#e8a820] text-xs tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Email
                  </div>

                  <div
                    className="text-[#f5f0e8]/70 text-sm"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    les.bumblebees@gmail.com
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-6">
                <div className="w-16 h-px bg-gradient-to-r from-[#e8a820] to-[#c0392b] mb-6" />

                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      name: "Facebook",
                      url: "https://www.facebook.com/lesbumblebees/",
                    },
                    {
                      name: "Instagram",
                      url: "https://www.instagram.com/les.bumblebees/",
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Retrouver Bumblebees Rock sur ${social.name}`}
                      className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e8a820]/15"
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        color: "#e8a820",
                        border: "1px solid rgba(232,168,32,0.25)",
                        background: "transparent",
                        clipPath:
                          "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                      }}
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact form */}
          <FadeIn delay={0.2} direction="right">

            {sent ? (
              <div
                className="p-10 text-center space-y-5"
                style={{
                  background: "rgba(17,17,17,0.8)",
                  border: "1px solid rgba(232,168,32,0.25)",
                }}
              >
                <div className="text-4xl text-[#e8a820]">
                  ★
                </div>

                <h3
                  className="text-2xl font-bold text-[#f5f0e8]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Message envoyé !
                </h3>

                <p
                  className="text-[#f5f0e8]/50 text-sm"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Merci pour votre message ! Nous vous répondrons très bientôt.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setError(false);
                  }}
                  className="mt-4 px-6 py-3 text-xs tracking-widest uppercase transition-all hover:bg-[#e8a820]/15"
                  style={{
                    color: "#e8a820",
                    border: "1px solid rgba(232,168,32,0.4)",
                    fontFamily: "'Oswald', sans-serif",
                  }}
                >
                  Envoyer un autre message →
                </button>
              </div>
            ) : (

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#e8a820] text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Nom
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Votre nom"
                    required
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(17,17,17,0.8)",
                      border: "1px solid rgba(232,168,32,0.18)",
                      borderLeft: "3px solid rgba(232,168,32,0.4)",
                      color: "#f5f0e8",
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 300,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(232,168,32,0.6)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 2px rgba(232,168,32,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(232,168,32,0.18)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#e8a820] text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    placeholder="votre@email.fr"
                    required
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(17,17,17,0.8)",
                      border: "1px solid rgba(232,168,32,0.18)",
                      borderLeft: "3px solid rgba(232,168,32,0.4)",
                      color: "#f5f0e8",
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 300,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(232,168,32,0.6)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 2px rgba(232,168,32,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(232,168,32,0.18)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#e8a820] text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    placeholder="Votre message..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "rgba(17,17,17,0.8)",
                      border: "1px solid rgba(232,168,32,0.18)",
                      borderLeft: "3px solid rgba(232,168,32,0.4)",
                      color: "#f5f0e8",
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 300,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(232,168,32,0.6)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 2px rgba(232,168,32,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(232,168,32,0.18)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <p
                    className="text-red-400 text-sm"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Une erreur est survenue lors de l'envoi.
                    Veuillez réessayer.
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 font-bold tracking-widest uppercase text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: loading ? "#c0392b" : "#e8a820",
                    color: "#111",
                    fontFamily: "'Oswald', sans-serif",
                    clipPath:
                      "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = "#f5c842";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = "#e8a820";
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                >
                  {loading
                    ? "Envoi en cours..."
                    : "Envoyer le message →"}
                </button>

              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
