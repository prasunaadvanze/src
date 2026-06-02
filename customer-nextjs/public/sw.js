/* eslint-disable no-restricted-globals */
const CACHE_NAME = "gainsco-quote-v1";
const SCHEMA_CACHE = "gainsco-schema-v1";
const OFFLINE_URL = "/offline.html";

const APP_SHELL = ["/", "/offline.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== SCHEMA_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

function isSchemaRequest(url) {
  return /\/api\/schema\//.test(url.pathname);
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  if (isSchemaRequest(url)) {
    event.respondWith(cacheSchemaFirst(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok && request.url.endsWith(".html") === false) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
      )
    );
  }
});

async function cacheSchemaFirst(request) {
  const cache = await caches.open(SCHEMA_CACHE);
  const cached = await cache.match(request);

  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    if (cached) {
      return cached;
    }
    return new Response(
      JSON.stringify({ error: "Offline — schema unavailable" }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
