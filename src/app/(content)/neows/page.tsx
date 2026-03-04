import { nasaClient } from "@/lib/nasa/client";
import { Separator } from "@/components/ui/separator";
import Stat from "@/components/ui/stat";
import { AsteroidCard } from "../../../components/ui/neows/asteroid-card";

export default async function NeoWsPage() {
    const date = new Date().toISOString().split("T")[0]
    const neo = await nasaClient.getNeosByDate(date);
    // console.log(neo)

    const hazardousCount = neo.filter((n) => n.is_potentially_hazardous_asteroid).length;
    const largestObject = neo.reduce(
        (largest, current) => {
            const largestDiameter = largest?.estimated_diameter.meters.estimated_diameter_max ?? 0;
            const currentDiameter = current.estimated_diameter.meters.estimated_diameter_max;
            return currentDiameter > largestDiameter ? current : largest;
        },
        undefined as (typeof neo)[number] | undefined
    );
    const closest = neo.reduce((closest, current) => {
        const closestDistance = Number(closest.close_approach_data[0].miss_distance.kilometers);
        const currentDistance = Number(current.close_approach_data[0].miss_distance.kilometers);

        return currentDistance < closestDistance ? current : closest;
    });
    const distance = Number(closest.close_approach_data[0].miss_distance.kilometers);
    const formatted = new Intl.NumberFormat("en-GB", {
        maximumFractionDigits: 0,
    }).format(distance);
    const closestApproach = `${formatted} km`;

    return (
        <div className="space-y-8 @container px-3 lg:px-8">
            <div className="space-y-6">
                <p className="font-medium text-orange-600 dark:text-orange-500 text-sm lg:text-base">NeoWs</p>
                <h1 className="font-display font-semibold text-3xl lg:text-4xl supports-text-pretty:text-pretty text-balance">Near Earth Object Web Service</h1>
            </div>

            <Separator />

            <section className="space-y-6">
                <div>
                    <h2 className="font-display font-medium text-2xl lg:text-3xl supports-text-pretty:text-pretty text-balance">Overview</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap">
                    <Stat label="Objects Detected" stat={neo.length} />
                    <Stat label="Potentially Hazardous" stat={hazardousCount} />
                    <Stat label="Closest Approach" stat={closestApproach} />
                    <Stat label="Largest Diameter Object" stat={largestObject ? `${largestObject.estimated_diameter.meters.estimated_diameter_max.toFixed(0)} m` : "—"} />
                </div>
            </section>

            <Separator />

            <section className="space-y-6">
                <div>
                    <h2 className="font-display font-medium text-2xl lg:text-3xl supports-text-pretty:text-pretty text-balance">Objects</h2>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {neo.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No near-Earth objects recorded for this date.
                        </p>
                    ) : (
                        neo.map((n) => {
                            const approach = n.close_approach_data[0];

                            const missKm = Number(approach.miss_distance.kilometers);
                            const velocity = Number(
                                approach.relative_velocity.kilometers_per_second
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
            </section>
        </div>
    );
}