
const API_URL = import.meta.env.VITE_API_URL;

export const authFetch = (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    throw new Error("Vous devez être connecté pour effectuer cette action.");
  }

  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${token}`);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
};
