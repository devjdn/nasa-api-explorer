import { getTodayAPOD } from "@/lib/nasa/client";
import type { Metadata } from "next";
import APODPageContent from "@/components/ui/apod/page-content";
import ErrorView from "@/components/ui/response-states/error-view";
import { Suspense } from "react";
import { APODSkeleton } from "@/components/ui/apod/skeletons";

export const metadata: Metadata = {
  title: "Astronomy Picture of the Day",
};

export default async function APODPage() {
  const apod = await getTodayAPOD();
  if (!apod.ok) return <ErrorView error={apod.error} />;
  // console.log(apod);

  return (
    <Suspense fallback={<APODSkeleton />}>
      <APODPageContent apod={apod.data} />
    </Suspense>
  );
}
