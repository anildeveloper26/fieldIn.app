"use client";

import { useMemo, useState } from "react";
import { MinusIcon, PlusIcon, SportIcon, UsersIcon } from "@/components/shared/icons";
import { Spinner } from "@/components/shared/Spinner";
import { useToast } from "@/components/shared/ToastProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SegmentGauge } from "@/components/ui/gauge";
import { Label } from "@/components/ui/label";
import { Sheet, SheetBody, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCreateBooking } from "@/hooks/useBookings";
import { useVenueDetail } from "@/hooks/useVenues";
import { ApiClientError } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import type { Venue } from "@/types";
import { crowdLabel } from "./VenueCard";
import { VenueGallery } from "./VenueGallery";

const DAY_PARTS = [
  { label: "Morning", hours: [6, 7, 8, 9, 10, 11] },
  { label: "Afternoon", hours: [12, 13, 14, 15, 16] },
  { label: "Evening", hours: [17, 18, 19, 20, 21] },
];

function toIsoDate(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function nextDays(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      iso: toIsoDate(date),
      weekday: i === 0 ? "Today" : date.toLocaleDateString("en-IN", { weekday: "short" }),
      day: date.getDate(),
    };
  });
}

function formatHour(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

function isPast(dateIso: string, hour: number): boolean {
  return dateIso === toIsoDate(new Date()) && hour <= new Date().getHours();
}

interface BookingDrawerProps {
  venue: Venue | null;
  onClose: () => void;
}

export function BookingDrawer({ venue, onClose }: BookingDrawerProps) {
  return (
    <Sheet open={Boolean(venue)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>{venue && <BookingForm key={venue.id} venue={venue} onDone={onClose} />}</SheetContent>
    </Sheet>
  );
}

function BookingForm({ venue, onDone }: { venue: Venue; onDone: () => void }) {
  const { showToast } = useToast();
  const createBooking = useCreateBooking();
  const detail = useVenueDetail(venue.id);
  const days = useMemo(() => nextDays(7), []);

  const [slotDate, setSlotDate] = useState(days[0].iso);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [playerCount, setPlayerCount] = useState(Math.min(4, venue.capacity));

  const live = detail.data?.venue ?? venue;
  const perHead = Math.round((venue.hourlyRate / playerCount) * 100) / 100;

  async function handleConfirm() {
    if (selectedHour === null) return;
    try {
      await createBooking.mutateAsync({
        venueId: venue.id,
        slotDate,
        slotStart: formatHour(selectedHour),
        slotEnd: formatHour(selectedHour + 1),
        playerCount,
      });
      showToast(`Payment confirmed · ${venue.name} at ${formatHour(selectedHour)}. ₹${perHead} each.`, "success");
      onDone();
    } catch (err) {
      showToast(
        err instanceof ApiClientError && err.status === 409 ? err.message : "Could not complete the booking. Try again.",
        "error"
      );
    }
  }

  return (
    <>
      <SheetHeader>
        <Badge variant="emerald" className="mb-3">
          <SportIcon sport={venue.sportType} className="h-3 w-3" />
          {venue.sportType}
        </Badge>
        <SheetTitle>{venue.name}</SheetTitle>
        <SheetDescription>{venue.address}</SheetDescription>
        <div className="mt-4 rounded-2xl bg-background p-3">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-text-primary/60">Live occupancy</span>
            <span className="font-semibold">
              {live.crowdOccupancy}% · {crowdLabel(live.crowdOccupancy)}
            </span>
          </div>
          <SegmentGauge value={live.crowdOccupancy} max={100} tone="capacity" segments={20} />
        </div>
      </SheetHeader>

      <SheetBody>
        <section>
          <Label>Photos</Label>
          <VenueGallery venueId={venue.id} images={detail.data?.venue.gallery ?? []} />
        </section>

        <section>
          <Label>Pick a day</Label>
          <div className="scrollbar-none -mx-6 flex gap-2 overflow-x-auto px-6">
            {days.map((d) => (
              <button
                key={d.iso}
                onClick={() => {
                  setSlotDate(d.iso);
                  setSelectedHour(null);
                }}
                className={cn(
                  "flex w-14 shrink-0 flex-col items-center rounded-2xl border py-2 transition-colors",
                  slotDate === d.iso ? "border-emerald bg-emerald text-background" : "border-border hover:border-emerald/50"
                )}
              >
                <span className="text-[10px] font-semibold uppercase opacity-70">{d.weekday}</span>
                <span className="text-lg font-extrabold">{d.day}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <Label className="mb-0">Pick a 1-hour slot</Label>
          {DAY_PARTS.map((part) => (
            <div key={part.label}>
              <p className="mb-2 text-xs font-semibold text-text-primary/60">{part.label}</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {part.hours.map((hour) => {
                  const disabled = isPast(slotDate, hour);
                  return (
                    <button
                      key={hour}
                      disabled={disabled}
                      onClick={() => setSelectedHour(hour)}
                      className={cn(
                        "rounded-xl border py-2 text-xs font-semibold tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-30",
                        selectedHour === hour
                          ? "border-emerald bg-emerald/15 text-emerald"
                          : "border-border text-text-primary/80 hover:border-emerald/50"
                      )}
                    >
                      {formatHour(hour)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section>
          <Label>Players splitting the cost</Label>
          <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Fewer players"
              onClick={() => setPlayerCount((n) => Math.max(1, n - 1))}
            >
              <MinusIcon />
            </Button>
            <span className="flex items-center gap-2 text-lg font-extrabold tabular-nums">
              <UsersIcon className="h-4 w-4 text-emerald" /> {playerCount}
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="More players"
              onClick={() => setPlayerCount((n) => Math.min(venue.capacity, n + 1))}
            >
              <PlusIcon />
            </Button>
          </div>
          <p className="mt-1.5 text-[11px] text-text-primary/50">Max {venue.capacity} players at this venue</p>
        </section>
      </SheetBody>

      <SheetFooter className="space-y-4">
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-text-primary/60">
            <span>Court fee · 1 hr</span>
            <span className="tabular-nums">₹{venue.hourlyRate}</span>
          </div>
          <div className="flex justify-between text-text-primary/60">
            <span>Split between</span>
            <span className="tabular-nums">× {playerCount}</span>
          </div>
          <div className="flex items-baseline justify-between border-t border-dashed border-border pt-2">
            <span className="font-semibold">You pay</span>
            <span className="text-2xl font-extrabold text-emerald tabular-nums">₹{perHead}</span>
          </div>
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={handleConfirm}
          disabled={selectedHour === null || createBooking.isPending}
        >
          {createBooking.isPending && <Spinner />}
          {selectedHour === null ? "Select a time slot" : `Confirm Booking · ${formatHour(selectedHour)}`}
        </Button>
        <p className="text-center text-[11px] text-text-primary/40">Your slot is held for 10 minutes while you pay.</p>
      </SheetFooter>
    </>
  );
}
