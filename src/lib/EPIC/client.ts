import type { EpicImage, EpicImageType } from "./types";
import { cacheLife, cacheTag } from "next/cache";

const EPIC_BASE_URL = "https://epic.gsfc.nasa.gov/api";

async function epicFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${EPIC_BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`EPIC API error: ${res.status}`);
  }
  return res.json();
}

/**
 * Get images for a specific type and date
 */
export async function getEpicImages(
  type: EpicImageType,
  date: string,
): Promise<EpicImage[]> {
  "use cache";
  cacheLife("days");
  cacheTag(`epic-images-${type}-${date}`);

  return epicFetch<EpicImage[]>(`/${type}/date/${date}`);
}

/**
 * Get available dates for a given type
 */
export async function getAvailableDates(
  type: EpicImageType,
): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(`epic-dates-${type}`);

  return epicFetch<string[]>(`/${type}/available`);
}
