"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiftIcon, LocationPinIcon, TrophyIcon, UsersIcon } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Venues", href: "/venues", icon: LocationPinIcon },
  { label: "Tournaments", href: "/tournaments", icon: TrophyIcon },
  { label: "Matchmaking", href: "/matchmaking", icon: UsersIcon },
  { label: "Rewards", href: "/rewards", icon: GiftIcon },
];

function useActiveHref() {
  const pathname = usePathname();
  return TABS.find((tab) => pathname?.startsWith(tab.href))?.href;
}

/** Desktop: segmented pill control inside the header. */
export function NavigationTabs() {
  const activeHref = useActiveHref();

  return (
    <nav aria-label="Main" className="hidden items-center gap-1 rounded-2xl border border-border bg-card p-1 md:flex">
      {TABS.map(({ label, href, icon: Icon }) => {
        const active = href === activeHref;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all",
              active ? "bg-emerald text-background shadow-sm" : "text-text-primary/60 hover:text-text-primary"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Mobile: thumb-reachable bottom tab bar. */
export function BottomTabBar() {
  const activeHref = useActiveHref();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-card/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"
    >
      {TABS.map(({ label, href, icon: Icon }) => {
        const active = href === activeHref;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-semibold transition-colors",
              active ? "text-emerald" : "text-text-primary/50"
            )}
          >
            <span className={cn("rounded-full px-4 py-1 transition-colors", active && "bg-emerald/15")}>
              <Icon className="h-5 w-5" />
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
