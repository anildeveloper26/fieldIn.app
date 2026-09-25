"use client";

import { SlidersIcon, SportIcon } from "@/components/shared/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_VENUE_FILTERS, type VenueFilterState } from "@/hooks/useVenues";
import { cn } from "@/lib/utils";
import { SPORTS } from "@/types";

const DISTANCES = [
  { value: "", label: "Any" },
  { value: "2", label: "2 km" },
  { value: "5", label: "5 km" },
  { value: "10", label: "10 km" },
];

const BUDGETS = [
  { label: "Under ₹600", min: "", max: "600" },
  { label: "₹600–1000", min: "600", max: "1000" },
  { label: "₹1000+", min: "1000", max: "" },
];

interface VenueFiltersProps {
  filters: VenueFilterState;
  onChange: (filters: VenueFilterState) => void;
}

export function VenueFilters({ filters, onChange }: VenueFiltersProps) {
  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <aside className="space-y-6 rounded-2xl border border-border bg-card p-4 lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-bold">
          <SlidersIcon className="h-4 w-4 text-emerald" /> Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-emerald px-1.5 text-[11px] text-background">{activeCount}</span>
          )}
        </p>
        {activeCount > 0 && (
          <button onClick={() => onChange(EMPTY_VENUE_FILTERS)} className="text-xs font-semibold text-emerald">
            Reset
          </button>
        )}
      </div>

      <div>
        <Label>Sport</Label>
        <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 lg:grid lg:grid-cols-2 lg:overflow-visible">
          <SportChip active={!filters.sport} onClick={() => onChange({ ...filters, sport: "" })} label="All" />
          {SPORTS.map((sport) => (
            <SportChip
              key={sport}
              sport={sport}
              label={sport}
              active={filters.sport === sport}
              onClick={() => onChange({ ...filters, sport: filters.sport === sport ? "" : sport })}
            />
          ))}
        </div>
      </div>

      <div>
        <Label>Distance (PostGIS radius)</Label>
        <div className="grid grid-cols-4 gap-1 rounded-2xl border border-border bg-background p-1">
          {DISTANCES.map((d) => (
            <button
              key={d.label}
              onClick={() => onChange({ ...filters, maxDistance: d.value })}
              className={cn(
                "rounded-xl py-1.5 text-xs font-semibold transition-colors",
                filters.maxDistance === d.value ? "bg-emerald text-background" : "text-text-primary/60 hover:text-text-primary"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Budget (₹ / hour)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Min"
            aria-label="Minimum hourly rate"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
          />
          <span className="text-text-primary/40">–</span>
          <Input
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Max"
            aria-label="Maximum hourly rate"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {BUDGETS.map((b) => {
            const active = filters.minPrice === b.min && filters.maxPrice === b.max;
            return (
              <button
                key={b.label}
                onClick={() =>
                  onChange({ ...filters, minPrice: active ? "" : b.min, maxPrice: active ? "" : b.max })
                }
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors",
                  active ? "border-emerald bg-emerald/10 text-emerald" : "border-border text-text-primary/60"
                )}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function SportChip({
  sport,
  label,
  active,
  onClick,
}: {
  sport?: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-semibold transition-colors",
        active ? "border-emerald bg-emerald/10 text-emerald" : "border-border text-text-primary/70 hover:border-emerald/50"
      )}
    >
      {sport ? <SportIcon sport={sport} className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full border-2 border-current" />}
      {label}
    </button>
  );
}
