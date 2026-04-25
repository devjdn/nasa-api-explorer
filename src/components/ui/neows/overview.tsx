import { NeoObject } from "@/lib/nasa/types";
import Stat from "../stat";

type NeoOverviewProps = {
  neo: Array<NeoObject>;
};
export function NeoOverview({ neo }: NeoOverviewProps) {
  const hazardousCount = neo.filter(
    (n) => n.is_potentially_hazardous_asteroid,
  ).length;

  const largestObject = neo.reduce(
    (largest, current) => {
      const largestDiameter =
        largest?.estimated_diameter.meters.estimated_diameter_max ?? 0;
      const currentDiameter =
        current.estimated_diameter.meters.estimated_diameter_max;
      return currentDiameter > largestDiameter ? current : largest;
    },
    undefined as (typeof neo)[number] | undefined,
  );

  const closest = neo.reduce((closest, current) => {
    const closestDistance = Number(
      closest.close_approach_data[0].miss_distance.kilometers,
    );
    const currentDistance = Number(
      current.close_approach_data[0].miss_distance.kilometers,
    );

    return currentDistance < closestDistance ? current : closest;
  });

  const distance = Number(
    closest.close_approach_data[0].miss_distance.kilometers,
  );

  const formatted = new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0,
  }).format(distance);

  const closestApproach = `${formatted} km`;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 lg:*:px-8 lg:*:py-6">
      <Stat
        className="border-b lg:border-b-0 first:border-r"
        label="Objects Detected"
        stat={neo.length}
      />
      <Stat
        className="border-b lg:border-b-0 lg:border-r"
        label="Potentially Hazardous"
        stat={hazardousCount}
      />
      <Stat
        className="border-r"
        label="Closest Approach"
        stat={closestApproach}
      />
      <Stat
        label="Largest Diameter"
        stat={
          largestObject
            ? `${largestObject.estimated_diameter.meters.estimated_diameter_max.toFixed(0)} m`
            : "—"
        }
      />
    </div>
  );
}
