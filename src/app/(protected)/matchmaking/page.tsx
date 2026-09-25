"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { AthleteResumeDrawer } from "@/components/matchmaking/AthleteResumeDrawer";
import { PickupMatchesTab } from "@/components/matchmaking/PickupMatchesTab";
import { PostAvailabilityModal } from "@/components/matchmaking/PostAvailabilityModal";
import { SoloPlayerCard } from "@/components/matchmaking/SoloPlayerCard";
import { SquadRequestCard } from "@/components/matchmaking/SquadRequestCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { CloseIcon, PlusIcon, SportIcon, UserIcon, UsersIcon } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMatchmakingSocket, useSolo, useSquads } from "@/hooks/useMatchmaking";
import { useSocketStatus } from "@/hooks/useSocketStatus";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/useUiStore";
import { SPORTS, type SoloAvailability } from "@/types";

type SubTab = "squads" | "solo" | "pickup";
const SUB_TABS: SubTab[] = ["squads", "solo", "pickup"];

export default function MatchmakingPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl p-4"><Skeleton className="h-96" /></div>}>
      <MatchmakingPageInner />
    </Suspense>
  );
}

function LiveIndicator() {
  const connected = useSocketStatus();
  return (
    <span
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
        connected ? "border-emerald/40 text-emerald" : "border-border text-text-primary/50"
      )}
    >
      <span className="relative flex h-2 w-2">
        {connected && <span className="absolute inline-flex h-full w-full rounded-full bg-emerald animate-live-ping" />}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", connected ? "bg-emerald" : "bg-text-primary/30")} />
      </span>
      {connected ? "Live updates on" : "Reconnecting…"}
    </span>
  );
}

function GridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  );
}

function MatchmakingPageInner() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as SubTab | null;
  const sportParam = searchParams.get("sport");

  const sportFilter = useUiStore((state) => state.matchmakingSportFilter);
  const setSportFilter = useUiStore((state) => state.setMatchmakingSportFilter);

  const [activeTab, setActiveTab] = useState<SubTab>(tabParam && SUB_TABS.includes(tabParam) ? tabParam : "squads");
  const [selectedAthlete, setSelectedAthlete] = useState<SoloAvailability | null>(null);
  const [postOpen, setPostOpen] = useState(false);

  useMatchmakingSocket();

  // "Find Missing Players" deep-links here with ?sport=, pre-setting the filter.
  useEffect(() => {
    if (sportParam) setSportFilter(sportParam);
  }, [sportParam, setSportFilter]);

  const squads = useSquads();
  const solo = useSolo();

  const filteredSquads = useMemo(
    () => (squads.data?.squads ?? []).filter((s) => !sportFilter || s.sportType === sportFilter),
    [squads.data, sportFilter]
  );
  const filteredSolo = useMemo(
    () => (solo.data?.solo ?? []).filter((s) => !sportFilter || s.sportType === sportFilter),
    [solo.data, sportFilter]
  );

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
      <PageHeader
        eyebrow="Two-way matchmaking"
        title="Fill your squad in minutes"
        description="Captains post open slots, solo players post when they're free — both sides update live."
        actions={
          <>
            <LiveIndicator />
            <Button onClick={() => setPostOpen(true)}>
              <PlusIcon /> Post Availability
            </Button>
          </>
        }
      />

      <div className="scrollbar-none -mx-4 flex items-center gap-2 overflow-x-auto px-4">
        {sportFilter && (
          <button
            onClick={() => setSportFilter(null)}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald px-3 py-2 text-xs font-bold text-background"
          >
            {sportFilter} <CloseIcon className="h-3 w-3" />
          </button>
        )}
        {SPORTS.filter((s) => s !== sportFilter).map((sport) => (
          <button
            key={sport}
            onClick={() => setSportFilter(sport)}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold text-text-primary/70 transition-colors hover:border-emerald/50"
          >
            <SportIcon sport={sport} className="h-3.5 w-3.5" /> {sport}
          </button>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SubTab)}>
        <div className="scrollbar-none -mx-4 overflow-x-auto px-4">
          <TabsList>
            <TabsTrigger value="squads">
              <UsersIcon className="h-4 w-4" /> Squad Requests
              <Count value={filteredSquads.length} />
            </TabsTrigger>
            <TabsTrigger value="solo">
              <UserIcon className="h-4 w-4" /> Solo Players
              <Count value={filteredSolo.length} />
            </TabsTrigger>
            <TabsTrigger value="pickup">Open Pickup Matches</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="squads">
          {squads.isLoading && <GridSkeleton />}
          {squads.isError && <ErrorState message="Could not load squad requests." onRetry={() => squads.refetch()} />}
          {!squads.isLoading && !squads.isError && filteredSquads.length === 0 && (
            <EmptyState icon={<UsersIcon className="h-6 w-6" />} title="No open squad requests" hint="Try another sport or check back soon." />
          )}
          {filteredSquads.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredSquads.map((squad) => (
                <SquadRequestCard key={squad.id} squad={squad} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="solo">
          {solo.isLoading && <GridSkeleton />}
          {solo.isError && <ErrorState message="Could not load solo players." onRetry={() => solo.refetch()} />}
          {!solo.isLoading && !solo.isError && filteredSolo.length === 0 && (
            <EmptyState
              icon={<UserIcon className="h-6 w-6" />}
              title="Nobody's posted for this sport yet"
              action={
                <Button size="sm" variant="outline" onClick={() => setPostOpen(true)}>
                  Post your availability
                </Button>
              }
            />
          )}
          {filteredSolo.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredSolo.map((athlete) => (
                <SoloPlayerCard key={athlete.id} athlete={athlete} onInvite={setSelectedAthlete} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pickup">
          <PickupMatchesTab sportFilter={sportFilter} />
        </TabsContent>
      </Tabs>

      <AthleteResumeDrawer athlete={selectedAthlete} onClose={() => setSelectedAthlete(null)} />
      <PostAvailabilityModal
        open={postOpen}
        onClose={() => setPostOpen(false)}
        onPosted={() => {
          setPostOpen(false);
          setSportFilter(null);
          setActiveTab("solo");
        }}
      />
    </main>
  );
}

function Count({ value }: { value: number }) {
  return (
    <span className="rounded-full bg-text-primary/10 px-1.5 text-[11px] tabular-nums">
      {value}
    </span>
  );
}
