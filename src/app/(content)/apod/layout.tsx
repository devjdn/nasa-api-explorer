import ControlPanel from "@/components/ui/control-panel/control-panel";
import ControlPanelSlot from "@/components/ui/control-panel/control-panel-slot";

export default function APODLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="space-y-8">
            <ControlPanelSlot panel={"apod"} />
            {children}
            {/* <div className="sticky bottom-2 lg:bottom-8 z-20 flex justify-center">
                <DatePickerForm minDate={MIN_DATE} maxDate={MAX_DATE} route="apod" />
            </div> */}
            <ControlPanel />
        </div>
    );
}