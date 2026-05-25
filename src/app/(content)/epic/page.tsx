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
  const imageParams = searchParams.then((params) => ({
    type: params.type,
    date: params.date,
  }));

  return (
    <div className="@container border-x">
      <div className="px-3 lg:px-8 pb-8 space-y-6">
        <PageEyebrow>EPIC</PageEyebrow>
        <PageTitle>Earth Polychromatic Imaging Camera</PageTitle>
      </div>

      <Separator />

      <Suspense fallback={<div>Loading...</div>}>
        <EPICViewer imageParams={imageParams} />
      </Suspense>

      <Separator className="mb-8" />
    </div>
  );
}
