import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import type {
  ApiResult,
  ApodResponse,
  NeoObject,
  NeoWsFeedResponse,
} from "./types";

const NASA_BASE_URL = "https://api.nasa.gov";
const NASA_API_KEY = process.env.NASA_API_KEY!;
const APOD_URL = "https://science.nasa.gov/wp-json/wp/v2/apod-basic/";

if (!NASA_API_KEY) {
  throw new Error("Missing NASA_API_KEY env variable");
}

// ---------------------------------------------------------------------------
// Core fetch primitive
// ---------------------------------------------------------------------------

interface ApiFetchOptions {
  baseUrl: string;
  apiKey?: string;
  timeoutMs?: number;
}

async function apiFetch<T>(
  endpoint: string,
  params: Record<string, string | number | undefined> | undefined,
  { baseUrl, apiKey, timeoutMs = 10000 }: ApiFetchOptions,
): Promise<ApiResult<T>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const searchParams = new URLSearchParams();

    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined) {
          searchParams.set(k, String(v));
        }
      }
    }

    if (apiKey) {
      searchParams.set("api_key", apiKey);
    }

    // endpoint may already be a full relative path ("/planetary/apod") or just
    // a bare path for mirror calls ("/"). Normalise so we never double-slash.
    const base = baseUrl.replace(/\/$/, "");
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${base}${path}?${searchParams.toString()}`;

    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) {
      let message: string | undefined;

      try {
        const body = await res.json();
        message = body?.error?.message ?? body?.msg ?? body?.error;
      } catch {}

      return { ok: false, error: parseError(res, message) };
    }

    return { ok: true, data: await res.json() };
  } catch (error) {
    return {
      ok: false,
      error: {
        type: "NETWORK_ERROR",
        message:
          error instanceof Error ? error.message : "Network request failed",
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

// Convenience wrapper: NASA endpoints always use the NASA base URL + API key.
async function nasaFetch<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
  timeoutMs = 10000,
): Promise<ApiResult<T>> {
  return apiFetch<T>(endpoint, params, {
    baseUrl: NASA_BASE_URL,
    apiKey: NASA_API_KEY,
    timeoutMs,
  });
}

async function apodFetch<T>(
  params?: Record<string, string | number | undefined>,
  timeoutMs = 10000,
): Promise<ApiResult<T>> {
  return apiFetch<T>("/", params, {
    baseUrl: APOD_URL,
    apiKey: NASA_API_KEY,
    timeoutMs,
  });
}

// ---------------------------------------------------------------------------
// Cache-safety helpers
//
// "use cache" caches whatever a function *returns*. Since apiFetch/nasaFetch
// return { ok: false, error } as a normal value rather than throwing, a failed
// API call would otherwise get cached and replayed for the full cacheLife
// window (hours/days), breaking pages long after the underlying API recovered.
//
// Fix: the cached inner function throws on failure instead of returning it.
// Next.js does not cache a "use cache" function that throws. The outer,
// uncached wrapper catches the throw and converts it back into an ApiResult,
// so callers still get { ok: false, error } — nothing throws past this file,
// and failures are never persisted in the cache.
// ---------------------------------------------------------------------------

class FetchError extends Error {
  constructor(
    public payload: Extract<ApiResult<never>, { ok: false }>["error"],
  ) {
    super("API fetch error");
    this.name = "FetchError";
  }
}

function throwOnFailure<T>(result: ApiResult<T>): T {
  if (!result.ok) throw new FetchError(result.error);
  return result.data;
}

async function withApiResult<T>(fn: () => Promise<T>): Promise<ApiResult<T>> {
  try {
    return { ok: true, data: await fn() };
  } catch (error) {
    if (error instanceof FetchError) {
      return { ok: false, error: error.payload };
    }

    return {
      ok: false,
      error: {
        type: "NETWORK_ERROR",
        message:
          error instanceof Error ? error.message : "Network request failed",
      },
    };
  }
}

// ---------------------------------------------------------------------------
// APOD Functions
// ---------------------------------------------------------------------------

function pickEntry(entries: ApodResponse[], date?: string): ApodResponse {
  const entry = date ? entries.find((e) => e.date === date) : entries[0];

  if (!entry) {
    throw new FetchError({ type: "NOT_FOUND", status: 404 });
  }

  return entry;
}

export async function getTodayAPOD(): Promise<ApiResult<ApodResponse>> {
  return withApiResult(async () => {
    "use cache";

    cacheLife("days");
    cacheTag("apod-today");

    return pickEntry(throwOnFailure(await apodFetch<ApodResponse[]>()));
  });
}

export async function getAPODByDate(
  date: string,
): Promise<ApiResult<ApodResponse>> {
  return withApiResult(async () => {
    "use cache";

    cacheLife("days");
    cacheTag(`apod-${date}`);

    return pickEntry(
      throwOnFailure(await apodFetch<ApodResponse[]>({ date })),
      date,
    );
  });
}

export async function getRandomApods(): Promise<ApiResult<ApodResponse[]>> {
  const result = await apodFetch<ApodResponse[]>({ count: 6 });
  return result.ok ? { ok: true, data: result.data.slice(0, 6) } : result;
}

// ---------------------------------------------------------------------------
// NeoWS Functions
// ---------------------------------------------------------------------------

export async function getTodayNeos(): Promise<ApiResult<NeoObject[]>> {
  await connection();

  const date = new Date().toISOString().split("T")[0];

  return getNeosByDate(date);
}

export async function getNeosByDate(
  date: string,
): Promise<ApiResult<NeoObject[]>> {
  return withApiResult(async () => {
    "use cache";

    cacheLife("hours");
    cacheTag(`neos-${date}`);

    const feed = throwOnFailure(
      await nasaFetch<NeoWsFeedResponse>("/neo/rest/v1/feed", {
        start_date: date,
        end_date: date,
      }),
    );

    return feed.near_earth_objects[date] ?? [];
  });
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

export function parseError(res: Response, message?: string) {
  const status = res.status;

  if (status === 429) {
    return {
      type: "RATE_LIMIT",
      status: 429,
      message,
      retryAfter: Number(res.headers.get("Retry-After")) || undefined,
    } as const;
  }

  if (status === 404) {
    return {
      type: "NOT_FOUND",
      status: 404,
      message,
    } as const;
  }

  if (status >= 500) {
    return {
      type: "SERVER_ERROR",
      status,
      message,
    } as const;
  }

  return {
    type: "UNKNOWN",
    status,
    message,
  } as const;
}
