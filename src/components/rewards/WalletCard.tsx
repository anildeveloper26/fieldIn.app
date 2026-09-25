"use client";

import { useMemo } from "react";
import { CoinIcon, LeafIcon } from "@/components/shared/icons";
import { useWallet } from "@/hooks/useRewards";
import { useAuthStore } from "@/store/useAuthStore";

const ECO_LEVELS = [
  { name: "Seedling", min: 0 },
  { name: "Sprout", min: 100 },
  { name: "Grove", min: 250 },
  { name: "Forest", min: 500 },
];

export function WalletCard() {
  const balance = useAuthStore((state) => state.user?.coinsBalance ?? 0);
  const { data } = useWallet();

  const { earned, spent } = useMemo(() => {
    const txns = data?.transactions ?? [];
    return {
      earned: txns.filter((t) => t.type === "earned").reduce((sum, t) => sum + t.amount, 0),
      spent: txns.filter((t) => t.type === "spent").reduce((sum, t) => sum + t.amount, 0),
    };
  }, [data]);

  // Eco level is based on lifetime coins earned, so spending never demotes you.
  const levelIndex = ECO_LEVELS.reduce((idx, level, i) => (earned >= level.min ? i : idx), 0);
  const level = ECO_LEVELS[levelIndex];
  const next = ECO_LEVELS[levelIndex + 1];
  const progress = next ? Math.round(((earned - level.min) / (next.min - level.min)) * 100) : 100;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-amber/40 bg-card p-6">
      <CoinIcon className="absolute -right-10 -top-10 h-48 w-48 text-amber/10" />
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber">FieldIn Coins</p>
      <p className="mt-2 flex items-center gap-3 text-5xl font-extrabold tabular-nums text-amber">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-background">
          <CoinIcon className="h-7 w-7" />
        </span>
        {balance}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-background p-3">
          <p className="text-lg font-extrabold text-emerald tabular-nums">+{earned}</p>
          <p className="text-[11px] text-text-primary/50">Lifetime earned</p>
        </div>
        <div className="rounded-2xl bg-background p-3">
          <p className="text-lg font-extrabold tabular-nums">−{spent}</p>
          <p className="text-[11px] text-text-primary/50">Spent on rewards</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-bold text-amber">
            <LeafIcon className="h-3.5 w-3.5" /> Eco level: {level.name}
          </span>
          <span className="text-text-primary/50">{next ? `${next.min - earned} to ${next.name}` : "Max level"}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-text-primary/10">
          <div className="h-full rounded-full bg-amber transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}
