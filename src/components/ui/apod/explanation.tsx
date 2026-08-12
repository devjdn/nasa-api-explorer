import { SubsectionTitle } from "../typography";

export function APODExplanation({ explanation }: { explanation?: string }) {
  return (
    <div className="space-y-4 px-3 lg:px-8 pt-8">
      <SubsectionTitle as="h2">Explanation</SubsectionTitle>
      <p className="text-base text-muted-foreground">
        {explanation ? explanation : "No explanation provided."}
      </p>
    </div>
  );
}
