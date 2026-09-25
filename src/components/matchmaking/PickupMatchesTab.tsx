"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { ListIcon, MapIcon, SportIcon } from "@/components/shared/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllVenues } from "@/hooks/useAllVenues";
import { useSquads } from "@/hooks/useMatchmaking";
import { cn, formatShortDate } from "@/lib/utils";
import { useUiStore } from "@/store/useUiStore";
import { SquadRequestCard } from "./SquadRequestCard";
import type { PickupMarker } from "./PickupMatchMapView";

const PickupMatchMapView = dynamic(() => import("./PickupMatchMapView"), {
  ssr: false,
  loading: () => <Skeleton className="h-[460px]" />,
});

export function PickupMatchesTab({ sportFilter }: { sportFilter: string | null }) {
  const [view, setView] = useState<"map" | "list">("map");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const location = useUiStore((state) => state.location);
  const squads = useSquads();
  const venues = useAllVenues();

  const openSquads = useMemo(
    () =>
      (squads.data?.squads ?? []).filter(
        (s) => s.slotsFilled < s.slotsTotal && (!sportFilter || s.sportType === sportFilter)
      ),
    [squads.data, sportFilter]
  );

  const markers = useMemo<PickupMarker[]>(() => {
    const venueById = new Map((venues.data?.venues ?? []).map((v) => [v.id, v]));
    return openSquads.flatMap((squad) => {
      const venue = squad.venueId ? venueById.get(squad.venueId) : undefined;
      if (!venue) return [];
      return [
        {
          id: squad.id,
          lat: venue.lat,
          lng: venue.lng,
          sportType: squad.sportType,
          venueName: venue.name,
          captainName: squad.captainName,
          slotDate: squad.slotDate,
          slotStart: squad.slotStart,
          slotsFilled: squad.slotsFilled,
          slotsTotal: squad.slotsTotal,
        },
      ];
    });
  }, [openSquads, venues.data]);

  const isLoading = squads.isLoading || venues.isLoading;
  const isError = squads.isError || venues.isError;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-text-primary/60">
          <span className="font-bold text-text-primary">{openSquads.length}</span> open community games
        </p>
        <div className="flex rounded-2xl border border-border bg-card p-1" role="group" aria-label="View">
          {(["map", "list"] as const).map((mode) => {
            const Icon = mode === "map" ? MapIcon : ListIcon;
            return (
              <button
                key={mode}
                onClick={() => setView(mode)}
                aria-pressed={view === mode}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
                  view === mode ? "bg-emerald text-background" : "text-text-primary/60"
                )}
              >
                <Icon className="h-3.5 w-3.5" /> {mode}
              </button>
            );
          })}
        </div>
      </div>

      {isLoading && <Skeleton className="h-[460px]" />}
      {isError && <ErrorState message="Could not load pickup matches." onRetry={() => squads.refetch()} />}

      {!isLoading && !isError && openSquads.length === 0 && (
        <EmptyState icon={<MapIcon className="h-6 w-6" />} title="No open pickup games" hint="Post a squad request to start one." />
      )}

      {!isLoading && !isError && openSquads.length > 0 && view === "map" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <PickupMatchMapView markers={markers} center={[location.lat, location.lng]} highlightedId={highlightedId} />
          <ul className="scrollbar-none max-h-[460px] space-y-2 overflow-y-auto">
            {openSquads.map((squad) => (
              <li key={squad.id}>
                <button
                  onMouseEnter={() => setHighlightedId(squad.id)}
                  onFocus={() => setHighlightedId(squad.id)}
                  onClick={() => setHighlightedId(squad.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors",
                    highlightedId === squad.id ? "border-emerald bg-emerald/10" : "border-border bg-card hover:border-emerald/50"
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald/15 text-emerald">
                    <SportIcon sport={squad.sportType} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{squad.venueName}</span>
                    <span className="block text-xs text-text-primary/50">
                      {formatShortDate(squad.slotDate)} · {squad.slotStart.slice(0, 5)} · ₹{squad.perHeadCost}/head
                    </span>
                  </span>
                  <span className="text-xs font-bold text-emerald">{squad.slotsTotal - squad.slotsFilled} open</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isLoading && !isError && openSquads.length > 0 && view === "list" && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {openSquads.map((squad) => (
            <SquadRequestCard key={squad.id} squad={squad} />
          ))}
        </div>
      )}
    </div>
  );
}
