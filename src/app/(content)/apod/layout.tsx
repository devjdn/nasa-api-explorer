import APODDiscoverySidebar from "@/components/ui/apod/discovery-sidebar/discovery-sidebar";
import ControlPanel from "@/components/ui/control-panel/control-panel";
import ControlPanelSlot from "@/components/ui/control-panel/control-panel-slot";

export default function APODLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:grid md:grid-cols-[1fr_300px] border-x">
      <ControlPanelSlot panel={"apod"} />

      {children}

      <APODDiscoverySidebar />

      <ControlPanel />
    </main>
  );
}
