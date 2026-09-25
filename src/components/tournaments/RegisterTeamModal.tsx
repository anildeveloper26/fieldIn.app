"use client";

import { useState } from "react";
import { Spinner } from "@/components/shared/Spinner";
import { useToast } from "@/components/shared/ToastProvider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterTournament } from "@/hooks/useTournaments";
import { ApiClientError } from "@/lib/apiClient";
import { formatShortDate } from "@/lib/utils";
import type { Tournament } from "@/types";

interface RegisterTeamModalProps {
  tournament: Tournament;
  open: boolean;
  onClose: () => void;
}

export function RegisterTeamModal({ tournament, open, onClose }: RegisterTeamModalProps) {
  const { showToast } = useToast();
  const registerTournament = useRegisterTournament();
  const [teamName, setTeamName] = useState("");
  const spotsLeft = tournament.maxTeams - tournament.registeredTeams;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await registerTournament.mutateAsync({ tournamentId: tournament.id, teamName: teamName.trim() });
      showToast(`${teamName.trim()} is in! See you on ${formatShortDate(tournament.startDate)}.`, "success");
      setTeamName("");
      onClose();
    } catch (err) {
      showToast(err instanceof ApiClientError ? err.message : "Could not register your team.", "error");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register your team</DialogTitle>
          <DialogDescription>
            {tournament.title} · {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} left
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="team-name">Team name</Label>
            <Input
              id="team-name"
              required
              minLength={2}
              maxLength={60}
              autoFocus
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. Koramangala Strikers"
            />
          </div>
          <div className="space-y-2 rounded-2xl bg-background p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-text-primary/60">Entry fee</span>
              <span className="font-bold">₹{tournament.entryFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-primary/60">Kick-off</span>
              <span className="font-semibold">{formatShortDate(tournament.startDate)}</span>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={registerTournament.isPending || teamName.trim().length < 2}>
            {registerTournament.isPending && <Spinner />}
            Confirm registration
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
