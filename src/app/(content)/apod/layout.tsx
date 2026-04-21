import ControlPanel from "@/components/ui/control-panel/control-panel";
import ControlPanelSlot from "@/components/ui/control-panel/control-panel-slot";

export default function APODLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 space-y-8 max-w-5xl w-full mx-auto border-x">
      <ControlPanelSlot panel={"apod"} />

      {children}

      <ControlPanel />
    </div>
  );
}
