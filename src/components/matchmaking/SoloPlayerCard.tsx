import { Avatar } from "@/components/shared/Avatar";
import { CalendarIcon, ClockIcon, SportIcon } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatShortDate } from "@/lib/utils";
import type { SoloAvailability } from "@/types";

interface SoloPlayerCardProps {
  athlete: SoloAvailability;
  onInvite: (athlete: SoloAvailability) => void;
}

export function SoloPlayerCard({ athlete, onInvite }: SoloPlayerCardProps) {
  const punctual = athlete.punctualityRate >= 90;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-emerald/50">
      <div className="flex items-start gap-3">
        <Avatar name={athlete.userName} className="h-12 w-12 text-sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold">{athlete.userName}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-text-primary/60">
            <SportIcon sport={athlete.sportType} className="h-3.5 w-3.5 text-emerald" />
            Looking for {athlete.sportType}
          </p>
        </div>
        <Badge variant={punctual ? "emerald" : "outline"} title="Punctuality">
          <ClockIcon className="h-3 w-3" />
          {athlete.punctualityRate.toFixed(0)}%
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl bg-background px-3 py-2">
          <p className="text-text-primary/50">Available</p>
          <p className="mt-0.5 flex items-center gap-1 font-semibold">
            <CalendarIcon className="h-3 w-3" />
            {formatShortDate(athlete.availableDate)} · {athlete.availableTime.slice(0, 5)}
          </p>
        </div>
        <div className="rounded-xl bg-background px-3 py-2">
          <p className="text-text-primary/50">Budget cap</p>
          <p className="mt-0.5 font-semibold">{athlete.maxBudget !== null ? `₹${athlete.maxBudget} / game` : "Flexible"}</p>
        </div>
      </div>

      {athlete.notes && <p className="line-clamp-2 text-xs italic text-text-primary/60">“{athlete.notes}”</p>}

      <Button variant="outline" className="mt-auto w-full" onClick={() => onInvite(athlete)}>
        Invite to Squad
      </Button>
    </article>
  );
}
