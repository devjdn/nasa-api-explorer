import type { ApodResponse, NeoObject, NeoWsFeedResponse } from "./types";

const NASA_BASE_URL = "https://api.nasa.gov";
const NASA_API_KEY = process.env.NASA_API_KEY!;

if (!NASA_API_KEY) {
  throw new Error("Missing NASA_API_KEY env variable");
}

export class NASAClient {
  private readonly apiKey = NASA_API_KEY;

  constructor(apiKey = NASA_API_KEY) {
    this.apiKey = apiKey;
  }

  private async fetch<T>(
    endpoint: string,
    params?: Record<string, string | number | undefined>,
    options?: { revalidate?: number },
  ): Promise<T | null> {
    try {
      const searchParams = new URLSearchParams();

      if (params) {
        for (const [k, v] of Object.entries(params)) {
          if (v !== undefined) {
            searchParams.set(k, String(v));
          }
        }
      }

      searchParams.set("api_key", this.apiKey);

      const url = `${NASA_BASE_URL}${endpoint}?${searchParams.toString()}`;

      const res = await fetch(url, {
        next: options?.revalidate
          ? { revalidate: options.revalidate }
          : undefined,
      });

      if (!res.ok) {
        console.error(`NASA API error: ${res.status}`);
        return null;
      }

      return await res.json();
    } catch (error) {
      console.error("NASA fetch failed:", error);
      return null;
    }
  }

  /**
   * APOD
   */

  async getTodayAPOD(): Promise<ApodResponse | null> {
    return await this.fetch<ApodResponse>("/planetary/apod", undefined, {
      revalidate: 3600,
    });
  }

  async getAPODByDate(date: string): Promise<ApodResponse | null> {
    return await this.fetch<ApodResponse>("/planetary/apod", { date });
  }

  /**
   * NeoWs
   */

  async getNeosByDate(date: string): Promise<NeoObject[]> {
    const data = await this.fetch<NeoWsFeedResponse>(
      "/neo/rest/v1/feed",
      {
        start_date: date,
        end_date: date,
      },
      { revalidate: 3600 },
    );

    if (!data) {
      return [];
    }

    return data.near_earth_objects[date] ?? [];
  }
}

export const nasaClient = new NASAClient();
