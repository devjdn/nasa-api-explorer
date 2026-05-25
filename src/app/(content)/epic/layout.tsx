import { EPICViewerContextProvider } from "@/components/ui/epic/viewer-context";

export default function EPICLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EPICViewerContextProvider>{children}</EPICViewerContextProvider>;
}
