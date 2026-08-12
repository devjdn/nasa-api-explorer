import type { Metadata } from "next";
import { Inter_Tight, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header/header";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/ui/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense } from "react";
import ReactQueryClientProvider from "./ReactQueryClientProvider";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Stargazer",
    default: "Stargazer",
  },
  description:
    "Stargazer is an app dedicated to giving users the simplest and most effective interface to interact with the NASA APIs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${interTight.variable} ${ibmPlexMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ReactQueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <Suspense fallback={null}>
                <Header />
              </Suspense>
              <div className="px-3 lg:px-8 flex-1 flex flex-col">
                {children}
              </div>
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
