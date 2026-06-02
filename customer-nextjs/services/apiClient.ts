import type { ApiError } from "@/types/quote";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
const TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS ?? 30000);
const MAX_RETRIES = Number(process.env.NEXT_PUBLIC_API_MAX_RETRIES ?? 2);

export class ApiClientError extends Error {
  status?: number;
  retryable: boolean;

  constructor(message: string, status?: number, retryable = false) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.retryable = retryable;
  }

  toApiError(): ApiError {
    return {
      message: this.message,
      status: this.status,
      retryable: this.retryable,
    };
  }
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiClientError("Request timed out", undefined, true);
    }
    throw new ApiClientError(
      err instanceof Error ? err.message : "Network error",
      undefined,
      true
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!BASE_URL) {
    throw new ApiClientError(
      "NEXT_PUBLIC_API_BASE_URL is not configured",
      undefined,
      false
    );
  }

  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  let lastError: ApiClientError | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(url, { ...options, headers });

      if (!response.ok) {
        const retryable = isRetryableStatus(response.status);
        let message = `Request failed (${response.status})`;
        try {
          const body = await response.json();
          if (body && typeof body === "object" && "title" in body) {
            message = String((body as { title: string }).title);
          }
        } catch {
          /* ignore parse errors */
        }
        throw new ApiClientError(message, response.status, retryable);
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return (await response.json()) as T;
    } catch (err) {
      lastError =
        err instanceof ApiClientError
          ? err
          : new ApiClientError(
              err instanceof Error ? err.message : "Unknown error",
              undefined,
              true
            );

      if (!lastError.retryable || attempt >= MAX_RETRIES) {
        throw lastError;
      }

      await sleep(300 * (attempt + 1));
    }
  }

  throw lastError ?? new ApiClientError("Request failed");
}

export function getApiBaseUrl(): string {
  return BASE_URL;
}
