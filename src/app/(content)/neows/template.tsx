import ControlPanel from "@/components/ui/control-panel/control-panel";
import ControlPanelSlot from "@/components/ui/control-panel/control-panel-slot";
import { Separator } from "@/components/ui/separator";

export default function NeoWsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8 border-x">
      <ControlPanelSlot panel={"neows"} />

      <div className="space-y-6 px-3 lg:px-8">
        <p className="font-mono text-[0.65rem] lg:text-xs uppercase tracking-[0.35em] text-orange-500">
          NeoWs
        </p>
        <h1 className="font-display font-semibold text-3xl lg:text-4xl supports-text-pretty:text-pretty text-balance">
          Near Earth Object Web Service
        </h1>
      </div>

      <Separator />

      {children}

      <ControlPanel apiName="NEOWS" />
    </div>
  );
}
