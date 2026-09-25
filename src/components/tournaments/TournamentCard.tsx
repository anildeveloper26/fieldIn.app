"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LocationPinIcon, SportIcon, TrophyIcon, UsersIcon } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SegmentGauge } from "@/components/ui/gauge";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/useUiStore";
import type { Tournament } from "@/types";
import { RegisterTeamModal } from "./RegisterTeamModal";

interface TournamentCardProps {
  tournament: Tournament;
  featured?: boolean;
}

/** Ticket-style tournament card: date stub on the left, details on the right. */
export function TournamentCard({ tournament, featured = false }: TournamentCardProps) {
  const router = useRouter();
  const setMatchmakingSportFilter = useUiStore((state) => state.setMatchmakingSportFilter);
  const [registerOpen, setRegisterOpen] = useState(false);

  const isFull = tournament.registeredTeams >= tournament.maxTeams;
  const spotsLeft = tournament.maxTeams - tournament.registeredTeams;
  const start = new Date(tournament.startDate);

  function handleFindMissingPlayers() {
    setMatchmakingSportFilter(tournament.sportType);
    router.push(`/matchmaking?tab=solo&sport=${encodeURIComponent(tournament.sportType)}`);
  }

  return (
    <article
      className={cn(
        "flex overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-emerald/50",
        featured ? "flex-col sm:flex-row" : "flex-row"
      )}
    >
      <div
        className={cn(
          "relative flex shrink-0 flex-col items-center justify-center border-dashed border-border bg-emerald/10 text-emerald",
          featured ? "gap-1 border-b p-6 sm:w-48 sm:border-b-0 sm:border-r" : "w-20 border-r p-3"
        )}
      >
        <span className="text-[11px] font-bold uppercase tracking-widest">
          {start.toLocaleDateString("en-IN", { month: "short" })}
        </span>
        <span className={cn("font-extrabold leading-none", featured ? "text-6xl" : "text-3xl")}>{start.getDate()}</span>
        <span className="text-[11px] font-semibold text-text-primary/60">
          {start.toLocaleDateString("en-IN", { weekday: "short" })}
        </span>
        {featured && <SportIcon sport={tournament.sportType} className="mt-3 h-10 w-10 opacity-60" />}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="emerald">
            <SportIcon sport={tournament.sportType} className="h-3 w-3" />
            {tournament.sportType}
          </Badge>
          {tournament.prizePool > 0 && (
            <Badge variant="amber">
              <TrophyIcon className="h-3 w-3" />₹{tournament.prizePool.toLocaleString("en-IN")} prize
            </Badge>
          )}
          {isFull ? <Badge variant="danger">Full</Badge> : spotsLeft <= 2 && <Badge variant="outline">Almost full</Badge>}
        </div>

        <div>
          <h3 className={cn("font-extrabold leading-tight", featured ? "text-2xl" : "text-base")}>{tournament.title}</h3>
          {tournament.venueName && (
            <p className="mt-1 flex items-center gap-1 text-xs text-text-primary/50">
              <LocationPinIcon className="h-3 w-3" />
              {tournament.venueName}
            </p>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="flex items-center gap-1.5 text-text-primary/60">
              <UsersIcon className="h-3.5 w-3.5" /> Teams registered
            </span>
            <span className="font-bold tabular-nums">
              {tournament.registeredTeams}/{tournament.maxTeams}
            </span>
          </div>
          <SegmentGauge value={tournament.registeredTeams} max={tournament.maxTeams} segments={tournament.maxTeams} />
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
          <p className="text-sm sm:mr-auto">
            <span className="text-text-primary/50">Entry </span>
            <span className="font-extrabold">₹{tournament.entryFee}</span>
            <span className="text-text-primary/50"> / team</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" onClick={() => setRegisterOpen(true)} disabled={isFull}>
              {isFull ? "Full" : "Register Full Team"}
            </Button>
            <Button size="sm" variant="outline" onClick={handleFindMissingPlayers}>
              Find Missing Players
            </Button>
          </div>
        </div>
      </div>

      <RegisterTeamModal tournament={tournament} open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </article>
  );
}
