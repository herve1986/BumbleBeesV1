import { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import { API_URL } from "@/const";

export default function Login() {
  const [, setLocation] = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.detail || "Nom d'utilisateur ou mot de passe incorrect."
        );
        return;
      }

      // Stockage du token JWT
      sessionStorage.setItem("access_token", data.access_token);

      setLocation("/admin");

    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Impossible de contacter le serveur.");
    }
  };



  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-4">
      <Navbar />

      <div className="w-full max-w-md p-8 border border-[#e8a820]/30 bg-[#181818] shadow-2xl">

        <div className="text-center mb-8">

          <img
            src="/images/logo.jpg"
            alt="Bumblebees"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-[#e8a820]"
          />

          <h1
            className="text-3xl text-[#e8a820] font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Administration
          </h1>

          <p className="text-[#f5f0e8]/50 text-sm mt-2 tracking-widest">
            BUMBLEBEES — PRIVATE ACCESS
          </p>

        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-[#e8a820] text-sm mb-2 uppercase tracking-widest">
              Nom d'utilisateur
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#222] border border-[#e8a820]/30 p-3 text-white outline-none focus:border-[#e8a820]"
              placeholder="Votre identifiant"
              required
            />
          </div>

          <div>
            <label className="block text-[#e8a820] text-sm mb-2 uppercase tracking-widest">
              Mot de passe
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#222] border border-[#e8a820]/30 p-3 pr-12 text-white outline-none focus:border-[#e8a820]"
                placeholder="Votre mot de passe"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e8a820]/60 hover:text-[#e8a820] transition-colors"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? (
                  // Œil barré
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 3 18 18" />
                    <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                    <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c5 0 9 5 10 7-.55 1.1-1.5 2.5-2.8 3.7" />
                    <path d="M6.61 6.61C4.62 7.83 3.3 9.54 2 12c1 2 5 7 10 7 1.15 0 2.23-.26 3.22-.7" />
                  </svg>
                ) : (
                  // Œil ouvert
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#e8a820] text-black font-bold py-3 uppercase tracking-widest hover:bg-[#f5c04b] transition-colors"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Se connecter
          </button>

        </form>

        <button
          onClick={() => setLocation("/")}
          className="w-full text-[#f5f0e8]/40 hover:text-[#e8a820] text-sm mt-6 transition-colors"
        >
          ← Retour au site
        </button>

      </div>
    </div>
  );
}
