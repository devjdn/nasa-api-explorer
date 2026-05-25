import { SubsectionTitle } from "../typography";

export function APODExplanation({ explanation }: { explanation: string }) {
  return (
    <div className="space-y-4 px-3 lg:px-8">
      <SubsectionTitle as="h2">Explanation</SubsectionTitle>
      <p className="text-base text-muted-foreground">{explanation}</p>
    </div>
  );
}
