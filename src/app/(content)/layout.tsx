export default function ContentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex-1 flex flex-col border-x">
            {children}
        </main>
    );
}