"use client";

import { useState } from "react";
import { CoinIcon } from "@/components/shared/icons";
import { Spinner } from "@/components/shared/Spinner";
import { useToast } from "@/components/shared/ToastProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRedeemCode } from "@/hooks/useRewards";
import { ApiClientError } from "@/lib/apiClient";

export function RvmRedeemer() {
  const { showToast } = useToast();
  const redeemCode = useRedeemCode();
  const [code, setCode] = useState("");
  const [burst, setBurst] = useState<{ amount: number; key: number } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    try {
      const result = await redeemCode.mutateAsync(code.trim().toUpperCase());
      showToast(`+${result.transaction.amount} coins added to your wallet`, "success");
      setBurst({ amount: result.transaction.amount, key: Date.now() });
      setCode("");
    } catch (err) {
      showToast(err instanceof ApiClientError ? err.message : "Could not redeem this code.", "error");
    }
  }

  return (
    <section className="relative flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-6">
      <div>
        <h2 className="text-lg font-extrabold">Redeem an RVM code</h2>
        <p className="mt-1 text-sm text-text-primary/60">
          Enter the code from your recycling receipt. Try <span className="font-mono font-bold text-emerald">RVM-2026</span>.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="RVM-XXXX"
          aria-label="RVM coupon code"
          className="h-12 font-mono text-base font-bold tracking-widest"
        />
        <Button type="submit" variant="coin" size="lg" disabled={redeemCode.isPending || !code.trim()}>
          {redeemCode.isPending ? <Spinner /> : <CoinIcon className="h-4 w-4" />}
          Redeem Code
        </Button>
      </form>
      {burst && (
        <span
          key={burst.key}
          className="pointer-events-none absolute right-8 top-6 flex items-center gap-1 text-2xl font-extrabold text-amber animate-float-up"
        >
          +{burst.amount} <CoinIcon className="h-6 w-6" />
        </span>
      )}
    </section>
  );
}
