"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import MobileNav from "./mobile-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NASA_APIS } from "@/lib/nasa-apis";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 flex justify-between items-center z-50 px-3 md:px-8 h-14 lg:grid md:grid-cols-[180px_1fr_180px] bg-background border-b">
      <div className="justify-self-start place-self-center">
        <span className="font-mono uppercase font-medium">
          <Link href="https://jdn.world" target="_blank">
            <span>jdn.world/</span>
          </Link>
          <Link href={"/"}>
            <span className="text-orange-500">Stargazer</span>
          </Link>
        </span>
      </div>

      <nav className="hidden md:flex place-self-center">
        <ul className="flex gap-6">
          {NASA_APIS.map((api, i) => (
            <li className="font-mono w-fit" key={api.href}>
              {i > 2 ? (
                <div className="text-neutral-700 cursor-not-allowed">
                  <span>{api.shortName}</span>
                </div>
              ) : (
                <Link href={api.href} className="group">
                  <div
                    className={cn(
                      "transition-colors hover:text-orange-500",
                      pathname.includes(api.href) && "text-orange-500",
                    )}
                  >
                    <span>{api.shortName}</span>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="justify-self-stretch self-center hidden md:block">
        <ThemeSwitcher />
      </div>
      <div className="justify-self-end block md:hidden">
        <MobileNav />
      </div>
    </header>
  );
}
