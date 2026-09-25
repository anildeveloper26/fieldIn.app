"use client";

import { useState } from "react";
import { Avatar } from "@/components/shared/Avatar";
import { CalendarIcon, CheckIcon, ClockIcon, LocationPinIcon, SportIcon, StarIcon } from "@/components/shared/icons";
import { Spinner } from "@/components/shared/Spinner";
import { useToast } from "@/components/shared/ToastProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useJoinSquad } from "@/hooks/useMatchmaking";
import { ApiClientError } from "@/lib/apiClient";
import { cn, formatShortDate } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import type { SquadRequest } from "@/types";

function trustVariant(score: number) {
  return score >= 4.5 ? "emerald" : score >= 4 ? "outline" : "danger";
}

export function SquadRequestCard({ squad }: { squad: SquadRequest }) {
  const { showToast } = useToast();
  const userId = useAuthStore((state) => state.user?.id);
  const joinSquad = useJoinSquad();
  const [requestSent, setRequestSent] = useState(false);

  const isFull = squad.slotsFilled >= squad.slotsTotal;
  const isOwnSquad = userId === squad.captainId;
  const openSlots = squad.slotsTotal - squad.slotsFilled;

  async function handleRequestToJoin() {
    try {
      await joinSquad.mutateAsync(squad.id);
      setRequestSent(true);
      showToast(`Request sent to ${squad.captainName.split(" ")[0]}'s squad`, "success");
    } catch (err) {
      showToast(err instanceof ApiClientError ? err.message : "Could not send join request.", "error");
    }
  }

  const label = isOwnSquad ? "Your squad" : requestSent ? "Request Sent" : isFull ? "Squad full" : "Request to Join";

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card transition-colors hover:border-emerald/50">
      <div className="flex items-center gap-3 p-4">
        <Avatar name={squad.captainName} className="h-11 w-11 text-sm" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-primary/40">Captain</p>
          <p className="truncate font-bold">{squad.captainName}</p>
        </div>
        <Badge variant={trustVariant(squad.captainTrustScore)} title="Captain Trust Score">
          <StarIcon className="h-3 w-3" />
          {squad.captainTrustScore.toFixed(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-y border-border px-4 py-3 text-xs text-text-primary/70">
        <span className="flex items-center gap-1.5 font-semibold text-text-primary">
          <SportIcon sport={squad.sportType} className="h-3.5 w-3.5 text-emerald" /> {squad.sportType}
        </span>
        <span className="flex min-w-0 items-center gap-1.5">
          <LocationPinIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{squad.venueName ?? "TBD"}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarIcon className="h-3.5 w-3.5" /> {formatShortDate(squad.slotDate)}
        </span>
        <span className="flex items-center gap-1.5">
          <ClockIcon className="h-3.5 w-3.5" /> {squad.slotStart.slice(0, 5)}
        </span>
      </div>

      <div className="flex items-end justify-between gap-3 p-4">
        <div>
          <p className="text-2xl font-extrabold text-emerald tabular-nums">₹{squad.perHeadCost}</p>
          <p className="text-[11px] text-text-primary/50">per head · ₹{squad.totalCost} total</p>
        </div>
        <div className="text-right">
          <div className="flex justify-end gap-1" aria-label={`${squad.slotsFilled} of ${squad.slotsTotal} slots filled`}>
            {Array.from({ length: squad.slotsTotal }, (_, i) => (
              <span
                key={i}
                className={cn("h-3 w-3 rounded-full", i < squad.slotsFilled ? "bg-emerald" : "border border-border bg-background")}
              />
            ))}
          </div>
          <p className="mt-1 text-[11px] text-text-primary/50">
            {squad.slotsFilled}/{squad.slotsTotal} filled{!isFull && ` · ${openSlots} open`}
          </p>
        </div>
      </div>

      <div className="mt-auto px-4 pb-4">
        <Button
          className="w-full"
          variant={requestSent ? "outline" : "default"}
          onClick={handleRequestToJoin}
          disabled={requestSent || isFull || isOwnSquad || joinSquad.isPending}
        >
          {joinSquad.isPending ? <Spinner /> : requestSent && <CheckIcon className="h-4 w-4" />}
          {label}
        </Button>
      </div>
    </article>
  );
}
