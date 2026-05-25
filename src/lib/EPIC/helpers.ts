import { EpicImageType } from "./types";

const EPIC_ARCHIVE_URL = "https://epic.gsfc.nasa.gov/archive";

export function buildEpicImageUrl(
  type: EpicImageType,
  imageName: string,
  date: string,
): string {
  const [year, month, day] = date.split(" ")[0].split("-");
  return `${EPIC_ARCHIVE_URL}/${type}/${year}/${month}/${day}/png/${imageName}.png`;
}
