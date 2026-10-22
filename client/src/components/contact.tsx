import { useState } from "react";
import type { FormEvent } from "react";

import FadeIn from "@/components/ui/FadeIn";
import HexBadge from "@/components/ui/HexBadge";
import HexPattern from "@/components/ui/HexPattern";
import GrungeOverlay from "@/components/ui/GrungeOverlay";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
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
              {[
                {
                  icon: "✉",
                  label: "Email",
                  value: "contact@bumblebees-rock.fr",
                }
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <HexBadge size={52}>
                    <span className="text-lg">{item.icon}</span>
                  </HexBadge>

                  <div className="pt-2">
                    <div
                      className="text-[#e8a820] text-xs tracking-widest uppercase mb-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {item.label}
                    </div>

                    <div
                      className="text-[#f5f0e8]/70 text-sm"
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}

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
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {
                  id: "name",
                  label: "Nom",
                  type: "text",
                  placeholder: "Votre nom",
                },
                {
                  id: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "votre@email.fr",
                },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-[#e8a820] text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {field.label}
                  </label>

                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
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
              ))}

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

              <button
                type="submit"
                className="w-full py-4 font-bold tracking-widest uppercase text-sm transition-all duration-200"
                style={{
                  background: sent ? "#c0392b" : "#e8a820",
                  color: "#111",
                  fontFamily: "'Oswald', sans-serif",
                  clipPath:
                    "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                }}
                onMouseEnter={(e) => {
                  if (!sent) {
                    e.currentTarget.style.background = "#f5c842";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!sent) {
                    e.currentTarget.style.background = "#e8a820";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                {sent ? "★ Message envoyé ! ★" : "Envoyer le message →"}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
