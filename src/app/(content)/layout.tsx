export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-350 mx-auto w-full flex-1 border-x">{children}</main>
  );
}
