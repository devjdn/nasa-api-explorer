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

if (!NASA_API_KEY) {
  throw new Error("Missing NASA_API_KEY env variable");
}

async function nasaFetch<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
  timeoutMs = 30000,
): Promise<ApiResult<T>> {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const searchParams = new URLSearchParams();

    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined) {
          searchParams.set(k, String(v));
        }
      }
    }

    searchParams.set("api_key", NASA_API_KEY);

    const url = `${NASA_BASE_URL}${endpoint}?${searchParams.toString()}`;

    const res = await fetch(url, {
      signal: controller.signal,
    });

    if (!res.ok) {
      let message: string | undefined;

      try {
        const body = await res.json();

        message = body?.error?.message || body?.msg || body?.error;
      } catch {}

      return {
        ok: false,
        error: parseError(res, message),
      };
    }

    return {
      ok: true,
      data: await res.json(),
    };
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

/**
 * Cache-safety helpers
 *
 * "use cache" caches whatever a function *returns*. Since nasaFetch returns
 * { ok: false, error } as a normal value rather than throwing, a failed NASA
 * API call would otherwise get cached and replayed for the full cacheLife
 * window (hours/days), breaking pages long after the underlying API recovered.
 *
 * Fix: the cached inner function throws on failure instead of returning it.
 * Next.js does not cache a "use cache" function that throws. The outer,
 * uncached wrapper catches the throw and converts it back into an ApiResult,
 * so callers still just get { ok: false, error } — nothing throws past this
 * file, and failures are never persisted in the cache.
 */

class NasaFetchError extends Error {
  constructor(
    public payload: Extract<ApiResult<never>, { ok: false }>["error"],
  ) {
    super("NASA API error");
    this.name = "NasaFetchError";
  }
}

async function nasaFetchOrThrow<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const result = await nasaFetch<T>(endpoint, params);

  if (!result.ok) {
    throw new NasaFetchError(result.error);
  }

  return result.data;
}

async function withApiResult<T>(fn: () => Promise<T>): Promise<ApiResult<T>> {
  try {
    return { ok: true, data: await fn() };
  } catch (error) {
    if (error instanceof NasaFetchError) {
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

/**
 * APOD Functions
 */

export async function getTodayAPOD(): Promise<ApiResult<ApodResponse>> {
  return withApiResult(async () => {
    "use cache";

    cacheLife("days");
    cacheTag("apod-today");

    return nasaFetchOrThrow<ApodResponse>("/planetary/apod");
  });
}

export async function getAPODByDate(
  date: string,
): Promise<ApiResult<ApodResponse>> {
  return withApiResult(async () => {
    "use cache";

    cacheLife("days");
    cacheTag(`apod-${date}`);

    return nasaFetchOrThrow<ApodResponse>("/planetary/apod", { date });
  });
}

/**
 * NEOWS Functions
 */

export async function getTodayNeos(): Promise<ApiResult<NeoObject[]>> {
  // No "use cache" here — this just delegates to getNeosByDate, which is
  // already cached (and cached correctly, per-date, via its own tag).
  // Caching this wrapper too would create a second, redundant cache entry
  // under a different tag ("neos-today") that can't be invalidated together
  // with the date-specific one.
  //
  // But because this function is now uncached, Next.js needs to know
  // up front that "today" is genuinely per-request dynamic data, not a
  // value it could bake in once at build time. `connection()` opts this
  // scope into dynamic rendering, which is required before reading
  // request-time values like `new Date()` in a Server Component/route
  // that would otherwise be prerendered statically.
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

    const feed = await nasaFetchOrThrow<NeoWsFeedResponse>(
      "/neo/rest/v1/feed",
      {
        start_date: date,
        end_date: date,
      },
    );

    return feed.near_earth_objects[date] ?? [];
  });
}

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
