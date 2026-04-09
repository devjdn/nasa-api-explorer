import type { Metadata } from "next";
import { nasaClient } from "@/lib/nasa/client";
import APODPageContent from "@/components/ui/apod/page-content";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    date: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const apod = await nasaClient.getAPODByDate(date);

  if (!apod) return {};

  return {
    title: `${apod.title} - APOD`,
    description: apod.explanation,
  };
}

export default async function APODPage({ params }: Props) {
  const { date } = await params;
  const apod = await nasaClient.getAPODByDate(date);
  // console.log(apod);

  if (!apod) return notFound();

  return <APODPageContent apod={apod} />;
}
