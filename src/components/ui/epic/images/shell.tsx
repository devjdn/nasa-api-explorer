import { type EpicImageType } from "@/lib/EPIC/types";
import { getEpicImages, getAvailableDates } from "@/lib/EPIC/client";
import EPICViewerImages from "./images";

type EPICImagesShellProps = {
  type: EpicImageType;
  dateParam?: string;
};

export default async function EPICImagesShell({
  type,
  dateParam,
}: EPICImagesShellProps) {
  const availableDates = await getAvailableDates(type);

  if (!availableDates.length) {
    throw new Error("No EPIC dates available");
  }

  const latestDate = availableDates.reduce((latest, d) =>
    new Date(d) > new Date(latest) ? d : latest,
  );

  const date =
    dateParam && availableDates.includes(dateParam) ? dateParam : latestDate;

  const images = await getEpicImages(type, date);

  return (
    <EPICViewerImages images={images} currentType={type} currentDate={date} />
  );
}
