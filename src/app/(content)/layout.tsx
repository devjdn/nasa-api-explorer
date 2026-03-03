export default function ContentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="py-8 flex-1 flex flex-col">
            {children}
        </main>
    );
}