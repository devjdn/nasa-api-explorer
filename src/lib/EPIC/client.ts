import type { EpicImage, EpicImageType } from "./types";

const EPIC_BASE_URL = "https://epic.gsfc.nasa.gov/api";
const EPIC_ARCHIVE_URL = "https://epic.gsfc.nasa.gov/archive";

export class EpicClient {
    private readonly baseUrl = EPIC_BASE_URL;

    private async fetch<T>(
        endpoint: string,
        options?: { revalidate?: number }
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const res = await fetch(url, {
            next: options?.revalidate
                ? { revalidate: options.revalidate }
                : undefined,
        });

        if (!res.ok) {
            throw new Error(`EPIC API error: ${res.status}`);
        }

        return res.json();
    }

    /**
     * Get images for type and optional date
     */
    async getImages(
        type: EpicImageType,
        date?: string
    ): Promise<EpicImage[]> {
        const endpoint = date
            ? `/${type}/date/${date}`
            : `/${type}`;

        return this.fetch<EpicImage[]>(endpoint, {
            revalidate: 60 * 60, // 1 hour
        });
    }

    /**
     * Get available dates for type
     */
    async getAvailableDates(
        type: EpicImageType
    ): Promise<string[]> {
        return this.fetch<string[]>(
            `/${type}/available`,
            { revalidate: 60 * 60 * 12 }
        );
    }

    /**
     * Build image URL from metadata
     */
    buildImageUrl(
        type: EpicImageType,
        imageName: string,
        date: string
    ): string {
        // EPIC date format: "2024-06-01 00:12:34"
        const [year, month, day] = date.split(" ")[0].split("-");

        return `${EPIC_ARCHIVE_URL}/${type}/${year}/${month}/${day}/png/${imageName}.png`;
    }
}

export const epicClient = new EpicClient();