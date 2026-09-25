"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CoinIcon } from "@/components/shared/icons";
import { useWalletSocket } from "@/hooks/useRewards";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

export function CoinWalletBadge() {
  const router = useRouter();
  const balance = useAuthStore((state) => state.user?.coinsBalance);
  const previous = useRef(balance);
  const [delta, setDelta] = useState<{ value: number; key: number } | null>(null);
  useWalletSocket();

  // Animate on every earn/spend, whichever tab (or socket event) caused it.
  useEffect(() => {
    if (balance === undefined || previous.current === undefined || balance === previous.current) {
      previous.current = balance;
      return;
    }
    setDelta({ value: balance - previous.current, key: Date.now() });
    previous.current = balance;
  }, [balance]);

  if (balance === undefined) return null;

  return (
    <button
      onClick={() => router.push("/rewards")}
      aria-label={`${balance} coins, open rewards`}
      className="relative flex items-center gap-1.5 rounded-full bg-amber/15 py-1.5 pl-1.5 pr-3 text-sm font-bold text-amber ring-1 ring-amber/40 transition-transform hover:ring-amber active:scale-95"
    >
      <span key={delta?.key} className={cn("flex h-6 w-6 items-center justify-center rounded-full bg-amber text-background", delta && "animate-coin-pop")}>
        <CoinIcon className="h-4 w-4" />
      </span>
      <span data-testid="coin-balance" className="tabular-nums">
        {balance}
      </span>
      {delta && (
        <span
          key={`float-${delta.key}`}
          className={cn(
            "pointer-events-none absolute -bottom-5 right-1 text-xs font-bold animate-float-up",
            delta.value > 0 ? "text-emerald" : "text-danger"
          )}
        >
          {delta.value > 0 ? `+${delta.value}` : delta.value}
        </span>
      )}
    </button>
  );
}
