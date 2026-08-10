import { Suspense } from "react";
import { EPIC_IMAGE_TYPES, type EpicImageType } from "@/lib/EPIC/types";
import EPICImagesShell from "./images/shell";
import EPICSidebarShell from "./sidebar/shell";
import { EPICControlSidebarSkeleton } from "./sidebar/control-sidebar";

type EPICViewerProps = {
  imageParams: Promise<{
    type?: string;
    date?: string;
  }>;
};

export default async function EPICViewer({ imageParams }: EPICViewerProps) {
  const { type, date } = await imageParams;
  const imageType: EpicImageType = EPIC_IMAGE_TYPES.includes(
    type as EpicImageType,
  )
    ? (type as EpicImageType)
    : "natural";

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr]">
      <Suspense fallback={<EPICControlSidebarSkeleton />}>
        <EPICSidebarShell type={imageType} dateParam={date} />
      </Suspense>

      <Suspense fallback={<div>Loading images...</div>}>
        <EPICImagesShell type={imageType} dateParam={date} />
      </Suspense>
    </div>
  );
}
