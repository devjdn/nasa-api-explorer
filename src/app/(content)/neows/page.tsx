import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { SectionTitle } from "@/components/ui/typography";
import { Suspense } from "react";
import TodayFeed from "@/components/ui/neows/feeds/today-feed";

export const metadata: Metadata = {
  title: "Near Earth Object Web Service",
};

export default function NeoWsPage() {
  return (
    <>
      <div className="py-8 px-3 lg:px-8">
        <SectionTitle>Today&apos;s Overview</SectionTitle>
      </div>
      <Separator />
      <Suspense fallback={<div>Loading...</div>}>
        <TodayFeed />
      </Suspense>
    </>
  );
}
