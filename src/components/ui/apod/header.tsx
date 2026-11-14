import { format, parseISO } from "date-fns";
import { PageEyebrow } from "../typography";

type APODHeaderProps = {
  title: string;
  date: string;
};

export function APODHeader({ title, date }: APODHeaderProps) {
  return (
    <header className="space-y-gutter max-w-2xl w-full">
      <div>
        <PageEyebrow>Astronomy Picture of the Day</PageEyebrow>

        <p>
          <strong>{format(parseISO(date), "do MMMM yyyy")}</strong>
        </p>
      </div>

      <h1>{title}</h1>
    </header>
  );
}
