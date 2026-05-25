import { getAPODByDate } from "@/lib/nasa/client";
import APODPageContent from "./page-content";
import ErrorView from "../response-states/error-view";

type Props = {
  params: Promise<{
    date: string;
  }>;
};

export default async function APODDatePageContent({ params }: Props) {
  const { date } = await params;
  const apod = await getAPODByDate(date);
  if (!apod.ok) return <ErrorView error={apod.error} />;

  return (
    <>
      <APODPageContent apod={apod.data} />
    </>
  );
}
