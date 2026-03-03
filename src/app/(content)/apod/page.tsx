import { nasaClient } from "@/lib/nasa/client";
import APODDetails from "@/components/ui/apod/details";
import { Separator } from "@/components/ui/separator";
import APODMedia from "@/components/ui/apod/media";
import { notFound } from "next/navigation";

export default async function APODPage() {
    const apod = await nasaClient.getTodayAPOD();
    if (!apod) notFound();
    // console.log(apod);

    return (
        <div className="space-y-8 @container w-full max-w-5xl mx-auto px-3 lg:px-0">
            <div className="space-y-6">
                <p className="font-medium text-orange-600 dark:text-orange-500 text-sm lg:text-base">Astronomy Picture of the Day</p>
                <h1 className="font-display font-semibold text-3xl lg:text-4xl supports-text-pretty:text-pretty text-balance">{apod.title}</h1>
                <APODDetails copyright={apod.copyright} date={apod.date} media_type={apod.media_type} />
            </div>

            <Separator />

            <APODMedia alt={apod.title} url={apod.url} hdurl={apod.hdurl} media_type={apod.media_type} />

            <Separator />

            <div className="space-y-4">
                <h2 className="font-display font-medium text-lg lg:text-xl">Explanation</h2>
                <p className="text-base text-muted-foreground">{apod.explanation}</p>
            </div>
        </div>
    );
}