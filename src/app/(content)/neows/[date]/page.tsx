import type { Metadata } from "next";
import { nasaClient } from "@/lib/nasa/client";
import { Separator } from "@/components/ui/separator";
import { SectionTitle } from "@/components/ui/typography";
import { format } from "date-fns";
import ObjectSection from "@/components/ui/neows/object-section";
import { notFound } from "next/navigation";
import { NeoOverview } from "@/components/ui/neows/overview";

type NeoWsDatePageProps = {
  params: Promise<{
    date: string;
  }>;
};

export async function generateMetadata({
  params,
}: NeoWsDatePageProps): Promise<Metadata> {
  const { date } = await params;

  return {
    title: `${format(new Date(date), "do MMMM yyyy")} - NeoWs`,
  };
}

export default async function NeoWsPage({ params }: NeoWsDatePageProps) {
  const { date } = await params;
  const neows = await nasaClient.getNeosByDate(date);
  // console.log(neo)

  if (!neows.ok) return notFound();

  const neo = neows.data;

  const formattedDate = format(new Date(date), "do MMMM yyyy");

  return (
    <div className="@container">
      <section className="">
        <div className="pb-8 px-3 lg:px-8">
          <SectionTitle>{formattedDate} Overview</SectionTitle>
        </div>

        <Separator />

        <NeoOverview neo={neo} />
      </section>

      <Separator />

      <ObjectSection neo={neo} />
    </div>
  );
}
