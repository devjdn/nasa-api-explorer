import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { NASA_APIS } from "@/lib/nasa-apis";

export default function Footer() {
  return (
    <footer className="px-3 lg:px-8 py-16 border-t">
      <div className="space-y-12">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-3">
          <div className="max-w-5xl space-y-4">
            <h2 className="font-semibold text-xl">Stargazer</h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase font-medium">Explore</h3>
            <div className="flex flex-col gap-4 text-sm">
              {NASA_APIS.map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase font-medium">
              Resources
            </h3>
            <div className="flex flex-col gap-4 text-sm">
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
              >
                NASA Open APIs
              </a>
              <a
                href="https://apod.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
              >
                APOD Official Website
              </a>
              <a
                href="https://epic.gsfc.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
              >
                EPIC GSFC
              </a>
              <a
                href="https://cneos.jpl.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
              >
                CNEOS JPL
              </a>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col md:flex-row justify-between gap-6 text-sm text-muted-foreground">
          <p>
            Data provided by NASA Open APIs. This project is not affiliated with
            or endorsed by NASA.
          </p>
          <p>© {new Date().getFullYear()} Stargazer</p>
        </div>
      </div>
    </footer>
  );
}
