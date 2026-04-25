import { Separator } from "@/components/ui/separator";
import {
  PageEyebrow,
  HeroTitle,
  SectionTitle,
  MonoSmall,
} from "@/components/ui/typography";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 pb-24! pt-0! *:not-data-[slot=separator]:px-3 *:not-data-[slot=separator]:lg:px-8 border-x">
      <section className="grid items-center gap-8 lg:gap-16 lg:grid-cols-[1fr_1px_1fr] *:not-data-[slot=separator]:py-12 *:not-data-[slot=separator]:lg:py-24">
        <div className="space-y-8 max-w-prose">
          <PageEyebrow>Live data from NASA APIs</PageEyebrow>
          <HeroTitle className="text-primary">
            Beyond the <span className="text-orange-500">stars</span>, <br />
            or closer to <span className="text-orange-500">home</span>.
          </HeroTitle>
          <div className="space-y-4 text-muted-foreground">
            <p className="text-sm lg:text-base text-muted-foreground">
              It&apos;s all been available for decades, but never in a
              consistent, user-friendly format. This is why I created NASA API
              Explorer.
            </p>
            <p className="text-sm lg:text-base text-muted-foreground">
              Choose the data that interests you most, then explore. Every view
              is built to stay readable, minimal, and a little bit like a
              control room. New APIs will progressively be added.
            </p>
          </div>
        </div>

        <Separator orientation="vertical" className="h-full hidden lg:block" />

        <div className="relative">
          <div className="relative mx-auto aspect-square max-w-md lg:max-w-lg">
            {/* Outer frame */}
            <div className="absolute inset-0 border border-border/70 bg-background/40 backdrop-blur-sm" />

            {/* Grid / scan lines */}
            <div className="absolute inset-px overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,theme(colors.border/40)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/40)_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />
            </div>

            {/* Elliptical rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Mercury */}
              <div className="group pointer-events-auto absolute inset-0 flex items-center justify-center">
                <div className="relative w-[40%] h-[40%] transform-gpu perspective-[1200px] rotate-x-[58deg]">
                  <div className="absolute inset-0 rounded-full border border-muted-foreground/60 scale-y-[0.34] translate-y-[12%] rotate-[18deg] transition-colors group-hover:border-orange-500" />
                </div>
              </div>

              {/* Venus */}
              <div className="group pointer-events-auto absolute inset-0 flex items-center justify-center">
                <div className="relative w-[52%] h-[52%] transform-gpu perspective-[1200px] rotate-x-[58deg]">
                  <div className="absolute inset-0 rounded-full border border-muted-foreground/60 scale-y-[0.33] translate-y-[11.5%] rotate-[18deg] transition-colors group-hover:border-orange-500" />
                </div>
              </div>

              {/* Earth */}
              <div className="group pointer-events-auto absolute inset-0 flex items-center justify-center">
                <div className="relative w-[64%] h-[64%] transform-gpu perspective-[1200px] rotate-x-[58deg]">
                  <div className="absolute inset-0 rounded-full border border-muted-foreground/60 scale-y-[0.32] translate-y-[11%] rotate-[18deg] transition-colors group-hover:border-orange-500" />
                </div>
              </div>

              {/* Mars */}
              <div className="group pointer-events-auto absolute inset-0 flex items-center justify-center">
                <div className="relative w-[72%] h-[72%] transform-gpu perspective-[1200px] rotate-x-[58deg]">
                  <div className="absolute inset-0 rounded-full border border-muted-foreground/60 scale-y-[0.32] translate-y-[10.5%] rotate-[18deg] transition-colors group-hover:border-orange-500" />
                </div>
              </div>

              {/* Jupiter */}
              <div className="group pointer-events-auto absolute inset-0 flex items-center justify-center">
                <div className="relative w-[80%] h-[80%] transform-gpu perspective-[1200px] rotate-x-[58deg]">
                  <div className="absolute inset-0 rounded-full border border-muted-foreground/70 scale-y-[0.32] translate-y-[10%] rotate-[18deg] transition-colors group-hover:border-orange-500" />
                </div>
              </div>

              {/* Saturn */}
              <div className="group pointer-events-auto absolute inset-0 flex items-center justify-center">
                <div className="relative w-[88%] h-[88%] transform-gpu perspective-[1200px] rotate-x-[58deg]">
                  <div className="absolute inset-0 rounded-full border border-muted-foreground/50 scale-y-[0.32] translate-y-[9.5%] rotate-[18deg] transition-colors group-hover:border-orange-500" />
                </div>
              </div>

              {/* Uranus */}
              <div className="group pointer-events-auto absolute inset-0 flex items-center justify-center">
                <div className="relative w-[96%] h-[96%] transform-gpu perspective-[1200px] rotate-x-[58deg]">
                  <div className="absolute inset-0 rounded-full border border-muted-foreground/40 scale-y-[0.32] translate-y-[9%] rotate-[18deg] transition-colors group-hover:border-orange-500" />
                </div>
              </div>

              {/* Neptune */}
              <div className="group pointer-events-auto absolute inset-0 flex items-center justify-center">
                <div className="relative w-[104%] h-[104%] transform-gpu perspective-[1200px] rotate-x-[58deg]">
                  <div className="absolute inset-0 rounded-full border border-muted-foreground/30 scale-y-[0.31] translate-y-[8.5%] rotate-[18deg] transition-colors group-hover:border-orange-500" />
                </div>
              </div>
            </div>

            {/* Central body */}
            <div className="absolute inset-1/2 w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500" />

            {/* Tiny debris / background points */}
            <div className="absolute inset-8">
              <div className="absolute left-[8%] top-[18%] h-[2px] w-[2px] rounded-full bg-muted-foreground/60" />
              <div className="absolute right-[18%] top-[32%] h-[2px] w-[2px] rounded-full bg-muted-foreground/60" />
              <div className="absolute left-[26%] bottom-[22%] h-[2px] w-[2px] rounded-full bg-muted-foreground/60" />
              <div className="absolute right-[10%] bottom-[14%] h-[2px] w-[2px] rounded-full bg-muted-foreground/60" />
            </div>

            {/* Overlay labels */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 lg:p-5">
              <div className="flex items-center justify-between text-[0.65rem] font-mono text-muted-foreground/80">
                <span>ORBITAL TRACE / LINE VIEW</span>
                <span className="text-orange-500/80">NEO · APOD · EPIC</span>
              </div>
              <div className="flex items-end justify-between text-[0.65rem] font-mono text-muted-foreground/70">
                <div className="space-y-1">
                  <p className="uppercase tracking-[0.22em] text-xs text-muted-foreground/60">
                    Console status
                  </p>
                  <p className="text-[0.7rem]">
                    <span className="text-emerald-400/90">●</span> link:
                    nasa.gov / public api
                  </p>
                </div>
                <p className="text-[0.7rem] text-right">
                  <span className="text-muted-foreground/50">mode</span> ·{" "}
                  <span className="text-orange-400">observation</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="" />

      <section className="space-y-8 mt-12 lg:mt-24">
        <div className="space-y-4 max-w-2xl">
          <SectionTitle as="h2" className="text-primary">
            Datasets you can explore
          </SectionTitle>
          <p className="text-sm lg:text-base text-muted-foreground">
            NASA and its teams make an incredible amount of data freely
            available. The challenge is simply finding it and viewing it in a
            way that&apos;s easy to explore. The cards below showcase the
            interfaces I&apos;ve built to help people interact with and discover
            this data.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="corner-caps">
            <CardHeader>
              <MonoSmall>APOD</MonoSmall>
              <CardTitle>Astronomy Picture of the Day</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The APOD API provides access to NASA&apos;s Astronomy Picture of
                the Day archive, a daily selection of images and videos from
                across the universe. Each entry is accompanied by an explanation
                written by a professional astronomer, offering context behind
                what you&apos;re seeing.
              </p>
            </CardContent>
          </Card>

          <Card className="corner-caps">
            <CardHeader>
              <MonoSmall>EPIC</MonoSmall>
              <CardTitle>Earth Polychromatic Imaging Camera</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The EPIC API, provided by NASA&apos;s Goddard Space Flight
                Center, gives access to high-resolution images of Earth captured
                by the DSCOVR satellite&apos;s Earth Polychromatic Imaging
                Camera. Images are available across four views: natural color,
                enhanced color, clouds, and aerosols.
              </p>
            </CardContent>
          </Card>

          <Card className="corner-caps">
            <CardHeader>
              <MonoSmall>NeoWs</MonoSmall>
              <CardTitle>Near Earth Object Web Service</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The NeoWs API provides access to data about near-Earth asteroids
                tracked by NASA&apos;s Jet Propulsion Laboratory, including
                their size, velocity, orbital path, and the distance of each
                object&apos;s closest approach to Earth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
