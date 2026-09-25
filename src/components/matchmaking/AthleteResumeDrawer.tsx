"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/shared/Avatar";
import { CalendarIcon, ChatIcon, ClockIcon, SendIcon, SportIcon, StarIcon } from "@/components/shared/icons";
import { useToast } from "@/components/shared/ToastProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetBody, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn, formatShortDate } from "@/lib/utils";
import type { SoloAvailability } from "@/types";

interface ChatMessage {
  id: number;
  from: "me" | "them";
  text: string;
}

interface AthleteResumeDrawerProps {
  athlete: SoloAvailability | null;
  onClose: () => void;
}

export function AthleteResumeDrawer({ athlete, onClose }: AthleteResumeDrawerProps) {
  return (
    <Sheet open={Boolean(athlete)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>{athlete && <Resume key={athlete.id} athlete={athlete} />}</SheetContent>
    </Sheet>
  );
}

function Resume({ athlete }: { athlete: SoloAvailability }) {
  const { showToast } = useToast();
  const firstName = athlete.userName.split(" ")[0];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  const sportsPlayed = Array.from(new Set([athlete.sportType, ...athlete.sportPreferences]));

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    const isFirst = messages.length === 0;
    setMessages((current) => [...current, { id: Date.now(), from: "me", text: text.trim() }]);
    setDraft("");
    if (isFirst) showToast(`Squad invite sent to ${firstName}`, "success");

    // Mock reply - there's no messaging backend; this simulates the invite
    // conversation the brief describes as a UI-only interaction.
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          from: "them",
          text: isFirst
            ? `Hey! Count me in for ${athlete.sportType.toLowerCase()} — what time works?`
            : "Perfect, see you there 👍",
        },
      ]);
    }, 1100);
  }

  const stats = [
    { label: "Trust score", value: athlete.trustScore.toFixed(1), icon: <StarIcon className="mx-auto h-4 w-4 text-emerald" /> },
    { label: "On-time rate", value: `${athlete.punctualityRate.toFixed(0)}%`, icon: <ClockIcon className="mx-auto h-4 w-4 text-emerald" /> },
    { label: "Sports played", value: sportsPlayed.length, icon: <SportIcon sport={athlete.sportType} className="mx-auto h-4 w-4 text-emerald" /> },
  ];

  return (
    <>
      <SheetHeader>
        <div className="flex items-center gap-4">
          <Avatar name={athlete.userName} className="h-16 w-16 text-lg" />
          <div>
            <SheetTitle>{athlete.userName}</SheetTitle>
            <SheetDescription>Athlete resume</SheetDescription>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="rounded-2xl bg-background p-3 text-center">
              {icon}
              <p className="mt-1.5 text-lg font-extrabold tabular-nums">{value}</p>
              <p className="text-[10px] text-text-primary/50">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {sportsPlayed.map((sport) => (
            <span key={sport} className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold">
              <SportIcon sport={sport} className="h-3 w-3 text-emerald" />
              {sport}
            </span>
          ))}
        </div>
      </SheetHeader>

      <SheetBody className="flex flex-col space-y-0 p-0">
        <div className="flex items-center gap-2 border-b border-border px-6 py-3 text-xs text-text-primary/60">
          <CalendarIcon className="h-3.5 w-3.5" />
          Free {formatShortDate(athlete.availableDate)} at {athlete.availableTime.slice(0, 5)}
          {athlete.maxBudget !== null && <span className="ml-auto font-semibold text-text-primary">≤ ₹{athlete.maxBudget}</span>}
        </div>

        <div ref={scroller} className="flex min-h-[220px] flex-1 flex-col gap-2 overflow-y-auto px-6 py-4">
          {messages.length === 0 && (
            <div className="m-auto flex flex-col items-center gap-3 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                <ChatIcon className="h-5 w-5" />
              </span>
              <p className="text-xs text-text-primary/50">Start a chat to invite {firstName} to your squad</p>
              <Button size="sm" variant="outline" onClick={() => send(`Hey ${firstName}, want to join my ${athlete.sportType} squad?`)}>
                Send quick invite
              </Button>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.from === "me" ? "justify-end" : "justify-start")}>
              <span
                className={cn(
                  "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm animate-in fade-in slide-in-from-bottom-1",
                  msg.from === "me" ? "rounded-br-md bg-emerald text-background" : "rounded-bl-md bg-background"
                )}
              >
                {msg.text}
              </span>
            </div>
          ))}
          {typing && (
            <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-background px-3.5 py-3">
              {[0, 150, 300].map((delay) => (
                <span key={delay} className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-primary/50" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="flex gap-2 border-t border-border p-4"
        >
          <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Message ${firstName}…`} />
          <Button type="submit" size="icon" className="shrink-0" disabled={!draft.trim()} aria-label="Send">
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </SheetBody>
    </>
  );
}
