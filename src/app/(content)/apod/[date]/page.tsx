import type { Metadata } from 'next'
import { nasaClient } from "@/lib/nasa/client";
import APODDetails from "@/components/ui/apod/details";
import { Separator } from "@/components/ui/separator";
import { PageEyebrow, PageTitle, SubsectionTitle } from "@/components/ui/typography";
import APODMedia from "@/components/ui/apod/media";

type Props = {
    params: Promise<{
        date: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { date } = await params;
    const apod = await nasaClient.getAPODByDate(date);

    return {
        title: `${apod.title} - APOD`,
        description: apod.explanation,
    }
}

export default async function APODPage({ params }: Props) {
    const { date } = await params;
    const apod = await nasaClient.getAPODByDate(date);
    // console.log(apod);

    return (
        <div className="space-y-8 *:not-data-[slot=separator]:max-w-5xl *:not-data-[slot=separator]:w-full *:not-data-[slot=separator]:mx-auto *:not-data-[slot=separator]:px-3 *:not-data-[slot=separator]:lg:px-0">
            <div className="space-y-6">
                <PageEyebrow>Astronomy Picture of the Day</PageEyebrow>
                <PageTitle>{apod.title}</PageTitle>
                <APODDetails copyright={apod.copyright} date={apod.date} media_type={apod.media_type} />
            </div>

            <Separator />

            <APODMedia alt={apod.title} url={apod.url} hdurl={apod.hdurl} media_type={apod.media_type} />

            <Separator />

            <div className="space-y-4">
                <SubsectionTitle as="h2">Explanation</SubsectionTitle>
                <p className="text-base text-muted-foreground">{apod.explanation}</p>
            </div>
        </div>
    );
}