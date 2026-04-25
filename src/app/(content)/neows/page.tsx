import type { Metadata } from "next";
import { nasaClient } from "@/lib/nasa/client";
import { Separator } from "@/components/ui/separator";
import { SectionTitle } from "@/components/ui/typography";
import ObjectSection from "@/components/ui/neows/object-section";
import { notFound } from "next/navigation";
import { NeoOverview } from "@/components/ui/neows/overview";

export const metadata: Metadata = {
  title: "Near Earth Object Web Service",
};

export default async function NeoWsPage() {
  const date = new Date().toISOString().split("T")[0];
  const neows = await nasaClient.getNeosByDate(date);
  // console.log(neo)

  if (!neows.ok) return notFound();

  const neo = neows.data;

  return (
    <div className="@container">
      <section className="">
        <div className="pb-8 px-3 lg:px-8">
          <SectionTitle>Today&apos;s Overview</SectionTitle>
        </div>

        <Separator />

        <NeoOverview neo={neo} />
      </section>

      <Separator />

      <ObjectSection neo={neo} />
    </div>
  );
}
