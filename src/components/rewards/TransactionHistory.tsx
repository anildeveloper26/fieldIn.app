"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { CoinIcon, GiftIcon, LocationPinIcon, RecycleIcon, StarIcon } from "@/components/shared/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "@/hooks/useRewards";
import { cn } from "@/lib/utils";
import type { CoinTransaction } from "@/types";

const SOURCE: Record<CoinTransaction["source"], { label: string; icon: typeof CoinIcon }> = {
  rvm: { label: "RVM recycling code", icon: RecycleIcon },
  booking: { label: "Venue booking", icon: LocationPinIcon },
  voucher: { label: "Voucher redeemed", icon: GiftIcon },
  bonus: { label: "Welcome bonus", icon: StarIcon },
};

const FILTERS = ["all", "earned", "spent"] as const;

export function TransactionHistory() {
  const { data, isLoading, isError, refetch } = useWallet();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  const transactions = useMemo(
    () => (data?.transactions ?? []).filter((t) => filter === "all" || t.type === filter),
    [data, filter]
  );

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-primary/50">Activity</p>
          <h2 className="text-xl font-extrabold">Coin history</h2>
        </div>
        <div className="flex rounded-2xl border border-border bg-card p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-xl px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
                filter === f ? "bg-emerald text-background" : "text-text-primary/60"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <Skeleton className="h-64" />}
      {isError && <ErrorState message="Could not load transaction history." onRetry={() => refetch()} />}
      {!isLoading && !isError && transactions.length === 0 && (
        <EmptyState icon={<CoinIcon className="h-6 w-6" />} title="No coin activity here yet" hint="Redeem an RVM code to get started." />
      )}

      {transactions.length > 0 && (
        <ol className="overflow-hidden rounded-2xl border border-border bg-card">
          {transactions.map((txn) => {
            const { label, icon: Icon } = SOURCE[txn.source] ?? SOURCE.bonus;
            const earned = txn.type === "earned";
            return (
              <li key={txn.id} className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-b-0">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
                    earned ? "bg-emerald/15 text-emerald" : "bg-text-primary/5 text-text-primary/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-text-primary/50">
                    {new Date(txn.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    · {earned ? "Earned" : "Spent"} · {txn.source.toUpperCase()}
                  </p>
                </div>
                <span className={cn("text-base font-extrabold tabular-nums", earned ? "text-emerald" : "text-text-primary/70")}>
                  {earned ? "+" : "−"}
                  {txn.amount}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
