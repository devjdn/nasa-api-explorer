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
        options?: { revalidate?: number }
    ): Promise<T> {
        const searchParams = new URLSearchParams;

        if (params) {
            for (const [k, v] of Object.entries(params)) {
                if (v !== undefined) {
                    searchParams.set(k, String(v))
                }
            }
        }

        searchParams.set("api_key", this.apiKey);

        const url = `${NASA_BASE_URL}${endpoint}?${searchParams.toString()}`;

        const res = await fetch(url, {
            next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
        });

        if (!res.ok) {
            throw new Error(`NASA API error: ${res.status}`);
        }

        return res.json();
    }

    /**
     * APOD
     */

    async getTodayAPOD(): Promise<ApodResponse> {
        return await this.fetch<ApodResponse>(
            "/planetary/apod",
            undefined,
            { revalidate: 3600 } // ISR for 1 hour
        );
    }

    async getAPODByDate(date: string): Promise<ApodResponse> {
        return await this.fetch<ApodResponse>(
            "/planetary/apod",
            { date }
        )
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
            { revalidate: 3600 } // cache 1 hour
        );

        return data.near_earth_objects[date] ?? [];
    }
}

export const nasaClient = new NASAClient();