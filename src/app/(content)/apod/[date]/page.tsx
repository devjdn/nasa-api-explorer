import type { Metadata } from "next";
import { getAPODByDate } from "@/lib/nasa/client";
import { Suspense } from "react";
import APODDatePageContent from "@/components/ui/apod/date-page-shell";
import { APODSkeleton } from "@/components/ui/apod/skeletons";

type Props = {
  params: Promise<{
    date: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const apod = await getAPODByDate(date);

  if (!apod.ok) return {};

  return {
    title: `${apod.data.title} - APOD`,
    description: apod.data.explanation,
  };
}

export default async function APODPage({ params }: Props) {
  return (
    <Suspense fallback={<APODSkeleton />}>
      <APODDatePageContent params={params} />
    </Suspense>
  );
}
