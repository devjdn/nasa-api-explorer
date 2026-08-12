import APODDiscoverySidebar from "@/components/ui/apod/discovery-sidebar/discovery-sidebar";
import ControlPanel from "@/components/ui/control-panel/control-panel";
import ControlPanelSlot from "@/components/ui/control-panel/control-panel-slot";

export default function APODLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_350px] not-md:gap-y-8 md:gap-x-8">
      <ControlPanelSlot panel={"apod"} />

      {children}

      <APODDiscoverySidebar />

      <ControlPanel />
    </div>
  );
}
