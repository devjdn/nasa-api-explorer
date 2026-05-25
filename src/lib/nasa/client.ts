import { cacheLife, cacheTag } from "next/cache";
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
 * APOD Functions
 */

export async function getTodayAPOD(): Promise<ApiResult<ApodResponse>> {
  "use cache";

  cacheLife("days");
  cacheTag("apod-today");

  return nasaFetch<ApodResponse>("/planetary/apod");
}

export async function getAPODByDate(
  date: string,
): Promise<ApiResult<ApodResponse>> {
  "use cache";

  cacheLife("days");
  cacheTag(`apod-${date}`);

  return nasaFetch<ApodResponse>("/planetary/apod", { date });
}

/**
 * NEOWS Functions
 */

export async function getTodayNeos(): Promise<ApiResult<NeoObject[]>> {
  "use cache";

  cacheLife("hours");
  cacheTag("neos-today");

  const date = new Date().toISOString().split("T")[0];

  return getNeosByDate(date);
}

export async function getNeosByDate(
  date: string,
): Promise<ApiResult<NeoObject[]>> {
  "use cache";

  cacheLife("hours");
  cacheTag(`neos-${date}`);

  const result = await nasaFetch<NeoWsFeedResponse>("/neo/rest/v1/feed", {
    start_date: date,
    end_date: date,
  });

  if (!result.ok) {
    return result;
  }

  return {
    ok: true,
    data: result.data.near_earth_objects[date] ?? [],
  };
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

// export class NASAClient {
//   private readonly apiKey = NASA_API_KEY;

//   constructor(apiKey = NASA_API_KEY) {
//     this.apiKey = apiKey;
//   }

//   private async fetch<T>(
//     endpoint: string,
//     params?: Record<string, string | number | undefined>,
//     options?: { revalidate?: number; timeoutMs?: number },
//   ): Promise<ApiResult<T>> {
//     const controller = new AbortController();
//     const timeout = setTimeout(
//       () => controller.abort(),
//       options?.timeoutMs ?? 30000,
//     );
//     const searchParams = new URLSearchParams();

//     try {
//       if (params) {
//         for (const [k, v] of Object.entries(params)) {
//           if (v !== undefined) {
//             searchParams.set(k, String(v));
//           }
//         }
//       }

//       searchParams.set("api_key", this.apiKey);

//       const url = `${NASA_BASE_URL}${endpoint}?${searchParams.toString()}`;

//       const res = await fetch(url, {
//         signal: controller.signal,
//         next: options?.revalidate
//           ? { revalidate: options.revalidate }
//           : undefined,
//       });

//       if (!res.ok) {
//         let message: string | undefined;

//         try {
//           const body = await res.json();
//           message = body?.error?.message || body?.msg || body?.error;
//         } catch {
//           // ignore non-JSON responses
//         }

//         console.error(`[NASAClient] ${endpoint} → ${res.status}`, message);

//         return {
//           ok: false,
//           error: this.parseError(res, message),
//         };
//       }

//       const data = await res.json();

//       return {
//         ok: true,
//         data,
//       };
//     } catch (error) {
//       return {
//         ok: false,
//         error: {
//           type: "NETWORK_ERROR",
//           message:
//             error instanceof Error ? error.message : "Network request failed",
//         },
//       };
//     } finally {
//       clearTimeout(timeout);
//     }
//   }

//   /**
//    * APOD
//    */

//   async getTodayAPOD(): Promise<ApiResult<ApodResponse>> {
//     return await this.fetch<ApodResponse>("/planetary/apod");
//   }

//   async getAPODByDate(date: string): Promise<ApiResult<ApodResponse>> {
//     return await this.fetch<ApodResponse>("/planetary/apod", { date });
//   }

//   /**
//    * NeoWs
//    */

//   async getNeosByDate(date: string): Promise<ApiResult<NeoObject[]>> {
//     const result = await this.fetch<NeoWsFeedResponse>(
//       "/neo/rest/v1/feed",
//       {
//         start_date: date,
//         end_date: date,
//       },
//       { revalidate: 3600 },
//     );

//     if (!result.ok) {
//       return result;
//     }

//     return {
//       ok: true,
//       data: result.data.near_earth_objects[date] ?? [],
//     };
//   }

//   private parseError(res: Response, message?: string) {
//     const status = res.status;

//     if (status === 429) {
//       return {
//         type: "RATE_LIMIT",
//         status: 429,
//         message,
//         retryAfter: Number(res.headers.get("Retry-After")) || undefined,
//       } as const;
//     }

//     if (status === 404) {
//       return {
//         type: "NOT_FOUND",
//         status: 404,
//         message,
//       } as const;
//     }

//     if (status >= 500) {
//       return {
//         type: "SERVER_ERROR",
//         status,
//         message,
//       } as const;
//     }

//     return {
//       type: "UNKNOWN",
//       status,
//       message,
//     } as const;
//   }
// }

// export const nasaClient = new NASAClient();
