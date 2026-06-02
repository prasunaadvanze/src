import axios from "axios";

function resolveBackendBase(): string | undefined {
  const raw =
    process.env.BACKEND_URL?.replace(/\/$/, "") ??
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  if (!raw) return undefined;
  return raw.endsWith("/api") ? raw : `${raw}/api`;
}

const baseURL = resolveBackendBase();

if (!baseURL) {
  console.warn(
    "BACKEND_URL or NEXT_PUBLIC_API_BASE_URL is not set — BFF routes will fail."
  );
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
