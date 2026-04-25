import { NeoObject } from "@/lib/nasa/types";
import { AsteroidCard } from "./asteroid-card";

type ObjectGridProps = {
  neo: NeoObject[];
};

export default function ObjectGrid({ neo }: ObjectGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      {neo.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No near-Earth objects recorded for this date.
        </p>
      ) : (
        neo.map((n) => {
          const approach = n.close_approach_data[0];

          const missKm = Number(approach.miss_distance.kilometers);
          const velocity = Number(
            approach.relative_velocity.kilometers_per_second,
          );

          const estimatedDiameterRange = `${n.estimated_diameter.meters.estimated_diameter_min.toFixed(0)} - ${n.estimated_diameter.meters.estimated_diameter_max.toFixed(0)} m`;

          const formattedKm = new Intl.NumberFormat("en-GB", {
            maximumFractionDigits: 0,
          }).format(missKm);

          return (
            <AsteroidCard
              key={n.id}
              neo={n}
              formattedKm={formattedKm}
              velocity={velocity}
              orbitingBody={n.close_approach_data[0].orbiting_body}
              estimatedDiameterRange={estimatedDiameterRange}
            />
          );
        })
      )}
    </div>
  );
}
