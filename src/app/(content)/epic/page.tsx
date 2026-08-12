import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { PageEyebrow, PageTitle } from "@/components/ui/typography";
import EPICViewer from "@/components/ui/epic/viewer";
import { Suspense } from "react";

type EpicPageProps = {
  searchParams: Promise<{
    type?: string;
    date?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Earth Polychromatic Imaging Camera",
};

export default async function EPICPage({ searchParams }: EpicPageProps) {
  return (
    <main className="@container border-x flex-1 flex flex-col">
      <div className="px-3 lg:px-8 py-8 space-y-6">
        <PageEyebrow>EPIC</PageEyebrow>
        <PageTitle>Earth Polychromatic Imaging Camera</PageTitle>
      </div>

      <Separator />

      <Suspense fallback={<div>Loading...</div>}>
        <EPICViewer imageParams={searchParams} />
      </Suspense>

      <Separator className="mb-8" />
    </main>
  );
}
