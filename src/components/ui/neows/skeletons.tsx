import { Separator } from "../separator";
import { Skeleton } from "../skeleton";
import { SectionTitle } from "../typography";

export function NeoSkeleton() {
  return (
    <div>
      <div className="px-3 py-8 lg:px-8">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-40 h-8 lg:h-9" />
          <SectionTitle>Overview</SectionTitle>
        </div>
      </div>

      <Separator />

      <div className="@container">
        <NeoOverviewSkeleton />
        <Separator />

        {/* reminder to make object section skeleton for here */}
      </div>
    </div>
  );
}

export function NeoOverviewSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 lg:*:px-8 lg:*:py-6">
      <div className="bg-card px-4 py-3 space-y-1 border-b lg:border-b-0 first:border-r">
        <p className="text-xs text-muted-foreground uppercase font-mono">
          Objects Detected
        </p>
        <Skeleton className="w-8 h-6 md:h-7" />
      </div>
      <div className="bg-card px-4 py-3 space-y-1 border-b lg:border-b-0 lg:border-r">
        <p className="text-xs text-muted-foreground uppercase font-mono">
          Potentially Hazardous
        </p>
        <Skeleton className="w-8 h-6 md:h-7" />
      </div>
      <div className="bg-card px-4 py-3 space-y-1 border-r">
        <p className="text-xs text-muted-foreground uppercase font-mono">
          Closest Approach
        </p>
        <Skeleton className="w-8 h-6 md:h-7" />
      </div>
      <div className="bg-card px-4 py-3 space-y-1">
        <p className="text-xs text-muted-foreground uppercase font-mono">
          Largest Diameter
        </p>
        <Skeleton className="w-8 h-6 md:h-7" />
      </div>
    </div>
  );
}
