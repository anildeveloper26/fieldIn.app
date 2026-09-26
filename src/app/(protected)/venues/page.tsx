"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { LocationPinIcon } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingDrawer } from "@/components/venues/BookingDrawer";
import { VenueCard } from "@/components/venues/VenueCard";
import { VenueFilters } from "@/components/venues/VenueFilters";
import { EMPTY_VENUE_FILTERS, useVenues, type VenueFilterState } from "@/hooks/useVenues";
import { useUiStore } from "@/store/useUiStore";
import type { Venue } from "@/types";

export default function VenuesPage() {
  const location = useUiStore((state) => state.location);
  const [filters, setFilters] = useState<VenueFilterState>(EMPTY_VENUE_FILTERS);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const { data, isLoading, isError, refetch } = useVenues(filters, location.lat, location.lng);
  const venues = data?.venues ?? [];

  const stats = useMemo(() => {
    const nearby = venues.filter((v) => v.distanceKm !== null && v.distanceKm < 5).length;
    const live = venues.filter((v) => v.hasLiveCam).length;
    const cheapest = venues.length ? Math.min(...venues.map((v) => v.hourlyRate)) : null;
    return [
      { label: "Venues found", value: venues.length },
      { label: "Within 5 km", value: nearby },
      { label: "Live cams", value: live },
      { label: "From", value: cheapest !== null ? `₹${cheapest}` : "–" },
    ];
  }, [venues]);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
      <PageHeader
        eyebrow="Book a venue"
        title={`Play near ${location.label.split(",")[0]}`}
        description="Live crowd levels, weather and split-cost booking for turfs and courts around you."
      />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card px-4 py-3">
            <p className="text-xl font-extrabold tabular-nums">{isLoading ? "–" : s.value}</p>
            <p className="text-[11px] text-text-primary/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <VenueFilters filters={filters} onChange={setFilters} />

        <section aria-live="polite" className="min-w-0">
          {isLoading && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-80" />
              ))}
            </div>
          )}

          {isError && <ErrorState message="Could not load venues." onRetry={() => refetch()} />}

          {!isLoading && !isError && venues.length === 0 && (
            <EmptyState
              icon={<LocationPinIcon className="h-6 w-6" />}
              title="No venues match these filters"
              hint="Try a wider distance or a bigger budget."
              action={
                <Button variant="outline" size="sm" onClick={() => setFilters(EMPTY_VENUE_FILTERS)}>
                  Reset filters
                </Button>
              }
            />
          )}

          {!isLoading && !isError && venues.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} onBookSlot={setSelectedVenue} />
              ))}
            </div>
          )}
        </section>
      </div>

      <BookingDrawer venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
    </main>
  );
}
