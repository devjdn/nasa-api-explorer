import { nasaClient } from "@/lib/nasa/client";
import { Separator } from "@/components/ui/separator";
import Stat from "@/components/ui/stat";
import { SectionTitle } from "@/components/ui/typography";
import { format } from "date-fns";
import ObjectGrid from "@/components/ui/neows/objects-grid";
import ObjectSection from "@/components/ui/neows/object-section";

type NeoWsDatePageProps = {
    params: Promise<{
        date: string;
    }>;
}

export default async function NeoWsPage({ params }: NeoWsDatePageProps) {
    const { date } = await params;
    const neo = await nasaClient.getNeosByDate(date);
    // console.log(neo)

    const formattedDate = format(new Date(date), "do MMMM yyyy")

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
        <div className="space-y-8 @container">

            <Separator />

            <section className="space-y-6 px-3 lg:px-8">
                <div>
                    <SectionTitle>{formattedDate}</SectionTitle>
                </div>
                <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap">
                    <Stat className="corner-caps" label="Objects Detected" stat={neo.length} />
                    <Stat className="corner-caps" label="Potentially Hazardous" stat={hazardousCount} />
                    <Stat className="corner-caps" label="Closest Approach" stat={closestApproach} />
                    <Stat className="corner-caps" label="Largest Diameter Object" stat={largestObject ? `${largestObject.estimated_diameter.meters.estimated_diameter_max.toFixed(0)} m` : "—"} />
                </div>
            </section>

            <Separator />

            <ObjectSection neo={neo} />
        </div>
    );
}