import { nasaClient } from "@/lib/nasa/client";
import type { Metadata } from "next";
import APODPageContent from "@/components/ui/apod/page-content";
import ErrorView from "@/components/ui/response-states/error-view";

export const metadata: Metadata = {
  title: "Astronomy Picture of the Day",
};

export default async function APODPage() {
  const apod = await nasaClient.getTodayAPOD();
  if (!apod.ok) return <ErrorView error={apod.error} />;
  // console.log(apod);

  return <APODPageContent apod={apod.data} />;
}
