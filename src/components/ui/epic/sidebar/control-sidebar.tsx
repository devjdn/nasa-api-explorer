"use client";

import type { EpicImageType } from "@/lib/EPIC/types";
import { Separator } from "../../separator";
import EPICImageFilters from "./image-filters";
import EPICViewerModes from "./viewer-modes";
import { Skeleton } from "../../skeleton";

type EPICSidebarControlsProps = {
  currentType: EpicImageType;
  currentDate: string;
  availableDates: string[];
};

export default function EPICControlSidebar({
  currentType,
  currentDate,
  availableDates,
}: EPICSidebarControlsProps) {
  return (
    <aside className="pt-8 lg:pb-8 flex flex-col lg:h-200 lg:self-start lg:sticky lg:top-14 lg:left-0">
      <div className="space-y-1 px-3 lg:px-8 pb-6">
        <p className="text-base font-medium uppercase font-mono">
          EPIC Controls
        </p>
      </div>

      <Separator />

      <div className="*:px-3 lg:*:px-8 pb-6">
        <div className="py-3 space-y-6">
          <div>
            <h3 className="text-sm font-medium uppercase font-mono">
              Image Filters
            </h3>
          </div>
          <EPICImageFilters
            currentType={currentType}
            currentDate={currentDate}
            availableDates={availableDates}
          />
        </div>

        <Separator />

        <div className="py-3 space-y-6">
          <div>
            <h3 className="text-sm font-medium uppercase font-mono">
              Viewer Modes
            </h3>
          </div>
          <EPICViewerModes />
        </div>
      </div>
    </aside>
  );
}

export function EPICControlSidebarSkeleton() {
  return (
    <aside className="pt-8 lg:pb-8 flex flex-col lg:h-200 lg:self-start lg:sticky lg:top-14 lg:left-0">
      <div className="space-y-1 px-3 lg:px-8 pb-6">
        <p className="text-base font-medium uppercase font-mono">
          EPIC Controls
        </p>
      </div>

      <Separator />

      <div className="*:px-3 lg:*:px-8 pb-6">
        <div className="py-3 space-y-6">
          <div>
            <h3 className="text-sm font-medium uppercase font-mono">
              Image Filters
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>

          <Skeleton className="h-8 w-full" />
        </div>

        <Separator />

        <div className="py-3 space-y-6">
          <div>
            <h3 className="text-sm font-medium uppercase font-mono">
              Viewer Modes
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </aside>
  );
}
