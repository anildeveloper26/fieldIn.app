"use client";

import Link from "next/link";
import { LogoMark } from "@/components/shared/icons";
import { AthleteProfileChip } from "./AthleteProfileChip";
import { CoinWalletBadge } from "./CoinWalletBadge";
import { LocationSelector } from "./LocationSelector";
import { NavigationTabs } from "./NavigationTabs";

export function HeaderBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <Link href="/venues" className="flex shrink-0 items-center gap-2">
          <LogoMark className="h-8 w-8" />
          <span className="hidden text-lg font-extrabold tracking-tight text-text-primary sm:block">
            Field<span className="text-emerald">In</span>
          </span>
        </Link>
        <LocationSelector />
        <div className="flex flex-1 justify-center">
          <NavigationTabs />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <CoinWalletBadge />
          <AthleteProfileChip />
        </div>
      </div>
    </header>
  );
}
