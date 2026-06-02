"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/pwa/registerServiceWorker";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
