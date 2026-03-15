import { epicClient } from "@/lib/EPIC/client";
import { Separator } from "@/components/ui/separator";
import { EPIC_IMAGE_TYPES, type EpicImageType } from "@/lib/EPIC/types";
import EPICControls from "@/components/ui/epic/controls";
import EPICImagery from "@/components/ui/epic/imagery";
import { PageEyebrow, PageTitle } from "@/components/ui/typography";

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

    for (const date of availableDates) {
        const time = new Date(date).getTime();
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
        <div className="space-y-8 @container w-full">
            <div className="space-y-12 px-3 lg:px-8">
                <div className="space-y-6">
                    <PageEyebrow>EPIC</PageEyebrow>
                    <PageTitle>Earth Polychromatic Imaging Camera</PageTitle>
                </div>

                <EPICControls
                    currentType={type}
                    currentDate={date}
                    availableDates={availableDates}
                />
            </div>

            <Separator />

            <EPICImagery images={images} type={type} />
        </div>
    );
}