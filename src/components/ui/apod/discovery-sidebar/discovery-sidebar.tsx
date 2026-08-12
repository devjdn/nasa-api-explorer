import { Separator } from "../../separator";
import { SubsectionTitle } from "../../typography";
import APODDiscoverySidebarClient from "./client";

export default function APODDiscoverySidebar() {
  return (
    <div className="not-md:border-t md:border-l py-8 flex flex-col">
      <header className="px-3 pb-8">
        <SubsectionTitle>Discover</SubsectionTitle>
      </header>
      <Separator />
      <APODDiscoverySidebarClient />
    </div>
  );
}
