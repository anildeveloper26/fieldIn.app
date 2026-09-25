"use client";

import { useState } from "react";
import { CheckIcon, ChevronDownIcon, LocationPinIcon } from "@/components/shared/icons";
import { useToast } from "@/components/shared/ToastProvider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DEMO_LOCATIONS, useUiStore } from "@/store/useUiStore";

export function LocationSelector() {
  const location = useUiStore((state) => state.location);
  const setLocation = useUiStore((state) => state.setLocation);
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex min-w-0 items-center gap-1.5 rounded-full border border-border bg-card py-1.5 pl-2 pr-3 text-xs font-medium text-text-primary transition-colors hover:border-emerald/60">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald/15 text-emerald">
            <LocationPinIcon className="h-3 w-3" />
          </span>
          <span className="max-w-[7rem] truncate sm:max-w-[11rem]">{location.label.split(",")[0]}</span>
          <ChevronDownIcon className="h-3.5 w-3.5 text-text-primary/50" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Where are you playing?</DialogTitle>
          <DialogDescription>Venue distances and the 5 km PostGIS filter are measured from here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {DEMO_LOCATIONS.map((loc) => {
            const active = loc.label === location.label;
            return (
              <button
                key={loc.label}
                onClick={() => {
                  setLocation(loc);
                  setOpen(false);
                  showToast(`Location set to ${loc.label}`, "info");
                }}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors",
                  active ? "border-emerald bg-emerald/10" : "border-border hover:border-emerald/50"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    active ? "bg-emerald text-background" : "bg-text-primary/5 text-text-primary/60"
                  )}
                >
                  <LocationPinIcon className="h-4 w-4" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{loc.label.split(",")[0]}</span>
                  <span className="block text-xs text-text-primary/50">
                    {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                  </span>
                </span>
                {active && <CheckIcon className="h-4 w-4 text-emerald" />}
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
