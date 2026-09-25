"use client";

import { ErrorState } from "@/components/shared/ErrorState";
import { CoinIcon, GiftIcon } from "@/components/shared/icons";
import { Spinner } from "@/components/shared/Spinner";
import { useToast } from "@/components/shared/ToastProvider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRedeemVoucher, useVouchers } from "@/hooks/useRewards";
import { ApiClientError } from "@/lib/apiClient";
import { cn, formatShortDate } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import type { Voucher } from "@/types";

export function RewardsStore() {
  const { showToast } = useToast();
  const balance = useAuthStore((state) => state.user?.coinsBalance ?? 0);
  const { data, isLoading, isError, refetch } = useVouchers();
  const redeemVoucher = useRedeemVoucher();

  async function handleRedeem(voucher: Voucher) {
    if (balance < voucher.coinCost) {
      showToast(`Not enough coins — you need ${voucher.coinCost - balance} more for ${voucher.title}.`, "error");
      return;
    }
    try {
      await redeemVoucher.mutateAsync(voucher.id);
      showToast(`Redeemed “${voucher.title}” · −${voucher.coinCost} coins`, "success");
    } catch (err) {
      showToast(err instanceof ApiClientError ? err.message : "Could not redeem this voucher.", "error");
    }
  }

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-primary/50">Rewards store</p>
          <h2 className="text-xl font-extrabold">Spend your coins</h2>
        </div>
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-60" />
          ))}
        </div>
      )}
      {isError && <ErrorState message="Could not load the rewards store." onRetry={() => refetch()} />}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data?.vouchers.map((voucher) => {
          const affordable = balance >= voucher.coinCost;
          const pending = redeemVoucher.isPending && redeemVoucher.variables === voucher.id;
          const progress = Math.min(100, Math.round((balance / voucher.coinCost) * 100));
          return (
            <article key={voucher.id} className="relative flex flex-col rounded-2xl border border-border bg-card">
              {/* Coupon notches */}
              <span className="absolute -left-2 top-[92px] h-4 w-4 rounded-full border border-border bg-background" />
              <span className="absolute -right-2 top-[92px] h-4 w-4 rounded-full border border-border bg-background" />

              <div className="flex h-[100px] items-center justify-between gap-2 px-5">
                <p className="text-2xl font-extrabold leading-tight">{voucher.discountValue ?? "Reward"}</p>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber/15 text-amber">
                  <GiftIcon className="h-5 w-5" />
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 border-t border-dashed border-border p-5">
                <div>
                  <h3 className="font-bold">{voucher.title}</h3>
                  {voucher.description && <p className="mt-1 text-xs text-text-primary/60">{voucher.description}</p>}
                  {voucher.validUntil && (
                    <p className="mt-1 text-[11px] text-text-primary/40">Valid till {formatShortDate(voucher.validUntil)}</p>
                  )}
                </div>

                {!affordable && (
                  <div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-text-primary/10">
                      <div className="h-full rounded-full bg-amber" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="mt-1 text-[11px] text-text-primary/50">{voucher.coinCost - balance} more coins needed</p>
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                  <span className="flex items-center gap-1 text-lg font-extrabold text-amber tabular-nums">
                    <CoinIcon className="h-4 w-4" />
                    {voucher.coinCost}
                  </span>
                  <Button
                    size="sm"
                    variant={affordable ? "default" : "subtle"}
                    className={cn(!affordable && "text-text-primary/60")}
                    onClick={() => handleRedeem(voucher)}
                    disabled={redeemVoucher.isPending}
                  >
                    {pending && <Spinner />}
                    Redeem
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
