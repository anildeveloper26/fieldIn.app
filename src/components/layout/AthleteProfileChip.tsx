"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Avatar } from "@/components/shared/Avatar";
import { CameraIcon, CoinIcon, ClockIcon, SportIcon, StarIcon } from "@/components/shared/icons";
import { Spinner } from "@/components/shared/Spinner";
import { useToast } from "@/components/shared/ToastProvider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUploadAvatar } from "@/hooks/useProfile";
import { apiFetch, ApiClientError, getRefreshToken } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";

export function AthleteProfileChip() {
  const router = useRouter();
  const { showToast } = useToast();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const uploadAvatar = useUploadAvatar();
  const fileInput = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  if (!user) return null;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      await uploadAvatar.mutateAsync(file);
      showToast("Profile photo updated", "success");
    } catch (err) {
      showToast(err instanceof ApiClientError ? err.message : "Could not upload photo", "error");
    }
  }

  function handleLogout() {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      // Best-effort server-side revocation - logout must not block on the network.
      apiFetch("/auth/logout", { method: "POST", body: JSON.stringify({ refreshToken }) }).catch(() => {});
    }
    logout();
    setOpen(false);
    router.replace("/login");
  }

  const stats = [
    { label: "Trust score", value: user.trustScore.toFixed(1), icon: StarIcon, tone: "text-emerald" },
    { label: "On-time", value: `${user.punctualityRate.toFixed(0)}%`, icon: ClockIcon, tone: "text-emerald" },
    { label: "Coins", value: user.coinsBalance, icon: CoinIcon, tone: "text-amber" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-border bg-card p-1 pr-1 transition-colors hover:border-emerald/60 sm:pr-3">
          <Avatar name={user.name} src={user.avatarUrl} className="h-7 w-7 text-[10px]" />
          <span className="hidden max-w-[6rem] truncate text-xs font-semibold text-text-primary sm:block">
            {user.name.split(" ")[0]}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <div className="h-20 rounded-t-2xl bg-gradient-to-br from-emerald/40 via-emerald/10 to-transparent" />
        <div className="-mt-10 px-6 pb-6">
          <div className="flex items-end justify-between">
            <button
              onClick={() => fileInput.current?.click()}
              className="group relative rounded-full ring-4 ring-card"
              aria-label="Change profile photo"
            >
              <Avatar name={user.name} src={user.avatarUrl} className="h-20 w-20 text-xl" />
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60 text-text-primary opacity-0 transition-opacity group-hover:opacity-100">
                {uploadAvatar.isPending ? <Spinner /> : <CameraIcon className="h-5 w-5" />}
              </span>
            </button>
            <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={handleFile} />
            <span className="rounded-full bg-emerald/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald">
              Athlete
            </span>
          </div>

          <DialogTitle className="mt-3 text-xl">{user.name}</DialogTitle>
          <DialogDescription>{user.email}</DialogDescription>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {stats.map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className="rounded-2xl border border-border bg-background p-3">
                <Icon className={cn("h-4 w-4", tone)} />
                <p className={cn("mt-2 text-lg font-extrabold tabular-nums", tone)}>{value}</p>
                <p className="text-[11px] text-text-primary/50">{label}</p>
              </div>
            ))}
          </div>

          <p className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-wider text-text-primary/50">Sports played</p>
          <div className="flex flex-wrap gap-2">
            {user.sportPreferences.length === 0 && <span className="text-xs text-text-primary/50">None added yet</span>}
            {user.sportPreferences.map((sport) => (
              <span key={sport} className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium">
                <SportIcon sport={sport} className="h-3.5 w-3.5 text-emerald" />
                {sport}
              </span>
            ))}
          </div>

          <p className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-wider text-text-primary/50">Appearance</p>
          <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-background p-1">
            {(["dark", "light"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setTheme(option)}
                className={cn(
                  "rounded-xl py-2 text-xs font-semibold capitalize transition-colors",
                  theme === option ? "bg-card text-emerald shadow-sm" : "text-text-primary/50"
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <Button variant="subtle" className="mt-6 w-full" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
