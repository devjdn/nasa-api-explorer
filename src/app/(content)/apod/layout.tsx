import APODDiscovery from "@/components/ui/apod/discovery/discovery";
import { Separator } from "@/components/ui/separator";

export default function APODLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-margin pt-block pb-section space-y-section">
      <div className="space-y-group max-w-5xl mx-auto w-full">
        {children}
        <Separator />
        <APODDiscovery />
      </div>
    </main>
  );
}
