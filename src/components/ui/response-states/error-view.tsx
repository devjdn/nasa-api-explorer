import { AppError } from "@/lib/nasa/types";
import { PageTitle } from "../typography";
import { RiAlertLine } from "@remixicon/react";

export default function ErrorView({ error }: { error: AppError }) {
  return (
    <div className="px-3 lg:px-8 space-y-8">
      <div className="space-y-4">
        <RiAlertLine className="size-12 fill-orange-500" color="currentColor" />
        <PageTitle>An error has occurred</PageTitle>
      </div>
      <div className="text-destructive">
        <h2>Error: {error.type}</h2>
        <p>{error.message}</p>
      </div>
    </div>
  );
}
