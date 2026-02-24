import { DatePickerForm } from "@/components/ui/apod/date/date-picker";

export default function APODLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pb-16 lg:pb-20">
            {children}
            <DatePickerForm />
        </div>
    );
}