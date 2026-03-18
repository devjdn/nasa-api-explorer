import { DatePickerForm } from "@/components/ui/apod/date/date-picker";
import ControlPanel from "@/components/ui/control-panel/control-panel";
import ControlPanelSlot from "@/components/ui/control-panel/control-panel-slot";

export default function NeoWsLayout({ children }: { children: React.ReactNode }) {
    const MIN_DATE = new Date(1900, 1, 1);
    const MAX_DATE = new Date();

    return (
        <div className="space-y-8">
            <ControlPanelSlot panel={"neows"} />
            <div className="space-y-6 px-3 lg:px-8">
                <p className="font-mono text-[0.65rem] lg:text-xs uppercase tracking-[0.35em] text-orange-500">NeoWs</p>
                <h1 className="font-display font-semibold text-3xl lg:text-4xl supports-text-pretty:text-pretty text-balance">Near Earth Object Web Service</h1>
            </div>
            {children}
            <ControlPanel apiName="NEOWS" />
            {/* <div className="sticky bottom-2 lg:bottom-8 z-20 flex justify-center">
                <DatePickerForm minDate={MIN_DATE} maxDate={MAX_DATE} route="neows" />
            </div> */}
        </div>
    );
}