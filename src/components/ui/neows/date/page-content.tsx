import { getNeosByDate } from "@/lib/nasa/client";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { SectionTitle } from "../../typography";
import { Separator } from "../../separator";
import ObjectSection from "../object-section";
import { NeoOverview } from "../overview";

type NeoWsPageContentProps = {
  params: Promise<{
    date: string;
  }>;
};

export default async function NeoWsPageContent({
  params,
}: NeoWsPageContentProps) {
  const { date } = await params;
  const neows = await getNeosByDate(date);
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
