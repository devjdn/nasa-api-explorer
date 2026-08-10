import { getNeosByDate } from "@/lib/nasa/client";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { SectionTitle } from "../../typography";
import NeoFeed from "./feed-content";
import { Separator } from "../../separator";

export default async function DateFeed({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const formattedDate = format(new Date(date), "do MMMM yyyy");
  const neows = await getNeosByDate(date);
  if (!neows.ok) return notFound();

  return (
    <div>
      <div className="px-3 py-8 lg:px-8">
        <SectionTitle>{formattedDate} Overview</SectionTitle>
      </div>
      <Separator />
      <NeoFeed neo={neows.data} />
    </div>
  );
}
