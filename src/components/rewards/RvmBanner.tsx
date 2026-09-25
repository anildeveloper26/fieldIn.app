import { CoinIcon, LeafIcon, RecycleIcon } from "@/components/shared/icons";

const STEPS = [
  { icon: RecycleIcon, title: "Drop", text: "Recycle bottles & cans at an RVM in any partner metro or railway station." },
  { icon: LeafIcon, title: "Get a code", text: "The machine prints a one-time coupon code for what you recycled." },
  { icon: CoinIcon, title: "Earn coins", text: "Redeem the code here and spend coins on turf, food and gear." },
];

export function RvmBanner() {
  return (
    <section className="rounded-2xl border border-emerald/30 bg-gradient-to-br from-emerald/15 via-card to-card p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald">Reverse Vending Machines</p>
      <h2 className="mt-1 text-xl font-extrabold">Recycle on your commute. Play for less.</h2>
      <ol className="mt-5 grid gap-4 sm:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold">
                {i + 1}. {title}
              </span>
              <span className="mt-0.5 block text-xs text-text-primary/60">{text}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
