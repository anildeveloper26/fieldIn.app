import { CloudIcon, LocationPinIcon, RainIcon, SportIcon, SunIcon, UsersIcon } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SegmentGauge } from "@/components/ui/gauge";
import type { Venue } from "@/types";

const WEATHER: Record<string, { icon: typeof SunIcon; label: string }> = {
  Clear: { icon: SunIcon, label: "Clear skies" },
  Cloudy: { icon: CloudIcon, label: "Cloudy" },
  Rainy: { icon: RainIcon, label: "Rain" },
};

export function crowdLabel(occupancy: number): string {
  if (occupancy >= 80) return "Packed";
  if (occupancy >= 50) return "Busy";
  return "Quiet";
}

interface VenueCardProps {
  venue: Venue;
  onBookSlot: (venue: Venue) => void;
}

export function VenueCard({ venue, onBookSlot }: VenueCardProps) {
  const weather = WEATHER[venue.weatherCondition] ?? WEATHER.Clear;
  const WeatherIcon = weather.icon;
  const nearby = venue.distanceKm !== null && venue.distanceKm < 5;

  return (
    <Card className="group flex flex-col overflow-hidden transition-colors hover:border-emerald/50">
      <div className="relative h-28 overflow-hidden border-b border-border bg-gradient-to-br from-emerald/25 via-background to-background">
        <SportIcon
          sport={venue.sportType}
          className="absolute -bottom-6 -right-4 h-32 w-32 text-emerald/15 transition-transform duration-500 group-hover:rotate-12"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge variant="emerald" className="bg-background/80 backdrop-blur">
            <SportIcon sport={venue.sportType} className="h-3 w-3" />
            {venue.sportType}
          </Badge>
        </div>
        {venue.hasLiveCam && (
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-text-primary backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald animate-live-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            LIVE CAM
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-text-primary/80">
          <WeatherIcon className="h-4 w-4 text-amber" />
          {weather.label}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold leading-snug">{venue.name}</h3>
            {venue.distanceKm !== null && (
              <Badge variant={nearby ? "emerald" : "outline"} className="shrink-0">
                <LocationPinIcon className="h-3 w-3" />
                {nearby ? "<5 km" : `${venue.distanceKm.toFixed(1)} km`}
              </Badge>
            )}
          </div>
          <p className="mt-1 line-clamp-1 text-xs text-text-primary/50">{venue.address}</p>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-text-primary/60">
              <UsersIcon className="h-3.5 w-3.5" /> Crowd now
            </span>
            <span className="font-semibold">
              {venue.crowdOccupancy}% · {crowdLabel(venue.crowdOccupancy)}
            </span>
          </div>
          <SegmentGauge value={venue.crowdOccupancy} max={100} tone="capacity" />
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <p>
            <span className="text-xl font-extrabold">₹{venue.hourlyRate}</span>
            <span className="text-xs text-text-primary/50"> / hour</span>
          </p>
          <Button size="sm" onClick={() => onBookSlot(venue)}>
            Book Slot
          </Button>
        </div>
      </div>
    </Card>
  );
}
