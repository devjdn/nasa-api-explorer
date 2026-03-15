import { DatePickerForm } from "@/components/ui/apod/date/date-picker";

export default function APODLayout({ children }: { children: React.ReactNode }) {
    const MIN_DATE = new Date(1995, 5, 16);
    const MAX_DATE = new Date();

    return (
        <div className="space-y-8">
            {children}
            <div className="sticky bottom-2 lg:bottom-8 z-20 flex justify-center">
                <DatePickerForm minDate={MIN_DATE} maxDate={MAX_DATE} route="apod" />
            </div>
        </div>
    );
}