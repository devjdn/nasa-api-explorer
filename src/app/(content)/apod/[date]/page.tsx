import type { Metadata } from "next";
import { nasaClient } from "@/lib/nasa/client";
import APODPageContent from "@/components/ui/apod/page-content";
import ErrorView from "@/components/ui/response-states/error-view";

type Props = {
  params: Promise<{
    date: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const apod = await nasaClient.getAPODByDate(date);

  if (!apod.ok) return {};

  return {
    title: `${apod.data.title} - APOD`,
    description: apod.data.explanation,
  };
}

export default async function APODPage({ params }: Props) {
  const { date } = await params;
  const apod = await nasaClient.getAPODByDate(date);
  // console.log(apod);

  if (!apod.ok) return <ErrorView error={apod.error} />;

  return <APODPageContent apod={apod.data} />;
}
