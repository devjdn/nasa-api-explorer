import { getAvailableDates } from "@/lib/EPIC/client";
import type { EpicImageType } from "@/lib/EPIC/types";
import EPICControlSidebar from "./control-sidebar";

export default async function EPICSidebarShell({
  type,
  dateParam,
}: {
  type: EpicImageType;
  dateParam?: string;
}) {
  const availableDates = await getAvailableDates(type);

  if (!availableDates.length) {
    throw new Error("No EPIC dates available");
  }

  const latestDate = availableDates.reduce((latest, d) =>
    new Date(d) > new Date(latest) ? d : latest,
  );

  const date =
    dateParam && availableDates.includes(dateParam) ? dateParam : latestDate;

  return (
    <EPICControlSidebar
      currentType={type}
      currentDate={date}
      availableDates={availableDates}
    />
  );
}
