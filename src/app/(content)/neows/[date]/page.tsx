import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { SectionTitle } from "@/components/ui/typography";
import { format } from "date-fns";
import { Suspense } from "react";
import DateFeed from "@/components/ui/neows/feeds/date-feed";

type NeoWsDatePageProps = {
  params: Promise<{
    date: string;
  }>;
};

export async function generateMetadata({
  params,
}: NeoWsDatePageProps): Promise<Metadata> {
  "use cache";
  const { date } = await params;

  return {
    title: `${format(new Date(date), "do MMMM yyyy")} - NeoWs`,
  };
}

export default function NeoWsDatePage({ params }: NeoWsDatePageProps) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DateFeed params={params} />
      </Suspense>
    </>
  );
}
