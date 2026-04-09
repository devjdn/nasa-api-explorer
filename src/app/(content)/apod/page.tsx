import { nasaClient } from "@/lib/nasa/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import APODPageContent from "@/components/ui/apod/page-content";

export const metadata: Metadata = {
  title: "Astronomy Picture of the Day",
};

export default async function APODPage() {
  const apod = await nasaClient.getTodayAPOD();
  if (!apod) return notFound();
  // console.log(apod);

  return <APODPageContent apod={apod} />;
}
