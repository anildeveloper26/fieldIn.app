"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { SportIcon, TrophyIcon } from "@/components/shared/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { useTournaments } from "@/hooks/useTournaments";
import { cn } from "@/lib/utils";

export default function TournamentsPage() {
  const { data, isLoading, isError, refetch } = useTournaments();
  const [sport, setSport] = useState<string>("");

  const tournaments = useMemo(() => {
    const list = [...(data?.tournaments ?? [])].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    return sport ? list.filter((t) => t.sportType === sport) : list;
  }, [data, sport]);

  const sports = useMemo(() => Array.from(new Set(data?.tournaments.map((t) => t.sportType) ?? [])), [data]);
  // Spotlight the soonest tournament that still has room.
  const featured = tournaments.find((t) => t.registeredTeams < t.maxTeams) ?? null;
  const rest = tournaments.filter((t) => t.id !== featured?.id);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
      <PageHeader
        eyebrow="Community tournaments"
        title="Compete with your squad"
        description="Register a full team, or pull in solo players to fill the gaps."
      />

      {sports.length > 0 && (
        <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
          {["", ...sports].map((s) => (
            <button
              key={s || "all"}
              onClick={() => setSport(s)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                sport === s ? "border-emerald bg-emerald text-background" : "border-border text-text-primary/70"
              )}
            >
              {s && <SportIcon sport={s} className="h-3.5 w-3.5" />}
              {s || "All sports"}
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-64" />
          <div className="grid gap-4 lg:grid-cols-2">
            <Skeleton className="h-52" />
            <Skeleton className="h-52" />
          </div>
        </div>
      )}

      {isError && <ErrorState message="Could not load tournaments." onRetry={() => refetch()} />}

      {!isLoading && !isError && tournaments.length === 0 && (
        <EmptyState icon={<TrophyIcon className="h-6 w-6" />} title="No tournaments open right now" hint="Check back soon." />
      )}

      {!isLoading && !isError && tournaments.length > 0 && (
        <>
          {featured && (
            <section>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-text-primary/50">Up next</p>
              <TournamentCard tournament={featured} featured />
            </section>
          )}
          {rest.length > 0 && (
            <section>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-text-primary/50">All events</p>
              <div className="grid gap-4 lg:grid-cols-2">
                {rest.map((t) => (
                  <TournamentCard key={t.id} tournament={t} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
