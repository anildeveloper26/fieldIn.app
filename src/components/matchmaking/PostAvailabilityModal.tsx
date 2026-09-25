"use client";

import { useState } from "react";
import { SportIcon } from "@/components/shared/icons";
import { Spinner } from "@/components/shared/Spinner";
import { useToast } from "@/components/shared/ToastProvider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostMatchmaking } from "@/hooks/useMatchmaking";
import { ApiClientError } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import { SPORTS } from "@/types";

interface PostAvailabilityModalProps {
  open: boolean;
  onClose: () => void;
  onPosted: () => void;
}

function todayIso(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

export function PostAvailabilityModal({ open, onClose, onPosted }: PostAvailabilityModalProps) {
  const { showToast } = useToast();
  const postMatchmaking = usePostMatchmaking();

  const [sportType, setSportType] = useState<string>(SPORTS[0]);
  const [availableDate, setAvailableDate] = useState(todayIso());
  const [availableTime, setAvailableTime] = useState("18:00");
  const [maxBudget, setMaxBudget] = useState("150");
  const [notes, setNotes] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await postMatchmaking.mutateAsync({
        kind: "solo",
        sportType,
        availableDate,
        availableTime,
        maxBudget: maxBudget ? Number(maxBudget) : undefined,
        notes: notes.trim() || undefined,
      });
      showToast("You're live in the Solo Players hub", "success");
      setNotes("");
      onPosted();
    } catch (err) {
      showToast(err instanceof ApiClientError ? err.message : "Could not post your availability.", "error");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post your availability</DialogTitle>
          <DialogDescription>Captains nearby get it instantly over Socket.IO.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label>Sport</Label>
            <div className="grid grid-cols-5 gap-2">
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => setSportType(sport)}
                  aria-pressed={sportType === sport}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-2xl border py-3 text-[10px] font-semibold transition-colors",
                    sportType === sport ? "border-emerald bg-emerald/10 text-emerald" : "border-border text-text-primary/60"
                  )}
                >
                  <SportIcon sport={sport} className="h-5 w-5" />
                  {sport}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="avail-date">Date</Label>
              <Input id="avail-date" type="date" required min={todayIso()} value={availableDate} onChange={(e) => setAvailableDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="avail-time">Time</Label>
              <Input id="avail-time" type="time" required value={availableTime} onChange={(e) => setAvailableTime(e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="avail-budget">Max budget per game (₹)</Label>
            <Input id="avail-budget" type="number" min={0} inputMode="numeric" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="avail-notes">Notes (optional)</Label>
            <Input id="avail-notes" maxLength={280} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Striker, weekday evenings" />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={postMatchmaking.isPending}>
            {postMatchmaking.isPending && <Spinner />}
            Post Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
