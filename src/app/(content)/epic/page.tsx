import { epicClient } from "@/lib/EPIC/client";
import { Separator } from "@/components/ui/separator";
import { EPIC_IMAGE_TYPES, type EpicImageType } from "@/lib/EPIC/types";
import EPICControls from "@/components/ui/epic/controls";
import EPICImagery from "@/components/ui/epic/imagery";

type EpicPageProps = {
    searchParams: Promise<{
        type?: string;
        date?: string;
    }>;
};

export default async function EPICPage({ searchParams }: EpicPageProps) {
    const params = await searchParams;

    const type: EpicImageType = EPIC_IMAGE_TYPES.includes(params.type as EpicImageType)
        ? (params.type as EpicImageType)
        : "natural";

    const availableDates = await epicClient.getAvailableDates(type);

    if (!availableDates.length) {
        throw new Error("No EPIC dates available");
    }

    let latestTimestamp = -Infinity;

    for (const d of availableDates) {
        const time = new Date(d).getTime();
        if (time > latestTimestamp) latestTimestamp = time;
    }

    const latestAvailableDate = new Date(latestTimestamp)
        .toISOString()
        .split("T")[0];

    if (!latestAvailableDate) {
        throw new Error("No EPIC dates available");
    }

    const date =
        params.date && availableDates.includes(params.date)
            ? params.date
            : latestAvailableDate;

    const images = await epicClient.getImages(type, date);
    // console.log(images)

    return (
        <div className="space-y-8 @container w-full px-3 lg:px-8">
            <div className="space-y-12">
                <div className="space-y-6">
                    <p className="font-medium text-orange-600 dark:text-orange-500 text-sm lg:text-base">
                        EPIC
                    </p>
                    <h1 className="font-display font-semibold text-3xl lg:text-4xl supports-text-pretty:text-pretty text-balance">
                        Earth Polychromatic Imaging Camera
                    </h1>
                </div>

                <EPICControls
                    currentType={type}
                    currentDate={date}
                    availableDates={availableDates}
                />
            </div>

            <Separator />

            {/* Image grid goes here */}
            <EPICImagery images={images} type={type} />
        </div>
    );
}