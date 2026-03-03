import { DatePickerForm } from "@/components/ui/apod/date/date-picker";

export default function APODLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-8">
            {children}
            <div className="sticky bottom-2 lg:bottom-8 z-20 flex justify-center">
                <DatePickerForm />
            </div>
        </div>
    );
}