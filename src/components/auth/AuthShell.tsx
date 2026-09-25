import type { ReactNode } from "react";
import { GiftIcon, LocationPinIcon, LogoMark, TrophyIcon, UsersIcon } from "@/components/shared/icons";

const HIGHLIGHTS = [
  { icon: LocationPinIcon, title: "Venues near you", text: "Live crowd levels and split-cost booking." },
  { icon: TrophyIcon, title: "Tournaments", text: "Register a team or recruit missing players." },
  { icon: UsersIcon, title: "Live matchmaking", text: "Squads and solo players, matched in real time." },
  { icon: GiftIcon, title: "Eco rewards", text: "Recycle at metro RVMs, earn coins to play." },
];

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden border-r border-border bg-card p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald/20 blur-3xl" />
        <div className="relative flex items-center gap-2">
          <LogoMark className="h-9 w-9" />
          <span className="text-xl font-extrabold">
            Field<span className="text-emerald">In</span>
          </span>
        </div>
        <div className="relative">
          <h2 className="max-w-md text-4xl font-extrabold leading-tight tracking-tight">
            Find a game. <span className="text-emerald">Fill your squad.</span> Get rewarded.
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-border bg-background/60 p-4">
                <Icon className="h-5 w-5 text-emerald" />
                <p className="mt-3 text-sm font-bold">{title}</p>
                <p className="mt-1 text-xs text-text-primary/60">{text}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-text-primary/40">Hyper-local sports, built for Bengaluru.</p>
      </aside>

      <section className="flex flex-col justify-center px-4 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <LogoMark className="h-8 w-8" />
            <span className="text-lg font-extrabold">
              Field<span className="text-emerald">In</span>
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-text-primary/60">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}
